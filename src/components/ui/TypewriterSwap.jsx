import { useEffect, useState } from "react";

const WORDS = ["Build.", "Break.", "Learn.", "Build."];

export default function TypewriterSwap({ prefix = "Think. Prompt. " }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(WORDS[0]);
      return;
    }
    const word = WORDS[wordIndex];
    let timeout;

    if (phase === "typing") {
      if (display.length < word.length) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), 90);
      } else {
        timeout = setTimeout(() => setPhase("pause"), 1800);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("deleting"), 400);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), 45);
      } else {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [display, phase, wordIndex]);

  return (
    <h1 className="font-display text-[clamp(48px,9vw,150px)] font-bold leading-[0.9] tracking-[-0.04em]">
      {/* TEKS STATIS: Warna Putih (text-text) */}
      <span className="block text-text">{prefix}</span>
      
      {/* TEKS DINAMIS: Warna Lime (text-accent) */}
      <span className="block text-accent">
        {display}
        <span className="animate-pulse">|</span>
      </span>
    </h1>
  );
}