import HeroSection from '@/app/ui/HeroSection'

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

        
        </div>

      </div>
    </section>


    </>
  )
}