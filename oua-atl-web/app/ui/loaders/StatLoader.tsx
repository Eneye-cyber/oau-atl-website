import { Skeleton } from "@/components/ui/skeleton"

const StatLoader = () => {
  return (
    <Skeleton className='w-full h-20 md:h-28 animate-pulse rounded-md bg-muted' />
  )
}

export default StatLoader