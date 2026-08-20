import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AboutSection() {
  return (
    <section id="about" className="section-shell section-rule scroll-mt-20">
      <Container>
        <SectionHeading eyebrow="01 / About" title="Building beyond the expected." />
        <div className="mt-16 grid gap-10 md:grid-cols-[0.75fr_1fr] md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-panel">
            <Image className="object-cover grayscale" src="https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?auto=format&fit=crop&w=900&q=85" alt="Developer working at a computer" fill sizes="(min-width: 768px) 42vw, 100vw" />
          </div>
          <div className="flex flex-col justify-between gap-10">
            <div className="space-y-6 text-lg leading-relaxed text-muted md:text-xl">
              <p>I&apos;m a front-end developer interested in the place where considered design meets reliable engineering.</p>
              <p>I use modern web technologies to turn ideas into clear, responsive experiences—balancing visual detail, usability, and performance.</p>
            </div>
            <a href="#projects" className="w-fit border-b border-ink pb-1 font-mono text-xs font-semibold tracking-widest uppercase">View selected projects</a>
          </div>
        </div>
      </Container>
    </section>
  );
}
