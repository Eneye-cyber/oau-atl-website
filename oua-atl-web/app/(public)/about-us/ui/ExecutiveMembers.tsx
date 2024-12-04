/* eslint-disable @next/next/no-img-element */
import { ExecutiveCard } from "@/app/ui/cards/executive-card"
import { cookies } from 'next/headers'; 
import { Card, CardContent } from "@/components/ui/card"

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

  // return (
  //   <section className="py-12 bg-gray-50">
  //     <div className="container mx-auto px-4">
  //       <h3 className="text-xl md:text-3xl font-bold text-center mb-8 module-title ">
  //         <span className='relative'>
  //           Our Executive Team
  //         </span>
  //       </h3>
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  //         {members.map((member) => (
  //           <ExecutiveCard key={member.full_name} name={member.full_name} title={member.position_assigned} imageSrc={member.image_url} linkedinUrl={member.exec_id} />
  //         ))}
  //       </div>
  //     </div>
  //   </section>
  // )
  return (
    <section className="w-full py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16 lg:mb-20">Our Executives</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <Card key={member.full_name}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <img
                      alt={member.full_name}
                      className="rounded-full mb-4"
                      height="100"
                      src={member.image_url}
                      style={{
                        aspectRatio: "100/100",
                        objectFit: "cover",
                      }}
                      width="100"
                    />
                    <h3 className="font-bold">{member.full_name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{member.position_assigned}</p>
                  </CardContent>
                </Card>
              ))}
              
            </div>
          </div>
        </section>
  )
}

