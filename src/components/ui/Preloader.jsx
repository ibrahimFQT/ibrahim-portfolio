import { useState, useEffect } from "react";

export default function Preloader({ onFinish }) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const diff = 100 - current;
      const step = Math.max(1, Math.floor(diff / 10));
      current = Math.min(current + step, 100);
      setCount(current);

      if (current === 100) {
        clearInterval(interval);
        // Tunggu setengah detik, baru tirai terangkat
        setTimeout(() => setIsExiting(true), 500);
        // Kasih waktu 1.2 detik buat animasi tirai selesai, baru hilangin dari DOM
        setTimeout(onFinish, 1700); 
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden pointer-events-none">
      
      {/* Tirai Hitam yang bakal terangkat */}
      <div
        className={`absolute inset-0 flex flex-col justify-between bg-bg p-8 md:p-12 transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        } pointer-events-auto`}
      >
        <div className="font-ui text-xs uppercase tracking-[0.12em] text-muted">
          Ibrahim <span className="text-accent">·</span> Portfolio
        </div>
        
        <div className="flex flex-col items-end">
          <h1 className="font-display text-[15vw] font-bold leading-none tracking-tighter text-text">
            {count}%
          </h1>
          <p className="mt-4 font-mono text-xs text-accent uppercase tracking-widest">
            Loading Experience
          </p>
        </div>
      </div>
    </div>
  );
}