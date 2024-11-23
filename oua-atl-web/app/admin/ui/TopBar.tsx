import Image from "next/image";
import Link from "next/link";

const TopBar = () => {
  return (
    <header className='bg-white py-4 shadow-drawer-1'>
      <div className="px-[5%] lg:px-[2%]">
        <div className="w-fit ml-auto flex items-center gap-4">

            <Link href={"/notifications"} className="hidden md:inline-flex">
              {/* <Image alt="notification" src={"/img/layout/bell.svg"} width={20} height={20} className="inline-flex"></Image>             */}
            </Link>

            <Link href={"/account/profile"} className="hidden md:inline-flex items-center font-bold  p-2">
                Admin            
            </Link>
          </div>
      </div>
    </header>
  )
}

export default TopBar