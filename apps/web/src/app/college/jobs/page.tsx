"use client";
import ApplicationCards from "@/components/own/Dashboard/ApplicationCards";
import { usePathname } from "next/navigation";
import withCollegeAuth from "@/config/services/College_Auth_service";


function CollegeJob() {
  return (
    <div className="bg-primary_background h-full">
      <ApplicationCards />
    </div>
  );
}
export default withCollegeAuth(CollegeJob);
