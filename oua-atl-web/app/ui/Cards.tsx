/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { EventResponseObject } from "@/app/lib/types";
import { formatEventDates } from "@/lib/utils";

export const EventCard = ({ event }: { event: EventResponseObject }) => {
  return (
    <Link href={`/events/${event.event_id}`} className='hover:underline'>
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={ event.image_url ?? "/img/placeholder.svg"}
          alt="Blockchain Summit 2024"
          width="400"
          height="300"
          className="w-full h-full object-cover"
          style={{ aspectRatio: "400/300", objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
          <div className="flex gap-2">
            {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-primary text-primary-foreground">{tag}</Badge>
              ))}
          </div>
        </div>
        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 lg:top-3 lg:right-3">
          <Button variant="outline" className="py-1 px-2 " size="sm">
            Learn More
          </Button>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <p className="text-muted-foreground">{formatEventDates(event.start_date, event.end_date)}</p>
      </div>
    </Link>
  )
}