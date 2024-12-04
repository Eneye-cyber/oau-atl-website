/* eslint-disable @next/next/no-img-element */
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DsCAbXRK1LR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FaChevronRight } from "react-icons/fa6";
import { ClockIcon, MapPinIcon,  TicketIcon,  UsersIcon } from "@/app/ui/Icons"
import { EventResponseObject } from "@/app/lib/types";
import { formatEventDates, formatEventTimes } from "@/lib/utils";

const baseUrl = process.env.API_BASE

async function getData(id: string): Promise<{ message: string; payload: EventResponseObject | null }> {
  if (!baseUrl) throw new Error("API_BASE environment variable is not set.");
  try {
    const url = `${baseUrl}/physical-events/${id}`;
    const res = await fetch(url, { method: 'GET', credentials: 'include' });

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


export default async function page({ params }: { params: { id: string } }) {
  const data: {message: string, payload: EventResponseObject | null} = await getData(params.id);
  console.log(data);
  const event: EventResponseObject | null = data.payload ?? null

  if (!event) {
    return <h3>Event not found</h3>;
  }
  
  return (
    <article className="p-6 container space-y-6 flex-1 flex flex-col">
      <div className="flex items-end justify-between bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Events</span>
            <span> <FaChevronRight /> </span>
            <span>View</span>
            <span> <FaChevronRight /> </span>
            <span>{event?.title ?? 'Event Title'}</span>
            </div>
          <h1 className="text-2xl font-semibold">Event Details</h1>
        </div>

      </div>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">

      {event ? (
        <div className="w-full mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
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
                  {/* <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    Tech
                  </Badge> */}
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
                <div className="flex items-start space-x-2 text-muted-foreground">
                  <UsersIcon className="h-5 w-5" />
                  <span>{event.tickets?.length ?? '0'}+ Attendees</span>
                </div>
              </div>
              <div className="prose text-muted-foreground">
                <p>
                  {event.content}
                </p>  
              </div>
              <div className="flex justify-between items-center">
                <Link href={`/admin/events/${event.event_id}/edit`}>Edit Event</Link>
                {/* <Button>Edit Event</Button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3>Event not found</h3>
      )}

      </section>
    </article>
  )
}
