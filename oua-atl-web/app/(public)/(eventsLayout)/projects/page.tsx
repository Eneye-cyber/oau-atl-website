import type { Metadata } from "next";
import ProjectsPage from "./ui/projects-page";



export const metadata: Metadata = {
  title: "Projects | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Donations, projects.",
};



const page = () => {
  return <><ProjectsPage /></>
}

export default page