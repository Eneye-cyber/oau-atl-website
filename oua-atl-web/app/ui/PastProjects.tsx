import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fetchData } from '../../lib/utils/api';
import { PaginatedResponse, ProjectCollection } from '../lib/types';



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
  
]



async function getData(): Promise<PaginatedResponse<ProjectCollection[]>> {
  
  const data = await fetchData('projects')
  return data
  
}



const PastEvents = async () => {
  const data: PaginatedResponse<ProjectCollection[]> = await getData()
  const hasError = data?.error || !data.payload.data.length 
  let projects = !hasError ? data.payload.data : [...projectsFallback]
  projects = projects.length > 6 ? projects.slice(0, 6) : [...projects, ...projects]
  return (
    <>
      <h2 className="text-4xl tracking-tighter font-semibold text-gray-700 text-balance text-center mb-16">Our Projects</h2>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {projects.map((project, index) => (
            <CarouselItem className="sm:basis-1/2 md:basis-1/3" key={index}>
              <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
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
                <CardFooter className="p-4 mt-auto">
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