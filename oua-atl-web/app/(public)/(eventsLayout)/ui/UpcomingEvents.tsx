/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
// import Image from 'next/image'
import { cookies } from 'next/headers'; 
import {EventCard} from "@/app/ui/Cards" 

const baseUrl = process.env.API_BASE;



async function getData(): Promise<any> {
  // Fetch data from your API here

  // Wait for both promises to resolve
  try {
    const cookieStore = cookies(); // Access cookies
    const url = `${baseUrl}/physical-events/latest`;
    const res: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore as unknown as string
      },
      credentials: 'include', // Include cookies
    });
    
    if(res.ok) {
      const result = await res.json()
      console.log('latest event result', result)
      return result
    }
    const msg = res.statusText
    throw new Error(msg ?? "Unknown error")
} catch (error: any) {
    console.log('error latest event', error)
    return {message: error.message, payload: []}
}

  
}
const UpcomingEvents = async () => {
  const data = await getData()
  console.log(data.payload.data, 'data')
  let events: any[] = data.payload.data.length > 0 ? data.payload.data : []
  events = events.length > 3 ? events.slice(0, 3) : events
  return (
    <>
      <ul className="max-w-full space-y-6">
          {events.map((event, item) => (
            <li key={item}>
              <EventCard event={event}  />
            </li>
          ))}
      </ul>
    </>
  )
}

export default UpcomingEvents