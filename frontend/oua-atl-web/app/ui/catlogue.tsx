"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
     <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
  <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
    Our Executive Timeline
  </h2>
  <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
    This timeline showcases the achievements and contributions of our esteemed executives over the years. Here’s a glimpse into their journeys.
  </p>
</div>


      <div ref={ref} className="relative max-w-7xl mx-auto pb-5">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};



// Expanded executive data with graduation year and images
const executives = [
    { name: "Yemi Nsah", position: "Alumni President", graduationYear: "2024 - 2022", bio: "Yemi Nsah studied Electronic/Electrical Engineering at Great Ife and graduated in 1986. She currently works as an IT Consultant.", image: `https://picsum.photos/seed/1/150` },
    { name: "Tunde Sorungbe", position: "Vice President", graduationYear: "2024 - 2022", bio: "Tunde Sorungbe studied accounting at Great Ife and graduated in 1991. He is currently working as an IT Project Manager.", image: `https://picsum.photos/seed/2/150` },
    { name: "Ngozi Onyekaba", position: "Alumni Secretary", graduationYear: "2024 - 2022", bio: "Ngozi Onyekaba studied Electronic/Electrical Engineering and graduated in 1986. She is currently a Business Intelligence leader.", image: `https://picsum.photos/seed/3/150` },
    { name: "Feyi Davies Ward", position: "Assistant Secretary", graduationYear: "2024 - 2022", bio: "Feyi Davies Ward graduated in 1986 with a Bachelor of Agricultural Science degree. She works as a Physician.", image: `https://picsum.photos/seed/4/150` },
    { name: "Tolu Farinu", position: "Alumni Treasurer", graduationYear: "2022 - 2018", bio: "Graduated in 1985 with a bachelors in English and is currently a financial director.", image: `https://picsum.photos/seed/5/150` },
    { name: "Mide Sowunmi", position: "IT Administrator", graduationYear: "2022 - 2018", bio: "Mide Sowunmi graduated in 1990 and has worked in various industries as a UX/UI Specialist.", image: `https://picsum.photos/seed/6/150` },
    { name: "Deji Owoyemi", position: "Public Relations Officer", graduationYear: "2022 - 2018", bio: "Deji Owoyemi graduated in 2004 and is currently the Clinical Director of Rehabilitation.", image: `https://picsum.photos/seed/7/150` },
    { name: "Amina Bello", position: "Marketing Director", graduationYear: "2022 - 2018", bio: "Amina Bello graduated in 2010 with a degree in Marketing. She currently leads a successful marketing team in a tech startup.", image: `https://picsum.photos/seed/8/150` },
    { name: "Chijioke Obi", position: "Chief Financial Officer", graduationYear: "2018 - 2016", bio: "Chijioke Obi studied Finance at Great Ife and graduated in 2002. He has over 15 years of experience in financial management.", image: `https://picsum.photos/seed/9/150` },
    { name: "Kemi Alabi", position: "Operations Manager", graduationYear: "2018 - 2016", bio: "Kemi Alabi graduated in 2015 with a degree in Business Administration. She manages operations at a leading logistics firm.", image: `https://picsum.photos/seed/10/150` },
    { name: "Segun Adebayo", position: "Software Engineer", graduationYear: "2018 - 2016", bio: "Segun Adebayo graduated in 2018 and works as a software engineer at a fintech company, focusing on mobile app development.", image: `https://picsum.photos/seed/11/150` },
    { name: "Titi Lawal", position: "Data Scientist", graduationYear: "2018 - 2016", bio: "Titi Lawal graduated in 2019 with a degree in Computer Science. She specializes in data analysis and machine learning.", image: `https://picsum.photos/seed/12/150` },
    { name: "Folake Ogunleye", position: "Project Coordinator", graduationYear: "2018 - 2016", bio: "Folake Ogunleye graduated in 2012 and has successfully coordinated numerous projects in the nonprofit sector.", image: `https://picsum.photos/seed/13/150` },
    { name: "Niyi Adetokunbo", position: "Consultant", graduationYear: "2018 - 2016", bio: "Niyi Adetokunbo graduated in 1995 and is now a consultant specializing in strategic planning for businesses.", image: `https://picsum.photos/seed/14/150` },
  ];
  
  // Group executives by graduation year
  const groupedExecutives = executives.reduce((acc, executive) => {
    const year = executive.graduationYear.split('-')[0].trim(); // Get the first year for grouping
    const entryIndex = acc.findIndex(entry => entry.title === year);
  
    const executiveCard = (
      <div key={executive.name} className="bg-white text-gray-900 rounded-lg shadow-lg p-4 mb-4 flex items-start">
        <img src={executive.image} alt={executive.name} className="h-16 w-16 rounded-full mr-4" />
        <div>
          <h3 className="text-xl font-semibold">{executive.name}</h3>
          <h4 className="text-lg font-medium text-gold-600">{executive.position}</h4>
          <p className="text-sm">{executive.bio}</p>
        </div>
      </div>
    );
  
    if (entryIndex >= 0) {
      acc[entryIndex].content.push(executiveCard);
    } else {
      acc.push({
        title: year,
        content: [
          <h2 key={year} className="text-2xl font-bold mb-4">{year}</h2>,
          executiveCard,
        ],
      });
    }
  
    return acc;
  }, []);
  
  // Main component
  export default function UseCatalogue() {
    return (
        <Timeline data={groupedExecutives} />
    );
  }
  