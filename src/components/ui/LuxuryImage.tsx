import React, { useState, useRef } from 'react';
import { useImageContext } from '../../context/ImageContext';
import { EKAATRA_DEFAULT_PHOTOGRAPHS, EKAATRA_PHOTO_SLOTS } from '../../data/hotelPhotos';
import { Image as ImageIcon, Camera, Check, Upload } from 'lucide-react';

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
}) => {
  const { customImages, setCustomImage, openManager } = useImageContext();
  const [imgError, setImgError] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const customSrc = customImages[id];
  const defaultSrc = EKAATRA_DEFAULT_PHOTOGRAPHS[id];
  const effectiveSrc = !imgError && (customSrc || defaultSrc);

  const slotMeta = EKAATRA_PHOTO_SLOTS.find((s) => s.id === id);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      if (dataUri) {
        setCustomImage(id, dataUri);
        // If updating building_tower or hero_facade, synchronize both
        if (id === 'building_tower' || id === 'hero_facade') {
          setCustomImage('building_tower', dataUri);
          setCustomImage('hero_facade', dataUri);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  if (effectiveSrc) {
    return (
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`relative w-full h-full overflow-hidden bg-[#1C1917] group ${className} ${
          dragOver ? 'ring-4 ring-[#B89355] ring-inset' : ''
        }`}
      >
        <img
          src={effectiveSrc}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hidden File Input for Direct Replacement */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFileChange(f);
          }}
        />

        {/* Drag Overlay Hint */}
        {dragOver && (
          <div className="absolute inset-0 bg-black/75 z-20 flex flex-col items-center justify-center p-4 text-center text-white pointer-events-none">
            <Upload className="w-8 h-8 text-[#B89355] animate-bounce mb-2" />
            <p className="text-xs font-serif tracking-wider uppercase">
              Drop "{slotMeta?.expectedFilename || 'image'}" here
            </p>
          </div>
        )}

        {/* Status Indicators & Direct Quick-Action */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
          {customSrc ? (
            <span className="bg-emerald-950/90 backdrop-blur-xs text-emerald-200 border border-emerald-500/40 px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono flex items-center gap-1 shadow-md">
              <Check className="w-2.5 h-2.5 text-emerald-400" /> Exact File Active
            </span>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              title={`Click to attach your exact "${slotMeta?.expectedFilename || 'photo'}" file`}
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 hover:bg-[#B89355] text-white border border-white/20 px-2 py-1 text-[9px] uppercase tracking-widest font-mono flex items-center gap-1 shadow-lg cursor-pointer"
            >
              <Camera className="w-3 h-3 text-[#B89355] group-hover:text-white" />
              <span>Attach Exact File</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Fallback Luxury Editorial Frame
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      className={`w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#24201D] text-[#FAF8F5] border border-[#3D3631] relative ${className} ${
        dragOver ? 'ring-4 ring-[#B89355] ring-inset' : ''
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFileChange(f);
        }}
      />
      <ImageIcon className="w-8 h-8 text-[#B89355] mb-2 opacity-80" />
      <span className="text-[10px] uppercase tracking-widest text-[#B89355] font-medium">
        {slotMeta?.name || 'Ekaatra Property Capture'}
      </span>
      <p className="text-xs text-[#D6CEBE] mt-1 max-w-xs font-light">
        {alt}
      </p>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="mt-3 px-3 py-1 bg-[#B89355] text-white text-[10px] uppercase tracking-wider font-medium cursor-pointer hover:bg-[#977338] transition-colors"
      >
        Attach {slotMeta?.expectedFilename || 'File'}
      </button>
    </div>
  );
};
