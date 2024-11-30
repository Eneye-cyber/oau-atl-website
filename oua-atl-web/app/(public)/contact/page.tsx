import HeroSection from '@/app/ui/HeroSection'
import ContactForm from '@/app/ui/forms/ContactForm'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Contact us',
  description: 'Reach out to us for any details, sponsorship and questions',
}

const page = () => {
  return (
    <>
      <HeroSection />

      <section className="pad">
        <div className="container">
          <div className='grid grid-cols-1 md:grid-cols-12 h-full py-20'>
            <div className="md:col-span-4">
              <div className="ct_title mt-3 text-3xl font-semibold">
                <h4>Contact Information</h4>			
              </div>
            </div>

            <div className="md:col-span-8">
              <div className="ct_title mt-3 text-3xl font-semibold">
                <h4>Contact Form</h4>

                <ContactForm />
              </div>
            </div>

            
          </div>
        </div>
    </section>
    </>
  )
}

export default page