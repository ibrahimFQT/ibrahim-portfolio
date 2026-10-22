import ModeToggle from "../ui/ModeToggle";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-40 w-full border-b border-line/0 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
        <a href="#" className="font-ui text-[13px] uppercase tracking-[0.12em]">
          Ibrahim <span className="text-accent">·</span>
        </a>
        <div className="flex items-center gap-8">
          <div className="flex gap-8 font-ui text-[13px] text-muted">
            <a href="#work" className="transition-colors hover:text-accent">Work</a>
            <a href="#about" className="transition-colors hover:text-accent">About</a>
            <a href="#contact" className="transition-colors hover:text-accent">Contact</a>
          </div>
          <div className="hidden md:block">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}