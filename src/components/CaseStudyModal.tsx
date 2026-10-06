import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  tags: string[];
  description: string;
  heroImage: string;
  highlights: string[];
  screens?: string[];
  illustrations?: string[];
  videoSrc?: string;
}

export const projectsData: Record<string, ProjectDetail> = {
  havenspaces: {
    id: 'havenspaces',
    title: 'HavenSpaces',
    subtitle: 'Modern proptech platform for verified homes, apartments & PG discovery',
    role: 'Staff Product Engineer',
    year: '2025 - 2026',
    tags: ['Real Estate', 'Proptech', 'Next.js 15', 'UI/UX Design', 'Tailwind CSS'],
    description:
      'HavenSpaces is a high-performance proptech discovery platform designed for renters, buyers, and PG seekers. Built with Next.js App Router, Tailwind CSS, and Framer Motion, it features interactive map filters, schedule-a-tour flows, verified owner badges, and modular property cards.',
    heroImage: '/images/portfolio_showcase/1_havenspaces_hero_case_study.webp',
    highlights: [
      'Engineered multi-criteria property search with instant filter sliders (Beds, Price, Amenities, PG Rooms).',
      'Designed frictionless schedule-a-tour booking sheet and verified landlord assurance badges.',
      'Constructed responsive desktop & mobile interfaces with high-contrast architectural aesthetics.',
    ],
    screens: [
      '/images/portfolio_showcase/2_havenspaces_interface_screens.webp',
      '/images/portfolio_showcase/3_havenspaces_features_showcase.webp',
      '/images/portfolio_showcase/1_havenspaces_hero_case_study.webp',
    ],
  },
  agrilocal: {
    id: 'agrilocal',
    title: 'AgriLocal.ai',
    subtitle: 'AI-powered smart agriculture assistant with hands-free multilingual voice',
    role: 'Lead Full-Stack & AI Developer',
    year: '2025 - 2026',
    tags: ['AI Agritech', 'Voice AI', 'Multilingual', 'Chatbot', 'Smart Farming'],
    description:
      'AgriLocal.ai bridges the gap between modern agriculture and AI technology for regional farmers. It combines real-time multilingual voice recognition (English, Hindi, Marathi), AgriBot advisory chat, camera-based crop disease diagnostics, soil moisture radar charts, and live mandi market prices.',
    heroImage: '/images/portfolio_showcase/agrilocal/1_agrilocal_hero_case_study.webp',
    highlights: [
      'Built hands-free voice interface allowing farmers in the field to query crop advice in local regional dialects.',
      'Implemented real-time mandi crop price trackers and AI-powered crop disease camera scanner.',
      'Developed soil health, weather forecast, and Maharashtra farmers directory modules.',
    ],
    screens: [
      '/images/portfolio_showcase/agrilocal/2_agrilocal_interface_screens.webp',
      '/images/portfolio_showcase/agrilocal/1_agrilocal_hero_case_study.webp',
    ],
  },
  lumiere: {
    id: 'lumiere',
    title: 'Lumière',
    subtitle: 'Timeless luxury fine jewellery digital flagship & e-commerce',
    role: 'Lead Product Designer & UX Architect',
    year: '2024 - 2026',
    tags: ['Luxury E-Commerce', 'Next.js 15', '3D Card Tilt', 'Fine Jewellery', 'Framer Motion'],
    description:
      'Lumière is an immersive luxury e-commerce platform crafted for fine jewellery. It delivers an exclusive digital salon experience through 3D card tilt physics on diamond pieces, pan-and-zoom inspection, URL-state category filtering, and bespoke bridal ring storytelling.',
    heroImage: '/images/portfolio_showcase/lumiere/hero.webp',
    highlights: [
      'Pioneered physical 3D card tilt physics reflecting multidimensional gemstone brilliance on hover.',
      'Created pan-and-zoom product inspection canvas for carat, metal hallmark, and pave analysis.',
      'Designed editorial bridal storytelling collections with smooth slide-over filter drawers.',
    ],
    screens: [
      '/images/portfolio_showcase/lumiere/ring.webp',
      '/images/portfolio_showcase/lumiere/bridal-ring-1.webp',
      '/images/portfolio_showcase/lumiere/bridal-ring-2.webp',
      '/images/portfolio_showcase/lumiere/earrings.webp',
    ],
  },
  sunshine: {
    id: 'sunshine',
    title: 'Sunshine Herbal',
    subtitle: 'Organic Ayurvedic and botanical skincare & haircare D2C store',
    role: 'Full Stack Web Developer',
    year: '2024 - 2026',
    tags: ['D2C E-Commerce', 'Ayurveda', 'Botanical Care', 'React + Vite', 'Tailwind CSS'],
    description:
      'Sunshine brings ancient Ayurvedic self-care rituals to a modern D2C storefront. Built with React and Tailwind CSS, it features dual-layer ingredient transparency cards, step-by-step application rituals, benefit-focused filtering, and a mobile-first sticky navigation.',
    heroImage: '/images/portfolio_showcase/sunshine/full-collection.webp',
    highlights: [
      'Engineered interactive dual-card flip showing pure product bottles alongside raw active botanical herbs.',
      'Built step-by-step "How to Use" application ritual flows for targeted skin and hair types.',
      'Designed mobile bottom navigation bar with live cart counters and instant WhatsApp order triggers.',
    ],
    screens: [
      '/images/portfolio_showcase/sunshine/neem-face-wash.webp',
      '/images/portfolio_showcase/sunshine/neem-face-wash-ingredients.webp',
      '/images/portfolio_showcase/sunshine/chandan-face-pack.webp',
      '/images/portfolio_showcase/sunshine/rose-face-pack.webp',
      '/images/portfolio_showcase/sunshine/shikakai-shampoo.webp',
      '/images/portfolio_showcase/sunshine/aloe-vera-shampoo.webp',
    ],
  },
};

import { useProjects } from '../hooks/useProjects';

interface CaseStudyModalProps {
  projectId: string | null;
  onClose: () => void;
}

export default function CaseStudyModal({ projectId, onClose }: CaseStudyModalProps) {
  const { projects } = useProjects();
  const project = projectId ? projects[projectId] : null;

  useEffect(() => {
    if (project) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const lenis = (window as any).__lenis;
      if (lenis?.stop) lenis.stop();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = prev;
        if (lenis?.start) lenis.start();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          data-lenis-prevent="true"
          data-lenis-prevent-touch="true"
          data-lenis-prevent-wheel="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex justify-center items-start p-4 sm:p-6 md:p-10"
          style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
            data-lenis-prevent-touch="true"
            data-lenis-prevent-wheel="true"
            className="relative w-full max-w-5xl bg-[#0e0e12] border border-white/15 rounded-3xl overflow-hidden text-white shadow-2xl my-4 sm:my-8"
            style={{ overscrollBehavior: 'contain', touchAction: 'pan-y' }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-6 right-6 z-30 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Hero Cover Image */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-black/40">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-95" />
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-10 md:p-14">
              {/* Tags & meta */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-archia text-[11px] tracking-[0.06em] uppercase rounded-full px-3 py-1 bg-white/10 text-white/80 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
                <span className="font-archia text-[12px] text-white/40 ml-auto">
                  {project.role} · {project.year}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-sans font-[500] text-3xl sm:text-5xl text-white tracking-tight leading-[1.1] mb-4">
                {project.title}
              </h1>
              <p className="font-archia text-lg sm:text-xl text-white/70 leading-relaxed mb-8 max-w-3xl">
                {project.subtitle}
              </p>

              {/* Video preview if available */}
              {project.videoSrc && (
                <div className="mb-10 rounded-2xl overflow-hidden border border-white/15 bg-black">
                  <video
                    src={project.videoSrc}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-auto max-h-[500px] object-contain"
                  />
                </div>
              )}

              {/* Description */}
              <div className="border-t border-white/10 pt-8 mb-10">
                <h3 className="font-archia text-sm uppercase tracking-wider text-white/40 mb-3">
                  Overview
                </h3>
                <p className="font-sans font-[400] text-[16px] sm:text-[17px] text-white/80 leading-[1.7] max-w-3xl">
                  {project.description}
                </p>
              </div>

              {/* Key Highlights */}
              <div className="border-t border-white/10 pt-8 mb-10">
                <h3 className="font-archia text-sm uppercase tracking-wider text-white/40 mb-4">
                  Key Design Contributions
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between"
                    >
                      <span className="font-archia text-xs text-white/30 mb-2">0{idx + 1}</span>
                      <p className="font-sans text-[15px] text-white/80 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preview Screens */}
              {project.screens && project.screens.length > 0 && (
                <div className="border-t border-white/10 pt-8 mb-10">
                  <h3 className="font-archia text-sm uppercase tracking-wider text-white/40 mb-4">
                    Interface Screens
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {project.screens.map((screen, sIdx) => (
                      <div
                        key={sIdx}
                        className="rounded-xl overflow-hidden border border-white/10 bg-black/40 aspect-[9/16] relative shadow-lg"
                      >
                        <img
                          src={screen}
                          alt={`${project.title} screen ${sIdx + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Illustrations if available */}
              {project.illustrations && project.illustrations.length > 0 && (
                <div className="border-t border-white/10 pt-8 mb-8">
                  <h3 className="font-archia text-sm uppercase tracking-wider text-white/40 mb-4">
                    Custom Brand Illustrations
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {project.illustrations.map((ill, iIdx) => (
                      <div
                        key={iIdx}
                        className="rounded-xl p-4 flex items-center justify-center border border-white/10 bg-white/[0.02]"
                      >
                        <img
                          src={ill}
                          alt="Illustration"
                          className="max-h-24 object-contain"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal footer CTA */}
              <div className="border-t border-white/10 pt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="font-sans text-[15px] text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  ← Back to Portfolio
                </button>
                <a
                  href="mailto:ovais.0404@gmail.com"
                  className="inline-flex items-center gap-1.5 bg-white text-black font-sans font-[500] text-[15px] px-6 py-3 rounded-full hover:bg-white/85 transition-colors"
                >
                  Get in touch
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="#0a0a0a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
