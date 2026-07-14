import p1 from "@/assets/perfume-1.jpg";
import p2 from "@/assets/perfume-2.jpg";
import p3 from "@/assets/perfume-3.jpg";
import p4 from "@/assets/perfume-4.jpg";
import p5 from "@/assets/perfume-5.jpg";
import p6 from "@/assets/perfume-6.jpg";
import type { Product } from "./cart";
import type { Category, Season } from "./filter";

export type Note = "Woody" | "Spicy" | "Floral" | "Amber" | "Smoky" | "Musk" | "Citrus" | "Leather";

export type CatalogProduct = Product & {
  category: Category;
  season: Season;
  notes: Note[];
  sensory: string;
};

export const PRODUCTS: CatalogProduct[] = [
  { id: "1", name: "Royal Oud Noir",  collection: "The Oud Legacy",  description: "Deep smoked oud, saffron and dark amber.",         sensory: "A deep, smoky blend of premium Cambodian Oud, saffron and blackened amber.", price: 340, image: p1, category: "oud",     season: "winter", notes: ["Woody","Smoky","Amber"] },
  { id: "2", name: "Sultan's Gold",   collection: "Golden Essences", description: "Warm gold, honeyed rose and vanilla musk.",       sensory: "Liquid gold poured over honeyed rose, warm musk and a whisper of vanilla.",  price: 420, image: p2, category: "men",     season: "new",    notes: ["Floral","Musk","Amber"] },
  { id: "3", name: "Amber Nocturne",  collection: "Nights of Arabia",description: "Liquid amber, oud smoke and midnight jasmine.",   sensory: "Amber velvet wrapped in oud smoke and midnight jasmine petals.",             price: 380, image: p3, category: "women",   season: "winter", notes: ["Amber","Floral","Smoky"] },
  { id: "4", name: "Black Filigree",  collection: "The Oud Legacy",  description: "Aged agarwood, leather and dark spice.",          sensory: "Aged agarwood carved into leather, tobacco and dark oriental spice.",        price: 460, image: p4, category: "oud",     season: "new",    notes: ["Woody","Leather","Spicy"] },
  { id: "5", name: "Solar Elixir",    collection: "Golden Essences", description: "Sun-warmed resin, saffron and golden musk.",      sensory: "Sun-warmed resin, saffron threads and a radiant golden musk.",               price: 390, image: p5, category: "perfume", season: "summer", notes: ["Citrus","Amber","Musk"] },
  { id: "6", name: "Desert Ember",    collection: "Nights of Arabia",description: "Oud chips, incense and blackened rose.",          sensory: "Glowing oud chips, temple incense and a blackened rose in bloom.",           price: 310, image: p6, category: "women",   season: "summer", notes: ["Floral","Smoky","Spicy"] },
];

export const ALL_NOTES: Note[] = ["Woody","Spicy","Floral","Amber","Smoky","Musk","Citrus","Leather"];

export const NEW_ARRIVALS = PRODUCTS.slice(0, 6);
