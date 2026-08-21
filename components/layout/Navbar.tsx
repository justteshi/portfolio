"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
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
    <header className="fixed inset-x-0 top-0 z-50 py-3 text-ink">
      <Container className="relative z-20 flex h-12 items-center justify-between">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={`group relative block h-11 w-14 overflow-hidden border transition-[transform,background-color,border-color] duration-500 hover:-translate-y-0.5 ${open ? "border-white/20 bg-white/5" : "border-ink/15 bg-canvas/90 backdrop-blur-md"}`}
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
            className={`absolute left-1/2 top-1/2 h-11 w-[66px] max-w-none -translate-x-1/2 -translate-y-1/2 transition-[filter] duration-500 ${open ? "grayscale invert brightness-125" : ""}`}
          />
        </Link>

        <div className={`pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[0.58rem] tracking-[0.16em] uppercase transition-colors duration-500 sm:flex ${open ? "text-white/40" : "text-muted"}`} aria-hidden>
          <span className={`size-1.5 ${open ? "bg-signal" : scrolled ? "bg-accent" : "bg-signal"}`} />
          <span>{open ? "Choose a destination" : activeSection === "home" ? "Portfolio / 2026" : `Viewing / ${activeSection}`}</span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`group flex h-11 items-center gap-4 border px-4 font-mono text-[0.62rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-500 ${open ? "border-white/20 bg-signal text-ink" : "border-ink/15 bg-ink text-canvas hover:bg-accent"}`}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          <span>{open ? "Close" : "Index"}</span>
          <span className="relative block h-3 w-5" aria-hidden>
            <span className={`absolute left-0 top-0.5 h-px bg-current transition-all duration-500 ${open ? "top-1.5 w-5 rotate-45" : "w-5 group-hover:w-3"}`} />
            <span className={`absolute right-0 bottom-0.5 h-px bg-current transition-all duration-500 ${open ? "bottom-[0.3rem] w-5 -rotate-45" : "w-3 group-hover:w-5"}`} />
          </span>
        </button>
      </Container>

      <nav className={`fixed inset-0 z-10 overflow-y-auto bg-ink pt-24 text-canvas transition-[opacity,visibility] duration-500 ${open ? "visible opacity-100" : "invisible opacity-0"}`} aria-label="Primary navigation" aria-hidden={!open}>
        <span className="pointer-events-none absolute -right-[0.04em] -bottom-[0.24em] font-mono text-[clamp(18rem,45vw,44rem)] leading-none font-bold tracking-[-0.14em] text-white/[0.025] select-none" aria-hidden>TH</span>
        <Container className="relative grid min-h-[calc(100svh-6rem)] md:grid-cols-[0.3fr_0.7fr] md:gap-12">
          <div className="hidden flex-col justify-between border-r border-white/15 py-8 pr-10 md:flex">
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.18em] text-white/35 uppercase">Navigation index</p>
              <p className="mt-5 max-w-48 text-xl leading-tight text-white/65">Move through the work, process, tools, and story.</p>
            </div>
            <div>
              <p className="text-[clamp(5rem,9vw,9rem)] leading-[0.75] font-semibold tracking-[-0.08em] text-signal">{activeSection === "home" ? "00" : String(navigation.findIndex((item) => item.href.endsWith(activeSection)) + 1).padStart(2, "0")}</p>
              <p className="mt-5 font-mono text-[0.58rem] tracking-[0.16em] text-white/35 uppercase">Current position</p>
            </div>
          </div>

          <div className="flex flex-col justify-between py-3 md:py-8">
            <ul className="border-t border-white/20">
              {navigation.map((item, index) => {
                const id = item.href.split("#")[1];
                const active = activeSection === id;
                return (
                  <li key={item.label} className="border-b border-white/20">
                    <Link
                      className={`group flex items-center justify-between py-[clamp(0.65rem,1.4vh,1.15rem)] transition-colors duration-300 ${active ? "text-signal" : "text-canvas hover:text-signal"}`}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "location" : undefined}
                      tabIndex={open ? 0 : -1}
                    >
                      <span className="flex items-start gap-4 sm:gap-7">
                        <span className="mt-1 font-mono text-[0.55rem] tracking-widest text-white/35">{String(index + 1).padStart(2, "0")}</span>
                        <span className="text-[clamp(1.75rem,5.4vw,5.5rem)] leading-[0.85] font-semibold tracking-[-0.065em] uppercase transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-3">{item.label}</span>
                      </span>
                      <span className={`font-mono text-lg transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${active ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}`} aria-hidden>↗</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between py-5 font-mono text-[0.55rem] tracking-[0.16em] text-white/35 uppercase">
              <span>Teodor Hristov / Developer</span><span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}
