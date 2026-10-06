import { useRef, useEffect, useState, useCallback } from 'react';
import Reveal from './Reveal';

const EMAIL = 'ovais.0404@gmail.com';

const starConfigs = [
  {
    src: '/img/hero/star-1.png',
    size: 300,
    baseLeftPct: 23,
    baseTopPct: 50,
    rotate: -8,
    influenceRadius: 340,
    maxPush: 60,
    floatAmplitude: 18,
    floatPeriodMs: 7200,
    floatPhase: 0,
  },
  {
    src: '/img/hero/star-2.png',
    size: 230,
    baseLeftPct: 77,
    baseTopPct: 40,
    rotate: 12,
    influenceRadius: 300,
    maxPush: 55,
    floatAmplitude: 14,
    floatPeriodMs: 8400,
    floatPhase: 0.35,
  },
];

const projectBadges = [
  { label: 'Lumière', category: 'Fine Jewellery 3D' },
  { label: 'AgriLocal.ai', category: 'Multilingual Voice AI' },
  { label: 'HavenSpaces', category: 'Proptech & Map Search' },
  { label: 'Sunshine Herbal', category: 'Ayurvedic D2C' },
  { label: 'Next.js 15', category: 'App Router' },
  { label: 'React & TypeScript', category: 'UI Engineering' },
  { label: 'Tailwind CSS', category: 'Fluid Systems' },
  { label: 'Python & LLMs', category: 'AI Intelligence' },
];

async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {}
  }
  if (typeof document !== 'undefined') {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch {}
  }
  return false;
}

function CompanyMarquee() {
  const repeatedBadges = [...projectBadges, ...projectBadges, ...projectBadges, ...projectBadges];

  return (
    <div className="relative w-full overflow-hidden pointer-events-none select-none py-2">
      <div className="flex items-center animate-marquee-left" style={{ width: 'max-content' }}>
        {repeatedBadges.map((item, index) => (
          <span key={`${item.label}-${index}`} className="flex items-center flex-shrink-0">
            <span className="flex items-baseline gap-2 font-archia">
              <span className="font-sans font-[600] text-[15px] sm:text-[16px] text-black/75 tracking-tight">
                {item.label}
              </span>
              <span className="text-[10.5px] uppercase tracking-[0.14em] text-black/40 font-medium">
                {item.category}
              </span>
            </span>
            <span className="inline-block w-[32px] h-px bg-black/25 mx-6 flex-shrink-0" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroStars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mousePos = { x: -10000, y: -10000 };
    const targets = starConfigs.map(() => ({ dx: 0, dy: 0 }));
    const currents = starConfigs.map(() => ({ dx: 0, dy: 0 }));
    let active = true;
    const startTime = performance.now();
    let animId: number | null = null;

    const render = () => {
      if (!active) return;
      const elapsed = performance.now() - startTime;
      const rect = container.getBoundingClientRect();

      starConfigs.forEach((cfg, i) => {
        const starEl = starsRef.current[i];
        if (!starEl) return;

        const osc = Math.sin((elapsed / cfg.floatPeriodMs + cfg.floatPhase) * Math.PI * 2) * cfg.floatAmplitude;
        const originX = (cfg.baseLeftPct / 100) * rect.width;
        const originY = (cfg.baseTopPct / 100) * rect.height;

        const diffX = originX - mousePos.x;
        const diffY = originY - mousePos.y;
        const dist = Math.hypot(diffX, diffY);

        let pushX = 0;
        let pushY = 0;
        if (dist < cfg.influenceRadius && dist > 0.001) {
          const norm = 1 - dist / cfg.influenceRadius;
          const factor = norm * norm;
          pushX = (diffX / dist) * factor * cfg.maxPush;
          pushY = (diffY / dist) * factor * cfg.maxPush;
        }

        targets[i].dx = pushX;
        targets[i].dy = pushY;

        currents[i].dx += (targets[i].dx - currents[i].dx) * 0.07;
        currents[i].dy += (targets[i].dy - currents[i].dy) * 0.07;

        const finalX = currents[i].dx;
        const finalY = currents[i].dy + osc;

        starEl.style.transform = `translate(-50%, -50%) translate3d(${finalX.toFixed(2)}px, ${finalY.toFixed(2)}px, 0) rotate(${cfg.rotate}deg)`;
      });

      animId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mousePos = { x: -10000, y: -10000 };
    };

    animId = requestAnimationFrame(render);
    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      active = false;
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden z-0">
      {starConfigs.map((star, idx) => (
        <div
          key={star.src}
          ref={(el) => (starsRef.current[idx] = el)}
          className="absolute will-change-transform animate-star-fade-in"
          style={{
            left: `${star.baseLeftPct}%`,
            top: `${star.baseTopPct}%`,
            width: `${star.size}px`,
            transform: `translate(-50%, -50%) rotate(${star.rotate}deg)`,
            opacity: 0,
            animationDelay: `${100 + 120 * idx}ms`,
          }}
        >
          <img
            src={star.src}
            alt=""
            width={star.size}
            height={star.size}
            className="block select-none w-full h-auto pointer-events-none"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

function ContactActions() {
  const [copied, setCopied] = useState(false);
  const [showError, setShowError] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(EMAIL);
    if (success) {
      setShowError(false);
      setCopied(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2500);
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={`mailto:${EMAIL}`}
        className="inline-flex items-center justify-center gap-1 bg-black text-white font-sans font-[500] text-[16px] sm:text-[18px] px-7 sm:px-9 py-[14px] sm:py-[18px] rounded-full whitespace-nowrap hover:bg-neutral-800 transition-colors"
      >
        Get in touch
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="#F2F6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      <div className="flex items-center gap-2 font-sans font-[450] text-[15px] text-black/70">
        <span>or</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-live="polite"
          aria-label={copied ? `Email ${EMAIL} copied to clipboard` : 'Copy email to clipboard'}
          className="group inline-flex items-center gap-1.5 font-sans font-[450] text-[15px] text-black/80 hover:text-black transition-colors py-1 cursor-pointer"
        >
          <span className="border-b border-current/60 group-hover:border-current transition-colors pb-[1px] inline-flex items-center gap-1.5">
            {copied ? (
              <>
                <span>Copied</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-600"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </>
            ) : (
              <span>Copy email to clipboard</span>
            )}
          </span>
        </button>
      </div>

      {showError && (
        <p role="alert" className="font-archia text-[13px] text-[#a14a3a] flex flex-wrap items-center gap-x-2 gap-y-1">
          <span aria-hidden="true" className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-current/40 text-[11px] leading-none">!</span>
          Couldn't open your email app.
          <button
            type="button"
            onClick={handleCopy}
            className="font-sans font-[450] text-[14px] text-black border-b border-black/40 hover:border-black transition-colors"
          >
            Copy to clipboard instead
          </button>
        </p>
      )}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let rafId: number | null = null;
    const update = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, scrollY / 600));
      el.style.opacity = String(1 - progress);
      el.style.transform = `scale(${1 - 0.14 * progress})`;
      if (progress >= 0.95) {
        el.style.pointerEvents = 'none';
      } else {
        el.style.pointerEvents = 'auto';
      }
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="fixed inset-x-0 top-0 h-screen pt-[88px] pb-4 px-4 md:px-6 z-0 flex flex-col pointer-events-auto"
      style={{ transformOrigin: 'center top', willChange: 'opacity, transform' }}
    >
      <div
        className="hero-card relative w-full flex-1 rounded-[61px] overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #FFF5F8 0%, rgba(255, 245, 248, 0) 100%)' }}
      >
        {/* Floating 3D Stars with physics */}
        <HeroStars />

        {/* Top left Mumbai label */}
        <div className="hidden md:block absolute top-12 left-12 lg:top-14 lg:left-14 z-20">
          <Reveal durationMs={700}>
            <span className="font-archia font-[400] text-[14px] lg:text-[15px] text-black/55">
              Based in Mumbai, India
            </span>
          </Reveal>
        </div>

        {/* Bottom right summary note */}
        <div className="hidden [@media(min-height:800px)]:md:block absolute bottom-32 right-12 lg:bottom-36 lg:right-14 z-20 max-w-[280px]">
          <Reveal durationMs={800} delayMs={700}>
            <p className="font-archia text-[13px] lg:text-[14px] leading-[1.55] text-black/55 text-right">
              Creative Web Developer. Architecting responsive web platforms, AI integrations, and high-converting interfaces.
            </p>
          </Reveal>
        </div>

        {/* Center content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center gap-2 sm:gap-3 md:gap-4 [@media(min-height:800px)]:lg:gap-6 px-4 sm:px-6 md:px-12 pt-6 sm:pt-12 md:pt-16 [@media(min-height:800px)]:lg:pt-24 pb-20 sm:pb-28 md:pb-32 [@media(min-height:800px)]:lg:pb-44">
          {/* Mobile Mumbai label */}
          <Reveal durationMs={700}>
            <span className="md:hidden font-archia font-[400] text-[14px] text-black/55">
              Based in Mumbai, India
            </span>
          </Reveal>

          {/* Profile pill photo */}
          <Reveal durationMs={700} delayMs={60}>
            <span className="relative inline-block w-[54px] h-[78px] sm:w-[62px] sm:h-[90px] md:w-[68px] md:h-[100px] [@media(min-height:800px)]:lg:w-[76px] [@media(min-height:800px)]:lg:h-[116px] rounded-full overflow-hidden border-[2px] md:border-[2.4px] border-[var(--color-border)] shadow-md shadow-pink-900/5">
              <img
                src="/img/pfp.png"
                alt="Ovais Shaikh"
                className="w-full h-full object-cover"
              />
            </span>
          </Reveal>

          {/* Greeting */}
          <div className="-mt-1 md:-mt-2">
            <Reveal durationMs={800} delayMs={130}>
              <p className="font-sans font-[450] text-[clamp(1.25rem,2.2vw,2rem)] text-black/45 leading-[1.45]" style={{ paddingBottom: '0.18em' }}>
                Hey, I'm Ovais
              </p>
            </Reveal>
          </div>

          {/* Huge Main Headline */}
          <h1 className="w-full max-w-[1200px] font-sans font-[450] leading-[1.06] text-[clamp(1.5rem,min(4.4vw,6.5vh),4.25rem)] text-black tracking-[-0.01em] -mt-2 md:-mt-3">
            <Reveal durationMs={850} delayMs={250}>
              <span className="block">Creative Web Developer</span>
            </Reveal>
            <Reveal durationMs={850} delayMs={350}>
              <span className="block">shipping AI & web products,</span>
            </Reveal>
            <Reveal durationMs={850} delayMs={450}>
              <span className="block">specialising in high-converting UX</span>
            </Reveal>
          </h1>

          {/* Contact Button & Copy email */}
          <Reveal delayMs={650} durationMs={700}>
            <div className="mt-1 md:mt-2">
              <ContactActions />
            </div>
          </Reveal>
        </div>

        {/* Bottom ticker logos */}
        <div className="absolute left-0 right-0 bottom-[9.5px]">
          <CompanyMarquee />
        </div>
      </div>
    </section>
  );
}
