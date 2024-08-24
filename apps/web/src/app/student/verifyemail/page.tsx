"use client";
import { useEffect } from "react";
import { signUpAndVerifyEmail, isUserVerified } from "@/config/firebase-config"; // Ensure you have a function to check verification status
import Link from "next/link";

export default function VerifyEmail() {
  const resendEmail = async () => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    if (email && password) {
      try {
        // @ts-ignore
        await signUpAndVerifyEmail(email, password);
        alert("Verification email resent. Please check your inbox.");
      } catch (error) {
        console.error("Error resending email:", error);
        alert("Failed to resend verification email. Please try again.");
      }
    } else {
      alert("Email or password not found in local storage.");
    }
  };

  const checkVerification = async () => {
    const email = localStorage.getItem("email");

    if (email) {
      try {
        // @ts-ignore
        const isVerified = await isUserVerified(email);
        if (isVerified) {
          window.location.href = "/student/dashboard";
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    } else {
      console.error("Email not found in local storage.");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkVerification();
    }, 3000); // Check every 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
          If you didn&apos;t receive the email, click the button below to resend
          it.
        </p>
        <button
          onClick={resendEmail}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
        >
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
