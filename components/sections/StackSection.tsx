import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { skills } from "@/data/portfolio";

const groups = [
  {
    label: "Interface",
    description: "Semantic, responsive interfaces with a strong visual and interaction layer.",
    technologies: ["HTML", "CSS", "Sass", "JavaScript", "React"],
  },
  {
    label: "Application",
    description: "Practical application foundations and server-rendered product experiences.",
    technologies: ["Python", "Django"],
  },
  {
    label: "Workflow",
    description: "Versioned, maintainable delivery with a focus on clear iteration.",
    technologies: ["Git"],
  },
] as const;

export default function StackSection() {
  return (
    <section id="stack" className="section-shell section-rule scroll-mt-20">
      <Container>
        <SectionHeading eyebrow="04 / Stack" title="A focused toolkit, chosen for the work." description="Technology is part of the craft, but never the point of the story." />

        <div className="mt-16 border-t border-line" data-motion-group>
          {groups.map((group, index) => {
            const technologies = skills.filter((skill) => group.technologies.some((name) => name === skill.name));
            return (
              <article key={group.label} data-motion-item className="grid gap-8 border-b border-line py-8 md:grid-cols-[0.2fr_0.45fr_0.35fr] md:items-start md:gap-12">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">{String(index + 1).padStart(2, "0")}</p>
                <div><h3 className="text-3xl md:text-4xl">{group.label}</h3><p className="mt-4 max-w-lg leading-relaxed text-muted">{group.description}</p></div>
                <ul className="flex flex-wrap gap-2 md:justify-end" aria-label={`${group.label} technologies`}>
                  {technologies.map((technology) => (
                    <li key={technology.name} className="flex items-center gap-2 rounded-full border border-line px-3 py-2 font-mono text-xs">
                      <Image src={technology.image} alt="" width={18} height={18} />
                      {technology.name}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-2 font-mono text-xs uppercase tracking-widest text-muted sm:flex-row sm:justify-between" data-motion="reveal">
          <p>Working set / {String(skills.length).padStart(2, "0")}</p>
          <p>Always learning, selectively adding</p>
        </div>
      </Container>
    </section>
  );
}
