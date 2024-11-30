
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <article className="p-6 container space-y-6 flex-1 flex flex-col">

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">

        <div className="w-full mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <Skeleton className="animate-pulse rounded-md bg-muted col-span-1 lg:col-span-2 h-96" />
          </div>
        </div>
      </section>
    </article>
  )
}

export default Loading