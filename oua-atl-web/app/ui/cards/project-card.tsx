
import Image from "next/image";
import Link from "next/link";
import DonationAction from "@/components/actions/DonationAction";

interface IProjectCard {
  id: string;
  image?: string;
  summary: string;
  title: string;
  goal: string | number;
  raised: string | number;
  status: boolean;
  address: string
}

export default function ProjectCard({id, image, summary, title, goal, raised, status, address}: IProjectCard) {
  function calculatePercentage(current: number, target: number) {
    if (target === 0) return 0; // Avoid division by zero
    return (current / target) * 100;
  }
  
  
  const percentage = calculatePercentage(Number(raised), Number(goal));

  return (
    <div className="p-2 border rounded-lg shadow-md bg-white">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative w-full lg:w-1/3">
          <Link href={`/projects/${id}`} title={title}>
            <Image
              src={image ?? "/img/project.jpg"}
              alt={title}
              width={420}
              height={244}
              className="rounded-md w-full"
            />
          </Link>
          <div className="absolute top-2 left-1">
            {
              status && 
              <Image
                src="/img/featured.png"
                alt="Featured Badge"
                width={75}
                height={75}
                className="h-16 w-16"
              />
            }
            
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-4 md:mt-0 md:ml-4 flex-1">
          <h2 className="text-lg font-semibold">
            <Link
               href={`/projects/${id}`}
              className="text-nero-black hover:underline capitalize"
            >
             {title}
            </Link>
          </h2>

          <div className="text-sm text-gray-600 flex items-center space-x-4">
            <span>
              <i className="fas fa-map-marker-alt mr-1 text-indigo-500"></i>
              {address}
            </span>
            <span>
              <i className="fas fa-calendar-alt mr-1 text-indigo-500"></i>
              Aug 21, 2017
            </span>
          </div>

          <div className="mt-3">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-2 bg-indigo-700 rounded-full" style={{ width: `${percentage.toFixed(2)}%` }}></div>
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-700">
              <span>
                Collected: <strong>${raised}</strong>
              </span>
              <span>
                Goal: <strong>${goal}</strong>
              </span>
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col ">
        <p className="mt-4 text-sm h-16 pb-1 text-gray-700 line-clamp-3 overflow-hidden text-ellipsis" 
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
          }}
        >
          {summary}
        </p>

        <div className="mt-4">
            {/* The backend developer has ensured a project cannot be overfunded */}
          <DonationAction projectID={id} maxAmount={Number(goal) - Number(raised)} />
        </div>
      </div>
    </div>
  );
}