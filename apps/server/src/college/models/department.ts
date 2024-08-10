import { model, Schema } from "mongoose";
import mongoose from "mongoose";
import { IFaculty } from "./faculty";

export interface IDepartment extends Document {
  _id?: string;
  dept_name: string;
  dept_hod: IFaculty["_id"];
  dept_courses_offered: string[];
  dept_no_of_stud: number;
  dept_no_of_teachers: number;
  dept_budget: number;
}

const DepartmentSchema = new Schema<IDepartment>({
  dept_name: {
    type: String,
    required: true,
  },
  dept_hod: {
    type: Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  dept_courses_offered: {
    type: [String],
    required: true,
  },
  dept_no_of_stud: {
    type: Number,
    required: true,
  },
  dept_no_of_teachers: {
    type: Number,
    required: true,
  },
  dept_budget: {
    type: Number,
    required: true,
  },
});

const Department = model<IDepartment>("Department", DepartmentSchema);
export default Department;
