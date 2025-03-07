import type { Metadata } from "next";

import EditEventDashboard from "./ui/edit-event-dashboard";

export const metadata: Metadata = {
  title: "Events | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Events and Hangount.",
};


const page = ({ params }: { params: { id: string } }) => {

  return (
    <>
      <EditEventDashboard params={params} />
    </>
  )
}




export default page