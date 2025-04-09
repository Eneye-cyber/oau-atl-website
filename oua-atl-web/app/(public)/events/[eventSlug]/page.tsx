'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"

import { EventResponseObject, TicketType } from '@/app/lib/types';
import { formatEventDates, formatEventTimes } from '@/lib/utils';
import { ClockIcon, MapPinIcon, TicketIcon } from '@/app/ui/Icons';
import BookingAction from '@/components/actions/BookingAction';
import { fetchData } from '@/lib/utils/client/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import UpcomingEvents from '@/app/ui/UpcomingEvents';
import { Ticket } from 'lucide-react';

export default function EventPage() {
  const { eventSlug } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<EventResponseObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null)

  const handleTicketSelect = (ticket: TicketType) => {
    setSelectedTicket(ticket)
    // toast({
    //   title: `${ticket.title} selected`,
    //   description: `Price: $${ticket.price}`,
    // })
  }

  useEffect(() => {
    if (!eventSlug) {
      router.replace('/events');
      return;
    }

    const getData = async () => {
      try {
        const data = await fetchData(`/physical-events/${eventSlug}`);
        if (data.error || !data.payload) {
          setErrorMessage(data.message || 'Event not found');
        } else {
          setEvent(data.payload);
        }
      } catch (error) {
        setErrorMessage('An error occurred while fetching event data.');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [eventSlug, router]);

  if (loading) return <LoadingSpinner text="Loading event details..." />

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 h-96">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Event not Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          We couldn’t find this event at the moment. Please check back later.
        </p>
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <>
      {/* Dynamic Metadata using <Head> */}
      <Head>
        <title>{event.title} | Ife Alumni</title>
        <meta name="description" content={event.content || 'Event details'} />
      </Head>

      <article className="py-4 md:py-8 pad">
        <div className="container">
          <div className="w-full mx-auto py-6 sm:py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src={event.image_url ?? '/img/placeholder.svg'}
                  alt={event.title}
                  width="700"
                  height="500"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '700/500', objectFit: 'cover' }}
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
                </div>
                <div className="prose text-muted-foreground">
                  <p>{event.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="container">
  

          <Separator className="my-4" />

          <Tabs defaultValue="tickets" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="details">Event Details</TabsTrigger>
            </TabsList>

            <TabsContent value="tickets" className="space-y-4">
              <h3 className="text-lg font-semibold mt-4 flex items-center">
                <Ticket className="h-5 w-5 mr-2" />
                Available Tickets
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.tickets.map((ticket) => (
                  <Card
                    key={ticket.ticket_id}
                    className={`cursor-pointer transition-all ${selectedTicket?.ticket_id === ticket.ticket_id ? "ring-2 ring-primary" : ""}`}
                    onClick={() => handleTicketSelect(ticket)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{ticket.title}</CardTitle>
                      <CardDescription>Available: {ticket.quantity_available} tickets</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">${ticket.price}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Valid: {format(new Date(ticket.starts_at), "MMM d, yyyy")} -{" "}
                        {format(new Date(ticket.expires_at), "MMM d, yyyy")}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="details">
              <div className="prose max-w-none">
                <p className="text-muted-foreground">{event.content}</p>
                <h3 className="text-lg font-semibold mt-4">Contact Information</h3>
                <p>For RSVP and inquiries:</p>
                <ul className="list-disc pl-5">
                  {event.tickets.flatMap((ticket) =>
                    ticket.rsvp_contacts.map((contact, idx) => (
                      <li key={`${ticket.ticket_id}-${idx}`}>
                        {contact} ({ticket.title})
                      </li>
                    )),
                  )}
                </ul>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col sm:flex-row gap-4 justify-between py-6">
            <div>
              {selectedTicket && (
                <p className="text-sm">
                  Selected: <span className="font-semibold">{selectedTicket.title}</span> - ${selectedTicket.price}
                </p>
              )}
            </div>
            <BookingAction ticketID={selectedTicket?.ticket_id} ticketPrice={Number(selectedTicket?.price)} />
          </div>
        </section>

        <div className="container py-16">
          <UpcomingEvents id={event.event_id} />
        </div>
      </article>
    </>
  );
}
