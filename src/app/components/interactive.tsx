"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// ─── ScrollReveal ────────────────────────────────────────────────────────────

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const translate =
    direction === "up"
      ? "translateY(40px)"
      : direction === "left"
        ? "translateX(-40px)"
        : "translateX(40px)";

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0, 0)" : translate,
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── NavScrollEffect ─────────────────────────────────────────────────────────

export function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}

// ─── ImagePlaceholder ────────────────────────────────────────────────────────
// Rich gradient art that looks intentional, not placeholder-ish.

const gradientThemes: Record<string, string> = {
  garden:
    "from-emerald-900 via-emerald-800 to-teal-900",
  sunset:
    "from-amber-900 via-orange-900/80 to-rose-900/60",
  pool:
    "from-cyan-900 via-teal-800 to-emerald-900",
  bamboo:
    "from-lime-900/80 via-emerald-900 to-stone-900",
  room:
    "from-amber-900/60 via-stone-800 to-stone-900",
  nature:
    "from-emerald-950 via-green-900 to-teal-950",
  default:
    "from-stone-800 via-stone-700 to-emerald-900/40",
};

export function ImagePlaceholder({
  label,
  aspect = "4/3",
  className = "",
  theme = "default",
}: {
  label: string;
  aspect?: string;
  className?: string;
  theme?: keyof typeof gradientThemes;
}) {
  const gradient = gradientThemes[theme] || gradientThemes.default;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} group ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {/* Layered depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(255,255,255,0.06)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(0,0,0,0.3)_0%,_transparent_50%)]" />

      {/* Decorative shapes */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/[0.03] blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/[0.02] blur-xl" />

      {/* Label on hover */}
      <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-xs text-white/40 font-medium bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
          {label}
        </p>
      </div>

      {/* Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-shimmer" />
    </div>
  );
}

// ─── CountUp ─────────────────────────────────────────────────────────────────
// Animated number counter triggered on scroll.

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let triggered = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          observer.unobserve(el);

          const duration = 800;
          const start = performance.now();

          function step(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * to);
            setDisplay(current.toString());
            if (progress < 1) requestAnimationFrame(step);
          }

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─── HeroParticles ───────────────────────────────────────────────────────────
// Floating leaf/dot particles for the hero background.

export function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const start = performance.now();
    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.3 + 0.1,
      phase: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.15 + 0.05,
    }));

    function animate(now: number) {
      const elapsed = (now - start) / 1000;
      const dots = container!.children;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const el = dots[i] as HTMLElement;
        if (!el) continue;
        const dx = Math.sin(elapsed * p.speed + p.phase) * 30;
        const dy = Math.cos(elapsed * p.speed * 0.6 + p.phase) * 20 - elapsed * 3 * p.speed;
        el.style.transform = `translate(${dx}px, ${dy % 100}px)`;
      }
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            backgroundColor: `rgba(201, 169, 110, ${Math.random() * 0.15 + 0.05})`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
// Decorative section divider with ornamental element.

export function Divider({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex items-center justify-center py-2 ${dark ? "bg-charcoal" : "bg-cream"}`}>
      <div className={`h-px flex-1 max-w-20 ${dark ? "bg-stone-800" : "bg-stone-300"}`} />
      <div className={`mx-4 w-2 h-2 rotate-45 border ${dark ? "border-stone-700" : "border-stone-300"}`} />
      <div className={`h-px flex-1 max-w-20 ${dark ? "bg-stone-800" : "bg-stone-300"}`} />
    </div>
  );
}

// ─── MobileMenuButton ────────────────────────────────────────────────────────

export function MobileMenuButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
      aria-label="Menu"
    >
      <span
        className="block w-5 h-0.5 bg-current transition-all duration-300"
        style={{
          transform: open ? "rotate(45deg) translate(2px, 2px)" : "none",
        }}
      />
      <span
        className="block w-5 h-0.5 bg-current transition-all duration-300"
        style={{ opacity: open ? 0 : 1 }}
      />
      <span
        className="block w-5 h-0.5 bg-current transition-all duration-300"
        style={{
          transform: open ? "rotate(-45deg) translate(2px, -2px)" : "none",
        }}
      />
    </button>
  );
}

// ─── LanguageToggle ──────────────────────────────────────────────────────────

export function LanguageToggle({
  lang,
  onChange,
  scrolled,
}: {
  lang: "en" | "es";
  onChange: (lang: "en" | "es") => void;
  scrolled: boolean;
}) {
  return (
    <div
      className={`flex rounded-full text-xs font-medium overflow-hidden border ${scrolled ? "border-stone-300" : "border-white/30"}`}
    >
      <button
        onClick={() => onChange("en")}
        className={`px-2.5 py-1 transition-colors ${
          lang === "en"
            ? "bg-amber-700 text-white"
            : scrolled
              ? "text-stone-600 hover:text-stone-900"
              : "text-white/70 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onChange("es")}
        className={`px-2.5 py-1 transition-colors ${
          lang === "es"
            ? "bg-amber-700 text-white"
            : scrolled
              ? "text-stone-600 hover:text-stone-900"
              : "text-white/70 hover:text-white"
        }`}
      >
        ES
      </button>
    </div>
  );
}
