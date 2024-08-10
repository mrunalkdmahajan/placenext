import { model, Schema } from "mongoose";

import mongoose from "mongoose";

export interface IStudentInfo extends Document {
  _id?: string;
  stud_resume: string;
  stud_results: string[];
  stud_aadhar: string;
  stud_birth_cert: string;
  stud_caste_cert: string;
  stud_income_cert: string;
  stud_marksheets: string[];
  no_of_live_backlogs: number;
  no_of_dead_backlogs: number;
  stud_placement_status: boolean;
  stud_placement_package: number;
  stud_placement_company: string;
  stud_placement_date: Date;
  student_skills: string[];
}

const Student_InfoSchema = new Schema<IStudentInfo>({
  stud_resume: {
    type: String,
    required: true,
  },
  stud_results: {
    type: [String],
    required: true,
  },
  stud_aadhar: {
    type: String,
    required: true,
  },
  stud_birth_cert: {
    type: String,
    required: true,
  },
  stud_caste_cert: {
    type: String,
    required: true,
  },
  stud_income_cert: {
    type: String,
    required: true,
  },
  stud_marksheets: {
    type: [String],
    required: true,
  },
  no_of_live_backlogs: {
    type: Number,
    required: true,
  },
  no_of_dead_backlogs: {
    type: Number,
    required: true,
  },
  stud_placement_status: {
    type: Boolean,
    required: true,
  },
  stud_placement_package: {
    type: Number,
    required: true,
  },
  stud_placement_company: {
    type: String,
    required: true,
  },
  stud_placement_date: {
    type: Date,
    required: true,
  },
  student_skills: {
    type: [String],
    required: true,
  },
});

const StudentInfo = model<IStudentInfo>("StudentInfo", Student_InfoSchema);
export default StudentInfo;
