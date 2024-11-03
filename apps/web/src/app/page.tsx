"use client";

import Hero from "@/components/own/Landing/Hero";
import LandingNav from "@/components/own/Nav/LandingNav";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure component renders only on the client side
    document.documentElement.classList.add("dark"); // Set dark mode by default
  }, []);

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
        <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <LandingNav />
          <AuroraBackground>
            <motion.div
              initial={{ opacity: 0.0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: "easeOut",
              }}
              className="relative flex flex-col gap-6 items-center justify-center px-6 text-center"
            >
              <h1 className="text-3xl md:text-6xl font-bold dark:text-white text-gray-900">
                Shape Your Future with{" "}
                <span className="text-blue-500">Placenext</span>
              </h1>
              <p className="text-base md:text-2xl font-light text-gray-700 dark:text-gray-300 mt-3">
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
            </motion.div>
          </AuroraBackground>

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
