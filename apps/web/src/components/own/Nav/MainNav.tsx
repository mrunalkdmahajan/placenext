"use client";

import { IoMdMenu } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MainNav() {
  return (
    <div className="flex flex-row items-center justify-between w-full max-w-screen-xl px-10 py-2 fixed z-50 bg-white">
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="flex flex-row items-center justify-center border-2 border-gray-400 rounded-lg p-1 m-2 gap-1">
          <label htmlFor="search_bar">
            <CiSearch />
          </label>
          <input
            type="text"
            id="search_bar"
            placeholder="Search"
            className="text-black placeholder-gray-400 focus:outline-none active:outline-none border-none"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <IoIosNotifications size={20} />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
