import Link from "next/link";
import { useForm } from "react-hook-form";

export default function ApplicationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const getErrorMessage = (error: any) => {
    if (typeof error === "string") {
      return error;
    }
    if (error && error.message) {
      return error.message;
    }
    return "Invalid value";
  };

  return (
    // fields we are going to take are   coll_id string pk
    //   coll_name string
    //   coll_website url
    //   coll_no_of_stud number
    //   coll_location string
    //   coll_contact_no string
    //   coll_no_employ string
    //   coll_address string
    //   coll_affiliation string
    //   coll_courses_offered string[]
    //   coll_departments string[] fk
    <div className="max-w-md mx-auto mt-12 p-2 rounded-lg bg-transparent md:p-5 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
          <input
            {...register("collegeName")}
            placeholder="College Name"
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.collegeName && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.collegeName)}
            </p>
          )}
        </div>
        <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
          <input
            type="text"
            {...register("collegeWebsite")}
            placeholder="College Website URL"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.collegeWebsite && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.collegeWebsite)}
            </p>
          )}
        </div>
        <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
          <input
            type="number"
            {...register("collegeNoOfStudents")}
            placeholder="Number of Students"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.collegeNoOfStudents && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.collegeNoOfStudents)}
            </p>
          )}
        </div>
        <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
          <input
            type="text"
            {...register("collegeLocation")}
            placeholder="College Location"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.collegeLocation && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.collegeLocation)}
            </p>
          )}
        </div>
        <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
          <input
            type="text"
            {...register("collegeContactNo")}
            placeholder="College Contact Number"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.collegeContactNo && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.collegeContactNo)}
            </p>
          )}
        </div>
        <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
          <input
            type="text"
            {...register("collegeNoOfEmployees")}
            placeholder="Number of Employees"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.collegeNoOfEmployees && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.collegeNoOfEmployees)}
            </p>
          )}
        </div>
        <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
          <input
            type="text"
            {...register("collegeAddress")}
            placeholder="College Address"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.collegeAddress && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.collegeAddress)}
            </p>
          )}
        </div>
        <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
          <input
            type="text"
            {...register("collegeAffiliation")}
            placeholder="College Affiliation"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.collegeAffiliation && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.collegeAffiliation)}
            </p>
          )}
        </div>
        <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
          <input
            type="text"
            {...register("collegeCoursesOffered")}
            placeholder="College Courses Offered"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.collegeCoursesOffered && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.collegeCoursesOffered)}
            </p>
          )}
        </div>
        <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
          <input
            type="text"
            {...register("collegeDepartment")}
            placeholder="College Department"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.collegeDepartment && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.collegeDepartment)}
            </p>
          )}
        </div>
        <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
          <input
            type="text"
            {...register("collegeDepartment")}
            placeholder="College Department"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.collegeDepartment && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.collegeDepartment)}
            </p>
          )}
        </div>
        <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
          <input
            type="text"
            {...register("collegeDepartment")}
            placeholder="College Department"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.collegeDepartment && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.collegeDepartment)}
            </p>
          )}
        </div>
        <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
          <input
            type="text"
            {...register("collegeDepartment")}
            placeholder="College Department"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.collegeDepartment && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.collegeDepartment)}
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
        Don&apos;t have an Account?
        <Link className="text-[#56B280] px-2" href="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
