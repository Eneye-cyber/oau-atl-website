/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import EditEvent from "@/app/ui/forms/event/EditEvent";

// import HeroSection from '@/app/ui/HeroSection'

import { EventResponseObject } from "@/app/lib/types";

const baseUrl = process.env.API_BASE
export const metadata: Metadata = {
  title: "Events | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Events and Hangount.",
};

async function getData(id: string): Promise<{ message: string; payload: EventResponseObject | null }> {
  if (!baseUrl) throw new Error("API_BASE environment variable is not set.");
  try {
    const url = `${baseUrl}/physical-events/${id}`;
    const res = await fetch(url, { method: 'GET', credentials: 'include',  });

    if (!res.ok) {
      return { message: `Error ${res.status}: ${res.statusText}`, payload: null };
    }

    const result = await res.json().catch(() => ({message: res.statusText}));
    return result;
  } catch (error: any) {
    console.error('Fetch Error:', error);
    return { message: error.message || 'An unexpected error occurred.', payload: null };
  }
}


const page = async ({ params }: { params: { id: string } }) => {
  const data: {message: string, payload: EventResponseObject | null} = await getData(params.id);
  console.log(data);
  const event: EventResponseObject | null = data.payload ?? null

  if (!event) {
    return <h3>Event not found</h3>;
  }
  
  return (
    <>
      {/* <HeroSection /> */}

      <section className="p-3 md:p-6">
        <EditEvent event={event} />
      </section>
    </>
  )
}




export default page