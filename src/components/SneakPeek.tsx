const row1Images = [
  { src: '/images/portfolio_showcase/hehe/card 1.jpg', alt: 'Furni - Modern Interior Design Studio' },
  { src: '/images/portfolio_showcase/hehe/card 2.webp', alt: 'Mindtech - IT & Cloud Solutions' },
  { src: '/images/portfolio_showcase/1_havenspaces_hero_case_study.webp', alt: 'HavenSpaces Proptech' },
  { src: '/images/portfolio_showcase/hehe/card 3.webp', alt: 'Simply - Clean Web Design Studio' },
];

const row2Images = [
  { src: '/images/portfolio_showcase/hehe/card 4.webp', alt: 'SkyGlide - Visit Tokyo Travel Platform' },
  { src: '/images/portfolio_showcase/agrilocal/1_agrilocal_hero_case_study.webp', alt: 'AgriLocal.ai Smart Farming' },
  { src: '/images/portfolio_showcase/hehe/card 5.webp', alt: 'Borcelle - Gourmet Burger App' },
  { src: '/images/portfolio_showcase/lumiere/hero.webp', alt: 'Lumière High Jewellery' },
];

const row3Images = [
  { src: '/images/portfolio_showcase/hehe/card 6.webp', alt: 'Taor - Dining & Cuisine Booking Platform' },
  { src: '/images/portfolio_showcase/sunshine/full-collection.webp', alt: 'Sunshine Botanical Skincare' },
  { src: '/images/portfolio_showcase/hehe/card 7.webp', alt: 'Space - Astronomy & Telescope Platform' },
  { src: '/images/portfolio_showcase/2_havenspaces_interface_screens.webp', alt: 'HavenSpaces UI' },
];

const row4Images = [
  { src: '/images/portfolio_showcase/hehe/card 2.webp', alt: 'Mindtech Tech Service Solutions' },
  { src: '/images/portfolio_showcase/agrilocal/2_agrilocal_interface_screens.webp', alt: 'AgriLocal Diagnostics' },
  { src: '/images/portfolio_showcase/hehe/card 1.jpg', alt: 'Furni Studio UI' },
  { src: '/images/portfolio_showcase/hehe/card 4.webp', alt: 'SkyGlide Travel Experience' },
];

const EMAIL = 'ovais.0404@gmail.com';

function MarqueeRow({
  images,
  direction = 'left',
}: {
  images: { src: string; alt: string }[];
  direction?: 'left' | 'right';
}) {
  // Repeat images 12 times for seamless infinite loop
  const repeated = Array.from({ length: 12 }, () => images).flat();
  const animClass = direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';

  return (
    <div className="overflow-visible">
      <div className={`flex ${animClass}`} style={{ width: 'max-content' }}>
        {repeated.map((img, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-[420px] h-[280px] rounded-2xl overflow-hidden border border-white/15 mx-3.5 bg-neutral-900 shadow-2xl pointer-events-none"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover object-top opacity-95 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SneakPeek() {
  return (
    <section
      id="sneak-peek"
      className="relative w-full overflow-hidden flex flex-col items-center justify-center pt-24 pb-0"
      style={{ minHeight: '85vh' }}
    >
      {/* -45deg angled rotating wall */}
      <div
        className="absolute top-1/2 left-1/2 flex flex-col gap-6"
        style={{
          transform: 'translate(-50%, -50%) rotate(-45deg)',
          transformOrigin: 'center',
          width: 'max-content',
        }}
      >
        <MarqueeRow images={row1Images} direction="left" />
        <MarqueeRow images={row2Images} direction="right" />
        <MarqueeRow images={row3Images} direction="left" />
        <MarqueeRow images={row4Images} direction="right" />
      </div>

      {/* Top fade gradient */}
      <div
        className="absolute inset-x-0 top-0 h-[22%] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Bottom fade gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-[22%] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Centered Glowing Floating CTA button */}
      <div
        className="relative z-20 flex flex-col items-center gap-6 text-center"
        style={{
          filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.95)) drop-shadow(0 0 80px rgba(0,0,0,0.85))',
        }}
      >
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-1.5 bg-white text-black hover:bg-neutral-100 hover:scale-105 active:scale-95 border border-white/40 font-sans font-[500] text-[17px] md:text-[18px] px-7 py-4 md:px-8 md:py-[18px] rounded-full transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          Get in touch
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
