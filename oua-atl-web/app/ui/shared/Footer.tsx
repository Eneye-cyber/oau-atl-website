import Link from "next/link"
import { NavItem } from "./NavLinks";

const FooterLinks = ({ links }: { links: NavItem[] }) => {

  const element = links.map((item, index) => {
    
    return (
      <li key={index} className="relative inline-flex items-center">
        <Link href={item.href} className="inline-flex py-1 text-sm">
          <span className={`footer-text`}>
            {item.label}
          </span>
        </Link>
      </li>
    );
  });

  return <ul className="flex-column gap-2">{element}</ul>;
};




const Footer = () => {
  const quickLinks: NavItem[] = [
    {label: 'Who We Are', href: '#'},
    {label: 'Become a Member', href: '#'},
    {label: 'Edit Profile', href: '#'},
    {label: 'Pay Membership Dues', href: '#'},
    {label: 'Upcoming Events', href: '#'},
    {label: 'Fundraising Projects', href: '#'},
  ]

  return (
    <footer className="mt-auto">
      <section aria-label="footer-information" className="w-full py-6 bg-jet-black text-white pad">
        <div className="container pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[4fr,2fr,3fr,3fr] gap-3">
            <section className="flex flex-col gap-3 sm:pr-6">
              <h3 className="footer-title">
                <span>Who We Are</span>
              </h3>
              <p className="footer-text sm:pr-4">
                Great Ife Alumni - Atlanta Metro Branch is an alumni association of Obafemi Awolowo University, Ile Ife, Nigeria, formerly known as University of Ife, and fondly remembered by all alumni as ‘Great Ife!’. The branch was officially inaugurated on July 16 2011, and is open to all who attended GreatIfe. The local Atlanta Metro Branch continues a strong tradition began by the USA Chapter of the Alumni Association.
              </p>

              <div className="py-1">
                <Link href={'#'} className="inline-flex px-16 py-3 text-xs text-primary-light rounded-md border border-primary-light">Read More...</Link>
              </div>
            </section>

            <section className="flex flex-col justify-between gap-3 sm:pr-6">
              <h3 className="footer-title">
                <span>Quick Links</span>
              </h3>

              <FooterLinks links={quickLinks} />
            </section>

            <section className="flex flex-col justify-between gap-3 sm:pr-6">
              <h3 className="footer-title">
                <span>Coming Soon</span>
              </h3>
            </section>

            <section className="flex flex-col justify-between gap-3 sm:pr-6">
              <h3 className="footer-title">
                <span>Latest Tweets</span>
              </h3>
            </section>
          </div>
           

        </div>
      </section>

      <section aria-label="copyright" className="w-full bg-nero-black py-6 pad">
        <p className="footer-text text-center">Copyright © 2011 - 2018 Great Ife Alumni Association - Atlanta Chapter. All Rights Reserved.</p>
      </section>
    </footer>
  )
}

export default Footer