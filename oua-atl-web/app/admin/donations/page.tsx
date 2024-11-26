import { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: "Donations | Great Ife Alumni",
};

const page = () => {
  const columns = [
    { key: 'index', label: 's/n' },
    { key: 'name', label: 'Full name' },
    { key: 'email', label: 'Email' },
    { key: 'project', label: 'Project' },
    { key: 'amount', label: 'Amount donated' },
    { key: 'date', label: 'Date' },
  ];

  const data = [
    { index: 1, name: 'Funke Ajoke', email: "samplemail@gmail.com", project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 2, name: 'Sunny Ade', email: "samplemail@gmail.com", project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 3, name: 'Bayo Bayero', email: "samplemail@gmail.com", project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 4, name: 'Sunny Ade', email: "samplemail@gmail.com", project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 5, name: 'Bayo Bayero', email: "samplemail@gmail.com", project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 6, name: 'Funke Ajoke', email: "samplemail@gmail.com", project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 7, name: 'Sunny Ade', email: "samplemail@gmail.com", project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 8, name: 'Bayo Bayero', email: "samplemail@gmail.com", project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 9, name: 'Sunny Ade', email: "samplemail@gmail.com", project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 10, name: 'Bayo Bayero', email: "samplemail@gmail.com", project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
  ];
  return (
    <article className="p-6 container ">

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div className="flex items-end justify-between py-6">
          <div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <span>Total amount donated</span>
            </div>
            <h1 className="text-2xl font-semibold">$20,000 USD</h1>
          </div>

        </div>
      </section>




    <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
      <DataTable title="Donations" columns={columns} data={data} />

      <Separator className="my-6 bg-gray-950/5" />

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
    </section>
  </article>
  )
}

export default page