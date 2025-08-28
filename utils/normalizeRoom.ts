import { ApiRoom, Room } from '@/types/accommodation';

const PLACEHOLDER_IMAGE = '/room-placeholder.jpg'; 

export function normalizeRoom(api: ApiRoom): Room {
  const night = Number.parseFloat(api.price || '0') || 0;

  const features = (api.amenities || []).map(a => (a ?? '').trim()).filter(Boolean);

  const imageUrl = api.image
    ? api.image.startsWith('http')
      ? api.image
      : `${import.meta.env.VITE_API_BASE_URL}/storage/${api.image}`
    : PLACEHOLDER_IMAGE;

  return {
    id: String(api.id),
    type: api.type || 'Room',
    name: `${api.type ?? 'Room'} – ${api.number ?? ''}`.trim(),
    description: '', 
    shortDescription: `${api.type ?? 'Room'} for ${api.capacity ?? 0} guest(s)`,
    condition: 'Standard', 
    status: (api.status as Room['status']) || 'Available',
    thumbnail: imageUrl,   
    images: [imageUrl],    
    price: {
      night,
      week: Math.round(night * 7),
      month: Math.round(night * 30),
    },
    size: {
      sqm: 0,   
      sqft: 0,
    },
    features,
    rating: 0,
    reviews: [],
    location: {
      room: api.number,
    },
  };
}
