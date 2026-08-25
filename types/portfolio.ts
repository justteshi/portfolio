import type { StaticImageData } from "next/image";

export type Project = {
  slug: string;
  title: string;
  image: StaticImageData;
  href: string;
  builtWith: string;
};

export type Skill = {
  name: string;
  image?: string;
};
