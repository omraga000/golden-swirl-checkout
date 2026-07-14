import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Intro } from "@/components/Intro";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Collections } from "@/components/Collections";
import { ProductGrid } from "@/components/ProductGrid";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import { I18nProvider } from "@/lib/i18n";
import { FilterProvider } from "@/lib/filter";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(false);
  useEffect(() => {
    if (introDone) document.body.style.overflow = "";
    else document.body.style.overflow = "hidden";
  }, [introDone]);

  return (
    <I18nProvider>
      <FilterProvider>
        <CartProvider>
          {!introDone && <Intro onDone={() => setIntroDone(true)} />}
          <div className={`relative min-h-screen bg-obsidian transition-opacity duration-700 ${introDone ? "opacity-100" : "opacity-0"}`}>
            <div className="relative z-10">
              <Header />
              <main>
                <Hero />
                <Collections />
                <ProductGrid />
                <Moodboard />
              </main>
              <Footer />
            </div>
            <CartDrawer />
          </div>
        </CartProvider>
      </FilterProvider>
    </I18nProvider>
  );
}
