import { Room } from '../../src/types/accommodation';
import suiteBedImage from '@/assets/accomodations/room-suite.jpg';
import doubleRoomImage from '@/assets/accomodations/room-double.jpg';
import singleRoomImage from '@/assets/accomodations/room-single.jpg';
import penthouseImage from '@/assets/accomodations/room-penthouse.jpg';

export const mockRooms: Room[] = [
  {
    id: '1',
    type: 'Suite',
    name: 'Executive Suite with City View',
    description: 'Spacious executive suite featuring panoramic city views, separate living area, premium amenities, and modern furnishings. Perfect for business travelers and special occasions.',
    shortDescription: 'Luxury suite with city skyline views',
    condition: 'Newly renovated',
    status: 'Available',
    thumbnail: suiteBedImage,
    images: [suiteBedImage],
    price: {
      night: 350,
      week: 2100,
      month: 8400
    },
    size: {
      sqm: 65,
      sqft: 700
    },
    features: ['WiFi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Room Service', 'City View', 'Separate Living Area', 'Premium Bedding'],
    rating: 4.8,
    reviews: [
      {
        id: '1',
        userName: 'Sarah M.',
        rating: 5,
        comment: 'Absolutely stunning suite with incredible views. The service was impeccable.',
        date: '2024-01-15',
        verified: true
      }
    ],
    location: {
      building: 'Tower A',
      floor: 15,
      room: '1501'
    }
  },
  {
    id: '2',
    type: 'Double',
    name: 'Ocean View Double Room',
    description: 'Comfortable double room with breathtaking ocean views, modern amenities, and twin beds. Ideal for friends traveling together or business colleagues.',
    shortDescription: 'Twin beds with stunning ocean views',
    condition: 'Standard',
    status: 'Available',
    thumbnail: doubleRoomImage,
    images: [doubleRoomImage],
    price: {
      night: 180,
      week: 1080,
      month: 4320
    },
    size: {
      sqm: 35,
      sqft: 377
    },
    features: ['WiFi', 'Air Conditioning', 'TV', 'Ocean View', 'Private Bathroom', 'Daily Housekeeping'],
    rating: 4.3,
    reviews: [
      {
        id: '2',
        userName: 'Michael R.',
        rating: 4,
        comment: 'Great location and view. Room was clean and comfortable.',
        date: '2024-01-10',
        verified: true
      }
    ],
    location: {
      building: 'Tower B',
      floor: 8,
      room: '804'
    }
  },
  {
    id: '3',
    type: 'Single',
    name: 'Cozy Single Room',
    description: 'Perfect single room for solo travelers featuring all essential amenities, comfortable workspace, and warm lighting. Great value for money.',
    shortDescription: 'Compact room with work desk',
    condition: 'Standard',
    status: 'Taken',
    thumbnail: singleRoomImage,
    images: [singleRoomImage],
    price: {
      night: 120,
      week: 720,
      month: 2880
    },
    size: {
      sqm: 25,
      sqft: 269
    },
    features: ['WiFi', 'Air Conditioning', 'TV', 'Work Desk', 'Private Bathroom'],
    rating: 4.1,
    reviews: [
      {
        id: '3',
        userName: 'Emma L.',
        rating: 4,
        comment: 'Perfect for a solo stay. Clean and comfortable.',
        date: '2024-01-05',
        verified: true
      }
    ],
    location: {
      building: 'Tower C',
      floor: 3,
      room: '302'
    }
  },
  {
    id: '4',
    type: 'Penthouse',
    name: 'Luxury Penthouse',
    description: 'Ultimate luxury penthouse with panoramic 360-degree views, private terrace, premium furnishings, and exclusive amenities. The pinnacle of luxury accommodation.',
    shortDescription: 'Ultimate luxury with private terrace',
    condition: 'Newly renovated',
    status: 'Available',
    thumbnail: penthouseImage,
    images: [penthouseImage],
    price: {
      night: 750,
      week: 4500,
      month: 18000
    },
    size: {
      sqm: 120,
      sqft: 1292
    },
    features: ['WiFi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Room Service', 'Panoramic Views', 'Private Terrace', 'Luxury Bathroom', 'Kitchen', 'Living Room'],
    rating: 4.9,
    reviews: [
      {
        id: '4',
        userName: 'James W.',
        rating: 5,
        comment: 'Absolutely magnificent! Best hotel experience ever.',
        date: '2024-01-20',
        verified: true
      }
    ],
    location: {
      building: 'Tower A',
      floor: 25,
      room: 'PH1'
    }
  },
  {
    id: '5',
    type: 'Double',
    name: 'Garden View Double',
    description: 'Peaceful double room overlooking beautiful gardens, featuring comfortable bedding and modern amenities in a tranquil setting.',
    shortDescription: 'Peaceful garden views',
    condition: 'Needs maintenance',
    status: 'Available',
    thumbnail: doubleRoomImage,
    images: [doubleRoomImage],
    price: {
      night: 140,
      week: 840,
      month: 3360
    },
    size: {
      sqm: 32,
      sqft: 344
    },
    features: ['WiFi', 'Air Conditioning', 'TV', 'Garden View', 'Private Bathroom'],
    rating: 3.8,
    reviews: [
      {
        id: '5',
        userName: 'Lisa K.',
        rating: 4,
        comment: 'Nice view but room needs some updates.',
        date: '2024-01-08',
        verified: true
      }
    ],
    location: {
      building: 'Tower C',
      floor: 2,
      room: '205'
    }
  },
  {
    id: '6',
    type: 'Single',
    name: 'Modern Single Room',
    description: 'Contemporary single room with sleek design, high-speed internet, and all modern conveniences for the discerning solo traveler.',
    shortDescription: 'Modern design with premium amenities',
    condition: 'Newly renovated',
    status: 'Available',
    thumbnail: singleRoomImage,
    images: [singleRoomImage],
    price: {
      night: 160,
      week: 960,
      month: 3840
    },
    size: {
      sqm: 28,
      sqft: 301
    },
    features: ['WiFi', 'Air Conditioning', 'Smart TV', 'Work Desk', 'Premium Bedding', 'Coffee Machine'],
    rating: 4.5,
    reviews: [
      {
        id: '6',
        userName: 'David C.',
        rating: 5,
        comment: 'Beautifully renovated room with excellent amenities.',
        date: '2024-01-12',
        verified: true
      }
    ],
    location: {
      building: 'Tower A',
      floor: 5,
      room: '507'
    }
  }
];