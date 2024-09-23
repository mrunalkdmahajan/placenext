"use client";

import { BackendUrl } from "@/utils/constants";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios"
import Cookies from "js-cookies"

export default function StudentById() {
  const { student_Id } = useParams();
  const [student,setStudent ] = useState({});
  useEffect(() => {
    const fetchStudentById = async ()=>{
      const res = await axios.get(`${BackendUrl}/api/college/get_student/${student_Id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      
      if(res.data.success){
        setStudent(res.data.student);
      }
    }
  }, []);
  return <div>{student_Id}</div>;
}
