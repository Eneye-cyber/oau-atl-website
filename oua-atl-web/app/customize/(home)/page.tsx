import Button from "@/app/ui/shared/Button"
import HeroSlider from "./section/HeroSlider"
import MidSection from "./section/MidSection"
import { Suspense } from 'react'
import TableLoader from "@/app/ui/loaders/TableLoader"
import PastProjects from "@/app/ui/PastProjects"
import EventSection from "./section/EventSection"
import ExtraSection from "./section/ExtraSection"
import BannerSection from "./section/BannerSection"


const page = () => {
  return (
    <>
     <section aria-label="hero h-full md:max-h-hero">
      <div className="w-full">
        <HeroSlider />
      </div>
     </section>
     <BannerSection />

     <MidSection />


     <section className="py-20 my-12 px-3 bg-gray-100">
      <div className="container">
        <Suspense fallback={<TableLoader />}>
          <PastProjects />
        </Suspense>
      </div>
     </section>

     <section className="py-20 pad">
      <div className="container">
        <Suspense fallback={<TableLoader />}>
          <EventSection />
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
          <ExtraSection />
        </Suspense>

      </div>
     </section>

    </>
  )
}

export default page