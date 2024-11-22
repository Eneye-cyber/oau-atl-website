import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Projects | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Donations, projects.",
};

const page = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold">Projects</h1>

        <ul className="py-6 grid sm:grid-cols-2 gap-3 gap-y-5">
          {/* <li className="mb-6">No project yet</li> */}

          <li className="mb-2">
            <ProjectCard />
          </li>

          <li className="mb-2">
            <ProjectCard />
          </li>

          <li className="mb-2">
            <ProjectCard />
          </li>

          <li className="mb-2">
            <ProjectCard />
          </li>


          
        </ul>
      </div>
    </div>
  )
}

function ProjectCard({id, slug, image, summary, title, goal}: any) {
  return (
    <div className="p-2 border rounded-lg shadow-md bg-white">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative w-full lg:w-1/3">
          <Link href="/projects/127-scholarship-fund" title="Great Ife Scholarship Fund">
            <Image
              src="/img/project.jpg"
              alt="Great Ife Scholarship Fund"
              width={420}
              height={244}
              className="rounded-md w-full"
            />
          </Link>
          <div className="absolute top-2 left-1">
            <Image
              src="/img/featured.png"
              alt="Featured Badge"
              width={75}
              height={75}
              className="h-16 w-16"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-4 md:mt-0 md:ml-4 flex-1">
          <h2 className="text-lg font-semibold">
            <Link
              href="/projects/127-scholarship-fund"
              className="text-nero-black hover:underline"
            >
              Great Ife Scholarship Fund
            </Link>
          </h2>

          <div className="text-sm text-gray-600 flex items-center space-x-4">
            <span>
              <i className="fas fa-map-marker-alt mr-1 text-indigo-500"></i>
              Ile Ife, Nigeria
            </span>
            <span>
              <i className="fas fa-calendar-alt mr-1 text-indigo-500"></i>
              Aug 21, 2017
            </span>
          </div>

          <div className="mt-3">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-2 bg-indigo-700 rounded-full" style={{ width: "4%" }}></div>
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-700">
              <span>
                Collected: <strong>$10,000.00</strong>
              </span>
              <span>
                Goal: <strong>$10,000.00</strong>
              </span>
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col ">
        <p className="mt-4 text-sm text-gray-700">
          Donate Now – Give them a chance! Making a gift of any size to the Great Ife Alumni
          Association Scholarship program is a great way to help students achieve their goals and
          potential. Your generosity helps ensure that students and their families are...
        </p>

        <div className="mt-4">
          <Link
            href="/projects?view=cause&id=127-scholarship-fund"
            className="inline-block px-4 py-2 w-full text-center bg-primary text-white rounded-md shadow hover:bg-primary-light"
          >
            Donate
          </Link>
        </div>
      </div>
    </div>
  );
}
export default page