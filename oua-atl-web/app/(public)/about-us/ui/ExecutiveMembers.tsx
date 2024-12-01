import { ExecutiveCard } from "@/app/ui/cards/executive-card"
import { cookies } from 'next/headers'; 

const baseUrl = process.env.API_BASE;



async function getData(): Promise<any> {
  // Fetch data from your API here

  // Wait for both promises to resolve
  try {
    const cookieStore = cookies(); // Access cookies
    const url = `${baseUrl}/executives`;
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
      console.log('exec result', result)
      return result
    }
    const msg = res.statusText
    throw new Error(msg ?? "Unknown error")
} catch (error: any) {
    console.log('error exec', error)
    return {message: error.message, payload: []}
}

  
}


export default async function ExecutiveProfiles() {
  const data = await getData()
  console.log(data.payload.data, 'data')
  const members: any[] = data.payload.data.map((item: any) => ({ ...item, is_active: item.is_active ? 'Active' : 'Inactive' })) || []

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-xl md:text-3xl font-bold text-center mb-8 module-title ">
          <span className='relative'>
            Our Executive Team
          </span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <ExecutiveCard key={member.full_name} name={member.full_name} title={member.position_assigned} imageSrc={member.image_url} linkedinUrl={member.exec_id} />
          ))}
        </div>
      </div>
    </section>
  )
}

