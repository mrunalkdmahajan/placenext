"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { BackendUrl } from "@/utils/constants";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { StudentApplicationFormValidations } from "@/utils/validations/ApplicationFormValidations";

interface UploadedDocuments {
  sem1Marksheet?: File | null;
  sem2Marksheet?: File | null;
  sem3Marksheet?: File | null;
  sem4Marksheet?: File | null;
  sem5Marksheet?: File | null;
  sem6Marksheet?: File | null;
  sem7Marksheet?: File | null;
  sem8Marksheet?: File | null;
}

const ApplicationForm = () => {
  const [sem1Marksheet, setSem1Marksheet] = useState<File | null>(null);
  const [sem2Marksheet, setSem2Marksheet] = useState<File | null>(null);
  const [sem3Marksheet, setSem3Marksheet] = useState<File | null>(null);
  const [sem4Marksheet, setSem4Marksheet] = useState<File | null>(null);
  const [sem5Marksheet, setSem5Marksheet] = useState<File | null>(null);
  const [sem6Marksheet, setSem6Marksheet] = useState<File | null>(null);
  const [sem7Marksheet, setSem7Marksheet] = useState<File | null>(null);
  const [sem8Marksheet, setSem8Marksheet] = useState<File | null>(null);

  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(StudentApplicationFormValidations),
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("sem1Marksheet", sem1Marksheet as File);
    formData.append("sem2Marksheet", sem2Marksheet as File);
    formData.append("sem3Marksheet", sem3Marksheet as File);
    formData.append("sem4Marksheet", sem4Marksheet as File);
    formData.append("sem5Marksheet", sem5Marksheet as File);
    formData.append("sem6Marksheet", sem6Marksheet as File);
    formData.append("sem7Marksheet", sem7Marksheet as File);
    formData.append("sem8Marksheet", sem8Marksheet as File);

    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      console.log(formData, data);
      if (token) {
        const response = await axios.post(
          `${BackendUrl}/api/student/register/applicationform`,
          { formData, ...data },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-refresh-token": refreshToken,
              "Content-Type": "multipart/form-data",
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
    if (error?.message) {
      return error.message;
    }
    return "Invalid value";
  };

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3)); // Move to next step
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0)); // Move to previous step
  };
  return (
    <div className="w-full mx-auto mt-12 p-5 rounded-lg bg-transparent flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Student Detail Form
      </h2>
      <hr />
      <hr />
      <hr />
      <div className="bg-[#f0f4f8] p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 0 && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Personal Details :</h1>
              <hr />
              <div className="flex flex-wrap gap-4 justify-between">
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">First Name</label>
                  <input
                    {...register("firstName")}
                    placeholder="Enter First Name"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.firstName)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Middle Name</label>
                  <input
                    {...register("middleName")}
                    placeholder="Enter Middle Name"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.middleName && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.middleName)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Last Name</label>
                  <input
                    {...register("lastName")}
                    placeholder="Enter Last Name"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.lastName)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-between">
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Gender</label>
                  <input
                    {...register("gender")}
                    placeholder="Enter Gender"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.gender)}
                    </p>
                  )}
                </div>

                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Father Name</label>
                  <input
                    {...register("fatherName")}
                    placeholder="Enter Father's Name"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.fatherName && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.fatherName)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Mother Name</label>
                  <input
                    {...register("motherName")}
                    placeholder="Enter Mother's Name"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.motherName && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.motherName)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-between"></div>
              <div className="flex flex-wrap gap-4 justify-between">
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Roll Number</label>
                  <input
                    {...register("rollNumber")}
                    placeholder="Enter Roll Number"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.rollNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.rollNumber)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Division</label>
                  <input
                    {...register("division")}
                    placeholder="Enter Division"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.division && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.division)}
                    </p>
                  )}
                </div>

                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Date Of Birth</label>
                  <input
                    type="date"
                    {...register("dateOfBirth")}
                    placeholder="Enter Date Of Birth"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />

                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.dateOfBirth)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Contact Details</h1>
              <hr />
              <hr />
              <div className="flex flex-wrap gap-4 justify-between">
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Email</label>
                  <input
                    {...register("email")}
                    placeholder="Enter Email"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.email)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Alternate Email</label>
                  <input
                    {...register("alternateEmail")}
                    placeholder="Enter Alternate Email"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.alternateEmail && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.alternateEmail)}
                    </p>
                  )}
                </div>
                {/* Aadhar Number */}
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Aadhar Number</label>
                  <input
                    {...register("aadharNumber")}
                    placeholder="Enter Aadhar Number"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.aadharNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.aadharNumber)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-between">
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Phone Number</label>
                  <input
                    {...register("phoneNumber")}
                    placeholder="Enter Phone Number"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.phoneNumber)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Alternate Phone No</label>
                  <input
                    {...register("alternatePhoneNo")}
                    placeholder="Enter Alternate Phone No"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.alternatePhoneNo && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.alternatePhoneNo)}
                    </p>
                  )}
                </div>
                {/* PAN Number */}
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">PAN Number</label>
                  <input
                    {...register("panNumber")}
                    placeholder="Enter PAN Number"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.panNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.panNumber)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-between">
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Address</label>
                  <input
                    {...register("address")}
                    placeholder="Enter Address"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.address)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">State</label>
                  <input
                    {...register("state")}
                    placeholder="Enter State"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.state)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Country</label>
                  <input
                    {...register("country")}
                    placeholder="Enter Country"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.country)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Pincode</label>
                  <input
                    {...register("pincode")}
                    placeholder="Enter Pincode"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.pincode)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Academic Details</h1>
              <hr />
              <hr />
              <div className="flex flex-wrap gap-4 justify-between">
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Course Type</label>
                  <input
                    {...register("courseType")}
                    placeholder="Enter Course Type"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.courseType && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.courseType)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Admission Year</label>
                  <input
                    {...register("admissionYear")}
                    placeholder="Enter Admission Year"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.admissionYear && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.admissionYear)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Department Name</label>
                  <input
                    {...register("departmentName")}
                    placeholder="Enter Department Name"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.departmentName && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.departmentName)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Tenth Percentage</label>
                  <input
                    {...register("tenthPercentage")}
                    placeholder="Enter Tenth Percentage"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.tenthPercentage && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.tenthPercentage)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">HSC Board</label>
                  <input
                    {...register("hscBoard")}
                    placeholder="Enter HSC Board"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.hscBoard && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.hscBoard)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">Twelfth Percentage</label>
                  <input
                    {...register("twelfthPercentage")}
                    placeholder="Enter Twelfth Percentage"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.twelfthPercentage && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.twelfthPercentage)}
                    </p>
                  )}
                </div>
                {/* SSC Board */}
                <div className="mb-4 w-68 lg:w-72 xl:w-96">
                  <label className="block mb-1">SSC Board</label>
                  <input
                    {...register("sscBoard")}
                    placeholder="Enter SSC Board"
                    className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {errors.sscBoard && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.sscBoard)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1>Academic Details</h1>
              <div className="flex flex-wrap gap-4 justify-between">
                <div className="mb-4 w-72 lg:w-72 xl:w-96">
                  <label className="block mb-1">Admission Year</label>
                  <input
                    {...register("admissionYear")}
                    placeholder="Enter Admission Year"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
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
                <div className="mb-4 w-72 lg:w-72 xl:w-96">
                  <label className="block mb-1">Sem 1 Grade</label>
                  <input
                    {...register("sem1")}
                    placeholder="Enter Sem 1 Grade"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.sem1 && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.sem1)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-72 lg:w-72 xl:w-96">
                  <label className="block mb-1">Sem 2 Grade</label>
                  <input
                    {...register("sem2")}
                    placeholder="Enter Sem 2 Grade"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.sem2 && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.sem2)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-72 lg:w-72 xl:w-96">
                  <label className="block mb-1">Sem 3 Grade</label>
                  <input
                    {...register("sem3")}
                    placeholder="Enter Sem 3 Grade"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.sem3 && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.sem3)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-72 lg:w-72 xl:w-96">
                  <label className="block mb-1">Sem 4 Grade</label>
                  <input
                    {...register("sem4")}
                    placeholder="Enter Sem 4 Grade"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.sem4 && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.sem4)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-72 lg:w-72 xl:w-96">
                  <label className="block mb-1">Sem 5 Grade</label>
                  <input
                    {...register("sem5")}
                    placeholder="Enter Sem 5 Grade"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.sem5 && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.sem5)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-72 lg:w-72 xl:w-96">
                  <label className="block mb-1">Sem 6 Grade</label>
                  <input
                    {...register("sem6")}
                    placeholder="Enter Sem 6 Grade"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.sem6 && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.sem6)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-72 lg:w-72 xl:w-96">
                  <label className="block mb-1">Sem 7 Grade</label>
                  <input
                    {...register("sem7")}
                    placeholder="Enter Sem 7 Grade"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.sem7 && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.sem7)}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-72 lg:w-72 xl:w-96">
                  <label className="block mb-1">Sem 8 Grade</label>
                  <input
                    {...register("sem8")}
                    placeholder="Enter Sem 8 Grade"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.sem8 && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.sem8)}
                    </p>
                  )}
                </div>
              </div>

              <h1 className="text-2xl font-bold mb-6">
                Upload Semester Marksheet
              </h1>
              {/* 
              <label htmlFor="avatar">Avatar</label>
              <input
                id="avatar"
                name="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300"
                type="file"
              />
              */}
              <div className="flex flex-wrap gap-4 justify-between">
                {/* {Array.from({ length: 8 }, (_, index) => {
                  const semNumber = index + 1;
                  return (
                    <div key={semNumber} className="mb-4 w-72 lg:w-72 xl:w-96">
                      <label className="block mb-1">
                        Upload Sem {semNumber} Marksheet
                      </label>
                      <input
                        type="file"
                        accept=".pdf" // Accept only PDF files
                        onChange={(e) => handleFileChange(e, semNumber)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  );
                })} */}
                <div className="mb-4 w-72 lg:w-72 xl:w-96">
                  <label className="block mb-1">Sem 1 Marksheet</label>
                  <input
                    type="file"
                    accept=".pdf" // Accept only PDF files
                    //@ts-ignore
                    value={sem1Marksheet}
                    //@ts-ignore
                    onChange={(e) => setSem1Marksheet(e.target.files[0])}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-between">
                <div className="mb-4 w-72 lg:w-72 xl:w-96">
                  <label className="block mb-1">CET</label>
                  <input
                    {...register("cet")}
                    placeholder="Enter CET Score"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.cet && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessage(errors.cet)}
                    </p>
                  )}
                </div>
              </div>
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
            {step < 3 ? (
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
    </div>
  );
};

export default ApplicationForm;
