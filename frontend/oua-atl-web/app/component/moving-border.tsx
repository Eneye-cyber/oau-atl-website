"use client";
import React from "react";

import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "../lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        " relative text-xl   w-full  p-[1px] overflow-hidden ",
        containerClassName
      )}
      style={
        {
          // borderRadius: borderRadius,
        }
      }
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={
          "h-[20vh] flex  justify-around items-center w-full  bg-gradient-to-tr from-orange-400 via-yellow-500 to-yellow-700 dark:text-white border-neutral-200 "
        }
        style={
          {
            // borderRadius: `calc(${borderRadius} * 0.96)`,
          }
        }
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export function MovingBorderDemo() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md transition-transform transform hover:-translate-y-2 duration-500">
        {/* Decorative Gradient Border */}
        <div className="absolute inset-0 rounded-lg border-4 border-transparent bg-gradient-to-r from-pink-500 to-yellow-500 -z-10"></div>

        <div className="flex flex-col text-center items-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Join Our Community
          </h1>
          <p className="text-lg text-gray-600">
            Stay updated with the latest events and resources. Become a part of
            our vibrant and growing community.
          </p>

          {/* Call to Action Button */}
          <div className="relative group">
            <button className="relative inline-block px-6 py-3 text-white font-semibold bg-indigo-600 rounded-lg overflow-hidden group-hover:bg-white transition-colors duration-500">
              <span className="relative z-10 group-hover:text-indigo-600 transition-colors duration-500">
                FIND OUT MORE
              </span>
              <span className="absolute inset-0 bg-white transition-transform transform scale-x-0 group-hover:scale-x-100 duration-500 origin-left"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
