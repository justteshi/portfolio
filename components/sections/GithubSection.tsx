import { FaArrowRightLong, FaGithub } from "react-icons/fa6";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { githubProfile, githubRepositories } from "@/data/github";

export default function GithubSection() {
  return (
    <section id="github" className="section-shell section-rule scroll-mt-20">
      <Container>
        <SectionHeading eyebrow="06 / GitHub" title="Public work, experiments, and works in progress." description="A curated view of recent repositories from the verified profile behind this portfolio." />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.38fr_1fr] lg:gap-12">
          <aside className="flex h-fit flex-col justify-between rounded-[var(--radius-lg)] bg-ink p-6 text-canvas lg:sticky lg:top-24 lg:min-h-80" data-motion="reveal">
            <FaGithub size={38} aria-hidden />
            <div className="mt-20">
              <p className="text-3xl font-semibold tracking-[-0.04em]">@{githubProfile.username}</p>
              <p className="mt-2 text-white/55">{githubProfile.name} · {githubProfile.location}</p>
              <p className="mt-8 font-mono text-xs uppercase tracking-widest text-white/55">{githubProfile.publicRepositories} public repositories</p>
            </div>
          </aside>

          <div className="border-t border-line" data-motion-group>
            {githubRepositories.map((repository, index) => (
              <a key={repository.name} data-motion-item href={repository.url} target="_blank" rel="noreferrer" className="group grid gap-5 border-b border-line py-7 transition-colors hover:bg-panel sm:grid-cols-[0.08fr_0.55fr_0.25fr_auto] sm:items-center sm:px-4">
                <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                <div><h3 className="text-2xl md:text-3xl">{repository.name}</h3><p className="mt-2 max-w-xl leading-relaxed text-muted">{repository.description}</p></div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted"><p>{repository.language}</p><p className="mt-2"><time dateTime={repository.updated}>{repository.updated}</time></p></div>
                <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-2" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 font-mono text-xs uppercase tracking-widest text-muted sm:flex-row sm:items-center sm:justify-between" data-motion="reveal">
          <p>Verified snapshot / <time dateTime={githubProfile.verifiedAt}>{githubProfile.verifiedAt}</time></p>
          <a className="inline-flex items-center gap-3 border-b border-ink pb-1 text-ink" href={githubProfile.url} target="_blank" rel="noreferrer">View full profile <FaArrowRightLong aria-hidden /></a>
        </div>
      </Container>
    </section>
  );
}
