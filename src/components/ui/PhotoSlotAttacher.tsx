import React, { useState, useRef } from 'react';
import { Upload, Check, Image as ImageIcon, X, AlertCircle, Camera, RotateCcw } from 'lucide-react';
import { useImageContext } from '../../context/ImageContext';
import { EKAATRA_PHOTO_SLOTS, EKAATRA_DEFAULT_PHOTOGRAPHS } from '../../data/hotelPhotos';

export const PhotoSlotAttacher: React.FC = () => {
  const { customImages, setCustomImage, removeCustomImage, resetAllImages, isManagerOpen, openManager, closeManager, activeTargetSlot } = useImageContext();
  const [dragActive, setDragActive] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  const attachedCount = EKAATRA_PHOTO_SLOTS.filter((s) => Boolean(customImages[s.id] || EKAATRA_DEFAULT_PHOTOGRAPHS[s.id])).length;

  const handleFileForSlot = (slotId: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      setStatusMsg('Please choose an image file (.png, .jpg, .webp)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      if (dataUri) {
        setCustomImage(slotId, dataUri);
        setStatusMsg(`Attached "${file.name}" to slot!`);
        setTimeout(() => setStatusMsg(null), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMultipleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    let matched = 0;

    fileArray.forEach((file) => {
      const lower = file.name.toLowerCase();
      // Match by filename timestamp or keywords
      if (lower.includes('222152') || lower.includes('facade') || lower.includes('dusk')) {
        handleFileForSlot('hero_facade', file);
        matched++;
      } else if (lower.includes('222005') || lower.includes('lobby') || lower.includes('reception') || lower.includes('shiva') || lower.includes('adiyogi') || lower.includes('22-19-28')) {
        handleFileForSlot('gallery_lobby', file);
        matched++;
      } else if (lower.includes('222040') || lower.includes('bedroom') || lower.includes('room') || lower.includes('bed') || lower.includes('deluxe') || lower.includes('22-19-18') || lower.includes('22-19-16')) {
        handleFileForSlot('deluxe_garden', file);
        matched++;
      } else if (lower.includes('222114') || lower.includes('foyer') || lower.includes('elevator') || lower.includes('corridor') || lower.includes('302') || lower.includes('22-19-21')) {
        handleFileForSlot('gallery_foyer', file);
        matched++;
      } else if (lower.includes('222135') || lower.includes('logo') || lower.includes('emblem') || lower.includes('whatsapp')) {
        handleFileForSlot('gallery_logo', file);
        matched++;
      } else if (lower.includes('building') || lower.includes('tower') || lower.includes('exterior') || lower.includes('unnamed')) {
        handleFileForSlot('building_tower', file);
        matched++;
      }
    });

    if (matched > 0) {
      setStatusMsg(`Successfully matched ${matched} uploaded screenshot(s)!`);
    } else if (fileArray.length > 0) {
      // If filenames don't match pattern, assign sequentially to remaining empty slots
      fileArray.forEach((file, idx) => {
        const slot = EKAATRA_PHOTO_SLOTS[idx % EKAATRA_PHOTO_SLOTS.length];
        handleFileForSlot(slot.id, file);
      });
      setStatusMsg(`Attached ${fileArray.length} photo(s) to property slots.`);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleMultipleFiles(e.dataTransfer.files);
    }
  };

  return (
    <>
      {/* Modal Dialog for Attaching Screenshots */}
      {isManagerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={closeManager}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#FAF8F5] border border-[#ECE7DE] max-w-3xl w-full my-auto overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#1C1917] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-5 h-5 text-[#B89355]" />
                <div>
                  <h3 className="font-serif tracking-[0.08em] text-lg font-medium text-[#FAF8F5]">
                    Attach Uploaded Screenshots
                  </h3>
                  <p className="text-[11px] text-[#D9AA82] font-light">
                    Assign your 5 screenshots directly to their designated sections
                  </p>
                </div>
              </div>

              <button
                onClick={closeManager}
                className="p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drag & Drop Bulk Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`m-6 p-6 border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-2 ${
                dragActive
                  ? 'border-[#B89355] bg-[#F5F2EA]'
                  : 'border-[#DFD7C8] bg-[#F5F2EA]/60 hover:bg-[#F5F2EA]'
              }`}
            >
              <Upload className="w-6 h-6 text-[#B89355]" />
              <p className="text-xs font-medium text-[#1C1917]">
                Drag and drop your screenshots here all at once
              </p>
              <p className="text-[11px] text-[#78716C] font-light">
                or click below to select them from your computer:
              </p>
              <input
                ref={multiFileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleMultipleFiles(e.target.files);
                  }
                }}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => multiFileInputRef.current?.click()}
                className="mt-1 px-4 py-1.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
              >
                Select Files from Device...
              </button>
            </div>

            {/* Status Alert */}
            {statusMsg && (
              <div className="mx-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{statusMsg}</span>
              </div>
            )}

            {/* The 5 Designated Slots */}
            <div className="p-6 pt-0 space-y-4 max-h-[50vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-widest font-medium text-[#1C1917]">
                  The 5 Designated Property Photo Slots:
                </h4>
                {attachedCount > 0 && (
                  <button
                    type="button"
                    onClick={resetAllImages}
                    className="text-[11px] text-stone-500 hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset All</span>
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {EKAATRA_PHOTO_SLOTS.map((slot) => {
                  const currentImg = customImages[slot.id];
                  const defaultImg = EKAATRA_DEFAULT_PHOTOGRAPHS[slot.id];
                  const displayImg = currentImg || defaultImg;
                  const isTarget = activeTargetSlot === slot.id;
                  return (
                    <div
                      key={slot.id}
                      className={`p-4 bg-[#F5F2EA] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isTarget ? 'border-[#B89355] ring-1 ring-[#B89355]' : 'border-[#DFD7C8]'
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        {displayImg ? (
                          <div className="w-14 h-14 bg-black overflow-hidden border border-[#B89355] shrink-0">
                            <img
                              src={displayImg}
                              alt={slot.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 bg-[#ECE7DE] border border-[#DFD7C8] flex items-center justify-center text-[#78716C] shrink-0">
                            <ImageIcon className="w-6 h-6 text-[#A8A29E]" />
                          </div>
                        )}

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h5 className="text-xs font-medium text-[#1C1917]">
                              {slot.name}
                            </h5>
                            {displayImg ? (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-xs flex items-center gap-0.5 font-medium">
                                <Check className="w-3 h-3 text-emerald-600" /> {currentImg ? 'Custom Upload' : 'Real Photo Active'}
                              </span>
                            ) : (
                              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-xs font-medium">
                                Ready for File
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#B89355] font-mono">
                            Section: {slot.section}
                          </p>
                          <p className="text-[10px] text-[#78716C] font-light">
                            Match: <span className="font-mono text-[#57534E] font-medium">{slot.expectedFilename}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <label className="px-3 py-1.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] text-xs uppercase tracking-wider font-medium cursor-pointer transition-colors shadow-xs">
                          <span>{currentImg ? 'Replace' : 'Upload Override'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleFileForSlot(slot.id, f);
                            }}
                            className="hidden"
                          />
                        </label>

                        {currentImg && (
                          <button
                            type="button"
                            onClick={() => removeCustomImage(slot.id)}
                            className="p-1.5 text-stone-500 hover:text-red-700 transition-colors cursor-pointer"
                            title="Reset to real default photo"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#F5F2EA] border-t border-[#ECE7DE] flex items-center justify-between">
              <div className="text-[11px] text-[#78716C] flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-[#B89355]" />
                <span>Attached screenshots are saved in your browser and persist across reloads.</span>
              </div>

              <button
                onClick={closeManager}
                className="px-5 py-2 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
