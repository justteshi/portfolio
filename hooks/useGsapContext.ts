"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { getGsap } from "@/lib/gsap";

type Scope = RefObject<HTMLElement | null>;

export function useGsapContext(callback: gsap.ContextFunc, scope: Scope, dependencies: unknown[] = []) {
  getGsap();
  useGSAP(callback, { scope, dependencies, revertOnUpdate: true });
}
