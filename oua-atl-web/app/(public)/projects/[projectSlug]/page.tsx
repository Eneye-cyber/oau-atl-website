/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import ProjectCard from '@/components/ProjectCard';


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

  const handleShare = () => {
    console.log("Share button clicked!");
  };

  const handleDonate = () => {
    console.log("Donate button clicked!");
  };

  return (
    <article className="md:py-6">
      <div className="md:py-8 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold">{project.project_title}</h2>
        <div className="inline-block capitalize relative mt-1">{`${project.location.city} ${project.location.state}`}</div>

      </div>

      <ProjectCard
        project={project}
        percentage={percentage}
        onShare={handleShare}
        onDonate={handleDonate}
      />

    </article>
  )
}

export default page