
import { FaChevronRight } from "react-icons/fa6";
import Button from '@/app/ui/shared/Button'
import Link from 'next/link'
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

interface Enquiries {
  name: string;
  email: string;
  message: string;
}
async function getData(): Promise<Enquiries[]> {
  // Fetch data from your API here.
  return [
    {  name: 'Tech Conference', email: '2024-11-25', message: 'New York'},
    {  name: 'Tech Conference', email: '2024-11-25', message: 'New York'},
    {  name: 'Tech Conference', email: '2024-11-25', message: 'New York'},
  ]
}


const page = async () => {

  const data = await getData()
  const enquiries = data
  const columns = [
    { key: 'name', label: 'Full name' },
    { key: 'email', label: 'Email' },
    { key: 'message', label: 'Message' },
  ];

  return (
    <article className="p-6 container space-y-6 flex-1 flex flex-col">
      <div className="flex items-end justify-between py-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Enquiries</span>
            <span> <FaChevronRight /> </span>
            <span>List</span>
          </div>
          <h1 className="text-2xl font-semibold">Contact Inquiries</h1>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <StatsOverview label="Active Enquiries" value={1} />
        <StatsOverview label="Closed Enquiries" value={2} />
      </div>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div className="">
          <DataTable  columns={columns} data={enquiries} showActions={true} />

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
      
    </article>
  )
}

export default page