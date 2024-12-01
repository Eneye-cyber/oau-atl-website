import DataTable from '@/app/ui/DataTable'
// import { Separator } from "@/components/ui/separator"
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

// async function getStats(path: string) {


//   return (
//     <div className="">
//       <DataTable title="All Events" path="events" columns={columns} data={[]} showActions={true} />

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

interface Event {
  tags: string[]; // Array of tags
  title: string; // Event title
  content: string; // Event description/content
  end_date: string; // ISO date string for the end date
  event_id: string; // UUID for the event ID
  location: {
    city: string; // Location city
    state: string; // Location state
    address: string; // Location address
    latlong: {
      lat: number; // Latitude
      long: number; // Longitude
    };
    postal_code: string; // Postal code
  };
  image_url: string; // URL of the event image
  start_date: string; // ISO date string for the start date
  is_featured: boolean; // Whether the event is featured
  entrance_fee: number; // Entrance fee for the event
}



async function fetchEvents(path: string) {
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

const EventsTable = async ({ status, page }: { status: string; page: string }) => {
  const path = status ? `projects?status=${status}&page=${page} ` : `projects?page=${page}`;
  const data = await fetchEvents(`${path}?page=${page}`);
  console.log('status', status)
  console.log('data', data.payload.data)

  let tableData = data?.payload?.data.map(
    (item: Event) => ({...item, location: `${item.location.city}, ${item.location.state}`})
  ) ?? []

  const columns = [
    { key: 'project_title', label: 'Project name' },
    { key: 'amount_goal', label: 'Financial goal' },
    { key: 'amount_collected', label: 'Contributed amount'  },
    { key: 'donation_count', label: 'No of contributors'  },
    { key: 'date_created', label: 'Project Opened', type: 'date' },
    { key: 'location', label: 'Location' },
  ];


  return <DataTable columns={columns} path="projects" idKey='project_id' data={tableData || []} showActions />;
};

export default EventsTable;

