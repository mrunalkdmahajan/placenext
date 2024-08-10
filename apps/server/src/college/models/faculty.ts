import { Schema, model } from "mongoose";

import mongoose from "mongoose";
import { IDepartment } from "./department";

export interface IFaculty extends Document {
  _id?: string;
  faculty_name: string;
  faculty_email: string;
  faculty_contact_no: string;
  faculty_address: string;
  faculty_designation: string;
  faculty_department_id: IDepartment["_id"];
  faculty_yr_of_exp: number;
  faculty_qualification: string;
  faculty_experience: number;
  faculty_salary: number;
  faculty_joining_date: Date;
}

const FacultySchema = new Schema<IFaculty>({
  faculty_name: {
    type: String,
    required: true,
  },
  faculty_email: {
    type: String,
    required: true,
    unique: true,
  },
  faculty_contact_no: {
    type: String,
    required: true,
    unique: true,
  },
  faculty_address: {
    type: String,
    required: true,
  },
  faculty_designation: {
    type: String,
    required: true,
  },
  faculty_department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  faculty_yr_of_exp: {
    type: Number,
    required: true,
  },
  faculty_qualification: {
    type: String,
    required: true,
  },
  faculty_experience: {
    type: Number,
    required: true,
  },
  faculty_salary: {
    type: Number,
    required: true,
  },
  faculty_joining_date: {
    type: Date,
    required: true,
  },
});

const Faculty = model<IFaculty>("Faculty", FacultySchema);
export default Faculty;
