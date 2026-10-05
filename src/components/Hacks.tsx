import { useState, useRef, useEffect, useCallback } from 'react';
import Badge from './Badge';
import Reveal from './Reveal';

interface HackItem {
  name: string;
  prizes: string[];
  photo: string;
  rotation: number;
  href: string;
}

const hacksData: HackItem[] = [
  {
    name: 'Lumière',
    prizes: [
      'Luxury Fine Jewellery 3D Tilt E-Commerce',
      'High-End Editorial Aesthetics & Pan-and-Zoom',
      'Next.js 15 App Router & Motion UX',
    ],
    photo: '/images/portfolio_showcase/lumiere/hero.png',
    rotation: -3,
    href: 'https://github.com/OVAIS69/Lumiere',
  },
  {
    name: 'AgriLocal.ai',
    prizes: [
      'AI Multilingual Voice Assistant (EN / HI / MR)',
      'Crop Disease Vision Camera Scanner',
      'Live Mandi Rates & Farmers Directory',
    ],
    photo: '/images/portfolio_showcase/agrilocal/1_agrilocal_hero_case_study.jpg',
    rotation: 4,
    href: 'https://github.com/OVAIS69/AgriLocal.ai',
  },
  {
    name: 'HavenSpaces',
    prizes: [
      'Proptech Real Estate Discovery & Booking',
      'Interactive Map Exploration & Landlord Badges',
      'High-Converting Listing Architecture',
    ],
    photo: '/images/portfolio_showcase/1_havenspaces_hero_case_study.jpg',
    rotation: -4,
    href: 'https://github.com/OVAIS69/Havenspaces',
  },
];

export default function Hacks() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const lerp = useCallback(() => {
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.1217;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.1217;

    if (followerRef.current) {
      followerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
    }
    rafRef.current = requestAnimationFrame(lerp);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(lerp);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [lerp]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const rect = sec.getBoundingClientRect();
    targetPos.current.x = e.clientX - rect.left + 40;
    targetPos.current.y = e.clientY - rect.top - 200;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveIdx(null);
  }, []);

  return (
    <section
      id="hacks"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative max-w-[1200px] mx-auto px-6 py-24 md:py-32 scroll-mt-24"
    >
      <Badge dark>Key Highlights</Badge>

      <div className="text-center max-w-[680px] mx-auto mb-16 md:mb-20">
        <h2 className="font-sans font-[450] text-[clamp(2rem,4vw,3.5rem)] text-white leading-[1.05] mb-3">
          Builder & Technologist
        </h2>
        <p className="font-sans font-[450] text-[18px] text-white/65 leading-relaxed">
          Turning ideas into high-impact digital ventures & scalable products
        </p>
      </div>

      {/* List of Hackathons */}
      <ul className="relative border-t border-white/15">
        {hacksData.map((hack, index) => {
          const baseDelay = 140 * index;
          return (
            <li key={hack.name} className="border-b border-white/15">
              <a
                href={hack.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveIdx(index)}
                onMouseLeave={() => setActiveIdx((prev) => (prev === index ? null : prev))}
                className="group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-12 items-start py-10 md:py-12 transition-colors duration-300 hover:bg-white/[0.04] cursor-pointer"
              >
                <Reveal delayMs={baseDelay} durationMs={850}>
                  <h3 className="font-sans font-[450] text-[clamp(1.75rem,3vw,2.5rem)] text-white leading-[1.1] inline-flex items-center gap-3">
                    {hack.name}
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-white/55 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 12L12 4M12 4H6M12 4v6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </h3>
                </Reveal>

                <ul className="flex flex-col gap-2 md:text-right md:items-end">
                  {hack.prizes.map((prize, pIdx) => (
                    <li key={prize}>
                      <Reveal delayMs={baseDelay + 120 + 70 * pIdx} durationMs={700}>
                        <span className="font-archia text-[15px] md:text-[16px] text-white/70 leading-snug inline-block">
                          {prize}
                        </span>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Floating Cursor-Follower Preview Cards */}
      <div
        ref={followerRef}
        className="hidden md:block absolute top-0 left-0 pointer-events-none z-30"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      >
        {hacksData.map((hack, index) => {
          const isActive = activeIdx === index;
          return (
            <div
              key={hack.name}
              className="absolute top-0 left-0 transition-all duration-300 ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                transform: `rotate(${hack.rotation}deg) scale(${isActive ? 1 : 0.85})`,
                transformOrigin: 'center',
              }}
            >
              <div className="relative w-[260px] h-[325px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-white/10">
                <img
                  src={hack.photo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
