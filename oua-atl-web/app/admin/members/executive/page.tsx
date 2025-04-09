import type { Metadata } from "next";

import ExecutivesTable from "./ui/ExecutivesTable";
import Tabs from "@/app/ui/Tabs";


export const metadata: Metadata = {
  title: "Manage Executive Members | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Donations, projects.",
};



const ExecutiveMembersPage = () => {

  return (
    <div className="flex flex-col gap-8 py-6">
      <Tabs tabs={[
          { label: "Pending", value: null, href: '/admin/members/executive' },
          { label: "Approved", value: "all", href: '/admin/members/executive?status=all' },
        ]} 
      />
      <section className="bg-white ring-1 ring-gray-950/5 rounded p-6">
        <ExecutivesTable />
      </section>
    </div>
  );
};

export default ExecutiveMembersPage;
