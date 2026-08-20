import carmonImage from "@/public/assets/projects/carmon.png";
import eaexpoImage from "@/public/assets/projects/eaexpo.png";
import eventsImage from "@/public/assets/projects/events.png";
import excelsiorImage from "@/public/assets/projects/excelsior_clinic.png";
import expenseCalculatorImage from "@/public/assets/projects/expense_calculator.png";
import mentaImage from "@/public/assets/projects/menta_social_app.png";
import modiImage from "@/public/assets/projects/modi.png";
import schoolImage from "@/public/assets/projects/school_frontend.png";
import type { Project, Skill } from "@/types/portfolio";

export const projects: Project[] = [
  { slug: "carmon", title: "Carmon", image: carmonImage, href: "/projects/carmon", builtWith: "WordPress" },
  { slug: "modi", title: "MODI", image: modiImage, href: "/projects/modi", builtWith: "React JS" },
  { slug: "eaexpo", title: "EAEXPO", image: eaexpoImage, href: "/projects/eaexpo", builtWith: "Django" },
  { slug: "expense-calculator", title: "Expense Calculator", image: expenseCalculatorImage, href: "/projects/expense-calculator", builtWith: "Django" },
  { slug: "excelsior", title: "Excelsior Clinic", image: excelsiorImage, href: "/projects/excelsior", builtWith: "Django / React JS" },
  { slug: "events-abrites", title: "Events Abrites", image: eventsImage, href: "/projects/events-abrites", builtWith: "Django" },
  { slug: "school-layout", title: "School Layout", image: schoolImage, href: "/projects/school-layout", builtWith: "Django" },
  { slug: "menta-social", title: "Ment Social App", image: mentaImage, href: "/projects/menta-social", builtWith: "React JS" },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const skills: Skill[] = [
  { name: "HTML", image: "/assets/skills/html.png" },
  { name: "CSS", image: "/assets/skills/css.png" },
  { name: "Sass", image: "/assets/skills/sass.png" },
  { name: "JavaScript", image: "/assets/skills/js.png" },
  { name: "Python", image: "/assets/skills/python.png" },
  { name: "Django", image: "/assets/skills/django.png" },
  { name: "React", image: "/assets/skills/react.png" },
  { name: "Git", image: "/assets/skills/git.png" },
];
