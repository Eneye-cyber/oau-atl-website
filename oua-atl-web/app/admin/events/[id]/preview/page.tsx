"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { ClockIcon, MapPinIcon, TicketIcon, UsersIcon } from "@/app/ui/Icons";
import { EventResponseObject } from "@/app/lib/types";
import { formatEventDates, formatEventTimes } from "@/lib/utils";
import Image from "next/image";
import { FetchError } from "@/components/ui/fetch-error";
import Loading from "./../loading"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

export default function EventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<EventResponseObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!baseUrl) {
      setError("API base URL is not defined.");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const url = `${baseUrl}/physical-events/${params.id}/preview`;
        const res = await fetch(url, { method: "GET", credentials: "include" });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const result = await res.json();
        console.log(result)
        setEvent(result.payload);
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  if (loading) return <Loading />;
  if (error) return <FetchError />;

   if (!event || (Array.isArray(event) && !event.length)) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 h-96">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Event not Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          We couldn’t find this event at the moment in our database
        </p>
      </div>
    );
  }
  return (
    <article className="p-6 container space-y-6 flex-1 flex flex-col">
      <div className="flex items-end justify-between bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Events</span>
            <span>
              <FaChevronRight />
            </span>
            <span>View</span>
            <span>
              <FaChevronRight />
            </span>
            <span>{event?.title ?? "Event Title"}</span>
          </div>
          <h1 className="text-2xl font-semibold">Event Details</h1>
        </div>
      </div>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div className="w-full mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={event.image_url ?? "/img/placeholder.svg"}
                alt={event.title}
                width={700}
                height={500}
                className="w-full h-full object-cover"
                style={{ aspectRatio: "700/500", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
                <div className="flex gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary text-primary-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{event.title}</h1>
                <p className="text-muted-foreground text-lg sm:text-xl">
                  {formatEventDates(event.start_date, event.end_date)}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start space-x-2 text-muted-foreground">
                  <ClockIcon className="h-5 w-5" />
                  <span>{formatEventTimes(event.start_date, event.end_date)}</span>
                </div>
                <div className="flex items-start space-x-2 text-muted-foreground">
                  <MapPinIcon className="h-5 w-5 mt-0.5" />
                  <span>
                    {`${event.location.postal_code}, ${event.location.address}, ${event.location.city}, ${event.location.state}`}
                  </span>
                </div>
                <div className="flex items-start space-x-2 text-muted-foreground">
                  <TicketIcon className="h-5 w-5" />
                  <span>Ticket Price: ${event.entrance_fee}</span>
                </div>
                <div className="flex items-start space-x-2 text-muted-foreground">
                  <UsersIcon className="h-5 w-5" />
                  <span>{event.tickets?.length ?? "0"}+ Attendees</span>
                </div>
              </div>

              <div className="prose text-muted-foreground">
                <p>{event.content}</p>
              </div>

              <div className="flex justify-between items-center">
                <Link href={`/admin/events/${event.event_id}/edit`}>Edit Event</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
