"use client";

import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

export default function MainNav() {
  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const getUserInitials = () => {
      const name = localStorage.getItem("name");
      console.log(name);
      if (name) {
        const initials = name
          .split(" ")
          .map((n, index) => {
            if (index === 1) return "";
            return n[0];
          })
          .join("");
        console.log(initials);
        setUserName(initials);
      }
    };
    getUserInitials();
    if (dropdownOpen) {
      document.addEventListener("click", toggleDropdown);
    }
    return () => {
      document.removeEventListener("click", toggleDropdown);
    };
  }, [dropdownOpen]);

  const pathname = usePathname();
  const path = pathname.split("/")[1];

  return (
    <div className="flex flex-row items-center justify-between w-full px-2 pl-10 py-2 relative z-20 bg-white">
      <div className="flex flex-row items-center justify-center gap-2">
        {path === "college" ? (
          <div>
            <h1 className="text-lg font-bold">TPO Dashboard</h1>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-center items-center gap-2 relative">
        <IoIosNotifications size={20} />
        <div className="relative">
          {/* Avatar with Dropdown */}
          <div onClick={toggleDropdown} className="cursor-pointer">
            <Avatar>
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>{userName}</AvatarFallback>
            </Avatar>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
              <ul className="py-1">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
