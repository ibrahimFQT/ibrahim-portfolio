import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Kembali
      </Link>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="text-center space-y-4 px-6 z-10"
      >
        <motion.p variants={textVariants} className="text-sm font-mono tracking-widest text-gray-500 uppercase">
          Under Construction
        </motion.p>
        
        <motion.h1 variants={textVariants} className="text-5xl md:text-7xl font-bold tracking-tighter">
          Coming Soon<span className="text-blue-500">.</span>
        </motion.h1>
        
        <motion.p variants={textVariants} className="text-gray-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
          I'm currently building this project. The thinking is done, the code is in progress. Check back soon.
        </motion.p>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>
    </main>
  );
}