"use client";

import { BackendUrl } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withCollegeAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const authenticateUser = async () => {
        const res = await axios.get(`${BackendUrl}/api/college/auth`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.data.success) {
          router.push("/authentication/facultyLogin");
        }
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withCollegeAuth;
