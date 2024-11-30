import { Skeleton } from "@/components/ui/skeleton"

const TableLoader = () => {
  return (
    <Skeleton className='w-full h-48 md:h-60 animate-pulse rounded-md bg-muted' />
  )
}

export default TableLoader