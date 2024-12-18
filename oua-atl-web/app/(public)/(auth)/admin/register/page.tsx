import AdminRegistrationForm from "@/app/ui/forms/AdminRegistrationForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Admin | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch",
};

const page = () => {
  return (
    <article className="px-[5%] py-20">

      <section className="py-12 flex-center max-w-screen-lg mx-auto">
        <AdminRegistrationForm />
      </section>
    </article>
  )
}

export default page