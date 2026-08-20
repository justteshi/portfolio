import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PlaygroundSection from "@/components/sections/PlaygroundSection";
import StackSection from "@/components/sections/StackSection";
import Navbar from "@/components/layout/Navbar";
import GlobalMotion from "@/components/animation/GlobalMotion";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <PlaygroundSection />
        <StackSection />
        <ContactSection />
      </main>
      <GlobalMotion />
    </>
  );
}
