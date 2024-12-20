import Link from 'next/link'
import Image from 'next/image'
import { NavLinks, MobileNavLinks } from '@/app/ui/shared/NavLinks'


const NavBar = () => {
  const links = [
    {label: 'Home', href: '/'},
    {label: 'About Us', href: '/about-us'},
    {label: 'Events', href: '/events'},
    {label: 'Projects', href: '/projects'},
    {label: 'Gallery', href: '/gallery'},
    {label: 'Members', href: '/members-area', children: [{label: 'Members Area', href: '/members-area'}, {label: 'Interest Groups', href: '/interest-groups'}]},
    {label: 'Contact', href: '/contact'},
  ]

  return (
    <div className="w-full bg-white pad py-2 md:py-3 shadow-md relative">
      <div className="container flex-between">
        <Link href={'/'}>
          <Image alt={'ATL Alumini'} src={'/img/logo.png'} className='w-20 md:w-36 lg:w-48 xl:w-[270px] h-auto ' width={270} height={67.5} />
        </Link>

        <NavLinks links={links} />
        <MobileNavLinks links={links} />
        
      </div>
    </div>
  )
}

export default NavBar