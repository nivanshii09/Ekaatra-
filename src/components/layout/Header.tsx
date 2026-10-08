import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, MapPin, Instagram, ExternalLink, Camera } from 'lucide-react';
import { HOTEL_INFO, WHATSAPP_CONFIG } from '../../data/hotelData';
import { EkaatraLogo } from '../ui/EkaatraLogo';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { useImageContext } from '../../context/ImageContext';

interface HeaderProps {
  onOpenBooking: () => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openManager } = useImageContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Sanctuary', href: '#about' },
    { label: 'Accommodations', href: '#stay' },
    { label: 'Foyers & Circulation', href: '#architecture' },
    { label: 'Captures', href: '#gallery' },
    { label: 'Instagram', href: '#social' },
    { label: 'Location', href: '#location' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#ECE7DE] py-3.5 shadow-sm'
            : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Zone 1: Official Brand Identity (Top Bar Contract) */}
          <a
            href="#"
            className="transition-transform duration-200 hover:scale-102"
            aria-label="Ekaatra by PEM, Jaipur"
          >
            <EkaatraLogo
              variant="horizontal"
              theme={isScrolled ? 'dark' : 'light'}
              size="sm"
            />
          </a>

          {/* Zone 2: 4–6 text navigation links, single-line (Top Bar Contract) */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative py-1 transition-colors whitespace-nowrap hover:opacity-100 ${
                  isScrolled
                    ? 'text-[#44403C] hover:text-[#B89355]'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1–2 primary actions (Top Bar Contract) */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <button
              type="button"
              onClick={() => openManager('building_tower')}
              className={`inline-flex items-center justify-center px-3 py-2 text-xs uppercase tracking-[0.16em] font-medium transition-all duration-200 whitespace-nowrap gap-1.5 cursor-pointer shadow-xs ${
                isScrolled
                  ? 'border border-[#1C1917]/25 text-[#1C1917] hover:bg-[#B89355] hover:text-white hover:border-[#B89355]'
                  : 'border border-white/30 text-white bg-black/25 backdrop-blur-xs hover:bg-white/20 hover:border-white'
              }`}
              title="Attach your exact photo files (Main building.png, etc.)"
            >
              <Camera className="w-3.5 h-3.5 text-[#B89355]" />
              <span className="hidden md:inline">Attach Real Photos</span>
            </button>

            <a
              href={WHATSAPP_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 whitespace-nowrap gap-1.5 shadow-xs ${
                isScrolled
                  ? 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#25D366] hover:text-white'
                  : 'bg-white/95 text-[#1C1917] hover:bg-[#25D366] hover:text-white hover:shadow-lg'
              }`}
              title="Book via WhatsApp +91 98996 11425"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] group-hover:text-white" />
              <span>Book via WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89355] ${
                isScrolled ? 'text-[#1C1917]' : 'text-white'
              }`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer content */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#FAF8F5] p-6 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#ECE7DE]">
              <span className="font-serif text-2xl tracking-[0.25em] text-[#1C1917] font-medium">
                EKAATRA
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#7D7569] hover:text-[#1C1917] focus-visible:ring-2 focus-visible:ring-[#B89355]"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-2 text-[11px] uppercase tracking-widest text-[#7D7569] flex items-center gap-1.5 mt-3">
              <MapPin className="w-3.5 h-3.5 text-[#B89355]" />
              <span>Kukas, Rajasthan</span>
            </div>

            <nav className="mt-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-serif text-2xl text-[#1C1917] hover:text-[#B89355] transition-colors py-1.5 tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#ECE7DE] space-y-4">
            <a
              href={HOTEL_INFO.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-3 bg-[#F5F2EA] border border-[#DFD7C8] rounded-xs flex items-center justify-between text-xs text-[#1C1917] hover:border-[#B89355] transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#B89355] group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-medium block leading-tight">{HOTEL_INFO.contact.instagram}</span>
                  <span className="text-[10px] text-[#78716C]">Official Instagram · Follow</span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#A8A29E]" />
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openManager('building_tower');
              }}
              className="w-full py-3 bg-[#1C1917] hover:bg-[#B89355] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Camera className="w-4 h-4 text-[#B89355]" />
              <span>Attach Real Photos (Main building.png)</span>
            </button>

            <a
              href={WHATSAPP_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Book via WhatsApp</span>
            </a>

            <div className="text-xs text-[#7D7569] space-y-1.5 pt-1">
              <p className="font-medium text-[#1C1917]">Ekaatra by PEM, Jaipur</p>
              <p className="text-[11px] leading-relaxed">{HOTEL_INFO.address.line1}, {HOTEL_INFO.address.locality}</p>
              <p className="text-[11px] text-[#78716C]">Telephone: {HOTEL_INFO.contact.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
