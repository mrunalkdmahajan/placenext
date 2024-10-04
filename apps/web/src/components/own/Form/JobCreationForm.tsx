"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "@/utils/constants";

interface College {
  id: string;
  name: string;
}

const JobCreationForm: React.FC = () => {
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
    status: "",
    college: "",
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
        console.log(response.data);
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
      //@ts-ignore
      const updatedArray = [...formData[field as keyof typeof formData]];
      updatedArray[index] = value;
      setFormData({ ...formData, [field]: updatedArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addField = (field: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: [
        ...(prevFormData[field as keyof typeof prevFormData] as string[]),
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

      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}

      <div className="bg-[#f0f4f8] p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Job Information Fields */}
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="mb-4 w-full lg:w-72 xl:w-96">
              <label className="block mb-1">Job Title</label>
              <input
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                placeholder="Enter job title"
                className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div className="mb-4 w-full lg:w-72 xl:w-96">
              <label className="block mb-1">College</label>
              <select
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              >
                <option value="">Select College</option>
                {colleges.map((college) => (
                  <option key={college.id} value={college.id}>
                    {college.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Other fields such as job_type, job_location, salary, etc. */}

            <div className="mb-4 w-full lg:w-72 xl:w-96">
              <label className="block mb-1">Job Requirements</label>
              {formData.job_requirements.map((requirement, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => handleChange(e, index, "job_requirements")}
                    placeholder="Enter job requirement"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField("job_requirements")}
                className="text-blue-500 hover:underline"
              >
                Add Requirement
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobCreationForm;
