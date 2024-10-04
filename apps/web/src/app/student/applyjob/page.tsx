"use client";

import ApplicationCards from "@/components/own/Dashboard/ApplicationCards";
import withStudentAuth from "@/config/services/Student_Auth_service";
import { BackendUrl } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";

function MainDashboard() {
  useEffect(() => {
    const getAllJobs = async () => {
      const res = await axios.get(`${BackendUrl}/api/student/companies`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
    };
  }, []);
  return (
    <div>
    <ApplicationCards />
  </div>
  );
}

export default withStudentAuth(MainDashboard);
