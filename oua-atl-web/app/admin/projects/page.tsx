
// import { useState } from 'react';
import ProjectsTable from './ui/ProjectsTable'
import Button from '@/app/ui/shared/Button'
import StatsFeed from './ui/StatsFeed';
import StatLoader from '@/app/ui/loaders/StatLoader';
import { Suspense } from 'react'

import Tabs from '@/app/ui/Tabs'
import { FaChevronRight } from "react-icons/fa6";
import TableLoader from '@/app/ui/loaders/TableLoader';

interface Project {
  id: string;
  name: string;
  goal: number;
  amount: number;
  contributors: number;
  deadline?: string;
  status: "Active" | "Complete" | "Overdue";
}

const Page = async ({ searchParams }: { searchParams: { status: string; page: string } }) => {

  const status = searchParams.status || "";
  const page = searchParams.page || "1";


  return (
    <article className="p-6 container">

      <div className="flex items-end justify-between py-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Project</span>
            <span> <FaChevronRight /> </span>
            <span>List</span>
          </div>
          <h1 className="text-2xl font-semibold">Projects</h1>
        </div>

        <Button href="/admin/projects/create">Create Project</Button>
      </div>

      <Suspense fallback={(
          <div className="grid md:grid-cols-3 gap-6">
            <StatLoader />
            <StatLoader />
            <StatLoader />
          </div>
        )}
      >
        <StatsFeed />
      </Suspense>


      <section className="flex flex-col gap-10 py-14">
        <Tabs />
        
        <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
          <Suspense fallback={(<TableLoader />)} >
            <ProjectsTable status={status} page={page} />
          </Suspense>
        </section>


      </section>
    </article>
  )
}

export default Page