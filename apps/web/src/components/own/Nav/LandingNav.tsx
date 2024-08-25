"use client";

import Link from "next/link";
import LogoText from "../LogoText";
import NavOptions from "./NavSubComponents/NavOptions";
import { Button } from "@/components/ui/button";

export default function LandingNav() {
  return (
    <div className="flex flex-row items-center justify-between mx-2 lg:mx-4">
      <LogoText />
      <NavOptions />
      <Button className="mx-1 lg:ml-4 bg-white border-[1px] border-black">
        <Link href="/login" className="text-black text-[10px]">
          Request a Demo
        </Link>
      </Button>
    </div>
  );
}
