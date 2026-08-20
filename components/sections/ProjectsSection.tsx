"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectNarrative from "@/components/sections/projects/ProjectNarrative";
import ProjectVisual from "@/components/sections/projects/ProjectVisual";
import { projects } from "@/data/portfolio";
import { getGsap } from "@/lib/gsap";
import { motion, motionDebug } from "@/lib/motion";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const { gsap } = getGsap();
    const media = gsap.matchMedia();

    media.add(
      {
        desktop: "(min-width: 1024px)",
        compact: "(max-width: 1023px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduceMotion } = context.conditions as { desktop: boolean; compact: boolean; reduceMotion: boolean };
        const visuals = gsap.utils.toArray<HTMLElement>("[data-project-visual]");
        const copies = gsap.utils.toArray<HTMLElement>("[data-project-copy]");
        const progress = section.querySelector<HTMLElement>("[data-project-progress]");

        if (reduceMotion) {
          gsap.set([...visuals, ...copies, progress], { clearProps: "all" });
          if (visuals[0]) gsap.set(visuals[0], { autoAlpha: 1 });
          return;
        }

        if (!desktop) {
          copies.forEach((copy) => {
            gsap.from(copy, {
              autoAlpha: 0,
              y: motion.distance.mobile,
              duration: motion.duration.reveal,
              ease: motion.ease.reveal,
              scrollTrigger: { trigger: copy, start: motion.start.reveal, once: true, markers: motionDebug },
            });
          });
          return;
        }

        gsap.set(visuals, { autoAlpha: 0, scale: 1.04 });
        gsap.set(visuals[0], { autoAlpha: 1, scale: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-project-story]",
            start: "top top+=96",
            end: "bottom bottom-=96",
            scrub: 0.65,
            markers: motionDebug,
          },
        });

        visuals.slice(1).forEach((visual, index) => {
          const previous = visuals[index];
          const position = index + 1;
          timeline
            .to(previous, { autoAlpha: 0, scale: 0.96, duration: 0.35, ease: "power2.inOut" }, position)
            .fromTo(visual, { autoAlpha: 0, clipPath: "inset(100% 0 0 0)", scale: 1.05 }, { autoAlpha: 1, clipPath: "inset(0% 0 0 0)", scale: 1, duration: 0.65, ease: "power2.inOut" }, position)
            .to(copies[index], { color: "var(--muted)", duration: 0.2 }, position);
        });

        if (progress) {
          gsap.fromTo(progress, { scaleY: 0 }, {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: "[data-project-story]",
              start: "top top+=96",
              end: "bottom bottom-=96",
              scrub: true,
              markers: motionDebug,
            },
          });
        }
      },
    );

    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="projects" className="section-shell section-rule scroll-mt-20">
      <Container>
        <SectionHeading eyebrow="03 / Selected work" title="Projects shaped by context, not convention." />
        <div data-project-story className="mt-16 grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            {projects.map((project, index) => <ProjectNarrative key={project.title} project={project} index={index} total={projects.length} />)}
          </div>
          <div className="relative hidden lg:block">
            <div className="sticky top-[15vh] h-[70vh]">
              {projects.map((project, index) => <ProjectVisual key={project.title} project={project} index={index} />)}
              <div className="absolute top-0 -right-5 h-full w-px bg-line" aria-hidden><span data-project-progress className="block h-full w-px bg-accent" /></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
