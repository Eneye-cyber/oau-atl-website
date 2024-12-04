/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import {EventCard} from "@/app/ui/Cards" 
import { EventResponseObject } from "@/app/lib/types";
import { Suspense } from 'react'
import PastEvents from '@/app/ui/PastEvents'
import TableLoader from '@/app/ui/loaders/TableLoader'

export const metadata: Metadata = {
  title: "Events | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Donations, projects.",
};

const baseUrl = process.env.API_BASE
interface DataResponse {
  message: string,
  payload: { data: EventResponseObject[] | [], page: number, totalCount: number, totalPages: number } 
}
async function getData(): Promise<DataResponse> {
  if (!baseUrl) throw new Error("API_BASE environment variable is not set.");
  try {
    const url = `${baseUrl}/physical-events/latest`;
    const res = await fetch(url, { method: 'GET', credentials: 'include', cache: 'default' });

    if (!res.ok) {
      return { message: `Error ${res.status}: ${res.statusText}`, payload: { data: [], page: 1, totalCount: 0, totalPages: 1 } };
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error('Fetch Error:', error);
    return { message: error.message || 'An unexpected error occurred.', payload: { data: [], page: 1, totalCount: 0, totalPages: 1 } };
  }
}
const page = async () => {
  const data: DataResponse = await getData();
  console.log(data);
  const events: EventResponseObject[] | [] = data.payload?.data ?? []

  if (!events.length) {
    return <h3>Events not found</h3>;
  }

  return (
    <div className='px-[5%] sm:px-[3%] md:px-0'>
      <div>
        <h1 className="text-2xl sm:text-3xl mb-3 font-bold">Upcoming Events</h1>

        <ul className="py-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-6 md:gap-4">
          {events.map((event, item) => (
              <li key={item}>
                <EventCard event={event}  />
              </li>
            ))}


        </ul>
      </div>

      <div className="container py-16">
        <Suspense fallback={(<div className=""><TableLoader /></div>)}>
          <PastEvents />
        </Suspense>
      </div>
    </div>
  )
}

export default page