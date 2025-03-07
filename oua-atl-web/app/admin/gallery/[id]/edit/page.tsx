// import MultipleImageUploader from "../../ui/MultipleImageUploader"

import type { Metadata } from "next";
import EditGalleryPage from "./ui/edit-gallery-page";

export const metadata: Metadata = {
  title: "Edit Album | Ife Alumni",
};


const page = ({ params }: { params: { id: string } }) => {
 
  return (
    <article className="p-6 container space-y-6 flex-1 flex flex-col">
      <EditGalleryPage params={params} />
    </article>
  );
};

export default page;
