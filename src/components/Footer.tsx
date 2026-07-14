import { Instagram, Facebook, Music2 } from "lucide-react";

export function Footer() {
  return (
    <footer id="story" className="relative bg-obsidian pt-16 pb-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10">
        <div className="w-24 h-px bg-gold/30" />
        <div className="text-gold/40 text-xl tracking-widest">✦</div>
        <nav className="flex items-center gap-10 md:gap-16 text-[11px] tracking-[0.4em] text-foreground/70">
          <a href="#story" className="hover:text-gold transition-colors">ABOUT ZAYD OUDS</a>
          <a href="#contact" className="hover:text-gold transition-colors">CONTACT</a>
          <a href="#faqs" className="hover:text-gold transition-colors">FAQS</a>
        </nav>
        <div className="flex items-center gap-6 text-foreground/60">
          <a href="#" aria-label="Facebook" className="hover:text-gold transition-colors"><Facebook className="w-4 h-4" /></a>
          <a href="#" aria-label="Instagram" className="hover:text-gold transition-colors"><Instagram className="w-4 h-4" /></a>
          <a href="#" aria-label="TikTok" className="hover:text-gold transition-colors"><Music2 className="w-4 h-4" /></a>
        </div>
        <div className="text-[10px] tracking-[0.35em] text-foreground/30 pt-4">
          © {new Date().getFullYear()} ZAYD OUDS — MAISON DE PARFUM
        </div>
      </div>
    </footer>
  );
}
