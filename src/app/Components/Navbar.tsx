"use client"; // Mark this as a Client Component in Next.js 13+

import Link from "next/link";
import React, { useState } from "react";
import { navData } from "../navData";
import { ShimmerButtonDemo } from "./Dematebutton";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState< string |number | null>(null); // Track which dropdown is open
  const [showMobileMenu, setShowMobileMenu] = useState(false); // State for mobile menu
  const router = useRouter();

  // Function to toggle dropdown on click (works for mobile)
  const handleClick = (href: string) => {
    router.push(href);
  };
  const toggleDropdown = (id: number) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  return (
    <div className="container mx-auto  ">
      <section className="header fixed top-0 z-[1000]  container w-full  shadow-lg bg-gradient-to-r from-red-50 to-green-50   text-gray-900  h-[100px] py-2 flex justify-evenly items-center px-4">
{/* Hamburger Icon for Mobile */}
<div className="md:hidden flex items-center">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)} // Toggle mobile menu visibility
            className=" p-2 hover:bg-white rounded-full  hover:text-black font-bold"
          >
            {showMobileMenu ? (
              // Cross (X) Icon when menu is open
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon when menu is closed
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="/stklogo.png"
            alt="Logo"
            className="md:w-28 md:h-24 h-16 w-16 py-2 object-fill"
          />
          {/* <h1 className=" text-lg font-bold">Stockology</h1> */}
        </div>

       

        {/* Navigation Links */}
        <nav
          className={`${
            showMobileMenu
              ? "flex flex-col absolute bg-gray-100 w-full top-[100px]  left-0 z-[1000] md:flex md:static md:flex-row"
              : "hidden md:flex"
          }`}
        >
          {navData.map((item) => (
            <div
              key={item.id}
              className="relative group md:inline-block"
              onMouseEnter={() =>
                window.innerWidth > 768 &&
                item.type === "dropdown" &&
                setShowDropdown(item.id)
              }
              onMouseLeave={() =>
                window.innerWidth > 768 &&
                item.type === "dropdown" &&
                setShowDropdown(null)
              }
            >
              <button
                onClick={() =>
                  item.type === "dropdown"
                    ? toggleDropdown(Number(item.id))
                    : (setShowMobileMenu(false), handleClick(item.href))
                }
                className=" px-4 py-2 md:text-lg hover:bg-white rounded-full hover:text-black  font-medium transition duration-300 w-full text-left flex justify-between items-center"
              >
                {item.label}
                {item.type === "dropdown" && <span className="ml-2">▼</span>}
              </button>

              {/* Dropdown Menu */}
              {item.type === "dropdown" && showDropdown === item.id && (
                <ul
                  className={`absolute top-10 left-0 bg-white shadow-md rounded-lg z-[1000] text-black text-left  w-[150px] transition-opacity duration-300 ease-in-out ${
                    showDropdown === item.id
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  {item.subItems?.map((subItem) => (
                    <li
                      key={subItem.id}
                      className="hover:bg-gray-200 px-4 py-2 transition-colors duration-300"
                    >
                      <Link
                        href={subItem.href}
                        onClick={() => {
                          setShowDropdown(null);
                          setShowMobileMenu(false);
                        }}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
        <div>
          <ShimmerButtonDemo text="Open Demat Account" />
        </div>
      </section>
    </div>
  );
};

export default Navbar;
