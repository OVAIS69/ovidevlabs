import { useState } from 'react';

interface CrazyResumeButtonProps {
  variant?: 'hero' | 'header' | 'about' | 'compact';
  className?: string;
}

export default function CrazyResumeButton({ variant = 'hero', className = '' }: CrazyResumeButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const resumeUrl = '/Ovais_Shaikh_Resume.pdf';

  if (variant === 'header') {
    return (
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View Ovais Shaikh's Resume (PDF)"
        className={`group relative inline-flex items-center gap-1.5 rounded-full p-[1.5px] transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated gradient border */}
        <span
          className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 via-rose-400 to-amber-300 animate-rainbow"
          aria-hidden="true"
        />
        {/* Inner pill */}
        <span className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-[#0a0a0d] text-white font-sans font-[500] text-[13px] tracking-tight overflow-hidden">
          <span
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-sweep pointer-events-none"
            aria-hidden="true"
          />
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`text-pink-400 transition-transform duration-500 ${isHovered ? 'rotate-90 scale-125' : 'animate-sparkle-spin'}`}
            aria-hidden="true"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
          <span className="bg-gradient-to-r from-white via-pink-100 to-rose-200 bg-clip-text text-transparent">
            Resume
          </span>
          <span className="text-[10px] uppercase font-archia tracking-wider bg-pink-500/25 text-pink-300 px-1.5 py-0.5 rounded-full border border-pink-400/30">
            CV
          </span>
        </span>
      </a>
    );
  }

  // Hero interactive button - completely clean without backdrop glow, matching sibling style
  return (
    <a
      href={resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View or download Ovais Shaikh's resume (PDF)"
      className={`group relative inline-flex items-center justify-center h-[52px] sm:h-[58px] rounded-full p-[1.5px] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-sm ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Iridescent animated gradient border ring */}
      <span
        className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 via-purple-500 to-amber-300 animate-rainbow"
        aria-hidden="true"
      />

      {/* Inner button surface matching exact height */}
      <span className="relative z-10 h-full flex items-center gap-2 sm:gap-2.5 px-6 sm:px-7 rounded-full bg-[#0a0a0f] text-white font-sans font-[500] text-[15px] sm:text-[17px] tracking-tight overflow-hidden">
        {/* Shimmer reflection sweep animation */}
        <span
          className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-sweep pointer-events-none"
          aria-hidden="true"
        />

        {/* Dynamic Sparkle star */}
        <span className="relative flex items-center justify-center text-pink-400">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`transition-transform duration-500 ${isHovered ? 'rotate-180 scale-125' : 'animate-sparkle-spin'}`}
            aria-hidden="true"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </span>

        {/* Text */}
        <span className="bg-gradient-to-r from-white via-rose-100 to-pink-200 bg-clip-text text-transparent font-sans font-[550] whitespace-nowrap">
          Resume / CV
        </span>

        {/* Interactive Badge */}
        <span className="inline-flex items-center gap-1 font-archia text-[10.5px] sm:text-[11px] tracking-wider uppercase bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full border border-pink-400/30">
          PDF
        </span>

        {/* Arrow icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-pink-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        >
          <path d="M7 17l9.2-9.2M17 17V7.8H7.8" />
        </svg>
      </span>
    </a>
  );
}
