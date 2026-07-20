import { useRef, useState } from "react";
import { PRODUCTS, type CatalogProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { Plus } from "lucide-react";

function flyToBag(fromEl: HTMLElement, imgSrc: string) {
  const bag = document.getElementById("cart-icon");
  if (!bag) return;
  const start = fromEl.getBoundingClientRect();
  const end = bag.getBoundingClientRect();
  const clone = document.createElement("img");
  clone.src = imgSrc;
  clone.style.cssText = `position:fixed;left:${start.left}px;top:${start.top}px;width:${start.width}px;height:${start.height}px;object-fit:cover;z-index:200;pointer-events:none;border:1px solid rgba(212,175,55,0.5);transition:all .8s cubic-bezier(.5,-.2,.7,.4);`;
  document.body.appendChild(clone);
  requestAnimationFrame(() => {
    clone.style.left = end.left + "px";
    clone.style.top = end.top + "px";
    clone.style.width = "20px";
    clone.style.height = "20px";
    clone.style.opacity = "0";
    clone.style.transform = "rotate(30deg)";
  });
  setTimeout(() => clone.remove(), 850);
}

function Card({ p }: { p: Product }) {
  const { add } = useCart();
  const { t } = useI18n();
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-gold/20 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:border-gold/70 group-hover:shadow-[0_0_35px_-2px_rgba(212,175,55,0.55)]">
        <div className="absolute inset-0 bg-gradient-radial-gold opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700 pointer-events-none" />
        <img
          ref={imgRef}
          src={p.image}
          alt={p.name}
          width={768}
          height={1024}
          loading="lazy"
          className="relative w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 rounded-lg ring-0 ring-gold/0 group-hover:ring-1 group-hover:ring-gold/60 transition-all duration-500 pointer-events-none" />
      </div>

      <div className="mt-4 text-center px-2">
        <div className="text-[10px] tracking-[0.4em] text-gold-muted mb-1.5 uppercase">{p.collection}</div>
        <h3 className="font-serif-display text-xl sm:text-2xl text-gold group-hover:text-gold-bright transition-colors">{p.name}</h3>
        <div className="mt-1 text-sm text-gold/80 tracking-[0.25em]">${p.price}</div>
      </div>

      <button
        onClick={() => {
          if (imgRef.current) flyToBag(imgRef.current, p.image);
          setTimeout(() => add(p), 100);
        }}
        className="mt-4 self-center flex items-center gap-2 px-6 py-2.5 text-[10px] tracking-[0.4em] text-gold border border-gold/40 rounded-sm hover:bg-gold hover:text-obsidian hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all duration-300"
      >
        <Plus className="w-3 h-3" />
        {t("product.add")}
      </button>
    </article>
  );
}

import { useFilter } from "@/lib/filter";
import { X } from "lucide-react";

export function ProductGrid() {
  const { t } = useI18n();
  const { category, season, clear } = useFilter();

  const filtered = PRODUCTS.filter(
    (p) =>
      (!category || p.category === category) &&
      (!season || p.season === season),
  );
  const display = filtered.length ? filtered : PRODUCTS;
  const isFiltered = !!(category || season);

  return (
    <section id="collections" className="relative py-24 px-6 bg-obsidian">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6 mb-14">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-[11px] tracking-[0.5em] text-gold">{t("products.title")}</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        {isFiltered && (
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="text-[11px] tracking-[0.35em] text-gold-muted">FILTER:</span>
            {category && (
              <span className="text-[11px] tracking-[0.35em] text-gold border border-gold/40 px-3 py-1.5 uppercase">
                {category}
              </span>
            )}
            {season && (
              <span className="text-[11px] tracking-[0.35em] text-gold border border-gold/40 px-3 py-1.5 uppercase">
                {season}
              </span>
            )}
            <button
              onClick={clear}
              className="flex items-center gap-1 text-[11px] tracking-[0.3em] text-foreground/60 hover:text-gold transition-colors"
            >
              <X className="w-3 h-3" /> CLEAR
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {display.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
