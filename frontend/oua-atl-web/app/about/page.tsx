"use client";
import Image from "next/image";
import Slider2 from "@/public/2.jpg";
import { motion } from "framer-motion";
import Planet from "@/app/component/globe"; // 3D rotating Planet component
import {PastExecutive, ExecutiveMember} from "./excutiveMember";



// Function to get random picture URL
const getRandomPicture = () => {
  // You can replace this URL logic with any API or image provider you want
  const randomId = Math.floor(Math.random() * 100); // Get a random number
  return `https://picsum.photos/seed/${randomId}/150`; // Using Picsum Photos as a placeholder
};

const executives = [
  {
    name: 'Yemi Nsah',
    position: 'Alumni President',
    bio: 'Yemi Nsah studied Electronic/Electrical Engineering at Great Ife and graduated in 1986. She further got her Masters in Information Systems and completed an MBA. She currently works as an IT Consultant. Her passion is mentoring young adults to help them have clear purpose and direction for their lives and fulfill their destiny. Her hobbies include watching movies and reading.',
    picture: getRandomPicture(),
  },
  {
    name: 'Tunde Sorungbe',
    position: 'Vice President',
    bio: 'Tunde Sorungbe studied accounting at Great Ife and graduated in 1991. He is currently working as an IT Project Manager. Loves travelling and soccer.',
    picture: getRandomPicture(),
  },
  {
    name: 'Ngozi Onyekaba',
    position: 'Alumni Secretary',
    bio: 'Ngozi Onyekaba studied Electronic/Electrical Engineering from Great Ife and graduated in 1986. She went on to obtain a masters degree in Information Engineering. She is currently working as a Business Intelligence leader in one of the automobile companies. Her passion includes discovering new technologies and empowering the younger generation. Ngozi enjoys gardening.',
    picture: getRandomPicture(),
  },
  {
    name: 'Feyi Davies Ward',
    position: 'Assistant Secretary',
    bio: 'Feyi Davies Ward graduated from University of Ife in 1986 with a Bachelor of Agricultural Science degree. She received a Master of Science degree in Crop Science from University of Guelph, Ontario, Canada and a Medical Doctorate from McMaster University, Hamilton, Ontario, Canada. She works for WellStar Atlanta Medical Center as a Physician and has two children.',
    picture: getRandomPicture(),
  },
  {
    name: 'Tolu Farinu',
    position: 'Alumni Treasurer',
    bio: 'Graduated in 1985 with a bachelors in English from Ife and a Post graduate degree in International Law and Diplomacy from Unilag. She is currently a financial director at the first public four-year college founded in Georgia in more than 100 years. Married with two lovely children and enjoys traveling.',
    picture: getRandomPicture(),
  },
  {
    name: 'Mide Sowunmi',
    position: 'IT Administrator',
    bio: 'Mide Sowunmi, is a graduate of Electrical and Electronic Engineering, class of 1990 UX/UI Specialist, and has worked in a wide range of industries from finance, energy, telecom to advertising and manufacturing. Hobbies include reading, tennis and blogging. With a passion for creative arts and music.',
    picture: getRandomPicture(),
  },
  {
    name: 'Deji Owoyemi',
    position: 'Public Relations Officer',
    bio: 'Deji Owoyomi studied Medical Rehabilitation (physiotherapy) at Great Ife and graduated in 2004. He went on to obtain a doctoral degree in physical therapy at Utica’s college, New York. He currently practices in Atlanta as the Clinical Director of Rehabilitation, managing speech language pathologists, occupational and physical therapists. He enjoys watching movies and spending time with family.',
    picture: getRandomPicture(),
  },
];

const CurrentExecutiveCard = () => {
  return (
    <div className="w-full mx-auto px-10 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Current Executives</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {executives.map((executive, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={executive.picture}
              alt={executive.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">{executive.name}</h2>
              <h3 className="text-sm font-medium text-indigo-600 mb-2">
                {executive.position}
              </h3>
              <p className="text-gray-700 text-base">{executive.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};





export default function AboutPage() {
  // Define animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <motion.section
        className="relative h-[100vh]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0">
          <Image
            src={Slider2.src}
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr h-[100vh] from-purple-100 to-transparent"></div>
        <div className="relative flex items-center justify-center h-full">
          
      {/* Who We Are Section */}
      <motion.section
        className="py-16  px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="h-full mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left: Text and Join Button */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-primary mb-6">Who We Are</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Great Ife Alumni – Atlanta Metro Branch is an alumni association
              of Obafemi Awolowo University, Ile Ife, Nigeria. We aim to connect
              and support alumni living in the Atlanta Metro area.
            </p>
            <p className="text-sm text-gray-600 italic mb-8">
              Together, we create a vibrant network to contribute to the growth
              of our alma mater and support fellow alumni.
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300">
              Join Us
            </button>
          </div>
          {/* Right: Rotating Planet */}
          <div className="relative w-full h-[70vh] flex justify-center md:justify-end mt-10 md:mt-0">
                <div className="w-[70vh] md:ml-[10px]">
                  <Planet />
                </div>
          </div>
        </div>
      </motion.section>
        </div>
      </motion.section>



      {/* Current Executive Members Section */}
      <motion.section
        className="py-16 bg-gray-50 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Current Executive Members
          </h2>
          <div className="w-full">
            {/* Replace with actual ExecutiveMember components */}
           <CurrentExecutiveCard/>
          </div>
        </div>
      </motion.section>

      {/* Past Executive Members Section */}
      <motion.section
        className="py-16 bg-white px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl  mx-auto max-w-7xl w-full text-center font-bold text-primary mb-6">
            Past Executive Members
          </h2>
         
        </div>
      </motion.section>
      <PastExecutive  />
    </div>
  );
}

// Past Executive Members Data
const pastExecutives = [
  {
    term: "2016 - 2018",
    members: [
      { name: "Tunde Sorungbe", position: "Vice President" },
      { name: "Ngozi Onyekaba", position: "Treasurer" },
      { name: "Yemi Nsah", position: "Secretary" },
      { name: "Yetty Ayoola", position: "Asst. Secretary" },
      { name: "Mide Sowunmi", position: "Public Relations Officer" },
      { name: "Morenike Jayeoba", position: "Asst. Public Relations Officer" },
      { name: "Rolake Tomori", position: "Welfare Secretary" },
    ],
  },
  {
    term: "2014 - 2016",
    members: [
      { name: "Bernard Adesina", position: "President" },
      { name: "Dolapo Ogbechie", position: "Vice President" },
      { name: "Abbie Coker", position: "Treasurer" },
      { name: "Bola Odetokun", position: "Secretary" },
      { name: "Fisayo Boroniki", position: "Public Relations Officer" },
    ],
  },
  {
    term: "2012 - 2014",
    members: [
      { name: "Alaba Fawole", position: "President" },
      { name: "Dolapo Ogbechie", position: "Secretary" },
      { name: "Bernard Adesina", position: "Treasurer" },
    ],
  },
];
