import type { Metadata } from "next";
import GalleryPage from './ui/gallery-page';

export const metadata: Metadata = {
  title: "Gallery | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Donations, projects.",
};


const page = () => {
  return <><GalleryPage /></>
};

export default page;
