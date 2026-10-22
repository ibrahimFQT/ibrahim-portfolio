import { useState } from "react";

export default function ProjectRow({ project, onHover, onLeave }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    onHover(project, e); // Tetep jalanin preview card
  };

  return (
    <a
      href={project.href}
      data-cursor="view"
      onMouseEnter={(e) => onHover(project, e)}
      onMouseMove={handleMouseMove}
      onMouseLeave={onLeave}
      className="group relative flex items-center gap-6 border-b border-line px-4 py-8 transition-all duration-500 ease-out hover:scale-[1.01] hover:border-accent/50 z-10 hover:z-20 overflow-hidden bg-transparent"
    >
      {/* EFEK CAHAYA HIJAU NYEBAR DARI KURSOR */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, rgba(212, 255, 63, 0.15), transparent 80%)`
        }}
      />

      {/* Konten Kotak */}
      <span className="relative z-10 w-12 font-ui text-xs text-muted transition-colors duration-300 group-hover:text-accent">
        {project.id}
      </span>
      <span className="relative z-10 flex-1 font-display text-3xl font-medium md:text-5xl transition-colors duration-300 group-hover:text-white">
        {project.title}
      </span>
      <span className="relative z-10 hidden w-48 font-ui text-xs text-muted transition-colors duration-300 group-hover:text-accent/70 md:block">
        {project.category}
      </span>
      <span className="relative z-10 hidden w-16 font-ui text-xs text-muted transition-colors duration-300 group-hover:text-accent/70 md:block">
        {project.year}
      </span>
      <span className="relative z-10 text-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent">
        ↗
      </span>
    </a>
  );
}