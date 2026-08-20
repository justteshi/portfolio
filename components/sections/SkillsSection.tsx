import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { skills } from "@/data/portfolio";

export default function SkillsSection() {
  return (
    <section id="skills" className="section-shell section-rule scroll-mt-20">
      <Container>
        <SectionHeading eyebrow="02 / Capabilities" title="Tools are only useful when they serve the idea." description="A practical toolkit for designing, building, and shipping modern web experiences." />
        <div className="mt-16 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <article key={skill.name} className="interactive-lift flex min-h-40 items-end justify-between border-r border-b border-line p-5 hover:bg-panel">
              <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
              <div className="flex items-center gap-3"><Image src={skill.image} width={32} height={32} alt="" /><h3 className="text-lg tracking-[-0.02em]">{skill.name}</h3></div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
