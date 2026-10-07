import React from 'react';
import { X, ShieldAlert, Clock, Sparkles } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'policies' | 'privacy' | 'terms';
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#FAF8F5] border border-[#ECE7DE] max-w-2xl w-full my-auto overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#1C1917] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B89355]" />
            <span className="font-serif tracking-[0.15em] text-lg font-medium">
              {type === 'policies' && 'Hotel Policies & Stay Guidelines'}
              {type === 'privacy' && 'Privacy & Guest Data Governance'}
              {type === 'terms' && 'Terms of Reservation & Prototype Notice'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-xs sm:text-sm text-[#57534E] leading-relaxed font-light">
          {type === 'policies' && (
            <>
              <div className="space-y-2">
                <h4 className="font-serif text-lg text-[#1C1917] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B89355]" />
                  Arrival & Departure Schedule
                </h4>
                <p>
                  <strong>Check-in Time:</strong> 12:00 PM (12:00 hrs) onwards.<br />
                  <strong>Check-out Time:</strong> 11:00 AM (11:00 hrs).<br />
                  Early check-in and late departure are subject to availability and prior confirmation with the reception desk.
                </p>
                <p className="text-xs text-[#78716C] italic">
                  *Ekaatra by PEM maintains a strict non-smoking policy across all enclosed suites and interior corridors.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#ECE7DE]">
                <h4 className="font-serif text-lg text-[#1C1917]">
                  Cancellation & Amendment
                </h4>
                <p>
                  Reservations cancelled up to 7 days prior to scheduled arrival incur no cancellation levy. Cancellations within 7 days of arrival are subject to a one-night retention charge.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#ECE7DE]">
                <h4 className="font-serif text-lg text-[#1C1917]">
                  Quiet Sanctuary Environment
                </h4>
                <p>
                  To preserve the meditative tranquility of Ekaatra, sound systems in public courtyards are limited after 22:00 hrs. We respectfully invite guests to savor the calm desert acoustics.
                </p>
              </div>
            </>
          )}

          {type === 'privacy' && (
            <>
              <div className="space-y-2">
                <h4 className="font-serif text-lg text-[#1C1917]">
                  Guest Data Stewardship
                </h4>
                <p>
                  Ekaatra holds guest privacy in highest regard. Contact information, room preferences, and dietary specifications provided during reservation enquiries are stored solely to facilitate personalized hospitality services.
                </p>
                <p>
                  We never vend, transmit, or license guest profiles to marketing brokers or extraneous third parties.
                </p>
              </div>
            </>
          )}

          {type === 'terms' && (
            <>
              <div className="space-y-2">
                <h4 className="font-serif text-lg text-[#1C1917] flex items-center gap-2 text-[#A8583B]">
                  <ShieldAlert className="w-4 h-4 text-[#A8583B]" />
                  Prototype Notice & Presentation Status
                </h4>
                <p>
                  This website is an interactive prototype developed for presentation and architectural demonstration of <strong>Ekaatra (Kukas, Rajasthan)</strong>.
                </p>
                <p>
                  Rates, inventory counters, and contact placeholders displayed are realistic simulations for review by hotel ownership. Official rates, contact numbers, and payment processing will be linked upon production release.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="p-4 bg-[#F5F2EA] border-t border-[#ECE7DE] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] text-xs uppercase tracking-widest font-medium transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
