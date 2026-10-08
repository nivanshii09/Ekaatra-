import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { LuxuryImage } from '../ui/LuxuryImage';

interface IntroductionProps {
  onLearnMore?: () => void;
}

export const Introduction: React.FC<IntroductionProps> = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: Editorial Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89355] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>An Escape in Kukas</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] font-normal leading-[1.2] max-w-xl">
              Where contemporary architecture meets soulful quietude.
            </h2>

            {/* Primary Paragraph */}
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed font-light">
              Situated in Kukas on the arterial threshold of Jaipur, <span className="text-[#1C1917] font-medium">Ekaatra by PEM</span> is an intimate boutique retreat designed for mindful rest, celebratory gatherings, and restorative comfort.
            </p>

            {/* Secondary Paragraph */}
            <p className="text-sm sm:text-base text-[#78716C] leading-relaxed font-light">
              Distinguished by its luminous white tower with signature arched windows, the property welcomes guests into a tranquil arrival sanctuary presided over by a back-lit Lord Shiva Adiyogi bust, circular cove ceilings, and handcrafted teakwood suites across four dedicated levels.
            </p>

            {/* Expandable Philosophy Text */}
            {expanded && (
              <div className="pt-2 space-y-4 text-sm sm:text-base text-[#78716C] leading-relaxed font-light border-t border-[#ECE7DE]">
                <p>
                  At Ekaatra, luxury is grounded in deliberate stillness: the gentle amber glow through arched windows as twilight falls over Kukas, the quiet hum of the elevator opening onto marble-framed foyers, and bespoke hospitality where every detail — from custom teak joinery to curated amenities — invites effortless pause.
                </p>
                <p>
                  With dedicated guestroom floors, seamless elevator connectivity from ground-level parking to the upper suites, and a rooftop terrace overlooking the horizon, Ekaatra provides an exclusive haven away from city haste.
                </p>
              </div>
            )}

            {/* Discover More Action */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#1C1917] hover:text-[#B89355] transition-colors group cursor-pointer pb-1 border-b border-[#1C1917] hover:border-[#B89355]"
              >
                <span>{expanded ? 'Read Less' : 'Discover Our Story'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Unboxed Characteristic Highlights */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#ECE7DE]">
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-normal">Sanctuary</p>
                <p className="text-xs text-[#78716C] mt-1 font-light">Adiyogi lobby & quietude</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-normal">Craft</p>
                <p className="text-xs text-[#78716C] mt-1 font-light">Solid teakwood suites</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-normal">Architecture</p>
                <p className="text-xs text-[#78716C] mt-1 font-light">Arched window tower</p>
              </div>
            </div>
          </div>

          {/* Column 2: Large Editorial Visuals (5 cols) */}
          <div className="lg:col-span-5 relative space-y-4">
            <div className="relative overflow-hidden shadow-2xl bg-[#E8DEC9]">
              <LuxuryImage
                id="gallery_lobby"
                alt="Lobby with Adiyogi sculpture and marble front desk"
                aspectRatio="4/3"
                className="w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-[#1C1917]/85 text-white px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
                Lobby
              </div>
            </div>

            {/* Inset Secondary Visual: Elevator Foyer & Corridor */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden shadow-lg bg-[#E8DEC9]">
                <LuxuryImage
                  id="gallery_foyer"
                  alt="Level 3 Elevator Foyer and Room"
                  aspectRatio="4/3"
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] uppercase px-2 py-0.5 tracking-wider truncate max-w-[90%]">
                  Level 3 Elevator Foyer and Room
                </span>
              </div>
              <div className="relative overflow-hidden shadow-lg bg-[#E8DEC9]">
                <LuxuryImage
                  id="deluxe_garden"
                  alt="Deluxe King Bedroom with solid teak bed and palace painting"
                  aspectRatio="4/3"
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] uppercase px-2 py-0.5 tracking-wider truncate max-w-[90%]">
                  Deluxe King Bedroom
                </span>
              </div>
            </div>

            {/* Caption (Editorial Museum rule) */}
            <p className="text-xs font-serif text-[#78716C] italic text-right">
              The Lobby, Level 3 Elevator Foyer and Room, and Deluxe King Bedroom at Ekaatra by PEM.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
