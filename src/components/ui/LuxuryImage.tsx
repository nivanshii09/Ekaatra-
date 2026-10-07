import React, { useState } from 'react';
import { useImageContext } from '../../context/ImageContext';
import { EKAATRA_DEFAULT_PHOTOGRAPHS, EKAATRA_PHOTO_SLOTS } from '../../data/hotelPhotos';
import { Image as ImageIcon } from 'lucide-react';

interface LuxuryImageProps {
  id: string;
  alt: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4' | '16/10' | 'auto';
  priority?: boolean;
}

export const LuxuryImage: React.FC<LuxuryImageProps> = ({
  id,
  alt,
  className = '',
  aspectRatio = 'auto',
}) => {
  const { customImages } = useImageContext();
  const [imgError, setImgError] = useState(false);

  const customSrc = customImages[id];
  const defaultSrc = EKAATRA_DEFAULT_PHOTOGRAPHS[id];
  const effectiveSrc = !imgError && (customSrc || defaultSrc);

  const slotMeta = EKAATRA_PHOTO_SLOTS.find((s) => s.id === id);

  if (effectiveSrc) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#1C1917] group ${className}`}>
        <img
          src={effectiveSrc}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle Slot Indicator when custom screenshot is active */}
        {customSrc && (
          <div className="absolute top-2 right-2 bg-emerald-950/80 backdrop-blur-xs text-emerald-200 border border-emerald-500/30 px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            Live Attached
          </div>
        )}
      </div>
    );
  }

  // Fallback Luxury Editorial Frame
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#24201D] text-[#FAF8F5] border border-[#3D3631] relative ${className}`}
    >
      <ImageIcon className="w-8 h-8 text-[#B89355] mb-2 opacity-80" />
      <span className="text-[10px] uppercase tracking-widest text-[#B89355] font-medium">
        {slotMeta?.name || 'Ekaatra Property Capture'}
      </span>
      <p className="text-xs text-[#D6CEBE] mt-1 max-w-xs font-light">
        {alt}
      </p>
    </div>
  );
};
