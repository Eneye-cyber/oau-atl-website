'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TabNavigation = ({href, label}: {href: string; label: string}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link href={href} className={`inline-flex py-1 px-5 border-b-2 ${isActive ? 'border-b-jet-black' : 'text-gray-900/50'}`}>{label}</Link>
  )
}

export default TabNavigation