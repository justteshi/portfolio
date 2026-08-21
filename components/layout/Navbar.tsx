"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Container from "@/components/ui/Container";

const navigation = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#projects" },
  { label: "Playground", href: "/#playground" },
  { label: "Stack", href: "/#stack" },
  { label: "Currently", href: "/#currently" },
  { label: "GitHub", href: "/#github" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const threshold = window.innerHeight * 0.38;
      let current = "home";
      navigation.forEach((item) => {
        const id = item.href.split("#")[1];
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= threshold) current = id;
      });
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 py-3 text-ink transition-[background-color,box-shadow] duration-500 ${open ? "bg-canvas" : scrolled ? "bg-canvas/70 shadow-[0_1px_0_rgba(19,37,28,0.08)] backdrop-blur-xl" : "bg-canvas"}`}>
      <Container className="flex h-12 items-center justify-between">
        <Link
          href="/"
          className="group relative block h-11 w-14 overflow-hidden border border-ink/15 bg-canvas transition-transform duration-300 hover:-translate-y-0.5"
          aria-label="Teodor Hristov, home"
        >
          <span className="absolute right-0 bottom-0 z-10 size-2 bg-signal transition-[width] duration-300 group-hover:w-full" aria-hidden />
          <Image
            src="/personal_logo.png"
            alt=""
            width={1536}
            height={1024}
            priority
            sizes="66px"
            className="absolute left-1/2 top-1/2 h-11 w-[66px] max-w-none -translate-x-1/2 -translate-y-1/2"
          />
        </Link>
        <nav className="hidden overflow-hidden bg-ink text-canvas [clip-path:polygon(0.65rem_0,100%_0,100%_calc(100%_-_0.65rem),calc(100%_-_0.65rem)_100%,0_100%,0_0.65rem)] lg:block" aria-label="Primary navigation">
          <ul className="flex items-stretch">
            {navigation.map((item, index) => {
              const id = item.href.split("#")[1];
              const active = activeSection === id;
              return (
                <li key={item.label} className="border-r border-white/10 last:border-r-0">
                  <Link
                    className={`group relative flex min-w-[4.7rem] flex-col px-3 py-2 transition-colors duration-300 xl:min-w-[5.35rem] xl:px-4 ${active ? "bg-white/8 text-signal" : "text-canvas/60 hover:bg-white/6 hover:text-canvas"}`}
                    href={item.href}
                    aria-current={active ? "location" : undefined}
                  >
                    <span className="font-mono text-[0.5rem] tracking-[0.14em] opacity-55">{String(index + 1).padStart(2, "0")}</span>
                    <span className="mt-0.5 font-mono text-[0.62rem] font-semibold tracking-[0.08em] uppercase">{item.label}</span>
                    <span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-signal transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <button type="button" onClick={() => setOpen((value) => !value)} className={`grid h-11 w-12 place-items-center border transition-colors lg:hidden ${open ? "border-ink bg-ink text-canvas" : "border-ink/20 bg-panel"}`} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>{open ? <AiOutlineClose size={21} /> : <AiOutlineMenu size={21} />}</button>
      </Container>
      {open ? (
        <nav className="mt-3 min-h-[calc(100svh-4.5rem)] border-t border-ink/15 bg-canvas lg:hidden" aria-label="Mobile navigation">
          <Container>
            <ul className="divide-y divide-ink/15">{navigation.map((item, index) => <li key={item.label}><Link className="group flex items-center justify-between py-5 text-[clamp(1.65rem,8vw,2.5rem)] font-semibold tracking-[-0.05em]" href={item.href} onClick={() => setOpen(false)}><span className="transition-transform duration-300 group-hover:translate-x-2">{item.label}</span><span className="grid h-8 w-10 place-items-center bg-panel font-mono text-[0.6rem] tracking-widest text-muted transition-colors group-hover:bg-signal group-hover:text-ink">{String(index + 1).padStart(2, "0")}</span></Link></li>)}</ul>
            <div className="flex items-center justify-between border-t border-ink py-5 font-mono text-[0.6rem] tracking-[0.14em] text-muted uppercase"><span>TH / Portfolio</span><span>{new Date().getFullYear()}</span></div>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
