import { cn } from "@/lib/cn";

type SectionHeadingProps = { eyebrow: string; title: string; description?: string; className?: string };

export default function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <header className={cn("grid gap-8 md:grid-cols-[minmax(10rem,0.35fr)_1fr] md:gap-12", className)} data-motion="reveal">
      <p className="eyebrow pt-2">{eyebrow}</p>
      <div>
        <h2 className="heading-type">{title}</h2>
        {description ? <p className="body-large mt-6 text-muted">{description}</p> : null}
      </div>
    </header>
  );
}
