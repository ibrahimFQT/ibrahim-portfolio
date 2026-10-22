import { useState, useEffect, useRef } from "react";

const SYMBOLS = "!<>-_\\/[]{}—=+*^?#________";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Mode 1: Kalau hover, SELURUH KATA ngacak pakai SIMBOL
function ScrambleWord({ text }) {
  const [display, setDisplay] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isHovered) {
      let frame = 0;
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDisplay(
          text.split("").map((char) => {
            if (char === " ") return " ";
            return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          }).join("")
        );
        frame++;
        if (frame > 50) { // Durasi ngacak (50 * 50ms = 2.5 detik)
          clearInterval(intervalRef.current);
        }
      }, 50);
    } else {
      clearInterval(intervalRef.current);
      setDisplay(text);
    }
    return () => clearInterval(intervalRef.current);
  }, [text, isHovered]);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-block transition-colors duration-300 ${isHovered ? "text-accent" : ""}`}
      style={{ whiteSpace: "pre" }}
    >
      {display}
    </span>
  );
}

// Mode 2: Kalau hover, HANYA HURUF ITU yang ngacak pakai ABJAD
function ScrambleLetter({ char }) {
  const [display, setDisplay] = useState(char);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (char === " ") {
      setDisplay(" ");
      return;
    }

    if (isHovered) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDisplay(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
      }, 50);
    } else {
      clearInterval(intervalRef.current);
      setDisplay(char);
    }

    return () => clearInterval(intervalRef.current);
  }, [char, isHovered]);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-block transition-colors duration-300 ${isHovered ? "text-accent" : ""}`}
      style={{ whiteSpace: "pre" }}
    >
      {display}
    </span>
  );
}

export default function ScrambleText({ text, className = "", mode = "letter" }) {
  // Kalau mode="code", pake ScrambleWord (satu kata ngacak barengan)
  if (mode === "code") {
    return <ScrambleWord text={text} />;
  }

  // Kalau mode="letter", pecah per huruf
  return (
    <span className={`inline-flex flex-wrap animate-slow-pulse ${className}`}>
      {text.split("").map((char, index) => (
        <ScrambleLetter key={index} char={char} />
      ))}
    </span>
  );
}