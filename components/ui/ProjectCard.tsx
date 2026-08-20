import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import type { Project } from "@/types/portfolio";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group grid overflow-hidden rounded-[var(--radius-lg)] bg-panel md:grid-cols-[0.8fr_1.2fr]" data-motion-item>
      <div className="flex min-h-72 flex-col justify-between p-6 md:p-8">
        <span className="font-mono text-xs text-muted">PROJECT / {String(index + 1).padStart(2, "0")}</span>
        <div><p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">{project.builtWith}</p><h3 className="text-4xl md:text-5xl">{project.title}</h3></div>
        <Link href={project.href} className="inline-flex w-fit items-center gap-3 border-b border-ink pb-1 font-mono text-xs font-semibold tracking-widest uppercase">View project <FaArrowRightLong aria-hidden /></Link>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-ink"><Image className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.025]" src={project.image} alt={`${project.title} project screenshot`} fill sizes="(min-width: 768px) 60vw, 100vw" /></div>
    </article>
  );
}
