import type { Metadata } from 'next'
import {Suspense } from 'react'
import ExecutiveMembers from './ui/ExecutiveMembers'
import { Mail } from 'lucide-react'
import Image from "next/image"
import HeroSection from '@/app/ui/HeroSection'
import ContactForm from "@/app/ui/forms/ContactForm"
export const metadata: Metadata = {
  title: 'About ATL OAU',
}

const page = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
      <article className="flex-1">
        <HeroSection />
       
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16 lg:mb-20">Our History</h2>
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                alt="Team meeting"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/img/placeholder.svg"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <p className="text-gray-500 dark:text-gray-400">
                  Great Ife Alumni – Atlanta Metro Branch is an alumni association of Obafemi Awolowo University, Ile Ife, Nigeria, formerly known as University of Ife, and fondly remembered by all alumni as ‘Great Ife!’. The branch was officially inaugurated on July 16 2011, and is open to all who attended Great Ife. The local Atlanta Metro Branch continues a strong tradition began by the USA Chapter of the Alumni Association which was inaugurated in Houston, Texas in November 1999. The Houston branch organized the first ever international reunion of Great Ife Alumni in September 2000. Since then, at subsequent international reunions, new branches were chartered.
                </p>
                
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                alt="Team meeting"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                height="310"
                src="/img/placeholder.svg"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                
                <p className="text-gray-500 dark:text-gray-400">
                The Atlanta Metro Branch was chartered at the 2010 international reunion event in Washington DC, where the branch was also tasked with the honor of hosting the 2012 international reunion and 50th golden jubilee anniversary celebration. The inauguration of this local body in Atlanta was an important first step towards making the 2012 event a memorable land mark occasion with dignitaries and alumni members attending from all around the globe. We cordially invite all Great Ife alumni in the Atlanta Metro area to rise to the challenge and contribute to our main objective of creating a strong and vibrant network of Great Ife alumni that will be able to help each other and also contribute to the development of our great alma mater. As aptly stated on the greatifealumni.org web site: &quot;The hall mark team spirit of Great Ifes (as we refer to ourselves), our idealism and sensitivity to national issues all combined to motivate this spirit of coming together to give back to the university that immensely contributed to the attainment of ourlife goals and ambitions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={(<div />)}>
         <ExecutiveMembers></ExecutiveMembers> 
        </Suspense>

        <section className="w-full py-12 md:py-20 lg:py-24 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 lg:mb-16">Contact Us</h2>
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-4">
                <div className="ct_title mt-3 text-3xl font-semibold">
                  <h4>Contact Information</h4>			
                </div>
                
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <p>greatifealumni@gmail.com</p>
                </div>
              </div>

              <div className="lg:col-span-8">
                <ContactForm />

              </div>
            </div>
          </div>
        </section>
      </article>
      
    </div>
    </>
  )
}

export default page