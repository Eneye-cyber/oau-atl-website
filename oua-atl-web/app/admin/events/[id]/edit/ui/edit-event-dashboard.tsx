'use client';

import { useEffect, useState } from 'react';
import EditEvent from '@/app/ui/forms/event/EditEvent';
import { EventResponseObject } from '@/app/lib/types';
import { FetchError } from '@/components/ui/fetch-error';
import { toast } from 'sonner';
import Loading from '../../loading';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

const EditEventDashboard = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<EventResponseObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    const fetchData = async () => {
     
      try {
        if (!baseUrl) {
          throw new Error('API base URL is not set.');;
        }

        const res = await fetch(`${baseUrl}/physical-events/${params.id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          toast.error(`Error ${res.status}: ${res.statusText}`);
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const result = await res.json();
        setEvent(result.payload ?? null);
      } catch (err: any) {
        setError((err as Error));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) return <Loading />;
  if (error) return  <FetchError error={error ? error : null} showDetails={!!error} />;;
  if (!event) return <h3>Event not found</h3>;

  return (
    <section className="p-3 md:p-6">
      <EditEvent event={event} />
    </section>
  );
};

export default EditEventDashboard;
