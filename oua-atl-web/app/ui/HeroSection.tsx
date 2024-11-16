'use client';
import Link from 'next/link'
import {usePathname} from 'next/navigation'


const HeroSection = () => {
  const pathname = usePathname()
  const herolabel = pathname.split('/').at(-1)

  return (
    <section className="w-full py-16 hero-alt bg-center bg-no-repeat">
      <div className="container ">
        <div className="text-center text-white">
          <h2 className='text-4xl font-bold mb-3 capitalize'>{herolabel}</h2>
          <p className='text-sm'><Link href="/">Home</Link> / <span className="text-primary-light capitalize">{herolabel}</span></p>
        </div>
      </div>

    </section>
  )
}

export default HeroSection