import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ActionLinkProps = ComponentProps<typeof Link> & { variant?: "primary" | "outline" };

export default function ActionLink({ className, variant = "primary", ...props }: ActionLinkProps) {
  return <Link className={cn("inline-flex min-h-12 items-center justify-center rounded-full border px-6 font-mono text-xs font-semibold tracking-[0.08em] uppercase transition-colors", variant === "primary" ? "border-ink bg-ink text-canvas hover:border-accent hover:bg-accent" : "border-line hover:border-ink", className)} {...props} />;
}
