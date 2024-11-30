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
  const path = status === "history" ?  "physical-events/history" : "physical-events/latest";
  const header = status === "history" ?  "Previous Events" : "Upcoming Events";
  const data = await fetchEvents(`${path}?page=${page}`);
  console.log('status', status)
  console.log('data', data.payload.data)
  let tableData = data?.payload?.data.map(
    (item: Event) => ({...item, location: `${item.location.postal_code}, ${item.location.city}, ${item.location.state}`})
  ) ?? []
  const columns = [
    { key: 'image_url', label: 'Image' },
    { key: 'title', label: 'Event name' },
    { key: 'start_date', label: 'Event date', type: 'date' },
    { key: 'location', label: 'Event location' },
    { key: 'entrance_fee', label: '($) Entrance fee' },
  ];

  return <DataTable title={header} columns={columns} path="events" idKey='event_id' data={tableData || []} showActions />;
};

export default EventsTable;

