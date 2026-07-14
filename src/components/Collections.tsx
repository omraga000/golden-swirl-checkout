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
            <div className="relative aspect-[4/5] overflow-hidden border border-gold/20 group-hover:border-gold/60 transition-colors">
              <div className="absolute inset-0 bg-gradient-radial-gold opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-700" />
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="relative w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
            </div>
            <div className="mt-5 text-center text-[11px] tracking-[0.45em] text-gold group-hover:text-gold-bright transition-colors">
              {c.title}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
