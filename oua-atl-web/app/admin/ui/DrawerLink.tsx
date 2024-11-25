'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const DrawerLink = ({ href, icon, activeIcon, label, onClick }: 
  {href: string; icon?: string | StaticImport; activeIcon?: string | StaticImport; label: string; onClick?: () => void}) => {
  const pathname = usePathname();
  
  // Check if the current path matches the link href
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full">
      <div onClick={onClick} className={`flex item-center gap-2.5 py-4 px-3 rounded-md w-full ${isActive ? 'text-accent font-semibold' : 'text-body'}`}>
        {/* <div className='w-4 h-4 sm:w-6 sm:h-6'>
          <Image width={24} height={24} src={isActive ? activeIcon : icon} alt="Dashboard icon" className="w-full h-full" fill={false} />
        </div> */}
        <p className="text-sm sm:text-base">{label}</p>

      </div>

    </Link>
  );
};

export default DrawerLink;