'use client';
import Image from 'next/image'
import DonationAction from './actions/DonationAction';

interface Project {
  id?: string;
  image_url?: string;
  project_text?: string;
  amount_collected?: number;
  amount_goal?: number;
  donation_count?: number;
}

interface ProjectCardProps {
  project: Project;
  percentage: number;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  percentage, 
  // onShare, 
  // onDonate 
}) => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-12 gap-6">
      <section className="md:col-span-8">
        <figure className="max-h-96 overflow-hidden shadow-md mb-6">
          <Image
            alt="Project"
            src={project.image_url ?? "/img/scholarship1.jpg"}
            width={420}
            height={244}
            className="rounded-md w-full"
          />
        </figure>

        <div className="text-left leading-10 mb-2">
          <div className="inline-block text-sm">Aug 21, 2017</div>
        </div>

        <section className="my-3 border-t py-4">
          <p>{project.project_text}</p>
          <div className="flex">{/* Add any additional content here */}</div>
        </section>
      </section>

      <aside className="md:col-span-4">
        <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="py-2">
            <h4 className="font-bold text-2xl leading-tight">
              ${Number(project.amount_collected)}
            </h4>
            <p className="text-gray-600 text-sm">raised so far</p>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-indigo-700 rounded-full"
              style={{ width: `${percentage.toFixed(2)}%` }}
            ></div>
          </div>

          <ul className="text-sm text-gray-600 space-y-2 my-6">
            <li>
              <span className="font-medium">Contributors:</span> {project.donation_count}
            </li>
            <li>
              <span className="font-medium">Progress:</span> {`${percentage.toFixed(2)}%`}
            </li>
            <li>
              <span className="font-medium">Time Remaining:</span> 2 month(s)
            </li>
          </ul>

          <h4 className="font-bold text-xl leading-tight">
            ${Number(project.amount_goal).toFixed(2)}
          </h4>
          <p className="text-gray-600 text-sm">Contribution goal</p>

          <div className="mt-4 space-y-3">
            <button
              // disabled={!onShare}
              className="inline-block px-4 py-2 w-full text-center bg-white border text-primary rounded-md shadow hover:bg-primary-light disabled:opacity-65 disabled:pointer-events-none"
              // onClick={onShare || undefined}
            >
              Share
            </button>
            { (project?.id && project?.amount_goal && project?.amount_collected) 
              ?
              <DonationAction projectID={project.id} maxAmount={Number(project.amount_goal) - Number(project.amount_collected)} />
              :
              <button
              disabled={true}
              className={`inline-block px-4 py-2 w-full bg-primary text-white rounded-md shadow 
              hover:bg-primary-light opacity-40 pointer-events-none`}
            >
              Donate
            </button>

            }

          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProjectCard;
