import { Request, Response } from "express";
import College from "../models/college";
import Faculty from "../models/faculty";

const generateRefreshAndAccessToken = async (faculty: any) => {
  try {
    const refreshToken = faculty.generateRefreshToken();
    const accessToken = faculty.generateAccessToken();
    faculty.refreshToken = refreshToken;
    faculty.accessToken = accessToken;
    await faculty.save();
    return { refreshToken, accessToken };
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

export const create_faculty = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user;
    const { email, password } = req.body;
    const college = await College.findOne({ googleId: user.id });
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // check if faculty already exists
    const faculty = await Faculty.findOne({ email });

    if (faculty) {
      return res.status(400).json({ message: "Faculty already exists" });
    }

    // create faculty
    const newFaculty = new Faculty({
      email,
      password,
      college: college._id,
    });
    await newFaculty.save();
    const createdFaculty = await Faculty.findOne({ email }).select("-password");
    return res.status(201).json({
      success: true,
      message: "New Faculty created Successfully",
      faculty: createdFaculty,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const facultyLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const faculty = await Faculty.findOne({ faculty_email: email });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // compare password
    const isMatch = await faculty.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { refreshToken, accessToken }: any =
      await generateRefreshAndAccessToken(faculty);
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      })
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
      })
      .json({
        success: true,
        message: "Faculty logged in successfully",
        refreshToken,
        accessToken,
      });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
