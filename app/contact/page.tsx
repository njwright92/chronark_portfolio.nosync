"use client";
import { useState } from "react";
import {
  Github,
  Mail,
  Twitter,
  Instagram,
  Linkedin,
  Facebook,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import SiteRequestModal from "../components/SiteRequest";
import Particles from "../components/particles";

const socials = [
  {
    icon: <Twitter size={20} />,
    href: "https://twitter.com/naterbug321",
    label: "Twitter",
    handle: "@naterbug123",
  },
  {
    icon: <Mail size={20} />,
    href: "mailto:njwright92@gmail.com",
    label: "Email",
    handle: "njwright92@gmail.com",
  },
  {
    icon: <Github size={20} />,
    href: "hhttps://github.com/njwright92",
    handle: "Github/njwright92",
    label: "Github",
  },
  {
    icon: <Instagram size={20} />,
    href: "https://www.instagram.com/nate_wright3/",
    label: "Instagram",
    handle: "nate_wright3",
  },
  {
    icon: <Facebook size={20} />,
    href: "https://facebook.com/njwright92",
    label: "Facebook",
    handle: "Nate_Wright",
  },
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/nathan-wright-78b237123/",
    handle: "LinkedIn",
    label: "LinkedIn",
  },
];

const Example = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-zinc-900">
      <Navigation />
      <div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto pt-20">
        <Particles
          className="absolute inset-0 z-0 animate-fade-in"
          quantity={75}
        />
        <div className="grid w-full grid-cols-1 gap-8 mt-32 sm:mt-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 auto-rows-fr lg:gap-16">
          {socials.map((s) => (
            <Card key={s.handle}>
              <Link
                href={s.href}
                target="_blank"
                className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-48 md:p-16"
              >
                {/* Icon and Labels */}
                <span className="relative flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-300 group-hover:text-peach-fuzz group-hover:bg-zinc-800 border-zinc-300 bg-zinc-900">
                  {s.icon}
                </span>
                <div className="flex flex-col items-center">
                  <span className="lg:text-xl font-sm duration-150 xl:text-2xl text-zinc-300 group-hover:text-peach-fuzz font-display">
                    {s.handle}
                  </span>
                  <span className="mt-4 text-sm text-center duration-1000 text-peach-fuzz group-hover:text-white">
                    {s.label}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
        <div className="text-center border border-peach-fuzz/30 rounded-xl shadow-md p-6 mt-6 mb-6 overflow-hidden relative duration-700 group hover:bg-zinc-800/10">
          <h4 className="text-zinc-300">
            Would you like me to build a website/webapp for you? Select the
            button below to get started.
          </h4>
          <button
            onClick={openModal}
            className="mt-4 bg-zinc-900 text-zinc-300 shadow-md rounded-xl px-4 py-2 border border-peach-fuzz/30"
          >
            Open Site Request Form
          </button>
        </div>
      </div>
      <SiteRequestModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Example;
