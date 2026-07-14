import { useEffect, useState } from "react";
import { NEW_ARRIVALS } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export function PromoBanner() {
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIdx((i) => (i + 1) % NEW_ARRIVALS.length), 3500);
    return () => clearInterval(iv);
  }, []);
  const p = NEW_ARRIVALS[idx];

  return (
    <section className="relative border-y border-gold/20 bg-gradient-to-b from-obsidian via-charcoal/40 to-obsidian py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_oklch(0.78_0.14_85_/_0.08),_transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-6 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-xs tracking-[0.5em] text-gold font-display">{t("promo.title")}</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center min-h-[380px]">
          <div key={p.id + "-img"} className="relative aspect-[3/4] max-w-sm mx-auto animate-fade-up">
            <div className="absolute inset-0 bg-gradient-radial-gold blur-2xl opacity-70" />
            <img
              src={p.image}
              alt={p.name}
              width={768}
              height={1024}
              loading="lazy"
              className="relative w-full h-full object-cover border border-gold/30"
            />
          </div>
          <div key={p.id + "-txt"} className="animate-fade-up">
            <div className="text-[10px] tracking-[0.4em] text-gold-muted mb-3">{p.collection}</div>
            <h3 className="font-serif-display text-4xl md:text-5xl text-gradient-gold mb-4">{p.name}</h3>
            <p className="text-foreground/70 mb-6 max-w-md">{p.description}</p>
            <div className="text-2xl text-gold font-display">${p.price}</div>
            <div className="flex gap-1 mt-8">
              {NEW_ARRIVALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-px transition-all duration-500 ${i === idx ? "w-10 bg-gold" : "w-5 bg-gold/30"}`}
                  aria-label={`slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
