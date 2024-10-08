"use client";
import LandingNav from "@/components/own/Nav/LandingNav";
import { useEffect, useState } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures rendering happens only on the client-side
  }, []);
  const handleClick = () => {
    toast.success("Welcome to the application!", {
      position: "top-right",
      autoClose: 3000,
    });
    toast.error("Welcome to the application!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  return (
    <>
      {isClient && (
        <div>
          <LandingNav />
          <button
            onClick={handleClick}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Show Welcome Toast
          </button>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </div>
      )}
    </>
  );
}
