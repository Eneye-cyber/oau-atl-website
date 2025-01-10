'use client'
import Button from "@/app/ui/shared/Button";
import { useDataContext } from "@/lib/contexts/DataContext"
import HeroSlider from "@/app/(public)/(home)/section/HeroSlider";
import MidSection from "@/app/(public)/(home)/section/MidSection";
import { Suspense } from "react";
import TableLoader from "@/app/ui/loaders/TableLoader";
import PastProjects from "@/app/ui/PastProjects";
import EventSection from "@/app/(public)/(home)/section/EventSection";
import ExtraSection from "@/app/(public)/(home)/section/ExtraSection";
import BannerSection from "@/app/(public)/(home)/section/BannerSection";
import { Section } from "@/app/lib/types";
import { CustomizeAction } from '@/components/actions/CustomizeAction'


const Page =  () => {
  // Fetch the JSON data
  const { state } = useDataContext();

  // Directly reference home page data from context
  const homeData = state.pages?.home;
  if(homeData) {
    return (
      <>
      <CustomizeAction page="home" />
        <section aria-label="hero h-full md:max-h-hero">
          <div className="w-full">
            <HeroSlider data={homeData.sections?.find((s: Section) => s.slug === "home-hero-section") ?? homeData.fallback} />
          </div>
        </section>
        <BannerSection data={homeData.sections.find((s: Section) => s.slug === "strip-banner")  ?? homeData.fallback} />
  
        <MidSection data={homeData.sections.find((s: Section) => s.slug === "home-page-mid-section")  ?? homeData.fallback} />
  
        {/* <section className="py-20 my-12 px-3 bg-gray-100">
          <div className="container">
            <Suspense fallback={<TableLoader />}>
              <PastProjects data={homeData.sections.find((s: Section) => s.slug === "projects")  ?? homeData.fallback} />
            </Suspense>
          </div>
        </section> */}
  
        <section className="py-20 pad">
          <div className="container">
            <Suspense fallback={<TableLoader />}>
              <EventSection data={homeData.sections.find((s: Section) => s.slug === "physical-events")  ?? homeData.fallback} />
            </Suspense>
          </div>
        </section>
  
        <section id="banner" className="w-full banner-hero">
          <div className="container py-8">
            <div className="flex-column items-center space-y-2  md:flex-between md:flex-row">
              <div className="text-center md:text-left text-jet-black">
                <h5 className="text-2xl font-bold">Are you new to our website?</h5>
                <p>We&apos;d love you to join us at an event we have coming up</p>
              </div>
              <Button href="/events">Find Out More</Button>
            </div>
          </div>
        </section>
  
        <section className="py-20 pad">
          <div className="container">
            <Suspense fallback={<TableLoader />}>
              <ExtraSection data={homeData.sections.find((s: Section) => s.slug === "home-grid-section")  ?? homeData.fallback} />
            </Suspense>
          </div>
        </section>
      </>
    );
    
  }
};

export default Page;

