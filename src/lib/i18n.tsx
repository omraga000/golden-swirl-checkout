import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "TR" | "UZ" | "RU";

type Dict = Record<string, string>;

const translations: Record<Lang, Dict> = {
  TR: {
    "nav.story": "Hikayemiz",
    "nav.collections": "Koleksiyonlar",
    "hero.title": "OUD'UN AÇILIŞI",
    "hero.subtitle": "Doğu'nun sırlarından süzülen efsanevi bir koku serisi.",
    "hero.cta": "KOLEKSİYONLARI KEŞFET",
    "promo.title": "YENİ GELENLER",
    "products.title": "İMZA KOLEKSİYONLARI",
    "products.subtitle": "Zamansız zarafetin özü, üç eşsiz seride.",
    "product.add": "Çantaya Ekle",
    "cart.title": "Alışveriş Çantası",
    "cart.empty": "Çantanız boş.",
    "cart.total": "Toplam",
    "cart.wa": "WhatsApp ile Sipariş",
    "cart.tg": "Telegram ile Sipariş",
    "cart.msg": "Merhaba Zayd Ouds, sipariş vermek istiyorum",
    "footer.tag": "Doğu'nun mirası, modern zamanların lüksü.",
  },
  UZ: {
    "nav.story": "Bizning Hikoyamiz",
    "nav.collections": "Kolleksiyalar",
    "hero.title": "OUDNI OCHISH",
    "hero.subtitle": "Sharqning sirlaridan tug'ilgan afsonaviy hidlar seriyasi.",
    "hero.cta": "KOLLEKSIYALARNI KO'RISH",
    "promo.title": "YANGI MAHSULOTLAR",
    "products.title": "IMZO KOLLEKSIYALARI",
    "products.subtitle": "Uch noyob seriyada abadiy nafosat.",
    "product.add": "Savatga qo'shish",
    "cart.title": "Xarid savati",
    "cart.empty": "Savatingiz bo'sh.",
    "cart.total": "Jami",
    "cart.wa": "WhatsApp orqali buyurtma",
    "cart.tg": "Telegram orqali buyurtma",
    "cart.msg": "Salom Zayd Ouds, buyurtma bermoqchiman",
    "footer.tag": "Sharq merosi, zamonaviy hashamat.",
  },
  RU: {
    "nav.story": "Наша История",
    "nav.collections": "Коллекции",
    "hero.title": "ОТКРОВЕНИЕ УДА",
    "hero.subtitle": "Легендарная линия ароматов, рождённая из тайн Востока.",
    "hero.cta": "ИЗУЧИТЬ КОЛЛЕКЦИИ",
    "promo.title": "НОВИНКИ",
    "products.title": "ФИРМЕННЫЕ КОЛЛЕКЦИИ",
    "products.subtitle": "Вечная элегантность в трёх уникальных сериях.",
    "product.add": "В корзину",
    "cart.title": "Корзина",
    "cart.empty": "Ваша корзина пуста.",
    "cart.total": "Итого",
    "cart.wa": "Заказать в WhatsApp",
    "cart.tg": "Заказать в Telegram",
    "cart.msg": "Здравствуйте, Zayd Ouds, я хочу сделать заказ",
    "footer.tag": "Восточное наследие, современная роскошь.",
  },
};

const I18nContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "TR",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("TR");
  const t = (k: string) => translations[lang][k] ?? k;
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
