"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { currentStatus, currentStatusUpdated } from "@/data/currently";
import { getGsap } from "@/lib/gsap";
import { motionDebug } from "@/lib/motion";

export default function CurrentlySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { gsap } = getGsap();
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-current-row]");
      const orbit = section.querySelector<HTMLElement>("[data-current-orbit]");
      const signal = section.querySelector<HTMLElement>("[data-current-signal]");

      gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 75%", once: true, markers: motionDebug },
        defaults: { ease: "power3.out" },
      })
        .from("[data-current-heading]", { autoAlpha: 0, y: 30, duration: 0.7 })
        .from(rows, { autoAlpha: 0, x: 32, duration: 0.65, stagger: 0.1 }, 0.2)
        .from("[data-current-meta]", { autoAlpha: 0, y: 12, duration: 0.45 }, 0.6);

      const loop = gsap.timeline({ paused: true, repeat: -1 });
      loop.to(orbit, { rotate: 360, duration: 24, ease: "none" }, 0).to(signal, { scale: 1.45, autoAlpha: 0.45, duration: 1.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0);

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) loop.play();
        else loop.pause();
      });
      observer.observe(section);

      return () => {
        observer.disconnect();
        loop.kill();
      };
    });

    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="currently" className="section-shell section-rule scroll-mt-20 bg-panel">
      <Container>
        <div data-current-heading><SectionHeading eyebrow="04 / Currently" title="What has my attention right now." motion={false} /></div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.4fr_1fr] lg:gap-20">
          <div className="relative grid min-h-64 place-items-center overflow-hidden rounded-[var(--radius-lg)] bg-ink text-canvas" aria-hidden>
            <div data-current-orbit className="relative size-40 rounded-full border border-white/25"><span className="absolute top-1/2 -left-2 size-4 -translate-y-1/2 rounded-full bg-signal" /><span className="absolute top-1/2 left-1/2 size-16 -translate-1/2 rounded-full border border-white/25" /></div>
            <span data-current-signal className="absolute size-3 rounded-full bg-signal" />
            <p className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-widest text-white/55">Live status</p>
          </div>

          <div className="border-t border-line">
            {currentStatus.map((item, index) => (
              <article key={item.label} data-current-row className="grid gap-3 border-b border-line py-6 sm:grid-cols-[0.12fr_0.25fr_1fr] sm:gap-6">
                <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-mono text-xs uppercase tracking-widest">{item.label}</h3>
                <p className="text-lg leading-relaxed text-muted">{item.value}</p>
              </article>
            ))}
          </div>
        </div>

        <div data-current-meta className="mt-8 flex items-center justify-between gap-5 font-mono text-xs uppercase tracking-widest text-muted"><p>Updated / <time dateTime={currentStatusUpdated}>August 2026</time></p><p className="hidden sm:block">Sofia, Bulgaria</p></div>
      </Container>
    </section>
  );
}
