"use client";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedinIn,
  FaSquareInstagram,
} from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListItem, PageData } from "@/app/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/contexts/AuthProvider";

interface IconData {
  component: JSX.Element;
}

type IconList = Record<string, IconData>;
const IconListComponent = ({
  className,
  iconsList,
  socialList,
}: {
  className?: string;
  iconsList: IconList;
  socialList: ListItem[];
}) => {
  const element = socialList.map((item, index) => (
    <li key={index} className="inline-flex h-fit">
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex text-white hover:text-accent"
      >
        {iconsList[item.label].component}
      </a>
    </li>
  ));

  return <ul className={`${className} flex items-center gap-2`}>{element}</ul>;
};
const TopBar = ({
  data,
  userRole,
}: {
  data?: PageData;
  userRole: "guest" | "member" | "admin";
}) => {
  const pathName = usePathname();
  const customizablePage = ["/", "/about-us", "/members-area"];
  const { loading, logout } = useAuth()



  const siteData = data?.sections?.[0]?.content?.[0] ?? { list: [] };
  const socialLinks = siteData?.list as ListItem[];

  const icons = {
    facebook: {
      component: <FaFacebookF />,
    },
    twitter: {
      component: <FaTwitter />,
    },
    google: {
      component: <FaGooglePlusG />,
    },
    linkedIn: {
      component: <FaLinkedinIn />,
    },
    linkedin: {
      component: <FaLinkedinIn />,
    },
    instagram: {
      component: <FaSquareInstagram />,
    },
  };
  const isAdmin = userRole === "admin";
  const linkClass =
    "text-white hover:text-accent text-xs inline-flex py-1 px-2";
  return (
    <div className="bg-primary w-full h-10 pad">
      <div className="container flex items-center h-full justify-between sm:justify-normal">
        <IconListComponent
          className="ml-auto"
          socialList={socialLinks}
          iconsList={icons}
        />

        {loading ? (
          <div className="flex items-center md:mx-4">
            <Skeleton className="w-10 h-2.5 rounded-none" />
            <div className="border border-white h-4 mx-2"></div>
            <Skeleton className="w-10 h-2.5 rounded-none" />
          </div>
        ) : (
          <div className="flex items-center md:mx-4">
            {!userRole || userRole === "guest" ? (
              <>
                <Link className={`${linkClass}`} href="/members/login">
                  Login
                </Link>
                <div className="border border-white h-4 "></div>
                <Link className={`${linkClass}`} href="/members/register">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  className={`${linkClass}`}
                  href={isAdmin ? "/admin" : "/members/profile"}
                >
                  {isAdmin ? "Dashboard" : "Account"}
                </Link>
                {!isAdmin ? (
                  <div
                    className="inline-block border-l border-muted-foreground h-fit w-fit"
                  >
                    <button onClick={logout} className={`${linkClass}`}>Sign Out</button>
                  </div>
                ) : (
                  <div className="inline-block border-l border-muted-foreground h-fit">
                    {/* <Link
                      className={`${linkClass}`}
                      href={
                        customizablePage.includes(pathName)
                          ? `/customize${pathName}`
                          : "/admin/settings"
                      }
                    >
                      Customize
                    </Link> */}
                    {/* <Link className={`${linkClass}`} href={`/customize${pathName}`}>Customize</Link> */}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
