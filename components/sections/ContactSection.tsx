import Container from "@/components/ui/Container";

export default function ContactSection() {
  return (
    <section id="contact" className="section-shell section-rule scroll-mt-20 bg-ink text-canvas">
      <Container>
        <p className="eyebrow mb-10 text-canvas before:bg-signal">04 / Contact</p>
        <h2 className="heading-type max-w-[12ch]" data-motion="reveal">Have a project in mind? Let&apos;s make it real.</h2>
        <div className="mt-16 grid gap-12 border-t border-white/20 pt-8 md:grid-cols-[0.7fr_1.3fr]" data-motion="reveal">
          <div><p className="body-large text-white/60">I&apos;m available for freelance or full-time positions. Send a note and let&apos;s talk.</p></div>
          <form className="grid gap-6" action="https://getform.io/f/a49e115e-1ffd-44d7-abf8-7a4a7fb19ac3" method="POST">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="font-mono text-xs uppercase tracking-widest text-white/60">Name<input className="mt-3 w-full border-b border-white/30 bg-transparent py-3 text-base text-canvas outline-none focus:border-signal" name="name" type="text" required /></label>
              <label className="font-mono text-xs uppercase tracking-widest text-white/60">Email<input className="mt-3 w-full border-b border-white/30 bg-transparent py-3 text-base text-canvas outline-none focus:border-signal" name="email" type="email" required /></label>
            </div>
            <label className="font-mono text-xs uppercase tracking-widest text-white/60">Message<textarea className="mt-3 min-h-32 w-full resize-y border-b border-white/30 bg-transparent py-3 text-base text-canvas outline-none focus:border-signal" name="message" required /></label>
            <button className="min-h-12 w-fit rounded-full border border-canvas bg-canvas px-6 font-mono text-xs font-semibold tracking-widest text-ink uppercase transition-colors hover:border-signal hover:bg-signal" type="submit">Send message</button>
          </form>
        </div>
        <footer className="mt-24 flex flex-col gap-4 border-t border-white/20 pt-6 font-mono text-xs uppercase tracking-widest text-white/50 sm:flex-row sm:justify-between"><p>Teodor Hristov © {new Date().getFullYear()}</p><p>Built with Next.js + GSAP</p></footer>
      </Container>
    </section>
  );
}
