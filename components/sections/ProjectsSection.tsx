import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/portfolio";

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-shell section-rule scroll-mt-20">
      <Container>
        <SectionHeading eyebrow="03 / Selected work" title="Projects shaped by context, not convention." />
        <div className="mt-16 space-y-6" data-motion-group>
          {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
        </div>
      </Container>
    </section>
  );
}
