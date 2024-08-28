import { Request, Response } from "express";
import admin from "../../config/firebaseAdmin";
import Student from "../models/student";
import StudentInfo from "../models/info_student";

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

export const isFirstSignIn = async (req: Request, res: Response) => {
  try {
    // here we will check if the user is signing in for the first time
    // the main logic is the student model should exsist having this id as jwt id
    // if the student model does not exsist then we will return true
    // @ts-ignore
    const user = req.user;

    const student = await Student.findOne({ googleId: user.uid });
    if (!student) {
      return res.status(200).json({ success: true, isFirstSignIn: true });
    } else {
      return res.status(200).json({ success: true, isFirstSignIn: false });
    }
  } catch (error: any) {
    console.log("Error in isFirstSignIn", error.message);

    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const applicationFrom = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    const {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      dob,
      course,
      year,
      department,
      address,
      college,
      resume,
      addmissionYear,
      sem1Grade,
      sem2Grade,
      sem3Grade,
      sem4Grade,
      sem5Grade,
      sem6Grade,
      sem7Grade,
      sem8Grade,
      sem1Marksheet,
      sem2Marksheet,
      sem3Marksheet,
      sem4Marksheet,
      sem5Marksheet,
      sem6Marksheet,
      sem7Marksheet,
      sem8Marksheet,
      cet,
      jee,
      hsc,
      hscBoard,
      ssc,
      sscBoard,
      diploma,
      diplomaBoard,
      diplomaStream,
      alternateEmail,
      alternatePhone,
      capAllotment,
      photoWithSignature,
      gapCertificate,
      aadhar,
      pan,
      handicapCert,
      liveBacklogs,
      deadBacklogs,
      placementStatus,
      placementPackage,
      placementCompany,
      placementDate,
      skills,
      linkedIn,
      github,
    } = req.body;
    if (
      [
        firstName,
        middleName,
        lastName,
        email,
        phone,
        dob,
        course,
        year,
        department,
        address,
        college,
        resume,
        addmissionYear,
        // sem1,
        // sem2,
        // sem3,
        // sem4,
        // sem5,
        // sem6,
        // sem7,
        // sem8,
        // cet,
        // jee,
        // hsc,
        // hscBoard,
        ssc,
        sscBoard,
        // diploma,
        // diplomaBoard,
        // diplomaStream,
        alternateEmail,
        alternatePhone,
        capAllotment,
        photoWithSignature,
        gapCertificate,
        aadhar,
        pan,
        // handicapCert,
        liveBacklogs,
        deadBacklogs,
        placementStatus,
        // placementPackage,
        // placementCompany,
        // placementDate,
        skills,
        linkedIn,
        github,
      ].some((field) => field === "")
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const exsistingUser = await Student.findOne({ stud_email: email });
    if (exsistingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exsists" });
    }

    const studentInfo = new StudentInfo({
      stud_resume: resume,
      stud_addmission_year: addmissionYear,
      stud_sem1_grade: sem1Grade,
      stud_sem2_grade: sem2Grade,
      stud_sem3_grade: sem3Grade,
      stud_sem4_grade: sem4Grade,
      stud_sem5_grade: sem5Grade,
      stud_sem6_grade: sem6Grade,
      stud_sem7_grade: sem7Grade,
      stud_sem8_grade: sem8Grade,
      stud_cet: cet,
      stud_jee: jee,
      stud_hsc: hsc,
      stud_hsc_board: hscBoard,
      stud_ssc: ssc,
      stud_ssc_board: sscBoard,
      stud_diploma: diploma,
      stud_diploma_board: diplomaBoard,
      stud_diploma_stream: diplomaStream,
      stud_alternate_email: alternateEmail,
      stud_alternate_phone: alternatePhone,
      stud_capAllotment: capAllotment,
      stud_photoWithSignature: photoWithSignature,
      stud_gapCertificate: gapCertificate,
      stud_aadhar: aadhar,
      stud_pan: pan,
      handicap_cert: handicapCert,
      no_of_live_backlogs: liveBacklogs,
      no_of_dead_backlogs: deadBacklogs,
      stud_placement_status: placementStatus,
      stud_placement_package: placementPackage,
      stud_placement_company: placementCompany,
      stud_placement_date: placementDate,
      student_skills: skills,
      stud_linkedIn: linkedIn,
      stud_github: github,
    });

    const savedStudentInfo = await studentInfo.save();

    const student = new Student({
      stud_name: `${firstName} ${middleName} ${lastName}`,
      stud_email: email,
      stud_address: address,
      stud_phone: phone,
      stud_dob: dob,
      stud_course: course,
      stud_year: year,
      stud_department: department,
      stud_college_id: college,
      googleId: user.uid,
      stud_info_id: savedStudentInfo._id,
    });

    const savedStudent = await student.save();
    console.log("Student filled application form", savedStudent.id);

    return res.status(200).json({ success: true, student: savedStudent });
  } catch (error: any) {
    console.log("Error in applicationFrom", error.message);

    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
