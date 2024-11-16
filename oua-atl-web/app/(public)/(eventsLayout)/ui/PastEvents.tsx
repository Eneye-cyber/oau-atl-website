import Link from 'next/link'
import Image from 'next/image'


const MicroEventCard = ({title, date, fee, image, slug}: {title: string, date: string, fee?: string, image: string, slug: string}) => {
  return (
    <Link href={`/events/${slug}`} className='text-sm text-[#666] space-x-1'>
      <p className='text-primary-light'>{title}</p>
      <p>{date}</p>
      {fee && <p>Starts at: {fee}</p>}

      <Image alt={title} src={image} width={270} height={180} />
      
    </Link>
  )
}

const PastEvents = () => {
  return (
    <>
      <ul className="min-h-32 space-y-6">
        <li>
          <MicroEventCard 
            title="End of Year Event"
            date='Sunday, 15 Dec 2019'
            fee='$25.00'
            image='/img/party.jpg'
            slug='end-of-year-event'
             />
        </li>
      </ul>
    </>
  )
}


export default PastEvents