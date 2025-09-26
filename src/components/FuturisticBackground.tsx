"use client"
import { useEffect, useRef } from "react";

export default function FuturisticBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - r.left}px`);
      el.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", handler);
    return () => el.removeEventListener("pointermove", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_-10%,_oklch(0.9_0.2_264/.15),_transparent_60%)]" />
      <video className="absolute inset-0 w-full h-full object-cover opacity-[0.07] dark:opacity-[0.1]" autoPlay muted loop playsInline src="https://images.unsplash.com/photo-1527443224154-c4fc5b7096d3?q=80&w=1920&auto=format&fit=crop" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  );
}