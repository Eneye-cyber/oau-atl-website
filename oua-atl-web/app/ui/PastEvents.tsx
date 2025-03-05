/* eslint-disable @next/next/no-img-element */
"use client"
import Link from 'next/link'
// import Image from 'next/image'
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { formatEventDates } from "@/lib/utils";
import { fetchData } from "@/lib/utils/client/api"
import { EventCollection, PaginatedResponse } from "@/app/lib/types"
import TableLoader from '@/app/ui/loaders/TableLoader'


const PastEvents = () => {

    const [events, setEvents] = useState<EventCollection[] | []>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function getData() {
        try {
          const data: PaginatedResponse<EventCollection[]> = await fetchData(
            "/physical-events/history"
          );
          let eventsArr: EventCollection[] | [] = data.payload?.data ?? []

          setEvents(eventsArr.length > 3 ? eventsArr.slice(0, 3) : eventsArr);
        } catch (error) {
          console.error("Error fetching events:", error);
        } finally {
          setLoading(false);
        }
      }
  
      getData();
    }, []);

  if(loading) return <div className=""><TableLoader /></div>
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Past Events</h2>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <CarouselItem key={index}>
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
                  <div className="absolute bottom-1 left-1 sm:bottom-6 sm:left-6 lg:bottom-2 lg:left-2">
                    <div className="flex gap-2">
                      {event.tags?.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="bg-primary text-primary-foreground">{tag}</Badge>
                        ))}
                    </div>
                  </div>
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 lg:top-3 lg:right-3">
                    <Link href={`/events/${event.event_id}`} className="inline-flex bg-accent text-white py-1 px-2 ">
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-muted-foreground">{formatEventDates(event.start_date, event.end_date)}</p>
                </div>
              </Link>
            </CarouselItem>
          ))}
          
        </CarouselContent>
      </Carousel>
    </>
  )
}


export default PastEvents