/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DsCAbXRK1LR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { FaChevronRight } from "react-icons/fa6";

export default function page() {
  return (
    <article className="p-6 container space-y-6 flex-1 flex flex-col">
      <div className="flex items-end justify-between bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Events</span>
            <span> <FaChevronRight /> </span>
            <span>View</span>
            <span> <FaChevronRight /> </span>
            <span>Event name</span>
            </div>
          <h1 className="text-2xl font-semibold">Event Details</h1>
        </div>

      </div>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">

        <div className="w-full mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/img/placeholder.svg"
                alt="Tech Conference 2024"
                width="700"
                height="500"
                className="w-full h-full object-cover"
                style={{ aspectRatio: "700/500", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    Conference
                  </Badge>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    Tech
                  </Badge>
                </div>
              </div>
            </div>
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Tech Conference 2024</h1>
                <p className="text-muted-foreground text-lg sm:text-xl">June 15 - 17, 2024</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <ClockIcon className="h-5 w-5" />
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPinIcon className="h-5 w-5" />
                  <span>Moscone Center, San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <TicketIcon className="h-5 w-5" />
                  <span>Ticket Price: $499</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <UsersIcon className="h-5 w-5" />
                  <span>1,200+ Attendees</span>
                </div>
              </div>
              <div className="prose text-muted-foreground">
                <p>
                  Join us for the annual Tech Conference, where industry leaders and innovators come together to share their
                  insights and showcase the latest advancements in technology. This three-day event will feature a wide
                  range of keynote speeches, panel discussions, and networking opportunities.
                </p>
                <p>
                  Attendees will have the chance to explore cutting-edge technologies, attend workshops, and connect with
                  like-minded professionals from around the world. Don&apos;t miss this opportunity to be a part of the tech
                  community&apos;s most anticipated event of the year.
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Button variant="outline">Edit Event</Button>
                {/* <Button>Edit Event</Button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}


function TicketIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  )
}


function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}