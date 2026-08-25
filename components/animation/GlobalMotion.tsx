"use client";

import { useGSAP } from "@gsap/react";
import { getGsap } from "@/lib/gsap";
import { motion } from "@/lib/motion";

const revealSelector = '[data-motion="reveal"]';
const groupSelector = "[data-motion-group]";
const itemSelector = "[data-motion-item]";

export default function GlobalMotion() {
  useGSAP(() => {
    const { gsap } = getGsap();
    const media = gsap.matchMedia();

    media.add(
      {
        desktop: "(min-width: 768px)",
        mobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduceMotion } = context.conditions as { desktop: boolean; mobile: boolean; reduceMotion: boolean };
        const reveals = gsap.utils.toArray<HTMLElement>(revealSelector);
        const groups = gsap.utils.toArray<HTMLElement>(groupSelector);
        const groupedItems = new Set(groups.flatMap((group) => gsap.utils.toArray<HTMLElement>(itemSelector, group)));

        if (reduceMotion) {
          gsap.set([...reveals, ...groupedItems], { clearProps: "all" });
          return;
        }

        const distance = desktop ? motion.distance.desktop : motion.distance.mobile;
        const standaloneReveals = reveals.filter((element) => !groupedItems.has(element));
        const groupItems = new Map<Element, HTMLElement[]>();

        gsap.set(standaloneReveals, { autoAlpha: 0, y: distance });

        groups.forEach((group) => {
          const items = gsap.utils.toArray<HTMLElement>(itemSelector, group);
          if (!items.length) return;
          groupItems.set(group, items);
          gsap.set(items, { autoAlpha: 0, y: distance });
        });

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const items = groupItems.get(entry.target);
            gsap.to(items ?? entry.target, {
              autoAlpha: 1,
              y: 0,
              duration: motion.duration.reveal,
              ease: motion.ease.reveal,
              stagger: items ? motion.stagger.default : 0,
              overwrite: "auto",
            });
            observer.unobserve(entry.target);
          });
        }, { rootMargin: "0px 0px -12% 0px" });

        standaloneReveals.forEach((element) => observer.observe(element));
        groups.forEach((group) => {
          if (groupItems.has(group)) observer.observe(group);
        });

        return () => observer.disconnect();
      },
    );

    return () => {
      media.revert();
    };
  }, []);

  return null;
}
