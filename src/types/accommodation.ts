export interface Room {
  id: string;
  type: 'Single' | 'Double' | 'Suite' | 'Penthouse';
  name: string;
  description: string;
  shortDescription: string;
  condition: 'Newly renovated' | 'Standard' | 'Needs maintenance';
  status: 'Available' | 'Taken';
  thumbnail: string;
  images: string[];
  price: {
    night: number;
    week: number;
    month: number;
  };
  size: {
    sqm: number;
    sqft: number;
  };
  features: string[];
  rating: number;
  reviews: Review[];
  location?: {
    building: string;
    floor: number;
    room: string;
  };
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FilterOptions {
  type: string[];
  priceRange: [number, number];
  availability: string[];
  condition: string[];
  minRating?: number;
}

export interface SortOption {
  label: string;
  value: 'price-asc' | 'price-desc' | 'rating-desc' | 'newest' | 'popular';
}