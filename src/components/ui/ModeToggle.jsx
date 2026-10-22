import { useEffect, useState } from "react";

export default function ModeToggle() {
  const [build, setBuild] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("mode-build", build);
  }, [build]);

  return (
    <button
      type="button"
      onClick={() => setBuild((b) => !b)}
      aria-label={build ? "Switch to Think mode" : "Switch to Build mode"}
      className="font-ui text-[13px] text-muted transition-colors hover:text-accent"
    >
      {build ? "BUILD" : "THINK"} <span className="text-accent">⟷</span>
    </button>
  );
}