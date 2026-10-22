import { useState, useRef, useEffect } from "react";
import { promptResponses, fallbackResponse, suggestions } from "../../data/promptResponses";

export default function PromptBar() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isGhostTyping, setIsGhostTyping] = useState(false);
  const inputRef = useRef(null);

  // 1. Munculin Prompt Bar kalau di-scroll
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2. LOGIKA GHOST TYPING (Ngetik sendiri kalau diem)
  useEffect(() => {
    let timeout;
    const ghostText = "try 'projects'...";

    const startGhostSequence = () => {
      setIsGhostTyping(true);
      let i = 0;
      
      const typeInterval = setInterval(() => {
        setInput(ghostText.slice(0, i + 1));
        i++;
        
        if (i === ghostText.length) {
          clearInterval(typeInterval);
          
          setTimeout(() => {
            let j = ghostText.length;
            const deleteInterval = setInterval(() => {
              setInput(ghostText.slice(0, j - 1));
              j--;
              if (j === 0) {
                clearInterval(deleteInterval);
                setIsGhostTyping(false);
              }
            }, 30);
          }, 1500);
        }
      }, 40);
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      if (input === "" && !isGhostTyping) {
        timeout = setTimeout(startGhostSequence, 3000);
      }
    };

    resetTimer();
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [input, isGhostTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isGhostTyping) return;
    const key = input.trim().toLowerCase();
    if (!key) return;

    if (key === "work" || key === "projects") {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    }
    if (key === "contact") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }

    const reply = promptResponses[key] || fallbackResponse;
    setAnswer(reply);
    setInput("");
  };

  const pickSuggestion = (s) => {
    setInput(s);
    inputRef.current?.focus();
  };

  return (
    // z-index gw turunin jadi z-[90], biar kursor dot (z-[9999]) bisa lewat di depannya
    <div
      className={`fixed bottom-6 left-1/2 z-[90] w-[calc(100%-48px)] max-w-[720px] -translate-x-1/2 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      {answer.length > 0 && (
        <div
          aria-live="polite"
          className="mb-3 border border-line bg-bg-raise p-5 font-mono text-[13px] leading-relaxed text-text shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
        >
          {answer.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex h-16 items-center gap-3 border-2 border-line bg-bg-raise px-5 shadow-[0_15px_50px_rgba(0,0,0,0.9)] transition-all duration-300 focus-within:border-accent"
      >
        <span className="font-mono text-sm text-accent">&gt;</span>
        <label htmlFor="prompt-input" className="sr-only">Ask me anything</label>
        <input
          id="prompt-input"
          ref={inputRef}
          value={input}
          onChange={(e) => {
            if (!isGhostTyping) setInput(e.target.value);
          }}
          placeholder="ask me anything…"
          className={`flex-1 bg-transparent font-mono text-sm text-text placeholder:text-muted focus:outline-none transition-colors duration-300 ${isGhostTyping ? "text-accent" : ""}`}
          autoComplete="off"
        />
        
        {/* TOMBOL KODE (SKILLS, DLL) DIBALIKIN KE SINI */}
        <div className="hidden gap-2 md:flex">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => pickSuggestion(s)}
              className="border border-line bg-bg px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {s}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}