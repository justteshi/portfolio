import Container from "@/components/ui/Container";
import { skills } from "@/data/portfolio";
import type { IconType } from "react-icons";
import { TbApi, TbLeaf, TbShoppingCartCode } from "react-icons/tb";
import {
  SiBootstrap,
  SiCss,
  SiDjango,
  SiDocker,
  SiDoctrine,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSass,
  SiStimulus,
  SiSymfony,
  SiTypescript,
  SiWoocommerce,
  SiWordpress,
} from "react-icons/si";

const technologyIcons: Record<string, IconType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  Sass: SiSass,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Bootstrap: SiBootstrap,
  Python: SiPython,
  Django: SiDjango,
  React: SiReact,
  PHP: SiPhp,
  Symfony: SiSymfony,
  Sylius: TbShoppingCartCode,
  Docker: SiDocker,
  WordPress: SiWordpress,
  WooCommerce: SiWoocommerce,
  "REST APIs": TbApi,
  jQuery: SiJquery,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  "Node.js": SiNodedotjs,
  Stimulus: SiStimulus,
  Twig: TbLeaf,
  Doctrine: SiDoctrine,
  Git: SiGit,
};

export default function StackSection() {
  return (
    <section id="stack" className="section-shell scroll-mt-20 overflow-hidden bg-panel text-ink">
      <Container>
        <header className="relative grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16" data-motion="reveal">
          <h2 className="text-[clamp(4rem,10vw,9rem)] leading-[0.76] font-bold tracking-[-0.075em] uppercase">
            <span className="block text-ink">Tools that</span>
            <span className="block text-accent">earn their</span>
            <span className="relative block w-fit text-ink">
              place.
              <span className="absolute -right-[0.28em] top-[0.02em] size-[0.16em] rounded-full bg-signal" aria-hidden />
            </span>
          </h2>

          <aside className="relative bg-signal p-7 shadow-[0.8rem_0.8rem_0_var(--accent)] sm:p-9 lg:-rotate-2">
            <span className="absolute right-5 top-2 font-mono text-[4.5rem] leading-none text-ink/10" aria-hidden>✦</span>
            <p className="relative text-[clamp(1.35rem,2vw,1.75rem)] leading-[1.22] font-semibold tracking-[-0.035em]">No loyalty to trends. Just the right technology for the product, the team, and the problem.</p>
            <div className="mt-9 flex items-end justify-between border-t border-ink/20 pt-4 font-mono text-[0.62rem] font-semibold tracking-[0.14em] uppercase">
              <span>Working toolkit</span>
              <span className="text-3xl leading-none font-bold tracking-[-0.08em]">{String(skills.length).padStart(2, "0")}</span>
            </div>
          </aside>
        </header>

        <div className="mt-[clamp(5rem,10vw,9rem)] bg-ink p-3 shadow-[0.9rem_0.9rem_0_var(--signal)] sm:p-4">
          <div className="mb-3 flex items-center justify-between px-2 py-2 font-mono text-[0.6rem] font-semibold tracking-[0.16em] text-white/40 uppercase sm:mb-4 sm:px-3">
            <span>Technology index</span>
          </div>

          <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" data-motion-group aria-label="Technologies">
            {skills.map((technology, index) => {
              const TechnologyIcon = technologyIcons[technology.name];
              const shouldExpandLast = index === skills.length - 1 && skills.length % 2 === 1;

              return (
                <li
                  key={technology.name}
                  data-motion-item
                  className={`group relative flex min-h-40 overflow-hidden bg-white/[0.055] p-5 text-canvas transition-[background-color,color,transform] duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:bg-signal hover:text-ink sm:min-h-48 sm:p-6 ${shouldExpandLast ? "sm:col-span-2 md:col-span-3 lg:col-span-2" : ""}`}
                >
                  <span className="relative z-10 flex w-full flex-col justify-between">
                    <span className="font-mono text-[0.58rem] tracking-[0.14em] text-white/35 transition-colors duration-500 group-hover:text-ink/45">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-[clamp(1.25rem,2.15vw,2.2rem)] leading-none font-semibold tracking-[-0.055em]">{technology.name}</span>
                  </span>
                  <TechnologyIcon className="pointer-events-none absolute -right-3 -top-3 size-28 rotate-[-8deg] text-white opacity-[0.12] transition-[opacity,transform] duration-500 ease-[var(--ease-out)] group-hover:rotate-0 group-hover:scale-110 group-hover:text-ink group-hover:opacity-[0.18] sm:size-36" aria-hidden />
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
