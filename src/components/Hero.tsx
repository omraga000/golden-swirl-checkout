import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/hero-bottles.jpg";


export function Hero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Subtle parallax on mouse move for the background
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setParallax({ x: x * 20, y: y * 20 });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  // 3D tilt for the CTA button
  const onBtnMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 18, ry: px * 22 });
  };
  const onBtnLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden pt-28">
      {/* Background image with parallax */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Zayd Ouds perfume bottles on oud wood with golden smoke"
          width={1280}
          height={1024}
          className="w-full h-full object-cover object-center will-change-transform transition-transform duration-500 ease-out"
          style={{
            transform: `scale(1.08) translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/30 to-obsidian" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_25%,_var(--obsidian)_90%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[calc(100vh-7rem)] flex flex-col">
        <div className="flex-1 min-h-[10vh]" />

        <div className="relative pb-16 md:pb-24 px-6">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <div className="text-[10px] tracking-[0.6em] text-gold-muted mb-6">
              — MAISON DE PARFUM · EST. MMXXV —
            </div>
            <h1 className="font-serif-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1] text-gradient-gold drop-shadow-[0_8px_40px_rgba(212,175,55,0.25)]">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-base md:text-lg text-foreground/75 max-w-lg mx-auto font-light tracking-wide">
              {t("hero.subtitle")}
            </p>

            {/* 3D CTA button */}
            <div className="relative mt-14 flex items-center justify-center" style={{ perspective: "800px" }}>
              <a
                href="#collections"
                onMouseMove={onBtnMove}
                onMouseLeave={onBtnLeave}
                className="group relative inline-block px-14 py-4 text-xs tracking-[0.45em] text-gold rounded-full will-change-transform transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* soft glow */}
                <span
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-gold/25 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                />
                {/* metallic base */}
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-gold/60 bg-gradient-to-b from-gold/20 via-obsidian/70 to-obsidian/90 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,220,140,0.35),inset_0_-6px_20px_rgba(0,0,0,0.6)] backdrop-blur-md"
                />
                {/* hover fill */}
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-gold-bright opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                {/* sheen sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
                >
                  <span className="absolute -inset-y-4 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-0 group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                </span>
                <span
                  className="relative z-10 group-hover:text-obsidian transition-colors duration-500"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {t("hero.cta")}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center pb-6 text-[10px] tracking-[0.5em] text-gold-muted animate-shimmer">
          SCROLL
        </div>
      </div>
    </section>
  );
}
