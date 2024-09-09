import React, { useState } from "react";

interface QuickLink {
  name: string;
  link: string;
}

interface FooterSection {
  [key: string]: React.ReactNode;
}

export default function FooterAlumniPage() {
  const [headerData] = useState({
    title: "Who We Are",
    description:
      "Great Ife Alumni – Atlanta Metro Branch is an alumni association of Obafemi Awolowo University, Ile Ife, Nigeria, formerly known as University of Ife, and fondly remembered by all alumni as ‘Great Ife!’. The branch was officially inaugurated on July 16 2011, and is open to all who attended GreatIfe. The local Atlanta Metro Branch continues a strong tradition began by the USA Chapter of the Alumni Association.",
  });

  const quickLinks: QuickLink[] = [
    { name: "Become a Member", link: "#" },
    { name: "Edit Profile", link: "#" },
    { name: "Pay Membership Dues", link: "#" },
    { name: "Upcoming Events", link: "#" },
  ];

  const [footerData] = useState<FooterSection>({
    "Quick Links": (
      <ul className="space-y-5">
        {quickLinks.map((link, index) => (
          <li key={index}>
            <a href={link.link} className="text-blue-500 hover:underline">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    ),
    "Upcoming Events": <p>No events found.</p>,
    "Fundraising Projects": <p>Coming Soon</p>,
    "Latest Tweets": <p>No tweets available</p>,
  });

  return (
    <div className="text-zinc-200 w-full justify-around bg-zinc-800 flex sm:flex-row p-32 pt-30 flex-col  items-start ">
      {/* Header */}
      <div className="mb-8 w-1/4">
        <h1 className="text-3xl font-bold mb-4">{headerData.title}</h1>
        <p className="text-[16px] font-sans">{headerData.description}</p>
        <button className="mt-2  px-3 border rounded-md border-purple-500 p-2">
          Learn More
        </button>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(footerData).map(([sectionTitle, content], index) => (
          <div key={index} className="">
            <h2 className="text-xl font-[500] mb-4 border-b-2 border-b-purple-500 pb-2">
              {sectionTitle}
            </h2>
            <div className="text-xl font-sans space-y-5 ">{content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
