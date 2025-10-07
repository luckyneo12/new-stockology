"use client"
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="container mx-auto px-3 ">
        <div className="relative flex w-full py-10 flex-col items-center justify-center overflow-hidden rounded-lg bg-background ">
      <p className="z-10 whitespace-pre-wrap text-center md:text-5xl text-3xl  font-semibold tracking-tighter text-primary dark:text-white">
        <h1>All Your Finances, Simplified in One Spot</h1>
      <div className="max-w-7xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
      </p>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,transparent)]",
        )}
      />
    </div>
  
    </div>
  );
}
export const projects = [
  
  {
    title: "Mutual Funds",
    description:
      "A streaming service where multiple investors invested together which is managed by a professional fund manager and return get shared based on the invested proportion.",
    link: "",
  },
  {
    title: "Bonds",
    description:
      "A stable-income investment where Investor lends money to the issuers for a specific period at a fixed interest rate as they are the safe investments for long-term planning.",
    link: "",
  },
  {
    title: "Initial Public Offerings(IPO)",
    description:
      "A process in which any private company offers shares to investors to raise it's own capital and get listed on a stock exchange.",
    link: "",
  },
  {
    title: "Algorithm Trading Framework(ATF)",
    description:
      "ATF automates a stuctured system which provide predefined alogorithms that determine whento buy or sell stocks by analyzing real-time market data. ",
    link: "",
  },
  {
    title: "Future & Option(F&O)",
    description:
      "A instruments which help traders and investors in gaining leverage in the market , speculate on price movements , and hedge risks.",
    link: "",
  },
 
  {
    title: "NRI & NRO Accounts",
    description:
      "When Non-Resident Indians(NRI) wants to invest in Indian stocks or manage trades in India , they use particular bank accounts like NR0(Non-Resident Ordinary).",
    link: "",
  },
  
  
];
