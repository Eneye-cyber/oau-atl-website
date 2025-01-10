import Image from "next/image"
import { CalendarIcon, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { SectionDataProps } from "@/app/lib/types"
 
import {
  Card,
  CardContent,
} from "@/components/ui/card"


const eventsFallBack = [
  {
    image_url: "/img/reunion.jpg",
    start_date: "18th, December 2024",
    title: "Alumni End-of-Year Reunion (2024)",
    content: "Join us for a festive gathering to reconnect with old friends, celebrate accomplishments, and create lasting memories.",
  },
  {
    start_date: "May 2023",
    title: "Project Inception",
    content: "The idea for our revolutionary product was born, marking the beginning of an exciting journey.",
  },
  {
    start_date: "July 2023",
    title: "Team Assembly",
    content: "We brought together a diverse group of talented individuals to turn our vision into reality.",
  }
]

const EventSection: React.FC<SectionDataProps> = ({data}) => {
  const events = [...data.content]
  const premierEvent = events.shift()
  if(!events || !events.length) return <div></div> 

  return (
    <div className="grid md:grid-cols-5">
      <div className="md:col-span-5">
        <h3 className="text-3xl sm:text-4xl font-bold text-primary mb-6">Events</h3>
      </div>
      <div className="md:col-span-2">
        <Card className="bg-transparent rounded-none">
          <CardContent className="grid gap-4">
            <figure className=" flex items-center space-x-4 border shadow-box shadow-gray-500">
              <Image
                src={premierEvent?.media ?? "/img/placeholder.svg"}
                alt={premierEvent?.title ?? "premier data"}
                width={464}
                height={300}
                className="bg-gray-200  overflow-hidden w-full object-cover object-center"
              />
            </figure>
            <div className="flex items-center ">
              <div className="flex-1 space-y-1">
                <h5 className="text-3xl font-bold text-primary leading-none">
                  {premierEvent?.title}
                </h5>
                <p className="text-sm text-muted-foreground">

                  { premierEvent?.subtitle && new Date(premierEvent?.subtitle).toLocaleDateString()}
                </p>

                <div className="py-3">
                  {premierEvent?.text}
                </div>
              </div>
            </div>
          </CardContent>
         
        </Card>
      </div>

      
      <div className="md:col-span-3 flex items-center justify-end">
        <div className="mx-auto sm:px-4 py-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-3 transform w-1 h-full bg-gradient-to-b from-accent to-accent/30 rounded-full"></div>
            
            {events.map((event, index) => (
              <div key={index} className={`mb-8 flex justify-between items-center w-full flex-row`}>
                <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
                  <h1 className="mx-auto font-semibold text-lg text-white"><CalendarIcon size={16} /></h1>
                </div>
                <div className={`order-1 rounded-lg shadow-xl w-11/12 px-6 py-4 ${
                  index % 2 === 0 ? 'bg-primary *:text-white' : 'bg-accent *:text-primary'
                }`}>
                  <h3 className="mb-3 font-bold text-gray-800 text-xl">{event.title}</h3>
                  <time className="mb-3 text-sm font-normal leading-none text-gray-600 flex items-center">
                    <CalendarIcon size={14} className="mr-1" />
                    {event.subtitle}
                  </time>
                  <p className="text-sm font-normal text-gray-700 leading-snug">{event.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right pt-4">
            <Link href={data.action?.href ?? 'events'} className='font-bold text-primary'>{data.action?.label} &nbsp; <ArrowRight className='inline-flex' /></Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default EventSection