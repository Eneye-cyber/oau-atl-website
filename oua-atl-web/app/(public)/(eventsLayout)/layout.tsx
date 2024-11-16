import HeroSection from '@/app/ui/HeroSection'
import UpcomingEvents from './ui/UpcomingEvents'
import PastEvents from './ui/PastEvents'

export default function EventLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
    <HeroSection />

    <section className="container">
      <div className='flex flex-col md:flex-row h-full py-20'>
        <div className="flex-1">
          {children}
        </div>

        <aside>
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
    </section>


    </>
  )
}