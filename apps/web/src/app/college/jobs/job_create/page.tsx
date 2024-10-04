"use client";

import JobCreationForm from "@/components/own/Form/JobCreationForm";
import withCollegeAuth from "@/config/services/College_Auth_service";


function JobCreate() {
  return (
    <div>
      <h1>Create a Job</h1>
      <JobCreationForm />
    </div>
  );
}
export default withCollegeAuth(JobCreate);
