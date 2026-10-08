import React from 'react';
import { MapPin, Navigation, Car, Plane, Compass, ExternalLink, Instagram } from 'lucide-react';
import { HOTEL_INFO, WHATSAPP_CONFIG } from '../../data/hotelData';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-24 sm:py-32 bg-[#FAF8F5] border-t border-[#ECE7DE]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Details & Directions Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89355] font-medium">
              <Compass className="w-3.5 h-3.5" />
              <span>Location & Access</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal leading-tight">
              A Quiet Enclave in Kukas, Rajasthan
            </h2>

            {/* Address Box */}
            <div className="p-6 bg-[#F5F2EA] border border-[#DFD7C8] space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B89355] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-xl text-[#1C1917] font-normal">
                    {HOTEL_INFO.name}
                  </h3>
                  <p className="text-sm text-[#57534E] font-light mt-1 leading-relaxed">
                    {HOTEL_INFO.address.line1}<br />
                    {HOTEL_INFO.address.locality}, {HOTEL_INFO.address.state} {HOTEL_INFO.address.pinCode}<br />
                    {HOTEL_INFO.address.country}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#DFD7C8]">
                <a
                  href={HOTEL_INFO.address.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#1C1917] hover:text-[#B89355] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#B89355]" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#78716C]" />
                </a>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Card */}
            <div className="p-4 bg-[#F5F2EA] border border-[#DFD7C8] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                </div>
                <div>
                  <span className="text-xs font-medium text-[#1C1917] block">WhatsApp Concierge</span>
                  <span className="text-[11px] text-[#57534E] font-medium">+91 98996 11425</span>
                  <span className="text-[10px] text-[#78716C] font-light block">Direct bookings & enquiries</span>
                </div>
              </div>
              <a
                href={WHATSAPP_CONFIG.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#25D366] text-white hover:bg-[#1EBE5D] text-[10px] uppercase tracking-wider font-medium transition-colors inline-flex items-center gap-1.5 shrink-0 shadow-xs"
                title="Open WhatsApp chat with Ekaatra"
              >
                <WhatsAppIcon className="w-3 h-3 text-white" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Official Instagram Connect Card */}
            <div className="p-4 bg-[#FAF8F5] border border-[#ECE7DE] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F5F2EA] border border-[#DFD7C8] flex items-center justify-center shrink-0">
                  <Instagram className="w-4 h-4 text-[#B89355]" />
                </div>
                <div>
                  <span className="text-xs font-medium text-[#1C1917] block">Follow {HOTEL_INFO.contact.instagram}</span>
                  <span className="text-[11px] text-[#78716C] font-light">Daily stories, property updates & videos</span>
                </div>
              </div>
              <a
                href={HOTEL_INFO.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] text-[10px] uppercase tracking-wider font-medium transition-colors inline-flex items-center gap-1 shrink-0"
              >
                <span>Instagram</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Connectivity Guides */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs uppercase tracking-widest font-medium text-[#1C1917]">
                Arrival Access:
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs text-[#57534E]">
                  <Car className="w-4 h-4 text-[#B89355] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1C1917]">Via NH-48 (Delhi-Jaipur Expressway):</span>
                    <p className="font-light text-[#78716C] mt-0.5">
                      Direct expressway access into the Kukas junction, bypassing inner city congestion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-[#57534E]">
                  <Plane className="w-4 h-4 text-[#B89355] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1C1917]">From Jaipur Airport (JAI):</span>
                    <p className="font-light text-[#78716C] mt-0.5">
                      Approx. 35–40 km via the bypass corridor. Private chauffeured transfers available upon prior reservation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-[#57534E]">
                  <Compass className="w-4 h-4 text-[#B89355] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1C1917]">Amber Fort & Heritage Triangle:</span>
                    <p className="font-light text-[#78716C] mt-0.5">
                      Convenient 18–20 km scenic drive through the foothills to Jaipur's classical monuments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] border border-[#ECE7DE] p-2 shadow-lg">
              <div className="relative aspect-[16/10] bg-[#ECE7DE] overflow-hidden">
                {/* Clean Stylized Architectural Cartography SVG */}
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-full object-cover select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DFD7C8" strokeWidth="1" opacity="0.6" />
                    </pattern>
                  </defs>
                  {/* Map Terrain */}
                  <rect width="800" height="500" fill="#F4EFE6" />
                  <rect width="800" height="500" fill="url(#grid)" />

                  {/* Aravalli Foothill Ridge Shapes (Top Right to Left) */}
                  <path d="M500,0 Q650,140 800,80 L800,0 Z" fill="#E2D7C3" />
                  <path d="M0,0 Q240,120 400,0 Z" fill="#E2D7C3" />

                  {/* Main Arterial Road (NH-48 Corridor) */}
                  <path d="M0,380 Q400,320 800,220" stroke="#FFFFFF" strokeWidth="18" fill="none" />
                  <path d="M0,380 Q400,320 800,220" stroke="#C5B69F" strokeWidth="14" fill="none" />
                  {/* Road Center Line */}
                  <path d="M0,380 Q400,320 800,220" stroke="#FAF8F5" strokeWidth="2" strokeDasharray="8 6" fill="none" />

                  {/* Secondary Kukas Road into Ekaatra */}
                  <path d="M420,315 L450,190 L520,170" stroke="#FFFFFF" strokeWidth="12" fill="none" />
                  <path d="M420,315 L450,190 L520,170" stroke="#C5B69F" strokeWidth="8" fill="none" />

                  {/* RIICO Industrial Area Kukas Zone outline */}
                  <rect x="440" y="120" width="160" height="110" fill="#E8DEC9" stroke="#B89355" strokeWidth="1" strokeDasharray="4 4" rx="4" opacity="0.8" />
                  <text x="520" y="145" textAnchor="middle" fill="#78716C" fontSize="10" letterSpacing="2" fontFamily="sans-serif">
                    RIICO KUKAS
                  </text>

                  {/* Ekaatra Hotel Pin */}
                  <g transform="translate(520, 185)">
                    {/* Pulsing ring */}
                    <circle cx="0" cy="0" r="28" fill="#B89355" opacity="0.2" />
                    <circle cx="0" cy="0" r="14" fill="#B89355" opacity="0.4" />
                    <circle cx="0" cy="0" r="8" fill="#1C1917" />
                    <circle cx="0" cy="0" r="3" fill="#FAF8F5" />
                  </g>

                  {/* Tooltip Card directly on map */}
                  <g transform="translate(430, 205)">
                    <rect x="0" y="0" width="180" height="54" fill="#1C1917" rx="2" />
                    <text x="12" y="22" fill="#FAF8F5" fontSize="12" fontFamily="serif" letterSpacing="1">
                      EKAATRA
                    </text>
                    <text x="12" y="40" fill="#D9AA82" fontSize="9" letterSpacing="1" fontFamily="sans-serif">
                      A73, RIICO INDUSTRIAL AREA
                    </text>
                  </g>

                  {/* Road Labels */}
                  <text x="180" y="375" fill="#78716C" fontSize="10" letterSpacing="2" fontFamily="sans-serif">
                    NH-48 EXPRESSWAY (DELHI ↔ JAIPUR)
                  </text>
                  <text x="660" y="120" fill="#9C8F7E" fontSize="10" letterSpacing="1" fontFamily="serif">
                    Aravalli Foothills
                  </text>
                </svg>

                {/* External Maps Action Pill */}
                <div className="absolute bottom-4 right-4 bg-[#FAF8F5]/90 backdrop-blur-sm p-3 border border-[#ECE7DE]">
                  <a
                    href={HOTEL_INFO.address.googleMapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-[#1C1917] hover:text-[#B89355]"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs font-serif italic text-[#78716C] mt-3">
              Coordinates: 27.0543° N, 75.8974° E · Kukas, Jaipur District, Rajasthan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
