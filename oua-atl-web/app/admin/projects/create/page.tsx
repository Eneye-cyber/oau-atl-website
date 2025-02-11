import type { Metadata } from "next";
// import { headers } from 'next/headers';
import CreateProject from '@/app/ui/forms/project/CreateProject';

export const metadata: Metadata = {
  title: "Create Project  | Ife Alumni",
};

const page = () => {

  return (
    <section className="p-3 md:p-6">
      <CreateProject />
    </section>
  )
}

export default page