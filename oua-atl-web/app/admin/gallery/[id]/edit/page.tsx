// import MultipleImageUploader from "../../ui/MultipleImageUploader"

import { Album } from "@/app/lib/types";
import EditGallery from "@/app/ui/forms/gallery/EditGallery";
import { fetchData } from "@/lib/utils/api";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Album | Ife Alumni",
};

async function getData(
  id: string
): Promise<{
  message: string;
  payload: Album;
  error?: boolean;
} | null> {
  const url = `/gallery/${id}`;
  const res = await fetchData(url);
  return res;
}

const page = async ({ params }: { params: { id: string } }) => {
  const gallery = await getData(params.id);
  console.table(gallery?.payload)

  if (!gallery || gallery.error) {
    return (
      <article className="p-6 container space-y-6 flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">Album Not Found</h1>
        <p className="text-gray-600">
          The album you are looking for does not exist or could not be retrieved.
        </p>
      </article>
    );
  }

  return (
    <article className="p-6 container space-y-6 flex-1 flex flex-col">
      {gallery && <EditGallery album={gallery.payload} id={params.id} />}
    </article>
  );
};

export default page;
