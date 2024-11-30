import type { Metadata } from "next";
import CreateEvent from "@/app/ui/forms/event/CreateEvent";
import { Switch } from "@/components/ui/switch"

export const metadata: Metadata = {
  title: "Create Event  | Ife Alumni",
};

const page = () => {

  const isSubmitting = false;

  return (
    <section className="p-3 md:p-6">
      <CreateEvent />
    </section>
  )
}

export default page