"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "@/utils/constants"; // Adjust the import path according to your project structure
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

interface College {
  id: string;
  name: string;
}

interface EligibilityCriteria {
  criteria: string;
  value: string;
}

const JobCreationForm: React.FC = () => {
  const router = useRouter();
  const [colleges, setColleges] = useState<College[]>([]);
  const [formData, setFormData] = useState({
    job_title: "",
    job_type: "",
    job_location: "",
    job_salary: "",
    job_description: "",
    job_requirements: [] as string[],
    job_posted_date: "",
    yr_of_exp_req: "",
    job_timing: "",
    status: "", // Add status
    college: "",
    min_CGPI: "", // Add min_CGPI
    max_no_dead_kt: "", // Add max_no_dead_kt
    max_no_live_kt: "", // Add max_no_live_kt
    branch_allowed: "", // Add branch_allowed
    passing_year: "", // Add passing_year
    company_name: "", // Add company_name
    eligibility_criteria: [] as EligibilityCriteria[], // Field for eligibility criteria
  });

  const [eligibility, setEligibility] = useState({
    criteria: "",
    value: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(`${BackendUrl}/api/student/colleges`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setColleges(response.data.colleges);
        }
      } catch (error) {
        setError("Failed to load colleges. Please try again.");
      }
    };
    fetchColleges();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index?: number,
    field?: string
  ) => {
    const { name, value } = e.target;

    if (index !== undefined && field) {
      const updatedArray = [
        ...(formData[field as keyof typeof formData] as string[]),
      ];
      updatedArray[index] = value;
      setFormData({ ...formData, [field]: updatedArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEligibilityChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setEligibility({ ...eligibility, [e.target.name]: e.target.value });
  };

  const addEligibilityCriteria = () => {
    if (eligibility.criteria && eligibility.value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        eligibility_criteria: [
          ...prevFormData.eligibility_criteria,
          { criteria: eligibility.criteria, value: eligibility.value },
        ],
      }));
      setEligibility({ criteria: "", value: "" }); // Reset eligibility inputs
    }
  };

  const addField = (field: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: [
        ...(prevFormData[field as keyof typeof formData] as string[]),
        "",
      ],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${BackendUrl}/api/college/create_job`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess("Job created successfully!");
      // Reset formData
      setFormData({
        job_title: "",
        job_type: "",
        job_location: "",
        job_salary: "",
        job_description: "",
        job_requirements: [],
        job_posted_date: "",
        yr_of_exp_req: "",
        job_timing: "",
        status: "",
        college: "",
        min_CGPI: "",
        max_no_dead_kt: "",
        max_no_live_kt: "",
        branch_allowed: "",
        passing_year: "",
        company_name: "",
        eligibility_criteria: [],
      });
    } catch (error) {
      setError("Error creating job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto mt-12 p-5 rounded-lg bg-transparent flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Job Creation Form</h2>
      <Button onClick={() => router.back()} variant="contained">
        Back
      </Button>

      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}

      <div className="bg-[#f0f4f8] p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Job Information Fields */}
          <div className="flex flex-wrap gap-4 justify-between">
            {[
              "job_title",
              "job_type",
              "job_location",
              "job_salary(lakhs)",
              "job_description",
              "job_posted_date",
              "yr_of_exp_req",
              "job_timing",
              "status",
              "company_name", // Include company_name
              "min_CGPI", // Add min_CGPI
              "max_no_dead_kt", // Add max_no_dead_kt
              "max_no_live_kt", // Add max_no_live_kt
              "branch_allowed", // Add branch_allowed
              "passing_year", // Add passing_year
            ].map((field) => (
              <div key={field} className="mb-4 w-68 lg:w-72 xl:w-96">
                <label className="block mb-1">
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type="text"
                  name={field}
                  //@ts-ignore
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={`Enter ${field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}`}
                  className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            ))}
          </div>

          {/* Eligibility Criteria Fields */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Eligibility Criteria</h3>
            <input
              type="text"
              name="criteria"
              value={eligibility.criteria}
              onChange={handleEligibilityChange}
              placeholder="Criteria"
              className="w-full mb-2 p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              name="value"
              value={eligibility.value}
              onChange={handleEligibilityChange}
              placeholder="Value"
              className="w-full mb-2 p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={addEligibilityCriteria}
              className="p-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-700"
            >
              Add Criteria
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 mt-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-700"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobCreationForm;
