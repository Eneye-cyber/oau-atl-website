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


export const MobileNavLinks = ({ links }: { links: NavItem[] }) => {
  const pathname = usePathname();

  const element = links.map((item, index) => {
    const isActive = pathname === item.href;
    
    return (
      <li key={index}>
        <Link href={item.href} className={`block ${isActive ? 'text-accent font-medium border-l-2 border-l-accent bg-nero-black border-primary' : 'border-gray-400 text-gray-300'} hover:text-accent hover:bg-nero-black text-sm px-3 py-2.5 border-t `}>
          {item.label}
        </Link>
      </li>
    );
  });

  return (
    <details className="md:hidden group">
      <summary
        className="list-none cursor-pointer flex items-center justify-center text-jet-black focus:outline-none"
        aria-label="Toggle Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 group-open:hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 hidden group-open:block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </summary>
      <nav className="absolute left-0 right-0 top-full bg-jet-black overflow-hidden transition-[max-height] duration-500 ease-in-out max-h-0 group-open:max-h-[500px] z-10">
        <ul className="flex flex-col">
          {element}
        </ul>
      </nav>
    </details>
  );
};
