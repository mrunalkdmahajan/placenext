// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { BackendUrl } from "@/utils/constants";
// import { StudentDetailFormValidations } from "@/utils/validations/StudentDetailFormValidations";

// export default function ProfilePage() {
//   const [applicationData, setApplicationData] = useState(null);
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(StudentDetailFormValidations),
//   });

//   useEffect(() => {
//   //   const fetchApplicationDetails = async () => {
//   //     try {
//   //       const token = localStorage.getItem("token");
//   //       if (token) {
//   //         const response = await axios.get(
//   //           `${BackendUrl}/api/student/applicationform`,
//   //           {
//   //             headers: {
//   //               Authorization: `Bearer ${token}`,
//   //             },
//   //           }
//   //         );
//   //         setApplicationData(response.data);
//   //         // Set form values with fetched data
//   //         for (const key in response.data) {
//   //           setValue(key, response.data[key]);
//   //         }
//   //       }
//   //     } catch (error: any) {
//   //       console.error("Error fetching application details:", error.message);
//   //     }
//   //   };

//   //   fetchApplicationDetails();
//   // }, [setValue]);

//   const getErrorMessage = (error: any) => {
//     if (error?.message) {
//       return error.message;
//     }
//     return "Invalid value";
//   };

//   const onSubmit = async (data: any) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         const response = await axios.put(
//           `${BackendUrl}/api/student/register/applicationform`,
//           { data },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("Update response:", response.data);
//       }
//     } catch (error: any) {
//       console.error("Update error:", error.message);
//     }
//   };

//   return (
//     <div className="w-full mx-auto mt-12 p-5 rounded-lg bg-transparent flex-col gap-4">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Edit Application Form
//       </h2>
//       <div className="bg-[#f0f4f8] p-8 rounded-lg shadow-md">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {applicationData ? (
//             <div>
//               <h1 className="text-2xl font-bold mb-6">Personal Details:</h1>
//               <div className="flex flex-wrap gap-4 justify-between">
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">First Name</label>
//                   <input
//                     {...register("firstName")}
//                     placeholder="Enter First Name"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.firstName && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.firstName)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Middle Name</label>
//                   <input
//                     {...register("middleName")}
//                     placeholder="Enter Middle Name"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.middleName && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.middleName)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Last Name</label>
//                   <input
//                     {...register("lastName")}
//                     placeholder="Enter Last Name"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.lastName && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.lastName)}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-4 justify-between">
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Gender</label>
//                   <input
//                     {...register("gender")}
//                     placeholder="Enter Gender"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.gender && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.gender)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Father Name</label>
//                   <input
//                     {...register("fatherName")}
//                     placeholder="Enter Father's Name"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.fatherName && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.fatherName)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Mother Name</label>
//                   <input
//                     {...register("motherName")}
//                     placeholder="Enter Mother's Name"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.motherName && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.motherName)}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-4 justify-between">
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Roll Number</label>
//                   <input
//                     {...register("rollNumber")}
//                     placeholder="Enter Roll Number"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.rollNumber && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.rollNumber)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Division</label>
//                   <input
//                     {...register("division")}
//                     placeholder="Enter Division"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.division && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.division)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Date Of Birth</label>
//                   <input
//                     type="date"
//                     {...register("dateOfBirth")}
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.dateOfBirth && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.dateOfBirth)}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <h1 className="text-2xl font-bold mb-6">Contact Details:</h1>
//               <div className="flex flex-wrap gap-4 justify-between">
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Email</label>
//                   <input
//                     {...register("email")}
//                     placeholder="Enter Email"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.email)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Alternate Email</label>
//                   <input
//                     {...register("alternateEmail")}
//                     placeholder="Enter Alternate Email"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.alternateEmail && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.alternateEmail)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Aadhar Number</label>
//                   <input
//                     {...register("aadharNumber")}
//                     placeholder="Enter Aadhar Number"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.aadharNumber && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.aadharNumber)}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-4 justify-between">
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Phone Number</label>
//                   <input
//                     {...register("phoneNumber")}
//                     placeholder="Enter Phone Number"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.phoneNumber && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.phoneNumber)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Alternate Phone No</label>
//                   <input
//                     {...register("alternatePhoneNo")}
//                     placeholder="Enter Alternate Phone No"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.alternatePhoneNo && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.alternatePhoneNo)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">PAN Number</label>
//                   <input
//                     {...register("panNumber")}
//                     placeholder="Enter PAN Number"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.panNumber && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.panNumber)}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <h1 className="text-2xl font-bold mb-6">Academic Details:</h1>
//               <div className="flex flex-wrap gap-4 justify-between">
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Course Type</label>
//                   <input
//                     {...register("courseType")}
//                     placeholder="Enter Course Type"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.courseType && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.courseType)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Admission Year</label>
//                   <input
//                     {...register("admissionYear")}
//                     placeholder="Enter Admission Year"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.admissionYear && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.admissionYear)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Department Name</label>
//                   <input
//                     {...register("departmentName")}
//                     placeholder="Enter Department Name"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.departmentName && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.departmentName)}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-4 justify-between">
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Tenth Percentage</label>
//                   <input
//                     {...register("tenthPercentage")}
//                     placeholder="Enter Tenth Percentage"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.tenthPercentage && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.tenthPercentage)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">HSC Board</label>
//                   <input
//                     {...register("hscBoard")}
//                     placeholder="Enter HSC Board"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.hscBoard && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.hscBoard)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="mb-4 w-68 lg:w-72 xl:w-96">
//                   <label className="block mb-1">Twelfth Percentage</label>
//                   <input
//                     {...register("twelfthPercentage")}
//                     placeholder="Enter Twelfth Percentage"
//                     className="w-full p-2 border border-blue-500 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   />
//                   {errors.twelfthPercentage && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {getErrorMessage(errors.twelfthPercentage)}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-end mt-4">
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
//                 >
//                   Update
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <p>Loading application data...</p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }
