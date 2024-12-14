'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';

import DrawerLink from './DrawerLink';

const links = [
  {
    label: 'Overview',
    href: '/admin',
    icon: '/icons/admin/dashboard.svg',
    activeIcon: '/icons/admin/dashboard_active.svg',
  },
  {
    label: 'Events',
    href: '/admin/events',
    icon: '/icons/admin/orders.svg',
    activeIcon: '/icons/admin/orders_active.svg',
  },
  {
    label: 'Projects',
    href: '/admin/projects',
    icon: '/icons/admin/reset_password.svg',
    activeIcon: '/icons/admin/reset_password.svg',
  },
  {
    label: 'Members',
    href: '/admin/members',
    icon: '/icons/admin/analytics.svg',
    activeIcon: '/icons/admin/orders_active.svg',
  },
  {
    label: 'Photo Gallery',
    href: '/admin/gallery',
    icon: '/icons/admin/reset_password.svg',
    activeIcon: '/icons/admin/reset_password.svg',
  },
  {
    label: 'Contact Enquiries',
    href: '/admin/enquiries',
    icon: '/icons/admin/enquiries.svg',
    activeIcon: '/icons/admin/enquiries.svg',
  },
];

const DrawerNavigation = () => {
  const [destinationEl, setDestinationEl] = useState<HTMLElement | null>(null);
  const [documentNode, setDocumentNode] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false)


  // Ensure `destinationEl` is set only on the client
  useEffect(() => {
    const navIcon = document.getElementById('nav-icon');
    setDestinationEl(navIcon ?? document.body);
    setDocumentNode(document.body);
  }, []);

  const element = links.map(({ label, href, icon, activeIcon }, index) => (
    <li key={index}>
      <DrawerLink label={label} href={href} icon={icon} activeIcon={activeIcon} onClick={() => setDrawerOpen(false)} />
    </li>
  ));

  return (
    <>
      {destinationEl &&
        createPortal(
          <button aria-expanded="false" onClick={() => setDrawerOpen(true)} aria-controls="drawer" className="w-fit h-fit xl:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 group-open:hidden"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 hidden group-open:block"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>,
          destinationEl
        )}

        { documentNode &&
          createPortal(
            <div onClick={() => setDrawerOpen(false)} className={`fixed inset-0 bg-jet-black z-10  ${drawerOpen ? 'block xl:hidden opacity-30' : 'hidden opacity-0'}`} />,
            documentNode
        )}

      <aside className={`fixed top-0 bottom-0 z-20 w-full max-w-72 bg-white shadow-drawer-1  ${
        drawerOpen ? 'max-xl:translate-x-0' : 'max-xl:-translate-x-full'
      }`}>
        <div className="w-full h-screen py-6 pt-4 flex flex-col gap-8 relative">
          <button onClick={() => setDrawerOpen(false)} className='absolute top-2 right-3 xl:hidden'>
            <Image alt="close dialog" loading='eager' width={24} height={24} src={"/icons/close_dialog.svg"}/>
          </button>
          <Link href="/">
            <Image
              src="/img/Logo.png" // Add your logo image here
              alt="ATL Logo"
              width={200}
              height={50}
              fill={false}
              className="text-center mx-auto"
            />
          </Link>

          <div className="flex-1">
            <ul className="flex-column w-full pl-7 pr-3 md:py-8">{element}</ul>
          </div>

          <div className="pl-7 pr-3 sm:py-3">
            <DrawerLink label="Log Out" href="/api/logout" icon="icons/logout.svg" activeIcon="icons/logout.svg" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default DrawerNavigation;
