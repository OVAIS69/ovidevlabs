import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Badge from './Badge';
import Reveal from './Reveal';

const trailImages = Array.from({ length: 21 }, (_, i) => `/img/ImageTrail/${i + 1}.png`);

interface TrailItem {
  id: number;
  x: number;
  y: number;
  src: string;
  rotation: number;
}

let imageIndex = 0;
let itemIdCounter = 0;

function StatItem({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="flex flex-col items-start gap-2 pl-4">
      <span className="font-sans font-[450] text-white text-[clamp(2.75rem,4.4vw,3.75rem)] leading-none tracking-[-0.02em]">
        {value}
      </span>
      <span className="font-archia text-[12.5px] md:text-[13px] text-white/55 leading-[1.4]">
        {caption}
      </span>
    </div>
  );
}

export default function About() {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Preload images for image trail
  useEffect(() => {
    trailImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Smooth opacity reveal on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let rafId: number | null = null;
    const update = () => {
      rafId = null;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const raw = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.75)));
      const norm = Math.min(1, Math.max(0, raw));
      const eased = norm * norm * (3 - 2 * norm);
      el.style.opacity = String(eased);
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
  }, []);

  // Interactive mouse image trail
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const rect = sec.getBoundingClientRect();

    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;

    if (!lastPosRef.current) {
      lastPosRef.current = { x: posX, y: posY };
      return;
    }

    const dist = Math.hypot(posX - lastPosRef.current.x, posY - lastPosRef.current.y);
    if (dist < 90) return;

    lastPosRef.current = { x: posX, y: posY };

    const src = trailImages[imageIndex % trailImages.length];
    imageIndex++;

    const newItem: TrailItem = {
      id: itemIdCounter++,
      x: posX,
      y: posY,
      src,
      rotation: (Math.random() - 0.5) * 24,
    };

    setTrail((prev) => {
      const updated = [...prev, newItem];
      return updated.length > 8 ? updated.slice(updated.length - 8) : updated;
    });
  }, []);

  const removeTrailItem = useCallback((id: number) => {
    setTrail((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{ opacity: 0, willChange: 'opacity' }}
      className="relative w-full py-28 md:py-36 cursor-crosshair scroll-mt-24"
    >
      {/* Floating Ovais portrait badge on desktop */}
      <div
        aria-hidden="false"
        className="hidden lg:flex items-end absolute right-0 top-0 bottom-0 w-[360px] xl:w-[400px] pb-28 md:pb-36 pointer-events-none z-10"
      >
        <div className="w-full pointer-events-auto">
          <div className="relative aspect-[4/5] w-full rounded-l-[28px] rounded-r-none overflow-hidden border border-white/10 border-r-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            <img
              src="/img/ovais-outfit.jpg"
              alt="Ovais Shaikh"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center font-archia text-[10.5px] tracking-[0.16em] uppercase text-white bg-black/55 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5 shadow-lg">
                Mumbai, IN · 19.08°N
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="relative z-10 flex items-center mb-8 md:mb-10 lg:pr-[400px] xl:pr-[440px]">
          <div className="[&>div]:mb-0">
            <Badge dark>About me</Badge>
          </div>
        </div>

        <div className="relative z-10 lg:pr-[400px] xl:pr-[440px] flex flex-col">
          <h2 className="font-sans font-[500] leading-[1.04] tracking-[-0.02em] text-[clamp(1.9rem,4.1vw,3.85rem)] text-white">
            <Reveal durationMs={850} delayMs={120}>
              I build & design products that make things happen.
            </Reveal>
          </h2>

          <p className="font-archia font-[400] text-[16px] md:text-[17px] leading-[1.7] text-white/65 max-w-[760px] mt-6 md:mt-7">
            Founder of <span className="text-white font-[500]">OviDevLabs</span>. Over the past 5+ years, I've designed and engineered fast, scalable web applications, AI tools, proptech platforms, and high-converting e-commerce experiences across Next.js, React, and Python.
          </p>

          <p className="font-archia font-[400] text-[16px] md:text-[17px] leading-[1.7] text-white/65 max-w-[760px] mt-4">
            AI is baked into my development DNA. From fine-tuned voice models for regional agriculture to high-performance real-time search architectures, I build products that are fast, intuitive, and visually distinct.
          </p>

          <p className="font-archia font-[600] text-pink-300/80 text-[16px] md:text-[17px] mt-4 md:mt-5 max-w-[760px]">
            Off-screen, exploring fashion, architectural photography, curated visuals, and creative experiments.
          </p>

          <div className="h-px bg-white/15 mt-8 md:mt-10" />

          {/* Desktop stats */}
          <div className="hidden lg:grid grid-cols-3 gap-6 mt-5 md:mt-6 w-full">
            <StatItem value="5+" caption="Years Shipping Products" />
            <StatItem value="15+" caption="Production Web & AI Apps" />
            <StatItem value="100%" caption="Commitment to Quality & Speed" />
          </div>

          {/* Mobile image & stats */}
          <div className="lg:hidden mt-8">
            <div className="relative aspect-[4/5] w-full -mx-6 md:-mx-10 overflow-hidden border-y border-white/10">
              <img
                src="/img/ovais-outfit.jpg"
                alt="Ovais Shaikh"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-4 left-4 md:left-10">
                <span className="inline-flex items-center font-archia text-[10.5px] tracking-[0.16em] uppercase text-white bg-black/55 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5 shadow-lg">
                  Mumbai, IN · 19.08°N
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5 md:gap-8 mt-10">
              <StatItem value="5+" caption="Years Shipping Products" />
              <StatItem value="15+" caption="Production Web & AI Apps" />
              <StatItem value="100%" caption="Commitment to Quality & Speed" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive mouse movement Image Trail */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {trail.map((item) => (
            <motion.div
              key={item.id}
              className="absolute"
              style={{
                left: item.x - 88,
                top: item.y - 112,
                rotate: item.rotation,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.6, ease: 'easeOut' },
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onAnimationComplete={() => {
                setTimeout(() => removeTrailItem(item.id), 700);
              }}
            >
              <img
                src={item.src}
                alt=""
                width={176}
                height={224}
                className="w-[176px] h-[224px] rounded-2xl object-cover shadow-2xl border border-white/20 select-none pointer-events-none"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
