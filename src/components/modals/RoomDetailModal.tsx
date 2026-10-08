import React, { useState } from 'react';
import { X, Maximize2, Users, BedSingle, Compass, Check, Calendar, ArrowRight } from 'lucide-react';
import { Room } from '../../types/hotel';
import { LuxuryImage } from '../ui/LuxuryImage';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onBook: (room: Room) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ room, onClose, onBook }) => {
  if (!room) return null;

  const [activeImage, setActiveImage] = useState<string>(room.heroImage);

  const allImages = Array.from(new Set([room.heroImage, ...room.galleryImages]));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#FAF8F5] border border-[#ECE7DE] max-w-4xl w-full my-auto overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-[#FAF8F5]/90 hover:bg-[#1C1917] text-[#1C1917] hover:text-[#FAF8F5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89355]"
          aria-label="Close room details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Visual Column (md:col-span-6) */}
          <div className="md:col-span-6 bg-[#E8DEC9] flex flex-col justify-between p-4 sm:p-6 space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#DFD3C1] shadow-inner">
              <LuxuryImage
                id={activeImage}
                alt={`${room.name} visual`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#1C1917]/85 text-white px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
                {room.category}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((imgKey, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgKey)}
                  className={`aspect-square overflow-hidden border-2 transition-all ${
                    activeImage === imgKey
                      ? 'border-[#B89355] opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <LuxuryImage id={imgKey} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="text-center pt-2">
              <p className="text-xs font-serif italic text-[#78716C]">
                Designed with artisanal Rajasthani limestone & handcrafted teak
              </p>
            </div>
          </div>

          {/* Details Column (md:col-span-6) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89355] font-medium">
                  {room.category} Accommodation
                </span>
                <h3 className="font-serif text-3xl text-[#1C1917] font-normal mt-1">
                  {room.name}
                </h3>
              </div>

              {/* Room Specs */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#ECE7DE] text-xs text-[#57534E]">
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-[#B89355]" />
                  <span>Size: {room.sizeSqm} m²</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#B89355]" />
                  <span>{room.occupancy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BedSingle className="w-4 h-4 text-[#B89355]" />
                  <span>{room.bedType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#B89355]" />
                  <span>{room.view}</span>
                </div>
              </div>

              {/* Long Description */}
              <p className="text-xs sm:text-sm text-[#57534E] font-light leading-relaxed">
                {room.fullDescription}
              </p>

              {/* Inclusions & Amenities */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs uppercase tracking-widest font-medium text-[#1C1917]">
                  Suite Inclusions:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#78716C]">
                  {room.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 font-light">
                      <Check className="w-3.5 h-3.5 text-[#B89355] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Booking CTA */}
            <div className="pt-6 border-t border-[#ECE7DE] flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#78716C] block">
                  Indicative Rate (Placeholder)
                </span>
                <span className="font-serif text-2xl text-[#1C1917]">
                  {room.startingPricePlaceholder}
                </span>
                <span className="text-xs text-[#78716C] font-light"> / night</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onBook(room);
                }}
                className="px-6 py-3 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] transition-colors text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2 shadow-md cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Book via WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
