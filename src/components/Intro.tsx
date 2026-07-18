import { useEffect, useRef, useState } from "react";

export function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "out">("in");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 1600);
    const t2 = setTimeout(() => onDone(), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const N = 260;
    const parts = Array.from({ length: N }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 8 + 4) * dpr;
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: (Math.random() * 2 + 0.5) * dpr,
        life: 1,
      };
    });
    const start = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const t = (now - start) / 1600;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.94; p.vy *= 0.94;
        p.life = Math.max(0, 1 - t);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        g.addColorStop(0, `rgba(240, 210, 120, ${p.life})`);
        g.addColorStop(1, "rgba(240, 210, 120, 0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2); ctx.fill();
      }
      if (t < 1.5) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 ${phase === "out" ? "opacity-0" : "opacity-100"}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative text-center animate-intro">
        <h1 className="font-display text-5xl md:text-7xl text-gradient-gold tracking-[0.3em]">
          SCENT PARFUMERIE
        </h1>
        <div className="mt-4 text-xs tracking-[0.5em] text-gold-muted">— MAISON DE PARFUM —</div>
      </div>
    </div>
  );
}
