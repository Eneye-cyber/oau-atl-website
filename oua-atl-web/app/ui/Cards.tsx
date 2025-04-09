/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { EventCollection } from "@/app/lib/types";
import { formatEventDates } from "@/lib/utils";
import { ClockIcon, MapPinIcon, TicketIcon } from "@/app/ui/Icons"

export const EventCard = ({ event }: { event: EventCollection }) => {
  const tags = event.tags.length > 3 ?  event.tags.slice(0, 3) : event.tags

  return (
    <Link  href={`/events/${event.event_id}`} className='hover:underline h-auto relative'>
      <div className="h-full w-full block">
        <div
          className="bg-cover bg-center bg-opacity-40  transition ease-in-out duration-300 roundex-2xl"
        >
          <div className="bg-white bg-opacity-90 relative overflow-hidden rounded-2xl">
            <Image
              alt={event.title}
              src={ event.image_url ?? "/img/placeholder.svg"}
              height={200}
              width={300}
              className="rounded-exl w-full transition ease-in-out duration-300 hover:scale-110 object-cover h-[200px]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-primary/25" />
          </div>
        </div>
        <div className="w-full py-2 md:py-3">
          <div className="pb-2 md:pb-4">
            <div className="flex gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-primary text-primary-foreground px-2.5 py-0.5 text-xs ">{tag}</Badge>
              ))}
          </div>
          <div className="grid grid-cols-2">
              <h6 className="truncate capitalize text-base sm:text-lg font-semibold">
                {event.title}
              </h6>
              <div className="flex justify-end items-center space-x-2 text-sm text-muted-foreground">
                <MapPinIcon className="h-3.5 w-3.5" />
                <p className="font-semibold">{event.location.postal_code}</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <ClockIcon className="h-3.5 w-3.5" />
                <p className="text-mainBlack-80">{formatEventDates(event.start_date, event.end_date)}</p>
            
              </div>
              <div className="flex justify-end items-center space-x-2 text-sm text-muted-foreground">
                <TicketIcon className="h-3.5 w-3.5" />
                <p>${event.entrance_fee}</p>
              </div>

          </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
