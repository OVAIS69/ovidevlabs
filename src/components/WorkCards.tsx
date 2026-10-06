import { useRef, useEffect } from 'react';
import BlurHeadline from './BlurHeadline';

interface CardRevealProps {
  children: React.ReactNode;
  className?: string;
  offsetY?: number;
  revealFrom?: number;
  revealTo?: number;
}

function CardReveal({
  children,
  className = '',
  offsetY = 120,
  revealFrom = 0,
  revealTo = 0.4,
}: CardRevealProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let rafId: number | null = null;
    const update = () => {
      rafId = null;
      const rect = outer.getBoundingClientRect();
      const h = window.innerHeight;
      const rawProgress = Math.min(1, Math.max(0, (h - rect.top) / rect.height));
      const span = Math.max(0.0001, revealTo - revealFrom);
      const clamped = Math.min(1, Math.max(0, (rawProgress - revealFrom) / span));
      const hermite = clamped * clamped * (3 - 2 * clamped);
      const transY = offsetY * (1 - hermite);
      inner.style.transform = `translate3d(0, ${transY.toFixed(2)}px, 0)`;
      inner.style.opacity = String(Math.min(1, 1.5 * clamped));
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [offsetY, revealFrom, revealTo]);

  return (
    <div ref={outerRef} className={className}>
      <div
        ref={innerRef}
        style={{
          opacity: 0,
          transform: `translate3d(0, ${offsetY}px, 0)`,
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ParallaxContainer({
  children,
  className = '',
  speed = 10,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number | null = null;
    const update = () => {
      rafId = null;
      const rect = el.getBoundingClientRect();
      const h = window.innerHeight;
      const offset = -((rect.top + rect.height / 2 - h / 2) / h) * speed * 10;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}

interface WorkCardsProps {
  onSelectProject?: (projectId: string) => void;
}

export default function WorkCards({ onSelectProject }: WorkCardsProps) {
  const handleProjectClick = (e: React.MouseEvent, id: string) => {
    if (onSelectProject) {
      e.preventDefault();
      onSelectProject(id);
    }
  };

  return (
    <section id="work" className="relative max-w-[1720px] mx-auto px-4 md:px-6 pb-24 md:pb-32 lg:pb-40 scroll-mt-24">
      {/* Sticky background headline that blurs into view */}
      <div className="sticky top-0 h-screen z-0 pointer-events-none">
        <div className="h-full flex items-center justify-center px-6">
          <div className="hidden md:block">
            <BlurHeadline
              lines={[
                'I build full-stack architectures,',
                'design intuitive interfaces and',
                'ship products that scale businesses',
              ]}
              blurPx={18}
              mutedOpacity={0.12}
              perWordMs={900}
              staggerMs={110}
              threshold={0.4}
              className="font-sans font-[700] text-black text-center leading-[1.02] tracking-[-0.02em] text-[clamp(2rem,5.6vw,5.25rem)] max-w-[1500px]"
            />
          </div>
          <div className="md:hidden">
            <BlurHeadline
              lines={[
                'I build full-stack architectures, design intuitive interfaces and ship products that scale businesses',
              ]}
              blurPx={14}
              mutedOpacity={0.18}
              perWordMs={800}
              staggerMs={90}
              threshold={0.3}
              className="font-sans font-[700] text-black text-center leading-[1.05] tracking-[-0.02em] text-[clamp(1.75rem,7vw,2.75rem)] px-2"
            />
          </div>
        </div>
      </div>

      <div className="h-[30vh]" aria-hidden="true" />
      <div id="work-cards" aria-hidden="true" className="scroll-mt-28" />

      {/* Grid of 4 Work Cards with parallax and reveal physics */}
      <ParallaxContainer speed={10} className="relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-20 lg:gap-y-24 md:gap-x-8 lg:gap-x-14 mt-12 md:mt-16 items-start">
          {/* Card 1: Lumière */}
          <CardReveal className="relative z-10 md:col-span-6 md:px-[15px]" offsetY={120} revealFrom={0} revealTo={0.4}>
            <a
              href="/work/lumiere"
              onClick={(e) => handleProjectClick(e, 'lumiere')}
              className="group relative block rounded-3xl overflow-hidden border border-[var(--color-border)] transition-all duration-500 hover:scale-[1.005] hover:shadow-2xl hover:shadow-black/[0.08] cursor-pointer bg-white"
            >
              <div
                className="absolute top-5 right-5 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 group-hover:scale-105 bg-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src="/images/portfolio_showcase/lumiere/hero.webp"
                  alt="Lumière Jewellery"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute left-4 right-4 bottom-3 flex flex-wrap gap-2 justify-end">
                  <span className="font-archia text-[11px] tracking-[0.06em] uppercase rounded-full px-2.5 py-1 backdrop-blur-md bg-black/60 text-white border border-white/20">
                    Luxury E-Commerce
                  </span>
                  <span className="font-archia text-[11px] tracking-[0.06em] uppercase rounded-full px-2.5 py-1 backdrop-blur-md bg-black/60 text-white border border-white/20">
                    3D Card Tilt
                  </span>
                </div>
              </div>

              <div className="bg-[#ffffff] px-6 pt-5 pb-4 md:px-8 md:pt-6 md:pb-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="relative h-10 flex items-center">
                    <span className="font-sans font-[600] text-[24px] tracking-tight text-black">
                      Lumière
                    </span>
                  </div>
                  <span className="font-archia text-[13px] font-[400] text-right text-black/55">
                    Creative Web Developer
                  </span>
                </div>
                <p className="font-sans font-[450] text-[14.5px] leading-[1.5] text-black/60 mt-3">
                  Timeless luxury fine jewellery digital flagship engineered with Next.js 15, physical 3D card tilt physics, pan-and-zoom inspection, and bespoke bridal storytelling.
                </p>
              </div>
            </a>
          </CardReveal>

          {/* Card 2: AgriLocal.ai */}
          <CardReveal className="relative z-10 md:col-span-6 md:px-[15px]" offsetY={120} revealFrom={0.5} revealTo={0.9}>
            <a
              href="/work/agrilocal"
              onClick={(e) => handleProjectClick(e, 'agrilocal')}
              className="group relative block rounded-3xl overflow-hidden border border-black/40 transition-all duration-500 hover:scale-[1.005] hover:shadow-2xl hover:shadow-black/[0.08] cursor-pointer bg-[#0a0a0a]"
            >
              <div
                className="absolute top-5 right-5 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 group-hover:scale-105 bg-white text-black shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src="/images/portfolio_showcase/agrilocal/1_agrilocal_hero_case_study.webp"
                  alt="AgriLocal.ai"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute left-4 right-4 bottom-3 flex flex-wrap gap-2 justify-end">
                  <span className="font-archia text-[11px] tracking-[0.06em] uppercase rounded-full px-2.5 py-1 backdrop-blur-md bg-black/65 text-white border border-white/20">
                    AI Agritech
                  </span>
                  <span className="font-archia text-[11px] tracking-[0.06em] uppercase rounded-full px-2.5 py-1 backdrop-blur-md bg-black/65 text-white border border-white/20">
                    Voice AI
                  </span>
                </div>
              </div>

              <div className="bg-[#0a0a0a] px-6 pt-5 pb-4 md:px-8 md:pt-6 md:pb-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="relative h-10 flex items-center">
                    <span className="font-sans font-[600] text-[24px] tracking-tight text-white">
                      AgriLocal.ai
                    </span>
                  </div>
                  <span className="font-archia text-[13px] font-[400] text-right text-white/55">
                    Web Developer & AI Engineer
                  </span>
                </div>
                <p className="font-sans font-[450] text-[14.5px] leading-[1.5] text-white/65 mt-3">
                  AI-powered smart agriculture platform empowering local farmers with hands-free multilingual voice assistance (English, Hindi, Marathi), crop disease diagnostics, and live mandi prices.
                </p>
              </div>
            </a>
          </CardReveal>

          {/* Card 3: HavenSpaces */}
          <CardReveal className="relative z-10 md:col-span-6 md:px-[15px]" offsetY={120} revealFrom={0} revealTo={0.4}>
            <a
              href="/work/havenspaces"
              onClick={(e) => handleProjectClick(e, 'havenspaces')}
              className="group relative block rounded-3xl overflow-hidden border border-[var(--color-border)] transition-all duration-500 hover:scale-[1.005] hover:shadow-2xl hover:shadow-black/[0.08] cursor-pointer bg-white"
            >
              {/* Arrow circle button */}
              <div
                className="absolute top-5 right-5 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 group-hover:scale-105 bg-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Cover preview with tag pills */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src="/images/portfolio_showcase/1_havenspaces_hero_case_study.webp"
                  alt="HavenSpaces"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute left-4 right-4 bottom-3 flex flex-wrap gap-2 justify-end">
                  <span className="font-archia text-[11px] tracking-[0.06em] uppercase rounded-full px-2.5 py-1 backdrop-blur-md bg-black/60 text-white border border-white/20">
                    Proptech
                  </span>
                  <span className="font-archia text-[11px] tracking-[0.06em] uppercase rounded-full px-2.5 py-1 backdrop-blur-md bg-black/60 text-white border border-white/20">
                    Next.js
                  </span>
                </div>
              </div>

              {/* Details footer */}
              <div className="bg-[#ffffff] px-6 pt-5 pb-4 md:px-8 md:pt-6 md:pb-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="relative h-10 flex items-center">
                    <span className="font-sans font-[600] text-[24px] tracking-tight text-black">
                      HavenSpaces
                    </span>
                  </div>
                  <span className="font-archia text-[13px] font-[400] text-right text-black/55">
                    Lead Web Developer
                  </span>
                </div>
                <p className="font-sans font-[450] text-[14.5px] leading-[1.5] text-black/60 mt-3">
                  A modern proptech real estate platform featuring interactive map search, verified landlord badges, schedule tour flows, and high-converting listing discovery.
                </p>
              </div>
            </a>
          </CardReveal>

          {/* Card 4: Sunshine */}
          <CardReveal className="relative z-10 md:col-span-6 md:px-[15px]" offsetY={120} revealFrom={0.5} revealTo={0.9}>
            <a
              href="/work/sunshine"
              onClick={(e) => handleProjectClick(e, 'sunshine')}
              className="group relative block rounded-3xl overflow-hidden border border-[var(--color-border)] transition-all duration-500 hover:scale-[1.005] hover:shadow-2xl hover:shadow-black/[0.08] cursor-pointer bg-white"
            >
              <div
                className="absolute top-5 right-5 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 group-hover:scale-105 bg-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src="/images/portfolio_showcase/sunshine/full-collection.webp"
                  alt="Sunshine Herbal"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute left-4 right-4 bottom-3 flex flex-wrap gap-2 justify-end">
                  <span className="font-archia text-[11px] tracking-[0.06em] uppercase rounded-full px-2.5 py-1 backdrop-blur-md bg-black/60 text-white border border-white/20">
                    D2C Beauty
                  </span>
                  <span className="font-archia text-[11px] tracking-[0.06em] uppercase rounded-full px-2.5 py-1 backdrop-blur-md bg-black/60 text-white border border-white/20">
                    Ayurveda
                  </span>
                </div>
              </div>

              <div className="bg-[#ffffff] px-6 pt-5 pb-4 md:px-8 md:pt-6 md:pb-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="relative h-10 flex items-center">
                    <span className="font-sans font-[600] text-[24px] tracking-tight text-black">
                      Sunshine Herbal
                    </span>
                  </div>
                  <span className="font-archia text-[13px] font-[400] text-right text-black/55">
                    Full Stack Developer
                  </span>
                </div>
                <p className="font-sans font-[450] text-[14.5px] leading-[1.5] text-black/60 mt-3">
                  Organic Ayurvedic and botanical skincare e-commerce platform with dual-layer ingredient transparency, step-by-step application rituals, and sticky mobile navigation.
                </p>
              </div>
            </a>
          </CardReveal>
        </div>
      </ParallaxContainer>
    </section>
  );
}
