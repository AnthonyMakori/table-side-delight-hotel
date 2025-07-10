import { Star, MapPin, Users, Square } from 'lucide-react';
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
  const getStatusVariant = (status: Room['status']) => {
    switch (status) {
      case 'Available':
        return 'available';
      case 'Taken':
        return 'taken';
      default:
        return 'default';
    }
  };

  const getConditionVariant = (condition: Room['condition']) => {
    switch (condition) {
      case 'Newly renovated':
        return 'default';
      case 'Needs maintenance':
        return 'maintenance';
      default:
        return 'secondary';
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
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={getStatusVariant(room.status)}>
            {room.status}
          </Badge>
          <Badge variant={getConditionVariant(room.condition)}>
            {room.condition}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
            {room.rating}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {room.name}
          </h3>
          <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
            {room.type}
          </span>
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {room.shortDescription}
        </p>

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

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-bold text-lg text-primary">${room.price.night}</span>
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
          className="w-full"
          variant={room.status === 'Available' ? 'default' : 'outline'}
          disabled={room.status === 'Taken'}
        >
          {room.status === 'Available' ? 'View Details' : 'Unavailable'}
        </Button>
      </CardFooter>
    </Card>
  );
};