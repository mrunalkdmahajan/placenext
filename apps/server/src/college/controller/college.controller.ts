import { Request, Response } from "express";
import College from "../models/college";

export const isFirstSignIn = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;

    // Try finding the student by Google ID or email
    const student = await College.findOne({
      $or: [{ googleId: user.uid }, { email: user.email }],
    });

    // Return success and the isFirstSignIn status
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

    // Check if user already exists
    const existingUser = await College.findOne({ email: user.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    // Create a new college
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

    // Save the college
    await college.save();

    // Return success
    return res.status(200).json({ success: true, college });
  } catch (error: any) {
    console.log("Error in applicationForm", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// export const getAllColeges = async (req: Request, res: Response) => {
//   try {
//     const colleges = await College.find();
//     return res.status(200).json({ success: true, colleges });
//   } catch (error: any) {
//     console.log("Error in getAllColeges", error.message);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };
