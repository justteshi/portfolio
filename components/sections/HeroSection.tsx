import { FaArrowDownLong } from "react-icons/fa6";
import ActionLink from "@/components/ui/ActionLink";
import Container from "@/components/ui/Container";

export default function HeroSection() {
  return (
    <section id="home" className="flex min-h-svh items-end pt-28 pb-10 md:pt-36 md:pb-14">
      <Container>
        <p className="eyebrow mb-8">Front-end developer</p>
        <h1 className="display-type max-w-[12ch]">Digital experiences with clarity and character.</h1>
        <div className="mt-10 grid items-end gap-8 border-t border-line pt-6 md:grid-cols-[1fr_auto]">
          <p className="body-large text-muted">I&apos;m Teo, a developer building thoughtful interfaces for the modern web.</p>
          <div className="flex flex-wrap gap-3">
            <ActionLink href="#projects">Selected work</ActionLink>
            <ActionLink href="#contact" variant="outline">Get in touch</ActionLink>
          </div>
        </div>
        <a href="#about" className="mt-12 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest" aria-label="Scroll to about section">Explore <FaArrowDownLong aria-hidden /></a>
      </Container>
    </section>
  );
}
