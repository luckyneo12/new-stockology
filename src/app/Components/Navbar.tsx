"use client"; // Mark this as a Client Component in Next.js 13+

import Link from "next/link";
import React, { useState } from "react";
import { navData } from "../navData";
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
    <div className="container mx-auto">
      <section className="header fixed top-0 z-[1000] container w-full shadow-md bg-white border-b border-gray-200 text-gray-900 h-[80px] py-2 flex justify-between items-center px-6">
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
            className="md:w-24 md:h-20 h-14 w-14 object-contain"
          />
        </div>

       

        {/* Navigation Links */}
        <nav
          className={`${
            showMobileMenu
              ? "flex flex-col absolute bg-white w-full top-[80px] left-0 z-[1000] md:flex md:static md:flex-row shadow-lg md:shadow-none"
              : "hidden md:flex md:items-center md:gap-1"
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
                className="px-4 py-2 text-sm font-medium hover:text-green-600 transition duration-300 w-full md:w-auto text-left flex justify-between items-center"
              >
                {item.label}
                {item.type === "dropdown" && <span className="ml-1 text-xs">▼</span>}
              </button>

              {/* Dropdown Menu */}
              {item.type === "dropdown" && showDropdown === item.id && (
                <ul
                  className={`absolute top-12 left-0 bg-white shadow-xl rounded-xl z-[1000] text-black text-left w-[180px] border border-gray-100 transition-opacity duration-300 ease-in-out ${
                    showDropdown === item.id
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  {item.subItems?.map((subItem) => (
                    <li
                      key={subItem.id}
                      className="hover:bg-green-50 px-4 py-3 transition-colors duration-300 first:rounded-t-xl last:rounded-b-xl"
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
        <div className="hidden md:block">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold transition shadow-md">
            Join Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
