import { useEffect, useRef } from "react";

export default function PreviewCard({ project, mouse }) {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!project || !mouse) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf;
    const loop = () => {
      pos.current.x += (mouse.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.y - pos.current.y) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x + 24}px, ${pos.current.y - 100}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [project, mouse]);

  if (!project) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-48 w-72 border border-line bg-bg-raise p-5 md:block"
    >
      <p className="font-ui text-[10px] uppercase tracking-[0.12em] text-accent">
        {project.category}
      </p>
      <p className="mt-3 font-display text-2xl">{project.title}</p>
      <p className="absolute bottom-5 left-5 font-ui text-xs text-muted">{project.year}</p>
    </div>
  );
}