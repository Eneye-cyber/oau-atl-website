import HeroSection from '@/app/ui/HeroSection'
import type { Metadata } from 'next'
import {Suspense } from 'react'
import ExecutiveMembers from './ui/ExecutiveMembers'
 
export const metadata: Metadata = {
  title: 'About ATL OAU',
}

const page = () => {
  return (
    <>
      <HeroSection />

      <section className="pad px-[5%]">
        <div className="container">
          <div className='py-20'>
            <h3 className="text-xl md:text-3xl font-bold text-center mb-6 module-title ">
              <span className='relative'>
                Who We Are
              </span>
            </h3>

            <div className='text-sm text-body font-light py-4'>
              <p>Great Ife Alumni – Atlanta Metro Branch is an alumni association of Obafemi Awolowo University, Ile Ife, Nigeria, formerly known as University of Ife, and fondly remembered by all alumni as ‘Great Ife!’. The branch was officially inaugurated on July 16 2011, and is open to all who attended GreatIfe. The local Atlanta Metro Branch continues a strong tradition began by the USA Chapter of the Alumni Association which was inaugurated in Houston, Texas in November 1999. The Houston branch organized the first ever international reunion of Great Ife Alumni in September 2000. Since then, at subsequent international reunions, new branches were chartered.</p>

              <br />

              <p>The Atlanta Metro Branch was chartered at the 2010 international reunion event in Washington DC, where the branch was also tasked with the honor of hosting the 2012 international reunion and 50th golden jubilee anniversary celebration. The inauguration of this local body in Atlanta was an important first step towards making the 2012 event a memorable land mark occasion with dignitaries and alumni members attending from all around the globe. We cordially invite all Great Ife alumni in the Atlanta Metro area to rise to the challenge and contribute to our main objective of creating a strong and vibrant network of Great Ife alumni that will be able to help each other and also contribute to the development of our great alma mater. As aptly stated on the greatifealumni.org web site: &quot;The hall mark team spirit of Great Ifes (as we refer to ourselves), our idealism and sensitivity to national issues all combined to motivate this spirit of coming together to give back to the university that immensely contributed to the attainment of ourlife goals and ambitions.</p>
              
            </div>


          </div>
        </div>

        
      </section>

      <Suspense fallback={(<div />)}>
        <ExecutiveMembers></ExecutiveMembers>
      </Suspense>
    </>
  )
}

export default page