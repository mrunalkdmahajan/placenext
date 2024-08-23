"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { BackendUrl } from "@/utils/constants";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { StudentDetailFormValidations } from "@/utils/validations/StudentDetailFormValidations";

const ApplicationForm = () => {
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
          "/api/student/google_login",
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

  return (
    <div className="w-full mx-auto mt-12 p-5  rounded-lg bg-transparent flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6">Student Detail Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 w-full ">
          <h1>Personal Details</h1>
          <div className="flex flex-row gap-2 w-full justify-around">
            <div className="mb-4">
              <input
                {...register("firstName")}
                placeholder="First Name"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("middleName")}
                placeholder="Middle Name"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                {...register("lastName")}
                placeholder="Last Name"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>

            {/* <div className="mb-4">
              <input
                {...register("fullName")}
                placeholder="Full Name"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div> */}
          </div>
          <div className="flex flex-row gap-2 justify-around">
            <div className="mb-4">
              <input
                {...register("rollNumber")}
                placeholder="Roll Number"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("division")}
                placeholder="Division"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("gender")}
                placeholder="Gender"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2 w-full justify-around">
            <div className="mb-4">
              <input
                {...register("fatherName")}
                placeholder="Father Name"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("motherName")}
                placeholder="Mother Name"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("dateOfBirth")}
                placeholder="Date Of Birth"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2 w-full justify-around">
            <div className="mb-4">
              <input
                {...register("religion")}
                placeholder="Religion"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("caste")}
                placeholder="Caste"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("areYouSpeaciallyAbled")}
                placeholder="Are You Speacially Abled"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-lg font-bold ">Contact Details</h1>
          <div className="flex flex-row gap-2 justify-around">
            <div className="mb-4">
              <input
                {...register("alternateEmail")}
                placeholder="Alternate Email"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("phoneNumber")}
                placeholder="Phone Number"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("alternatePhoneNo")}
                placeholder="Alternate PhoneNo"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-around w-full">
            <div className="mb-4">
              <input
                {...register("address")}
                placeholder="Address"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("state")}
                placeholder="State"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("country")}
                placeholder="Country"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("pincode")}
                placeholder="Pincode"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h1>Academic Details</h1>
          <div className="flex flex-row gap-2 justify-around">
            <div className="mb-4">
              <input
                {...register("tenthPercentage")}
                placeholder="Tenth Percentage"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("Twelth Percentage")}
                placeholder="Twelth Percentage"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("cetPercentile")}
                placeholder="CET Percentile"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-around">
            <div className="mb-4">
              <input
                {...register("admissionYear")}
                placeholder="Admission Year"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("admissionCategory")}
                placeholder="Admission Category"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("gapInEducation")}
                placeholder="Gap In Education"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-around">
            <div className="mb-4">
              <input
                {...register("aggregateCgpi")}
                placeholder="Aggregate Cgpi"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("liveKt")}
                placeholder="Live Kt"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                {...register("deadKt")}
                placeholder="Dead Kt"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {getErrorMessage(errors.name)}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* previous */}

        <div className="flex flex-row gap-2 w-full justify-around">
          <div className="mb-4">
            <input
              {...register("universityPRN")}
              placeholder="University PRN"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {getErrorMessage(errors.name)}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-2 w-full justify-around">
          <div className="mb-4">
            <input
              {...register("passportSizePhoto")}
              type="file"
              placeholder="Passport Size Photo"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {getErrorMessage(errors.name)}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-2 w-full justify-around"></div>
        <div className="flex flex-row gap-2 justify-around"></div>

        <div className="mb-4">
          <input
            {...register("sem1Sgpi")}
            placeholder="Sem 1 SGPI"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("admissionType")}
            placeholder="Admission Type"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("signature")}
            placeholder="Signature"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#56B280] text-white p-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
      <p>
        Already have an account?
        <Link className="text-[#56B280] px-2" href="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default ApplicationForm;
