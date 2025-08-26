export interface Room {
  id: number;
  number: string;
  type: string;
  capacity: number;
  price: number;
  status: string;
  amenities: string[];
  image: string | null;
  image_url: string | null; 
}
