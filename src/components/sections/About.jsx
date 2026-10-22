import Section from "../layout/Section";
import MagneticText from "../ui/MagneticText"; // <--- IMPORT MAGNETIC TEXT

const JOURNEY = [
  { year: "2023", text: "IoT, HTML/CSS, WordPress. Built my first websites." },
  { year: "2024", text: "JavaScript. Started building mobile apps through web tools." },
  { year: "2025", text: "React, Tailwind, Flutter. Moved into component-based thinking." },
  { year: "2026", text: "Localhost, databases, microservices. Learning how real systems work." },
];

const PRINCIPLES = [
  { label: "THINK", text: "Understand the problem before touching the tools." },
  { label: "PROMPT", text: "Use AI with clear direction, then check the result." },
  { label: "BUILD", text: "Turn the idea into something you can actually open." },
];

export default function About() {
  return (
    <Section id="about" number="01" title="Curious by nature. Learning by building.">
      
      {/* PARAGRAF MAGNETIC */}
      <div className="space-y-6 max-w-[640px] mb-20 text-base md:text-lg text-muted leading-normal">
        <p>
          <MagneticText text="I'm interested in how technology, business, and creativity come together to solve problems. I use AI to explore ideas, compare options, and improve how I work — not to skip the thinking part." />
        </p>
        <p>
          <MagneticText text="I'm still learning, and I treat every project as practice: something to build, break, and understand better." />
        </p>
      </div>

      {/* KOTAK THINK / PROMPT / BUILD */}
      <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-3">
        {PRINCIPLES.map((p) => (
          <div key={p.label} className="group relative overflow-hidden border border-line bg-bg-alt p-5 transition-all duration-500 hover:border-accent hover:bg-bg-raise h-full">
            <p className="font-ui text-xs uppercase tracking-[0.12em] text-accent">{p.label}</p>
            <p className="mt-3 text-sm text-muted leading-relaxed group-hover:text-text transition-colors duration-300">{p.text}</p>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>

      {/* LEARNING JOURNEY */}
      <div className="mt-20">
        <p className="mb-6 font-ui text-xs uppercase tracking-[0.12em] text-muted">Learning journey</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((j) => (
            <div key={j.year} className="group relative border border-line bg-bg-alt p-5 transition-all duration-300 hover:-translate-y-2 hover:bg-bg-raise h-full overflow-hidden">
              <p className="font-display text-4xl font-bold text-text/10 transition-colors duration-300 group-hover:text-accent">
                {j.year}
              </p>
              <div className="mt-3 border-t border-line pt-3 relative z-10">
                <p className="text-sm text-muted leading-relaxed group-hover:text-text transition-colors duration-300">
                  {j.text}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-accent to-transparent transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}