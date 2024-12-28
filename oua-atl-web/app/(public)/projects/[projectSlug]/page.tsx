/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import ProjectCard from '@/components/ProjectCard';
import { fetchData } from "@/lib/utils/api";
import { ProjectCollection } from "@/app/lib/types";

interface ProjectResource extends ProjectCollection {
  id?: string;
  progress: number
}

export const metadata: Metadata = {
  title: "Great Ife Project | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Donations, projects.",
};

const baseUrl = process.env.API_BASE

async function getData(id: string): Promise<{ message: string; payload: any | null }> {
  const url = `/projects/${id}`;
  const data = await fetchData(url, 'no-cache')
  return data
}



const page = async ({ params }: { params: { projectSlug: string } }) => {
  const data: {message: string, payload: any | null} = await getData(params.projectSlug);
  console.log(data);
  const project: ProjectResource | null = data.payload ?? null
  

  if (!project) {
    return <h3>Project not found</h3>;
  }

  if(project) {
    project['id'] = params.projectSlug
  }
  function calculatePercentage(current: number, target: number) {
    if (target === 0) return 0; // Avoid division by zero
    return (current / target) * 100;
  }
  const percentage = calculatePercentage(Number(project.amount_collected), Number(project.amount_goal));

  return (
    <article className="md:py-6">
      <div className="md:py-8 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold">{project.project_title}</h2>
        <div className="inline-block capitalize relative mt-1">{`${project.location.city} ${project.location.state}`}</div>

      </div>

      <ProjectCard
        project={project}
        percentage={percentage}
      />

    </article>
  )
}

export default page