import React, { useState } from 'react';
import { PhotoSlotAttacher } from './components/ui/PhotoSlotAttacher';
import { Header } from './components/layout/Header';
import { Hero } from './components/home/Hero';
import { QuickBookingBar } from './components/home/QuickBookingBar';
import { Introduction } from './components/home/Introduction';
import { RoomsPreview } from './components/home/RoomsPreview';
import { ArchitectureFoyers } from './components/home/ArchitectureFoyers';
import { GallerySection } from './components/home/GallerySection';
import { InstagramShowcase } from './components/home/InstagramShowcase';
import { LocationSection } from './components/home/LocationSection';
import { Footer } from './components/layout/Footer';

// Modals & Admin
import { RoomDetailModal } from './components/modals/RoomDetailModal';
import { BookingModal } from './components/modals/BookingModal';
import { PolicyModal } from './components/modals/PolicyModal';
import { AdminPrototypeView } from './components/admin/AdminPrototypeView';

// Context & Types
import { ImageProvider } from './context/ImageContext';
import { Room, BookingRecord, EventEnquiryRecord } from './types/hotel';
import { ROOMS_DATA, HOTEL_INFO, WHATSAPP_CONFIG } from './data/hotelData';
import { Calendar } from 'lucide-react';
import { WhatsAppIcon } from './components/ui/WhatsAppIcon';

function HotelAppContent() {
  // Navigation & View Mode
  const [isAdminView, setIsAdminView] = useState(false);

  // Modal States
  const [selectedRoomForDetail, setSelectedRoomForDetail] = useState<Room | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [bookingInitialDates, setBookingInitialDates] = useState<{
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }>({});

  const [policyModalType, setPolicyModalType] = useState<'policies' | 'privacy' | 'terms' | null>(null);

  // Session Data Stores
  const [sessionBookings, setSessionBookings] = useState<BookingRecord[]>([]);
  const [sessionEnquiries] = useState<EventEnquiryRecord[]>([]);

  // Handlers - Direct to WhatsApp
  const handleOpenBooking = (room?: Room) => {
    const url = room
      ? WHATSAPP_CONFIG.getWhatsAppUrl(
          `Hello Ekaatra, I would like to enquire about availability and booking for the ${room.name}. Please share the details.`
        )
      : WHATSAPP_CONFIG.getWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleQuickAvailability = (params: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: string;
  }) => {
    const matchedRoom = ROOMS_DATA.find((r) => r.id === params.roomType) || ROOMS_DATA[0];
    const msg = `Hello Ekaatra, I would like to enquire about availability and booking for the ${matchedRoom.name}.\nDates: ${params.checkIn} to ${params.checkOut} (${params.guests} ${params.guests === 1 ? 'guest' : 'guests'}).\nPlease share the details.`;
    window.open(WHATSAPP_CONFIG.getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  const handleExplore = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSuccess = (newRecord: BookingRecord) => {
    setSessionBookings((prev) => [newRecord, ...prev]);
  };

  if (isAdminView) {
    return (
      <AdminPrototypeView
        onBackToSite={() => setIsAdminView(false)}
        bookingRecords={sessionBookings}
        enquiryRecords={sessionEnquiries}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#B89355]/20 selection:text-[#1C1917] relative">
      {/* 0. Photo Slot Attacher Ribbon for User's Uploaded Screenshots */}
      <PhotoSlotAttacher />

      {/* 1. Header with Official Ekaatra Logo */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* 2. Hero Section (Slot 01: Boutique Facade at Dusk) */}
      <Hero
        onOpenBooking={() => handleOpenBooking()}
        onExplore={handleExplore}
      />

      {/* 3. Quick Reservation Ribbon */}
      <QuickBookingBar onCheckAvailability={handleQuickAvailability} />

      {/* 4. The Sanctuary & Arrival Lobby (Slot 02: Adiyogi Reception) */}
      <Introduction />

      {/* 5. Accommodations & Suites (Slot 03: Deluxe Teak Bedroom) */}
      <RoomsPreview
        onSelectRoom={(room) => setSelectedRoomForDetail(room)}
        onBookRoom={(room) => handleOpenBooking(room)}
      />

      {/* 6. Architecture & Vertical Circulation (Slot 04: Level 3 Elevator Foyer & Room 302) */}
      <ArchitectureFoyers />

      {/* 7. Visual Monograph: The 4 Real Property Moments of Ekaatra */}
      <GallerySection />

      {/* 8. Official Instagram Dispatches & Social Stories (@ekaatrabypem) */}
      <InstagramShowcase />

      {/* 9. Location, Access & Directions in Kukas, Rajasthan */}
      <LocationSection />

      {/* 10. Footer */}
      <Footer
        onOpenPolicy={(type) => setPolicyModalType(type)}
        onOpenAdmin={() => setIsAdminView(true)}
      />

      {/* Floating Property Concierge & WhatsApp Dock */}
      <aside aria-label="Social and booking dock" className="fixed bottom-6 right-6 z-30 flex items-center gap-2">
        <a
          href={WHATSAPP_CONFIG.getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#1EBE5D] text-white border border-[#25D366]/40 shadow-2xl px-4 py-2.5 text-xs uppercase tracking-widest font-medium flex items-center gap-2 transition-all group"
          title="Direct WhatsApp booking and enquiries (+91 98996 11425)"
        >
          <WhatsAppIcon className="w-4 h-4 text-white" />
          <span>WhatsApp Us</span>
        </a>

        <button
          onClick={() => handleOpenBooking()}
          className="bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] border border-[#ECE7DE] shadow-2xl px-4 py-2.5 text-xs uppercase tracking-widest font-medium flex items-center gap-2 transition-all group hidden md:inline-flex cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#D9AA82] group-hover:text-white transition-colors" />
          <span>Book Stay</span>
        </button>
      </aside>

      {/* MODALS */}
      {/* Room Detail Modal */}
      <RoomDetailModal
        room={selectedRoomForDetail}
        onClose={() => setSelectedRoomForDetail(null)}
        onBook={(room) => handleOpenBooking(room)}
      />

      {/* Direct Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedRoom={selectedRoomForBooking}
        initialCheckIn={bookingInitialDates.checkIn}
        initialCheckOut={bookingInitialDates.checkOut}
        initialGuests={bookingInitialDates.guests}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Policy & Terms Modal */}
      <PolicyModal
        isOpen={policyModalType !== null}
        onClose={() => setPolicyModalType(null)}
        type={policyModalType || 'policies'}
      />
    </div>
  );
}

export default function App() {
  return (
    <ImageProvider>
      <HotelAppContent />
    </ImageProvider>
  );
}
