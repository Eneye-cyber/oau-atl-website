import Image from 'next/image'
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge"
// import HeroSection from '@/app/ui/HeroSection'
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Events | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Events and Hangount.",
};

const page = () => {
  return (
    <>
      {/* <HeroSection /> */}

      <article className="py-4 md:py-8 px-[5%]">
        {/* <div className="md:py-8 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold">Great Ife Scholarship Fund</h2>
          <div className="inline-block capitalize relative mt-1">Ile Ife</div>

        </div> */}

        <div className="container">
          <div className="w-full mx-auto py-6 sm:py-8 lg:py-12">
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
              <div className="space-y-6 lg:space-y-8 py-3">
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
              </div>
            </div>
          </div>
        </div>

        <section className="container">
          <TicketsPage />
        </section>

        <div className="container py-16">
          <h2 className="text-2xl font-bold mb-6">Other Upcoming Events</h2>
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <CarouselItem>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/img/placeholder.svg"
                    alt="AI Conference 2024"
                    width="400"
                    height="300"
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: "400/300", objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">
                        Conference
                      </Badge>
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        AI
                      </Badge>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold">AI Conference 2024</h3>
                  <p className="text-muted-foreground">July 10 - 12, 2024</p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/img/placeholder.svg"
                    alt="Blockchain Summit 2024"
                    width="400"
                    height="300"
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: "400/300", objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">
                        Conference
                      </Badge>
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        Blockchain
                      </Badge>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold">Blockchain Summit 2024</h3>
                  <p className="text-muted-foreground">September 5 - 7, 2024</p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/img/placeholder.svg"
                    alt="Cybersecurity Expo 2024"
                    width="400"
                    height="300"
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: "400/300", objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">
                        Conference
                      </Badge>
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        Cybersecurity
                      </Badge>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold">Cybersecurity Expo 2024</h3>
                  <p className="text-muted-foreground">November 15 - 17, 2024</p>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>

      </article>
    </>
  )
}


const TicketsPage = () => {
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
                <td className="py-2 px-8 font-semibold">Dinner Tickets (Members Only)</td>
                <td className="py-2 px-8 hidden md:table-cell">Ended at: 23 Dec 18</td>
                <td className="py-2 px-8 text-green-600">$25.00</td>
                <td className="py-2 px-8 text-gray-500">N/A</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-8 font-semibold">Dinner Tickets</td>
                <td className="py-2 px-8 hidden md:table-cell">Ended at: 23 Dec 18</td>
                <td className="py-2 px-8 text-green-600">$50.00</td>
                <td className="py-2 px-8 text-gray-500">N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-fit ml-auto bg-primary text-white px-4 py-2 rounded-lg hover:bg-jet-black"
          >
            Order now
          </button>
        </div>
      </div>
  );
};


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
export default page