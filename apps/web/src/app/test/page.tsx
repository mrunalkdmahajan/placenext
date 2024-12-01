import JobCreationForm from "@/components/own/Form/JobCreationForm";
import { Inconsolata } from "next/font/google";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
});

export default function Test() {
  return (
    <div className={inconsolata.className}>
      Test
      <JobCreationForm />
    </div>
  );
}
