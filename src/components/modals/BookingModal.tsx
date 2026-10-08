import React, { useState } from 'react';
import { X, Calendar, Users, BedSingle, CheckCircle2, Loader2, ArrowRight, ArrowLeft, ShieldCheck, Printer } from 'lucide-react';
import { ROOMS_DATA, HOTEL_INFO, WHATSAPP_CONFIG } from '../../data/hotelData';
import { Room, BookingRecord } from '../../types/hotel';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoom?: Room | null;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  onBookingSuccess?: (record: BookingRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedRoom,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  onBookingSuccess,
}) => {
  if (!isOpen) return null;

  const today = new Date();
  const defaultIn = initialCheckIn || new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const defaultOut = initialCheckOut || new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [step, setStep] = useState<'dates_room' | 'guest_details' | 'processing' | 'confirmed'>('dates_room');
  const [checkIn, setCheckIn] = useState(defaultIn);
  const [checkOut, setCheckOut] = useState(defaultOut);
  const [guests, setGuests] = useState(initialGuests);
  const [selectedRoomId, setSelectedRoomId] = useState(preselectedRoom?.id || ROOMS_DATA[0].id);

  // Guest details form
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmed booking record
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  const selectedRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  // Calculate nights
  const dIn = new Date(checkIn);
  const dOut = new Date(checkOut);
  const diffTime = Math.max(1, Math.round((dOut.getTime() - dIn.getTime()) / (1000 * 60 * 60 * 24)));
  const nights = isNaN(diffTime) ? 2 : Math.max(1, diffTime);

  // Parse indicative numeric rate for calculation
  const numericRate = parseInt(selectedRoom.startingPricePlaceholder.replace(/[^0-9]/g, ''), 10) || 15000;
  const estimatedTotal = (numericRate * nights).toLocaleString('en-IN');

  const handleDatesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('guest_details');
  };

  const handleGuestsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    // Simulate reservation engine processing
    setTimeout(() => {
      const ref = `EK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const record: BookingRecord = {
        id: `book-${Date.now()}`,
        bookingRef: ref,
        guestName,
        guestEmail,
        guestPhone,
        roomName: selectedRoom.name,
        checkIn,
        checkOut,
        guests,
        totalNights: nights,
        estimatedTotal: `₹ ${estimatedTotal}`,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      setConfirmedBooking(record);
      if (onBookingSuccess) {
        onBookingSuccess(record);
      }
      setStep('confirmed');
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

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
        {/* Header Ribbon */}
        <div className="bg-[#1C1917] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif tracking-[0.2em] text-lg font-medium text-[#FAF8F5]">
              EKAATRA
            </span>
            <span className="text-white/40">|</span>
            <span className="text-xs uppercase tracking-widest text-[#D9AA82]">
              Direct Reservation
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white transition-colors focus:outline-none"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prototype Indicator Banner */}
        <div className="bg-[#F5F2EA] px-6 py-2 text-[11px] text-[#78716C] border-b border-[#ECE7DE] flex items-center justify-between">
          <span>Prototype Reservation Flow · No live charges</span>
          <span className="text-[#A8583B] font-medium">Bespoke Hospitality</span>
        </div>

        {/* STEP 1: Dates & Room Preference */}
        {step === 'dates_room' && (
          <form onSubmit={handleDatesSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-serif text-2xl text-[#1C1917]">
                Select Dates & Accommodation
              </h3>
              <p className="text-xs text-[#78716C] mt-1 font-light">
                Choose your intended stay period in Kukas. Direct bookings include complimentary morning wellness tea and heritage breakfast.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-medium text-[#78716C] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#B89355]" />
                  Check-In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-xs px-3 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#B89355]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-medium text-[#78716C] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#B89355]" />
                  Check-Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-xs px-3 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#B89355]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-medium text-[#78716C] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#B89355]" />
                  Number of Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-xs px-3 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#B89355]"
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Adults</option>
                  <option value={4}>4 Adults</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-medium text-[#78716C] flex items-center gap-1.5">
                  <BedSingle className="w-3.5 h-3.5 text-[#B89355]" />
                  Room Category
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-xs px-3 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#B89355]"
                >
                  {ROOMS_DATA.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.startingPricePlaceholder}/night)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Room Summary Preview */}
            <div className="p-4 bg-[#F5F2EA] border border-[#ECE7DE] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#1C1917] font-medium">
                <span>{selectedRoom.name}</span>
                <span className="font-serif text-base">{selectedRoom.startingPricePlaceholder} / night</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#78716C]">
                <span>Duration: {nights} Night{nights > 1 ? 's' : ''}</span>
                <span>Indicative Total: ₹ {estimatedTotal}</span>
              </div>
              <p className="text-[10px] text-[#A8583B] italic">
                *Prices shown are realistic placeholder estimates for prototyping purposes.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-[#ECE7DE] text-xs uppercase tracking-widest text-[#78716C] hover:text-[#1C1917]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] transition-colors text-xs uppercase tracking-widest font-medium flex items-center gap-2"
              >
                <span>Continue to Guest Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Guest Details */}
        {step === 'guest_details' && (
          <form onSubmit={handleGuestsSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-[#1C1917]">
                  Guest Information
                </h3>
                <p className="text-xs text-[#78716C] mt-1 font-light">
                  Please provide the primary guest details for registration at Ekaatra.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep('dates_room')}
                className="text-xs text-[#78716C] hover:text-[#1C1917] flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-medium text-[#78716C]">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Maharana Pratap / Vineet Jain"
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
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="guest@example.com"
                    className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-xs px-3 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#B89355]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-medium text-[#78716C]">
                    Contact Telephone *
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-xs px-3 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#B89355]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-medium text-[#78716C]">
                  Special Requests / Dietary Preferences / Arrival Time
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Vegetarian preference, late arrival from Jaipur airport, quiet room on upper level..."
                  className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-xs px-3 py-2.5 text-[#1C1917] focus:outline-none focus:border-[#B89355]"
                />
              </div>
            </div>

            <div className="p-3 bg-[#F5F2EA] border border-[#ECE7DE] text-[11px] text-[#78716C] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B89355] shrink-0 mt-0.5" />
              <span>
                Your privacy is paramount. Guest details are strictly used for your reservation at Ekaatra and are never shared.
              </span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep('dates_room')}
                className="px-4 py-2 text-xs uppercase tracking-widest text-[#78716C] hover:text-[#1C1917]"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] transition-colors text-xs uppercase tracking-widest font-medium flex items-center gap-2"
              >
                <span>Confirm Reservation Request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Processing Animation */}
        {step === 'processing' && (
          <div className="p-16 text-center space-y-4">
            <Loader2 className="w-8 h-8 text-[#B89355] animate-spin mx-auto" />
            <h3 className="font-serif text-2xl text-[#1C1917]">
              Confirming Availability at Ekaatra...
            </h3>
            <p className="text-xs text-[#78716C] max-w-sm mx-auto font-light">
              Checking room inventory for {selectedRoom.name} from {checkIn} to {checkOut}.
            </p>
          </div>
        )}

        {/* STEP 4: Confirmed Voucher */}
        {step === 'confirmed' && confirmedBooking && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2 pb-4 border-b border-[#ECE7DE]">
              <CheckCircle2 className="w-10 h-10 text-[#4A7C59] mx-auto" />
              <h3 className="font-serif text-3xl text-[#1C1917]">
                Reservation Confirmed
              </h3>
              <p className="text-xs text-[#78716C]">
                We look forward to welcoming you to Kukas, Rajasthan.
              </p>
            </div>

            {/* Voucher Box */}
            <div className="bg-[#F5F2EA] border border-[#DFD7C8] p-5 space-y-4 font-sans text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-[#DFD7C8]">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#78716C] block">
                    Booking Reference
                  </span>
                  <span className="font-mono text-base font-semibold text-[#1C1917]">
                    {confirmedBooking.bookingRef}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-[#78716C] block">
                    Status
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#4A7C59] font-medium">
                    Confirmed (Prototype)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-[#78716C] uppercase tracking-wider block">
                    Guest Name
                  </span>
                  <span className="font-medium text-[#1C1917]">{confirmedBooking.guestName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#78716C] uppercase tracking-wider block">
                    Accommodation
                  </span>
                  <span className="font-medium text-[#1C1917]">{confirmedBooking.roomName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#78716C] uppercase tracking-wider block">
                    Check-In
                  </span>
                  <span className="font-medium text-[#1C1917]">{confirmedBooking.checkIn} (From 12:00 PM)</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#78716C] uppercase tracking-wider block">
                    Check-Out
                  </span>
                  <span className="font-medium text-[#1C1917]">{confirmedBooking.checkOut} (Until 11:00)</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#78716C] uppercase tracking-wider block">
                    Guests
                  </span>
                  <span className="font-medium text-[#1C1917]">{confirmedBooking.guests} Adults ({confirmedBooking.totalNights} Nights)</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#78716C] uppercase tracking-wider block">
                    Indicative Total
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#1C1917]">{confirmedBooking.estimatedTotal}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#DFD7C8] text-[11px] text-[#78716C]">
                <p className="font-medium text-[#1C1917]">Property Location:</p>
                <p>{HOTEL_INFO.address.fullFormatted}</p>
                <p className="mt-1 text-[#A8583B]">Telephone: {HOTEL_INFO.contact.phone}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <a
                href={WHATSAPP_CONFIG.getWhatsAppUrl(
                  `Hello Ekaatra, I would like to confirm my booking enquiry.\nRef: ${confirmedBooking.bookingRef}\nName: ${confirmedBooking.guestName}\nRoom: ${confirmedBooking.roomName}\nDates: ${confirmedBooking.checkIn} to ${confirmedBooking.checkOut} (${confirmedBooking.guests} guests).\nPlease share confirmation details.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                <span>Confirm on WhatsApp</span>
              </a>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handlePrint}
                  className="flex-1 sm:flex-initial px-4 py-2 border border-[#DFD7C8] text-xs uppercase tracking-widest text-[#1C1917] hover:bg-[#F5F2EA] flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Voucher</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-initial px-5 py-2 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] text-xs uppercase tracking-widest font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
