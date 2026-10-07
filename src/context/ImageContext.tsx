import React, { createContext, useContext, useState, useEffect } from 'react';

interface ImageContextType {
  customImages: Record<string, string>;
  setCustomImage: (slotId: string, urlOrDataUri: string) => void;
  removeCustomImage: (slotId: string) => void;
  resetAllImages: () => void;
  isManagerOpen: boolean;
  openManager: (targetSlotId?: string) => void;
  closeManager: () => void;
  activeTargetSlot: string | null;
}

const STORAGE_KEY = 'ekaatra_property_photos';

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customImages, setCustomImagesState] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [activeTargetSlot, setActiveTargetSlot] = useState<string | null>(null);

  const setCustomImage = (slotId: string, urlOrDataUri: string) => {
    setCustomImagesState((prev) => {
      const next = { ...prev, [slotId]: urlOrDataUri };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.warn('Storage quota exceeded, keeping in memory', err);
      }
      return next;
    });
  };

  const removeCustomImage = (slotId: string) => {
    setCustomImagesState((prev) => {
      const next = { ...prev };
      delete next[slotId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.warn('Failed to update localStorage', err);
      }
      return next;
    });
  };

  const resetAllImages = () => {
    setCustomImagesState({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const openManager = (targetSlotId?: string) => {
    setActiveTargetSlot(targetSlotId || 'hero_facade');
    setIsManagerOpen(true);
  };

  const closeManager = () => {
    setIsManagerOpen(false);
    setActiveTargetSlot(null);
  };

  return (
    <ImageContext.Provider
      value={{
        customImages,
        setCustomImage,
        removeCustomImage,
        resetAllImages,
        isManagerOpen,
        openManager,
        closeManager,
        activeTargetSlot,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};
