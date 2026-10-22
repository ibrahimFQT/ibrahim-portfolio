import { useState } from "react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const phoneNumber = "6282120892322"; 
  const message = "Halo Ibrahim, saya lihat portfolio kamu dan tertarik untuk ngobrol!";
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-12 right-6 md:right-8 z-[999] group flex items-center justify-center"
      aria-label="Direct WhatsApp Line"
    >
      {/* Radar */}
      <div className="absolute inset-0 rounded-full border border-[#25D366]/30 animate-radar" />
      
      {/* Bola Kaca Utama (The Orb) */}
      <div 
        className={`relative flex items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden
          ${isHovered 
            ? "w-24 h-24 bg-[#25D366]/10 border-[#25D366] shadow-[0_0_40px_rgba(37,211,102,0.4)]" 
            : "w-12 h-12 bg-bg-alt/80 border-line shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          }
        `}
      >
        {/* Efek Cahaya Dalam */}
        <div className={`absolute inset-0 bg-gradient-to-tr from-[#25D366]/20 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />

        {/* Ikon WhatsApp */}
        <svg 
          viewBox="0 0 24 24" 
          className={`transition-all duration-500 relative z-10
            ${isHovered 
              ? "w-8 h-8 fill-[#25D366] -translate-y-1.5" // Pas hover: Hijau Neon
              : "w-5 h-5 fill-white" // Pas diem: Putih Bersih
            }
          `}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 21.018c-1.637 0-3.243-.42-4.666-1.217l-.335-.19-3.47.91.928-3.385-.207-.35a9.793 9.793 0 0 1-1.516-5.233c0-5.428 4.417-9.845 9.845-9.845 2.63 0 5.102 1.025 6.962 2.884a9.79 9.79 0 0 1 2.884 6.961c0 5.428-4.417 9.845-9.845 9.845h-.58zm0-18.168c-4.588 0-8.323 3.735-8.323 8.323 0 1.625.47 3.206 1.354 4.562l.21.322-.554 2.02 2.067-.542.348.206a8.28 8.28 0 0 0 4.227 1.156h.577c4.589 0 8.323-3.735 8.323-8.323a8.32 8.32 0 0 0-2.452-5.915 8.314 8.314 0 0 0-5.777-2.808zm4.602 11.824c-.252.126-1.491.735-1.723.82-.232.084-.4.126-.567-.126-.168-.252-.652-.82-.798-.987-.146-.167-.294-.188-.546-.063-.252.125-1.067.394-2.032 1.255-.75.67-1.258 1.495-1.405 1.747-.147.251-.015.388.11.513.114.113.252.294.378.44.126.147.168.252.252.42.084.167.042.315-.021.44-.063.127-.567 1.366-.777 1.868-.204.49-.413.423-.568.43-.146.007-.315.007-.483.007a.916.916 0 0 1-.672-.315c-.232-.252-.887-.866-.887-2.11 0-1.245.908-2.448 1.033-2.616.126-.168 1.785-2.726 4.323-3.818 2.538-1.093 2.538-.728 2.998-.685.46.042 1.49.609 1.701 1.198.21.588.21 1.092.147 1.197-.063.106-.232.168-.483.294z" />
        </svg>

        {/* Teks Rahasia yang muncul pas di-hover */}
        <span 
          className={`absolute bottom-3 font-mono text-[8px] uppercase tracking-widest text-[#25D366] transition-all duration-500
            ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          Direct Line
        </span>
      </div>

      {/* Teks Panah di luar orb pas di-hover */}
      <div 
        className={`absolute right-full mr-4 flex items-center gap-2 font-ui text-xs font-bold tracking-widest text-text transition-all duration-500 whitespace-nowrap
          ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}
        `}
      >
        LET'S TALK
        <span className="text-[#25D366] text-sm">↗</span>
      </div>
    </a>
  );
}