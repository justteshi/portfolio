export const motion = {
  duration: {
    reveal: 0.8,
    quick: 0.4,
  },
  ease: {
    reveal: "power3.out",
    standard: "power2.out",
  },
  distance: {
    desktop: 48,
    mobile: 24,
  },
  stagger: {
    default: 0.1,
  },
  start: {
    reveal: "top 88%",
  },
} as const;

export const motionDebug = process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_GSAP_DEBUG === "true";
