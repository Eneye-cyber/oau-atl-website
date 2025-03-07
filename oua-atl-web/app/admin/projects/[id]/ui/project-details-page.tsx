'use client';

import { useEffect, useState } from 'react';
import DataTable from "@/app/ui/DataTable";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import {
  calculatePercentage,
  calculateTimeDifference,
  formatEventDates,
} from "@/lib/utils";
import Link from "next/link";
import {
  ProjectDonationResponse,
  ProjectResponseObject,
} from "@/app/lib/types";
import Loading from "./../loading"
import { FetchError } from "@/components/ui/fetch-error"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE; // Ensure this is set in your environment variables

interface IDataResponse {
  message: string;
  payload: any | null;
}

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<ProjectResponseObject | null>(null);
  const [donorsList, setDonorsList] = useState<ProjectDonationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [projectError, setProjectError] = useState<Error | null>(null);
  const [donorsError, setDonorsError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!baseUrl) throw new Error("API_BASE environment variable is not set.");
    
        const projectUrl = `${baseUrl}/projects/${params.id}`;
        const donorsUrl = `${baseUrl}/projects/${params.id}/donors`;
    
        // Fetch both endpoints in parallel, ensuring all settle (success or failure)
        const [projectResult, donorsResult] = await Promise.allSettled([
          fetch(projectUrl, { method: "GET", credentials: "include" }).then(res => {
            if (!res.ok) throw new Error(`Project API Error ${res.status}: ${res.statusText}`);
            return res.json();
          }),
          fetch(donorsUrl, { method: "GET", credentials: "include" }).then(res => {
            if (!res.ok) throw new Error(`Donors API Error ${res.status}: ${res.statusText}`);
            return res.json();
          }),
        ]);
    
        // Handle project result
        if (projectResult.status === "fulfilled") {
          setProject(projectResult.value.payload);
        } else {
          // console.error("Project Fetch Error:", projectResult.reason);
          setProjectError(projectResult.reason);
        }
    
        // Handle donors result
        if (donorsResult.status === "fulfilled") {
          setDonorsList(donorsResult.value.payload);
        } else {
          setDonorsError(donorsResult.reason);
        }
      } catch (err) {
        console.error("Unexpected Fetch Error:", err);
        setError((err as Error));
      } finally {
        setLoading(false);
      }
    };
    

    fetchData();
  }, [params.id]);

  if (loading) return <Loading />
  if (error) return <FetchError error={error} showDetails={!!error} message='Unexpected Fetch Error' />;
  // if (!project) return <div>No project data found.</div>;

  const columns = [
    { key: "full_name", label: "Full name" },
    { key: "project_title", label: "Project" },
    { key: "amount_donating", label: "Amount donated" },
    { key: "donated_at", label: "Date", type: "date" },
  ];

  const percentage = project ? calculatePercentage(
    Number(project.amount_collected),
    Number(project.amount_goal)
  )  : 0;

  return (
    <article className="p-6 container space-y-6 flex-1 flex flex-col">
      <div className="flex items-end justify-between bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Projects</span>
            <span><FaChevronRight /></span>
            <span>View</span>
            <span><FaChevronRight /></span>
            <span className="capitalize">{project?.project_title}</span>
          </div>
          <h1 className="text-2xl font-semibold">Project Details</h1>
        </div>
      </div>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
      {!project ? <FetchError error={projectError ?? null} showDetails={!!projectError} message={!!projectError ? 'Error fetching project details.' : undefined} /> : (
        <div className="container">
          <section>
            <figure className="max-h-96 overflow-hidden shadow-md mb-6">
              <Image
                alt="Project"
                src={project?.image_url ?? "/img/scholarship1.jpg"}
                width={420}
                height={244}
                className="rounded-md w-full"
              />
            </figure>

            <div>
              <h2 className="text-3xl md:text-5xl font-semibold capitalize">
                {project.project_title}
              </h2>
              <div className="inline-block capitalize relative mt-1">
                {project.location.city} &nbsp;-
              </div>
              <div className="inline-block text-sm">
                &nbsp;{formatEventDates(project.deadline, project.deadline)}
              </div>
            </div>

            <section className="my-3 border-t py-4">
              <p>{project.project_text}</p>
            </section>
          </section>
        </div>
      )}
      </section>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-3 mt-12">
        <div className="overflow-auto lg:col-span-8">
          {!donorsList ? <FetchError error={donorsError ?? null} showDetails={!!donorsError} message={!!donorsError ? 'Error fetching project donor.' : undefined} /> : (
            <DataTable
              title="List of Donors"
              columns={columns}
              data={donorsList}
            />
          )}
        </div>

        <aside className="lg:col-span-4">
          {!project ? <FetchError /> : (
            <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="py-2">
                <h4 className="font-bold text-2xl leading-tight">
                  ${project.amount_collected}
                </h4>
                <p className="text-gray-600 text-sm">raised so far</p>
              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-indigo-700 rounded-full"
                  style={{ width: percentage }}
                ></div>
              </div>

              <ul className="text-sm text-gray-600 space-y-2 my-6">
                <li>
                  <span className="font-medium">Contributors:</span>{" "}
                  {project?.donation_count === "0"
                    ? donorsList.length
                    : project?.donation_count}
                </li>
                <li>
                  <span className="font-medium">Progress:</span>{" "}
                  {project?.progress === "0.00" ? percentage : project?.progress}%
                </li>
                <li>
                  <span className="font-medium">Time Remaining:</span>{" "}
                  {calculateTimeDifference(project.deadline)}
                </li>
              </ul>

              <h4 className="font-bold text-xl leading-tight">
                ${project.amount_goal}
              </h4>
              <p className="text-gray-600 text-sm">Contribution goal</p>

              <div className="mt-4 space-y-3">
                <Link
                  href={`/admin/projects/${params.id}/edit`}
                  className="inline-block px-4 py-2 w-full text-center bg-primary text-white rounded-md shadow hover:bg-primary-light"
                >
                  Edit
                </Link>
              </div>
            </div>
            
          )}
        </aside>
      </section>
    </article>
  );
}