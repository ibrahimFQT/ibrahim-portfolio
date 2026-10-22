import { useState, useEffect, useRef } from "react";
import Preloader from "./components/ui/Preloader";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import LiquidReveal from "./components/ui/LiquidReveal";
import StickyReveal from "./components/sections/StickyReveal";
import Projects from "./components/sections/Projects";
import TheLab from "./components/sections/TheLab";
import Contact from "./components/sections/Contact";
import Marquee from "./components/ui/Marquee";
import CursorDot from "./components/ui/CursorDot";
import ScrollThread from "./components/ui/ScrollThread";
import PromptBar from "./components/ui/PromptBar";
import EasterEgg from "./components/ui/EasterEgg";
import LiveClock from "./components/ui/LiveClock";
import ScrambleText from "./components/ui/ScrambleText";
import GlowDivider from "./components/ui/GlowDivider";
import WhatsAppButton from "./components/ui/WhatsAppButton";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false); 
  const [timeOfDay, setTimeOfDay] = useState("night"); 
  const spotlightRef = useRef(null);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setTimeOfDay("morning");
    else if (hour >= 12 && hour < 18) setTimeOfDay("afternoon");
    else setTimeOfDay("night");

    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      const timer = setTimeout(() => setShowContent(true), 400);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        spotlightRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      
      <div className="grid-bg" aria-hidden="true" />
      <div ref={spotlightRef} className="global-spotlight" aria-hidden="true" />
      
      <div className={`aurora-bg aurora-${timeOfDay}`} aria-hidden="true">
        <div className="aurora-blob aurora-purple" />
        <div className="aurora-blob aurora-lime" />
      </div>
      <div className="noise" aria-hidden="true" />

      <CursorDot />
      <ScrollThread />
      <EasterEgg />
      <Navbar />
      <WhatsAppButton />

      <main className="relative z-10">
        <div className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showContent 
            ? "opacity-100 blur-0 translate-y-0" 
            : "opacity-0 blur-xl translate-y-12"
        }`}>
          <Hero />
        </div>
        
        <Marquee text="THINK · PROMPT · BUILD · " />
        <LiquidReveal />
        <About />
        <GlowDivider />
        <StickyReveal />
        <Marquee text="DESIGN · CODE · STRATEGY · " reverse />
        <Projects />
        <TheLab />
        <Contact />
      </main>
      
      <footer className="relative z-10 bg-bg-alt overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-6 pt-16 pb-12 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-20">
          <div>
            <p className="font-display text-3xl font-bold mb-2">Ibrahim<span className="text-accent">.</span></p>
            <p className="font-ui text-xs text-muted uppercase tracking-widest">Think. Prompt. Build.</p>
          </div>
          <div className="flex flex-col gap-2 font-ui text-sm md:items-center">
            <p className="text-muted">Based in Tangerang Selatan, ID.</p>
            <p className="text-muted">Always open for collaboration.</p>
          </div>
          <div className="flex flex-col md:items-end justify-between gap-8">
            <LiveClock />
            <p className="font-ui text-xs text-muted">© 2026 Ibrahim. All rights reserved.</p>
          </div>
        </div>

        <div className="w-full flex justify-center pb-12 opacity-15 hover:opacity-100 transition-opacity duration-1000 cursor-default">
          <h1 className="font-display text-[15vw] md:text-[18vw] font-bold leading-[0.75] tracking-tighter text-text whitespace-nowrap">
            <ScrambleText text="THANK YOU" />
          </h1>
        </div>
        <div className="border-t border-line py-4 bg-bg relative z-20">
          <Marquee text="IBRAHIM · TANGSEL · 2026 · " />
        </div>
      </footer>

      <div className="h-24 bg-bg w-full" />
      <PromptBar />
    </>
  );
}