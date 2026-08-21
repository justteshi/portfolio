"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import Container from "@/components/ui/Container";
import { getGsap } from "@/lib/gsap";
import { motionDebug } from "@/lib/motion";

const statements = [
  "I’m a Web Developer with 7 years of professional experience, working mostly on e-commerce projects and custom web applications.",
  "My work is usually focused on building things that need more than just a good-looking interface — custom business logic, integrations, internal tools, APIs, automation, and features tailored around how a business actually operates.",
  "Over the years, I’ve worked with many different technologies, frameworks, and platforms. I don’t really define myself by a single stack. I prefer understanding the problem first and then using the tools that make the most sense for the project.",
  "E-commerce has been a big part of my experience, from developing custom storefront functionality to working on more complex systems behind the scenes. I enjoy projects where there is something real to solve, improve, or build from scratch.",
  "I also spend a lot of time experimenting with new ideas and technologies outside of my day-to-day work. For me, development has never been only about writing code — it’s about figuring out how things should work and turning that into a solid product.",
  "I’m always open to interesting freelance projects, especially when there’s a real product to build or a problem that needs a thoughtful technical solution.",
];

const cardStyles = [
  { layout: "lg:col-span-7", color: "bg-ink text-canvas" },
  { layout: "lg:col-span-5", color: "bg-canvas/70 text-muted" },
  { layout: "lg:col-span-5", color: "bg-accent text-canvas" },
  { layout: "lg:col-span-7", color: "bg-canvas/70 text-muted" },
  { layout: "lg:col-span-7", color: "bg-canvas/70 text-muted" },
  { layout: "lg:col-span-5", color: "bg-signal text-ink" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const { gsap } = getGsap();
    const media = gsap.matchMedia();

    media.add(
      {
        desktop: "(min-width: 768px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduceMotion } = context.conditions as { desktop: boolean; reduceMotion: boolean };
        const revealTargets = gsap.utils.toArray<HTMLElement>("[data-about-reveal]");
        const yearMark = section.querySelector<HTMLElement>("[data-about-years]");
        const titleWords = gsap.utils.toArray<HTMLElement>("[data-about-title-word]");
        const titleAccent = section.querySelector<HTMLElement>("[data-about-title-accent]");

        if (reduceMotion) {
          gsap.set([...revealTargets, ...titleWords, yearMark, titleAccent], { clearProps: "all" });
          return;
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
            markers: motionDebug,
          },
          defaults: { ease: "power3.out" },
        });

        timeline
          .from(titleWords, { autoAlpha: 0, yPercent: 115, rotate: (index) => index % 2 ? 3 : -3, duration: 0.95, stagger: 0.07 })
          .from(yearMark, { autoAlpha: 0, rotate: -6, scale: 0.86, duration: 0.9 }, 0.16)
          .from(revealTargets, { autoAlpha: 0, y: 44, rotate: (index) => index % 2 ? 1.2 : -1.2, duration: 0.75, stagger: 0.1 }, 0.22)
          .from("[data-about-link]", { autoAlpha: 0, y: 14, duration: 0.5 }, 0.72);

        if (titleAccent) {
          gsap.to(titleAccent, {
            y: -5,
            scale: 1.025,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            transformOrigin: "50% 70%",
            scrollTrigger: {
              trigger: "[data-about-heading]",
              start: "top bottom",
              end: "bottom top",
              toggleActions: "play pause resume pause",
              markers: motionDebug,
            },
          });
        }

        if (desktop && yearMark) {
          gsap.to(yearMark, {
            yPercent: 18,
            rotate: 2,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
              markers: motionDebug,
            },
          });
        }
      },
    );

    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="scroll-mt-20 bg-panel text-ink">
      <Container className="py-[clamp(5rem,10vw,9rem)]">
        <div className="pb-10 sm:pb-14">
          <h2 data-about-heading className="text-[clamp(2.9rem,8.2vw,7.4rem)] leading-[0.86] font-bold tracking-[-0.06em] uppercase">
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-about-title-word className="inline-block">About</span>{" "}
              <span data-about-title-word className="inline-block">me,</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-about-title-word data-about-title-accent className="relative inline-block text-accent/45">
                <span className="absolute inset-0 translate-x-[0.045em] translate-y-[0.045em] text-transparent [-webkit-text-stroke:1px_var(--accent)] opacity-35" aria-hidden>beyond</span>
                <span className="relative">beyond</span>
              </span>{" "}
              <span data-about-title-word className="inline-block">the</span>{" "}
              <span data-about-title-word className="inline-block">stack.</span>
            </span>
          </h2>
        </div>

        <div data-about-reveal className="relative mb-12 h-[clamp(4.5rem,8vw,7rem)] overflow-hidden border-y border-ink/10 sm:mb-16">
          <Image
            src="/personal_logo_name.png"
            alt="Teodor Hristov"
            width={2172}
            height={724}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="absolute left-1/2 top-1/2 h-auto w-full -translate-x-1/2 -translate-y-[54%]"
          />
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[0.28fr_0.72fr] lg:gap-12">
          <aside data-about-years className="relative overflow-hidden bg-canvas px-5 py-7 lg:sticky lg:top-28 lg:px-7 lg:py-9">
            <p className="font-mono text-[0.65rem] font-semibold tracking-[0.14em] text-muted uppercase">Professional experience</p>
            <p className="mt-4 text-[clamp(6rem,14vw,11rem)] leading-[0.72] font-bold tracking-[-0.08em] text-accent">07</p>
            <div className="mt-6 flex items-end justify-between gap-4">
              <p className="text-2xl leading-none font-bold tracking-[-0.05em] uppercase">Years<br />building</p>
              <span className="size-4 rounded-full bg-signal" aria-hidden />
            </div>
          </aside>

          <div>
            <div className="grid gap-3 lg:grid-cols-12">
              {statements.map((statement, index) => (
                <div key={statement} data-about-reveal className={cardStyles[index].layout}>
                  <article className={`group flex min-h-52 h-full flex-col justify-between p-6 transition-transform duration-500 ease-[var(--ease-out)] motion-reduce:transform-none sm:p-8 [@media(hover:hover)]:hover:-translate-y-1 ${index % 2 ? "[@media(hover:hover)]:hover:rotate-[0.45deg]" : "[@media(hover:hover)]:hover:-rotate-[0.45deg]"} ${cardStyles[index].color}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[0.65rem] font-semibold tracking-[0.14em] uppercase opacity-60">0{index + 1}</span>
                      <span className="size-2 rounded-full bg-current opacity-35 transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[2.25] motion-reduce:transform-none" aria-hidden />
                    </div>
                    <p className="mt-12 text-[clamp(1.05rem,1.3vw,1.22rem)] leading-[1.52]">{statement}</p>
                  </article>
                </div>
              ))}
            </div>

            <a data-about-link href="#projects" className="mt-10 inline-flex w-fit items-center gap-4 border-b border-ink pb-2 font-mono text-xs font-semibold tracking-widest uppercase transition-[gap] duration-300 hover:gap-6">View selected projects <span aria-hidden>→</span></a>
          </div>
        </div>
      </Container>
    </section>
  );
}
