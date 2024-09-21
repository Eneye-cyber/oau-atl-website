"use client";
import React from "react";
import Planet from "@/app/component/globe";
import FooterAlumniPage from "../component/footer";
import Slider1 from "@/public/1.jpg";
import Slider2 from "@/public/2.jpg";
import Slider3 from "@/public/3.jpg";
import { motion } from "framer-motion";
import Background from "three/src/renderers/common/Background.js";
import {BackgroundBeam} from "../ui/background";
import UseCatlogue from "../ui/catlogue";

// Sample background image (replace with your own valid image)
const validBackgroundImage = 'https://via.placeholder.com/1920x1080'; // Replace this with your actual image

// Executive images
const executiveImages = [
  'https://randomuser.me/api/portraits/women/50.jpg', // Random image for Yemi
  'https://randomuser.me/api/portraits/men/51.jpg',   // Random image for Tunde
  'https://randomuser.me/api/portraits/women/52.jpg', // Random image for Ngozi
  'https://randomuser.me/api/portraits/women/53.jpg', // Random image for Feyi
  'https://randomuser.me/api/portraits/women/54.jpg', // Random image for Tolu
  'https://randomuser.me/api/portraits/men/55.jpg',   // Random image for Mide
  'https://randomuser.me/api/portraits/men/56.jpg',   // Random image for Deji
];

// Executive data
const executives = [
  {
    name: 'Yemi Nsah',
    position: 'Alumni President',
    bio: 'Yemi Nsah studied Electronic/Electrical Engineering at Great Ife and graduated in 1986. She further got her Masters in Information Systems and completed an MBA. She currently works as an IT Consultant. Her passion is mentoring young adults to help them have clear purpose and direction for their lives and fulfill their destiny. Her hobbies include watching movies and reading.',
    picture: executiveImages[0],
  },
  {
    name: 'Tunde Sorungbe',
    position: 'Vice President',
    bio: 'Tunde Sorungbe studied accounting at Great Ife and graduated in 1991. He is currently working as an IT Project Manager. Loves travelling and soccer.',
    picture: executiveImages[1],
  },
  {
    name: 'Ngozi Onyekaba',
    position: 'Alumni Secretary',
    bio: 'Ngozi Onyekaba studied Electronic/Electrical Engineering from Great Ife and graduated in 1986. She went on to obtain a masters degree in Information Engineering. She is currently working as a Business Intelligence leader in one of the automobile companies. Her passion includes discovering new technologies and empowering the younger generation. Ngozi enjoys gardening.',
    picture: executiveImages[2],
  },
  {
    name: 'Feyi Davies Ward',
    position: 'Assistant Secretary',
    bio: 'Feyi Davies Ward graduated from University of Ife in 1986 with a Bachelor of Agricultural Science degree. She received a Master of Science degree in Crop Science from University of Guelph, Ontario, Canada and a Medical Doctorate from McMaster University, Hamilton, Ontario, Canada. She works for WellStar Atlanta Medical Center as a Physician and has two children.',
    picture: executiveImages[3],
  },
  {
    name: 'Tolu Farinu',
    position: 'Alumni Treasurer',
    bio: 'Graduated in 1985 with a bachelors in English from Ife and a Post graduate degree in International Law and Diplomacy from Unilag. She is currently a financial director at the first public four-year college founded in Georgia in more than 100 years. Married with two lovely children and enjoys traveling.',
    picture: executiveImages[4],
  },
  {
    name: 'Mide Sowunmi',
    position: 'IT Administrator',
    bio: 'Mide Sowunmi, is a graduate of Electrical and Electronic Engineering, class of 1990 UX/UI Specialist, and has worked in a wide range of industries from finance, energy, telecom to advertising and manufacturing. Hobbies include reading, tennis and blogging. With a passion for creative arts and music.',
    picture: executiveImages[5],
  },
  {
    name: 'Deji Owoyemi',
    position: 'Public Relations Officer',
    bio: 'Deji Owoyomi studied Medical Rehabilitation (physiotherapy) at Great Ife and graduated in 2004. He went on to obtain a doctoral degree in physical therapy at Utica’s college, New York. He currently practices in Atlanta as the Clinical Director of Rehabilitation, managing speech language pathologists, occupational and physical therapists. He enjoys watching movies and spending time with family.',
    picture: executiveImages[6],
  },
];

const LandingPage = () => {
  return (
    <div className="font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white h-screen">
        <img
          src={Slider1.src}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative  w-full h-full  bg-gradient-to-br from-blue-100 via-transparent to-transparent flex justify-center items-center text-center md:text-left">
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Our Alumni Association</h1>
            <p className="text-xl text-center mb-6">Connecting past and present for a brighter future.</p>
            <button className="max-w-full mx-auto rounded-md bg-gold-500 w-[300px] border-[#c7b136] border   text-white font-medium py-3 px-2  transition duration-300">
              Join Us Today
            </button>
          </div>
         
        </div>
      </section>

      {/* Executive Team Section */}
     <div className="flex bg-white h-full">
       <BackgroundBeam>
        <div className="w-full ">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Executive Team</h2>
          <UseCatlogue/>
          
          </div>
        </BackgroundBeam>
        </div>
        
      <FooterAlumniPage />
    </div>
  );
};

export default LandingPage;
