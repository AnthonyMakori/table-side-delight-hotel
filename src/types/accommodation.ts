
export interface ApiRoom {
  id: number;
  number: string;           
  type: string;              
  capacity: number;          
  price: string;             
  status: string;           
  amenities: string[];    
  image?: string | null;      
  image_url?: string | null;    
  created_at?: string;
  updated_at?: string;
}

export type RoomStatus = 'Available' | 'Taken' | 'Maintenance';
export type RoomCondition = 'Newly renovated' | 'Standard' | 'Needs maintenance';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Price {
  night: number;
  week: number;
  month: number;
}

export interface Size {
  sqm: number;
  sqft: number;
}

export interface LocationInfo {
  building?: string;
  floor?: number;
  room?: string;
}

export interface Room {
  id: string;
  type: string;
  name: string;
  description: string;
  shortDescription: string;
  condition: RoomCondition;
  status: RoomStatus | string; 
  thumbnail: string;
  images: string[];
  price: Price;
  size: Size;
  features: string[];
  rating: number;
  reviews: Review[];
  location?: LocationInfo;
}

export interface FilterOptions {
  type: string[];
  priceRange: [number, number];
  availability: string[]; 
  condition: RoomCondition[]; 
}
