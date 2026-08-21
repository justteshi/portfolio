"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Container from "@/components/ui/Container";
import ProjectNarrative from "@/components/sections/projects/ProjectNarrative";
import { projects } from "@/data/portfolio";
import { getGsap } from "@/lib/gsap";
import { motionDebug } from "@/lib/motion";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { gsap } = getGsap();
    const media = gsap.matchMedia();

    media.add(
      { desktop: "(min-width: 768px)", reduceMotion: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { desktop, reduceMotion } = context.conditions as { desktop: boolean; reduceMotion: boolean };
        const titleLines = gsap.utils.toArray<HTMLElement>("[data-project-title-line]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");
        const images = gsap.utils.toArray<HTMLElement>("[data-project-image]");
        const imageInners = gsap.utils.toArray<HTMLElement>("[data-project-image-inner]");

        if (reduceMotion) {
          gsap.set([...titleLines, ...cards, ...images, ...imageInners], { clearProps: "all" });
          return;
        }

        gsap.timeline({ scrollTrigger: { trigger: "[data-project-heading]", start: "top 82%", once: true, markers: motionDebug } })
          .from(titleLines, {
            autoAlpha: 0,
            xPercent: (index) => index ? 42 : -42,
            clipPath: (index) => index ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
            duration: 1.15,
            stagger: 0.12,
            ease: "power4.out",
          }, 0.08);

        cards.forEach((card, index) => {
          const image = card.querySelector<HTMLElement>("[data-project-image-inner]");
          gsap.timeline({ scrollTrigger: { trigger: card, start: "top 86%", once: true, markers: motionDebug } })
            .from(card, {
              autoAlpha: 0,
              x: desktop ? (index % 2 ? 90 : -90) : 0,
              y: desktop ? 40 : 54,
              rotate: desktop ? (index % 2 ? 1.8 : -1.8) : 0,
              clipPath: index % 2 ? "inset(0 0 0 18%)" : "inset(0 18% 0 0)",
              duration: 1,
              ease: "power4.out",
            })
            .from(image, { scale: 1.16, duration: 1.35, ease: "power3.out" }, 0);
        });

        if (desktop) {
          images.forEach((image) => {
            gsap.fromTo(image, { yPercent: -3 }, {
              yPercent: 3,
              ease: "none",
              scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: 0.7, markers: motionDebug },
            });
          });
        }
      },
    );

    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="projects" className="overflow-hidden scroll-mt-20 bg-ink py-[clamp(5rem,10vw,9rem)] text-canvas">
      <Container>
        <header data-project-heading>
          <h2 className="text-[clamp(3.1rem,9vw,8rem)] leading-[0.82] font-bold tracking-[-0.065em] uppercase">
            <span className="block overflow-hidden pb-[0.08em]"><span data-project-title-line className="inline-block">Selected</span></span>
            <span className="block overflow-hidden pb-[0.08em]"><span data-project-title-line className="inline-block text-signal/80">work, built</span></span>
            <span className="block overflow-hidden pb-[0.08em]"><span data-project-title-line className="inline-block text-canvas/35">with purpose.</span></span>
          </h2>
        </header>

        <div className="mt-[clamp(4rem,8vw,8rem)] grid gap-5 md:grid-cols-2 md:gap-7">
          {projects.map((project, index) => <ProjectNarrative key={project.title} project={project} index={index} total={projects.length} />)}
        </div>
      </Container>
    </section>
  );
}
