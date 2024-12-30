/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import {EventCard} from "@/app/ui/Cards" 
import { Suspense } from 'react'
import PastEvents from '@/app/ui/PastEvents'
import TableLoader from '@/app/ui/loaders/TableLoader'

import { fetchData } from "@/lib/utils/api"
import { EventCollection, PaginatedResponse } from "@/app/lib/types"

export const metadata: Metadata = {
  title: "Events | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Donations, projects.",
};


async function getData(): Promise<PaginatedResponse<EventCollection[]>> {
  
  const data = await fetchData('/physical-events/latest')
  return data
  
}
const page = async () => {
  const data: PaginatedResponse<EventCollection[]> = await getData();
  const events: EventCollection[] | [] = data.payload?.data ?? []

  if (!events.length) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
      
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
        No Events Found
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        We couldn’t find any upcoming event at the moment. Please check back later.
      </p>
    </div>
    );
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