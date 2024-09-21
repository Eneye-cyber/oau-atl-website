import Image, { StaticImageData } from "next/image";
import React, { ReactNode, useEffect, useState } from "react";

export interface ContentRenderProps {
  img: StaticImageData;
  Heading: string;
  Text: string;
  Button: ReactNode;
  nextSlide?: () => void; // New prop to trigger the slide change
}

export default function Render({
  img,
  Heading,
  Text,
  Button,
  nextSlide,
}: ContentRenderProps) {
  const [zoom, setZoom] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  // Increment zoom level every 100ms when not hovering
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setZoom((prevZoom) => {
          if (prevZoom >= 1.6 && nextSlide) {
            nextSlide();
            clearInterval(interval!);
            return 1; // Reset zoom
          }
          return prevZoom + 0.01; // Increment zoom
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isHovering, nextSlide]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="relative w-full h-[60%] overflow-hidden">
      <div
        className="w-full h-full transition-transform duration-500"
        style={{ transform: `scale(${zoom})` }}
      >
        <Image
          src={img.src}
          alt="image"
          className="p-1 w-full h-full object-cover"
          layout="fill"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-end text-white text-center p-4">
        <div className="mb-40">
          <h1 className="text-3xl font-bold mb-2 mt-20">{Heading}</h1>
          <p className="text-lg mb-4">{Text}</p>
          {Button}
        </div>
      </div>
    </div>
  );
}
