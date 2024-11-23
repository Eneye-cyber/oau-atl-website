
// import { useState } from 'react';
import ProjectsTable from './ui/ProjectsTable'
import Button from '@/app/ui/shared/Button'
import StatsOverview from '@/app/ui/StatsOverview'
import Tabs from '@/app/ui/Tabs'


interface Project {
  id: string;
  name: string;
  goal: number;
  amount: number;
  contributors: number;
  deadline?: string;
  status: "Active" | "Complete" | "Overdue";
}
async function getData(): Promise<Project[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Relief funds",
      goal: 1000,
      amount: 100,
      contributors: 5,
      deadline: "Aug 5, 2025",
      status: "Active",
    },

    {
      id: "728ed52f",
      name: "Scholarship funds",
      goal: 1000,
      amount: 500,
      contributors: 10,
      deadline: "Aug 5, 2024",
      status: "Overdue",
    },

    {
      id: "728ed52f",
      name: "Native Scholarship funds",
      goal: 1000,
      amount: 1200,
      contributors: 10,
      deadline: "Aug 5, 2024",
      status: "Complete",
    },
    // ...
  ]
}

const Page = async () => {
  const data = await getData()

  const projects = data
  return (
    <article className="p-6 container">

      <div className="flex justify-between py-6">
        <h1 className="text-2xl font-semibold">Projects</h1>

        <Button href="/admin/events/create">Create Project</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatsOverview label="Active Projects" value={1} />
        <StatsOverview label="Completed Projects" value={2} />
        <StatsOverview label="Overdue Projects" value={2} />
      </div>


      <section className="flex flex-col gap-10 py-14">
        <Tabs />


        <ProjectsTable projects={projects} />

      </section>
    </article>
  )
}

export default Page