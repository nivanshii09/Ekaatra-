import React, { useState, useRef, useEffect } from 'react';
import { Upload, Check, Image as ImageIcon, X, AlertCircle, Camera, RotateCcw, Sparkles } from 'lucide-react';
import { useImageContext } from '../../context/ImageContext';
import { EKAATRA_PHOTO_SLOTS, EKAATRA_DEFAULT_PHOTOGRAPHS } from '../../data/hotelPhotos';

export const PhotoSlotAttacher: React.FC = () => {
  const { customImages, setCustomImage, removeCustomImage, resetAllImages, isManagerOpen, openManager, closeManager, activeTargetSlot } = useImageContext();
  const [dragActive, setDragActive] = useState(false);
  const [windowDragActive, setWindowDragActive] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  const attachedCount = EKAATRA_PHOTO_SLOTS.filter((s) => Boolean(customImages[s.id])).length;

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
        // Synchronize building and hero if applicable
        if (slotId === 'building_tower' || slotId === 'hero_facade') {
          setCustomImage('building_tower', dataUri);
          setCustomImage('hero_facade', dataUri);
        }
        setStatusMsg(`✓ Exact file "${file.name}" attached! No AI generation used.`);
        setTimeout(() => setStatusMsg(null), 4000);
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
      if (lower.includes('facade') || lower.includes('dusk') || lower.includes('222152')) {
        handleFileForSlot('hero_facade', file);
        matched++;
      } else if (lower.includes('lobby') || lower.includes('reception') || lower.includes('shiva') || lower.includes('adiyogi') || lower.includes('22-19-28') || lower.includes('222005')) {
        handleFileForSlot('gallery_lobby', file);
        matched++;
      } else if (lower.includes('foyer') || lower.includes('elevator') || lower.includes('level 3') || lower.includes('level-3') || lower.includes('302') || lower.includes('22-19-21') || lower.includes('222114')) {
        handleFileForSlot('gallery_foyer', file);
        matched++;
      } else if (lower.includes('bedroom') || lower.includes('deluxe') || lower.includes('king') || lower.includes('bed') || lower.includes('22-19-18') || lower.includes('222040')) {
        handleFileForSlot('deluxe_garden', file);
        matched++;
      } else if (lower.includes('logo') || lower.includes('emblem') || lower.includes('whatsapp') || lower.includes('222135')) {
        handleFileForSlot('gallery_logo', file);
        matched++;
      } else if (lower.includes('building') || lower.includes('main') || lower.includes('tower') || lower.includes('exterior') || lower.includes('22-19-16')) {
        handleFileForSlot('building_tower', file);
        handleFileForSlot('hero_facade', file);
        matched++;
      }
    });

    if (matched > 0) {
      setStatusMsg(`Successfully matched & attached ${matched} exact photograph(s)!`);
    } else if (fileArray.length > 0) {
      // Default fallback to building_tower if unknown image
      handleFileForSlot('building_tower', fileArray[0]);
      handleFileForSlot('hero_facade', fileArray[0]);
      setStatusMsg(`Attached "${fileArray[0].name}" directly to Main Building!`);
    }
  };

  // Global Drag-and-Drop and Paste Listeners
  useEffect(() => {
    let dragCounter = 0;

    const handleWindowDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounter++;
      if (e.dataTransfer?.types?.includes('Files')) {
        setWindowDragActive(true);
      }
    };

    const handleWindowDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) {
        dragCounter = 0;
        setWindowDragActive(false);
      }
    };

    const handleWindowDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleWindowDrop = (e: DragEvent) => {
      e.preventDefault();
      dragCounter = 0;
      setWindowDragActive(false);
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        handleMultipleFiles(e.dataTransfer.files);
      }
    };

    const handleWindowPaste = (e: ClipboardEvent) => {
      if (e.clipboardData?.files && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith('image/')) {
          handleFileForSlot('building_tower', file);
          handleFileForSlot('hero_facade', file);
          setStatusMsg(`Pasted screenshot attached directly to Main Building!`);
        }
      }
    };

    window.addEventListener('dragenter', handleWindowDragEnter);
    window.addEventListener('dragleave', handleWindowDragLeave);
    window.addEventListener('dragover', handleWindowDragOver);
    window.addEventListener('drop', handleWindowDrop);
    window.addEventListener('paste', handleWindowPaste);

    return () => {
      window.removeEventListener('dragenter', handleWindowDragEnter);
      window.removeEventListener('dragleave', handleWindowDragLeave);
      window.removeEventListener('dragover', handleWindowDragOver);
      window.removeEventListener('drop', handleWindowDrop);
      window.removeEventListener('paste', handleWindowPaste);
    };
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleMultipleFiles(e.dataTransfer.files);
    }
  };

  return (
    <>
      {/* Global Window Drag-and-Drop Target Overlay */}
      {windowDragActive && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white pointer-events-none">
          <div className="max-w-md w-full p-8 border-2 border-dashed border-[#B89355] bg-[#1C1917]/90 flex flex-col items-center gap-4">
            <Upload className="w-12 h-12 text-[#B89355] animate-bounce" />
            <h3 className="font-serif text-2xl text-[#FAF8F5]">
              Drop &ldquo;Main building.png&rdquo; Here
            </h3>
            <p className="text-sm text-[#D9AA82] font-light">
              Your exact photo file will be attached immediately to the website with zero AI generation.
            </p>
          </div>
        </div>
      )}

      {/* Floating Photo Manager Trigger Button (Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={() => openManager('building_tower')}
          className="bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] border border-[#ECE7DE]/40 shadow-2xl px-3.5 py-2.5 text-[11px] uppercase tracking-widest font-medium flex items-center gap-2 transition-all cursor-pointer group"
          title="Attach your exact photo files (Main building.png, etc.)"
        >
          <Camera className="w-4 h-4 text-[#B89355] group-hover:text-white transition-colors" />
          <span className="hidden sm:inline">Attach Real Photos</span>
          {attachedCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          )}
        </button>
      </div>

      {/* Status Alert Toast */}
      {statusMsg && (
        <div className="fixed top-20 right-6 z-50 max-w-sm p-4 bg-[#1C1917] text-white border border-[#B89355] shadow-2xl flex items-center gap-3 animate-fade-in">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <p className="font-medium text-[#FAF8F5]">{statusMsg}</p>
            <p className="text-[10px] text-stone-400">Saved directly in your browser session.</p>
          </div>
          <button
            onClick={() => setStatusMsg(null)}
            className="ml-auto text-stone-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
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
                    Attach Real Property Photographs
                  </h3>
                  <p className="text-[11px] text-[#D9AA82] font-light">
                    Attach your exact photo files (including &ldquo;Main building.png&rdquo;) directly without AI generation
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

            {/* Priority Callout for Main Building ("Main building.png") */}
            <div className="m-6 mb-0 p-4 bg-[#1C1917] text-white border border-[#B89355] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#B89355] text-white text-[9px] uppercase tracking-wider font-semibold">Priority</span>
                  <h4 className="text-sm font-serif text-[#FAF8F5]">Main Building &amp; Facade</h4>
                </div>
                <p className="text-xs text-[#D9AA82] font-light mt-0.5">
                  Select your exact &ldquo;Main building.png&rdquo; file from your device. It replaces full building images immediately.
                </p>
              </div>
              <label className="px-4 py-2.5 bg-[#B89355] hover:bg-[#A37F44] text-white text-xs uppercase tracking-wider font-medium cursor-pointer transition-colors shadow-sm shrink-0 flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                <span>Choose &ldquo;Main building.png&rdquo;</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      handleFileForSlot('building_tower', f);
                      handleFileForSlot('hero_facade', f);
                    }
                  }}
                  className="hidden"
                />
              </label>
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
                Drag and drop your photographs here all at once
              </p>
              <p className="text-[11px] text-[#78716C] font-light">
                Files named &ldquo;Main building.png&rdquo;, &ldquo;Main building.jpg&rdquo;, or screenshots match automatically:
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

            {/* The 6 Designated Slots */}
            <div className="p-6 pt-0 space-y-4 max-h-[50vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-widest font-medium text-[#1C1917]">
                  The 6 Designated Property Photo Slots:
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
