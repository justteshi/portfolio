import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="flex w-full items-center p-2 py-16 md:h-screen">
      <div className="m-auto max-w-[1240px] gap-8 md:grid md:grid-cols-3">
        <div className="col-span-2">
          <p className="text-xl tracking-widest text-[#5651e5] uppercase">About</p>
          <h2 className="py-4">Who I Am</h2>
          <p className="py-2 text-gray-600">&#8725;&#8725; !Normal Web Developer</p>
          <p className="py-2 text-gray-600">Follow along as I Build a NEXT JS Portfolio Website With Tailwind CSS. I wanted to update the portfolio and since I am starting to learn Next JS I thought I would build the new version with Next JS using Tailwind CSS for the styling.</p>
          <p className="py-2 text-gray-600">Lots of really cool features in Next JS - most known for server side rending, lazy loading images, and a built in routing system. We be utilizing server side rending in this particular build, however we do incorporate lazy loading images as well as the built in router. (Just to be clear to take advantage of lazy loading you must use the component imported from next/image. Images used as will not be lazy loaded. Thanks for following along!</p>
          <p className="cursor-pointer py-2 text-gray-600 underline">Check out some of my last projects.</p>
        </div>
        <div className="relative m-auto aspect-[774/516] h-auto w-full overflow-hidden rounded-xl p-4 shadow-xl shadow-gray-400 duration-300 ease-in hover:scale-105">
          <Image className="rounded-xl object-cover p-4" src="https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?auto=format&fit=crop&w=774&q=80" alt="Developer working at a computer" fill sizes="(min-width: 768px) 33vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
