'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'



const slides = [
  {
    id: 1, image: '/img/1.jpg',
    Heading: "NOT JUST FUN AND GAMES",
    Text: "WE ALSO MEET REGULARLY TO SUPPORT ONE ANOTHER AS WELL AS THE UNIVERSITY OH, AND THERE'S FOOD.",
    Link: {href: 'events', label: " Find Meeting"}

  },
  {
    id: 2, image: '/img/2.jpg',
    Heading: "THE ART OF GIVING SOMETHING BACK",
    Text: "FIND OUT ABOUT THE INITIATIVES AND PROJECTS WE ARE WORKING ON AS WELL AS HOW YOU CAN HELP. WE'D LOVE TO HEAR FROM YOU.",
    Link: {href: 'projects', label: "Join Us Today"}

  },
  {
    id: 3, image: '/img/3.jpg',
    Heading: "NOT JUST FUN AND GAMES",
    Text: "WE ALSO MEET REGULARLY TO SUPPORT ONE ANOTHER AS WELL AS THE UNIVERSITY OH, AND THERE'S FOOD.",
    Link: {href: 'contact', label: "Find Meeting"}
  },
]

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Automatically switch slides every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const defaultEnter = { opacity: 0 };
  const defaultCenter = { opacity: 1, scale: 1 };
  const defaultExit = { opacity: 0, scale: 0.8 };

  const variantsArray = [
    {
      enter: { ...defaultEnter, scale: 0.8 },       // Zoomed-in and transparent
      center: defaultCenter,                        // Full opacity and normal scale
      exit: { ...defaultExit },       // Slight opacity reduction
    },
    {
      enter: { ...defaultEnter, scale: 1.2, rotate: -10 },   // Slight rotation and zoom
      center: {...defaultCenter, rotate: 0},                                  // Full opacity, no rotation
      exit: { opacity: 0, scale: 1.2, rotate: 10 },        // Rotate and zoom out
    },
    {
      enter: { ...defaultEnter, x: 100, scale: 0.9 },  // Slide in from the right, smaller scale
      center: { ...defaultCenter, x: 0 },              // Centered, full opacity
      exit: { ...defaultExit, x: -100},         // Slide out to the left
    },
  ];



  return (
    <div className="hero-slider relative w-full [perspective:_1000px] bg-zinc-600" style={{ position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === currentSlide ? (
            <motion.div
              key={slide.id}
              className="slide"
              initial="enter"
              animate="center"
              exit="exit"
              variants={variantsArray[index]}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                position: 'absolute',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '2em',
                fontWeight: 'bold',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="absolute inset-0 flex-col flex-center text-white text-center p-4">
                <div className="absolute inset-0 bg-jet-black opacity-40 z-0"></div>

                <div className="text-center max-w-screen-md relative z-10 md:py-4 md:mt-8 md:px-4">
                  <h1 className="text-4xl font-bold mb-2">{slide.Heading}</h1>
                  <p className="text-base font-light mb-4">{slide.Text}</p>
                  <Link href={`/${slide.Link?.href}`} className="text-sm font-medium border-white border hover:bg-accent hover:border-accent rounded text-white px-6 py-2">
                    {slide.Link?.label}
                  </Link>
                </div>

              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSlider;
