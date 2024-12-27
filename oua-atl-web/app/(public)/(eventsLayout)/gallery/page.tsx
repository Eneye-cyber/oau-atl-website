import Image from 'next/image';
import Link from 'next/link';
import type { GalleryCollection } from "@/app/lib/types";
import type { Metadata } from "next";
import { fetchData } from '@/lib/utils/api';

export const metadata: Metadata = {
  title: "Gallery | Ife Alumni",
};

type GalleryResponse = {
  message: string; // Message associated with the response
  payload: GalleryCollection[] | []; // Array of gallery items
  error?: boolean;
};

async function getData(): Promise<GalleryResponse> {
  const result = await fetchData('gallery');
  return result;
}

const page = async () => {
  const data = await getData();

  // Error state
  if (data.error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
        <p className="text-gray-600 mt-2">
          We couldn’t load the galleries at this time. Please try again later.
        </p>
      </div>
    );
  }

  const albums = data.payload;

  // Empty state
  if (albums.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        {/* <Image src="/img/empty-gallery.svg" alt="No galleries"  width={200} height={200} /> */}
        <h2 className="text-xl font-semibold text-gray-800 mt-4">No Galleries Found</h2>
        <p className="text-gray-600 mt-2">
          It looks like there are no photo galleries available right now.
        </p>
      </div>
    );
  }

  const photos = albums.map((item) => ({
    name: item.gallery_title,
    date: new Date(item.created_at).toLocaleDateString(),
    imageUrl: item.image_url.startsWith("http") ? item.image_url : '/img/placeholder.svg',
    id: item.gallery_id,
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Photo Gallery</h1>
      <div className="grid grid-cols-10 sm:grid-cols-10 gap-4">
        {photos.map((photo, index) => {
          const colSpan = (() => {
            const pattern = [4, 6, 6, 4, 10];
            return pattern[index % pattern.length];
          })();

          return (
            <Link
              key={index}
              href={`/gallery/${photo.id}`}
              className={`relative col-span-10 sm:col-span-${colSpan} overflow-hidden rounded-lg group hover:underline shadow-sm`}
            >
              <div className="relative w-full h-64">
                <Image
                  src={photo.imageUrl}
                  alt={photo.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index < 3}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-white font-semibold text-lg">{photo.name}</h2>
                <p className="text-gray-300 text-sm">{photo.date}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default page;
