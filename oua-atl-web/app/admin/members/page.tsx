import Link from 'next/link'
import { Separator } from "@/components/ui/separator"
import LatestMembers from "./ui/LatestMembers"
import LatestExecutives from "./ui/LatestExecutives"
import { Suspense } from 'react'
import TableLoader from '@/app/ui/loaders/TableLoader'

const page = async () => {


  return (
    <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-3">
      <div className="md:col-span-8">
        <Suspense fallback={(<TableLoader />)} >
          <LatestMembers />
        </Suspense>
        <Separator className="my-4" />

        <div className="flex">
          <Link href="/admin/members/regular"
              className="inline-block w-full sm:w-fit px-4 py-2 text-center bg-primary text-white rounded-md shadow hover:bg-primary-light"
            >
              View all members
            </Link>
        </div>

      </div>

      <aside className="md:col-span-4">
        <Suspense fallback={(<TableLoader />)} >
          <LatestExecutives />
        </Suspense>

      </aside>

    </section>
  )
}

export default page