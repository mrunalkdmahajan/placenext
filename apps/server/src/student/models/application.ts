import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { IJob } from "../../company/models/job";
import { IStudent } from "./student";

export interface IApplication extends Document {
  _id?: string;
  // app_name: string;
  // app_email: string;
  // app_contact_no: string;
  // app_address: string;
  // app_resume: string;
  app_cover_letter: string;
  app_job_id: IJob["_id"];
  student: IStudent["_id"];
  app_status: string;
}

const ApplicationSchema = new Schema<IApplication>({
  // app_name: {
  //   type: String,
  //   required: true,
  // },
  // app_email: {
  //   type: String,
  //   required: true,
  // },
  // app_contact_no: {
  //   type: String,
  //   required: true,
  // },
  // app_address: {
  //   type: String,
  //   required: true,
  // },
  // app_resume: {
  //   type: String,
  //   required: true,
  // },

  app_cover_letter: {
    type: String,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  app_job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  app_status: {
    type: String,
    required: true,
    default: "Pending",
  },
});

const Application = model<IApplication>("Application", ApplicationSchema);
export default Application;
