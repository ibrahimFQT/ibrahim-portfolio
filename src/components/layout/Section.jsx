import { useEffect, useRef, useState } from "react";

export default function Section({ id, number, title, children }) {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className="relative border-t border-line py-24 md:py-32 overflow-hidden"
    >
      {/* --- ANGKA RAKSASA DI BACKGROUND --- */}
      {/* Gw ganti opacity jadi 0.06 (lebih jelas), dan kasih text-stroke (outline) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 md:right-10 select-none font-display text-[250px] md:text-[450px] font-bold leading-none tracking-tighter"
        style={{
          top: `${5 + scrollProgress * 10}%`,
          transform: `translateY(-${scrollProgress * 100}px)`,
          // Outline lime tipis dengan isi transparan
          color: "transparent",
          WebkitTextStroke: "2px rgba(212, 255, 63, 0.15)", 
        }}
      >
        {number}
      </span>

      {/* Garis Vertikal Kiri (tumbuh ngikutin scroll) */}
      <div className="absolute left-6 top-0 h-full w-px bg-line/30 hidden md:block">
        <div 
          className="w-full bg-accent origin-top transition-transform duration-100 ease-linear"
          style={{ transform: `scaleY(${scrollProgress})` }}
        />
      </div>

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-12 gap-6 px-6 z-10">
        
        <div className="col-span-12 md:col-span-1">
          <div className="overflow-hidden">
            <span
              className={`block font-ui text-sm tracking-[0.12em] text-accent font-bold transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                visible ? "translate-y-0" : "translate-y-full"
              }`}
            >
              {number}
            </span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-10">
          {title && (
            <div className="overflow-hidden mb-10">
              <h2 
                className={`font-display text-[clamp(36px,5vw,72px)] font-semibold leading-[0.95] tracking-[-0.02em] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-full opacity-0 blur-sm"
                }`}
              >
                {title}
              </h2>
            </div>
          )}
          
          <div
            className={`transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-sm"
            }`}
            style={{
              transform: visible ? `translateY(${Math.max(0, (1 - scrollProgress) * 30)}px)` : undefined
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}