import Link from 'next/link'
import Image from 'next/image'
import { NavLinks, MobileNavLinks } from '@/app/ui/shared/NavLinks'
import { ListItem, PageData } from "@/app/lib/types";

const links = [
  {label: 'Home', href: '/'},
  {label: 'About Us', href: '/about-us'},
  {label: 'Events', href: '/events'},
  {label: 'Projects', href: '/projects'},
  {label: 'Gallery', href: '/gallery'},
  {label: 'Members', href: '/members-area', children: [{label: 'Members Area', href: '/members-area'}, {label: 'Interest Groups', href: '/interest-groups'}]},
  {label: 'Contact', href: '/contact'},
]

const NavBar = ({data}: {data?: PageData;}) => {
  const siteData = data?.sections[0]?.content[0] ?? { list: [], media: '/img/logo.png'};
  const navLinks = siteData?.list as ListItem[] ?? links;
  const logo = siteData?.media ??  '/img/logo.png'
 

  return (
    <div className="w-full bg-white pad py-2 md:py-3 shadow-md relative">
      <div className="container flex-between">
        <Link href={'/'}>
          <Image alt={'ATL Alumini'} src={logo} className='w-20 md:w-36 lg:w-48 xl:w-[240px] h-auto ' width={270} height={67.5} />
        </Link>

        <NavLinks links={navLinks} />
        <MobileNavLinks links={navLinks} />
        
      </div>
    </div>
  )
}

export default NavBar