"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import { getGsap } from "@/lib/gsap";
import { motionDebug } from "@/lib/motion";
import type { Project } from "@/types/portfolio";

type ProjectDetailProps = { project: Project; nextProject: Project; index: number; total: number };

export default function ProjectDetailExperience({ project, nextProject, index, total }: ProjectDetailProps) {
  const pageRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const page = pageRef.current;
    if (!page) return;
    const { gsap } = getGsap();
    const media = gsap.matchMedia();

    media.add(
      { desktop: "(min-width: 768px)", reduceMotion: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { desktop, reduceMotion } = context.conditions as { desktop: boolean; reduceMotion: boolean };
        const frames = gsap.utils.toArray<HTMLElement>("[data-detail-frame]");

        if (reduceMotion) {
          gsap.set(["[data-detail-intro]", "[data-detail-hero]", frames], { clearProps: "all" });
          return;
        }

        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from("[data-detail-nav]", { autoAlpha: 0, y: -16, duration: 0.45 })
          .from("[data-detail-intro]", { autoAlpha: 0, y: 40, duration: 0.8, stagger: 0.1 }, 0.15)
          .from("[data-detail-hero]", { autoAlpha: 0, clipPath: "inset(0 0 100% 0)", scale: 1.03, duration: 1 }, 0.35);

        gsap.fromTo("[data-reading-progress]", { scaleX: 0 }, {
          scaleX: 1,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: { trigger: page, start: "top top", end: "bottom bottom", scrub: true },
        });

        frames.forEach((frame) => {
          gsap.from(frame, {
            autoAlpha: 0,
            y: desktop ? 48 : 24,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: frame, start: "top 86%", once: true, markers: motionDebug },
          });
          if (desktop) {
            const image = frame.querySelector("img");
            gsap.fromTo(image, { yPercent: -3 }, { yPercent: 3, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.5 } });
          }
        });
      },
    );

    return () => media.revert();
  }, { scope: pageRef });

  return (
    <main ref={pageRef} className="bg-canvas">
      <span data-reading-progress className="fixed inset-x-0 top-0 z-[60] h-1 bg-accent" aria-hidden />
      <header data-detail-nav className="relative z-10">
        <Container className="flex h-20 items-center justify-between border-b border-line">
          <Link href="/#projects" className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest"><FaArrowLeftLong aria-hidden /> All work</Link>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </Container>
      </header>

      <Container className="pt-20 pb-12 md:pt-28 md:pb-16">
        <p data-detail-intro className="eyebrow mb-8">Case study / {project.builtWith}</p>
        <h1 data-detail-intro className="display-type max-w-[12ch]">{project.title}</h1>
        <div data-detail-intro className="mt-10 grid gap-3 border-t border-line pt-6 font-mono text-xs uppercase tracking-widest text-muted sm:grid-cols-2"><p>Discipline / Web development</p><p>Technology / {project.builtWith}</p></div>
      </Container>

      <Container>
        <div data-detail-hero className="relative aspect-[16/8.5] overflow-hidden rounded-[var(--radius-lg)] bg-panel"><Image className="object-cover" src={project.image} alt={`${project.title} interface overview`} fill priority sizes="100vw" /></div>
      </Container>

      <Container className="section-shell grid gap-14 md:grid-cols-[0.55fr_1.45fr] md:gap-20">
        <aside className="h-fit border-t border-line pt-5 md:sticky md:top-24"><p className="eyebrow">Project notes</p><p className="mt-6 max-w-xs leading-relaxed text-muted">A visual record of the existing portfolio project, presented without unsupported performance claims or invented client outcomes.</p></aside>
        <div className="space-y-24 md:space-y-32">
          <section><p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">01 / Overview</p><h2 className="text-4xl md:text-6xl">A clear view of the finished interface.</h2><p className="body-large mt-6 text-muted">{project.title} was built with {project.builtWith}. This case study focuses on the interface material currently available in the portfolio.</p></section>
          <div data-detail-frame className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-panel"><Image className="scale-[1.08] object-cover object-top" src={project.image} alt={`${project.title} interface detail`} fill sizes="(min-width: 768px) 65vw, 100vw" /></div>
          <section><p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">02 / Interface</p><h2 className="text-4xl md:text-6xl">Structure before decoration.</h2><p className="body-large mt-6 text-muted">The screenshot is presented at multiple scales to document hierarchy, layout, and responsive interface decisions without overstating the original project scope.</p></section>
          <div data-detail-frame className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-ink"><Image className="scale-[1.35] object-cover object-center" src={project.image} alt={`${project.title} interface close-up`} fill sizes="(min-width: 768px) 65vw, 100vw" /></div>
        </div>
      </Container>

      <section className="section-shell border-t border-line bg-panel">
        <Container><p className="eyebrow mb-8">Next project</p><Link href={nextProject.href} className="group flex items-end justify-between gap-8"><span className="heading-type">{nextProject.title}</span><FaArrowRightLong className="mb-2 shrink-0 transition-transform duration-300 group-hover:translate-x-2" size={32} aria-hidden /></Link></Container>
      </section>
    </main>
  );
}
