import { signUpAndVerifyEmail } from "@/config/firebase-config";
import Link from "next/link";
import React from "react";

export default function VerifyEmail() {
  const resendEmail = async () => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    //@ts-ignore
    await signUpAndVerifyEmail(email, password);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Verify Your Email
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Thank you for signing up for Placenext: One Stop Gateway to
          Opportunities! Please check your email to verify your account.
        </p>
        <p className="text-gray-600 text-center mb-6">
          If you didn't receive the email, click the button below to resend it.
        </p>
        <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">
          Resend Verification Email
        </button>
        <p className="text-gray-600 text-center mt-4">
          Already verified?
          <Link href="/student/login" className="text-blue-600 hover:underline">
            {" "}
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
