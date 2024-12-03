import TeamCard from "./Card/TeamCard";
import BlueLandingText from "./Text/BlueLandingText";

export default function TeamSection() {
  return (
    <div>
      <div>
        <BlueLandingText text={"Team"} />
      </div>
      <div>
        <TeamCard
          name={"Latish Adwani"}
          linkedIn={"https://www.linkedin.com/in/latish705/"}
          image="/assets/Landing/Team/latish_profile.png"
          info="software Developer"
        />
      </div>
    </div>
  );
}
