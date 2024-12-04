import Link from 'next/link'
import { cookies } from 'next/headers'; 
const baseUrl = process.env.API_BASE;



async function getData(): Promise<any> {
  // Fetch data from your API here

  // Wait for both promises to resolve
  try {
    const cookieStore = cookies(); // Access cookies
    const url = `${baseUrl}/executives/latest`;
    const res: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore as unknown as string
      },
      credentials: 'include', // Include cookies
      cache: 'no-store', // Force no caching for fresh data
    });
    
    if(res.ok) {
      const result = await res.json()
      console.log('mem result', result)
      return result
    }
    const msg = res.statusText
    throw new Error(msg ?? "Unknown error")
} catch (error: any) {
    console.log('error mem', error)
    return {message: error.message, payload: []}
}

  
}

const LatestExecutives = async () => {
  const data = await getData()
  console.log(data.payload, 'data')
  let members: any[] = data.payload || []
  members = members.length > 3 ? members.slice(0, 3) : members

  return (
    <>
    <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="py-2">
        <h4 className='font-bold text-2xl leading-tight'>Newest Executives</h4>
        <p className='text-gray-600 text-sm'>Latest additions to the executive board</p>
      </div>

      

      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-1 bg-indigo-700 rounded-full" style={{ width: "100%" }}></div>
      </div>

      <ul className="text-sm text-gray-600 space-y-3 my-6">
          {members.length ? members.map((item, index) => (
            <li key={index} className="flex gap-2">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-nero-black mt-1" />
              <div>
                <h4 className='font-semibold text-lg leading-tight'>{item.full_name}</h4>
                <p className='text-gray-600 text-sm'><span className="font-medium">Position assigned:</span>{" "}{item.position_assigned}</p>
              </div>
            </li>
          )) : (<div>No new additions</div>)
        }


        
      </ul>



      <div className="mt-4">
        <Link href="/admin/members/executive"
          className="inline-block px-4 py-2 w-full text-center bg-primary text-white rounded-md shadow hover:bg-primary-light"
        >
          View all
        </Link>
      </div>
    </div>
    </>
  )
}

export default LatestExecutives