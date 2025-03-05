"use client"
import { useEffect, useState } from 'react'
import { PaginatedResponse, ProjectCollection } from "@/app/lib/types";
import { fetchData } from "@/lib/utils/client/api";
import ProjectCard from "@/app/ui/cards/project-card"




const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectCollection[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const data: PaginatedResponse<ProjectCollection[]> = await fetchData(
          "/projects?status=active"
        );
        const hasError = data?.error || !data.payload.data.length 

        setProjects(!hasError ? data.payload.data : []);
        setError(data.error ?? false);
        setErrorMessage(data.message);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);
  if(loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 border-l-transparent"></div>
  
          {/* Loading Text */}
          <p className="text-lg font-semibold text-gray-600">{ 'Loading alumni projects, please wait...'}</p>
        </div>
      </div>
    )
  }

  if (!projects || !projects.length) {
    return  (
      <div className="flex flex-col items-center justify-center text-center py-12">
      
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
      {error ? 'Backend Error' :'No Project Found'}
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        We couldn’t find any upcoming project at the moment. Please check back later.
      </p>
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
    );
  }
  return (
    <div>
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold">Projects</h1>

        <ul className="py-6 grid sm:grid-cols-2 gap-3 gap-y-5">
          {/* <li className="mb-6">No project yet</li> */}

          {projects.map((project, item) => (
              <li className="mb-2" key={item}>
                <ProjectCard 
                    id={project.project_id}  
                    summary={project.project_text}
                    image={project.image_url}
                    title={project.project_title}
                    goal={project.amount_goal}
                    raised={project.amount_collected}
                    status={project.is_featured}
                    address={`${project.location.city} ${project.location.state}`}
                  />
              </li>
            ))}

          
        </ul>
      </div>
    </div>
  )
}


export default ProjectsPage