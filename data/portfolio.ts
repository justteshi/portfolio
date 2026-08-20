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
  { title: "Carmon", image: carmonImage, href: "/carmon", builtWith: "WordPress" },
  { title: "MODI", image: modiImage, href: "/modi", builtWith: "React JS" },
  { title: "EAEXPO", image: eaexpoImage, href: "/eaexpo", builtWith: "Django" },
  { title: "Expense Calculator", image: expenseCalculatorImage, href: "/expense-calculator", builtWith: "Django" },
  { title: "Excelsior Clinic", image: excelsiorImage, href: "/excelsior", builtWith: "Django / React JS" },
  { title: "Events Abrites", image: eventsImage, href: "/events-abrites", builtWith: "Django" },
  { title: "School Layout", image: schoolImage, href: "/school-layout", builtWith: "Django" },
  { title: "Ment Social App", image: mentaImage, href: "/menta-social", builtWith: "React JS" },
];

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
