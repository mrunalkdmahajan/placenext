"use client";
import MainDashboard from "@/components/own/Dashboard/MainDashboard";
import StudentStatisticsChart from "@/components/own/Dashboard/StudentStatisticsChart";
import { BackendUrl } from "@/utils/constants";
import axios from "axios";
import { headers } from "next/headers";
import { useEffect, useState } from "react";

export default function Dashboard() {
  return (
    <div>
      <StudentStatisticsChart />
    </div>
  );
}
