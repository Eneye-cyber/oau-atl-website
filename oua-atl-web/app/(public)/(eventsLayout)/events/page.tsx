import Image from 'next/image'
import Link from 'next/link'
const EventCard = () => {
  return (
    <Link href={'/events/slug'} className='hover:underline'>
      <figure className="w-full max-w-72 shadow-md rounded-b">
        <div className="w-full h-40 rounded-t overflow-hidden">
          <Image alt={'Event Title'} src={'/img/party.jpg'} width={270} height={180} className='h-full w-full object-fill'/>
        </div>
        <figcaption className="p-2 text-body">
          <h3 className="font-semibold text-body tracking-wide">End of Year Event</h3>
          <p className="text-sm font-semibold">Sat, Nov 30 •  9:00 AM </p>
          <p className="text-sm font-light mb-2">Grand Resort Ife</p>
          <span className="text-sm text-body font-medium leading-relaxed no-underline">From $0.00</span>
        </figcaption>
      </figure>
    </Link>
  )
}
const page = () => {
  return (
    <div className='pr-8'>
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold">Upcoming Events</h1>

        <ul className="py-6 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-4 xl:grid-cols-3 xl:gap-6">

          <li><EventCard /></li>
          <li><EventCard /></li>
          <li><EventCard /></li>
        </ul>
      </div>
    </div>
  )
}

export default page