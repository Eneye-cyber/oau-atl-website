"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { formatEventDates } from "@/lib/utils"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE

const UpcomingEvents = ({ id }: { id: string }) => {
  const [events, setEvents] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/physical-events/latest`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        })

        if (res.ok) {
          const result = await res.json()
          console.log('latest event result', result)
          let data = result.payload?.data ?? []
          data = data.filter((event: any) => event.event_id !== id)
          data = data.length > 3 ? data.slice(0, 3) : data
          setEvents(data)
        } else {
          setError(res.statusText || "Unknown error")
        }
      } catch (err: any) {
        console.error('error latest event', err)
        setError(err.message)
      }
    }

    fetchData()
  }, [id])

  if (error) return <p className="text-red-500">Failed to load events: {error}</p>

  if (events.length === 0) return <p className="text-muted">No other upcoming events</p>

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Other Upcoming Events</h2>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <CarouselItem key={index}>
              <Link href={`/events/${event.event_id}`} className='hover:underline'>
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={event.image_url ?? "/img/placeholder.svg"}
                    alt={event.title}
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

export default UpcomingEvents
