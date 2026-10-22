import { useEffect, useRef } from "react";

export function useSpringCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x, ty = y;
    let raf;

    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };

    const loop = () => {
      // 0.18 diubah jadi 0.35 biar lebih ngebut dan responsif
      x += (tx - x) * 0.35; 
      y += (ty - y) * 0.35;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return dotRef;
}