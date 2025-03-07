import type { Metadata } from "next";
import EnquiriesDashboard from "./ui/enquiries-dashboard"


export const metadata: Metadata = {
  title: "Enquiries | Admin Dashboard",
  description: "...",
};


const page = () => {
  return <EnquiriesDashboard />;
};

export default page;
