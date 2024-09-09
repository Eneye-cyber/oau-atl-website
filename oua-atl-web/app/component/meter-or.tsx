import { cn } from "../lib/utils";
import React from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <>
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: 0,
            left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
          }}
        ></span>
      ))}
    </>
  );
};

interface MeteorsDemoProps {
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
  numberOfMeteors?: number; // Optional prop with default value
}

export function MeteorsDemo({
  title,
  description,
  buttonLabel,
  onButtonClick,
  numberOfMeteors = 20, // Default value
}: MeteorsDemoProps) {
  return (
    <div className="">
      <div className="w-full relative max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-sm bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>

          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            {title}
          </h1>

          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
            {description}
          </p>

          <button
            className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300"
            onClick={onButtonClick}
          >
            {buttonLabel}
          </button>

          {/* Meteor effect */}
          <Meteors number={numberOfMeteors} />
        </div>
      </div>
    </div>
  );
}

interface MeteorData {
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

interface MeteorsCardProps {
  data: MeteorData[];
}

export function MeteorsCard({ data }: MeteorsCardProps) {
  return (
    <div className="relative flex justify-center w-full h-full">
      {/* Connective lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {data.length > 1 && (
          <>
            {/* Example: Connect nodes 1 to 2 */}
            <div
              className="absolute top-1/4 left-1/4 h-[2px] bg-purple-900 z-10"
              style={{ width: "50%" }}
            />
            <div
              className="absolute top-1/4 right-1/4 h-[2px] bg-purple-900 z-10"
              style={{ width: "50%" }}
            />
          </>
        )}
        {/* Add more lines here based on the number of nodes and their positions */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8 relative z-20">
        {data.map((meteor, index) => (
          <div
            key={index}
            className="transform transition-transform duration-500 ease-in-out hover:rotate-90 hover:scale-105 relative"
          >
            <MeteorsDemo
              title={meteor.title}
              description={meteor.description}
              buttonLabel={meteor.buttonLabel}
              onButtonClick={meteor.onButtonClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardRender() {
  const meteorData = [
    {
      title: "Explore the Cosmos",
      description:
        "Discover new horizons and venture into the depths of space.",
      buttonLabel: "Start Journey",
      onButtonClick: () => alert("Journey started!"),
    },
    {
      title: "Meteor Showers",
      description:
        "Catch a glimpse of the beautiful meteor showers across the sky.",
      buttonLabel: "Learn More",
      onButtonClick: () => alert("Learning more!"),
    },
    {
      title: "Star Gazing",
      description: "Enjoy a quiet night under the stars with our guided tours.",
      buttonLabel: "Join Us",
      onButtonClick: () => alert("Joining!"),
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center mt-5 text-slate-900">
        Meteor Card Grid
      </h1>
      <MeteorsCard data={meteorData} />
    </div>
  );
}
