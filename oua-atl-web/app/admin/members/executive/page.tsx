import DataTable from '@/app/ui/DataTable'
import { cookies } from 'next/headers'; 
import { Separator } from "@/components/ui/separator"
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"

const baseUrl = process.env.API_BASE;



async function getData(): Promise<any> {
  // Fetch data from your API here

  // Wait for both promises to resolve
  try {
    const cookieStore = cookies(); // Access cookies
    const url = `${baseUrl}/executives`;
    const res: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore as unknown as string
      },
      credentials: 'include', // Include cookies
      cache: 'no-store', // Force no caching for fresh data
    });
    
    if(res.ok) {
      const result = await res.json()
      console.log('exec result', result)
      return result
    }
    const msg = res.statusText
    throw new Error(msg ?? "Unknown error")
} catch (error: any) {
    console.log('error exec', error)
    return {message: error.message, payload: []}
}

  
}

const page = async () => {
  const columns = [
    { key: 'full_name', label: 'Full name' },
    { key: 'email', label: 'Email' },
    { key: 'position_assigned', label: 'Position assigned' },
    { key: 'year', label: 'Graduating year' },
    { key: 'is_active', label: 'Status' },
  ];

  const data = await getData()
  console.log(data.payload.data, 'data')
  const members: any[] = data?.payload?.data?.map((item: any) => ({ ...item, is_active: item.is_active ? 'Active' : 'Inactive' })) || []

  return (
    <>
      <section className="bg-white ring-1 ring-gray-950/5 rounded p-6">
        <div className="">
          <DataTable path='members/executive' title="Executive Members" idKey="exec_id" columns={columns} data={members} showActions={true} />

          <Separator className="my-4" />

          {/* <div className="flex">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div> */}

        </div>
      </section>
    </>
  )
}

export default page