import { Request, Response } from "express";
import College from "../models/college";
import Student from "../../student/models/student";
import StudentInfo from "../../student/models/info_student";
import Job from "../../company/models/job";
import Application from "../../student/models/application";
import * as XLSX from "xlsx";

export const isFirstSignIn = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;

    const student = await College.findOne({
      $or: [{ googleId: user.uid }, { email: user.email }],
    });

    return res.status(200).json({ success: true, isFirstSignIn: !student });
  } catch (error: any) {
    console.log("Error in isFirstSignIn", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    res.status(200).json({ success: true, user });
  } catch (error: any) {
    console.log("Error in signup", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const applicationFrom = async (req: Request, res: Response) => {
  try {
    const {
      collegeName,
      collegeWebsite,
      collegeNoOfStudents,
      collegeLocation,
      collegeContactNo,
      collegeNoOfEmployees,
      collegeAddress,
      collegeAffiliation,
      collegeCoursesOffered,
      collegeDepartment,
    } = req.body;

    // @ts-ignore
    const user = req.user;

    const existingUser = await College.findOne({ email: user.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    const college = new College({
      googleId: user.uid,
      email: user.email,
      coll_name: collegeName,
      coll_website: collegeWebsite,
      coll_no_of_stud: collegeNoOfStudents,
      coll_location: collegeLocation,
      colLcontact_no: collegeContactNo,
      coll_no_employs: collegeNoOfEmployees,
      coll_address: collegeAddress,
      coll_affiliated_to: collegeAffiliation,
      coll_courses_offered: collegeCoursesOffered,
      coll_departments: collegeDepartment,
    });

    await college.save();

    return res.status(200).json({ success: true, college });
  } catch (error: any) {
    console.log("Error in applicationForm", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getAllStudentList = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    console.log("User UID:", user.uid);

    // Find college by Google ID
    const college = await College.find({ googleId: user.uid });
    if (!college.length) {
      return res.status(404).json({ success: false, msg: "College not found" });
    }

    console.log("College ID:", college[0]._id.toString());

    const students = await Student.find({
      stud_college_id: college[0]._id.toString(),
    });
    if (!students.length) {
      return res.status(404).json({ success: false, msg: "No students found" });
    }

    const placementStatusAndCGPI = await Promise.all(
      students.map(async (student) => {
        const studentInfo = await StudentInfo.findById(student.stud_info_id);

        // Extract grades and filter out null or undefined values
        const grades = [
          studentInfo?.stud_sem1_grade,
          studentInfo?.stud_sem2_grade,
          studentInfo?.stud_sem3_grade,
          studentInfo?.stud_sem4_grade,
          studentInfo?.stud_sem5_grade,
          studentInfo?.stud_sem6_grade,
          studentInfo?.stud_sem7_grade,
          studentInfo?.stud_sem8_grade,
        ].filter((grade) => grade !== null && grade !== undefined); // Keep only valid grades

        // Calculate the aggregate CGPI
        const totalPoints = grades.reduce(
          (acc, grade) => acc + Number(grade),
          0
        );
        const aggregateCGPI =
          grades.length > 0 ? totalPoints / grades.length : 0;

        return {
          placementStatus: studentInfo
            ? studentInfo.stud_placement_status
            : null,
          aggregateCGPI: aggregateCGPI.toFixed(2),
          stud_year: studentInfo?.stud_addmission_year,
        };
      })
    );

    // console.log("Students:", students);

    // Merge the student data with their placement status and aggregate CGPI
    const responseData = students.map((student, index) => ({
      student,
      placementStatus: placementStatusAndCGPI[index].placementStatus,
      aggregateCGPI: placementStatusAndCGPI[index].aggregateCGPI,
      stud_year: placementStatusAndCGPI[index].stud_year,
    }));

    return res.status(200).json({ success: true, students: responseData });
  } catch (error: any) {
    console.error("Error in getAllStudentList:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

interface FilteredStudentList {
  PlacementStatus: string;
  AggregateCGPI: string;
  StudYear: number;
}

export const getFilteredStudentList = async (req: Request, res: Response) => {
  try {
    // Extract user from request
    // @ts-ignore
    const user = req.user as { uid: string };
    console.log("User UID:", user.uid);

    // Extract filter from request parameters
    const filter = req.params.filter ? JSON.parse(req.params.filter) : {};
    const { placementStatus, verifiedStatus, branch } = req.query;

    console.log("Placement Status:", placementStatus);
    console.log("Verified Status:", verifiedStatus);
    console.log("Order Status:", branch);

    // Find college by Google ID
    const college = await College.findOne({ googleId: user.uid });
    if (!college) {
      return res.status(404).json({ success: false, msg: "College not found" });
    }

    // Define the query conditions
    const queryConditions: any = {
      stud_college_id: college._id.toString(),
    };

    // Apply other filters
    if (verifiedStatus === "1") {
      queryConditions.isCollegeVerified = true;
      queryConditions.isSystemVerified = true;
    } else if (verifiedStatus === "2") {
      queryConditions.isCollegeVerified = false;
      queryConditions.isSystemVerified = true;
    } else if (verifiedStatus === "3") {
      queryConditions.isCollegeVerified = false;
      queryConditions.isSystemVerified = false;
    }

    if (branch) {
      queryConditions.stud_department = branch;
    }

    // Fetch students based on the constructed conditions
    let students = await Student.find(queryConditions).populate("stud_info_id");
    console.log("Students:", students);

    // If no students are found, return a 404 response
    if (!students.length) {
      return res.status(404).json({ success: false, msg: "No students found" });
    }

    // If placementStatus filter is provided, filter the students based on the populated stud_info_id field
    if (placementStatus === "true") {
      students = students.filter(
        // @ts-ignore
        (student) =>
          student.stud_info_id &&
          // @ts-ignore
          student.stud_info_id.stud_placement_status === true
      );
    } else if (placementStatus === "false") {
      students = students.filter(
        // @ts-ignore
        (student) =>
          student.stud_info_id &&
          // @ts-ignore
          student.stud_info_id.stud_placement_status === false
      );
    }

    // Calculate CGPI and gather placement status
    const placementStatusAndCGPI = await Promise.all(
      students.map(async (student) => {
        const studentInfo = await StudentInfo.findById(
          student.stud_info_id
        ).lean();
        if (!studentInfo) {
          return {
            placementStatus: null,
            aggregateCGPI: "0.00",
            stud_year: null,
          };
        }

        const grades = [
          studentInfo.stud_sem1_grade,
          studentInfo.stud_sem2_grade,
          studentInfo.stud_sem3_grade,
          studentInfo.stud_sem4_grade,
          studentInfo.stud_sem5_grade,
          studentInfo.stud_sem6_grade,
          studentInfo.stud_sem7_grade,
          studentInfo.stud_sem8_grade,
        ].filter((grade) => grade != null); // Keep only valid grades

        const totalPoints = grades.reduce(
          (acc, grade) => acc + Number(grade),
          0
        );
        const aggregateCGPI =
          grades.length > 0 ? totalPoints / grades.length : 0;

        return {
          placementStatus: studentInfo.stud_placement_status,
          aggregateCGPI: aggregateCGPI.toFixed(2),
          stud_year: studentInfo.stud_addmission_year,
        };
      })
    );

    // Merge the student data with their placement status and aggregate CGPI
    const responseData = students.map((student, index) => ({
      student,
      placementStatus: placementStatusAndCGPI[index].placementStatus,
      aggregateCGPI: placementStatusAndCGPI[index].aggregateCGPI,
      stud_year: placementStatusAndCGPI[index].stud_year,
    }));

    return res.status(200).json({ success: true, students: responseData });
  } catch (error: any) {
    console.error("Error in getFilteredStudentList:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate("stud_info_id");
    return res.status(200).json({ success: true, student });
  } catch (error: any) {
    console.log("Error in getStudentById", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const verifyStudent = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    const { studentId } = req.params;

    // Find college by Google ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, msg: "Student not found" });
    }
    if (!student.isSystemVerified) {
      return res
        .status(400)
        .json({ success: false, msg: "Student not verified by system" });
    }
    if (student.isCollegeVerified) {
      return res
        .status(400)
        .json({ success: false, msg: "Student already verified" });
    }
    student.isCollegeVerified = true;
    await student.save();
    console.log("Student Verified with Id:", student.id);
    return res.status(200).json({ success: true, student });
  } catch (error: any) {
    console.log("Error in verifyStudents", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const acceptStudent = async (req: Request, res: Response) => {
  try {
    const { student_Id } = req.body;
    console.log("Student ID:", student_Id);

    const student = await Student.findById(student_Id);
    if (!student) {
      return res.status(404).json({ success: false, msg: "Student not found" });
    }
    if (!student.isSystemVerified) {
      return res
        .status(400)
        .json({ success: false, msg: "Student not verified by system" });
    }
    if (student.isCollegeVerified) {
      return res
        .status(400)
        .json({ success: false, msg: "Student already verified" });
    }
    student.isCollegeVerified = true;
    await student.save();
    console.log("Student Verified with Id:", student.id);
    return res.status(200).json({ success: true, student });
  } catch (error: any) {
    console.log("Error in acceptStudent", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const rejectStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.body;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, msg: "Student not found" });
    }
    if (!student.isSystemVerified) {
      return res
        .status(400)
        .json({ success: false, msg: "Student not verified by system" });
    }
    if (student.isCollegeVerified) {
      return res
        .status(400)
        .json({ success: false, msg: "Student already verified" });
    }
    student.isCollegeVerified = false;
    await student.save();
    console.log("Student Rejected with Id:", student.id);
    return res.status(200).json({ success: true, student });
  } catch (error: any) {
    console.log("Error in rejectStudent", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getStudentStatistics = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;

    // Find college by Google ID
    const college = await College.findOne({ googleId: user.uid });
    if (!college) {
      return res.status(404).json({ success: false, msg: "College not found" });
    }

    // Find all students associated with the college
    const students = await Student.find({
      stud_college_id: college._id.toString(),
    });
    if (!students.length) {
      return res.status(404).json({ success: false, msg: "No students found" });
    }

    // Fetch student information and placement statuses
    const placementData = await Promise.all(
      students.map(async (student) => {
        const studentInfo = await StudentInfo.findById(student.stud_info_id);
        return studentInfo ? studentInfo : null; // Return null if not found
      })
    );

    // Calculate statistics
    const totalStudents = students.length;
    const totalPlaced = placementData.filter(
      (info) => info && info.stud_placement_status
    ).length;
    const totalNotPlaced = totalStudents - totalPlaced;

    const studentsByDepartment = placementData.reduce(
      (acc, info) => {
        if (info) {
          const dept = students.find((s) =>
            s.stud_info_id.equals(info._id)
          )?.stud_department;
          if (dept) {
            acc[dept] = (acc[dept] || 0) + 1;
          }
        }
        return acc;
      },
      {} as { [key: string]: number }
    );

    // Calculate average package if students are placed
    const totalPackage = placementData.reduce((sum, info) => {
      return (
        sum +
        (info?.stud_placement_status ? info.stud_placement_package || 0 : 0)
      );
    }, 0);
    const averagePackage = totalPlaced > 0 ? totalPackage / totalPlaced : 0;

    return res.status(200).json({
      success: true,
      totalStudents,
      totalPlaced,
      totalNotPlaced,
      averagePackage,
      studentsByDepartment,
      placementData, // Optional: Include all placement data if needed
    });
  } catch (error: any) {
    console.error("Error in getStudentStatistics:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getCollegeJobs = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    console.log(user);

    // Find college by Google ID
    const college = await College.findOne({ googleId: user.uid });
    if (!college) {
      return res.status(404).json({ success: false, msg: "College not found" });
    }
    console.log(college);

    // Find all jobs associated with the college
    const jobs = await Job.find({
      job_college_id: college._id.toString(),
    });
    if (!jobs.length) {
      return res.status(404).json({ success: false, msg: "No jobs found" });
    }

    return res.status(200).json({ success: true, jobs });
  } catch (error: any) {
    console.error("Error in getCollegeJobs:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const createJobByCollege = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const LogincollegeUser = req.user;
    const {
      job_title,
      job_type,
      job_location,
      job_salary,
      job_description,
      job_requirements,
      job_posted_date,
      yr_of_exp_req,
      job_timing,
      status,
      min_CGPI,
      max_no_dead_kt,
      max_no_live_kt,
      branch_allowed,
      passing_year,
      company_name,
    } = req.body;

    console.log(req.body); // Debugging output

    // Check for required fields, including company_name
    if (
      [
        job_title,
        job_type,
        job_location,
        job_salary,
        job_description,
        job_requirements,
        job_posted_date,
        yr_of_exp_req,
        min_CGPI,
        max_no_dead_kt,
        max_no_live_kt,
        branch_allowed,
        passing_year,
        job_timing,
        status,
        company_name, // Ensure company_name is checked
      ].some((field) => field === "" || field === undefined) // Check for empty or undefined fields
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check for existing job
    const existingJob = await Job.findOne({ job_title, job_location });

    if (existingJob) {
      return res.status(400).json({ msg: "Job already exists" });
    }

    // Find the college based on the logged-in user
    const foundCollege = await College.findOne({
      googleId: LogincollegeUser.uid,
    });

    if (!foundCollege) {
      return res.status(400).json({ msg: "College not found" });
    }

    // Create new job
    const newJob = new Job({
      job_title,
      job_type,
      job_location,
      company_name,
      job_salary,
      job_description,
      job_requirements,
      job_posted_date,
      yr_of_exp_req,
      min_CGPI,
      max_no_dead_kt,
      max_no_live_kt,
      branch_allowed,
      passing_year,
      job_timing,
      status,
      college: foundCollege._id, // Link to college
    });

    await newJob.save();
    return res.status(200).json({ success: true, msg: "Job created" });
  } catch (error: any) {
    console.log("Error in createJobByCompany", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// export const getCollegeJobById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const job = await Job.findById(id);
//     if (!job) {
//       return res.status(404).json({ success: false, msg: "Job not found" });
//     }
//     return res.status(200).json({ success: true, job });
//   } catch (error: any) {
//     console.log("Error in getCollegeJobById", error.message);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

export const collegeAuth = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    const student = await College.findOne({ googleId: user.uid });

    if (!student) {
      return res.status(404).json({ success: false, msg: "Student not found" });
    }

    return res.status(200).json({ success: true, student });
  } catch (error: any) {
    console.log("Error in authStudent", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getCollegeJob = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    const college = await College.findOne({ googleId: user.uid });
    if (!college) {
      return res.status(404).json({ success: false, msg: "College not found" });
    }

    const jobs = await Job.find({ college: college._id });
    return res.status(200).json({ success: true, jobs });
  } catch (error: any) {
    console.log("Error in getCollegeJob", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getJobDetailsById = async (req: Request, res: Response) => {
  try {
    // here we have to return two things one is job details and other is student details who applied for that job
    const { id } = req.params;
    console.log("Job ID:", id);

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, msg: "Job not found" });
    }

    const jobApplicants = await Application.find({ app_job_id: id }).populate(
      "student"
    );

    return res.status(200).json({ success: true, job, jobApplicants });
  } catch (error: any) {
    console.log("Error in getJobDetailsById", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getStudentDetailsInExcel = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    const college = await College.findOne({ googleId: user.uid });
    if (!college) {
      return res.status(404).json({ success: false, msg: "College not found" });
    }

    // Fetch student data with the necessary fields
    const studentData = await Student.find({
      stud_college_id: college._id.toString(),
    })
      .populate({
        path: "stud_info_id",
        select: `
          stud_resume 
          stud_addmission_year 
          stud_sem1_grade 
          stud_sem2_grade 
          stud_sem3_grade 
          stud_sem4_grade 
          stud_sem5_grade 
          stud_sem6_grade 
          stud_sem7_grade 
          stud_sem8_grade 
          stud_sem1_marksheet 
          stud_sem2_marksheet 
          stud_sem3_marksheet 
          stud_sem4_marksheet 
          stud_sem5_marksheet 
          stud_sem6_marksheet 
          stud_sem7_marksheet 
          stud_sem8_marksheet 
          stud_cet 
          stud_jee 
          stud_hsc 
          stud_hsc_board 
          stud_ssc 
          stud_ssc_board 
          stud_diploma 
          stud_diploma_board 
          stud_diploma_stream 
          stud_alternate_email 
          stud_alternate_phone 
          stud_capAllotment 
          stud_photoWithSignature 
          stud_gapCertificate 
          stud_aadhar 
          stud_pan 
          handicap_cert 
          no_of_live_backlogs 
          no_of_dead_backlogs 
          stud_placement_status 
          stud_placement_package 
          stud_placement_company 
          stud_placement_date 
          student_skills 
          stud_linkedIn 
          stud_github
        `,
      })
      .lean();

    // Prepare and format the data
    const formattedData = studentData.map((student: any) => ({
      Name: student.stud_name,
      Email: student.stud_email,
      Address: student.stud_address,
      Phone: student.stud_phone,
      DOB: student.stud_dob.toISOString().split("T")[0],
      Course: student.stud_course,
      Year: student.stud_year,
      Department: student.stud_department,

      Resume: student.stud_info_id?.stud_resume,
      Admission_Year: student.stud_info_id?.stud_addmission_year,
      Sem1_Grade: student.stud_info_id?.stud_sem1_grade,
      Sem2_Grade: student.stud_info_id?.stud_sem2_grade,
      Sem3_Grade: student.stud_info_id?.stud_sem3_grade,
      Sem4_Grade: student.stud_info_id?.stud_sem4_grade,
      Sem5_Grade: student.stud_info_id?.stud_sem5_grade || "N/A",
      Sem6_Grade: student.stud_info_id?.stud_sem6_grade || "N/A",
      Sem7_Grade: student.stud_info_id?.stud_sem7_grade || "N/A",
      Sem8_Grade: student.stud_info_id?.stud_sem8_grade || "N/A",
      Sem1_Marksheet: student.stud_info_id?.stud_sem1_marksheet,
      Sem2_Marksheet: student.stud_info_id?.stud_sem2_marksheet,
      Sem3_Marksheet: student.stud_info_id?.stud_sem3_marksheet,
      Sem4_Marksheet: student.stud_info_id?.stud_sem4_marksheet,
      Sem5_Marksheet: student.stud_info_id?.stud_sem5_marksheet || "N/A",
      Sem6_Marksheet: student.stud_info_id?.stud_sem6_marksheet || "N/A",
      Sem7_Marksheet: student.stud_info_id?.stud_sem7_marksheet || "N/A",
      Sem8_Marksheet: student.stud_info_id?.stud_sem8_marksheet || "N/A",
      CET: student.stud_info_id?.stud_cet,
      JEE: student.stud_info_id?.stud_jee || "N/A",
      HSC: student.stud_info_id?.stud_hsc || "N/A",
      HSC_Board: student.stud_info_id?.stud_hsc_board || "N/A",
      SSC: student.stud_info_id?.stud_ssc || "N/A",
      SSC_Board: student.stud_info_id?.stud_ssc_board || "N/A",
      Diploma: student.stud_info_id?.stud_diploma || "N/A",
      Diploma_Board: student.stud_info_id?.stud_diploma_board || "N/A",
      Diploma_Stream: student.stud_info_id?.stud_diploma_stream || "N/A",
      Alternate_Email: student.stud_info_id?.stud_alternate_email,
      Alternate_Phone: student.stud_info_id?.stud_alternate_phone,
      CAP_Allotment: student.stud_info_id?.stud_capAllotment || "N/A",
      Photo_With_Signature:
        student.stud_info_id?.stud_photoWithSignature || "N/A",
      Gap_Certificate: student.stud_info_id?.stud_gapCertificate || "N/A",
      Aadhar: student.stud_info_id?.stud_aadhar,
      PAN: student.stud_info_id?.stud_pan,
      Handicap_Certificate: student.stud_info_id?.handicap_cert || "N/A",
      Live_Backlogs: student.stud_info_id?.no_of_live_backlogs || 0,
      Dead_Backlogs: student.stud_info_id?.no_of_dead_backlogs || 0,
      Placement_Status: student.stud_info_id?.stud_placement_status
        ? "Yes"
        : "No",
      Placement_Package: student.stud_info_id?.stud_placement_package || "N/A",
      Placement_Company: student.stud_info_id?.stud_placement_company || "N/A",
      Placement_Date: student.stud_info_id?.stud_placement_date
        ? student.stud_info_id.stud_placement_date.toISOString().split("T")[0]
        : "N/A", // Format date
      Skills: student.stud_info_id?.student_skills.join(", ") || "N/A",
      LinkedIn: student.stud_info_id?.stud_linkedIn || "N/A",
      GitHub: student.stud_info_id?.stud_github || "N/A",
    }));

    // Prepare workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    // Generate Excel file buffer
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set headers to indicate file download
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="student_data.xlsx"'
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Send the file
    return res.send(buffer);
  } catch (error: any) {
    console.log("Error in getStudentDetailsInExcel", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getFilteredStudentDetailsInExcel = async (
  req: Request,
  res: Response
) => {
  try {
    // Extract user and filters from request
    // @ts-ignore
    const user = req.user;
    const { placementStatus, verifiedStatus, branch } = req.query;

    const college = await College.findOne({ googleId: user.uid });
    if (!college) {
      return res.status(404).json({ success: false, msg: "College not found" });
    }

    // Define query conditions
    const queryConditions: any = {
      stud_college_id: college._id.toString(),
    };

    // Apply verifiedStatus filter
    if (verifiedStatus === "1") {
      queryConditions.isCollegeVerified = true;
      queryConditions.isSystemVerified = true;
    } else if (verifiedStatus === "2") {
      queryConditions.isCollegeVerified = false;
      queryConditions.isSystemVerified = true;
    } else if (verifiedStatus === "3") {
      queryConditions.isCollegeVerified = false;
      queryConditions.isSystemVerified = false;
    }

    // Apply branch filter
    if (branch) {
      queryConditions.stud_department = branch;
    }

    // Fetch students based on the query conditions
    let studentData = await Student.find(queryConditions)
      .populate({
        path: "stud_info_id",
        select: `
          stud_resume 
          stud_addmission_year 
          stud_sem1_grade 
          stud_sem2_grade 
          stud_sem3_grade 
          stud_sem4_grade 
          stud_sem5_grade 
          stud_sem6_grade 
          stud_sem7_grade 
          stud_sem8_grade 
          stud_sem1_marksheet 
          stud_sem2_marksheet 
          stud_sem3_marksheet 
          stud_sem4_marksheet 
          stud_sem5_marksheet 
          stud_sem6_marksheet 
          stud_sem7_marksheet 
          stud_sem8_marksheet 
          stud_cet 
          stud_jee 
          stud_hsc 
          stud_hsc_board 
          stud_ssc 
          stud_ssc_board 
          stud_diploma 
          stud_diploma_board 
          stud_diploma_stream 
          stud_alternate_email 
          stud_alternate_phone 
          stud_capAllotment 
          stud_photoWithSignature 
          stud_gapCertificate 
          stud_aadhar 
          stud_pan 
          handicap_cert 
          no_of_live_backlogs 
          no_of_dead_backlogs 
          stud_placement_status 
          stud_placement_package 
          stud_placement_company 
          stud_placement_date 
          student_skills 
          stud_linkedIn 
          stud_github
        `,
      })
      .lean();

    // Apply placementStatus filter
    if (placementStatus === "true") {
      studentData = studentData.filter(
        //@ts-ignore
        (student) => student.stud_info_id?.stud_placement_status === true
      );
    } else if (placementStatus === "false") {
      studentData = studentData.filter(
        //@ts-ignore
        (student) => student.stud_info_id?.stud_placement_status === false
      );
    }

    // Format the data for Excel
    const formattedData = studentData.map((student: any) => ({
      Name: student.stud_name,
      Email: student.stud_email,
      Address: student.stud_address,
      Phone: student.stud_phone,
      DOB: student.stud_dob.toISOString().split("T")[0],
      Course: student.stud_course,
      Year: student.stud_year,
      Department: student.stud_department,
      // Add additional fields from the populated `stud_info_id`
      Resume: student.stud_info_id?.stud_resume,
      Admission_Year: student.stud_info_id?.stud_addmission_year,
      Sem1_Grade: student.stud_info_id?.stud_sem1_grade,
      // Include other fields...
    }));

    // Prepare workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    // Generate Excel file buffer
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set headers to indicate file download
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="student_data.xlsx"'
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Send the file
    return res.send(buffer);
  } catch (error: any) {
    console.log("Error in getStudentDetailsInExcel", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const facultyProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    const faculty = await College.findOne({ googleId: user.uid }).select(
      "-googleId"
    );
    if (!faculty) {
      return res.status(404).json({ success: false, msg: "Faculty not found" });
    }
    return res.status(200).json({ success: true, faculty });
  } catch (error: any) {
    console.log("Error in facultyProfile", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
