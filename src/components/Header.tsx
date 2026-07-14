import { useState } from "react";
import { ShoppingBag, ChevronDown, Globe, Menu, X, Home } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useI18n, type Lang } from "@/lib/i18n";
import { useFilter, type Category, type Season } from "@/lib/filter";
import emblem from "@/assets/zayd-emblem.png";

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "men",     label: "MEN" },
  { key: "women",   label: "WOMEN" },
  { key: "oud",     label: "OUD" },
  { key: "perfume", label: "PERFUME" },
];

const SEASONS: { key: Season; label: string }[] = [
  { key: "summer", label: "SUMMER" },
  { key: "winter", label: "WINTER" },
  { key: "new",    label: "NEW" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const { lang, setLang } = useI18n();
  const { setFilter } = useFilter();
  const [langOpen, setLangOpen] = useState(false);
  const [hovered, setHovered] = useState<Category | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCat, setMobileCat] = useState<Category | null>(null);
  const navigate = useNavigate();

  const goHome = async () => {
    setFilter(null, null);
    setMobileOpen(false);
    setMobileCat(null);
    await navigate({ to: "/" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const choose = (c: Category, s: Season) => {
    setFilter(c, s);
    setHovered(null);
    setMobileOpen(false);
    setMobileCat(null);
    setTimeout(() => {
      document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-gold/20 backdrop-blur-xl bg-obsidian/70">
      <div className="max-w-7xl mx-auto px-6 h-24 md:h-28 grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6">
        {/* Logo left — click returns home */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); goHome(); }}
          aria-label="ZAYD OUDS — Home"
          className="group relative flex items-center shrink-0"
        >
          <span aria-hidden className="absolute inset-0 -m-3 rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.45),_transparent_65%)] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
            <span className="absolute -inset-y-4 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-0 group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
          </span>
          <img
            src={emblem}
            alt="ZAYD OUDS — Maison de Parfum"
            width={512}
            height={512}
            loading="eager"
            decoding="sync"
            className="relative h-20 md:h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.06] drop-shadow-[0_6px_18px_rgba(212,175,55,0.45)]"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-[11px] tracking-[0.35em] text-foreground/85">
          <button
            onClick={goHome}
            className="flex items-center gap-1.5 py-6 hover:text-gold transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            HOME
          </button>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className="relative"
              onMouseEnter={() => setHovered(cat.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link
                to="/collection"
                search={{ category: cat.key, q: "", notes: "", min: 0, max: 500 }}
                onClick={() => setHovered(null)}
                className="flex items-center gap-1.5 py-6 hover:text-gold transition-colors"
              >
                {cat.label}
                <ChevronDown className="w-3 h-3" />
              </Link>
              {hovered === cat.key && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full min-w-[160px] border border-gold/30 bg-obsidian/95 backdrop-blur-lg animate-fade-up">
                  {SEASONS.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => choose(cat.key, s.key)}
                      className="block w-full text-left px-5 py-3 text-[11px] tracking-[0.3em] text-foreground/70 hover:bg-gold/10 hover:text-gold transition-colors"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center justify-end gap-2 md:gap-4 shrink-0">
          <div className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen((v) => !v)}
              onBlur={() => setTimeout(() => setLangOpen(false), 150)}
              className="flex items-center gap-1.5 text-xs tracking-[0.2em] text-foreground/80 hover:text-gold transition-colors px-3 py-2"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang}
              <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 border border-gold/30 bg-obsidian/95 backdrop-blur-lg animate-fade-up z-50">
                {(["TR", "UZ", "RU"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onMouseDown={() => { setLang(l); setLangOpen(false); }}
                    className={`block w-full text-left px-4 py-2.5 text-xs tracking-[0.2em] hover:bg-gold/10 hover:text-gold transition-colors ${lang === l ? "text-gold" : "text-foreground/70"}`}
                  >
                    {l === "TR" ? "TÜRKÇE" : l === "UZ" ? "O'ZBEK" : "РУССКИЙ"}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            id="cart-icon"
            onClick={() => setOpen(true)}
            className="relative p-2 text-foreground hover:text-gold transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-gold-bright to-gold text-obsidian text-[10px] font-bold flex items-center justify-center animate-fade-up">
                {count}
              </span>
            )}
          </button>
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 text-foreground hover:text-gold transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden border-t border-gold/20 bg-obsidian/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-out ${
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 py-4 flex flex-col divide-y divide-gold/10">
          <button
            onClick={goHome}
            className="flex items-center gap-3 py-4 text-[12px] tracking-[0.35em] text-foreground hover:text-gold transition-colors"
          >
            <Home className="w-4 h-4 text-gold" /> HOME
          </button>

          {CATEGORIES.map((cat) => {
            const open = mobileCat === cat.key;
            return (
              <div key={cat.key} className="py-1">
                <button
                  onClick={() => setMobileCat(open ? null : cat.key)}
                  className="w-full flex items-center justify-between py-4 text-[12px] tracking-[0.35em] text-foreground hover:text-gold transition-colors"
                >
                  {cat.label}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180 text-gold" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="pl-4 pb-3 flex flex-col">
                      {SEASONS.map((s) => (
                        <button
                          key={s.key}
                          onClick={() => choose(cat.key, s.key)}
                          className="text-left py-2.5 text-[11px] tracking-[0.3em] text-foreground/70 hover:text-gold transition-colors"
                        >
                          — {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Language row */}
          <div className="py-4 flex items-center gap-3">
            <Globe className="w-4 h-4 text-gold" />
            {(["TR", "UZ", "RU"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-[11px] tracking-[0.3em] px-3 py-1.5 border transition-colors ${
                  lang === l ? "border-gold text-gold" : "border-gold/20 text-foreground/70 hover:text-gold hover:border-gold/50"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
