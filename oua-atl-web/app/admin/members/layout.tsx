import Button from '@/app/ui/shared/Button'
import TabNavigation from './ui/TabNavigation'
import { FaChevronRight } from "react-icons/fa6";


const MemberLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {


  return (
    <article className="p-6 container flex-1 flex flex-col gap-6 md:gap-12">

      <section className=" bg-white ring-1 ring-gray-950/5 rounded">
        <div className="flex items-end justify-between mb-6 p-6">
          <div className="">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <span>Admin</span>
              <span> <FaChevronRight /> </span>
              <span>Alumni members</span>
            </div>
            <h1 className="text-2xl font-semibold">Registered Alumni</h1>
          </div>

          <Button href="/admin/members/create-admin">Create Admin User</Button>

        </div>

        <div className="flex px-1 border-b-2 w-fit">
          <TabNavigation href="/admin/members/regular" label="Regular Members"></TabNavigation>
          <TabNavigation href="/admin/members/executive" label="Executive Members"></TabNavigation>
        </div>

      </section>

      {children}


      
    </article>
  )
}

export default MemberLayout