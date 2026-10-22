import { useState, useEffect } from "react";
import TypewriterSwap from "../ui/TypewriterSwap";

export default function Hero() {
  const [greeting, setGreeting] = useState("Hello");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: y * -20 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section className="relative mx-auto max-w-[1200px] px-6 pb-24 pt-32 md:pb-40 md:pt-40">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* KOLOM KIRI (TEKS) */}
        <div className="col-span-1 md:col-span-7 z-10">
          <p className="mb-6 font-ui text-xs uppercase tracking-[0.2em] text-muted">
            {greeting} <span className="text-accent">·</span> Student <span className="text-accent">·</span> Maker
          </p>

          <TypewriterSwap />

          <p className="mt-8 max-w-[520px] leading-relaxed text-muted text-lg">
            I'm Ibrahim, a student exploring AI, business, and creative technology.
            I like figuring out how things work, testing ideas, and turning what I
            learn into real projects.
          </p>

          <div className="mt-12 flex flex-wrap gap-8 font-ui text-[15px]">
            <a href="#work" data-cursor="open" className="group inline-flex items-center gap-2 text-text transition-colors hover:text-accent">
              Explore my work
              <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
            <a href="#about" data-cursor="scroll" className="inline-flex items-center gap-2 text-muted transition-colors hover:text-text">
              More about me <span>↓</span>
            </a>
          </div>
        </div>

        {/* KOLOM KANAN (FOTO DENGAN 3D TILT) */}
        <div 
          className="col-span-1 md:col-span-5 relative group mt-12 md:mt-0"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1000px" }}
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-accent to-[#8B5CF6] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700" />
          
          <div 
            className="relative border border-line bg-bg-alt p-2 overflow-hidden transition-transform duration-200 ease-out"
            style={{
              transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Viewfinder corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent transition-all duration-300 group-hover:w-10 group-hover:h-10 z-20" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent transition-all duration-300 group-hover:w-10 group-hover:h-10 z-20" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent transition-all duration-300 group-hover:w-10 group-hover:h-10 z-20" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent transition-all duration-300 group-hover:w-10 group-hover:h-10 z-20" />

            <div className="relative overflow-hidden aspect-[4/5] bg-bg">
              <img 
                src="/foto-ibrahim.jpg" 
                alt="Ibrahim" 
                className="w-full h-full object-cover object-[center_20%] grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            </div>

            <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/70 tracking-widest uppercase z-20">
              <p>[ Subject: Ibrahim ]</p>
              <p>[ Loc: Tangsel ]</p>
            </div>
            <div className="absolute top-6 right-6 font-mono text-[9px] text-accent tracking-widest uppercase z-20">
              REC ●
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}