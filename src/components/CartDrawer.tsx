import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";

const TG_USERNAME = "zayd_OUDs";

export function CartDrawer() {
  const { open, setOpen, items, setQty, remove, total, count } = useCart();
  const { t } = useI18n();

  const buildMsg = () => {
    const lines = items
      .map((i) => {
        const label = i.size ? `${i.name} — ${i.size}` : i.name;
        return `• ${label} x${i.qty} — $${i.price * i.qty}`;
      })
      .join("%0A");
    const msg = `${t("cart.msg")}:%0A%0A${lines}%0A%0A${t("cart.total")}: $${total}`;
    return msg;
  };

  const WA_NUMBER_INTL = "905015851388";
  const orderWA = () => window.open(`https://wa.me/${WA_NUMBER_INTL}?text=${buildMsg()}`, "_blank");
  const orderTG = () => window.open(`https://t.me/${TG_USERNAME}?text=${buildMsg()}`, "_blank");

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-obsidian border-l border-gold/30 flex flex-col transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gold/20">
          <h2 className="font-display text-sm tracking-[0.3em] text-gold">
            {t("cart.title")} {count > 0 && <span className="text-foreground/60">({count})</span>}
          </h2>
          <button onClick={() => setOpen(false)} className="text-foreground/70 hover:text-gold transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-foreground/50">
              <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center mb-4">
                <span className="text-2xl text-gold-muted">∅</span>
              </div>
              <p className="text-sm tracking-wide">{t("cart.empty")}</p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((i) => (
                <div key={i.lineId} className="flex gap-4 pb-5 border-b border-gold/10">
                  <img src={i.image} alt={i.name} className="w-20 h-24 object-cover border border-gold/20" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] tracking-[0.3em] text-gold-muted mb-1">{i.collection}</div>
                    <div className="font-serif-display text-lg text-foreground truncate">
                      {i.name}
                      {i.size && <span className="text-gold-muted"> — {i.size}</span>}
                    </div>
                    <div className="text-gold font-display mt-1">${i.price * i.qty}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-gold/30">
                        <button onClick={() => setQty(i.lineId, i.qty - 1)} className="p-1.5 text-gold/80 hover:bg-gold/10" aria-label="Decrease">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm text-foreground min-w-[32px] text-center">{i.qty}</span>
                        <button onClick={() => setQty(i.lineId, i.qty + 1)} className="p-1.5 text-gold/80 hover:bg-gold/10" aria-label="Increase">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button onClick={() => remove(i.lineId)} className="text-foreground/40 hover:text-destructive p-1.5" aria-label="Remove">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gold/20 p-6 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs tracking-[0.3em] text-foreground/60">{t("cart.total")}</span>
              <span className="font-display text-2xl text-gradient-gold">${total}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={orderWA}
                className="relative overflow-hidden group py-4 text-[10px] tracking-[0.25em] font-semibold border border-emerald-500/50 text-emerald-400 hover:text-obsidian transition-colors duration-500"
              >
                <span className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative">{t("cart.wa")}</span>
              </button>
              <button
                onClick={orderTG}
                className="relative overflow-hidden group py-4 text-[10px] tracking-[0.25em] font-semibold border border-sky-500/50 text-sky-400 hover:text-obsidian transition-colors duration-500"
              >
                <span className="absolute inset-0 bg-gradient-to-br from-sky-400 to-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative">{t("cart.tg")}</span>
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
