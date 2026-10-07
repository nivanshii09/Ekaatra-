import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ArrowLeft, 
  LayoutDashboard, 
  BedSingle, 
  CalendarCheck, 
  Sparkles, 
  Image as ImageIcon, 
  Clock, 
  Users, 
  Database,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { ROOMS_DATA, GALLERY_ITEMS } from '../../data/hotelData';
import { EKAATRA_DEFAULT_PHOTOGRAPHS } from '../../data/hotelPhotos';
import { BookingRecord, EventEnquiryRecord } from '../../types/hotel';

interface AdminPrototypeViewProps {
  onBackToSite: () => void;
  bookingRecords: BookingRecord[];
  enquiryRecords: EventEnquiryRecord[];
}

export const AdminPrototypeView: React.FC<AdminPrototypeViewProps> = ({
  onBackToSite,
  bookingRecords,
  enquiryRecords,
}) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'rooms' | 'bookings' | 'enquiries' | 'gallery' | 'activity' | 'architecture'
  >('dashboard');

  // Pre-populated realistic bookings for demo presentation
  const mockBookings: BookingRecord[] = [
    {
      id: 'demo-1',
      bookingRef: 'EK-2026-9104',
      guestName: 'Aditya & Neha Singhania',
      guestEmail: 'aditya.singhania@example.com',
      guestPhone: '+91 98201 54321',
      roomName: 'Royal Haveli Suite',
      checkIn: '2026-10-18',
      checkOut: '2026-10-21',
      guests: 2,
      totalNights: 3,
      estimatedTotal: '₹ 72,000',
      status: 'confirmed',
      createdAt: '2026-10-05T14:30:00Z',
    },
    {
      id: 'demo-2',
      bookingRef: 'EK-2026-8842',
      guestName: 'Dr. Siddharth Mehta',
      guestEmail: 'mehta.s@healthgroup.in',
      guestPhone: '+91 94140 12890',
      roomName: 'Heritage Courtyard Room',
      checkIn: '2026-10-24',
      checkOut: '2026-10-26',
      guests: 2,
      totalNights: 2,
      estimatedTotal: '₹ 33,600',
      status: 'confirmed',
      createdAt: '2026-10-04T09:15:00Z',
    },
  ];

  const allBookings = [...bookingRecords, ...mockBookings];

  const mockEnquiries: EventEnquiryRecord[] = [
    {
      id: 'enq-demo-1',
      name: 'Pooja Chawla',
      email: 'pooja.chawla@weddings.in',
      phone: '+91 98110 99887',
      eventType: 'Intimate Heritage Weddings',
      estimatedDate: '2026-11-20',
      estimatedGuests: 120,
      notes: 'Seeking 3-day full property buyout for family nuptials and sangeet in courtyard.',
      status: 'new',
      createdAt: '2026-10-05T16:45:00Z',
    },
  ];

  const allEnquiries = [...enquiryRecords, ...mockEnquiries];

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1917] font-sans">
      {/* Top Warning Banner as requested by prompt */}
      <div className="bg-[#292524] text-[#FAF8F5] px-6 py-3 border-b border-[#44403C] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#EAB308] shrink-0" />
          <span className="font-medium text-[#EAB308]">
            PROTOTYPE / AUTHENTICATION TO BE CONNECTED
          </span>
          <span className="hidden md:inline text-stone-400">
            — Future Production Architecture: Flask REST API + PostgreSQL + Role-Based Access Control (RBAC).
          </span>
        </div>

        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5] text-[#1C1917] hover:bg-[#B89355] hover:text-white transition-colors text-[11px] uppercase tracking-wider font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Website</span>
        </button>
      </div>

      {/* Main Admin Frame */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DFD7C8] gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89355] font-semibold">
              Ekaatra Management Console
            </span>
            <h1 className="font-serif text-3xl text-[#1C1917] font-normal mt-0.5">
              Property Administration
            </h1>
            <p className="text-xs text-[#78716C]">
              A73, RIICO Industrial Area, Kukas, Rajasthan 302038
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#ECE7DE] text-[11px] font-mono text-[#57534E] border border-[#DFD7C8]">
              Role: OWNER (Simulated)
            </span>
            <span className="px-2.5 py-1 bg-emerald-100 text-[11px] font-mono text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              PMS Sync Ready
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 py-4 border-b border-[#DFD7C8] text-xs">
          {[
            { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'bookings', label: `Bookings (${allBookings.length})`, icon: CalendarCheck },
            { id: 'enquiries', label: `Event Enquiries (${allEnquiries.length})`, icon: Sparkles },
            { id: 'rooms', label: 'Room Inventory', icon: BedSingle },
            { id: 'gallery', label: 'Media Assets', icon: ImageIcon },
            { id: 'activity', label: 'Audit Trail & RBAC', icon: Clock },
            { id: 'architecture', label: 'Production Backend Specs', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 uppercase tracking-wider font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#1C1917] text-[#FAF8F5]'
                    : 'bg-[#FAF8F5] text-[#78716C] hover:text-[#1C1917] border border-[#ECE7DE]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS */}
        <div className="py-6">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-[#FAF8F5] border border-[#ECE7DE] space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C]">Total Rooms</span>
                  <p className="font-serif text-3xl text-[#1C1917]">4 Categories</p>
                  <p className="text-xs text-stone-500">Deluxe to Presidential</p>
                </div>
                <div className="p-5 bg-[#FAF8F5] border border-[#ECE7DE] space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C]">Active Reservations</span>
                  <p className="font-serif text-3xl text-[#1C1917]">{allBookings.length}</p>
                  <p className="text-xs text-emerald-700">100% Verified in prototype</p>
                </div>
                <div className="p-5 bg-[#FAF8F5] border border-[#ECE7DE] space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C]">Celebration Enquiries</span>
                  <p className="font-serif text-3xl text-[#1C1917]">{allEnquiries.length}</p>
                  <p className="text-xs text-[#B89355]">Weddings & Conclaves</p>
                </div>
                <div className="p-5 bg-[#FAF8F5] border border-[#ECE7DE] space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C]">Property Status</span>
                  <p className="font-serif text-3xl text-[#1C1917]">Sanctuary</p>
                  <p className="text-xs text-stone-500">Kukas Corridor Active</p>
                </div>
              </div>

              {/* Recent Bookings Table preview */}
              <div className="bg-[#FAF8F5] border border-[#ECE7DE] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-[#1C1917]">
                    Recent Reservation Requests
                  </h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-[#B89355] hover:underline"
                  >
                    View All Bookings →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F5F2EA] text-[#78716C] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3">Ref #</th>
                        <th className="p-3">Guest Name</th>
                        <th className="p-3">Suite</th>
                        <th className="p-3">Dates</th>
                        <th className="p-3">Indicative Total</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ECE7DE]">
                      {allBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-[#FAF8F5]/80">
                          <td className="p-3 font-mono font-medium">{b.bookingRef}</td>
                          <td className="p-3 font-medium text-[#1C1917]">{b.guestName}</td>
                          <td className="p-3">{b.roomName}</td>
                          <td className="p-3">{b.checkIn} → {b.checkOut}</td>
                          <td className="p-3 font-serif font-medium">{b.estimatedTotal}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] uppercase font-medium">
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="bg-[#FAF8F5] border border-[#ECE7DE] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#1C1917]">
                    All Reservations & Inbound Bookings
                  </h3>
                  <p className="text-xs text-[#78716C] mt-0.5">
                    Live captured records from customer bookings during this session.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F5F2EA] text-[#78716C] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Booking Ref</th>
                      <th className="p-3">Guest</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Room</th>
                      <th className="p-3">Stay Dates</th>
                      <th className="p-3">Guests</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ECE7DE]">
                    {allBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#F5F2EA]/60">
                        <td className="p-3 font-mono font-medium text-[#1C1917]">{b.bookingRef}</td>
                        <td className="p-3 font-medium">{b.guestName}</td>
                        <td className="p-3 text-[11px] text-[#78716C]">
                          {b.guestEmail}<br />{b.guestPhone}
                        </td>
                        <td className="p-3">{b.roomName}</td>
                        <td className="p-3">{b.checkIn} to {b.checkOut} ({b.totalNights} nights)</td>
                        <td className="p-3">{b.guests}</td>
                        <td className="p-3 font-serif font-medium">{b.estimatedTotal}</td>
                        <td className="p-3 text-[10px] text-[#78716C]">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="bg-[#FAF8F5] border border-[#ECE7DE] p-6 space-y-4">
              <div>
                <h3 className="font-serif text-2xl text-[#1C1917]">
                  Event & Wedding Enquiries
                </h3>
                <p className="text-xs text-[#78716C] mt-0.5">
                  Proposals submitted by visitors for private celebrations, corporate conclaves, and heritage nuptials.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F5F2EA] text-[#78716C] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Occasion</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Guests</th>
                      <th className="p-3">Notes</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ECE7DE]">
                    {allEnquiries.map((e) => (
                      <tr key={e.id} className="hover:bg-[#F5F2EA]/60">
                        <td className="p-3 font-medium text-[#1C1917]">{e.name}</td>
                        <td className="p-3 text-[11px] text-[#78716C]">
                          {e.email}<br />{e.phone}
                        </td>
                        <td className="p-3 font-medium">{e.eventType}</td>
                        <td className="p-3">{e.estimatedDate}</td>
                        <td className="p-3">{e.estimatedGuests}</td>
                        <td className="p-3 max-w-xs truncate text-[#78716C]">{e.notes || '—'}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] uppercase font-medium">
                            {e.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ROOMS INVENTORY */}
          {activeTab === 'rooms' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ROOMS_DATA.map((r) => (
                <div key={r.id} className="p-6 bg-[#FAF8F5] border border-[#ECE7DE] space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#B89355]">
                        {r.category}
                      </span>
                      <h4 className="font-serif text-2xl text-[#1C1917]">{r.name}</h4>
                    </div>
                    <span className="font-serif text-lg">{r.startingPricePlaceholder}</span>
                  </div>

                  <p className="text-xs text-[#57534E] leading-relaxed font-light">
                    {r.shortDescription}
                  </p>

                  <div className="flex gap-4 text-xs text-[#78716C] pt-2 border-t border-[#ECE7DE]">
                    <span>Size: {r.sizeSqm} m²</span>
                    <span>Capacity: {r.occupancy}</span>
                    <span>View: {r.view}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="bg-[#FAF8F5] border border-[#ECE7DE] p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-2xl text-[#1C1917]">
                    Media Asset Registry ({GALLERY_ITEMS.length} Assets)
                  </h3>
                  <p className="text-xs text-[#78716C]">
                    The 6 verified authentic property photographic captures of Ekaatra by PEM.
                  </p>
                </div>

                <a
                  href="https://www.instagram.com/ekaatrabypem?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-2 self-start"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#B89355]" />
                  <span>View Live Instagram Media (@ekaatrabypem)</span>
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
                {GALLERY_ITEMS.map((g) => (
                  <div key={g.id} className="p-3 bg-[#F5F2EA] border border-[#ECE7DE] space-y-2">
                    <div className="aspect-[4/3] bg-black overflow-hidden border border-[#DFD7C8]">
                      <img
                        src={EKAATRA_DEFAULT_PHOTOGRAPHS[g.image] || ''}
                        alt={g.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-[#B89355]">{g.category}</div>
                    <div className="text-xs font-medium text-[#1C1917] truncate">{g.title}</div>
                    <div className="text-[10px] font-mono text-[#78716C] truncate">{g.image}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: AUDIT TRAIL & RBAC */}
          {activeTab === 'activity' && (
            <div className="bg-[#FAF8F5] border border-[#ECE7DE] p-6 space-y-4">
              <h3 className="font-serif text-2xl text-[#1C1917]">
                Security Audit Log & Role Governance
              </h3>
              <p className="text-xs text-[#78716C]">
                Simulated activity audit log illustrating production RBAC events.
              </p>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { time: '2026-10-06 09:20:11', role: 'OWNER', action: 'Accessed Property Administration Dashboard' },
                  { time: '2026-10-06 08:44:32', role: 'SYSTEM', action: 'Captured new reservation voucher EK-2026-9104' },
                  { time: '2026-10-05 17:10:02', role: 'MANAGER', action: 'Audited Courtyard wedding event enquiry #enq-demo-1' },
                  { time: '2026-10-05 11:05:44', role: 'STAFF', action: 'Updated breakfast seating schedule for The Courtyard' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#F5F2EA] border border-[#ECE7DE] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[#78716C]">{item.time}</span>
                      <span className="px-1.5 py-0.5 bg-[#1C1917] text-white text-[10px]">{item.role}</span>
                      <span className="text-[#1C1917]">{item.action}</span>
                    </div>
                    <span className="text-emerald-700 text-[10px]">Verified Audit</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: PRODUCTION ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="bg-[#FAF8F5] border border-[#ECE7DE] p-6 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B89355] font-semibold">
                  Technical Roadmap
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917] mt-0.5">
                  Future Production System Architecture
                </h3>
                <p className="text-xs text-[#78716C] mt-1 font-light leading-relaxed">
                  As planned for the eventual rollout to the hotel owner, the frontend is decoupled cleanly from backend services.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-[#F5F2EA] border border-[#DFD7C8] space-y-2">
                  <h4 className="font-medium text-xs uppercase tracking-wider text-[#1C1917]">Frontend Delivery</h4>
                  <p className="text-xs text-[#57534E]">Vercel Edge Network / Vite React SPA with static hydration and Brotli compression.</p>
                </div>
                <div className="p-4 bg-[#F5F2EA] border border-[#DFD7C8] space-y-2">
                  <h4 className="font-medium text-xs uppercase tracking-wider text-[#1C1917]">Backend Engine</h4>
                  <p className="text-xs text-[#57534E]">Python Flask REST API with Gunicorn workers & Marshmallow payload validation schemas.</p>
                </div>
                <div className="p-4 bg-[#F5F2EA] border border-[#DFD7C8] space-y-2">
                  <h4 className="font-medium text-xs uppercase tracking-wider text-[#1C1917]">Relational Database</h4>
                  <p className="text-xs text-[#57534E]">PostgreSQL database storing guest reservations, inventory locks, room rates, and audit trails.</p>
                </div>
                <div className="p-4 bg-[#F5F2EA] border border-[#DFD7C8] space-y-2">
                  <h4 className="font-medium text-xs uppercase tracking-wider text-[#1C1917]">Image CDN</h4>
                  <p className="text-xs text-[#57534E]">Cloudinary auto-format (WebP/AVIF) responsive delivery with signed transformation URLs.</p>
                </div>
                <div className="p-4 bg-[#F5F2EA] border border-[#DFD7C8] space-y-2">
                  <h4 className="font-medium text-xs uppercase tracking-wider text-[#1C1917]">Security & Auth</h4>
                  <p className="text-xs text-[#57534E]">HTTP-only signed JWT sessions, bcrypt hashing, OWASP ZAP scanning, and RBAC matrix.</p>
                </div>
                <div className="p-4 bg-[#F5F2EA] border border-[#DFD7C8] space-y-2">
                  <h4 className="font-medium text-xs uppercase tracking-wider text-[#1C1917]">Quality Assurance</h4>
                  <p className="text-xs text-[#57534E]">Playwright end-to-end browser suites + Pytest REST API contract assertions.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
