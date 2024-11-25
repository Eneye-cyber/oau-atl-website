/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DsCAbXRK1LR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import DataTable from '@/app/ui/DataTable'
import Image from 'next/image'
import { FaChevronRight } from "react-icons/fa6";

export default function page() {
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
    <article className="p-6 container space-y-6 flex-1 flex flex-col">
      <div className="flex items-end justify-between bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Projects</span>
            <span> <FaChevronRight /> </span>
            <span>View</span>
            <span> <FaChevronRight /> </span>
            <span>Project name</span>
            </div>
          <h1 className="text-2xl font-semibold">Project Details</h1>
        </div>

      </div>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">

        <div className="container ">
          <section className="">
            <figure className='max-h-96 overflow-hidden shadow-md mb-6'>
              <Image alt="Project" src="/img/scholarship1.jpg" width={420} height={244} className="rounded-md w-full" />
            </figure>

            <div className="">
              <h2 className="text-3xl md:text-5xl font-semibold">Great Ife Scholarship Fund</h2>
              <div className="inline-block capitalize relative mt-1">Ile Ife &nbsp;-</div>
              <div className="inline-block text-sm">&nbsp;Aug 21, 2017</div>

            </div>
  




            <section className="my-3 border-t py-4">
              <p>Donate Now – Give them a chance! Making a gift of any size to the Great Ife Alumni Association Scholarship program is a great way to help students achieve their goals and potential. Your generosity helps ensure that students and their families are offered a rare gift: the ability to have a choice in their education.</p>
            
              <div className="flex">
                
              </div>
            </section>

          </section>
        </div>
      </section>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-3 mt-12">
        <div className="overflow-auto lg:col-span-8">
          <DataTable title="List of Donors" columns={columns} data={data} />
        </div>

        <aside className="lg:col-span-4">
          <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="py-2">
              <h4 className='font-bold text-2xl leading-tight'>$400.00</h4>
              <p className='text-gray-600 text-sm'>raised so far</p>
            </div>

            

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-2 bg-indigo-700 rounded-full" style={{ width: "40%" }}></div>
            </div>

            <ul className="text-sm text-gray-600 space-y-2 my-6">
              <li>
                <span className="font-medium">Contributors:</span> 10
              </li>
              <li>
                <span className="font-medium">Progress:</span> 40.0%
              </li>
              <li>
                <span className="font-medium">Time Remaining:</span>{" "}
                2 month(s)
              </li>
            </ul>

            <h4 className='font-bold text-xl leading-tight'>$1,000.00</h4>
            <p className='text-gray-600 text-sm'>Contribution goal</p>

            <div className="mt-4 space-y-3">
              <button
                className="inline-block px-4 py-2 w-full text-center bg-white border text-primary rounded-md shadow hover:bg-primary-light"
                >
                Cancel Project
              </button>
              <button
                className="inline-block px-4 py-2 w-full text-center bg-primary text-white rounded-md shadow hover:bg-primary-light"
              >
                Edit
              </button>
            </div>
          </div>

        </aside>

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