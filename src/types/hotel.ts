export interface Room {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  sizeSqm: number;
  occupancy: string;
  bedType: string;
  view: string;
  startingPricePlaceholder: string;
  isPricePlaceholder: boolean;
  amenities: string[];
  features: string[];
  heroImage: string;
  galleryImages: string[];
}

export interface Experience {
  id: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  timing: string;
  category: 'nature' | 'wellness' | 'dining' | 'heritage' | 'private';
  image: string;
  highlights: string[];
}

export interface DiningVenue {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  hours: string;
  cuisine: string;
  seating: string;
  image: string;
  specialties: string[];
}

export interface EventOffering {
  id: string;
  title: string;
  capacity: string;
  setting: string;
  description: string;
  suitableFor: string[];
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'property' | 'rooms' | 'dining' | 'experiences' | 'events';
  caption: string;
  image: string;
  featured?: boolean;
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
}

export interface BookingRecord {
  id: string;
  bookingRef: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalNights: number;
  estimatedTotal: string;
  status: 'confirmed' | 'pending_verification' | 'cancelled';
  createdAt: string;
}

export interface EventEnquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  estimatedDate: string;
  estimatedGuests: number;
  notes: string;
  status: 'new' | 'contacted' | 'proposal_sent';
  createdAt: string;
}

export interface InstagramPost {
  id: string;
  imageKey: string;
  caption: string;
  likes: string;
  comments: string;
  timestamp: string;
  tags: string[];
  url: string;
}

export interface InstagramStory {
  id: string;
  title: string;
  imageKey: string;
  badge?: string;
  description: string;
}
