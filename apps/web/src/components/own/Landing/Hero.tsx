import LandingHero from "@/assets/Hero-landing.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex-col flex gap-6 items-center justify-center">
      <h1 className="text-5xl">Shape Your Future with Placenext</h1>
      <Image
        src="/assets/Hero_landing.svg"
        alt="Logo"
        width={30}
        height={30}
        className="h-72 w-72"
      />
      <p className="text-sm">
        Our App streamlines the placement process for colleges, companies, and
        students, offering efficient tools to ensure a smooth and hassle-free
        experience for everyone involved.
      </p>
      <Button className=" bg-light_primary_background w-full text-md">
        Get Started
      </Button>
    </div>
  );
}
