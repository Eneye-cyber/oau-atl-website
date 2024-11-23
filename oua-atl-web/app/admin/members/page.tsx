import Link from 'next/link'
import DataTable from '@/app/ui/DataTable'
import { Separator } from "@/components/ui/separator"


const Page = async () => {

  const columns = [
    { key: 'name', label: 'Full name' },
    { key: 'email', label: 'Email' },
    { key: 'course', label: 'Course of study' },
    { key: 'year', label: 'Graduating year' },
    { key: 'status', label: 'Status' },
  ];

  const data = [
    { name: 'Funke Ajoke', email: "ajfunke@mail.com", course: "Dramatic arts", year: '19/20', status: 'Active' },
    { name: 'Sunny Ade', email: "adesunny@mail.com", course: "Music", year: '98/99', status: 'Active' },
    { name: 'Bayo Bayero', email: "bbdon@mail.com", course: "Medicine & Surgery", year: '02/03', status: 'Active' },
    { name: 'Sunny Ade', email: "adesunny@mail.com", course: "Music", year: '98/99', status: 'Active' },
    { name: 'Bayo Bayero', email: "bbdon@mail.com", course: "Medicine & Surgery", year: '02/03', status: 'Active' },
  ];
  

  return (
    <section className="bg-white ring-1 ring-gray-950/5 rounded p-6 grid grid-cols-12 gap-3">
      <div className="md:col-span-8">
        <DataTable title="Latest Members" columns={columns} data={data} showActions={true} />

        <Separator className="my-4" />

        <div className="flex">
          <Link href="/admin/members/regular"
              className="inline-block px-4 py-2 text-center bg-primary text-white rounded-md shadow hover:bg-primary-light"
            >
              View all members
            </Link>
        </div>

      </div>

      <aside className="md:col-span-4">
        <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="py-2">
            <h4 className='font-bold text-2xl leading-tight'>Newest Executives</h4>
            <p className='text-gray-600 text-sm'>Latest additions to the executive board</p>
          </div>

          

          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-1 bg-indigo-700 rounded-full" style={{ width: "100%" }}></div>
          </div>

          <ul className="text-sm text-gray-600 space-y-3 my-6">
            <li className="flex gap-2">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-nero-black mt-1" />
              <div>
                <h4 className='font-semibold text-lg leading-tight'>Adeniyi Awolowo</h4>
                <p className='text-gray-600 text-sm'><span className="font-medium">Position assigned:</span>{" "}Chairman</p>
              </div>
            </li>
            <li className="flex gap-2">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-nero-black mt-1" />
              <div>
                <h4 className='font-semibold text-lg leading-tight'>Akintola Moremi</h4>
                <p className=' text-sm'><span className="font-medium">Position assigned:</span>{" "}Chairwoman</p>
              </div>
            </li>

            <li className="flex gap-2">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-nero-black mt-1" />
              <div>
                <h4 className='font-semibold text-lg leading-tight'>Adekunle Obafemi</h4>
                <p className='text-gray-600 text-sm'><span className="font-medium">Position assigned:</span>{" "}PRO</p>
              </div>
            </li>
            
          </ul>



          <div className="mt-4">
            <Link href="/admin/members/executive"
              className="inline-block px-4 py-2 w-full text-center bg-primary text-white rounded-md shadow hover:bg-primary-light"
            >
              View all
            </Link>
          </div>
        </div>

      </aside>

    </section>
  )
}

export default Page