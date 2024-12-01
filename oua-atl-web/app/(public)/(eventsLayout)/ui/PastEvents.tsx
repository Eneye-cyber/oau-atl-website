/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
// import Image from 'next/image'
import { cookies } from 'next/headers'; 
import { formatEventDates } from "@/lib/utils";
import {EventCard} from "@/app/ui/Cards" 

const baseUrl = process.env.API_BASE;



async function getData(): Promise<any> {
  // Fetch data from your API here

  // Wait for both promises to resolve
  try {
    const cookieStore = cookies(); // Access cookies
    const url = `${baseUrl}/physical-events/history`;
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

// const MicroEventCard = ({title, date, fee, image, slug}: {title: string, date: string, fee?: string, image: string, slug: string}) => {
//   return (
//     <Link href={`/events/${slug}`} className='text-sm text-[#666] space-x-1'>
//       <p className='text-primary-light'>{title}</p>
//       <p>{formatEventDates(date, date)}</p>
//       {fee && <p>Starts at: ${fee}</p>}

//       <img alt={title} src={image} width={270} height={180} />
      
//     </Link>
//   )
// }

const PastEvents = async () => {
  const data = await getData()
  console.log(data.payload.data, 'data')
  let events: any[] = data.payload.data.length > 0 ? data.payload.data : []
  events = events.length > 3 ? events.slice(0, 3) : events
  return (
    <>
      <ul className="max-w-full space-y-6">
        {/* <li>
          {events.map((event: any) => (
            
            <MicroEventCard 
              key={event.event_id}
              title={event.title}
              date={event.start_date}
              fee={event.entrance_fee}
              image={event.image_url}
              slug={event.event_id}
            />
          ))}
        </li> */}
          {events.map((event, item) => (
            <li key={item}>
              <EventCard event={event}  />
            </li>
          ))}
      </ul>
    </>
  )
}


export default PastEvents