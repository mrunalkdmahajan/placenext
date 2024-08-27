"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { BackendUrl } from "@/utils/constants";
import { useForm } from "react-hook-form";
import { StudentDetailFormValidations } from "@/utils/validations/StudentDetailFormValidations";
import { useState } from "react";

const ApplicationForm = () => {
  const [step, setStep] = useState(0);
  const [uploadedDocuments, setUploadedDocuments] = useState<{
    [key: string]: string;
  }>({});
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
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <div key={sem} className="mb-4 w-72 lg:w-72 xl:w-96">
                    <label className="block mb-1">Sem {sem} Grade</label>
                    <input
                      {...register(`sem${sem}`)}
                      placeholder={`Enter Sem ${sem} Grade`}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
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
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
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
