"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getGsap } from "@/lib/gsap";
import { motionDebug } from "@/lib/motion";

const experiments = [
  { number: "01", title: "Variable rhythm", kind: "type" },
  { number: "02", title: "Orbit study", kind: "orbit" },
  { number: "03", title: "Grid tension", kind: "grid" },
  { number: "04", title: "Signal / noise", kind: "signal" },
] as const;

export default function PlaygroundSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { gsap } = getGsap();
    const media = gsap.matchMedia();

    media.add(
      { finePointer: "(pointer: fine)", reduceMotion: "(prefers-reduced-motion: reduce)" },
      (context) => {
        const { finePointer, reduceMotion } = context.conditions as { finePointer: boolean; reduceMotion: boolean };
        const track = section.querySelector<HTMLElement>("[data-playground-marquee]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-playground-card]");

        if (reduceMotion) {
          gsap.set([track, cards], { clearProps: "all" });
          return;
        }

        const marquee = gsap.to(track, { xPercent: -50, duration: 18, repeat: -1, ease: "none", paused: true });
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => marquee.play(),
            onEnterBack: () => marquee.play(),
            onLeave: () => marquee.pause(),
            onLeaveBack: () => marquee.pause(),
            markers: motionDebug,
          },
        });

        if (finePointer) {
          const cleanups = cards.map((card) => {
            const rotateX = gsap.quickTo(card, "rotateX", { duration: 0.5, ease: "power3.out" });
            const rotateY = gsap.quickTo(card, "rotateY", { duration: 0.5, ease: "power3.out" });
            const handleMove = (event: PointerEvent) => {
              const bounds = card.getBoundingClientRect();
              rotateX(((event.clientY - bounds.top) / bounds.height - 0.5) * -5);
              rotateY(((event.clientX - bounds.left) / bounds.width - 0.5) * 5);
            };
            const handleLeave = () => { rotateX(0); rotateY(0); };
            card.addEventListener("pointermove", handleMove, { passive: true });
            card.addEventListener("pointerleave", handleLeave);
            return () => {
              card.removeEventListener("pointermove", handleMove);
              card.removeEventListener("pointerleave", handleLeave);
            };
          });
          return () => cleanups.forEach((cleanup) => cleanup());
        }
      },
    );

    return () => media.revert();
  }, { scope: sectionRef });

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.min(rail.clientWidth * 0.82, 640), behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="playground" className="section-shell section-rule overflow-hidden scroll-mt-20 bg-accent text-white">
      <Container>
        <SectionHeading className="[&_.text-muted]:text-white/70" eyebrow="03 / Playground" title="Small experiments. Useful accidents." description="A space for testing typography, motion, composition, and interaction without asking every idea to become a product." />
        <div className="mt-12 flex justify-end gap-2">
          <button type="button" onClick={() => moveRail(-1)} className="grid size-12 place-items-center rounded-full border border-white/35 hover:bg-white hover:text-accent" aria-label="Previous experiments"><FaArrowLeftLong aria-hidden /></button>
          <button type="button" onClick={() => moveRail(1)} className="grid size-12 place-items-center rounded-full border border-white/35 hover:bg-white hover:text-accent" aria-label="Next experiments"><FaArrowRightLong aria-hidden /></button>
        </div>
      </Container>

      <div ref={railRef} className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" tabIndex={0} aria-label="Playground experiments">
        {experiments.map((experiment) => (
          <article key={experiment.number} data-playground-card className="relative aspect-[4/3] w-[82vw] max-w-[40rem] shrink-0 snap-center overflow-hidden rounded-[var(--radius-lg)] bg-canvas p-6 text-ink [transform-style:preserve-3d] md:w-[58vw]">
            <div className="flex justify-between font-mono text-xs uppercase tracking-widest text-muted"><span>Experiment / {experiment.number}</span><span>{experiment.title}</span></div>
            <ExperimentVisual kind={experiment.kind} />
          </article>
        ))}
      </div>

      <div className="mt-12 border-y border-white/25 py-5" aria-hidden>
        <div data-playground-marquee className="flex w-max will-change-transform">
          {[0, 1].map((copy) => <p key={copy} className="pr-8 text-[clamp(4rem,10vw,9rem)] leading-none font-semibold tracking-[-0.06em] whitespace-nowrap">PLAY / BREAK / LEARN / REPEAT / </p>)}
        </div>
      </div>
    </section>
  );
}

function ExperimentVisual({ kind }: { kind: (typeof experiments)[number]["kind"] }) {
  if (kind === "type") return <div className="absolute inset-x-6 bottom-6"><p className="text-[clamp(4rem,11vw,8rem)] leading-[0.72] font-semibold tracking-[-0.08em]">Aa</p><p className="mt-5 font-mono text-xs tracking-[0.35em] uppercase">Weight / width / pace</p></div>;
  if (kind === "orbit") return <div className="absolute top-1/2 left-1/2 size-[55%] -translate-1/2 rounded-full border border-ink"><span className="absolute top-1/2 left-1/2 size-[42%] -translate-1/2 rounded-full bg-signal" /><span className="absolute top-1/2 left-0 size-5 -translate-1/2 rounded-full bg-accent" /></div>;
  if (kind === "grid") return <div className="absolute inset-6 top-20 grid grid-cols-5 grid-rows-4 gap-2">{Array.from({ length: 20 }, (_, index) => <span key={index} className={index === 7 || index === 13 ? "bg-accent" : "border border-line"} />)}</div>;
  return <div className="absolute inset-x-6 bottom-6 flex h-[55%] items-end gap-1">{Array.from({ length: 24 }, (_, index) => <span key={index} className="flex-1 bg-ink" style={{ height: `${18 + ((index * 37) % 82)}%` }} />)}</div>;
}
