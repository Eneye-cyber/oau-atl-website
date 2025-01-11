import Link from "next/link";
import { ListItem, PageData } from "@/app/lib/types";
// import { NavItem } from "./NavLinks";

// const quickLinks: NavItem[] = [
//   {label: 'Who We Are', href: '/about-us'},
//   {label: 'Become a Member', href: '/members/register'},
//   {label: 'Edit Profile', href: '/members/dashboard'},
//   {label: 'Pay Membership Dues', href: '/members/dashboard'},
//   {label: 'Upcoming Events', href: '/events'},
//   {label: 'Fundraising Projects', href: '/projects'},
// ]

const FooterLinks = ({ links }: { links: ListItem[] }) => {
  const element = links.map((item, index) => {
    return (
      <li key={index} className="relative inline-flex items-center">
        <Link href={item.href} className="inline-flex py-1 text-sm">
          <span className={`footer-text`}>{item.label}</span>
        </Link>
      </li>
    );
  });

  return <ul className="flex-column gap-2">{element}</ul>;
};

const Footer = ({ data }: { data?: PageData }) => {
  let arr = data?.sections[0]?.content;
  const premier = arr?.[0];
  const remainder = arr?.slice(1)

  return (
    <footer className="mt-auto">
      <section
        aria-label="footer-information"
        className="w-full py-6 bg-jet-black text-white pad"
      >
        <div className="container pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[4fr,2fr,3fr,3fr] gap-3">
            <section className="flex flex-col gap-3 sm:pr-6">
              <h3 className="footer-title">
                <span>{premier?.title}</span>
              </h3>
              <p className="footer-text sm:pr-4">{premier?.text}</p>

              <div className="py-1">
                <Link
                  href={premier?.action?.href ?? "/about-us"}
                  className="inline-flex px-16 py-3 text-xs text-primary-light rounded-md border border-primary-light"
                >
                  {premier?.action?.label ?? "Read More..."}
                </Link>
              </div>
            </section>

            {remainder?.map((item, index) => (
              <section
                key={index}
                className="flex flex-col justify-between gap-3 sm:pr-6"
              >
                <h3 className="footer-title">
                  <span>{item.title}</span>
                </h3>
                {item?.list?.length && (
                  <FooterLinks links={item.list as ListItem[]} />
                )}
              </section>
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

export default Footer;
