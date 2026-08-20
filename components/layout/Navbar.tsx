"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShadow(window.scrollY >= 90);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed z-[100] h-20 w-full bg-white ${shadow ? "shadow-xl" : ""}`}>
      <nav className="flex h-full w-full items-center justify-between px-2 2xl:px-16" aria-label="Primary navigation">
        <Link href="/" aria-label="Home"><Image src="/assets/logo.PNG" alt="Teo logo" width={60} height={60} priority /></Link>
        <ul className="hidden md:flex">
          {navigation.map(({ label, href }) => <li key={label}><Link className="ml-10 text-sm uppercase hover:border-b" href={href}>{label}</Link></li>)}
        </ul>
        <button type="button" onClick={() => setOpen(true)} className="bg-none p-1 text-gray-800 shadow-none md:hidden" aria-label="Open navigation" aria-expanded={open}><AiOutlineMenu size={25} /></button>
      </nav>

      <div className={open ? "fixed top-0 left-0 h-screen w-full bg-black/70 md:hidden" : ""} aria-hidden={!open}>
        <div className={`fixed top-0 h-screen bg-[#ecf0f3] p-10 duration-500 ease-in ${open ? "left-0 w-[75%] sm:w-[60%] md:w-[45%]" : "-left-full"}`}>
          <div className="flex w-full items-center justify-between">
            <Image src="/assets/logo.PNG" alt="Teo logo" width={60} height={60} />
            <button type="button" onClick={() => setOpen(false)} className="cursor-pointer rounded-full bg-none p-3 text-gray-800 shadow-lg shadow-gray-400" aria-label="Close navigation"><AiOutlineClose size={25} /></button>
          </div>
          <div className="my-4 border-b border-gray-300"><p className="w-[85%] py-4 md:w-[90%]">Lets build something cool.</p></div>
          <div className="flex-col py-4">
            <ul className="uppercase">
              {navigation.map(({ label, href }) => <li key={label}><Link className="block py-4 text-sm" href={href} onClick={() => setOpen(false)}>{label}</Link></li>)}
            </ul>
            <div className="pt-16">
              <p className="tracking-widest text-[#5651e5] uppercase">Lets Connect</p>
              <div className="my-4 flex w-full items-center justify-between sm:w-[80%]">
                {[FaLinkedinIn, FaGithub, AiOutlineMail, BsPersonLinesFill].map((Icon, index) => <div key={index} className="cursor-pointer rounded-full p-3 shadow-lg shadow-gray-400 duration-300 ease-in hover:scale-105"><Icon /></div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
