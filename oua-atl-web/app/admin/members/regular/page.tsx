import DataTable from '@/app/ui/DataTable'
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
import { cookies } from 'next/headers'; 

const baseUrl = process.env.API_BASE;

async function getData(): Promise<any> {
  // Fetch data from your API here

  // Wait for both promises to resolve
  try {
    const cookieStore = cookies(); // Access cookies
    const url = `${baseUrl}/users`;
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
      console.log('reg result', result)
      return result
    }
    const msg = res.statusText
    throw new Error(msg ?? "Unknown error")
} catch (error: any) {
    console.log('reg exec', error)
    return {message: error.message, payload: {data: []}}
}

  
}

const page = async () => {
  const columns = [
    { key: 'full_name', label: 'Full name' },
    { key: 'email', label: 'Email' },
    { key: 'study_field', label: 'Course of study' },
    { key: 'year_graduated', label: 'Graduating year' },
    { key: 'status', label: 'Status' },
  ];

  const data = await getData()
  console.log(data.payload.data, 'data')
  const members = data.payload?.data.map((item: any) => ({ ...item, is_active: item.is_active ? 'Active' : 'Inactive' })) || []

  return (
    <>
      <section className="bg-white ring-1 ring-gray-950/5 rounded p-6">
        <div className="">
          <DataTable path='members/regular' idKey="user_id" title="Regular Members" showActions={true} columns={columns} data={members} />

          <Separator className="my-6 bg-gray-950/5" />


        </div>
      </section>
    </>
  )
}

export default page