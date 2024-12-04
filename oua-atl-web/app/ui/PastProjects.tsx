/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import { cookies } from 'next/headers'; 
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'


const baseUrl = process.env.API_BASE;

const projectsFallback = [
  {
    project_title: 'E-commerce Platform',
    project_text: 'A full-stack e-commerce solution with React and Node.js',
    image_url: '/img/placeholder.svg',
    project_id: 'e-commerce'
  },
  {
    project_title: 'Task Management App',
    project_text: 'A productivity app built with React and Firebase',
    image_url: '/img/placeholder.svg',
    project_id: 'task-management'
  },
  {
    project_title: 'Weather Dashboard',
    project_text: 'Real-time weather information using a third-party API',
    image_url: '/img/placeholder.svg',
    project_id: 'weather-dashboard'
  },
  {
    project_title: 'Social Media Analytics',
    project_text: 'Data visualization for social media metrics',
    image_url: '/img/placeholder.svg',
    project_id: 'social-media-analytics'
  },
  
]


async function getData(): Promise<any> {
  // Fetch data from your API here

  // Wait for both promises to resolve
  try {
    const cookieStore = cookies(); // Access cookies
    const url = `${baseUrl}/projects?status=completed`;
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
      console.log('latest project result', result)
      return result
    }
    const msg = res.statusText
    throw new Error(msg ?? "Unknown error")
} catch (error: any) {
    console.log('error latest project', error)
    return {message: error.message, payload: []}
}

  
}



const PastEvents = async () => {
  const data = await getData()
  console.log(data.payload.data, 'data')
  let projects: any[] = data.payload?.data?.length > 0 ? data.payload.data : [...projectsFallback]
  projects = projects.length > 3 ? projects.slice(0, 3) : projects
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-8">Our Projects</h2>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={project.image_url}
                      alt={project.project_title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{project.project_title}</h3>
                    <p className="mt-2 text-sm text-gray-600 truncate line-clamp-2">{project.project_text}</p>
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <Button asChild className="w-full">
                    <Link href={`/projects/${project.project_id}`}>View Project</Link>
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
          
        </CarouselContent>
      </Carousel>
    </>
  )
}


export default PastEvents