import Button from '@/app/ui/shared/Button'
import { FaChevronRight } from "react-icons/fa6";

import Tabs from '@/app/ui/Tabs'
import StatsFeed from './ui/StatsFeed';
import EventsTable from './ui/EventsTable';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Events | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Donations, projects.",
};



const Page = () => {
  
  return (
    <section className="p-6 container space-y-6">

      <div className="flex items-end justify-between py-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Events</span>
            <span> <FaChevronRight /> </span>
            <span>List</span>
          </div>
          <h1 className="text-2xl font-semibold">Manage Events</h1>
        </div>

        <Button href="/admin/events/create">Create Event</Button>
      </div>

 
      <StatsFeed />
      
      <section className=" py-4">
        <Tabs tabs={[{label: 'Pending', value: null, href: '/admin/events'}, {label: 'Upcoming', value: 'latest', href: '/admin/events?status=latest'}, {label: 'Past', value: 'history', href: '/admin/events?status=history'}]} />
      </section>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 space-y-4">
        <EventsTable  />
      </section>
    </section>
  )
}

export default Page