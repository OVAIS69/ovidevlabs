import { useState, useEffect, useCallback } from 'react';
import CrazyResumeButton from './CrazyResumeButton';

const navLinks = [
  { label: 'Selected Work', href: '#work-cards' },
  { label: 'About', href: '#about' },
  { label: 'Highlights', href: '#hacks' },
];

const EMAIL = 'ovais.0404@gmail.com';

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

interface HeaderProps {
  variant?: 'light' | 'dark';
  onNavigateHome?: () => void;
}

export default function Header({ variant: initialVariant, onNavigateHome }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-detect whether user has scrolled into dark realm (#about, #hacks, #sneak-peek, #footer)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        // Switch to dark theme when about section enters upper half of viewport
        setIsDarkSection(rect.top <= 120);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileMenuOpen]);

  const isDark = initialVariant ? initialVariant === 'dark' : isDarkSection;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    }
    const targetId = href.replace(/^#/, '');
    if (!targetId) return;

    const el = document.getElementById(targetId);
    const lenis = (window as any).__lenis;

    if (el) {
      e.preventDefault();
      if (lenis?.scrollTo) {
        lenis.scrollTo(el, { offset: -90, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCopyEmail = useCallback(async () => {
    const success = await copyToClipboard(EMAIL);
    if (success) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  }, []);

  const linkColor = isDark
    ? 'text-white/85 hover:text-white'
    : 'text-black/80 hover:text-black';

  const ctaBtn = isDark
    ? 'bg-white text-black hover:bg-white/90 active:scale-95 shadow-[0_2px_12px_rgba(255,255,255,0.15)]'
    : 'bg-black text-white hover:bg-neutral-800 active:scale-95 shadow-[0_2px_12px_rgba(0,0,0,0.1)]';

  const arrowStroke = isDark ? '#0a0a0a' : '#F2F6FF';
  const iconStroke = isDark ? '#ffffff' : '#0a0a0a';

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6 pointer-events-none">
      <nav
        className={`pointer-events-auto relative z-10 mx-auto flex items-center justify-between transition-all duration-500 ease-out ${
          scrolled
            ? `max-w-[720px] border backdrop-blur-xl ${
                isDark
                  ? 'bg-[#0e0e12]/80 border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
                  : 'bg-white/85 border-[var(--color-border)] shadow-[0_12px_36px_rgba(0,0,0,0.08)]'
              } h-[56px] px-3.5 rounded-full`
            : 'max-w-full bg-transparent border border-transparent h-[64px] px-6 rounded-full'
        }`}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            if (onNavigateHome) {
              e.preventDefault();
              onNavigateHome();
            }
            const lenis = (window as any).__lenis;
            if (lenis?.scrollTo) {
              lenis.scrollTo(0, { duration: 1.2 });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          aria-label="Bling Bling Studio Home"
          className={`relative flex-shrink-0 transition-all duration-300 hover:scale-105 active:scale-95 ${
            scrolled ? 'w-[32px] h-[32px]' : 'w-[42px] h-[42px]'
          }`}
        >
          <img
            src="/img/logo.png"
            alt="Bling Bling"
            className={`w-full h-full object-contain transition-all duration-500 ${isDark ? 'invert' : ''}`}
          />
        </a>

        {/* Desktop nav links */}
        <ul className={`hidden md:flex items-center transition-all duration-300 ${scrolled ? 'gap-6' : 'gap-9'}`}>
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`font-sans font-[450] ${linkColor} transition-all duration-300 hover:-translate-y-0.5 inline-block ${
                  scrolled ? 'text-[14.5px]' : 'text-[17px]'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <CrazyResumeButton variant="header" />
          <a
            href={`mailto:${EMAIL}`}
            className={`flex items-center gap-1.5 ${ctaBtn} font-sans font-[500] transition-all duration-300 rounded-full ${
              scrolled ? 'text-[13px] px-3.5 py-1.5' : 'text-[15px] px-4 py-2.5'
            }`}
          >
            Get in touch
            <svg
              width={scrolled ? 13 : 15}
              height={scrolled ? 13 : 15}
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke={arrowStroke}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Mobile menu hamburger toggle */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className={`md:hidden flex items-center justify-center w-10 h-10 -mr-1 rounded-full cursor-pointer transition-colors ${
            isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {mobileMenuOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" stroke={iconStroke} strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="6" x2="6" y2="18" stroke={iconStroke} strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" stroke={iconStroke} strokeWidth="2" strokeLinecap="round" />
                <line x1="4" y1="16" x2="20" y2="16" stroke={iconStroke} strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer Backdrop & Menu */}
      <div
        id="mobile-nav"
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`relative mx-4 mt-[80px] rounded-3xl border p-6 flex flex-col gap-1 backdrop-blur-2xl transition-all duration-300 ${
            mobileMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
          } ${
            isDark
              ? 'bg-[#111116]/95 border-white/20 shadow-[0_24px_64px_rgba(0,0,0,0.8)]'
              : 'bg-white/95 border-[var(--color-border)] shadow-[0_24px_64px_rgba(0,0,0,0.15)]'
          }`}
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`font-sans font-[450] text-[18px] py-3 transition-colors ${linkColor}`}
            >
              {label}
            </a>
          ))}

          <div className="h-px bg-current/10 my-2" />

          <div className="flex flex-col gap-2.5">
            <CrazyResumeButton variant="about" className="w-full justify-center" />

            <a
              href={`mailto:${EMAIL}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`inline-flex items-center justify-center gap-1.5 ${ctaBtn} font-sans font-[500] text-[15px] px-4 py-3 rounded-full`}
            >
              Get in touch
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke={arrowStroke}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <button
            type="button"
            onClick={handleCopyEmail}
            aria-live="polite"
            aria-label="Copy email to clipboard"
            className={`mt-2 inline-flex items-center justify-center gap-2 font-sans font-[500] text-[14.5px] px-4 py-3 rounded-full border transition-colors cursor-pointer ${
              isDark
                ? 'border-white/20 text-white hover:bg-white/10'
                : 'border-black/15 text-black hover:bg-black/[0.04]'
            }`}
          >
            {copied ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-400"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-emerald-400">Copied to clipboard!</span>
              </>
            ) : (
              <>
                <span>Copy email to clipboard</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
