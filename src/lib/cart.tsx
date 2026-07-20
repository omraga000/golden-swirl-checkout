import { createContext, useContext, useState, type ReactNode } from "react";

export type Product = {
  id: string;
  name: string;
  collection: string;
  description: string;
  price: number;
  image: string;
};

export type CartItem = Product & { qty: number; size?: string; lineId: string };

type AddOptions = { size?: string; price?: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product, opts?: AddOptions) => void;
  remove: (lineId: string) => void;
  setQty: (lineId: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add = (p: Product, opts?: AddOptions) =>
    setItems((cur) => {
      const size = opts?.size;
      const price = opts?.price ?? p.price;
      const lineId = `${p.id}${size ? `-${size}` : ""}`;
      const ex = cur.find((i) => i.lineId === lineId);
      if (ex) return cur.map((i) => (i.lineId === lineId ? { ...i, qty: i.qty + 1 } : i));
      return [...cur, { ...p, price, qty: 1, size, lineId }];
    });
  const remove = (lineId: string) => setItems((c) => c.filter((i) => i.lineId !== lineId));
  const setQty = (lineId: string, qty: number) =>
    setItems((c) => (qty <= 0 ? c.filter((i) => i.lineId !== lineId) : c.map((i) => (i.lineId === lineId ? { ...i, qty } : i))));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, total, open, setOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("CartProvider missing");
  return c;
};
