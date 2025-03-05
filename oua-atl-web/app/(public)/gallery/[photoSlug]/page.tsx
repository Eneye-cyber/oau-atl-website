'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image'
import { fetchData } from '@/lib/utils/client/api';



const Page = () => {
  const { photoSlug } = useParams();
    const router = useRouter();
    const [gallery, setGallery] = useState<{data: any[]; gallery_name: string} | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
  
  // const data: {message: string, payload: { data: any[], gallery_name: string}} | null = await getData(params.photoSlug);

  useEffect(() => {
      if (!photoSlug) {
        router.replace('/gallery');
        return;
      }
  
      const getData = async () => {
        try {
          const data = await fetchData(`/gallery/${photoSlug}`);
          if (data.error || !data.payload) {
            setErrorMessage(data.message || 'Album not found');
          } else {
            setGallery(data.payload);
          }
        } catch (error) {
          setErrorMessage('An error occurred while fetching event data.');
        } finally {
          setLoading(false);
        }
      };
  
      getData();
    }, [photoSlug, router]);


    if (loading) return (<div className="flex flex-col items-center justify-center h-96 gap-4">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 border-l-transparent"></div>
  
      {/* Loading Text */}
      <p className="text-lg font-semibold text-gray-600">Loading photo album...</p>
    </div>)
  



  if (!gallery?.data) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 h-96">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Album empty
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          We couldn’t find any image at the moment. Please check back later.
        </p>
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      </div>
    );
  }

  const images: {
    photo_id: string;
    photo_url: string;
    created_at: string
  }[] = gallery.data

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

export default Page