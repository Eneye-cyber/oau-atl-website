/* eslint-disable @next/next/no-img-element */
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DsCAbXRK1LR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import DataTable from '@/app/ui/DataTable'
import Image from 'next/image'
import { FaChevronRight } from "react-icons/fa6";
import { formatEventDates, formatEventTimes } from "@/lib/utils";

const baseUrl = process.env.API_BASE

async function getData(id: string): Promise<{ message: string; payload: any | null }> {
  if (!baseUrl) throw new Error("API_BASE environment variable is not set.");
  try {
    const url = `${baseUrl}/projects/${id}`;
    const res = await fetch(url, { method: 'GET', credentials: 'include' });

    if (!res.ok) {
      return { message: `Error ${res.status}: ${res.statusText}`, payload: null };
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error('Fetch Error:', error);
    return { message: error.message || 'An unexpected error occurred.', payload: null };
  }
}

export default async function page({ params }: { params: { id: string } }) {
  const data: {message: string, payload: any | null} = await getData(params.id);
  console.log('data', data);
  const project = data.payload
  const columns = [
    { key: 'index', label: 's/n' },
    { key: 'name', label: 'Full name' },
    { key: 'project', label: 'Project' },
    { key: 'amount', label: 'Amount donated' },
    { key: 'date', label: 'Date' },
  ];

  const tableData = [
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
            <span>{project.title}</span>
            </div>
          <h1 className="text-2xl font-semibold">Project Details</h1>
        </div>

      </div>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">

        <div className="container ">
          <section className="">
            <figure className='max-h-96 overflow-hidden shadow-md mb-6'>
              <img alt="Project" src={project.image_url ?? "/img/scholarship1.jpg"} width={420} height={244} className="rounded-md w-full" />
            </figure>

            <div className="">
              <h2 className="text-3xl md:text-5xl font-semibold capitalize">{project.project_title}</h2>
              <div className="inline-block capitalize relative mt-1">{project.location.city} &nbsp;-</div>
              <div className="inline-block text-sm">&nbsp;{formatEventDates(project.deadline, project.deadline)}</div>

            </div>
  




            <section className="my-3 border-t py-4">
              <p>{project.project_text}</p>
            
              <div className="flex">
                
              </div>
            </section>

          </section>
        </div>
      </section>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-3 mt-12">
        <div className="overflow-auto lg:col-span-8">
          <DataTable title="List of Donors" columns={columns} data={tableData} />
        </div>

        <aside className="lg:col-span-4">
          <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="py-2">
              <h4 className='font-bold text-2xl leading-tight'>${project.amount_collected}</h4>
              <p className='text-gray-600 text-sm'>raised so far</p>
            </div>

            

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-2 bg-indigo-700 rounded-full" style={{ width: "40%" }}></div>
            </div>

            <ul className="text-sm text-gray-600 space-y-2 my-6">
              <li>
                <span className="font-medium">Contributors:</span> {project.donation_count}
              </li>
              <li>
                <span className="font-medium">Progress:</span> {project.progress}%
              </li>
              <li>
                <span className="font-medium">Time Remaining:</span>{" "}
                2 month(s)
              </li>
            </ul>

            <h4 className='font-bold text-xl leading-tight'>${project.amount_goal}</h4>
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

