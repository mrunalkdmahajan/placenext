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
          `${BackendUrl}/api/student/google_login`,
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
    if (error?.message) {
      return error.message;
    }
    return "Invalid value";
  };

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 2)); // Move to next step
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0)); // Move to previous step
  };

  return (
    <div className="w-full mx-auto mt-12 p-5 rounded-lg bg-transparent flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6">Student Detail Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && (
          <div>
            <h1>Personal Details</h1>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
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
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
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
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
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
            </div>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
                <label className="block mb-1">Roll Number</label>
                <input
                  {...register("rollNumber")}
                  placeholder="Enter Roll Number"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
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
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.division && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.division)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
                <label className="block mb-1">Gender</label>
                <input
                  {...register("gender")}
                  placeholder="Enter Gender"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.gender)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
                <label className="block mb-1">Father Name</label>
                <input
                  {...register("fatherName")}
                  placeholder="Enter Father's Name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
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
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.motherName && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.motherName)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
                <label className="block mb-1">Date Of Birth</label>
                <input
                  {...register("dateOfBirth")}
                  placeholder="Enter Date Of Birth"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
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
            <h1>Contact Details</h1>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
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
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
                <label className="block mb-1">Phone Number</label>
                <input
                  {...register("phoneNumber")}
                  placeholder="Enter Phone Number"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
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
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.alternatePhoneNo && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.alternatePhoneNo)}
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
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
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
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
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
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
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
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
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
            <h1>Academic Details</h1>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
                <label className="block mb-1">Tenth Percentage</label>
                <input
                  {...register("tenthPercentage")}
                  placeholder="Enter Tenth Percentage"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.tenthPercentage && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.tenthPercentage)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
                <label className="block mb-1">Twelfth Percentage</label>
                <input
                  {...register("twelfthPercentage")}
                  placeholder="Enter Twelfth Percentage"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.twelfthPercentage && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.twelfthPercentage)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
                <label className="block mb-1">CET Percentile</label>
                <input
                  {...register("cetPercentile")}
                  placeholder="Enter CET Percentile"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.cetPercentile && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.cetPercentile)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
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
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
                <label className="block mb-1">Admission Category</label>
                <input
                  {...register("admissionCategory")}
                  placeholder="Enter Admission Category"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.admissionCategory && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.admissionCategory)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
                <label className="block mb-1">Gap In Education</label>
                <input
                  {...register("gapInEducation")}
                  placeholder="Enter Gap In Education"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.gapInEducation && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.gapInEducation)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
                <label className="block mb-1">Aggregate CGPI</label>
                <input
                  {...register("aggregateCgpi")}
                  placeholder="Enter Aggregate CGPI"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.aggregateCgpi && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.aggregateCgpi)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
                <label className="block mb-1">Live KT</label>
                <input
                  {...register("liveKt")}
                  placeholder="Enter Live KT"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.liveKt && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.liveKt)}
                  </p>
                )}
              </div>
              <div className="mb-4 w-68 lg:w-72 xl:w-96">
                <label className="block mb-1">Dead KT</label>
                <input
                  {...register("deadKt")}
                  placeholder="Enter Dead KT"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
                />
                {errors.deadKt && (
                  <p className="text-red-500 text-sm mt-1">
                    {getErrorMessage(errors.deadKt)}
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
