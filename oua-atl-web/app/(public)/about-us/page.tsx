import type { Metadata } from 'next'
import {Suspense } from 'react'
import ExecutiveMembers from '@/app/(public)/about-us/ui/ExecutiveMembers'
import { Mail, Phone } from 'lucide-react'
import Image from "next/image"
import HeroSection from '@/app/ui/HeroSection'
import ContactForm from "@/app/ui/forms/ContactForm"
import { PageData } from '@/app/lib/types'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'About ATL OAU',
}

const baseUrl = process.env?.APP_URL ?? "http://localhost:3000"

// Fetch the `home` object
const getData = async () => {
  const response = await fetch(`${baseUrl}/api/content`,{
    cache: "no-store"
  });
  const data = await response.json();
  return data.pages.about;
};

const page = async () => {
  const pageData: PageData = await getData();
  const hero = pageData.sections.find((item) => item.slug === "about-hero-section")
  const mainContent = pageData.sections.find((item) => item.slug === "about-page-mid-section")
  const executive = pageData.sections.find((item) => item.slug === "executive-section")
  const contact = pageData.sections.find((item) => item.slug === "contact-section")
  return (
    <>
      <div className="flex flex-col min-h-screen">
      <article className="flex-1">
        <HeroSection data={hero?.content[0]}/>
       
       {  mainContent && (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16 lg:mb-20">{mainContent.header}</h2>
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                alt={mainContent?.header ?? "_#"}
                src={mainContent.content[0]?.media ?? "/img/placeholder.svg"}
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <p className="text-gray-500 dark:text-gray-400"> {mainContent.content[0]?.text}</p>
                
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                height="310"
                alt={mainContent?.header ?? "_#"}
                src={mainContent.content[1]?.media ?? "/img/placeholder.svg"}
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                
                <p className="text-gray-500 dark:text-gray-400">{mainContent.content[1]?.text} </p>
              </div>
            </div>
          </div>
        </section>

        )
       }

      <section className="w-full py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16 lg:mb-20">
            {executive?.header ?? "Our Executives"}
          </h2>

          <Suspense fallback={(<Skeleton className='w-full h-32' />)}>
            <ExecutiveMembers></ExecutiveMembers> 
          </Suspense>
        </div>
      </section>

        <section className="w-full py-12 md:py-20 lg:py-24 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 lg:mb-16">{contact?.header ?? "Contact Us"}</h2>
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-4">
                <div className="ct_title mt-3 text-3xl font-semibold">
                  <h4>{contact?.subheader ?? "Contact Information"}</h4>			
                </div>
                
                <div className="flex items-center space-x-2">
                  {
                    contact?.content[0]?.text && (
                      <>
                        <Mail className="h-5 w-5" />
                        <p>{contact?.content[0]?.text}</p>
                      </>
                    )
                  }

                  {
                    contact?.content[1]?.text && (
                      <>
                        <Phone className="h-5 w-5" />
                        <p>{contact?.content[1]?.text}</p>
                      </>
                    )
                  }
                  
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