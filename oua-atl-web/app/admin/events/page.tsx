import Button from '@/app/ui/shared/Button'
import { FaChevronRight } from "react-icons/fa6";
import DataTable from '@/app/ui/DataTable'
import { Separator } from "@/components/ui/separator"
import StatsOverview from '@/app/ui/StatsOverview'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


interface Event {
  image: string;
  name: string;
  date: string;
  location: string;
  price?: string
}

async function getData(): Promise<Event[]> {
  // Fetch data from your API here.
  return [
    { image: '/img/1.jpg', name: 'Tech Conference', date: '2024-11-25', location: 'New York', price: '10.00' },
    { image: '/img/2.jpg', name: 'Art Workshop', date: '2024-12-10', location: 'San Francisco' },
    { image: '/img/3.jpg', name: 'Music Festival', date: '2024-12-20', location: 'Los Angeles', price: '10.00' },
  ]
}

const Page = async () => {
  const events = await getData();

  const columns = [
    { key: 'image', label: 'Image' },
    { key: 'name', label: 'Event name' },
    { key: 'date', label: 'Event date' },
    { key: 'location', label: 'Event location' },
    { key: 'price', label: 'Entrance fee' },
  ];

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

      <div className="grid md:grid-cols-2 gap-6">
        <StatsOverview label="Upcoming Events" value={1} />
        <StatsOverview label="Past Events" value={2} />
      </div>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div className="">
          <DataTable title="All Events" path="events" columns={columns} data={events} showActions={true} />

          <Separator className="my-4" />

          <div className="flex">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

        </div>
      </section>
      {/* <EventsTable events={events} onEdit={handleEdit} onDelete={handleDelete} /> */}
    </section>
  )
}

export default Page