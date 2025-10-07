import React from 'react'
import { FloatingDock } from '@/components/ui/floating-dock'
import { FaPiggyBank, FaShieldAlt, FaChartLine, FaGraduationCap, FaBalanceScale, FaMobileAlt } from "react-icons/fa";


const links=[
    {
      title: "IPO Investments",
      icon: (
        <FaChartLine className="h-full w-full text-green-500  hover:text-green-600   dark:text-neutral-300" />
      ),
      href: "#",
    },
 
    {
      title: "Mobile & Online Trading PLatfrom",
      icon: (
        <FaMobileAlt className="h-full w-full text-green-500  hover:text-green-600 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
    title: "Equity Brokery",
      icon: (
        <FaBalanceScale className="h-full w-full text-green-500  hover:text-green-600 dark:text-neutral-300" />
      ),
      href: "#",
    },
 
    {
      title: "Mutual Funds",
      icon: (
        <FaPiggyBank className="h-full w-full text-green-500  hover:text-green-600 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Financial Education",
      icon: (
        <FaGraduationCap className="h-full w-full text-green-500  hover:text-green-600 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Insurance",
      icon: (
        <FaShieldAlt className="h-full w-full  hover:text-green-700 text-green-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
]


const Service1 = () => {
  return (
    <div className="container mx-auto">
      <FloatingDock items={links} />
    </div>
  )
}

export default Service1
