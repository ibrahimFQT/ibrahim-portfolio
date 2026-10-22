import { useRef, useState } from "react";

export default function MagneticButton({ children, className = "", ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    // Bagi dengan angka lebih besar = tarikan lebih halus
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? "transform 0.5s ease-out" : "none",
        display: "inline-block",
      }}
    >
      <div {...props} style={{ transform: "inherit", cursor: "pointer" }}>
        {children}
      </div>
    </div>
  );
}