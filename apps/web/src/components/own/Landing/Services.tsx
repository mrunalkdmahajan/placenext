import ServiceCard from "./Card/ServiceCard";
import BlueLandingText from "./Text/BlueLandingText";

export default function Services() {
  return (
    <div className="flex flex-col  w-full items-center gap-4">
      <div className="w-40 flex items-center justify-center">
        <BlueLandingText text={"Services"}></BlueLandingText>
      </div>
      <ServiceCard
        bgColor={"bg-light_secondary_background"}
        text={<BlueLandingText text={"Placement Analytics"} />}
        link={"/"}
        image={"assets/Landing/Card1.svg"}
      />
      <ServiceCard
        bgColor={"bg-light_secondary_background"}
        text={<BlueLandingText text={"Placement Analytics"} />}
        link={"/"}
        image={"assets/Landing/Card1.svg"}
      />
    </div>
  );
}
