"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { BackendUrl } from "@/utils/constants";
import { useForm } from "react-hook-form";
import { StudentDetailFormValidations } from "@/utils/validations/StudentDetailFormValidations";
import { useState } from "react";

const ApplicationForm = () => {
  const [step, setStep] = useState(0); // Track current step
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(StudentDetailFormValidations),
  });

  const onSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.post(
          `${BackendUrl}/api/student/register/applicationform`,
          { data },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
      }
    } catch (error: any) {
      console.error("Signup error:", error.message);
    }
  };

  const getErrorMessage = (error: any) => {
    return error?.message || "Invalid value";
  };

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full mx-auto mt-12 p-5 rounded-lg bg-transparent flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6">Student Detail Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && (
          <div>
            <h1>Personal Details</h1>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">First Name</label>
                <input
                  {...register("firstName")}
                  placeholder="Enter First Name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.firstName)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Middle Name</label>
                <input
                  {...register("middleName")}
                  placeholder="Enter Middle Name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.middleName && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.middleName)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Last Name</label>
                <input
                  {...register("lastName")}
                  placeholder="Enter Last Name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.lastName)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Mother&apos;s Name</label>
                <input
                  {...register("mothersName")}
                  placeholder="Enter Mothers Name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.lastName)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Mother&apos;s Name</label>
                <input
                  {...register("fathersName")}
                  placeholder="Enter Father's Name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.lastName)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Email</label>
                <input
                  {...register("email")}
                  placeholder="Enter Email"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.email)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Phone</label>
                <input
                  {...register("phone")}
                  placeholder="Enter Phone"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.phone)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Date Of Birth</label>
                <input
                  {...register("dob")}
                  placeholder="Enter Date Of Birth"
                  type="date"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.dob)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Course</label>
                <input
                  {...register("course")}
                  placeholder="Enter Course"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.course && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.course)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Year</label>
                <input
                  {...register("year")}
                  placeholder="Enter Year"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.year && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.year)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Department</label>
                <input
                  {...register("department")}
                  placeholder="Enter Department"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.department)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Address</label>
                <input
                  {...register("address")}
                  placeholder="Enter Address"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.address)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">College</label>
                <input
                  {...register("college")}
                  placeholder="Enter College"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.college && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.college)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-72  lg:w-72 xl:w-96">
                <label className="block mb-1">Resume</label>
                <input
                  {...register("resume")}
                  placeholder="Upload Resume"
                  type="file"
                  className=" w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.resume && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.resume)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h1>Contact Details</h1>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Alternate Email</label>
                <input
                  {...register("alternateEmail")}
                  placeholder="Enter Alternate Email"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.alternateEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.alternateEmail)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Alternate Phone</label>
                <input
                  {...register("alternatePhone")}
                  placeholder="Enter Alternate Phone"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.alternatePhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.alternatePhone)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Cap Allotment</label>
                <input
                  {...register("capAllotment")}
                  placeholder="Enter CAP Allotment"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.capAllotment && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.capAllotment)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Photo with Signature</label>
                <input
                  {...register("photoWithSignature")}
                  placeholder="Upload Photo with Signature"
                  type="file"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.photoWithSignature && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.photoWithSignature)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Gap Certificate</label>
                <input
                  {...register("gapCertificate")}
                  placeholder="Upload Gap Certificate"
                  type="file"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.gapCertificate && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.gapCertificate)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Aadhar</label>
                <input
                  {...register("aadhar")}
                  placeholder="Enter Aadhar Number"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.aadhar && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.aadhar)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1>Academic Details</h1>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">Admission Year</label>
                <input
                  {...register("admissionYear")}
                  placeholder="Enter Admission Year"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.admissionYear && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.admissionYear)}
                  </p>
                )}
              </div>
            </div>

            <h2 className="mt-4">Enter Semester Grades</h2>
            <div className="flex flex-wrap gap-4 justify-between">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <div key={sem} className="mb-4 w-72 lg:w-72 xl:w-96">
                  <label className="block mb-1">Sem {sem} Grade</label>
                  <input
                    {...register(`sem${sem}`)}
                    placeholder={`Enter Sem ${sem} Grade`}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                  />
                  {errors[`sem${sem}`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors[`sem${sem}`])}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <h2 className="mt-4">Upload Semester Marksheet</h2>
            <div className="flex flex-wrap gap-4 justify-between">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <div key={sem} className="mb-4 w-72 lg:w-72 xl:w-96">
                  <label className="block mb-1">
                    Upload Sem {sem} Marksheet
                  </label>
                  <input
                    {...register(`sem${sem}Marksheet`)}
                    type="file"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                  />
                  {errors[`sem${sem}Marksheet`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors[`sem${sem}Marksheet`])}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-72 lg:w-72 xl:w-96">
                <label className="block mb-1">CET</label>
                <input
                  {...register("cet")}
                  placeholder="Enter CET Score"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.cet && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.cet)}
                  </p>
                )}
              </div>
            </div>

            {/* Add more fields as necessary */}
          </div>
        )}

        <div className="flex justify-between mt-4">
          {step > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-primary text-white p-2 rounded hover:bg-green-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primary text-white p-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
