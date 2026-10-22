import { useEffect, useRef, useState } from "react";

const WORDS = ["THINK.", "PROMPT.", "BUILD.", "LEARN.", "REPEAT."];

export default function StickyReveal() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height - window.innerHeight);
      
      const index = Math.min(
        Math.floor(scrollProgress * WORDS.length),
        WORDS.length - 1
      );
      
      if (index >= 0) {
        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Kita buang bg-bg-alt, jadi transparan ngikutin background di atasnya
    <div ref={containerRef} className="relative h-[500vh] bg-transparent border-t border-line/30">
      
      {/* Gradasi dari atas (nyatu sama About) ke bawah (gelap) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/50 to-bg pointer-events-none" />

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Glow */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-1000 ease-out"
          style={{
            background: "radial-gradient(circle at center, #8B5CF6 0%, transparent 50%)",
            transform: `scale(${1 + activeIndex * 0.2}) rotate(${activeIndex * 5}deg)`
          }}
        />

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-8">
          The Process
        </p>

        <div className="relative w-full flex justify-center items-center h-[300px]">
          {WORDS.map((word, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;

            return (
              <h2
                key={word}
                className={`absolute font-display text-[clamp(60px,12vw,200px)] font-bold tracking-tighter transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? "opacity-100 scale-100 blur-0 text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF3F] to-[#8B5CF6] translate-y-0"
                    : isPast
                      ? "opacity-0 scale-50 blur-md -translate-y-20 pointer-events-none"
                      : "opacity-0 scale-150 blur-md translate-y-20 pointer-events-none"
                }`}
              >
                {word}
              </h2>
            );
          })}
        </div>

        <div className="absolute bottom-12 flex gap-2">
          {WORDS.map((_, i) => (
            <div
              key={i}
              className={`h-1 transition-all duration-500 ${
                i === activeIndex ? "w-12 bg-accent" : "w-4 bg-line"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}