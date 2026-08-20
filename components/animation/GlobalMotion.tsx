"use client";

import { useGSAP } from "@gsap/react";
import { getGsap } from "@/lib/gsap";
import { motion, motionDebug } from "@/lib/motion";

const revealSelector = '[data-motion="reveal"]';
const groupSelector = "[data-motion-group]";
const itemSelector = "[data-motion-item]";

export default function GlobalMotion() {
  useGSAP(() => {
    const { gsap, ScrollTrigger } = getGsap();
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

        reveals.filter((element) => !groupedItems.has(element)).forEach((element) => {
          gsap.from(element, {
            autoAlpha: 0,
            y: distance,
            duration: motion.duration.reveal,
            ease: motion.ease.reveal,
            scrollTrigger: {
              trigger: element,
              start: motion.start.reveal,
              once: true,
              markers: motionDebug,
            },
          });
        });

        groups.forEach((group) => {
          const items = gsap.utils.toArray<HTMLElement>(itemSelector, group);
          if (!items.length) return;

          gsap.from(items, {
            autoAlpha: 0,
            y: distance,
            duration: motion.duration.reveal,
            ease: motion.ease.reveal,
            stagger: motion.stagger.default,
            scrollTrigger: {
              trigger: group,
              start: motion.start.reveal,
              once: true,
              markers: motionDebug,
            },
          });
        });
      },
    );

    let active = true;
    document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });

    return () => {
      active = false;
      media.revert();
    };
  }, []);

  return null;
}
