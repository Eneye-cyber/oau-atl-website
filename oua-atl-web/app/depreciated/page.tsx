"use client";
import React, { useEffect, useState } from "react";
import Slider1 from "@/public/1.jpg";
import Slider2 from "@/public/2.jpg";
import Slider3 from "@/public/3.jpg";
import Render, { ContentRenderProps } from "@/app/component/render";

export default function Page() {
  const Sliders: ContentRenderProps[] = [
    {
      img: Slider1,
      Heading: "NOT JUST FUN AND GAMES",
      Text: "WE ALSO MEET REGULARLY TO SUPPORT ONE ANOTHER AS WELL AS THE UNIVERSITY OH, AND THERE'S FOOD.",
      Button: (
        <button className="border-slate-50 border-[3px] rounder-md text-white font-[600] px-3 py-1">
          Find Meeting
        </button>
      ),
    },
    {
      img: Slider2,
      Heading: "THE ART OF GIVING SOMETHING BACK",
      Text: "FIND OUT ABOUT THE INITIATIVES AND PROJECTS WE ARE WORKING ON AS WELL AS HOW YOU CAN HELP. WE'D LOVE TO HEAR FROM YOU.",
      Button: (
        <button className="border-slate-50 border-[3px] rounder-md text-white font-[600] px-3 py-1">
          Join Us Today
        </button>
      ),
    },
    {
      img: Slider3,
      Heading: "NOT JUST FUN AND GAMES",
      Text: "WE ALSO MEET REGULARLY TO SUPPORT ONE ANOTHER AS WELL AS THE UNIVERSITY OH, AND THERE'S FOOD.",
      Button: (
        <button className="border-slate-50 border-[3px] rounder-md text-white font-[600] px-3 py-1">
          Find Meeting
        </button>
      ),
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % Sliders.length); // Cycle through slides
  };

  return (
    <div className="h-full w-full">
      <Render
        {...Sliders[currentSlide]}
        nextSlide={nextSlide} // Pass the nextSlide function
      />
    </div>
  );
}
