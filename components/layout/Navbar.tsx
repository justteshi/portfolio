"use client";

import Image from "next/image";
import Link from "next/link";
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

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 py-3 transition-colors duration-500 lg:pointer-events-none ${scrolled || open ? "bg-canvas/80 backdrop-blur-xl" : "bg-canvas"}`}>
        <Container className="flex h-12 items-center justify-between">
          <Link href="/" className="group pointer-events-auto relative block h-11 w-14 overflow-hidden" aria-label="Teodor Hristov, home">
            <Image src="/personal_logo.png" alt="" width={1536} height={1024} priority sizes="66px" className="absolute left-1/2 top-1/2 h-11 w-[66px] max-w-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-110" />
            <span className="absolute inset-x-1 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
          </Link>

          <p className="pointer-events-none hidden font-mono text-[0.56rem] tracking-[0.16em] text-muted uppercase sm:block lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <span className="mr-2 inline-block size-1.5 bg-signal" />Independent web developer
          </p>

          <button type="button" onClick={() => setOpen((value) => !value)} className={`flex h-10 items-center gap-3 border px-3 font-mono text-[0.6rem] font-semibold tracking-[0.14em] uppercase transition-colors lg:hidden ${open ? "border-ink bg-ink text-canvas" : "border-ink/20 bg-panel text-ink"}`} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>
            <span>{open ? "Close" : "Navigate"}</span>
            <span className={`text-base leading-none transition-transform duration-500 ${open ? "rotate-45" : ""}`} aria-hidden>+</span>
          </button>
        </Container>

        <nav className={`pointer-events-auto absolute right-[var(--gutter)] top-[4.75rem] w-[min(24rem,calc(100vw_-_2_*_var(--gutter)))] border border-ink/15 bg-canvas shadow-[0_1.5rem_4rem_rgba(19,37,28,0.18)] transition-[opacity,transform,visibility] duration-500 ease-[var(--ease-out)] lg:hidden ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"}`} aria-label="Primary navigation" aria-hidden={!open}>
          <div className="grid grid-cols-2">
            {navigation.map((item, index) => {
              const id = item.href.split("#")[1];
              const active = activeSection === id;
              return (
                <Link key={item.label} href={item.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className={`group relative min-h-20 border-r border-b border-ink/15 p-4 text-ink even:border-r-0 ${index === navigation.length - 1 ? "col-span-2 border-r-0" : ""} ${active ? "bg-signal" : "hover:bg-panel"}`} aria-current={active ? "location" : undefined}>
                  <span className="font-mono text-[0.55rem] tracking-widest text-muted">{String(index + 1).padStart(2, "0")}</span>
                  <span className="absolute right-4 bottom-3 text-xl font-semibold tracking-[-0.04em] transition-transform duration-300 group-hover:-translate-x-1">{item.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-between px-4 py-3 font-mono text-[0.52rem] tracking-[0.14em] text-muted uppercase"><span>Navigation map</span><span>TH / {new Date().getFullYear()}</span></div>
        </nav>
      </header>

      <nav className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block" aria-label="Primary navigation">
        <p className="mb-3 text-center font-mono text-[0.48rem] tracking-[0.18em] text-muted uppercase [writing-mode:vertical-rl]">Site index</p>
        <ul className="border border-white/10 bg-ink shadow-[0_1rem_3rem_rgba(19,37,28,0.16)]">
          {navigation.map((item, index) => {
            const id = item.href.split("#")[1];
            const active = activeSection === id;
            return (
              <li key={item.label} className="group relative border-b border-white/10 last:border-b-0">
                <Link href={item.href} className={`relative grid h-11 w-11 place-items-center font-mono text-[0.55rem] tracking-widest transition-colors duration-300 ${active ? "bg-signal text-ink" : "text-white/45 hover:bg-white/10 hover:text-canvas"}`} aria-label={item.label} aria-current={active ? "location" : undefined}>
                  {String(index + 1).padStart(2, "0")}
                  <span className={`pointer-events-none absolute right-full top-0 flex h-11 items-center bg-signal px-4 text-[0.6rem] font-semibold tracking-[0.14em] text-ink uppercase transition-[opacity,transform] duration-300 ${active ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
