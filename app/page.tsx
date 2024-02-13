"use client";
import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import gifGame from "@/util/gifGame";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

const currentYear = new Date().getFullYear();

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-zinc-900 via-zinc-600/20 to-zinc-900">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg md:text-2xl duration-500 text-zinc-300 hover:text-peachFuzz drop-shadow-sm"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      <div className="hidden w-screen h-1 animate-glow md:block animate-fade-left bg-gradient-to-r from-peachFuzz/0 via-peachFuzz/70 to-peachFuzz/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={150}
      />
      <div className="flex justify-center mt-4 mb-8 animate-title">
        <button
          id="game-button"
          className="rounded-xl  p-2 text-base mx-auto shadow-lg bg-peachFuzz animate-pulse"
          onClick={gifGame}
        >
          Show GIF
        </button>
      </div>
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-zinc-300 text-edge-outline animate-title font-display sm:text-6xl md:text-8xl whitespace-nowrap bg-clip-text drop-shadow-md">
        Dev Portfolio
      </h1>

      <div className="hidden w-screen h-1 animate-glow md:block animate-fade-right bg-gradient-to-r from-peachFuzz/0 via-peachFuzz/70 to-peachFuzz/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className=" typewriter italic text-md lg:text-xl text-zinc-300 drop-shadow-sm">
          Your best investment is in yourself!
        </h2>
        <h3 className="text-md lg:text-xl text-zinc-300 drop-shadow-sm mb-4 mt-4">
          Nathan Wright - Junior Software Developer, Crafting Code with Passion
          and Precision.
        </h3>
        <h3 className="text-sm lg:text-md text-peachFuzz drop-shadow-sm">
          © {currentYear} Adapted from the Chronack Next Template.
        </h3>
      </div>
    </div>
  );
}
