import DataTable from '@/app/ui/DataTable'
import { Separator } from "@/components/ui/separator"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const page = () => {
  const columns = [
    { key: 'name', label: 'Full name' },
    { key: 'email', label: 'Email' },
    { key: 'position', label: 'Position assigned' },
    { key: 'year', label: 'Graduating year' },
    { key: 'status', label: 'Status' },
  ];

  const data = [
    { name: 'Funke Ajoke', email: "ajfunke@mail.com", position: "Chairman", year: '19/20', status: 'Active' },
    { name: 'Sunny Ade', email: "adesunny@mail.com", position: "Music", year: '98/99', status: 'Active' },
    { name: 'Bayo Bayero', email: "bbdon@mail.com", position: "Medicine & Surgery", year: '02/03', status: 'Active' },
    { name: 'Sunny Ade', email: "adesunny@mail.com", position: "Music", year: '98/99', status: 'Active' },
    { name: 'Bayo Bayero', email: "bbdon@mail.com", position: "Medicine & Surgery", year: '02/03', status: 'Active' },
  ];

  return (
    <>
      <section className="bg-white ring-1 ring-gray-950/5 rounded p-6">
        <div className="">
          <DataTable path='members/executive' title="Executive Members" columns={columns} data={data} showActions={true} />

          <Separator className="my-4" />

          <div className="flex">
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
          </div>

        </div>
      </section>
    </>
  )
}

export default page