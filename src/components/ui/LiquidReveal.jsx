import { useRef, useEffect } from "react";

export default function LiquidReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor="dark"
      className="relative z-10 flex w-full items-center justify-center overflow-hidden border-y border-line bg-transparent py-32 md:py-48 backdrop-blur-md"
      style={{ "--x": "-9999px", "--y": "-9999px" }}
    >
      <div className="text-center font-display text-[clamp(50px,10vw,160px)] font-bold leading-[0.85] text-text/5 tracking-tighter select-none">
        BUILDING<br />THE FUTURE
      </div>

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-center font-display text-[clamp(50px,10vw,160px)] font-bold leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#8B5CF6] tracking-tighter select-none"
        style={{ clipPath: "circle(180px at var(--x) var(--y))" }}
      >
        BUILDING<br />THE FUTURE
      </div>
    </div>
  );
}