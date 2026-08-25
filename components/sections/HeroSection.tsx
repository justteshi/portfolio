"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { getGsap } from "@/lib/gsap";

const bands = [
  { direction: -1, duration: 270, words: ["MAKER. ", "PROBLEM ", "SOLVER. ", "TECH ", "GENERALIST. "] },
  { direction: 1, duration: 240, words: ["FRONT-END ", "DEVELOPER. ", "ACCESSIBLE. ", "RESPONSIVE. "] },
  { direction: -1, duration: 290, words: ["INTERFACE ", "ENGINEER. ", "MOTION ", "DESIGNER. "] },
  { direction: 1, duration: 255, words: ["CREATIVE ", "DEVELOPER. ", "SYSTEM ", "THINKER. "] },
  { direction: -1, duration: 285, words: ["PERFORMANCE. ", "DETAIL ", "OBSESSED. ", "WEB ", "BUILDER. "] },
  { direction: 1, duration: 245, words: ["CRAFT. ", "CODE. ", "MOTION. ", "PURPOSE. "] },
  { direction: -1, duration: 275, words: ["REACT. ", "NEXT.JS. ", "GSAP. ", "TYPESCRIPT. "] },
  { direction: 1, duration: 310, words: ["ACCESSIBILITY. ", "PERFORMANCE. ", "CLARITY. ", "DETAIL. "] },
  { direction: -1, duration: 260, words: ["DIGITAL ", "EXPERIENCES. ", "BUILT ", "WELL. "] },
  { direction: 1, duration: 280, words: ["USER ", "FOCUSED. ", "DETAIL ", "DRIVEN. "] },
  { direction: -1, duration: 320, words: ["DESIGN ", "SYSTEMS. ", "REUSABLE ", "COMPONENTS. "] },
  { direction: 1, duration: 295, words: ["ANIMATION. ", "INTERACTION. ", "RHYTHM. ", "FLOW. "] },
  { direction: -1, duration: 250, words: ["HTML. ", "CSS. ", "JAVASCRIPT. ", "REACT. "] },
  { direction: 1, duration: 330, words: ["PYTHON. ", "DJANGO. ", "WORDPRESS. ", "WEB. "] },
  { direction: -1, duration: 275, words: ["BUILD. ", "TEST. ", "REFINE. ", "SHIP. "] },
] as const;

const highlightedWords = new Set(["SOLVER. ", "GENERALIST. ", "DEVELOPER. ", "ENGINEER. ", "DESIGNER. ", "THINKER. ", "PERFORMANCE. ", "BUILDER. ", "GSAP. ", "TYPESCRIPT. ", "EXPERIENCES. ", "FOCUSED. ", "SYSTEMS. ", "COMPONENTS. ", "INTERACTION. ", "JAVASCRIPT. ", "REACT. ", "DJANGO. ", "WORDPRESS. ", "SHIP. "]);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { gsap } = getGsap();
    const media = gsap.matchMedia();

    media.add(
      {
        motionAllowed: "(prefers-reduced-motion: no-preference)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { reduceMotion } = context.conditions as { motionAllowed: boolean; reduceMotion: boolean };
        const rows = gsap.utils.toArray<HTMLElement>("[data-hero-row]");
        const tracks = gsap.utils.toArray<HTMLElement>("[data-hero-track]");
        const orderedRows = [...rows].sort((a, b) => {
          const center = (rows.length - 1) / 2;
          return Math.abs(rows.indexOf(a) - center) - Math.abs(rows.indexOf(b) - center);
        });
        const highlights = gsap.utils.toArray<HTMLElement>("[data-hero-highlight]");
        const portrait = section.querySelector<HTMLElement>("[data-hero-portrait]");
        const portraitFloat = section.querySelector<HTMLElement>("[data-hero-portrait-float]");

        if (reduceMotion) {
          gsap.set([...rows, ...tracks, ...highlights, portrait, portraitFloat], { clearProps: "all" });
          return;
        }

        gsap.set(tracks, { force3D: true });

        const marquees = tracks.map((track) => {
          const direction = Number(track.dataset.direction);
          const duration = Number(track.dataset.duration);
          return gsap.fromTo(track, { xPercent: direction < 0 ? 0 : -50 }, { xPercent: direction < 0 ? -50 : 0, duration, repeat: -1, ease: "none", force3D: true, overwrite: "auto", paused: true });
        });

        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(orderedRows, { autoAlpha: 0, x: (index) => index % 2 ? 56 : -56, duration: 1, stagger: 0.055 })
          .from(highlights, { opacity: 0.24, duration: 1.1, ease: "sine.out" }, 0.32)
          .from(portrait, { autoAlpha: 0, yPercent: 24, scale: 0.9, duration: 1.25, ease: "power4.out" }, 0.38);

        if (portraitFloat) {
          gsap.to(portraitFloat, { y: -8, duration: 5.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
        }

        const observer = new IntersectionObserver(([entry]) => {
          marquees.forEach((marquee) => entry.isIntersecting ? marquee.play() : marquee.pause());
        });
        observer.observe(section);

        return () => observer.disconnect();
      },
    );

    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="home" className="relative overflow-hidden bg-canvas text-ink">
      <div data-hero-wall className="pointer-events-none relative flex flex-col overflow-hidden border-y border-line bg-panel select-none" aria-hidden>
        {bands.map((band, bandIndex) => (
          <div key={bandIndex} data-hero-row className="w-full">
            <div data-hero-track data-direction={band.direction} data-duration={band.duration} className="flex w-max transform-gpu whitespace-nowrap [backface-visibility:hidden] will-change-transform">
              {[0, 1].map((copy) => (
                <p key={copy} className="pr-12 text-[clamp(2.35rem,5.3vw,5.4rem)] leading-[0.84] font-bold tracking-[-0.042em] uppercase">
                  {[0, 1, 2].map((cycle) => band.words.map((word, wordIndex) => {
                    const isHighlighted = highlightedWords.has(word);
                    return <span key={`${cycle}-${word}-${wordIndex}`} data-hero-highlight={isHighlighted ? "" : undefined} className={isHighlighted ? `inline-block ${bandIndex % 2 ? "text-accent/70" : "text-accent/55"}` : "text-ink/16"}>{word}</span>;
                  }))}
                </p>
              ))}
            </div>
          </div>
        ))}

        <div data-hero-portrait className="absolute inset-x-0 bottom-0 z-10 flex h-[92%] origin-bottom items-end justify-center">
          <div data-hero-portrait-float className="flex h-full items-end justify-center will-change-transform">
            <Image
              src="/assets/hero/editorial-developer-waist.png"
              alt=""
              width={1024}
              height={1536}
              priority
              sizes="(max-width: 640px) 72vw, (max-width: 1024px) 52vw, 38vw"
              className="h-full w-auto max-w-[82vw] object-contain object-bottom grayscale contrast-[1.08] drop-shadow-[0_1.5rem_2.5rem_rgba(19,37,28,0.16)] sm:max-w-[62vw] lg:max-w-[46vw]"
            />
          </div>
        </div>
      </div>

    </section>
  );
}
