'use client';

import ProjectCard from '@/components/ProjectCard';
import { fetchData } from "@/lib/utils/client/api";
import { ProjectCollection } from "@/app/lib/types";
import { calculatePercentage } from "@/lib/utils";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ProjectResource extends ProjectCollection {
  id?: string;
  progress: number
}


const Page = () => {

    const { projectSlug } = useParams();
    const router = useRouter();
    const [project, setProject] = useState<ProjectResource | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
      if (!projectSlug) {
        router.replace('/projects');
        return;
      }
  
      const getData = async () => {
        try {
          const data = await fetchData(`/projects/${projectSlug}`);
          if (data.error || !data.payload) {
            setErrorMessage(data.message || 'Project not found');
          } else {
            setProject(data.payload);
          }
        } catch (error) {
          setErrorMessage('An error occurred while fetching project details.');
        } finally {
          setLoading(false);
        }
      };
  
      getData();
    }, [projectSlug, router]);
  

   if (loading) return <LoadingSpinner text="Loading project details..." />
  
    if (!project) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-12 h-96">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Project not found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            We couldn’t find this project in our database. Please check back later.
          </p>
          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        </div>
      );
    }

  
  
  const percentage = calculatePercentage(Number(project.amount_collected), Number(project.amount_goal));

  return (
    <article className="md:py-6">
      <div className="md:py-8 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold">{project.project_title}</h2>
        <div className="inline-block capitalize relative mt-1">{`${project.location.city} ${project.location.state}`}</div>

      </div>

      <ProjectCard
        project={{...project, id: Array.isArray(projectSlug) ? projectSlug[0] :projectSlug}}
        percentage={percentage}
      />

    </article>
  )
}

export default Page