"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import Container from "@/components/ui/Container";

const navigation = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#projects" },
  { label: "Stack", href: "/#stack" },
  { label: "Currently", href: "/#currently" },
  { label: "GitHub", href: "/#github" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const scrollAnimationRef = useRef<number | null>(null);
  const scrollBehaviorRef = useRef<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = open ? "hidden" : "";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.split("#")[1];
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    event.preventDefault();
    const desktop = window.matchMedia("(min-width: 1025px)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOpen(false);

    window.setTimeout(() => {
      const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 72);
      if (reduceMotion) {
        window.scrollTo(0, targetY);
      } else {
        if (scrollAnimationRef.current !== null) cancelAnimationFrame(scrollAnimationRef.current);
        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = Math.min(2600, Math.max(1200, 850 + Math.abs(distance) * 0.22));
        const startedAt = performance.now();
        if (scrollBehaviorRef.current === null) scrollBehaviorRef.current = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";

        const tick = (now: number) => {
          const progress = Math.min(1, (now - startedAt) / duration);
          const eased = progress < 0.5
            ? 8 * progress ** 4
            : 1 - ((-2 * progress + 2) ** 4) / 2;
          window.scrollTo(0, startY + distance * eased);
          if (progress < 1) {
            scrollAnimationRef.current = requestAnimationFrame(tick);
          } else {
            scrollAnimationRef.current = null;
            document.documentElement.style.scrollBehavior = scrollBehaviorRef.current ?? "";
            scrollBehaviorRef.current = null;
          }
        };

        scrollAnimationRef.current = requestAnimationFrame(tick);
      }
      window.history.pushState(null, "", `/#${id}`);
    }, open && !reduceMotion ? (desktop ? 650 : 420) : 0);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 py-3">
        <Container className="flex h-12 items-center justify-between">
          <Link href="/" className="group pointer-events-auto relative block h-14 w-16 overflow-hidden rounded-[5px] border border-ink/15 bg-canvas/95 shadow-[0_0.75rem_2rem_rgba(19,37,28,0.2)] ring-1 ring-white/50 backdrop-blur-xl lg:fixed lg:left-[30px] lg:top-[30px] lg:h-20 lg:w-[100px]" aria-label="Teodor Hristov, home">
            <Image src="/personal_logo.png" alt="" width={1536} height={1024} priority sizes="(min-width: 1024px) 82px, 66px" className="absolute left-1/2 top-1/2 h-11 w-[66px] max-w-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-110 lg:h-14 lg:w-[84px]" />
            <span className="absolute inset-x-1 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
          </Link>

          <button type="button" onClick={() => { if (window.matchMedia("(min-width: 1025px)").matches) setOpen(true); else setOpen((value) => !value); }} onMouseEnter={() => { if (window.matchMedia("(min-width: 1025px)").matches) setOpen(true); }} onMouseLeave={(event) => { if (window.matchMedia("(min-width: 1025px)").matches && !document.getElementById("site-navigation")?.contains(event.relatedTarget as Node)) setOpen(false); }} className={`group pointer-events-auto flex h-11 items-center gap-3 rounded-full border pl-4 pr-1.5 font-mono text-[0.58rem] font-semibold tracking-[0.14em] uppercase shadow-[0_0.75rem_2rem_rgba(19,37,28,0.24)] ring-1 transition-[border-color,background-color,color,box-shadow] duration-500 hover:border-transparent hover:ring-transparent lg:fixed lg:right-[30px] lg:top-[30px] lg:h-20 lg:w-[100px] lg:justify-center lg:rounded-[5px] lg:border-0 lg:p-0 ${open ? "border-transparent bg-ink text-canvas ring-transparent" : "border-ink/20 bg-canvas text-ink ring-canvas/60 lg:bg-ink"}`} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="site-navigation">
            <span className="w-9 text-left lg:hidden">{open ? "Close" : "Menu"}</span>
            <span className="relative grid size-8 place-items-center lg:size-10" aria-hidden>
              <span className={`absolute h-px w-4 transition-[background-color,opacity,transform] duration-500 ease-[var(--ease-out)] ${open ? "scale-x-50 bg-canvas opacity-0" : "-translate-y-[4px] bg-ink opacity-100 lg:bg-canvas"}`} />
              <span className={`absolute h-px w-4 transition-[background-color,opacity,transform] duration-500 ease-[var(--ease-out)] ${open ? "scale-x-50 bg-canvas opacity-0" : "translate-y-[4px] bg-ink opacity-100 lg:bg-canvas"}`} />
              <span className={`absolute grid grid-cols-2 gap-1 transition-[opacity,transform] duration-500 ease-[var(--ease-out)] ${open ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-45 opacity-0"}`}>
                {[0, 1, 2, 3].map((dot) => <span key={dot} className="size-1 bg-signal" />)}
              </span>
            </span>
          </button>
        </Container>

        <nav className={`pointer-events-auto absolute right-[var(--gutter)] top-[4.75rem] w-[min(24rem,calc(100vw_-_2_*_var(--gutter)))] border border-ink/15 bg-canvas shadow-[0_1.5rem_4rem_rgba(19,37,28,0.18)] transition-[opacity,transform,visibility] duration-500 ease-[var(--ease-out)] lg:hidden ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"}`} aria-label="Primary navigation" aria-hidden={!open}>
          <div className="grid grid-cols-2">
            {navigation.map((item, index) => {
              const id = item.href.split("#")[1];
              const active = activeSection === id;
              return (
                <Link key={item.label} href={item.href} onClick={(event) => handleNavigation(event, item.href)} tabIndex={open ? 0 : -1} className={`group relative min-h-20 border-r border-b border-ink/15 p-4 text-ink even:border-r-0 ${index === navigation.length - 1 ? "col-span-2 border-r-0" : ""} ${active ? "bg-signal" : "hover:bg-panel"}`} aria-current={active ? "location" : undefined}>
                  <span className="font-mono text-[0.55rem] tracking-widest text-muted">{String(index + 1).padStart(2, "0")}</span>
                  <span className="absolute right-4 bottom-3 text-xl font-semibold tracking-[-0.04em] transition-transform duration-300 group-hover:-translate-x-1">{item.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-between px-4 py-3 font-mono text-[0.52rem] tracking-[0.14em] text-muted uppercase"><span>Navigation map</span><span>TH / {new Date().getFullYear()}</span></div>
        </nav>
      </header>

      <button type="button" tabIndex={-1} aria-label="Close navigation" onClick={() => setOpen(false)} className={`fixed inset-0 z-30 hidden bg-black transition-opacity lg:block ${open ? "pointer-events-auto opacity-60 duration-[1000ms] ease-[cubic-bezier(0.25,0,0.3,1)]" : "pointer-events-none opacity-0 duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"}`} />

      <nav
        id="site-navigation"
        onMouseLeave={() => setOpen(false)}
        className={`fixed z-40 hidden overflow-hidden bg-ink text-canvas transition-[top,right,width,height,border-radius] lg:block ${open ? "pointer-events-auto right-0 top-0 h-screen w-[max(46vw,34rem)] rounded-none duration-[1000ms] ease-[cubic-bezier(0.25,0,0.3,1)]" : "pointer-events-none right-[30px] top-[30px] h-20 w-[100px] rounded-[5px] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"}`}
        aria-label="Primary navigation"
        aria-hidden={!open}
      >
        <div className={`flex h-full flex-col justify-end gap-[clamp(0.2rem,0.6vh,0.5rem)] px-[4.1666vw] pb-[4.1666vw] pt-[150px] transition-opacity ${open ? "opacity-100 delay-[650ms] duration-[350ms] ease-out" : "opacity-0 delay-0 duration-150 ease-in"}`}>
          {navigation.map((item) => {
            const id = item.href.split("#")[1];
            const active = activeSection === id;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(event) => handleNavigation(event, item.href)}
                tabIndex={open ? 0 : -1}
                className={`menu-display group relative block overflow-visible py-[0.06em] whitespace-nowrap text-[clamp(4.5rem,9.7vw,8.75rem)] leading-[0.74] font-black tracking-[-0.025em] text-canvas uppercase ${active ? "pointer-events-none cursor-default opacity-25" : ""}`}
                aria-label={item.label}
                aria-current={active ? "location" : undefined}
              >
                <span className="block translate-y-[10%]" aria-hidden>{item.label}</span>
                {!active && (
                  <span className="absolute inset-0 block bg-signal text-ink [clip-path:polygon(0_50%,100%_50%,100%_50%,0_50%)] transition-[clip-path] duration-[400ms] ease-[cubic-bezier(0.1,0.5,0.5,1)] group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]" aria-hidden>
                    <span className="block translate-y-[10%] py-[0.06em]">{item.label}</span>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

    </>
  );
}
