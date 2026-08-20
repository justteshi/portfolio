import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import type { Project } from "@/types/portfolio";

type ProjectNarrativeProps = { project: Project; index: number; total: number };

export default function ProjectNarrative({ project, index, total }: ProjectNarrativeProps) {
  return (
    <article data-project-copy className="flex min-h-[70svh] flex-col justify-center border-t border-line py-14 first:border-t-0 lg:min-h-[76vh] lg:py-20">
      <div className="mb-8 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted">
        <span>Project / {String(index + 1).padStart(2, "0")}</span>
        <span>{String(index + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}</span>
      </div>
      <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] bg-panel lg:hidden">
        <Image className="object-cover" src={project.image} alt={`${project.title} project screenshot`} fill sizes="100vw" />
      </div>
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">{project.builtWith}</p>
      <h3 className="text-[clamp(2.75rem,6vw,5.75rem)] leading-[0.92]">{project.title}</h3>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">A selected build focused on translating product needs into a clear, responsive web experience.</p>
      <Link href={project.href} className="mt-9 inline-flex w-fit items-center gap-3 border-b border-ink pb-1 font-mono text-xs font-semibold tracking-widest uppercase">Explore project <FaArrowRightLong aria-hidden /></Link>
    </article>
  );
}
