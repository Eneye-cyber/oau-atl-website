
import Link from 'next/link'
import StatsOverview from '@/app/ui/StatsOverview'
import DataTable from '@/app/ui/DataTable'
import { Separator } from "@/components/ui/separator"
import { FaChevronRight } from "react-icons/fa6";

// async function getData(): Promise<Project[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       name: "Relief funds",
//       goal: 1000,
//       amount: 100,
//       contributors: 5,
//       deadline: "Aug 5, 2025",
//       status: "Active",
//     },

//     {
//       id: "728ed52f",
//       name: "Scholarship funds",
//       goal: 1000,
//       amount: 500,
//       contributors: 10,
//       deadline: "Aug 5, 2024",
//       status: "Overdue",
//     },

//     {
//       id: "728ed52f",
//       name: "Native Scholarship funds",
//       goal: 1000,
//       amount: 1200,
//       contributors: 10,
//       deadline: "Aug 5, 2024",
//       status: "Complete",
//     },
//     // ...
//   ]
// }

const Page = async () => {
  // const data = await getData()

  // const projects = data
  const columns = [
    { key: 'index', label: 's/n' },
    { key: 'name', label: 'Full name' },
    { key: 'project', label: 'Project' },
    { key: 'amount', label: 'Amount donated' },
    { key: 'date', label: 'Date' },
  ];

  const data = [
    { index: 1, name: 'Funke Ajoke', project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 2, name: 'Sunny Ade', project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 3, name: 'Bayo Bayero', project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 4, name: 'Sunny Ade', project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 5, name: 'Bayo Bayero', project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
  ];

  return (
    <article className="p-6 container">

      <div className="flex items-end justify-between py-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
            <span>Admin</span>
            <span> <FaChevronRight /> </span>
            <span>Overview</span>
          </div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>

      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <StatsOverview label="Active alumni" value={2} />
        <StatsOverview label="Ongoing Projects" value={1} />
        <StatsOverview label="Upcoming Events" value={2} />
        <StatsOverview label="Overdue Projects" value={2} />
      </div>


      <section className="bg-white ring-1 ring-gray-950/5 rounded p-6 grid lg:grid-cols-12 gap-3 mt-12">
        <div className="lg:col-span-8">
          <DataTable title="Latest Donations" columns={columns} data={data} />

          <Separator className="my-4" />

          <div className="flex">
            <Link href=""
                className="inline-block px-4 py-2 text-center bg-primary text-white rounded-md shadow hover:bg-primary-light"
              >
                View Donations
              </Link>
          </div>

        </div>

        <aside className="lg:col-span-4">
          <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="py-2">
              <h4 className='font-bold text-2xl leading-tight'>Latest Enquiries</h4>
              <p className='text-gray-600 text-sm'>Latest contact messages</p>
            </div>

            

            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-1 bg-indigo-700 rounded-full" style={{ width: "100%" }}></div>
            </div>

            <ul className="text-sm text-gray-600 space-y-4 my-6">
            <li className="flex gap-2">
                <div>
                  <h4 className='font-semibold leading-tight'>Akintola Moremi</h4>
                
                  <div className='flex items-center '>
                    <div className="flex h-1 w-1 rounded-full bg-nero-black mr-1.5" />
                    <p className="font-medium">How can I join the group</p>
                  </div>
                </div>
              </li>
              <li className="flex gap-2">
                <div>
                  <h4 className='font-semibold leading-tight'>Akintola Moremi</h4>
                
                  <div className='flex items-center '>
                    <div className="flex h-1 w-1 rounded-full bg-nero-black mr-1.5" />
                    <p className="font-medium">How can I join the group</p>
                  </div>
                </div>
              </li>

              <li className="flex gap-2">
                <div>
                  <h4 className='font-semibold leading-tight'>Akintola Moremi</h4>
                
                  <div className='flex items-center '>
                    <div className="flex h-1 w-1 rounded-full bg-nero-black mr-1.5" />
                    <p className="font-medium">How can I join the group</p>
                  </div>
                </div>
              </li>

              <li className="flex gap-2">
                <div>
                  <h4 className='font-semibold leading-tight'>Akintola Moremi</h4>
                
                  <div className='flex items-center '>
                    <div className="flex h-1 w-1 rounded-full bg-nero-black mr-1.5" />
                    <p className="font-medium">How can I join the group</p>
                  </div>
                </div>
              </li>

              
              
            </ul>



            <div className="mt-4">
              <Link href=""
                className="inline-block px-4 py-2 w-full text-center bg-primary text-white rounded-md shadow hover:bg-primary-light"
              >
                View all
              </Link>
            </div>
          </div>

        </aside>

      </section>
    </article>
  )
}

export default Page