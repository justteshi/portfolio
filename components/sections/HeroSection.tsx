import { AiOutlineMail } from "react-icons/ai";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section id="home" className="h-screen w-full text-center">
      <div className="mx-auto flex h-full w-full max-w-[1240px] items-center justify-center p-2">
        <div>
          <p className="text-sm tracking-widest text-gray-600 uppercase">Lets create something</p>
          <h1 className="py-4 text-gray-700">Hi, I&apos;m <span className="text-[#5651e5]">Teo</span></h1>
          <h1 className="py-4 text-gray-700">A Front-End Web Developer</h1>
          <p className="m-auto max-w-[70%] py-4 text-gray-600">Lets create something</p>
          <div className="m-auto flex max-w-[330px] items-center justify-between py-4" aria-label="Social links">
            {[FaLinkedinIn, FaGithub, AiOutlineMail, BsPersonLinesFill].map((Icon, index) => (
              <div key={index} className="cursor-pointer rounded-full p-6 shadow-lg shadow-gray-400 duration-300 ease-in hover:scale-110"><Icon /></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
