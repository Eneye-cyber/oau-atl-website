'use client'
import { useEffect, useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedinIn,
  FaSquareInstagram,
} from "react-icons/fa6";
import Link from 'next/link'
import { usePathname } from 'next/navigation';

interface IconData {
  component: JSX.Element;
  link: string;
}

type IconList = Record<string, IconData>;
const IconListComponent = ({className, iconsList}: { className?: string, iconsList: IconList}) => {
  const element = Object.keys(iconsList).map((item, index) => (
    <li key={index} className="inline-flex h-fit">
      <a href={iconsList[item].link} target="_blank" rel="noopener noreferrer" className="inline-flex text-white hover:text-accent">
        {iconsList[item].component}
      </a>
    </li>
  ))

  return <ul className={`${className} flex items-center gap-2`}>{element}</ul>
}
const TopBar = ({userRole}: {userRole: "guest" | "member" | "admin"}) => {
  const [role, setRole] = useState<string>(userRole);
  const pathName = usePathname()

  useEffect(() => {
    async function fetchRole() {
      const response = await fetch('/api/user');
      const data = await response.json();
      setRole(data.role);
    }
    fetchRole().catch(e => console.error(e));
  }, [pathName]);

  const icons = {
    facebook: {
      component: <FaFacebookF />,
      link: 'http://'
    },
    twitter: {
      component: <FaTwitter />,
      link: 'http://'
    },
    google: {
      component: <FaGooglePlusG />,
      link: 'http://'
    },
    linkedIn: {
      component: <FaLinkedinIn />,
      link: 'http://'
    },
    instagram: {
      component: <FaSquareInstagram />,
      link: 'http://'
    },
  }
  const isAdmin = role === "admin"
  const isMember = role === "member"
  const linkClass = "text-white hover:text-accent text-xs inline-flex py-1 px-2"
  return (
    <div className="bg-primary w-full h-10 pad">
      <div className="container flex items-center h-full justify-between sm:justify-normal">
          <IconListComponent className="ml-auto" iconsList={icons} />

          <div className="flex items-center md:mx-4">
            {
              (!role || role === "guest") ? (
                <>
                  <Link className={`${linkClass}`} href="/members/login">Login</Link>
                  <div className="border border-white h-4 "></div>
                  <Link className={`${linkClass}`} href="/members/register">Register</Link>
                </>
              ) : (
                <>
                  <Link className={`${linkClass}`} href={isAdmin ? "/admin" :"/members/profile"}>{isAdmin ? 'Dashboard' : 'Account'}</Link>
                  {!isAdmin ? (
                    <form className="inline-block border-l border-muted-foreground h-fit" action="/api/logout" method="POST">
                      <input type="submit" className={`${linkClass}`} value="Sign Out" />
                    </form>

                  ) : (
                    <div className="inline-block border-l border-muted-foreground h-fit">
                      <Link className={`${linkClass}`} href={`/customize${pathName}`}>Customize</Link>
                    </div>
                  )}
                </>
                
                
              )
            }
          </div>
      </div>
    </div>
  )
}



export default TopBar