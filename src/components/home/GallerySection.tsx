import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Instagram, ExternalLink } from 'lucide-react';
import { GALLERY_ITEMS, HOTEL_INFO } from '../../data/hotelData';
import { LuxuryImage } from '../ui/LuxuryImage';

export const GallerySection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#F5F2EA] border-t border-[#ECE7DE]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89355] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Property Captures</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] font-normal">
            Moments of Ekaatra
          </h2>
          <p className="text-sm text-[#78716C] font-light leading-relaxed">
            Authentic architectural captures of our boutique tower, tranquil arrival sanctuary, handcrafted teakwood suites, and elevator foyers in Kukas, Rajasthan.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <a
              href={HOTEL_INFO.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF8F5] border border-[#DFD7C8] text-[#1C1917] hover:border-[#B89355] hover:text-[#B89355] transition-all text-xs uppercase tracking-widest font-medium shadow-xs group"
            >
              <Instagram className="w-3.5 h-3.5 text-[#B89355] group-hover:scale-110 transition-transform" />
              <span>More Real Moments on @ekaatrabypem</span>
              <ExternalLink className="w-3 h-3 text-[#A8A29E]" />
            </a>
          </div>
        </div>

        {/* 6 Curated Real Property Photos Grid (3x2 Balanced Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative cursor-pointer overflow-hidden bg-[#FAF8F5] border border-[#ECE7DE] shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#E8DEC9]">
                <LuxuryImage
                  id={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
              </div>

              {/* Editorial Caption Bar */}
              <div className="p-5 flex items-start justify-between gap-4 border-t border-[#ECE7DE]">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#B89355] font-medium block">
                    Capture 0{index + 1}
                  </span>
                  <h3 className="font-serif text-lg font-normal text-[#1C1917] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#78716C] font-light leading-relaxed line-clamp-2">
                    {item.caption}
                  </p>
                </div>

                <div className="p-2 text-[#78716C] group-hover:text-[#B89355] transition-colors shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Hover Dark Scrim */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                <span className="px-4 py-2 bg-white/90 text-[#1C1917] text-xs uppercase tracking-widest font-medium shadow-md">
                  View Fullscreen
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && GALLERY_ITEMS[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89355]"
            aria-label="Close fullsize view"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Previous control */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 p-3 text-white/70 hover:text-white transition-colors focus:outline-none"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Current Lightbox Item Container */}
          <div
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-h-[70vh] aspect-[16/10] overflow-hidden rounded-sm shadow-2xl bg-black">
              <LuxuryImage
                id={GALLERY_ITEMS[lightboxIndex].image}
                alt={GALLERY_ITEMS[lightboxIndex].title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4 text-center max-w-xl text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#B89355]">
                Capture {lightboxIndex + 1} of {GALLERY_ITEMS.length} · Ekaatra by PEM, Kukas
              </span>
              <h3 className="font-serif text-2xl font-normal mt-1">
                {GALLERY_ITEMS[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light mt-1">
                {GALLERY_ITEMS[lightboxIndex].caption}
              </p>
            </div>
          </div>

          {/* Next control */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 text-white/70 hover:text-white transition-colors focus:outline-none"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  );
};
