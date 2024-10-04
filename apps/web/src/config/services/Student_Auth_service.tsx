"use client";

import { BackendUrl } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const authenticateUser = async () => {
        const res = await axios.get(`${BackendUrl}/api/student/auth`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.data.success) {
          router.push("/login");
        }
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
