import DataTable from "@/app/ui/DataTable";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import {
  calculatePercentage,
  calculateTimeDifference,
  formatEventDates,
} from "@/lib/utils";
import Link from "next/link";
import { Metadata } from "next";
import {
  ProjectDonationResponse,
  ProjectResponseObject,
} from "@/app/lib/types";

export const metadata: Metadata = {
  title: "ATL Admin | Project details",
};

const baseUrl = process.env.API_BASE;
interface IDataResponse {
  message: string;
  payload: any | null;
}
async function getProjectDetails(id: string) {
  try {
    if (!baseUrl) throw new Error("API_BASE environment variable is not set.");
    const url = `${baseUrl}/projects/${id}`;
    const res = await fetch(url, { method: "GET", credentials: "include" });

    if (!res.ok) {
      return {
        message: `Error ${res.status}: ${res.statusText}`,
        payload: null,
      };
    }

    const result = await res.json().catch(() => ({message: res.statusText}));
    return result;
  } catch (error: any) {
    console.error("Fetch Error:", error);
    return {
      message: error.message || "An unexpected error occurred.",
      payload: null,
    };
  }
}

async function getProjectDonors(id: string) {
  try {
    if (!baseUrl) throw new Error("API_BASE environment variable is not set.");
    const url = `${baseUrl}/projects/${id}/donors`;
    const res = await fetch(url, { method: "GET", credentials: "include" });

    if (!res.ok) {
      return {
        message: `Error ${res.status}: ${res.statusText}`,
        payload: null,
      };
    }

    const result = await res.json().catch(() => ({message: res.statusText}));
    return result;
  } catch (error: any) {
    console.error("Fetch Error:", error);
    return {
      message: error.message || "An unexpected error occurred.",
      payload: null,
    };
  }
}

async function getData(
  id: string
): Promise<{ data: IDataResponse; donors: IDataResponse }> {
  const getProject = getProjectDetails(id);
  const getDonors = getProjectDonors(id);
  try {
    const [project, donors] = await Promise.all([getProject, getDonors]);
    return { data: project, donors };
  } catch (error) {
    const errRes = {
      message: (error as Error)?.message || "An unexpected error occurred.",
      payload: null,
    };
    return { data: errRes, donors: errRes };
  }
}

export default async function page({ params }: { params: { id: string } }) {
  const { data, donors } = await getData(params.id);
  const project: ProjectResponseObject = data.payload;
  const donorsList: ProjectDonationResponse[] = donors.payload;
  const columns = [
    // { key: 'index', label: 's/n' },
    { key: "full_name", label: "Full name" },
    { key: "project_title", label: "Project" },
    { key: "amount_donating", label: "Amount donated" },
    { key: "donated_at", label: "Date", type: "date" },
  ];

  const percentage = calculatePercentage(
    Number(project.amount_collected),
    Number(project.amount_goal)
  );
  return (
    <article className="p-6 container space-y-6 flex-1 flex flex-col">
      <div className="flex items-end justify-between bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Projects</span>
            <span>
              {" "}
              <FaChevronRight />{" "}
            </span>
            <span>View</span>
            <span>
              {" "}
              <FaChevronRight />{" "}
            </span>
            <span className="capitalize">{project.project_title}</span>
          </div>
          <h1 className="text-2xl font-semibold">Project Details</h1>
        </div>
      </div>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div className="container ">
          <section className="">
            <figure className="max-h-96 overflow-hidden shadow-md mb-6">
              <Image
                alt="Project"
                src={project?.image_url ?? "/img/scholarship1.jpg"}
                width={420}
                height={244}
                className="rounded-md w-full"
              />
            </figure>

            <div className="">
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

              <div className="flex"></div>
            </section>
          </section>
        </div>
      </section>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-3 mt-12">
        <div className="overflow-auto lg:col-span-8">
          <DataTable
            title="List of Donors"
            columns={columns}
            data={donorsList}
          />
        </div>

        <aside className="lg:col-span-4">
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
                {/* Backend value wrong, does not reflect changes */}
                <span className="font-medium">Contributors:</span>{" "}
                {project?.donation_count === "0"
                  ? donorsList.length
                  : project?.donation_count}
              </li>
              <li>
                {/* Backend value wrong, does not reflect changes */}
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
        </aside>
      </section>
    </article>
  );
}
