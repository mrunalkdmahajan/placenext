"use client";

import ApplicationCards from "@/components/own/Dashboard/ApplicationCards";
import withAuth from "@/config/services/Student_Auth_service";
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
    };
    getAllJobs();
  }, []);
  return (
    <div className="bg-primary_background overflow-scroll w-full h-full">
      <ApplicationCards />
    </div>
  );
}

export default withAuth(MainDashboard);
