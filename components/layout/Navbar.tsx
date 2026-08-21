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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 text-ink transition-colors ${scrolled || open ? "border-b border-line bg-canvas/95 backdrop-blur-md" : "bg-canvas"}`}>
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="relative block h-9 w-12 overflow-hidden transition-transform duration-300 hover:scale-[1.04]"
          aria-label="Teodor Hristov, home"
        >
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
        <nav className="hidden lg:block" aria-label="Primary navigation">
          <ul className="flex items-center gap-8">{navigation.map((item) => <li key={item.label}><Link className="font-mono text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-ink" href={item.href}>{item.label}</Link></li>)}</ul>
        </nav>
        <button type="button" onClick={() => setOpen((value) => !value)} className="grid size-11 place-items-center rounded-full border border-line lg:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>{open ? <AiOutlineClose size={21} /> : <AiOutlineMenu size={21} />}</button>
      </Container>
      {open ? (
        <nav className="min-h-[calc(100svh-4rem)] border-t border-line bg-canvas lg:hidden" aria-label="Mobile navigation">
          <Container><ul className="divide-y divide-line">{navigation.map((item, index) => <li key={item.label}><Link className="flex items-center justify-between py-7 text-3xl font-semibold tracking-[-0.04em]" href={item.href} onClick={() => setOpen(false)}>{item.label}<span className="font-mono text-xs text-muted">0{index + 1}</span></Link></li>)}</ul></Container>
        </nav>
      ) : null}
    </header>
  );
}
