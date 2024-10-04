"use client";

import ApplicationCards from "@/components/own/Dashboard/ApplicationCards";
import { BackendUrl } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";

const StudentInfo = [
  {
    name: "Mrunal",
    description: "A student of vesit",
  },
  {
    name: "Verma",
    description: "A student of vesit",
  },
];

export default function MainDashboard() {
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
    <div className="bg-primary_background h-full">
      <ApplicationCards />
      <ApplicationCards />
    </div>
  );
}
