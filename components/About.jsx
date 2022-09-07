import React from "react";
// import Image from "next/image"

const About = () => {
	return (
		<div className="w-full md:h-screen p-2 flex items-center py-16">
			<div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
				<div className="col-span-2">
					<p className="uppercase text-xl tracking-widest text-[#5651e5]">
						About
					</p>
					<h2 className="py-4">Who I Am</h2>
					<p className="py-2 text-gray-600">
						&#8725;&#8725; !Normal Web Developer
					</p>
					<p className="py-2 text-gray-600">
						Follow along as I Build a NEXT JS Portfolio Website With Tailwind
						CSS. I wanted to update the portfolio and since I am starting to
						learn Next JS I thought I would build the new version with Next JS
						using Tailwind CSS for the styling.
					</p>
					<p className="py-2 text-gray-600">
						Lots of really cool features in Next JS - most known for server side
						rending, lazy loading images, and a built in routing system. We be
						utilizing server side rending in this particular build, however we
						do incorporate lazy loading images as well as the built in router.
						(Just to be clear to take advantage of lazy loading you must use the
						component imported from next/image. Images used as will not be lazy
						loaded. Thanks for following along!
					</p>
					<p className="py-2 text-gray-600 underline cursor-pointer">
						Check out some of my last projects.
					</p>
				</div>
				<div className="w-full h-auto m-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300">
					<img
						className="rounded-xl"
						src="https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default About;
