import LoginForm from "@/components/own/Form/LoginFrom";
import Vector from "/assets/Fingerprint-amico.svg";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex flex-col mt-28 md:mt-0 md:flex-row w-full min-h-screen ">
      <div className="mt-4 md:w-1/2 flex items-center justify-center">
        <LoginForm />
      </div>
      <div className="hidden md:w-1/2 bg-[#F2F2F2] md:h-auto lg:h-screen md:flex md:items-center md:justify-center">
        <Image
          src="/assets/Fingerprint-amico.svg"
          width={400}
          height={400}
          alt="Mobile Login"
        />
      </div>
    </div>
  );
}
