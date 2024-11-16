import HeroSection from '@/app/ui/HeroSection'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'About ATL OAU',
}

const page = () => {
  return (
    <>
      <HeroSection />

      <section className="pad">
        <div className="container">
          <div className='py-20'>
            <h3 className="text-lg font-bold text-center mb-6 module-title ">
              <span className='relative'>
                Who We Are
              </span>
            </h3>
 
          </div>
        </div>
      </section>
    </>
  )
}

export default page