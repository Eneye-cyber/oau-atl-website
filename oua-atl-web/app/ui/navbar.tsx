"use client";
import Logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import {
  FaCediSign,
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import { TfiAlignJustify } from "react-icons/tfi";
import { FloatingMedia } from "../component/float-icon";
// import { useNavbar } from "../context/navbar/navbar"; (If you plan to use this)

export default function Navbar() {
  const [list, unlist] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<string>("Home");

  const handleClick = (item: string) => {
    setCurrentItem(item);
  };

  return (
    <>
      <div className="h-16 w-full bg-purple-600 flex justify-around md:justify-end items-center text-white md:px-20 ">
        <div className="w-full flex justify-end space-x-3 lg:space-x-5 items-center md:px-10">
          <FloatingMedia />
          <div className="space-x-2 text-xs ">
            <a>Login</a> |<a>Signup</a>
          </div>
        </div>
      </div>
      <div className="flex z-90 w-full bg-gradient-to-r from-white via-orange-50 to-blue-50 h-50 md:justify-around p-4 md:px-0 px-3 justify-between items-center">
        <Image alt="Logo" src={Logo.src} width={200} height={200} />
        {/* <TfiAlignJustify
          className="sm:hidden w-6 h-6 bg-red-900 cursor-pointer"
          onClick={() => {
            unlist(!list);
          }}
        /> */}
        {/* Desktop Navigation */}
        <ul className="space-x-3  md:flex hidden justify-center">
          {[
            "Home",
            "About us ",
            "Projects",
            "Gallery",
            "Member",
            "Contact",
          ].map((item, href: number) => (
            <li
              key={item}
              onClick={() => handleClick(item)}
              className={`${
                currentItem === item
                  ? " border-l-2 text-slate-200 border-yellow-300"
                  : ""
              } animate-item px-4 py-2`}
            >
              <Link
                href={
                  [
                    "/Home",
                    "/about",
                    "/projects",
                    "/gallery",
                    "/member",
                    "/contact",
                  ][href]
                }
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        {/* Mobile Navigation */}
        {list && (
          <ul className="space-y-2 w-full flex flex-col items-center bg-zinc-800 sm:hidden">
            {[
              "Home",
              "About us",
              "Projects",
              "Gallery",
              "Member",
              "Contact",
            ].map((item) => (
              <li
                key={item}
                onClick={() => handleClick(item)}
                className={`${
                  currentItem === item
                    ? "bg-zinc-900 border-l-2 border-yellow-300"
                    : ""
                } animate-item px-4 py-2 w-full text-center`}
              >
                <Link href="#">{item}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
