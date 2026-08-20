import Image from "next/image";
import { skills } from "@/data/portfolio";

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full p-2 lg:h-screen">
      <div className="mx-auto flex h-full max-w-[1240px] flex-col justify-center">
        <p className="text-xl tracking-widest text-[#5651e5] uppercase">Skills</p>
        <h2>What I Can Do</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <article key={skill.name} className="rounded-xl p-6 shadow-xl duration-300 ease-in hover:scale-105">
              <div className="grid grid-cols-2 items-center justify-center gap-4">
                <div className="m-auto"><Image src={skill.image} width={64} height={64} alt={`${skill.name} logo`} /></div>
                <div className="flex flex-col items-center justify-center"><h3>{skill.name}</h3></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
