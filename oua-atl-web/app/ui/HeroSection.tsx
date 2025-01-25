'use client';
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import { Content } from '../lib/types';


const HeroSection = ({data}: {data?: Content}) => {
  const pathname = usePathname()
  const herolabel = (data && data?.title) ? data.title : pathname.split('/').at(-1)

  return (
    <section className="w-full hero-alt bg-center bg-cover bg-no-repeat py-12 md:py-24 lg:py-32 xl:py-48" 
    style={{backgroundImage: data?.media ? `url(${data?.media})` : "/img/1_alt.jpg"}}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl capitalize font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
            {herolabel} 
            </h1>
            <p className='text-sm text-white/80 md:text-base'><Link href="/">Home</Link> / <span className="text-primary-light capitalize">{herolabel}</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection