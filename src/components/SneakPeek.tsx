const row1Images = [
  { src: '/images/portfolio_showcase/1_havenspaces_hero_case_study.jpg', alt: 'HavenSpaces Hero' },
  { src: '/images/portfolio_showcase/agrilocal/1_agrilocal_hero_case_study.jpg', alt: 'AgriLocal Hero' },
  { src: '/images/portfolio_showcase/lumiere/hero.png', alt: 'Lumiere High Fashion' },
  { src: '/images/portfolio_showcase/sunshine/full-collection.jpg', alt: 'Sunshine Collection' },
];

const row2Images = [
  { src: '/images/portfolio_showcase/2_havenspaces_interface_screens.jpg', alt: 'HavenSpaces UI' },
  { src: '/images/portfolio_showcase/agrilocal/2_agrilocal_interface_screens.jpg', alt: 'AgriLocal Screens' },
  { src: '/images/portfolio_showcase/lumiere/ring.png', alt: 'Lumiere Ring' },
  { src: '/img/ovais-outfit.jpg', alt: 'Ovais Shaikh' },
];

const row3Images = [
  { src: '/images/portfolio_showcase/3_havenspaces_features_showcase.jpg', alt: 'HavenSpaces Features' },
  { src: '/images/portfolio_showcase/sunshine/chandan-face-pack.png', alt: 'Chandan Pack' },
  { src: '/images/portfolio_showcase/lumiere/bridal-ring-1.png', alt: 'Bridal Ring' },
  { src: '/images/portfolio_showcase/sunshine/rose-face-pack.png', alt: 'Rose Pack' },
];

const row4Images = [
  { src: '/images/portfolio_showcase/agrilocal/1_agrilocal_hero_case_study.jpg', alt: 'AgriLocal AI' },
  { src: '/images/portfolio_showcase/1_havenspaces_hero_case_study.jpg', alt: 'HavenSpaces' },
  { src: '/images/portfolio_showcase/lumiere/earrings.png', alt: 'Diamond Earrings' },
  { src: '/images/portfolio_showcase/sunshine/neem-face-wash.jpg', alt: 'Neem Face Wash' },
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
            className="relative flex-shrink-0 w-[380px] h-[260px] rounded-2xl overflow-hidden border border-white/10 mx-3 bg-white/[0.04] pointer-events-none"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover opacity-90"
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
