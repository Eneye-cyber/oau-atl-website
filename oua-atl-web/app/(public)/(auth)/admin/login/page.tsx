import AdminSignInForm from "@/app/ui/forms/AdminSignInForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch",
};

const page = () => {
  return (
    <article className="px-[5%] py-20">

      <section className="py-12 flex-center max-w-screen-sm mx-auto">
        <AdminSignInForm />
      </section>
    </article>
  )
}

export default page