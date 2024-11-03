"use client";

import Link from "next/link";

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
          <li key={key} className="mr-4 text-white">
            <Link href={value} className="hover:underline">
              {key}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
