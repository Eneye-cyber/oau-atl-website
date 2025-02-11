import DataTable from '@/app/ui/DataTable'
import { Separator } from "@/components/ui/separator"

import { PaginatedResponse } from "@/app/lib/types";
import { fetchData } from "@/lib/utils/api";

const baseUrl = process.env.API_BASE;


async function getData(): Promise<PaginatedResponse<any[]>> {
  const data = await fetchData("/users");
  return data;
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
  const members = data.payload?.data.map((item: any) => ({ ...item, is_active: item.is_active ? 'Active' : 'Inactive' })) ?? []

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