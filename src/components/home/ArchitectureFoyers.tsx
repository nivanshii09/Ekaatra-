import React from 'react';
import { Sparkles, ArrowUpRight, Compass, ShieldCheck, Layers } from 'lucide-react';
import { LuxuryImage } from '../ui/LuxuryImage';
import { HOTEL_INFO } from '../../data/hotelData';

export const ArchitectureFoyers: React.FC = () => {
  return (
    <section id="architecture" className="py-20 sm:py-28 bg-[#F5F2EA] border-t border-[#ECE7DE]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: Visual Frame (7 cols) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative overflow-hidden bg-[#E8DEC9] border border-[#DFD7C8] shadow-xl group aspect-[4/3] sm:aspect-[16/11]">
              <LuxuryImage
                id="gallery_foyer"
                alt="Level 3 elevator foyer with circular halo cove lighting, marble elevator portal, and Room 302 entrance"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#1C1917]/90 backdrop-blur-xs text-[#FAF8F5] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] font-medium">
                Capture 04 · Level 3 Foyer & Circulation
              </div>
            </div>

            {/* Architectural Detail Note */}
            <p className="text-xs font-serif italic text-[#78716C] mt-3 text-right">
              Circular halo ambient ceiling fixture, textured granite elevator portal, and Room 302 at Ekaatra by PEM.
            </p>
          </div>

          {/* Column 2: Editorial Text & Floor Directory (5 cols) */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89355] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Architecture & Circulation</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal leading-snug">
                Effortless Transit. Circular Halo Light.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#57534E] font-light leading-relaxed">
              Every level of Ekaatra is designed with calming proportion and acoustic stillness. High-speed elevator connectivity links the ground-level parking directly to the reception sanctuary and upper residential floors.
            </p>

            <p className="text-sm text-[#78716C] font-light leading-relaxed">
              Upon stepping out onto your floor, you are met with gentle ambient lighting from flush circular ceiling halos, book-matched granite elevator surrounds, and quiet guestroom doorways like Room 302.
            </p>

            {/* The Authentic 5-Level Floor Directory */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-widest text-[#1C1917] font-medium block mb-3">
                Property Vertical Directory:
              </span>
              <div className="divide-y divide-[#ECE7DE] border-y border-[#ECE7DE] bg-[#FAF8F5]/60">
                {HOTEL_INFO.floors.map((floor, idx) => (
                  <div key={idx} className="py-2.5 px-3 flex items-center justify-between text-xs">
                    <span className="font-mono font-medium text-[#B89355] w-20">
                      {floor.level}
                    </span>
                    <span className="font-medium text-[#1C1917] w-40 sm:w-48">
                      {floor.title}
                    </span>
                    <span className="text-[#78716C] font-light hidden sm:inline text-right text-[11px]">
                      {floor.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zero-Pill Features Line */}
            <div className="pt-2 flex items-center gap-6 text-xs text-[#78716C] font-light">
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#B89355]" />
                <span>Direct Elevator Access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#B89355]" />
                <span>Quiet Teak Entries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
