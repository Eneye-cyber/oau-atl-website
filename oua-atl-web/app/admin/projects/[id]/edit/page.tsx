/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import EditProject from "@/app/ui/forms/project/EditProject";

// import HeroSection from '@/app/ui/HeroSection'

import { ProjectCollection, ProjectResponseObject } from "@/app/lib/types";
import { fetchData } from "@/lib/utils/api";

export const metadata: Metadata = {
  title: "Edit Project | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Events and Hangount.",
};

async function getData(id: string): Promise<{ message: string; payload: any | null }> {
  const url = `/projects/${id}`;
  const data = await fetchData(url, 'no-cache')
  return data
}


const page = async ({ params }: { params: { id: string } }) => {
  const data: {message: string, payload: ProjectResponseObject | null} = await getData(params.id);
  const project: ProjectResponseObject | null = data.payload ?? null

  if (!project) {
    return <h3>Project not found</h3>;
  }
  
  return (
    <>
      <section className="p-3 md:p-6">
        <EditProject project={project} id={params.id} />
      </section>
    </>
  )
}




export default page