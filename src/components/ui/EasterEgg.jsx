import { useEffect, useState } from "react";

const SECRET = "ibrahim";

export default function EasterEgg() {
  const [open, setOpen] = useState(false);
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.length !== 1) return;
      setBuffer((prev) => {
        const next = (prev + e.key.toLowerCase()).slice(-SECRET.length);
        if (next === SECRET) setOpen(true);
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-bg/90 p-6"
      onClick={() => setOpen(false)}
    >
      <div
        className="max-w-[480px] border border-line bg-bg-alt p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-ui text-xs uppercase tracking-[0.12em] text-accent">
          You found the hidden part.
        </p>
        <h3 className="mt-4 font-display text-3xl">Good eye.</h3>
        <p className="mt-4 text-muted leading-relaxed">
          Most people scroll past. You typed something. That already says
          something about how you look at things.
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-8 font-ui text-[13px] text-muted transition-colors hover:text-accent"
        >
          ← back
        </button>
      </div>
    </div>
  );
}