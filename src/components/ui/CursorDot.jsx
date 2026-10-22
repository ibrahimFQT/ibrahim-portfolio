import { useEffect, useRef, useState } from "react";

export default function CursorDot() {
  const dotRef = useRef(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const onMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        setCursorText(target.getAttribute("data-cursor"));
        setIsHovering(true);
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  const isDarkMode = cursorText === "dark";
  const isViewMode = cursorText === "view";

  // Tampilan dot utama
  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex"
      style={{ willChange: "transform" }}
    >
      {/* Radar */}
      <div className={`absolute h-6 w-6 rounded-full border opacity-0 animate-radar ${isDarkMode ? "border-white/50" : "border-accent"}`} />

      {/* Dot Utama: Kalau view mode, opacity jadi 0 (hilang) */}
      <div
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
          isViewMode
            ? "opacity-0 h-0 w-0" // <--- DOT HILANG
            : isHovering
              ? isDarkMode
                ? "h-24 w-24 bg-white/5 backdrop-blur-md border border-white/30 text-white/50"
                : "h-20 w-20 bg-accent text-bg font-ui text-xs uppercase tracking-widest font-bold"
              : isDarkMode
                ? "h-8 w-8 bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                : "h-4 w-4 bg-accent mix-blend-difference"
        }`}
      >
        {isDarkMode ? "" : cursorText}
      </div>
    </div>
  );
}