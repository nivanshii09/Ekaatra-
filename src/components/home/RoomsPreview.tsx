import React from 'react';
import { ArrowRight, Maximize2, Users, BedSingle, Sparkles, Check, ShieldCheck } from 'lucide-react';
import { Room } from '../../types/hotel';
import { ROOMS_DATA } from '../../data/hotelData';
import { LuxuryImage } from '../ui/LuxuryImage';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

interface RoomsPreviewProps {
  onSelectRoom: (room: Room) => void;
  onBookRoom: (room: Room) => void;
}

export const RoomsPreview: React.FC<RoomsPreviewProps> = ({ onSelectRoom, onBookRoom }) => {
  const primaryRoom = ROOMS_DATA[0];

  return (
    <section id="stay" className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#ECE7DE]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89355] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Accommodations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] font-normal">
              The Teakwood Sanctuaries
            </h2>
          </div>
          <p className="text-sm text-[#78716C] max-w-md font-light leading-relaxed">
            Spanning Levels 2, 3, and 4, each boutique guestroom is appointed with custom solid teakwood joinery, heritage palace artwork, and restful privacy.
          </p>
        </div>

        {/* Featured Accommodation Card */}
        <article className="bg-[#FAF8F5] border border-[#DFD7C8] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Visual Column (7 cols) */}
          <div className="lg:col-span-7 relative bg-[#E8DEC9] aspect-[16/10] lg:aspect-auto min-h-[340px] sm:min-h-[420px]">
            <LuxuryImage
              id={primaryRoom.heroImage}
              alt={primaryRoom.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#1C1917]/90 backdrop-blur-xs text-[#FAF8F5] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] font-medium">
              Capture 04 · Deluxe King Bedroom
            </div>
          </div>

          {/* Details Column (5 cols) */}
          <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between space-y-6 bg-[#FAF8F5]">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#B89355] font-medium block mb-1">
                  Primary Suite Collection
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-normal">
                  {primaryRoom.name}
                </h3>
              </div>

              {/* Zero-Pill Spec Line */}
              <div className="flex items-center gap-3 text-xs text-[#78716C] font-light flex-wrap pb-2 border-b border-[#ECE7DE]">
                <span className="flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#B89355]" />
                  <span>{primaryRoom.sizeSqm} m²</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#B89355]" />
                  <span>{primaryRoom.occupancy}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <BedSingle className="w-3.5 h-3.5 text-[#B89355]" />
                  <span>{primaryRoom.bedType}</span>
                </span>
              </div>

              <p className="text-sm text-[#57534E] font-light leading-relaxed">
                {primaryRoom.shortDescription}
              </p>

              {/* Curated In-Room Amenities */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] uppercase tracking-wider text-[#1C1917] font-medium block">
                  Room Appointments:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#6B655F] font-light">
                  {primaryRoom.amenities.slice(0, 6).map((amenity, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B89355] shrink-0 mt-0.5" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing & Reservation Trigger */}
            <div className="pt-6 border-t border-[#ECE7DE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#78716C] block">
                  Indicative Rate
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-serif text-2xl text-[#1C1917]">
                    {primaryRoom.startingPricePlaceholder}
                  </span>
                  <span className="text-xs text-[#78716C]">/ night</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectRoom(primaryRoom)}
                  className="px-4 py-2.5 border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer"
                >
                  Room Details
                </button>

                <button
                  type="button"
                  onClick={() => onBookRoom(primaryRoom)}
                  className="px-5 py-2.5 bg-[#B89355] hover:bg-[#A37E40] text-[#1C1917] text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#1C1917]" />
                  <span>Reserve via WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
