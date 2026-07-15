import { Instagram, Facebook, Music2, MessageCircle, Send } from "lucide-react";

const WHATSAPP_NUMBER = "905015851388"; // +90 501 585 13 88
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello ZAYD OUDS, I would like to enquire about a fragrance.",
)}`;
const TELEGRAM_URL = "https://t.me/zayd_OUDs";

export function Footer() {
  return (
    <footer id="story" className="relative bg-obsidian pt-16 pb-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10">
        <div className="w-24 h-px bg-gold/30" />
        <div className="text-gold/40 text-xl tracking-widest">✦</div>

        {/* Contact — WhatsApp & Telegram */}
        <div id="contact" className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/40" />
            <span className="text-[10px] tracking-[0.5em] text-gold-muted">DIRECT TO THE MAISON</span>
            <span className="h-px w-10 bg-gold/40" />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="group relative flex items-center gap-3 px-5 py-3 border border-gold/30 hover:border-gold transition-all duration-500 overflow-hidden hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 bg-gradient-radial-gold opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700" />
              <MessageCircle className="relative w-4 h-4 text-gold" />
              <span className="relative text-[10px] tracking-[0.4em] text-foreground group-hover:text-gold transition-colors">
                WHATSAPP · +90 501 585 13 88
              </span>
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message on Telegram"
              className="group relative flex items-center gap-3 px-5 py-3 border border-gold/30 hover:border-gold transition-all duration-500 overflow-hidden hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 bg-gradient-radial-gold opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700" />
              <Send className="relative w-4 h-4 text-gold" />
              <span className="relative text-[10px] tracking-[0.4em] text-foreground group-hover:text-gold transition-colors">
                TELEGRAM · @zayd_OUDs
              </span>
            </a>
          </div>
        </div>

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

      {/* Floating quick-contact — visible on every page */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp us"
          className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.45)] hover:scale-110 transition-transform duration-500"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
          <MessageCircle className="relative w-5 h-5" />
        </a>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram us"
          className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-[#229ED9] text-white shadow-[0_8px_28px_rgba(34,158,217,0.45)] hover:scale-110 transition-transform duration-500"
        >
          <Send className="relative w-5 h-5" />
        </a>
      </div>
    </footer>
  );
}
