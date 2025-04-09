
// import { useState } from 'react';
import ProjectsTable from './ui/ProjectsTable'
import Button from '@/app/ui/shared/Button'
import StatsFeed from './ui/StatsFeed';

import Tabs from '@/app/ui/Tabs'
import { FaChevronRight } from "react-icons/fa6";


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Projects | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Donations, projects.",
};


const Page = () => {



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


      <StatsFeed />



      <section className="flex flex-col gap-10 py-14">
        <Tabs tabs={[
            { label: "Pending", value: null, href: '/admin/projects' },
            { label: "Active", value: "active", href: '/admin/projects?status=active' },
            { label: "Complete", value: "complete", href: '/admin/projects?status=complete'  },
            { label: "Overdue", value: "overdue", href: '/admin/projects?status=overdue'  },
            // { label: "All", value: null, href: '/admin/projects' },
          ]} 
        />
        
        <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 space-y-4">
          <ProjectsTable />
        </section>


      </section>
    </article>
  )
}

export default Page