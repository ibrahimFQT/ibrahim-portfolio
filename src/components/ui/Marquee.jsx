export default function Marquee({ text = "THINK · PROMPT · BUILD · ", reverse = false }) {
  const content = text.repeat(6);
  return (
    <div
      aria-hidden="true"
      className="relative z-10 overflow-hidden border-y border-line py-4"
    >
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        <span className="whitespace-nowrap font-ui text-sm uppercase tracking-[0.3em] text-muted">
          {content}
        </span>
        <span className="whitespace-nowrap font-ui text-sm uppercase tracking-[0.3em] text-muted">
          {content}
        </span>
      </div>
    </div>
  );
}