'use client'; // Mark this as a client-side component

import { useState, useEffect } from 'react';
import EditGallery from "@/app/ui/forms/gallery/EditGallery";
import { fetchData } from "@/lib/utils/client/api";
import type { Album } from "@/app/lib/types";

const EditGalleryPage = ({ params }: { params: { id: string } }) => {
  const [gallery, setGallery] = useState<Album | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const url = `/gallery/${params.id}`;
        const res = await fetchData(url);
        if (res && !res.error) {
          setGallery(res.payload);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching gallery data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [params.id]);

  if (loading) {
    return (
      <article className="p-6 container space-y-6 flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
        <p className="text-gray-600">Please wait while we load the album details.</p>
      </article>
    );
  }

  if (error || !gallery) {
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
      <EditGallery album={gallery} id={params.id} />
    </article>
  );
};

export default EditGalleryPage;