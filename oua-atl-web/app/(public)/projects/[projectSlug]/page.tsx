/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Great Ife Project | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Donations, projects.",
};

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



const page = async ({ params }: { params: { projectSlug: string } }) => {
  const data: {message: string, payload: any | null} = await getData(params.projectSlug);
  console.log(data);
  const project: any | null = data.payload ?? null
  function calculatePercentage(current: number, target: number) {
    if (target === 0) return 0; // Avoid division by zero
    return (current / target) * 100;
  }
  
  


  if (!project) {
    return <h3>Event not found</h3>;
  }
  const percentage = calculatePercentage(Number(project.amount_collected), Number(project.amount_goal));

  return (
    <article className="md:py-6">
      <div className="md:py-8 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold">{project.project_title}</h2>
        <div className="inline-block capitalize relative mt-1">{`${project.location.city} ${project.location.state}`}</div>

      </div>

      <div className="container grid grid-cols-1 md:grid-cols-12 gap-6">
        <section className="md:col-span-8">
          <figure className='max-h-96 overflow-hidden shadow-md mb-6'>
            <img alt="Project" src={project.image_url ?? "/img/scholarship1.jpg" } width={420} height={244} className="rounded-md w-full" />
          </figure>

          <div className='text-left leading-10 mb-2'>
            <div className="inline-block text-sm">Aug 21, 2017</div>
          </div>




          <section className="my-3 border-t py-4">
            <p>{project.project_text}</p>
          
            <div className="flex">
              
            </div>
          </section>

        </section>

        <aside className="md:col-span-4">
          <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="py-2">
              <h4 className='font-bold text-2xl leading-tight'>${Number(project.amount_collected)}</h4>
              <p className='text-gray-600 text-sm'>raised so far</p>
            </div>

            

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-2 bg-indigo-700 rounded-full" style={{ width:  `${percentage.toFixed(2)}%` }}></div>
            </div>

            <ul className="text-sm text-gray-600 space-y-2 my-6">
              <li>
                <span className="font-medium">Contributors:</span> {project.donation_count}
              </li>
              <li>
                <span className="font-medium">Progress:</span> { `${percentage.toFixed(2)}%`}
              </li>
              <li>
                <span className="font-medium">Time Remaining:</span>{" "}
                2 month(s)
              </li>
            </ul>

            <h4 className='font-bold text-xl leading-tight'>${Number(project.amount_goal).toFixed(2)}</h4>
            <p className='text-gray-600 text-sm'>Contribution goal</p>

            <div className="mt-4 space-y-3">
              <button
                className="inline-block px-4 py-2 w-full text-center bg-white border text-primary rounded-md shadow hover:bg-primary-light"
                >
                Share
              </button>
              <button
                className="inline-block px-4 py-2 w-full text-center bg-primary text-white rounded-md shadow hover:bg-primary-light"
              >
                Donate
              </button>
            </div>
          </div>

        </aside>
        
      </div>

    </article>
  )
}

export default page