import { createContext, useContext, useState, type ReactNode } from "react";

export type Category = "men" | "women" | "oud" | "perfume";
export type Season = "summer" | "winter" | "new";

type FilterState = {
  category: Category | null;
  season: Season | null;
  setFilter: (c: Category | null, s: Season | null) => void;
  clear: () => void;
};

const Ctx = createContext<FilterState>({
  category: null,
  season: null,
  setFilter: () => {},
  clear: () => {},
});

export function FilterProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [season, setSeason] = useState<Season | null>(null);
  return (
    <Ctx.Provider
      value={{
        category,
        season,
        setFilter: (c, s) => {
          setCategory(c);
          setSeason(s);
        },
        clear: () => {
          setCategory(null);
          setSeason(null);
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useFilter = () => useContext(Ctx);
