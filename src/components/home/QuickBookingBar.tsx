import React, { useState } from 'react';
import { Calendar, Users, BedSingle, ArrowRight } from 'lucide-react';
import { ROOMS_DATA } from '../../data/hotelData';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

interface QuickBookingBarProps {
  onCheckAvailability: (bookingState: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: string;
  }) => void;
}

export const QuickBookingBar: React.FC<QuickBookingBarProps> = ({ onCheckAvailability }) => {
  // Default to today + 3 days and today + 5 days
  const today = new Date();
  const defaultCheckIn = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const defaultCheckOut = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState(ROOMS_DATA[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      checkIn,
      checkOut,
      guests,
      roomType,
    });
  };

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-4 -mt-10 sm:-mt-14">
      <div className="bg-[#FAF8F5] border border-[#ECE7DE] p-4 sm:p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Check-In */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#7D7569] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B89355]" />
              Check-In Date
            </label>
            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-[#1C1917] text-xs px-3 py-2.5 focus:outline-none focus:border-[#B89355] transition-colors"
              required
            />
          </div>

          {/* Check-Out */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#7D7569] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B89355]" />
              Check-Out Date
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || new Date().toISOString().split('T')[0]}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-[#1C1917] text-xs px-3 py-2.5 focus:outline-none focus:border-[#B89355] transition-colors"
              required
            />
          </div>

          {/* Guests */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#7D7569] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#B89355]" />
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-[#1C1917] text-xs px-3 py-2.5 focus:outline-none focus:border-[#B89355] transition-colors"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests (Recommended)</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests</option>
            </select>
          </div>

          {/* Room Type */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#7D7569] flex items-center gap-1.5">
              <BedSingle className="w-3.5 h-3.5 text-[#B89355]" />
              Room Preference
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full bg-[#F5F2EA] border border-[#DFD7C8] text-[#1C1917] text-xs px-3 py-2.5 focus:outline-none focus:border-[#B89355] transition-colors truncate"
            >
              {ROOMS_DATA.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit CTA */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] transition-all duration-300 py-2.5 px-4 text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 group whitespace-nowrap cursor-pointer shadow-sm"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] group-hover:text-white transition-colors" />
              <span>Book via WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        <div className="mt-3 text-center text-[11px] text-[#7D7569] flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
          <span className="text-[#1C1917] font-medium flex items-center gap-1">
            <WhatsAppIcon className="w-3 h-3 text-[#25D366]" />
            Direct WhatsApp: +91 98996 11425
          </span>
          <span aria-hidden="true">·</span>
          <span>Best Direct Rate Guarantee</span>
          <span aria-hidden="true">·</span>
          <span>Instant Availability & Quotation</span>
        </div>
      </div>
    </div>
  );
};
