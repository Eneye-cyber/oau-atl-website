/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Image from 'next/image'

const baseUrl = process.env.API_BASE

export const metadata: Metadata = {
  title: "Gallery Images | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Events and Hangount.",
};

async function getData(id: string): Promise<{message: string, payload: { data: any[] , gallery_name: string}} | null> {
  if (!baseUrl) throw new Error("API_BASE environment variable is not set.");
  try {
    const url = `${baseUrl}/gallery/${id}`;
    const res = await fetch(url, { method: 'GET', credentials: 'include',  });

    if (!res.ok) {
      return null;
    }

    const result = await res.json().catch(() => ({message: res.statusText}));
    return result;
  } catch (error: any) {
    console.error('Fetch Error:', error);
    return null;
  }
}
const page = async ({ params }: { params: { photoSlug: string } }) => {
  const data: {message: string, payload: { data: any[], gallery_name: string}} | null = await getData(params.photoSlug);
  console.log();

  if(!data) return <h3>Album empty</h3>

  const images: {
    photo_id: string;
    photo_url: string;
    created_at: string
  }[] = data?.payload.data

  // const photos: GalleryResponseObjects | null = data.payload ?? null
  return (
    <section>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Image Gallery</h1>
        </div>
        
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-w-4 aspect-h-3">
              <Image
                src={image.photo_url}
                alt={image.photo_id}
                width={320}
                height={280}
                className="rounded-lg object-fill h-full"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default page