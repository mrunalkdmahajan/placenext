"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignValidation } from "@/utils/validations/SignValidation";

import axios from "axios";

import { BackendUrl } from "@/utils/constants";
import Link from "next/link";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignValidation),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post(`${BackendUrl}/api/customers/signup`, data);
      // @ts-ignore

      // @ts-ignore
      if (res.data.success) navigator("/email-sent");
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
    <div className="max-w-md mx-auto mt-12 p-5  rounded-lg bg-transparent flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register("name")}
            placeholder="Name"
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
            {...register("email")}
            placeholder="Email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.email)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.password)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("phone")}
            placeholder="Phone"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.phone)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("laneAddress")}
            placeholder="Lane Address"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
          />
          {errors.laneAddress && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.laneAddress)}
            </p>
          )}
        </div>

        <div className="flex flex-row justify-between gap-4">
          <div className="mb-4">
            <input
              {...register("city")}
              placeholder="City"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {getErrorMessage(errors.city)}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("pincode")}
              placeholder="Pincode"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">
                {getErrorMessage(errors.pincode)}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between gap-4">
          <div className="mb-4">
            <input
              {...register("state")}
              placeholder="State"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {getErrorMessage(errors.state)}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("country")}
              placeholder="Country"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {getErrorMessage(errors.country)}
              </p>
            )}
          </div>
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

export default SignUpForm;
