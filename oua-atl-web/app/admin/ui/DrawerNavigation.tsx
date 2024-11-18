
import Image from 'next/image';
import Link from 'next/link';

import DrawerLink from './DrawerLink'

const links = [
  {
    label: 'Overview',
    href: '/admin',
    icon: '/icons/admin/dashboard.svg',
    activeIcon: '/icons/admin/dashboard_active.svg'
  },
  // {
  //   label: 'Users',
  //   href: '/admin/users',
  //   icon: '/icons/admin/users.svg',
  //   activeIcon: '/icons/admin/users_active.svg'
  // },
  {
    label: 'Events',
    href: '/admin/events',
    icon: '/icons/admin/orders.svg',
    activeIcon: '/icons/admin/orders_active.svg'
  },
  {
    label: 'Projects',
    href: '/admin/orders',
    icon: '/icons/admin/reset_password.svg',
    activeIcon: '/icons/admin/reset_password.svg'
  },
  {
    label: 'Members',
    href: '/admin/orders',
    icon: '/icons/admin/analytics.svg',
    activeIcon: '/icons/admin/orders_active.svg'
  },
  {
    label: 'Notification',
    href: '/admin/notifications',
    icon: '/icons/admin/notification.svg',
    activeIcon: '/icons/admin/notification.svg'
  },
  {
    label: 'Reset Password',
    href: '/admin/orders',
    icon: '/icons/admin/reset_password.svg',
    activeIcon: '/icons/admin/reset_password.svg'
  },
  {
    label: 'Manage Enquiries',
    href: '/admin/orders',
    icon: '/icons/admin/enquiries.svg',
    activeIcon: '/icons/admin/enquiries.svg'
  },
]

const DrawerNavigation = () => {
  const element = links.map(({label, href, icon, activeIcon}, index) => (
    <li key={index}>
      <DrawerLink 
        label={label}
        href={href}
        icon={icon}
        activeIcon={activeIcon}
      />
    </li>
  ))
  return (
    <aside className="fixed top-0 bottom-0 z-20 w-full max-w-72 bg-white shadow-drawer-1">
      <div className="w-full h-screen py-6 pt-4 flex flex-col gap-8">
        <Link href="/">
          <Image 
            src="/img/Logo.png"  // Add your logo image here
            alt="ATL Logo"
            width={200}
            height={50}
            fill={false}
            className='text-center mx-auto'
          />
        </Link>

        <div className='flex-1'>
          <ul className="flex-column w-full pl-7 pr-3 py-3">
            {element}
          </ul>
        </div>

        <div className='pl-7 pr-3 sm:py-3'>
          <DrawerLink 
            label={"Log Out"}
            href={"/admin/logout"}
            icon={"icons/logout.svg"}
            activeIcon={"icons/logout.svg"}
          />
        </div>

      </div>
    </aside>
  )
}

export default DrawerNavigation