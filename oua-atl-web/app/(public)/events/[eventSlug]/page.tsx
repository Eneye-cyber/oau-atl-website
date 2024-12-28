/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge"
import { Suspense } from 'react'
import UpcomingEvents from '@/app/ui/UpcomingEvents'
import TableLoader from '@/app/ui/loaders/TableLoader'
// import HeroSection from '@/app/ui/HeroSection'

import { EventResponseObject } from "@/app/lib/types";
import { formatEventDates, formatEventTimes } from "@/lib/utils";
import { ClockIcon, MapPinIcon, TicketIcon } from "@/app/ui/Icons"
import BookingAction from '@/components/actions/BookingAction';

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

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error('Fetch Error:', error);
    return { message: error.message || 'An unexpected error occurred.', payload: null };
  }
}


const page = async ({ params }: { params: { eventSlug: string } }) => {
  const data: {message: string, payload: EventResponseObject | null} = await getData(params.eventSlug);
  console.log(data);
  const event: EventResponseObject | null = data.payload ?? null

  if (!event) {
    return <h3>Event not found</h3>;
  }
  
  return (
    <>
      {/* <HeroSection /> */}

      <article className="py-4 md:py-8 px-[5%]">
        <div className="container">
          <div className="w-full mx-auto py-6 sm:py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={event.image_url ?? "/img/placeholder.svg"}
                  alt={event.title}
                  width="700"
                  height="500"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "700/500", objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
                  <div className="flex gap-2">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary text-primary-foreground">{tag}</Badge>
                    ))}
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">
                      Tech
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-6 lg:space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{event.title}</h1>
                <p className="text-muted-foreground text-lg sm:text-xl">{formatEventDates(event.start_date, event.end_date)}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start space-x-2 text-muted-foreground">
                  <ClockIcon className="h-5 w-5" />
                  <span>{formatEventTimes(event.start_date, event.end_date)}</span>
                </div>
                <div className="flex items-start space-x-2 text-muted-foreground">
                  <MapPinIcon className="h-5 w-5 mt-0.5" />
                  <span>{`${event.location.postal_code}, ${event.location.address}, ${event.location.city}, ${event.location.state}` }</span>
                </div>
                <div className="flex items-start space-x-2 text-muted-foreground">
                  <TicketIcon className="h-5 w-5" />
                  <span>Ticket Price: ${event.entrance_fee}</span>
                </div>
              </div>
              <div className="prose text-muted-foreground">
                <p>
                  {event.content}
                  {event.image_url}
                </p>  
              </div>

            </div>
            </div>
          </div>
        </div>

        <section className="container">
          <TicketsPage id={event.event_id} fee={event.entrance_fee} date={event.start_date} />
        </section>

        <div className="container py-16">
          <Suspense fallback={(<div className=""><TableLoader /></div>)}>
            <UpcomingEvents id={event.event_id} />
          </Suspense>
        </div>

      </article>
    </>
  )
}


const TicketsPage = ({id, fee, date}: {id:string; fee: number; date: string}) => {
  return (
    <div className="mx-auto bg-white shadow-md rounded-lg">
        <div className="pt-4">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-8 text-sm font-medium text-gray-600">Ticket Type</th>
                <th className="py-2 px-8 text-sm font-medium text-gray-600 hidden md:table-cell">Sales End</th>
                <th className="py-2 px-8 text-sm font-medium text-gray-600">Price</th>
                <th className="py-2 px-8 text-sm font-medium text-gray-600">Quantity</th>
              </tr>
            </thead>
            <tbody>

              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-8 font-semibold">Dinner Tickets</td>
                <td className="py-2 px-8 hidden md:table-cell">Sale ends at: {formatEventDates(date, date)}</td>
                <td className="py-2 px-8 text-green-600">${fee}</td>
                <td className="py-2 px-8 text-gray-500">N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 flex justify-end">
          <BookingAction eventID={id} ticketPrice={Number(fee)}  />
        </div>
      </div>
  );
};



export default page