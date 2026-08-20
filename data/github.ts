export type GithubRepository = {
  name: string;
  description: string;
  url: string;
  language: string;
  updated: string;
};

export const githubProfile = {
  username: "justteshi",
  name: "Teodor Hristov",
  url: "https://github.com/justteshi",
  location: "Sofia, Bulgaria",
  publicRepositories: 31,
  verifiedAt: "2026-08-20",
} as const;

export const githubRepositories: GithubRepository[] = [
  { name: "portfolio", description: "The source for this modernized Next.js portfolio.", url: "https://github.com/justteshi/portfolio", language: "TypeScript", updated: "2026-08-20" },
  { name: "complex-reports", description: "A recent public project written primarily in Rust.", url: "https://github.com/justteshi/complex-reports", language: "Rust", updated: "2026-08-14" },
  { name: "vellune-wp-theme", description: "A custom classic WordPress theme for a focused one-product WooCommerce store.", url: "https://github.com/justteshi/vellune-wp-theme", language: "PHP", updated: "2026-08-11" },
  { name: "traffic-calculator", description: "A commute planner for calculating a practical departure time for a fixed journey.", url: "https://github.com/justteshi/traffic-calculator", language: "PHP", updated: "2026-07-31" },
  { name: "menta-social-app", description: "A university social-application assignment using React and GraphQL.", url: "https://github.com/justteshi/menta-social-app", language: "JavaScript", updated: "2026-08-13" },
];
