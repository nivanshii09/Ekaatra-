import React from 'react';
import { MapPin, Phone, Mail, Instagram, MessageSquare, ArrowUp, Lock } from 'lucide-react';
import { HOTEL_INFO } from '../../data/hotelData';
import { EkaatraLogo } from '../ui/EkaatraLogo';

interface FooterProps {
  onOpenPolicy: (type: 'policies' | 'privacy' | 'terms') => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] border-t border-[#292524] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2E2825]">
          {/* Brand & Address Column (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="pb-1">
              <EkaatraLogo variant="horizontal" theme="light" size="md" />
            </div>
            <p className="font-serif italic text-sm text-[#D9AA82]">
              &ldquo;{HOTEL_INFO.tagline}&rdquo;
            </p>
            <p className="text-xs text-[#A8A29E] font-light leading-relaxed max-w-sm">
              An intimate boutique hotel sanctuary in Kukas, Jaipur — blending contemporary architectural arches, handcrafted teakwood suites, and mindful hospitality.
            </p>

            <div className="pt-2 text-xs text-[#A8A29E] space-y-1.5 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B89355] shrink-0 mt-0.5" />
                <span>
                  {HOTEL_INFO.address.line1}, {HOTEL_INFO.address.locality}<br />
                  {HOTEL_INFO.address.state} {HOTEL_INFO.address.pinCode}, {HOTEL_INFO.address.country}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#D9AA82]">
              Explore
            </h4>
            <nav className="flex flex-col space-y-2 text-xs text-[#D6CEBE]">
              <a href="#about" className="hover:text-white transition-colors">The Arrival Sanctuary</a>
              <a href="#stay" className="hover:text-white transition-colors">Accommodations & Suites</a>
              <a href="#architecture" className="hover:text-white transition-colors">Foyers & Vertical Circulation</a>
              <a href="#gallery" className="hover:text-white transition-colors">Moments of Ekaatra</a>
              <a href="#social" className="hover:text-white transition-colors">Instagram Dispatches</a>
              <a href="#location" className="hover:text-white transition-colors">Directions & Location</a>
            </nav>
          </div>

          {/* Contact Placeholders (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#D9AA82]">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-[#D6CEBE] font-light">
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B89355] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C] block">Telephone</span>
                  <span className="text-stone-300">{HOTEL_INFO.contact.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B89355] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C] block">Reservations</span>
                  <span className="text-stone-300">{HOTEL_INFO.contact.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#B89355] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C] block">WhatsApp Concierge</span>
                  <span className="text-stone-300">{HOTEL_INFO.contact.conciergeWhatsApp}</span>
                </div>
              </div>

              <a
                href={HOTEL_INFO.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 group hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#B89355] group-hover:text-pink-400 shrink-0 mt-0.5 transition-colors" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C] block group-hover:text-[#D9AA82]">Official Instagram</span>
                  <span className="text-stone-300 group-hover:text-white underline-offset-2 hover:underline">{HOTEL_INFO.contact.instagram}</span>
                </div>
              </a>

              <div className="pt-1">
                <a
                  href={HOTEL_INFO.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#292524] hover:bg-[#B89355] text-white text-[10px] uppercase tracking-wider font-medium transition-colors border border-[#44403C]"
                >
                  <Instagram className="w-3 h-3 text-[#D9AA82]" />
                  <span>Follow @ekaatrabypem</span>
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter / Solitude Note (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#D9AA82]">
              The Ekaatra Journal
            </h4>
            <p className="text-xs text-[#A8A29E] font-light leading-relaxed">
              Quiet seasonal dispatches on desert nature, seasonal culinary harvests, and private cultural events.
            </p>
            <div className="space-y-2 pt-1">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-[#292524] border border-[#44403C] text-xs px-3 py-2 text-[#FAF8F5] focus:outline-none focus:border-[#B89355]"
              />
              <button
                type="button"
                onClick={(e) => {
                  const target = e.currentTarget;
                  target.innerText = 'Subscribed';
                  target.classList.add('bg-emerald-800', 'text-white');
                }}
                className="w-full py-2 bg-[#B89355] text-[#1C1917] hover:bg-[#FAF8F5] text-[11px] uppercase tracking-widest font-medium transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div className="flex items-center gap-4 flex-wrap">
            <span>© {new Date().getFullYear()} Ekaatra, Kukas. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenPolicy('policies')}
              className="hover:text-[#FAF8F5] transition-colors"
            >
              Hotel Policies
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-[#FAF8F5] transition-colors"
            >
              Privacy Notice
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-[#FAF8F5] transition-colors"
            >
              Terms & Prototype Notice
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-xs text-[#78716C] hover:text-[#B89355] transition-colors"
            >
              <Lock className="w-3 h-3 text-[#B89355]" />
              <span>Owner / Admin Portal (Prototype)</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 border border-[#2E2825] hover:border-[#B89355] text-stone-400 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
