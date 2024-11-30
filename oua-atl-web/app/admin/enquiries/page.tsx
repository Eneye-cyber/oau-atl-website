
import { FaChevronRight } from "react-icons/fa6";
import type { Metadata } from 'next'
 


import { Suspense } from 'react'
// import Tabs from '@/app/ui/Tabs'
import StatsFeed from './ui/StatsFeed';
import EnquiriesTable from './ui/EnquiriesTable';
import StatLoader from '@/app/ui/loaders/StatLoader';
import TableLoader from '@/app/ui/loaders/TableLoader';


interface Enquiries {
  name: string;
  email: string;
  message: string;
}

export const metadata: Metadata = {
  title: 'Enquiries | Dashboard',
  description: '...',
}
async function getData(): Promise<Enquiries[]> {
  // Fetch data from your API here.
  return [
    {  name: 'Tech Conference', email: '2024-11-25', message: 'New York'},
    {  name: 'Tech Conference', email: '2024-11-25', message: 'New York'},
    {  name: 'Tech Conference', email: '2024-11-25', message: 'New York'},
  ]
}


const page = async ({ searchParams }: { searchParams: { status: string; page: string } }) => {
  const status = searchParams.status || "";
  const page = searchParams.page || "1";

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

      <Suspense fallback={(
          <div className="grid md:grid-cols-2 gap-6">
            <StatLoader />
            <StatLoader />
          </div>
        )}
      >
        <StatsFeed />
      </Suspense>

      {/* <section className=" py-4">
        <Tabs tabs={[{label: 'Open Enquiries', value: null}, {label: 'Closed Enquiries', value: 'history'}]} />
      </section> */}

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div className="">
        <Suspense fallback={(<TableLoader />)} >
          <EnquiriesTable status={status} page={page}  />
        </Suspense>

        </div>
      </section>
      
    </article>
  )
}

export default page