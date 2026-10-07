import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { EventOffering, EventEnquiryRecord } from '../../types/hotel';

interface EventEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEvent?: EventOffering | null;
  onEnquirySuccess?: (record: EventEnquiryRecord) => void;
}

export const EventEnquiryModal: React.FC<EventEnquiryModalProps> = ({
  isOpen,
  onClose,
  initialEvent,
  onEnquirySuccess,
}) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState(initialEvent?.title || 'Intimate Heritage Weddings');
  const [estimatedDate, setEstimatedDate] = useState('');
  const [estimatedGuests, setEstimatedGuests] = useState(50);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const record: EventEnquiryRecord = {
      id: `enq-${Date.now()}`,
      name,
      email,
      phone,
      eventType,
      estimatedDate: estimatedDate || 'To be decided',
      estimatedGuests,
      notes,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    if (onEnquirySuccess) {
      onEnquirySuccess(record);
    }

    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#FAF8F5] border border-[#ECE7DE] max-w-xl w-full my-auto overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1C1917] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B89355]" />
            <span className="font-serif tracking-[0.15em] text-lg font-medium">
              Plan Your Occasion at Ekaatra
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white transition-colors focus:outline-none"
            aria-label="Close enquiry modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="w-10 h-10 text-[#4A7C59] mx-auto" />
            <h3 className="font-serif text-3xl text-[#1C1917]">
              Enquiry Received
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto font-light leading-relaxed">
              Thank you, {name}. Our events concierge team will review your requirements for &ldquo;{eventType}&rdquo; and get in touch with tailored arrangements and private venue availability.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            <div>
              <p className="text-xs text-[#78716C] font-light">
                Whether you envision an intimate Vedic pheras ceremony, a milestone anniversary banquet, or an executive conclave, please share your initial preferences.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-medium text-[#78716C]">
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-xs px-3 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#B89355]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-medium text-[#78716C]">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-xs px-3 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#B89355]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-medium text-[#78716C]">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-xs px-3 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#B89355]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-medium text-[#78716C]">
                  Type of Occasion
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-xs px-3 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#B89355]"
                >
                  <option value="Intimate Heritage Weddings">Intimate Heritage Wedding</option>
                  <option value="Milestone Celebrations & Anniversaries">Milestone Celebration</option>
                  <option value="Leadership Conclaves & Think Tanks">Executive Leadership Conclave</option>
                  <option value="Private Dining & Starlit Supping">Private Starlit Dining</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-medium text-[#78716C]">
                  Estimated Guests
                </label>
                <input
                  type="number"
                  min={10}
                  max={250}
                  value={estimatedGuests}
                  onChange={(e) => setEstimatedGuests(Number(e.target.value))}
                  className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-xs px-3 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#B89355]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-medium text-[#78716C]">
                Target Date / Month
              </label>
              <input
                type="date"
                value={estimatedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setEstimatedDate(e.target.value)}
                className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-xs px-3 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#B89355]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-medium text-[#78716C]">
                Additional Thoughts / Preferences
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share any special vision, culinary themes, or acoustic requests..."
                className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-xs px-3 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#B89355]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#ECE7DE] text-xs uppercase tracking-widest text-[#78716C]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2"
              >
                <span>Submit Event Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
