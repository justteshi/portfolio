import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import type { Project } from "@/types/portfolio";

type ProjectNarrativeProps = { project: Project; index: number; total: number };

export default function ProjectNarrative({ project, index, total }: ProjectNarrativeProps) {
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <article data-project-card className={`group text-canvas ${index % 2 ? "md:translate-y-16" : ""}`}>
      <Link href={project.href} className="block focus-visible:outline-signal">
        <div className="relative aspect-[2/1] overflow-hidden bg-panel">
          <div data-project-image className="absolute -inset-y-[4%] inset-x-0">
            <div data-project-image-inner className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.035] motion-reduce:transform-none">
              <Image className="object-cover" src={project.image} alt={`${project.title} project screenshot`} fill sizes="(min-width: 768px) 48vw, 100vw" />
            </div>
          </div>
          <div className="absolute inset-0 bg-ink/10 transition-colors duration-500 group-hover:bg-transparent" />
          <span className="absolute -right-1 -bottom-4 text-[clamp(5rem,10vw,9rem)] leading-none font-bold tracking-[-0.08em] text-signal drop-shadow-[0_0.3rem_0.8rem_rgba(19,37,28,0.55)] [-webkit-text-stroke:2px_var(--ink)] [paint-order:stroke_fill] transition-transform duration-700 ease-[var(--ease-out)] group-hover:-translate-x-3" aria-hidden>{projectNumber}</span>
        </div>

        <div className="pt-5 sm:pt-7">
          <div className="flex items-center justify-between gap-5 font-mono text-[0.68rem] font-semibold tracking-[0.12em] uppercase">
            <span className="text-signal">{project.builtWith}</span>
            <span className="text-canvas/40">Project {projectNumber} / {String(total).padStart(2, "0")}</span>
          </div>
          <div className="mt-5 flex items-end justify-between gap-6">
            <h3 className="text-[clamp(2.25rem,4.8vw,4.8rem)] leading-[0.86] font-bold tracking-[-0.06em] uppercase transition-colors duration-500 group-hover:text-signal">{project.title}</h3>
            <FaArrowRightLong className="mb-1 shrink-0 text-signal transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-2" size={24} aria-hidden />
          </div>
        </div>
      </Link>
    </article>
  );
}
