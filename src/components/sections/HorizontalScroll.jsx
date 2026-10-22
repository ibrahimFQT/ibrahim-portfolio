import { useEffect, useRef, useState } from "react";

const PANELS = [
  { id: "01", label: "THINK", title: "Problem first.", body: "I start with the problem, not the tool. Understanding what actually needs solving is half the work.", tags: ["research", "structure", "clarity"] },
  { id: "02", label: "PROMPT", title: "AI as a partner.", body: "AI is a thinking partner, not a shortcut. I use it to explore options, then check the result myself.", tags: ["ChatGPT", "Claude", "iteration"] },
  { id: "03", label: "BUILD", title: "Make it real.", body: "If I can't explain it, I don't understand it yet. So I build: websites, prototypes, small experiments.", tags: ["React", "Tailwind", "Vite"] },
  { id: "04", label: "LEARN", title: "Since 2023.", body: "IoT and WordPress, then JavaScript, then React, then databases. Each year, one more layer.", tags: ["2023 → 2026"] },
  { id: "05", label: "NOW", title: "Still building.", body: "Currently: finishing this portfolio, learning how real systems scale, and looking for the next problem.", tags: ["open to work", "Tangsel"] },
];

export default function HorizontalScroll() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionH = section.offsetHeight;
      const viewport = window.innerHeight;

      const scrolled = window.scrollY - sectionTop;
      const max = sectionH - viewport;
      const p = Math.min(Math.max(scrolled / max, 0), 1);
      
      setProgress(p);

      // --- RUMUS ANTI-MENTOK VERSI FINAL ---
      // Gw itung lebar anak-anaknya secara langsung biar 100% akurat
      let totalWidth = 0;
      Array.from(track.children).forEach((child) => {
        totalWidth += child.offsetWidth;
      });
      // Tambahin gap (32px * 4 celah)
      totalWidth += 32 * (PANELS.length - 1);

      // Max shift = total lebar - lebar layar
      const maxShift = totalWidth - window.innerWidth;
      
      const easeP = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      track.style.transform = `translate3d(${-easeP * Math.max(0, maxShift)}px, 0, 0)`;

      const viewportCenter = window.innerWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      Array.from(track.children).forEach((child, index) => {
        const childRect = child.getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;
        const distance = Math.abs(viewportCenter - childCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveIndex(closestIndex);
    };

    const loop = () => {
      onScroll();
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative z-10 border-t border-line bg-transparent" 
      style={{ height: "400vh" }} 
      aria-label="How I work"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        
        <div className="absolute top-12 left-6 right-6 h-[2px] bg-line/50 hidden md:block">
          <div 
            className="h-full bg-accent origin-left transition-transform duration-75 ease-linear"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        {/* Padding tengah biar kotak 1 dan 5 pas di tengah layar */}
        <div ref={trackRef} className="flex gap-8 px-6 md:px-[calc((100vw-520px)/2)] will-change-transform">
          {PANELS.map((p, index) => {
            const isActive = index === activeIndex;
            return (
              <article
                key={p.id}
                className={`flex h-[60vh] w-[80vw] shrink-0 flex-col justify-between border p-8 md:w-[520px] md:p-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive 
                    ? "bg-bg-raise/40 backdrop-blur-xl border-accent scale-100 opacity-100 shadow-[0_0_40px_rgba(212,255,63,0.15)]" 
                    : "bg-bg/20 backdrop-blur-sm border-line scale-[0.92] opacity-30 blur-[1px]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-ui text-xs tracking-[0.12em] transition-colors duration-500 ${isActive ? "text-accent" : "text-muted"}`}>
                    {p.id} — {p.label}
                  </span>
                  <span className="font-mono text-xs text-muted">/05</span>
                </div>

                <div>
                  <h3 className="font-display text-[clamp(40px,5vw,72px)] font-bold leading-[0.9] tracking-[-0.03em]">
                    {p.title}
                  </h3>
                  <p className="mt-6 max-w-[420px] text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className={`border px-2 py-1 font-mono text-[11px] transition-colors duration-500 ${isActive ? "border-accent/50 text-accent bg-accent/10" : "border-line text-muted"}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}