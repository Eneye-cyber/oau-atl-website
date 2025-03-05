"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { PaginatedResponse, GalleryCollection } from "@/app/lib/types";
import { fetchData } from "@/lib/utils/client/api";

const GalleryPage = () => {
  const [albums, setAlbums] = useState<GalleryCollection[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const data: PaginatedResponse<GalleryCollection[]> = await fetchData(
          "/gallery"
        );
        const hasError = data?.error || !data.payload.data.length 

        setAlbums(!hasError ? data.payload.data : []);
        setError(data.error ?? false);
        setErrorMessage(data.message);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) return (<div className="flex flex-col items-center justify-center h-96 gap-4">
    {/* Spinner */}
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 border-l-transparent"></div>

    {/* Loading Text */}
    <p className="text-lg font-semibold text-gray-600">Loading photo albums...</p>
  </div>)

  if (!albums) {
    return  (
      <div className="flex flex-col items-center justify-center text-center py-12">
      
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
      {error ? 'Backend Error' :'Gallery Empty'}
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        We couldn’t load any photo ablum at this time. Please try again later.
      </p>
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
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
  
}


export default GalleryPage