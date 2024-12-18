import type { Metadata } from "next";
import CreateEvent from "@/app/ui/forms/event/CreateEvent";

export const metadata: Metadata = {
  title: "Create Event  | Ife Alumni",
};

const page = () => {

  return (
    <section className="p-3 md:p-6">
      <CreateEvent />
    </section>
  )
}

export default page