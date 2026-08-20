import Image from "next/image";
import type { Project } from "@/types/portfolio";

export default function ProjectVisual({ project, index }: { project: Project; index: number }) {
  return (
    <div data-project-visual className="invisible absolute inset-0 overflow-hidden rounded-[var(--radius-lg)] bg-panel" aria-hidden={index !== 0}>
      <Image className="object-cover" src={project.image} alt="" fill sizes="58vw" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/75 to-transparent p-7 pt-24 text-white">
        <p className="font-mono text-xs uppercase tracking-widest">{project.title}</p>
        <p className="font-mono text-xs uppercase tracking-widest text-white/70">{String(index + 1).padStart(2, "0")}</p>
      </div>
    </div>
  );
}
