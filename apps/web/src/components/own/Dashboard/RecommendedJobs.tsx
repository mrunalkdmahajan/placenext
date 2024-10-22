"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "@/utils/constants";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface RecommededJobs {
  _id: string;
  job_title: string;
  company_name: string;
  job_location: string;
  job_salary: number;
  job_description: string;
  job_timing: string;
}

// interface RecommendedJobs {
//   _id: string;
//   app_cover_letter: string;
//   app_status: string;
// : Job;
// }

const RecommendedJob = () => {
  const router = useRouter();
  const [appliedJobs, setAppliedJobs] = useState<RecommededJobs[]>([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `${BackendUrl}/api/student/recommended_jobs`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setAppliedJobs(response.data.jobs);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppliedJobs();
  }, []);

  return (
    <div
      className={`w-full mx-auto py-6 ${appliedJobs.length === 0 ? "hidden" : ""}`}
    >
      <h2 className="text-2xl font-bold mb-6">Applied Jobs</h2>

      <div className="max-h-[500px] overflow-auto space-y-4">
        {appliedJobs.map((appliedJob) => (
          <Card key={appliedJob._id} variant="outlined">
            <button
              onClick={() => router.push(`/student/applyjob/${appliedJob._id}`)}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  {appliedJob.job_title}
                </Typography>
                <Typography color="text.secondary">
                  {appliedJob.company_name} - {appliedJob.job_location}
                </Typography>
                <Typography variant="body2" className="my-2">
                  {appliedJob.job_description}
                </Typography>
                <Typography variant="body2">
                  <strong>Salary: </strong> ₹{appliedJob.job_salary}
                </Typography>
                <Typography variant="body2">
                  <strong>Working Hours: </strong> {appliedJob.job_timing}
                </Typography>
                {/* <Typography variant="body2" className="my-2">
                <strong>Status: </strong> {appliedJob.app_status}
              </Typography> */}
                {/* 
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href={appliedJob.app_cover_letter}
                target="_blank"
              >
                View Cover Letter
              </Button> */}
              </CardContent>
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJob;
