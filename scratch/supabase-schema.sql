-- Copy and paste this into your Supabase SQL Editor (https://supabase.com/dashboard/project/nhjlusvogpnzzaarwmgo/sql/new)

-- 1. Create the projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  role TEXT,
  year TEXT,
  tags TEXT[],
  description TEXT,
  hero_image TEXT,
  highlights TEXT[],
  screens TEXT[],
  video_src TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS) and allow public read access
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on projects" 
ON public.projects FOR SELECT 
USING (true);

-- 3. Insert initial project data
INSERT INTO public.projects (id, title, subtitle, role, year, tags, description, hero_image, highlights, screens)
VALUES
(
  'havenspaces',
  'HavenSpaces',
  'Modern proptech platform for verified homes, apartments & PG discovery',
  'Staff Product Engineer',
  '2025 - 2026',
  ARRAY['Real Estate', 'Proptech', 'Next.js 15', 'UI/UX Design', 'Tailwind CSS'],
  'HavenSpaces is a high-performance proptech discovery platform designed for renters, buyers, and PG seekers. Built with Next.js App Router, Tailwind CSS, and Framer Motion, it features interactive map filters, schedule-a-tour flows, verified owner badges, and modular property cards.',
  '/images/portfolio_showcase/1_havenspaces_hero_case_study.webp',
  ARRAY[
    'Engineered multi-criteria property search with instant filter sliders (Beds, Price, Amenities, PG Rooms).',
    'Designed frictionless schedule-a-tour booking sheet and verified landlord assurance badges.',
    'Constructed responsive desktop & mobile interfaces with high-contrast architectural aesthetics.'
  ],
  ARRAY[
    '/images/portfolio_showcase/2_havenspaces_interface_screens.webp',
    '/images/portfolio_showcase/3_havenspaces_features_showcase.webp',
    '/images/portfolio_showcase/1_havenspaces_hero_case_study.webp'
  ]
),
(
  'agrilocal',
  'AgriLocal.ai',
  'AI-powered smart agriculture assistant with hands-free multilingual voice',
  'Lead Full-Stack & AI Developer',
  '2025 - 2026',
  ARRAY['AI Agritech', 'Voice AI', 'Multilingual', 'Chatbot', 'Smart Farming'],
  'AgriLocal.ai bridges the gap between modern agriculture and AI technology for regional farmers. It combines real-time multilingual voice recognition (English, Hindi, Marathi), AgriBot advisory chat, camera-based crop disease diagnostics, soil moisture radar charts, and live mandi market prices.',
  '/images/portfolio_showcase/agrilocal/1_agrilocal_hero_case_study.webp',
  ARRAY[
    'Built hands-free voice interface allowing farmers in the field to query crop advice in local regional dialects.',
    'Implemented real-time mandi crop price trackers and AI-powered crop disease camera scanner.',
    'Developed soil health, weather forecast, and Maharashtra farmers directory modules.'
  ],
  ARRAY[
    '/images/portfolio_showcase/agrilocal/2_agrilocal_interface_screens.webp',
    '/images/portfolio_showcase/agrilocal/1_agrilocal_hero_case_study.webp'
  ]
),
(
  'lumiere',
  'Lumière',
  'Timeless luxury fine jewellery digital flagship & e-commerce',
  'Lead Product Designer & UX Architect',
  '2024 - 2026',
  ARRAY['Luxury E-Commerce', 'Next.js 15', '3D Card Tilt', 'Fine Jewellery', 'Framer Motion'],
  'Lumière is an immersive luxury e-commerce platform crafted for fine jewellery. It delivers an exclusive digital salon experience through 3D card tilt physics on diamond pieces, pan-and-zoom inspection, URL-state category filtering, and bespoke bridal ring storytelling.',
  '/images/portfolio_showcase/lumiere/hero.webp',
  ARRAY[
    'Pioneered physical 3D card tilt physics reflecting multidimensional gemstone brilliance on hover.',
    'Created pan-and-zoom product inspection canvas for carat, metal hallmark, and pave analysis.',
    'Designed editorial bridal storytelling collections with smooth slide-over filter drawers.'
  ],
  ARRAY[
    '/images/portfolio_showcase/lumiere/ring.webp',
    '/images/portfolio_showcase/lumiere/bridal-ring-1.webp',
    '/images/portfolio_showcase/lumiere/bridal-ring-2.webp',
    '/images/portfolio_showcase/lumiere/earrings.webp'
  ]
),
(
  'sunshine',
  'Sunshine Herbal',
  'Organic Ayurvedic and botanical skincare & haircare D2C store',
  'Full Stack Web Developer',
  '2024 - 2026',
  ARRAY['D2C E-Commerce', 'Ayurveda', 'Botanical Care', 'React + Vite', 'Tailwind CSS'],
  'Sunshine brings ancient Ayurvedic self-care rituals to a modern D2C storefront. Built with React and Tailwind CSS, it features dual-layer ingredient transparency cards, step-by-step application rituals, benefit-focused filtering, and a mobile-first sticky navigation.',
  '/images/portfolio_showcase/sunshine/full-collection.webp',
  ARRAY[
    'Engineered interactive dual-card flip showing pure product bottles alongside raw active botanical herbs.',
    'Built step-by-step "How to Use" application ritual flows for targeted skin and hair types.',
    'Designed mobile bottom navigation bar with live cart counters and instant WhatsApp order triggers.'
  ],
  ARRAY[
    '/images/portfolio_showcase/sunshine/neem-face-wash.webp',
    '/images/portfolio_showcase/sunshine/neem-face-wash-ingredients.webp',
    '/images/portfolio_showcase/sunshine/chandan-face-pack.webp',
    '/images/portfolio_showcase/sunshine/rose-face-pack.webp',
    '/images/portfolio_showcase/sunshine/shikakai-shampoo.webp',
    '/images/portfolio_showcase/sunshine/aloe-vera-shampoo.webp'
  ]
)
ON CONFLICT (id) DO NOTHING;
