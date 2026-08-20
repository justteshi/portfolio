import Image from "next/image";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full lg:h-screen">
      <div className="m-auto w-full max-w-[1240px] px-2 py-16">
        <p className="text-xl tracking-widest text-[#5651e5] uppercase">Contact</p>
        <h2 className="py-4">Get In Touch</h2>
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="col-span-3 h-full w-full rounded-xl p-4 shadow-xl shadow-gray-400 lg:col-span-2">
            <div className="h-full lg:p-4">
              <Image className="h-auto w-full rounded-xl duration-300 ease-in hover:scale-105" src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=500&q=60" alt="Web development workspace" width={500} height={333} sizes="(min-width: 1024px) 40vw, 100vw" />
              <h2 className="py-2">Teodor Hristov</h2>
              <p>Front-End Developer</p>
              <p className="py-4">I am available for freelance or full-time positions. Contact me and let&apos;s talk.</p>
              <p className="pt-8 uppercase">Connect With Me</p>
              <div className="flex items-center justify-between py-4">
                <a href="https://www.linkedin.com/in/clint-briley-50056920a/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><span className="block rounded-full p-6 shadow-lg shadow-gray-400 duration-300 ease-in hover:scale-110"><FaLinkedinIn /></span></a>
                <a href="https://github.com/fireclint" target="_blank" rel="noreferrer" aria-label="GitHub"><span className="block rounded-full p-6 shadow-lg shadow-gray-400 duration-300 ease-in hover:scale-110"><FaGithub /></span></a>
                <span className="rounded-full p-6 shadow-lg shadow-gray-400"><AiOutlineMail /></span>
                <Link href="/resume" aria-label="Resume"><span className="block rounded-full p-6 shadow-lg shadow-gray-400 duration-300 ease-in hover:scale-110"><BsPersonLinesFill /></span></Link>
              </div>
            </div>
          </div>
          <div className="col-span-3 h-auto w-full rounded-xl shadow-xl shadow-gray-400 lg:p-4">
            <form className="p-4" action="https://getform.io/f/a49e115e-1ffd-44d7-abf8-7a4a7fb19ac3" method="POST" encType="multipart/form-data">
              <div className="grid w-full gap-4 py-2 md:grid-cols-2">
                <label className="flex flex-col text-sm uppercase">Name<input className="mt-2 rounded-lg border-2 border-gray-300 p-3 normal-case" type="text" name="name" /></label>
                <label className="flex flex-col text-sm uppercase">Phone Number<input className="mt-2 rounded-lg border-2 border-gray-300 p-3 normal-case" type="tel" name="phone" /></label>
              </div>
              <label className="flex flex-col py-2 text-sm uppercase">Email<input className="mt-2 rounded-lg border-2 border-gray-300 p-3 normal-case" type="email" name="email" /></label>
              <label className="flex flex-col py-2 text-sm uppercase">Subject<input className="mt-2 rounded-lg border-2 border-gray-300 p-3 normal-case" type="text" name="subject" /></label>
              <label className="flex flex-col py-2 text-sm uppercase">Message<textarea className="mt-2 rounded-lg border-2 border-gray-300 p-3 normal-case" rows={10} name="message" /></label>
              <button className="mt-4 w-full p-4" type="submit">Send Message</button>
            </form>
          </div>
        </div>
        <div className="flex justify-center py-12"><Link href="/" aria-label="Back to top"><span className="block rounded-full p-4 shadow-lg shadow-gray-400 duration-300 ease-in hover:scale-110"><HiOutlineChevronDoubleUp className="text-[#5651e5]" size={30} /></span></Link></div>
      </div>
    </section>
  );
}
