import { PRODUCTS } from "@/lib/products";
import { useFilter, type Category } from "@/lib/filter";

type Col = {
  title: string;
  image: string;
  category: Category;
};

// Pick one representative image per collection from existing products
const COLS: Col[] = [
  { title: "THE OUD LEGACY",  image: PRODUCTS.find((p) => p.category === "oud")!.image,     category: "oud"     },
  { title: "GOLDEN ESSENCES", image: PRODUCTS.find((p) => p.category === "men")!.image,     category: "men"     },
  { title: "NIGHTS OF ARABIA",image: PRODUCTS.find((p) => p.category === "women")!.image,   category: "women"   },
];

export function Collections() {
  const { setFilter } = useFilter();

  const open = (c: Category) => {
    setFilter(c, null);
    setTimeout(() => {
      document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <section id="collections" className="relative bg-obsidian py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {COLS.map((c) => (
          <button
            key={c.title}
            onClick={() => open(c.category)}
            className="group relative text-left"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-gold/20 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:border-gold/70 group-hover:shadow-[0_0_35px_-2px_rgba(212,175,55,0.55)]">
              <div className="absolute inset-0 bg-gradient-radial-gold opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700 pointer-events-none" />
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="relative w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-lg ring-0 ring-gold/0 group-hover:ring-1 group-hover:ring-gold/60 transition-all duration-500 pointer-events-none" />
            </div>
            <div className="mt-5 text-center font-serif-display text-base tracking-[0.45em] text-gold group-hover:text-gold-bright transition-colors">
              {c.title}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
