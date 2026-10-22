import { useScrollProgress } from "../../hooks/useScrollProgress";

export default function ScrollThread() {
  const progress = useScrollProgress();
  return (
    <div
      aria-hidden="true"
      className="fixed left-6 top-0 z-40 hidden h-screen w-px bg-line md:block"
    >
      <div
        className="w-full origin-top bg-accent"
        style={{ height: `${progress * 100}%`, transition: "height 80ms linear" }}
      />
    </div>
  );
}