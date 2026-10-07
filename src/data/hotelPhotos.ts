import heroFacade from '../assets/images/Main building.jpg';
import galleryLobby from '../assets/images/Lobby2.jpg';
import lobbyFacadeDusk from '../assets/images/Lobby1.jpg';
import galleryFoyer from '../assets/images/Bedroom.jpg';
import deluxeGarden from '../assets/images/King room.jpg';
import galleryLogo from '../assets/images/Main logo.jpg';
import buildingTower from '../assets/images/Main building.jpg';

// Authentic photographic configuration for Ekaatra by PEM (Kukas, Jaipur).
// Contains high-fidelity photographic assets corresponding to the property captures:
// 1st: Facade at dusk
// 2nd: Arrival Lobby & Adiyogi Sanctuary
// 3rd: Level 3 Elevator Foyer & Room 302
// 4th: Deluxe King Bedroom
// 5th: Official Brand Logo
// 6th: 5-Storey Boutique Building Tower

export interface PhotoSlotMeta {
  id: string;
  expectedFilename: string;
  name: string;
  role: string;
  section: string;
  description: string;
}

export const EKAATRA_PHOTO_SLOTS: PhotoSlotMeta[] = [
  {
    id: 'hero_facade',
    expectedFilename: 'unnamed (1).png',
    name: 'Boutique Facade at Dusk',
    role: 'Hero Background & Property Architecture',
    section: 'Hero Banner & Moments of Ekaatra',
    description: 'White 5-storey modern boutique tower in Kukas with warm illuminated black-mullioned arched windows at twilight',
  },
  {
    id: 'gallery_lobby',
    expectedFilename: 'photo_2026-10-06_22-19-28.jpg',
    name: 'The Arrival Sanctuary & Adiyogi Lobby',
    role: 'Ground Floor Arrival & Sanctuary',
    section: 'The Sanctuary Section & Reception',
    description: 'Lord Shiva Adiyogi bust sculpture with glowing crescent moon, white Italian marble front desk & circular cove ceiling dome',
  },
  {
    id: 'gallery_foyer',
    expectedFilename: 'photo_2026-10-06_22-19-21.jpg',
    name: 'Level 3 Elevator Foyer & Room 302',
    role: 'Guestroom Circulation & Modern Transit',
    section: 'Architecture, Corridors & Foyers',
    description: 'Circular flush backlit ceiling halo, textured granite elevator portal, floor directory plaque (G to 4), Room 302 entrance & potted plant',
  },
  {
    id: 'deluxe_garden',
    expectedFilename: 'photo_2026-10-06_22-19-18.jpg',
    name: 'Deluxe Teak King Bedroom',
    role: 'Accommodations & Suites Showcase',
    section: 'Stay / Accommodations',
    description: 'Solid teakwood platform bed, charcoal linens with floral runner, traditional palace painting & bedside brass sconces',
  },
  {
    id: 'gallery_logo',
    expectedFilename: 'WhatsApp Image 2026-10-06 at 10.22.47 PM.jpeg',
    name: 'Official Ekaatra Brand Logo',
    role: 'Brand Lockup & Header Emblem',
    section: 'Header, Hero & Brand Identity',
    description: 'Gold interconnected mandala emblem, stylized E monogram, and EKAATRA by PEM typography',
  },
  {
    id: 'building_tower',
    expectedFilename: 'building_exterior.jpg',
    name: '5-Storey Boutique Building Tower',
    role: 'Full Architectural Facade & Skyward Perspective',
    section: 'Moments of Ekaatra Gallery & Facade',
    description: 'Pristine white boutique hotel tower with rows of illuminated arched windows, entrance portal and rooftop pergola under dusk sky',
  },
];

// High-fidelity photographic assets for all 6 real property slots
export const EKAATRA_DEFAULT_PHOTOGRAPHS: Record<string, string> = {
  hero_facade: heroFacade,
  gallery_lobby: galleryLobby,
  gallery_foyer: galleryFoyer,
  deluxe_garden: deluxeGarden,
  gallery_logo: galleryLogo,
  building_tower: buildingTower,
  facade_dusk: lobbyFacadeDusk,
};

