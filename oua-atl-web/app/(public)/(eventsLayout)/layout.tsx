import HeroSection from '@/app/ui/HeroSection'
import UpcomingEvents from './ui/UpcomingEvents'
import PastEvents from './ui/PastEvents'

export default function EventLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
    <HeroSection />

    <section className="max-lg:px-[5%]">
      <div className="container">
        <div className='flex flex-col lg:flex-row gap-x-2.5 h-full py-20'>
          <div className="flex-1">
            {children}
          </div>

          <aside className="lg:pl-2.5 lg:border-l-2 lg:border-gray-300">
            <div>
              <h3 className="text-lg font-bold text-center mb-6 module-title ">
                <span className='relative'>
                  Upcoming Events
                </span>
              </h3>

              <UpcomingEvents />
            </div>

            <div>
              <h3 className="text-lg font-bold text-center mb-6 module-title ">
                <span className='relative'>
                  Past Events
                </span>
              </h3>

              <PastEvents />

            </div>
          </aside>
        </div>

      </div>
    </section>


    </>
  )
}