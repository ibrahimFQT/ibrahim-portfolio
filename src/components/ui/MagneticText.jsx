import { useRef, useState, useEffect } from "react";

export default function MagneticText({ text, className = "" }) {
  // Pecah kalimat jadi per huruf
  const letters = text.split("");

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {letters.map((char, index) => (
        <MagneticLetter key={index} char={char} />
      ))}
    </span>
  );
}

// Komponen kecil buat nanganin tiap satu huruf
function MagneticLetter({ char }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = el.getBoundingClientRect();
      
      // Hitung jarak kursor ke tengah huruf
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      // Radius "tolakan" magnet (jarak kursor biar huruf bereaksi)
      const radius = 80; 
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < radius) {
        // Kalau kursor deket, tolak hurufnya menjauh
        const force = (radius - distance) / radius;
        // Math.min/max biar huruf gak mental kemana-mana
        const moveX = Math.max(-20, Math.min(20, distanceX * -force * 1.5));
        const moveY = Math.max(-20, Math.min(20, distanceY * -force * 1.5));
        setPosition({ x: moveX, y: moveY });
      } else {
        // Balik ke posisi normal
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Kalau spasinya (space), biarin kosong biar gak rusak layout
  if (char === " ") return <span>&nbsp;</span>;

  return (
    <span
      ref={ref}
      className="inline-block transition-transform duration-200 ease-out will-change-transform"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        // Warnanya jadi Lime pas dideketin kursor, kalau engga balik ke warna asli
        color: position.x !== 0 || position.y !== 0 ? "var(--color-accent)" : "inherit", 
      }}
    >
      {char}
    </span>
  );
}