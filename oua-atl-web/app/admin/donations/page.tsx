import { Metadata } from "next";
import DonationsDashboard from "./ui/donations-dashboard"

export const metadata: Metadata = {
  title: "Donations | Great Ife Alumni",
};


const page = () => {

  return <DonationsDashboard />;
};

export default page;
