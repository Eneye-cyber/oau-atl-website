import Button from "@/app/ui/shared/Button"
import HeroSlider from "./ui/HeroSlider"
import MidSection from "./ui/MidSection"
import { Suspense } from 'react'
import TableLoader from "@/app/ui/loaders/TableLoader"
import PastProjects from "@/app/ui/PastProjects"


const page = () => {
  return (
    <>
     <section aria-label="hero h-full md:max-h-hero">
      <div className="w-full">
        <HeroSlider />
      </div>
     </section>
     <section id="banner" className="w-full banner-hero">
      <div className="container py-4">
        <div className="flex-center">
          <div className="text-center text-jet-black">
            <h5 className="text-xl font-bold">Learn about the activities of Great Ife Alumni Atlanta Chapter -&gt;</h5>
          </div>
        </div>
      </div>

     </section>

     <MidSection />

     <section className="py-24 px-3">
      <div className="container">
        <Suspense fallback={<TableLoader />}>
          <PastProjects />
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

    </>
  )
}

export default page