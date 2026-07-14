import { createFileRoute } from "@tanstack/react-router";

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
  return (
    <I18nProvider>
      <FilterProvider>
        <CartProvider>
          <div className="relative min-h-screen bg-obsidian">
            <div className="relative z-10">
              <Header />
              <main>
                <Hero />
                <Collections />
                <ProductGrid />
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
