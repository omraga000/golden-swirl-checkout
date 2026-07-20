const m1 = { url: "/products/mood-1.jpg" };
const m2 = { url: "/products/mood-2.jpg" };
const m3 = { url: "/products/mood-3.jpg" };
const m4 = { url: "/products/mood-4.jpg" };
const m5 = { url: "/products/mood-5.jpg" };
const m6 = { url: "/products/mood-6.jpg" };
const m7 = { url: "/products/mood-7.jpg" };
const m8 = { url: "/products/mood-8.jpg" };
import type { Product } from "./cart";
import type { Category, Season } from "./filter";

export type Note = "Woody" | "Spicy" | "Floral" | "Amber" | "Smoky" | "Musk" | "Citrus" | "Leather";

export type CatalogProduct = Product & {
  category: Category;
  season: Season;
  notes: Note[];
  sensory: string;
  bestseller?: boolean;
};

export const PRODUCTS: CatalogProduct[] = [
  { id: "1", name: "Silver Mountain",  collection: "Alpine Legacy",     description: "Frozen lakes, cedar and silver air.",              sensory: "Alpine glaciers, bergamot and silver cedar carried on cold mountain wind.", price: 340, image: m1.url, category: "men",     season: "winter", notes: ["Woody","Citrus","Musk"], bestseller: true },
  { id: "2", name: "Chimilka",         collection: "Silk Bloom",        description: "Iris, peach and white silk.",                       sensory: "Peach velvet and iris petals wrapped in white silk and warm violet.",       price: 380, image: m2.url, category: "women",   season: "summer", notes: ["Floral","Citrus","Musk"] },
  { id: "3", name: "Aventus Legacy",   collection: "The Oud Legacy",    description: "Blackcurrant, pineapple and birch smoke.",          sensory: "Blackcurrant, cut pineapple and smoked birch bark over rich oakmoss.",       price: 460, image: m3.url, category: "men",     season: "new",    notes: ["Smoky","Citrus","Woody"], bestseller: true },
  { id: "4", name: "Tygar Extrait",    collection: "Nights of Arabia",  description: "Amalfi dusk, gold leather and sea salt.",           sensory: "Gilded leather and warm amber under a Positano dusk of salt and citrus.",   price: 520, image: m4.url, category: "oud",     season: "winter", notes: ["Leather","Amber","Woody"], bestseller: true },
  { id: "5", name: "Stronger Amber",   collection: "Golden Essences",   description: "Warm amber, vanilla and velvet.",                   sensory: "Molten amber, dark vanilla and velvet musk on skin.",                        price: 310, image: m5.url, category: "men",     season: "winter", notes: ["Amber","Musk","Spicy"] },
  { id: "6", name: "Santal Blanc",     collection: "Maison Blanche",    description: "Cedarwood, leather and paper.",                     sensory: "Warm sandalwood, soft leather and the scent of aged paper.",                 price: 420, image: m6.url, category: "perfume", season: "new",    notes: ["Woody","Leather","Musk"] },
  { id: "7", name: "Match Sauv",       collection: "Marble Editions",   description: "Marble, citrus and cool stone.",                    sensory: "Cool stone, crushed pepper and a bright citrus opening on marble.",          price: 290, image: m7.url, category: "perfume", season: "summer", notes: ["Citrus","Woody","Spicy"], bestseller: true },
  { id: "8", name: "Match Avetos",     collection: "Marble Editions",   description: "Green fig, vetiver and morning mist.",              sensory: "Green fig leaves, wet vetiver and pale morning mist over pale stone.",       price: 320, image: m8.url, category: "women",   season: "summer", notes: ["Floral","Woody","Citrus"] },
];

export const ALL_NOTES: Note[] = ["Woody","Spicy","Floral","Amber","Smoky","Musk","Citrus","Leather"];

export const NEW_ARRIVALS = PRODUCTS.slice(0, 6);

