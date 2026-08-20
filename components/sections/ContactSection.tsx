"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { FaArrowRightLong, FaArrowUpLong, FaGithub } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import { getGsap } from "@/lib/gsap";
import { motionDebug } from "@/lib/motion";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { gsap } = getGsap();
    const media = gsap.matchMedia();

    media.add(
      {
        desktop: "(min-width: 768px)",
        finePointer: "(pointer: fine)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, finePointer, reduceMotion } = context.conditions as { desktop: boolean; finePointer: boolean; reduceMotion: boolean };
        const words = gsap.utils.toArray<HTMLElement>("[data-contact-word]");
        const fields = gsap.utils.toArray<HTMLElement>("[data-contact-field]");
        const submit = section.querySelector<HTMLButtonElement>("[data-contact-submit]");

        if (reduceMotion) {
          gsap.set([words, fields, "[data-contact-copy]", submit, "[data-contact-footer]"], { clearProps: "all" });
          return;
        }

        gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 68%", once: true, markers: motionDebug },
          defaults: { ease: "power3.out" },
        })
          .from("[data-contact-label]", { autoAlpha: 0, y: 18, duration: 0.5 })
          .from(words, { autoAlpha: 0, yPercent: 110, duration: 0.9, stagger: 0.1 }, 0.1)
          .from("[data-contact-copy]", { autoAlpha: 0, y: 24, duration: 0.65 }, 0.45)
          .from(fields, { autoAlpha: 0, y: 22, duration: 0.6, stagger: 0.08 }, 0.5)
          .from(submit, { autoAlpha: 0, scale: 0.9, duration: 0.55 }, 0.78)
          .from("[data-contact-footer]", { autoAlpha: 0, y: 16, duration: 0.5 }, 0.9);

        if (desktop) {
          gsap.timeline({
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom bottom", scrub: 0.6, markers: motionDebug },
          })
            .fromTo(words[0], { xPercent: -4 }, { xPercent: 1, ease: "none" }, 0)
            .fromTo(words[1], { xPercent: 4 }, { xPercent: -1, ease: "none" }, 0);
        }

        if (finePointer && submit) {
          const moveX = gsap.quickTo(submit, "x", { duration: 0.5, ease: "power3.out" });
          const moveY = gsap.quickTo(submit, "y", { duration: 0.5, ease: "power3.out" });
          const handleMove = (event: PointerEvent) => {
            const bounds = submit.getBoundingClientRect();
            moveX((event.clientX - bounds.left - bounds.width / 2) * 0.18);
            moveY((event.clientY - bounds.top - bounds.height / 2) * 0.18);
          };
          const handleLeave = () => { moveX(0); moveY(0); };
          submit.addEventListener("pointermove", handleMove, { passive: true });
          submit.addEventListener("pointerleave", handleLeave);
          return () => {
            submit.removeEventListener("pointermove", handleMove);
            submit.removeEventListener("pointerleave", handleLeave);
          };
        }
      },
    );

    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden bg-ink pt-[var(--section-space)] text-canvas scroll-mt-20">
      <Container>
        <p data-contact-label className="eyebrow mb-10 before:bg-signal">07 / Contact</p>
        <h2 className="text-[clamp(4.5rem,15vw,14rem)] leading-[0.76] font-semibold tracking-[-0.075em]" aria-label="Let's talk">
          <span className="block overflow-hidden"><span data-contact-word className="block">LET&apos;S</span></span>
          <span className="block overflow-hidden text-signal"><span data-contact-word className="block text-right">TALK.</span></span>
        </h2>

        <div className="mt-20 grid gap-14 border-t border-white/20 pt-10 md:grid-cols-[0.65fr_1.35fr] md:gap-20">
          <div data-contact-copy>
            <h3 className="text-3xl md:text-4xl">Have a project, role, or idea worth discussing?</h3>
            <p className="body-large mt-6 text-white/55">I&apos;m available for freelance and full-time opportunities. Share the context and I&apos;ll get back to you.</p>
            <a href="https://github.com/justteshi" target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-3 border-b border-white/40 pb-1 font-mono text-xs uppercase tracking-widest hover:border-signal"><FaGithub aria-hidden /> @justteshi</a>
          </div>

          <form className="grid gap-7" action="https://getform.io/f/a49e115e-1ffd-44d7-abf8-7a4a7fb19ac3" method="POST">
            <div className="grid gap-7 sm:grid-cols-2">
              <label data-contact-field className="font-mono text-xs uppercase tracking-widest text-white/55">Name<input className="mt-3 w-full border-b border-white/30 bg-transparent py-3 text-base text-canvas normal-case outline-none transition-colors focus:border-signal" name="name" type="text" autoComplete="name" required /></label>
              <label data-contact-field className="font-mono text-xs uppercase tracking-widest text-white/55">Email<input className="mt-3 w-full border-b border-white/30 bg-transparent py-3 text-base text-canvas normal-case outline-none transition-colors focus:border-signal" name="email" type="email" autoComplete="email" required /></label>
            </div>
            <label data-contact-field className="font-mono text-xs uppercase tracking-widest text-white/55">Subject<input className="mt-3 w-full border-b border-white/30 bg-transparent py-3 text-base text-canvas normal-case outline-none transition-colors focus:border-signal" name="subject" type="text" required /></label>
            <label data-contact-field className="font-mono text-xs uppercase tracking-widest text-white/55">Message<textarea className="mt-3 min-h-36 w-full resize-y border-b border-white/30 bg-transparent py-3 text-base text-canvas normal-case outline-none transition-colors focus:border-signal" name="message" required /></label>
            <button data-contact-submit className="group mt-2 inline-flex min-h-14 w-fit items-center gap-4 rounded-full bg-signal px-7 font-mono text-xs font-semibold tracking-widest text-ink uppercase" type="submit">Send enquiry <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden /></button>
          </form>
        </div>

        <footer data-contact-footer className="mt-24 flex flex-col gap-5 border-t border-white/20 py-7 font-mono text-xs uppercase tracking-widest text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>Teodor Hristov © {new Date().getFullYear()}</p>
          <div className="flex items-center gap-6"><p>Sofia, Bulgaria</p><Link href="#home" className="inline-flex items-center gap-2 text-canvas">Back to top <FaArrowUpLong aria-hidden /></Link></div>
        </footer>
      </Container>
    </section>
  );
}
