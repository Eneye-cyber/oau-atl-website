
import type { Metadata } from "next";
import GalleryDashboard from "./ui/gallery-dashboard";


export const metadata: Metadata = {
  title: "Gallery | Ife Alumni",
};

const page =  () => {
 
  return <GalleryDashboard />
}



export default page