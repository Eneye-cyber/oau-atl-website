import DataTable from '@/app/ui/DataTable'
import { Separator } from "@/components/ui/separator"
import { PaginatedResponse } from "@/app/lib/types";
import { fetchData } from "@/lib/utils/api";
const baseUrl = process.env.API_BASE;


async function getData(): Promise<PaginatedResponse<any[]>> {
  const data = await fetchData("/executives");
  return data;
}


const page = async () => {
  const columns = [
    { key: 'image_url', label: 'Image' },
    { key: 'full_name', label: 'Full name' },
    { key: 'position_assigned', label: 'Position assigned' },
    { key: 'year_graduated:', label: 'Graduating year' },
    { key: 'is_active', label: 'Status' },
  ];

  const data = await getData()
  console.log(data.payload.data, 'data')
  const members: any[] = data?.payload?.data?.map((item: any) => ({ ...item, is_active: item.is_active ? 'Active' : 'Inactive' })) ?? []

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