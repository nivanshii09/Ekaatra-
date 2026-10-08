import React from 'react';
import { ChevronDown, Compass } from 'lucide-react';
import { LuxuryImage } from '../ui/LuxuryImage';
import { HOTEL_INFO, WHATSAPP_CONFIG } from '../../data/hotelData';
import { EkaatraLogo } from '../ui/EkaatraLogo';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

interface HeroProps {
  onOpenBooking: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative w-full h-screen min-h-[640px] max-h-[1100px] flex items-center justify-center overflow-hidden">
      {/* Background Architectural Visual (The White Boutique Tower with Arched Windows at Dusk) */}
      <div className="absolute inset-0 z-0">
        <LuxuryImage
          id="hero_facade"
          alt="Ekaatra boutique hotel tower facade with warm illuminated arched windows at dusk"
          className="w-full h-full scale-105 transition-transform duration-1000 ease-out"
          priority
        />
        {/* Measured contrast scrim ensuring WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white mt-12 sm:mt-16">
        {/* Official Brand Logo with Gold Mandala Emblem */}
        <div className="mb-6 sm:mb-8">
          <EkaatraLogo theme="light" size="lg" />
        </div>

        {/* Primary Tagline */}
        <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#F2ECE4] font-normal tracking-wide max-w-2xl mx-auto">
          &ldquo;{HOTEL_INFO.tagline}&rdquo;
        </p>

        {/* Supporting Narrative */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base text-[#D6CEBE] max-w-xl mx-auto leading-relaxed font-light tracking-wide">
          An intimate boutique sanctuary framed by arched windows, a serene arrival sanctuary, and handcrafted teakwood suites — secluded in Kukas, Jaipur.
        </p>

        {/* CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href={WHATSAPP_CONFIG.getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF8F5] text-[#1C1917] hover:bg-[#B89355] hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.22em] font-medium flex items-center justify-center gap-2.5 shadow-lg group cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />
            <span>Book via WhatsApp</span>
          </a>

          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/60 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-xs uppercase tracking-[0.22em] font-medium flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#D9AA82]" />
            Explore Ekaatra
          </button>
        </div>
      </div>

      {/* Subtle Cinematic Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#D6CEBE] mb-1 font-light">
          Scroll to Discover
        </span>
        <ChevronDown className="w-4 h-4 text-[#D6CEBE] animate-bounce" />
      </div>
    </section>
  );
};
