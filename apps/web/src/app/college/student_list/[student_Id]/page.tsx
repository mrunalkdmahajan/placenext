"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function StudentById() {
  const { student_Id } = useParams();
  useEffect(() => {
    // const fetchStudent = async () => {
  }, []);
  return <div>{student_Id}</div>;
}
