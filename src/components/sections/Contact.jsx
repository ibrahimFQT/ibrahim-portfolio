import Section from "../layout/Section";
import MagneticButton from "../ui/MagneticButton";
import ScrambleText from "../ui/ScrambleText";

export default function Contact() {
  return (
    <Section id="contact" number="04" title="Have an idea in mind?">
      <p className="max-w-[520px] text-muted leading-relaxed">
        I'm always open to learning, exchanging ideas, and new opportunities.
      </p>
      
      <div className="mt-16 flex flex-col gap-12 md:flex-row md:gap-24">
        {/* Tombol Email */}
        <MagneticButton>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ibraheemonly1@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border-b border-line pb-2 font-ui text-2xl transition-colors hover:border-accent md:text-4xl"
          >
            {/* PAKE MODE CODE BIAR SELURUH KATA NGACAK JADI SIMBOL */}
            <ScrambleText text="Email" mode="code" className="text-text group-hover:text-accent" />
            <span className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent">↗</span>
          </a>
        </MagneticButton>

        {/* Tombol GitHub */}
        <MagneticButton>
          <a
            href="https://github.com/ibrahimFQT"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border-b border-line pb-2 font-ui text-2xl transition-colors hover:border-accent md:text-4xl"
          >
            <ScrambleText text="GitHub" mode="code" className="text-text group-hover:text-accent" />
            <span className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent">↗</span>
          </a>
        </MagneticButton>
      </div>
    </Section>
  );
}