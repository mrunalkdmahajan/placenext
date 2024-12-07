"use client";

import AppliedJobs from "@/components/own/Dashboard/AppliedJobs";
import CompanyStatsChart from "@/components/own/Dashboard/CompanyStatsChart";
import JobEligibilityPieChart from "@/components/own/Dashboard/JobEligibilityPieChart";
import MainDashboard from "@/components/own/Dashboard/MainDashboard";
import RecommendedJob from "@/components/own/Dashboard/RecommendedJobs";
import JobCreationForm from "@/components/own/Form/JobCreationForm";
import { BackendUrl } from "@/utils/constants";
import axios from "axios";
import { get } from "http";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [companiesCameToCollege, setCompaniesCameToCollege] = useState(0); // Initialize with 0
  const [companiesAppliedTo, setCompaniesAppliedTo] = useState(0); // Initialize with 0
  const [eligibleCount, setEligibleCount] = useState(0); // Initialize with 0
  const [ineligibleCount, setIneligibleCount] = useState(0); // Initialize with 0

  useEffect(() => {
    const getStudentStatistics = async () => {
      try {
        const res = await axios.get(`${BackendUrl}/api/student/statistics`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCompaniesCameToCollege(res.data.companiesCameToCollege.length || 0);
        setCompaniesAppliedTo(res.data.appliedJobs.length || 0);
      } catch (error) {
        console.error("Error fetching student statistics:", error);
      }
    };

    const getStudentJobStatistics = async () => {
      const res = await axios.get(`${BackendUrl}/api/student/job_statistics`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setEligibleCount(res.data.eligibleCount);
        setIneligibleCount(res.data.notEligibleCount);
      }
    };
    const getStudentAppliedJobs = async () => {
      const res = await axios.get(`${BackendUrl}/api/student/applied_jobs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
    };
    getStudentAppliedJobs();
    getStudentStatistics();
    getStudentJobStatistics();
  }, []);

  return (
    <div>
      <MainDashboard />
      {/* <JobCreationForm /> */}
      <div className="flex flex-col md:flex-row items-center justify-between ">
        <CompanyStatsChart
          companiesCame={companiesCameToCollege}
          companiesApplied={companiesAppliedTo}
        />
        <JobEligibilityPieChart
          eligibleCount={eligibleCount}
          notEligibleCount={ineligibleCount}
        />
      </div>
      <AppliedJobs />
      <RecommendedJob />
    </div>
  );
}
