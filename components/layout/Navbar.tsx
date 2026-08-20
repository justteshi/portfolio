"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Container from "@/components/ui/Container";

const navigation = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#projects" },
  { label: "Playground", href: "/#playground" },
  { label: "Stack", href: "/#stack" },
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
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled || open ? "border-b border-line bg-canvas/95 backdrop-blur-md" : ""}`}>
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="font-mono text-sm font-bold tracking-[-0.04em]" aria-label="Teo, home">TEO<span className="text-accent">.</span></Link>
        <nav className="hidden md:block" aria-label="Primary navigation">
          <ul className="flex items-center gap-8">{navigation.map((item) => <li key={item.label}><Link className="font-mono text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-ink" href={item.href}>{item.label}</Link></li>)}</ul>
        </nav>
        <button type="button" onClick={() => setOpen((value) => !value)} className="grid size-11 place-items-center rounded-full border border-line md:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>{open ? <AiOutlineClose size={21} /> : <AiOutlineMenu size={21} />}</button>
      </Container>
      {open ? (
        <nav className="min-h-[calc(100svh-5rem)] border-t border-line bg-canvas md:hidden" aria-label="Mobile navigation">
          <Container><ul className="divide-y divide-line">{navigation.map((item, index) => <li key={item.label}><Link className="flex items-center justify-between py-7 text-3xl font-semibold tracking-[-0.04em]" href={item.href} onClick={() => setOpen(false)}>{item.label}<span className="font-mono text-xs text-muted">0{index + 1}</span></Link></li>)}</ul></Container>
        </nav>
      ) : null}
    </header>
  );
}
