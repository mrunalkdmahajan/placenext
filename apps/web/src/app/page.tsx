"use client";

import Hero from "@/components/own/Landing/Hero";
import LandingNav from "@/components/own/Nav/LandingNav";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useThemeStore from "../store/store";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { darkMode, toggleDarkMode }: any = useThemeStore();
  useEffect(() => {
    setIsClient(true); // Ensure component renders only on the client side
    // document.documentElement.classList.add("dark"); // Set dark mode by default
    // Toggle the dark class on the body
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const handleClick = () => {
    toast.success("Welcome to Placenext!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  };

  return (
    <>
      {isClient && (
        <div className="relative min-h-screen bg-gradient-to-b h-full from-gray-800 to-gray-900">
          <LandingNav />
          <div className="min-h-screen w-full bg-main_background dark:bg-main_dark_background flex flex-col items-center justify-center overflow-hidden rounded-md">
            {/* <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
              PlaceNext
            </h1> */}
            <h1 className="text-3xl md:text-6xl font-bold dark:text-white text-gray-700">
              Shape Your Future with{" "}
              <span className="text-blue-500">Placenext</span>
            </h1>
            <p className="text-base md:text-2xl font-light text-gray-400 dark:text-gray-500 mt-3">
              Your pathway to career success starts here. Discover
              opportunities, unlock potential, and connect with top companies.
            </p>
            <Link href="/authentication/studentLogin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClick}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-400 rounded-full px-6 py-3 text-lg font-semibold"
              >
                Get Started
              </motion.button>
            </Link>
            <div className="w-[40rem] h-40 relative">
              {/* Gradients */}
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

              {/* Core component */}
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div className="absolute inset-0 w-full h-full dark:bg-main_dark_background bg-main_background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </div>

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </div>
      )}
    </>
  );
}
