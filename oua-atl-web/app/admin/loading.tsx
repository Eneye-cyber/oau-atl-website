import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <Skeleton className=" animate-pulse rounded-md bg-muted h-4 w-3/4 mb-2" />
                <Skeleton className=" animate-pulse rounded-md bg-muted h-4 w-1/2 mb-4" />
                <Skeleton className=" animate-pulse rounded-md bg-muted h-32 w-full mb-4" />
                <Skeleton className=" animate-pulse rounded-md bg-muted h-4 w-1/4" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

