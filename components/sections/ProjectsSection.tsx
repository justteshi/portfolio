import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/portfolio";

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full">
      <div className="mx-auto max-w-[1240px] px-2 py-16">
        <p className="text-xl tracking-widest text-[#5651e5] uppercase">Projects</p>
        <h2 className="py-4">What I &#39; ve Build</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
        </div>
      </div>
    </section>
  );
}
