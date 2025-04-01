"use client";
import { useEffect } from "react";
import useThemeStore from "@/store/store";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Loading from "@/components/own/Loading";
import { Toaster } from "@/components/ui/company/sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Destructure initializeTheme from the store
  const { initializeTheme }: any = useThemeStore();

  useEffect(() => {
    // Initialize the theme on the first render
    initializeTheme();
  }, [initializeTheme]);

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/assets/PlaceNext_logo.png"
          type="image/x-icon"
        />
      </head>
      <body className={inter.className}>
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Toaster/>
        <Loading />
      </body>
    </html>
  );
}
