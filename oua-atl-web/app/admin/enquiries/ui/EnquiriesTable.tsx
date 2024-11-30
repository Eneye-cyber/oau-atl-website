import DataTable from '@/app/ui/DataTable'

const baseUrl = process.env.API_BASE;



//   return (
//     <div className="">
//       <DataTable title="All Contacts" path="events" columns={columns} data={[]} showActions={true} />

//       <Separator className="my-4" />

//       <div className="flex">
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious href="#" />
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink href="#">1</PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink href="#" isActive>
//                 2
//               </PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink href="#">3</PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationEllipsis />
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationNext href="#" />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </div>

//     </div>
//   );
// };


async function fetchData(path: string) {
  try {
    const url = `${baseUrl}/${path}`;
    console.log(url, 'url')
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (error) {
    console.log(error)
    return {message: '', payload: []}
  }
}

const ContactsTable = async ({ status, page }: { status: string; page: string }) => {
  const path = status === "history" ?  "contact/history" : "contact";
  const header = status === "history" ?  "Resolved Enquiries" : "Contact Enquiries";
  const data = await fetchData(`${path}?page=${page}`);

  console.log('status', status)
  console.log('data', data.payload.data)
  let tableData = data?.payload?.data ?? []
  
  const columns = [
    { key: 'full_name', label: 'Full name' },
    { key: 'email', label: 'Email' },
    { key: 'message', label: 'Message' },
    { key: 'created_at', label: 'Date of Inquiry', type: 'date' },
  ];

  return <DataTable title={header} columns={columns} path="enquiries" idKey='contact_id' data={tableData || []} />;
};

export default ContactsTable;

