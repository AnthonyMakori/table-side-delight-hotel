import { Star, MapPin, Square } from 'lucide-react';
import { Room } from '@/types/accommodation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface RoomCardProps {
  room: Room;
  onViewDetails: (roomId: string) => void;
}

export const RoomCard = ({ room, onViewDetails }: RoomCardProps) => {
  const getStatusBadgeClass = (status: Room['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-green-600 text-white';
      case 'Taken':
        return 'bg-red-600 text-white';
      default:
        return 'bg-muted text-foreground';
    }
  };

  const getConditionBadgeClass = (condition: Room['condition']) => {
    switch (condition) {
      case 'Newly renovated':
        return 'bg-blue-600 text-white';
      case 'Needs maintenance':
        return 'bg-red-600 text-white';
        case 'Standard':
      return 'bg-yellow-400 text-black';
      default:
        return 'bg-muted text-foreground';
    }
  };

  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      <div className="relative overflow-hidden">
        <img
          src={room.thumbnail}
          alt={room.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />

        {/* Top Left Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={cn(getStatusBadgeClass(room.status))}>
            {room.status}
          </Badge>
          <Badge className={cn(getConditionBadgeClass(room.condition))}>
            {room.condition}
          </Badge>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            <Star className="w-3 h-3 fill-blue-600 text-yellow-400 mr-1" />
            {room.rating}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title & Type */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-blue-600 transition-colors">
            {room.name}
          </h3>
          <span
              className={cn(
                "text-xs px-2 py-1 rounded",
                ['Single', 'Penthouse', 'Suite', 'Double'].includes(room.type)
                  ? 'bg-red-100 text-foreground'
                  : 'bg-accent text-muted-foreground'
              )}
            >
              {room.type}
            </span>

        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {room.shortDescription}
        </p>

        {/* Room Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Square className="w-3 h-3" />
            {room.size.sqm}m² ({room.size.sqft}ft²)
          </div>
          {room.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {room.location.building} {room.location.room}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-bold text-lg text-blue-600">${room.price.night}</span>
            <span className="text-muted-foreground"> /night</span>
          </div>
          <div className="text-xs text-muted-foreground">
            ${room.price.week}/week
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onViewDetails(room.id)}
          className={cn(
            'w-full',
            room.status === 'Available'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
          disabled={room.status === 'Taken'}
        >
          {room.status === 'Available' ? 'View Details' : 'Unavailable'}
        </Button>
      </CardFooter>
    </Card>
  );
};
