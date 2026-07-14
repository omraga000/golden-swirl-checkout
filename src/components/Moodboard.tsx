import m1 from "@/assets/moodboard/mood-1.jpg.asset.json";
import m2 from "@/assets/moodboard/mood-2.jpg.asset.json";
import m3 from "@/assets/moodboard/mood-3.jpg.asset.json";
import m4 from "@/assets/moodboard/mood-4.jpg.asset.json";
import m5 from "@/assets/moodboard/mood-5.jpg.asset.json";
import m6 from "@/assets/moodboard/mood-6.jpg.asset.json";
import m7 from "@/assets/moodboard/mood-7.jpg.asset.json";
import m8 from "@/assets/moodboard/mood-8.jpg.asset.json";

type Tile = { src: string; label: string; note: string; span: string };

const TILES: Tile[] = [
  { src: m1.url, label: "Alpine Silver",     note: "Frozen lakes · cedar · silver air",       span: "md:col-span-4 md:row-span-2 aspect-[3/4]" },
  { src: m4.url, label: "Riviera Noir",      note: "Amalfi dusk · gold leather · sea salt",   span: "md:col-span-4 md:row-span-2 aspect-[3/4]" },
  { src: m3.url, label: "Aventus Legacy",    note: "Blackcurrant · pineapple · birch smoke",  span: "md:col-span-4 md:row-span-2 aspect-[3/4]" },
  { src: m8.url, label: "Chimilka Bloom",    note: "Iris · peach · white silk",               span: "md:col-span-3 aspect-[4/5]" },
  { src: m5.url, label: "Stronger Amber",    note: "Warm amber · vanilla · velvet",           span: "md:col-span-3 aspect-[4/5]" },
  { src: m6.url, label: "Santal Blanc",      note: "Cedarwood · leather · paper",             span: "md:col-span-3 aspect-[4/5]" },
  { src: m7.url, label: "Match Sauv",        note: "Marble · citrus · cool stone",            span: "md:col-span-3 aspect-[4/5]" },
  { src: m2.url, label: "Match Avetos",      note: "Green fig · vetiver · morning mist",      span: "md:col-span-12 aspect-[21/9]" },
];

export function Moodboard() {
  return (
    <section className="relative bg-obsidian py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-radial-gold blur-3xl" />
      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center gap-6 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-[11px] tracking-[0.5em] text-gold">ATMOSPHERE</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
        </div>
        <h2 className="text-center font-serif-display text-3xl md:text-4xl text-foreground mb-3">
          Worlds We Bottle
        </h2>
        <p className="text-center text-[12px] tracking-[0.3em] text-gold-muted uppercase mb-14">
          An editorial of scent · light · terrain
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 md:auto-rows-[180px]">
          {TILES.map((t, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden border border-gold/20 hover:border-gold/60 transition-colors duration-500 ${t.span}`}
            >
              <img
                src={t.src}
                alt={t.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-[10px] tracking-[0.4em] text-gold mb-1.5">N° {String(i + 1).padStart(2, "0")}</div>
                <div className="font-serif-display text-lg md:text-xl text-foreground leading-tight">{t.label}</div>
                <div className="mt-1 text-[10px] tracking-[0.28em] text-gold-muted uppercase">{t.note}</div>
              </figcaption>
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
