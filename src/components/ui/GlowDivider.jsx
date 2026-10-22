export default function GlowDivider() {
  return (
    <div className="relative w-full h-24 flex items-center justify-center overflow-hidden bg-transparent">
      
      {/* Garis Kiri (Memudar ke kanan) */}
      <div className="absolute left-0 w-1/2 h-px bg-gradient-to-r from-transparent to-line/50" />
      
      {/* Bola Cahaya di Tengah */}
      <div className="relative z-10 h-2 w-2 rounded-full bg-accent shadow-[0_0_15px_#D4FF3F,0_0_30px_#D4FF3F] animate-pulse" />

      {/* Garis Kanan (Memudar ke kiri) */}
      <div className="absolute right-0 w-1/2 h-px bg-gradient-to-l from-transparent to-line/50" />
      
    </div>
  );
}