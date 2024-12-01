import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ServiceCardProps {
  bgColor: string; // Tailwind class for background color
  text: any; // Card title text
  image: string; // Image source
  link: string; // Link URL
}

export default function ServiceCard({
  bgColor,
  text,
  image,
  link,
}: ServiceCardProps) {
  console.log(text);
  return (
    <div
      className={`${bgColor} flex flex-col items-start h-64 w-full py-8 px-10 rounded-[42px] border-2 border-black shadow-lg border-b-8`}
    >
      {/* Title */}
      <h2 className="text-lg w-32 font-semibold text-center ">{text}</h2>

      {/* Button and Image */}
      <div className="w-full flex justify-between relative  p-4 h-full">
        {/* Button */}
        <Button className="flex items-center absolute gap-2  bottom-0 left-0">
          <Image
            src={"/assets/Expore_more.svg"}
            width={20}
            height={20}
            alt="Explore more"
            className="h-8 w-8"
          />
        </Button>

        {/* Image */}
        <Image
          src={image}
          width={72}
          height={72}
          alt="Card Image"
          className="rounded-md h-32 w-32 absolute top-0 right-0"
        />
      </div>
    </div>
  );
}
