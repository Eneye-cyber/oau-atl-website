'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export interface NavItem {
  label: string;
  href: string;
}

export const NavLinks = ({ links }: { links: NavItem[] }) => {
  const pathname = usePathname();

  const element = links.map((item, index) => {
    const isActive = pathname === item.href;
    
    return (
      <li key={index} className="relative inline-flex items-center">
        <Link href={item.href} className="inline-flex px-3 lg:px-6 py-2 text-sm">
          <span className={`uppercase ${isActive ? 'text-primary-light' : 'text-jet-black hover:text-primary-light'}`}>
            {item.label}
          </span>
        </Link>
      </li>
    );
  });

  return <ul className="hidden md:flex items-center">{element}</ul>;
};
