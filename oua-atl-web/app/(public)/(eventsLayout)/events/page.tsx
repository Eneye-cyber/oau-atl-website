
import type { Metadata } from "next";
import {EventCard} from "@/app/ui/Cards" 
import { EventResponseObject } from "@/app/lib/types";

export const metadata: Metadata = {
  title: "Events | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Donations, projects.",
};

const baseUrl = process.env.API_BASE
interface DataResponse {
  message: string,
  payload: { data: EventResponseObject[] | [], page: number, totalCount: number, totalPages: number } 
}
async function getData(): Promise<DataResponse> {
  if (!baseUrl) throw new Error("API_BASE environment variable is not set.");
  try {
    const url = `${baseUrl}/physical-events/latest`;
    const res = await fetch(url, { method: 'GET', credentials: 'include', cache: "no-store", });

    if (!res.ok) {
      return { message: `Error ${res.status}: ${res.statusText}`, payload: { data: [], page: 1, totalCount: 0, totalPages: 1 } };
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error('Fetch Error:', error);
    return { message: error.message || 'An unexpected error occurred.', payload: { data: [], page: 1, totalCount: 0, totalPages: 1 } };
  }
}
const page = async () => {
  const data: DataResponse = await getData();
  console.log(data);
  const events: EventResponseObject[] | [] = data.payload?.data ?? []

  if (!events.length) {
    return <h3>Events not found</h3>;
  }

  return (
    <div className='pr-8'>
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold">Upcoming Events</h1>

        <ul className="py-6 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-4 xl:grid-cols-3 xl:gap-6">
          {events.map((event, item) => (
              <li key={item}>
                <EventCard event={event}  />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default page