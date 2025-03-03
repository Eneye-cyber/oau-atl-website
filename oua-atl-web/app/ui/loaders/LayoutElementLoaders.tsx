import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export const TopBarSkeleton = () => {
  return (
    <div className="bg-primary w-full h-10 pad">
      <div className="container flex items-center h-full justify-between sm:justify-normal">
        <ul className={`ml-auto flex items-center gap-2`}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="size-3" />
          ))}
        </ul>

        <div className="flex items-center md:mx-4">
          <Skeleton className="w-10 h-2.5 rounded-none" />
          <div className="border border-white h-4 mx-2"></div>
          <Skeleton className="w-10 h-2.5 rounded-none" />
        </div>
      </div>
    </div>
  );
};

export const NavBarSkeleton = () => {
  const logo = "/img/logo.png";

  return (
    <div className="w-full bg-white pad py-2 md:py-3 shadow-md relative">
      <div className="container flex-between">
        <Link href={"/"}>
          <Image
            alt={"ATL Alumini"}
            src={logo}
            className="w-20 md:w-36 lg:w-48 xl:w-[240px] h-auto "
            width={270}
            height={67.5}
          />
        </Link>

        <ul className="hidden md:flex items-center">
          {[...Array(5)].map((_, i) => (
            <li key={i} className="inline-flex px-3 lg:px-6 py-2">
              <Skeleton className="h-3.5 w-12" />
            </li>
          ))}
        </ul>

        <Skeleton className="size-4 md:hidden" />
      </div>
    </div>
  );
};

export const FooterSkeleton = () => {
  return (
    <footer className="mt-auto">
      <section
        aria-label="footer-information"
        className="w-full py-6 bg-jet-black text-white pad"
      >
        <div className="container pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[4fr,2fr,3fr,3fr] gap-3">
            <Skeleton className="w-96 h-60" />

            {[...Array(3)]?.map((_, index) => (
              <Skeleton key={index} className="h-60 w-52" />
            ))}
          </div>
        </div>
      </section>

      <section aria-label="copyright" className="w-full bg-nero-black py-6 pad">
        <p className="footer-text text-center">
          Copyright © 2011 - {new Date().getFullYear()} Great Ife Alumni
          Association - Atlanta Chapter. All Rights Reserved.
        </p>
      </section>
    </footer>
  );
};
