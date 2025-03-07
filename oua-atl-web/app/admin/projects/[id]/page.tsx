
import { Metadata } from "next";

import ProjectDetailsPage from "./ui/project-details-page";

export const metadata: Metadata = {
  title: "ATL Admin | Project details",
};


export default function page({ params }: { params: { id: string } }) {

  return (<ProjectDetailsPage params={params} />
  );
}
