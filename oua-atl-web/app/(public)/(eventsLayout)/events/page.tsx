import type { Metadata } from "next";
import { Suspense } from "react";
import PastEvents from "@/app/ui/PastEvents";
import TableLoader from "@/app/ui/loaders/TableLoader";

import UpcomingEvents from "./ui/UpcomingEvents";

export const metadata: Metadata = {
  title: "Events | Ife Alumni",
  description:
    "Great Ife Alumni Association Inc. USA - Atlanta Branch. Donations, projects.",
};

const page = () => {
  return (
    <div className="px-[5%] sm:px-[3%] md:px-0">
      <UpcomingEvents />

      <div className="container py-16">
        <PastEvents />
      </div>
    </div>
  );
};

export default page;
