import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/portfolio";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-auto w-full items-center justify-center rounded-xl p-4 shadow-xl shadow-gray-400 hover:bg-gradient-to-r hover:from-[#5651e5] hover:to-[#709dff]">
      <Image className="rounded-xl group-hover:opacity-10" src={project.image} alt={`${project.title} project screenshot`} sizes="(min-width: 768px) 50vw, 100vw" />
      <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 group-hover:block">
        <h3 className="text-center text-2xl tracking-wider text-white">{project.title}</h3>
        <p className="pt-2 pb-4 text-center text-white">{project.builtWith}</p>
        <Link href={project.href} className="block cursor-pointer rounded-lg bg-white p-3 text-center text-lg font-bold text-gray-700">More Info</Link>
      </div>
    </article>
  );
}
