"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getGsap } from "@/lib/gsap";
import { motionDebug } from "@/lib/motion";

const statements = [
  "I’m a front-end developer interested in the place where considered design meets reliable engineering.",
  "I use modern web technologies to turn ideas into clear, responsive experiences—balancing visual detail, usability, and performance.",
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
        const image = section.querySelector<HTMLElement>("[data-about-image]");

        if (reduceMotion) {
          gsap.set([...revealTargets, image], { clearProps: "all" });
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
          .from("[data-about-heading]", { autoAlpha: 0, y: desktop ? 36 : 20, duration: 0.7 })
          .from(image, { autoAlpha: 0, clipPath: "inset(0 0 100% 0)", scale: 1.04, duration: 1 }, 0.15)
          .from(revealTargets, { autoAlpha: 0, yPercent: 105, duration: 0.75, stagger: 0.12 }, 0.3)
          .from("[data-about-link]", { autoAlpha: 0, y: 14, duration: 0.5 }, 0.75);

        if (desktop && image) {
          gsap.fromTo(image.querySelector("img"), { yPercent: -4 }, {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
              markers: motionDebug,
            },
          });
        }
      },
    );

    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="section-shell section-rule scroll-mt-20">
      <Container>
        <div data-about-heading>
          <SectionHeading eyebrow="01 / About" title="Building beyond the expected." motion={false} />
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-[0.75fr_1fr] md:gap-16">
          <div data-about-image className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-panel">
            <Image className="scale-[1.1] object-cover grayscale" src="https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?auto=format&fit=crop&w=900&q=85" alt="Developer working at a computer" fill sizes="(min-width: 768px) 42vw, 100vw" />
          </div>
          <div className="flex flex-col justify-between gap-10">
            <div className="space-y-6 text-lg leading-relaxed text-muted md:text-xl">
              {statements.map((statement) => (
                <div key={statement} className="overflow-hidden py-0.5">
                  <p data-about-reveal>{statement}</p>
                </div>
              ))}
            </div>
            <a data-about-link href="#projects" className="w-fit border-b border-ink pb-1 font-mono text-xs font-semibold tracking-widest uppercase">View selected projects</a>
          </div>
        </div>
      </Container>
    </section>
  );
}
