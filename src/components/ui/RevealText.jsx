import { useEffect, useRef, useState } from "react";

export default function RevealText({ text, className = "" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1">
          <span
            className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "translate-y-0" : "translate-y-full"
            }`}
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}