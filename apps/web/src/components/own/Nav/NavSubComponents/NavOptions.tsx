"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const NavOption = {
  AboutUs: "/aboutus",
  Services: "/services",
  "Use Cases": "/usecases",
  Pricing: "/pricing",
  Blog: "/blog",
};

export default function NavOptions() {
  return (
    <div className="hidden md:flex flex-row ">
      <ul className="text-black flex-row flex">
        {Object.entries(NavOption).map(([key, value]) => (
          <li key={key} className="mr-4 text-gray-700 dark:text-white">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className=" hover:text-primary "
            >
              <Link href={value} className="">
                {key}
              </Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}
