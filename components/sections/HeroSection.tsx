"use client";

import { useRef } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import ActionLink from "@/components/ui/ActionLink";
import Container from "@/components/ui/Container";
import { getGsap } from "@/lib/gsap";
import { motionDebug } from "@/lib/motion";
import { useGSAP } from "@gsap/react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const { gsap } = getGsap();
    const media = gsap.matchMedia();

    media.add(
      {
        desktop: "(min-width: 768px) and (pointer: fine)",
        mobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduceMotion } = context.conditions as { desktop: boolean; mobile: boolean; reduceMotion: boolean };
        const words = gsap.utils.toArray<HTMLElement>("[data-hero-word]");
        const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
        const visual = section.querySelector<HTMLElement>("[data-hero-visual]");
        const details = section.querySelector<HTMLElement>("[data-hero-details]");
        const indicator = section.querySelector<HTMLElement>("[data-hero-indicator]");

        if (reduceMotion) {
          gsap.set([words, lines, visual, details, indicator], { clearProps: "all" });
          return;
        }

        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(words, { autoAlpha: 0, xPercent: (index) => index % 2 ? 8 : -8, duration: 1.1, stagger: 0.08 })
          .from("[data-hero-kicker]", { autoAlpha: 0, y: 20, duration: 0.55 }, 0.15)
          .from(lines, { autoAlpha: 0, yPercent: 105, duration: 0.9, stagger: 0.1 }, 0.25)
          .from(visual, { autoAlpha: 0, scale: 0.72, rotate: -10, duration: 1.1 }, 0.35)
          .from(details, { autoAlpha: 0, y: 24, duration: 0.7 }, 0.7)
          .from(indicator, { autoAlpha: 0, y: -12, duration: 0.5 }, 0.95);

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            markers: motionDebug,
          },
        })
          .to(words[0], { xPercent: -12, ease: "none" }, 0)
          .to(words[1], { xPercent: 12, ease: "none" }, 0)
          .to(visual, { yPercent: 35, rotate: 10, scale: 0.9, ease: "none" }, 0)
          .to("[data-hero-content]", { yPercent: -8, autoAlpha: 0.25, ease: "none" }, 0.25);

        if (desktop && visual) {
          const moveVisualX = gsap.quickTo(visual, "x", { duration: 0.8, ease: "power3.out" });
          const moveVisualY = gsap.quickTo(visual, "y", { duration: 0.8, ease: "power3.out" });
          const moveWordX = words.map((word) => gsap.quickTo(word, "x", { duration: 1.2, ease: "power3.out" }));

          const handlePointer = (event: PointerEvent) => {
            const bounds = section.getBoundingClientRect();
            const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
            const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
            moveVisualX(normalizedX * 24);
            moveVisualY(normalizedY * 18);
            moveWordX.forEach((move, index) => move(normalizedX * (index ? -14 : 14)));
          };

          section.addEventListener("pointermove", handlePointer, { passive: true });
          return () => section.removeEventListener("pointermove", handlePointer);
        }
      },
    );

    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="home" className="relative flex min-h-svh overflow-hidden pt-24 pb-8 md:pt-28 md:pb-10">
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden>
        <p data-hero-word className="absolute top-[15%] -left-[3vw] whitespace-nowrap text-[clamp(6rem,18vw,18rem)] leading-none font-semibold tracking-[-0.08em] text-panel">DESIGN</p>
        <p data-hero-word className="absolute right-[-4vw] bottom-[7%] whitespace-nowrap text-[clamp(6rem,18vw,18rem)] leading-none font-semibold tracking-[-0.08em] text-panel">DEVELOP</p>
      </div>

      <div data-hero-visual className="pointer-events-none absolute top-[23%] right-[5vw] z-[1] size-[clamp(13rem,31vw,30rem)] rounded-full border border-ink/15 bg-signal shadow-[inset_0_0_0_clamp(1rem,3vw,3rem)_var(--canvas)] md:right-[10vw]" aria-hidden>
        <div className="absolute top-1/2 left-1/2 size-[38%] -translate-1/2 rounded-full bg-accent" />
        <span className="absolute top-[20%] left-[16%] font-mono text-[0.65rem] tracking-widest uppercase">Idea</span>
        <span className="absolute right-[13%] bottom-[21%] font-mono text-[0.65rem] tracking-widest uppercase">Interface</span>
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-between" data-hero-content>
        <p data-hero-kicker className="eyebrow mt-4">Front-end developer / Sofia</p>

        <div className="my-auto py-16 md:py-10">
          <h1 className="display-type relative max-w-[11ch]">
            <span className="block overflow-hidden"><span data-hero-line className="block">Digital craft</span></span>
            <span className="block overflow-hidden"><span data-hero-line className="block text-accent">with intent.</span></span>
          </h1>
        </div>

        <div data-hero-details className="grid items-end gap-8 border-t border-ink/25 pt-6 md:grid-cols-[1fr_auto]">
          <p className="body-large max-w-xl text-muted">I&apos;m Teo, a developer turning thoughtful design into fast, expressive interfaces for the modern web.</p>
          <div className="flex flex-wrap gap-3">
            <ActionLink href="#projects">Selected work</ActionLink>
            <ActionLink href="#contact" variant="outline">Get in touch</ActionLink>
          </div>
        </div>

        <a data-hero-indicator href="#about" className="mt-8 inline-flex w-fit items-center gap-3 font-mono text-xs tracking-widest uppercase" aria-label="Scroll to about section">Explore <FaArrowDownLong aria-hidden /></a>
      </Container>
    </section>
  );
}
