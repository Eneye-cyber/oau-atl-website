import Image from "next/image";
import Link from "next/link";

const TopBar = () => {
  return (
    <header className='bg-white py-3 sm:py-4 shadow-drawer-1'>
      <div className="px-[5%] lg:px-[2%] flex items-center">
        <div id="nav-icon" className="w-fit"></div>
        <div className="w-fit ml-auto flex items-center gap-4">

            <Link href={"/notifications"} className="hidden md:inline-flex">
              {/* <Image alt="notification" src={"/img/layout/bell.svg"} width={20} height={20} className="inline-flex"></Image>             */}
            </Link>

            <Link href={"/account/profile"} className="items-center font-bold  p-2">
                Admin            
            </Link>
          </div>
      </div>
    </header>
  )
}

export default TopBar