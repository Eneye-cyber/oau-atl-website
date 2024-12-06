import { CalendarIcon, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface TimelineEvent {
  date: string
  title: string
  description: string
}

const events: TimelineEvent[] = [
  {
    date: "May 2023",
    title: "Project Inception",
    description: "The idea for our revolutionary product was born, marking the beginning of an exciting journey.",
  },
  {
    date: "July 2023",
    title: "Team Assembly",
    description: "We brought together a diverse group of talented individuals to turn our vision into reality.",
  }
]

export default function Timeline() {
  return (
    <div className="mx-auto px-4 py-8">
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
                {event.date}
              </time>
              <p className="text-sm font-normal text-gray-700 leading-snug">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right pt-4">
        <Link href="events" className='font-bold text-primary'>More upcoming events &nbsp; <ArrowRight /></Link>
      </div>
    </div>
  )
}

