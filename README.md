# Teo Portfolio

An incrementally modernized developer portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS, and a GSAP-ready animation foundation.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page is composed in `app/page.tsx`; content sections live under `components/sections`.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

## Motion debugging

Reusable scroll reveals are opt-in through `data-motion` attributes. To display ScrollTrigger markers during local development, start the app with:

```bash
NEXT_PUBLIC_GSAP_DEBUG=true npm run dev
```

Markers are disabled in production regardless of the environment variable.
