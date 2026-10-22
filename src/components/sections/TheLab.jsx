import { useState, useRef } from "react";
import Section from "../layout/Section";
import MagneticText from "../ui/MagneticText"; // <--- Import efek huruf berhamburan

const EXPERIMENTS = [
  { name: "Generative UI", tool: "React + Vite", desc: "Building layouts that adapt to user input.", status: "In Progress" },
  { name: "Prompt Engineering", tool: "GPT-4 / Claude", desc: "Testing structured vs unstructured prompts for product copy.", status: "Completed" },
  { name: "Microservices 101", tool: "Docker / Node", desc: "Splitting a monolith into small, testable services.", status: "Learning" },
  { name: "Brand Identity", tool: "Figma", desc: "Creating a streetwear mockup from scratch.", status: "Completed" },
  { name: "Database Design", tool: "PostgreSQL", desc: "Designing relational schemas for e-commerce.", status: "Learning" },
  { name: "Motion Interactions", tool: "CSS / GSAP", desc: "Making scroll experiences feel physical.", status: "In Progress" },
];

function LabCard({ exp }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const tiltX = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    const tiltY = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative border border-line bg-bg-alt p-6 transition-all duration-300 h-full overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.02, 1.02, 1.02)` 
          : "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
        borderColor: isHovered ? "rgba(212, 255, 63, 0.4)" : "var(--color-line)",
        boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(212, 255, 63, 0.15), transparent 80%)`,
        }}
      />

      <div 
        className="relative z-10 h-full flex flex-col justify-between transition-transform duration-300"
        style={{ transform: isHovered ? "translateZ(30px)" : "translateZ(0)" }}
      >
        <div className="flex items-start justify-between mb-4">
          <span className="font-mono text-[10px] tracking-[0.1em] text-muted uppercase group-hover:text-accent transition-colors">
            {exp.tool}
          </span>
          <span className="font-mono text-[10px] text-muted">
            [{exp.status}]
          </span>
        </div>
        
        <div>
          <h3 className="font-display text-xl font-medium mb-2 text-text group-hover:text-white">
            {exp.name}
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {exp.desc}
          </p>
        </div>
      </div>

      <div className={`absolute inset-0 border transition-colors duration-300 pointer-events-none ${isHovered ? "border-accent/50" : "border-transparent"}`} />
    </div>
  );
}

export default function TheLab() {
  return (
    <Section id="lab" number="03" title="The Lab.">
      
      {/* EFEK MAGNETIC TEXT DIBALIKIN KE SINI */}
      <div className="mb-16 max-w-[720px] text-xl md:text-2xl leading-relaxed text-muted">
        <MagneticText text="Not everything makes it to a final project. This is where I test ideas, break things, and learn how technology actually works behind the scenes." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXPERIMENTS.map((exp, i) => (
          <LabCard key={i} exp={exp} />
        ))}
      </div>
    </Section>
  );
}