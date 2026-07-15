import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Plus, ArrowLeft, Sun, Snowflake, Sparkles, Flame, Layers } from "lucide-react";
import { PRODUCTS, ALL_NOTES, type Note } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { CartProvider } from "@/lib/cart";
import { I18nProvider } from "@/lib/i18n";
import { FilterProvider } from "@/lib/filter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const CATEGORIES = ["men", "women", "oud", "perfume"] as const;

const searchSchema = z.object({
  category: fallback(z.string(), "").default(""),
  q: fallback(z.string(), "").default(""),
  notes: fallback(z.string(), "").default(""), // comma-separated
  min: fallback(z.number(), 0).default(0),
  max: fallback(z.number(), 500).default(500),
  mood: fallback(z.string(), "").default(""), // all | summer | winter | new | bestseller
});

const MOODS = [
  { id: "",           label: "ALL",         icon: Layers,     hint: "The full maison" },
  { id: "summer",     label: "SUMMER",      icon: Sun,        hint: "Bright, salt & citrus" },
  { id: "winter",     label: "WINTER",      icon: Snowflake,  hint: "Amber & smoked oud" },
  { id: "new",        label: "NEW",         icon: Sparkles,   hint: "Just arrived" },
  { id: "bestseller", label: "BESTSELLERS", icon: Flame,      hint: "Most loved" },
] as const;

export const Route = createFileRoute("/collection")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "The Collection — ZAYD OUDS" },
      { name: "description", content: "Discover the ZAYD OUDS collection — rare oud, liquid gold and midnight amber. Filter by category, notes and price." },
      { property: "og:title", content: "The Collection — ZAYD OUDS" },
      { property: "og:description", content: "Filter and explore our luxury oud & perfume maison." },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  return (
    <I18nProvider>
      <FilterProvider>
        <CartProvider>
          <div className="relative min-h-screen bg-obsidian">
            <Header />
            <main className="pt-28">
              <Discovery />
            </main>
            <Footer />
            <CartDrawer />
          </div>
        </CartProvider>
      </FilterProvider>
    </I18nProvider>
  );
}

function Discovery() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const category = search.category.toLowerCase();
  const activeNotes = search.notes ? (search.notes.split(",").filter(Boolean) as Note[]) : [];
  const [minP, maxP] = [Math.max(0, search.min), Math.min(1000, search.max || 500)];

  const [q, setQ] = useState(search.q);
  useEffect(() => { setQ(search.q); }, [search.q]);

  // debounce q
  useEffect(() => {
    const id = setTimeout(() => {
      if (q !== search.q) navigate({ search: (p: typeof search) => ({ ...p, q }), replace: true });
    }, 220);
    return () => clearTimeout(id);
  }, [q]);

  const setParam = (patch: Partial<typeof search>) =>
    navigate({ search: (p: typeof search) => ({ ...p, ...patch }), replace: true });

  const toggleNote = (n: Note) => {
    const next = activeNotes.includes(n) ? activeNotes.filter((x) => x !== n) : [...activeNotes, n];
    setParam({ notes: next.join(",") });
  };

  const mood = search.mood;

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (category && p.category !== category) return false;
      if (mood === "summer" && p.season !== "summer") return false;
      if (mood === "winter" && p.season !== "winter") return false;
      if (mood === "new" && p.season !== "new") return false;
      if (mood === "bestseller" && !p.bestseller) return false;
      if (activeNotes.length && !activeNotes.every((n) => p.notes.includes(n))) return false;
      if (p.price < minP || p.price > maxP) return false;
      if (q) {
        const hay = `${p.name} ${p.collection} ${p.sensory} ${p.notes.join(" ")}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [category, mood, activeNotes.join(","), minP, maxP, q]);

  // auto-suggest
  const suggestions = useMemo(() => {
    if (!q || q.length < 1) return [];
    const ql = q.toLowerCase();
    return PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(ql) || p.collection.toLowerCase().includes(ql),
    ).slice(0, 5);
  }, [q]);
  const [focused, setFocused] = useState(false);

  return (
    <section className="relative px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header block */}
        <div className="text-center mb-14">
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] text-gold-muted hover:text-gold transition-colors mb-6">
            <ArrowLeft className="w-3 h-3" /> RETURN TO MAISON
          </Link>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-[10px] tracking-[0.5em] text-gold">THE COLLECTION</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <h1 className="font-serif-display text-5xl md:text-7xl text-foreground">
            Discover Your <em className="text-gradient-gold not-italic">Signature</em>
          </h1>
          <p className="mt-5 text-sm tracking-[0.2em] text-foreground/60 max-w-xl mx-auto">
            A curated maison of rare oud, liquid gold and midnight amber. Explore by essence, note and desire.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10 relative">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/70 pointer-events-none" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 180)}
              placeholder="Search fragrance, collection, note…"
              className="w-full bg-transparent border-b border-gold/25 focus:border-gold/80 pl-12 pr-10 py-4 text-sm tracking-[0.25em] text-foreground placeholder:text-foreground/30 outline-none transition-all duration-500"
            />
            <span className="pointer-events-none absolute left-0 -bottom-px h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700" />
            {q && (
              <button onClick={() => { setQ(""); setParam({ q: "" }); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gold-muted hover:text-gold">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <AnimatePresence>
            {focused && suggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 right-0 mt-2 border border-gold/25 bg-obsidian/95 backdrop-blur-xl z-30 divide-y divide-gold/10"
              >
                {suggestions.map((s) => (
                  <li key={s.id}>
                    <button
                      onMouseDown={() => { setQ(s.name); setParam({ q: s.name }); }}
                      className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-gold/10 transition-colors"
                    >
                      <img src={s.image} alt="" className="w-10 h-12 object-cover border border-gold/20" />
                      <div>
                        <div className="text-[11px] tracking-[0.3em] text-gold-muted">{s.collection}</div>
                        <div className="text-sm text-foreground font-serif-display">{s.name}</div>
                      </div>
                      <div className="ml-auto text-xs text-gold">${s.price}</div>
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Filter grid */}
        <div className="grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-14">
          {/* Filter panel */}
          <aside className="space-y-10">
            <FilterGroup title="ESSENCE">
              <div className="flex flex-wrap gap-2">
                <Pill active={!category} onClick={() => setParam({ category: "" })}>ALL</Pill>
                {CATEGORIES.map((c) => (
                  <Pill key={c} active={category === c} onClick={() => setParam({ category: c })}>
                    {c.toUpperCase()}
                  </Pill>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="NOTES">
              <div className="flex flex-wrap gap-2">
                {ALL_NOTES.map((n) => (
                  <Pill key={n} active={activeNotes.includes(n)} onClick={() => toggleNote(n)}>
                    {n.toUpperCase()}
                  </Pill>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="PRICE">
              <PriceSlider
                min={0} max={500}
                lower={minP} upper={maxP}
                onChange={(lo, hi) => setParam({ min: lo, max: hi })}
              />
              <div className="mt-3 flex justify-between text-[10px] tracking-[0.3em] text-gold-muted">
                <span>${minP}</span><span>${maxP}</span>
              </div>
            </FilterGroup>

            {(category || activeNotes.length || minP > 0 || maxP < 500 || q) && (
              <button
                onClick={() => navigate({ search: { category: "", q: "", notes: "", min: 0, max: 500 }, replace: true })}
                className="flex items-center gap-2 text-[10px] tracking-[0.4em] text-foreground/60 hover:text-gold transition-colors"
              >
                <X className="w-3 h-3" /> CLEAR ALL
              </button>
            )}
          </aside>

          {/* Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] tracking-[0.4em] text-gold-muted">
                {filtered.length} {filtered.length === 1 ? "ESSENCE" : "ESSENCES"}
              </span>
              <span className="text-[10px] tracking-[0.4em] text-gold-muted hidden sm:block">CURATED · MMXXV</span>
            </div>

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(6px)" }}
                    transition={{ duration: 0.7, delay: Math.min(i, 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProductCard p={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-24 border border-gold/15">
                <div className="text-[10px] tracking-[0.4em] text-gold-muted mb-2">NO ESSENCES FOUND</div>
                <div className="text-foreground/60 text-sm">Refine your ritual — adjust essence, note or price.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] tracking-[0.4em] text-gold">{title}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
      </div>
      {children}
    </div>
  );
}

function Pill({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-3.5 py-1.5 text-[10px] tracking-[0.35em] transition-all duration-500 border ${
        active
          ? "border-gold text-obsidian bg-gradient-to-r from-gold-bright to-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          : "border-gold/25 text-foreground/70 hover:border-gold/70 hover:text-gold"
      }`}
    >
      {children}
    </button>
  );
}

function PriceSlider({ min, max, lower, upper, onChange }: {
  min: number; max: number; lower: number; upper: number;
  onChange: (lo: number, hi: number) => void;
}) {
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="relative h-6">
      <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-gold/15" />
      <div
        className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-gold-bright to-gold shadow-[0_0_12px_rgba(212,175,55,0.6)]"
        style={{ left: `${pct(lower)}%`, right: `${100 - pct(upper)}%` }}
      />
      <input
        type="range" min={min} max={max} value={lower}
        onChange={(e) => onChange(Math.min(Number(e.target.value), upper - 10), upper)}
        className="range-thumb absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
      />
      <input
        type="range" min={min} max={max} value={upper}
        onChange={(e) => onChange(lower, Math.max(Number(e.target.value), lower + 10))}
        className="range-thumb absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
      />
    </div>
  );
}

function ProductCard({ p }: { p: (typeof PRODUCTS)[number] }) {
  const { add } = useCart();
  const imgRef = useRef<HTMLImageElement>(null);
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col bg-gradient-to-b from-charcoal/40 to-obsidian border border-gold/15 hover:border-gold/60 transition-colors duration-700"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial-gold opacity-0 group-hover:opacity-50 blur-3xl transition-opacity duration-1000" />
        <img
          ref={imgRef}
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="relative w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
        <div className="absolute top-3 left-3 text-[9px] tracking-[0.4em] text-gold-muted border border-gold/30 px-2 py-1 bg-obsidian/60 backdrop-blur">
          {p.category.toUpperCase()}
        </div>
      </div>

      <div className="p-6 space-y-3">
        <div className="text-[10px] tracking-[0.4em] text-gold-muted">{p.collection}</div>
        <h3 className="font-serif-display text-2xl text-foreground">{p.name}</h3>
        <p className="text-xs text-foreground/60 leading-relaxed line-clamp-2 italic font-serif-display">
          {p.sensory}
        </p>
        <div className="flex flex-wrap gap-1 pt-1">
          {p.notes.map((n) => (
            <span key={n} className="text-[9px] tracking-[0.3em] text-gold/80 border border-gold/20 px-2 py-0.5">{n.toUpperCase()}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gold/15">
          <span className="text-gold tracking-[0.2em] text-sm">${p.price}</span>
          <button
            onClick={() => add(p)}
            className="relative overflow-hidden group/btn flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.35em] text-gold border border-gold/40"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold-bright to-gold translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            <span className="relative flex items-center gap-2 group-hover/btn:text-obsidian transition-colors duration-500">
              <Plus className="w-3 h-3" /> ADD TO LOUNGE
            </span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
