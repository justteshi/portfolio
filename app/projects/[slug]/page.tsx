import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailExperience from "@/components/projects/ProjectDetailExperience";
import { getProject, projects } from "@/data/portfolio";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: `${project.title} | Teo`, description: `${project.title}, a ${project.builtWith} project by Teodor Hristov.` };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const projectIndex = projects.findIndex(({ slug }) => slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  return <ProjectDetailExperience project={project} nextProject={nextProject} index={projectIndex} total={projects.length} />;
}
