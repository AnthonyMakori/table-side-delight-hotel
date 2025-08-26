
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchFilters } from '@/components/accommodations/SearchFilters';
import { RoomCard } from '@/components/accommodations/RoomCard';
import { FilterOptions, Room } from '@/types/accommodation';
import { Grid, List, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import { fetchRooms } from '@/services/roomsApi';
import { normalizeRoom } from '../../utils/normalizeRoom';

const Accommodations = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<Room[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price-asc'); 
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState<FilterOptions>({
    type: [],
    priceRange: [0, 1000],
    availability: [],
    condition: [],
  });

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const api = await fetchRooms();
        const normalized = api.map(normalizeRoom);
        setRooms(normalized);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setRooms([]); 
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const filteredAndSortedRooms = useMemo(() => {
    const q = searchQuery.toLowerCase();

    let filtered = rooms.filter((room) => {
      const matchesSearch =
        (room.name?.toLowerCase() || '').includes(q) ||
        (room.type?.toLowerCase() || '').includes(q) ||
        (room.status?.toLowerCase() || '').includes(q) ||
        (room.features || []).some((f) => (f?.toLowerCase() || '').includes(q));

      const matchesType = filters.type.length === 0 || filters.type.includes(room.type);

      const night = room.price?.night ?? 0;
      const matchesPrice =
        night >= filters.priceRange[0] &&
        (filters.priceRange[1] >= 1000 || night <= filters.priceRange[1]);

      const matchesAvailability =
        filters.availability.length === 0 || filters.availability.includes(room.status);

      const matchesCondition =
        filters.condition.length === 0 || filters.condition.includes(room.condition);

      return matchesSearch && matchesType && matchesPrice && matchesAvailability && matchesCondition;
    });

    // Sort
    filtered.sort((a, b) => {
      const pa = a.price?.night ?? 0;
      const pb = b.price?.night ?? 0;

      switch (sortBy) {
        case 'price-asc':
          return pa - pb;
        case 'price-desc':
          return pb - pa;
        case 'rating-desc':
          return (b.rating ?? 0) - (a.rating ?? 0);
        case 'popular':
          return (b.reviews?.length ?? 0) - (a.reviews?.length ?? 0);
        case 'newest':
          if (a.condition === 'Newly renovated' && b.condition !== 'Newly renovated') return -1;
          if (b.condition === 'Newly renovated' && a.condition !== 'Newly renovated') return 1;
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filters, sortBy, rooms]);

  const handleViewDetails = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  const LoadingSkeleton = () => (
    <div
      className={`grid gap-6 ${
        viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
      }`}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">Find Your Perfect Stay</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover comfortable accommodations with modern amenities and exceptional service.
            From cozy single rooms to luxury penthouses, we have something for every traveler.
          </p>
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => navigate(-1)}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 animate-slide-up">
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFiltersChange={setFilters}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredAndSortedRooms.length}
          />
        </div>

        {/* View Toggle and Results */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Available Accommodations</h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => setViewMode('grid')}
              className={cn(
                'text-white',
                viewMode === 'grid'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-100'
              )}
            >
              <Grid className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              onClick={() => setViewMode('list')}
              className={cn(
                'text-white',
                viewMode === 'list'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-100'
              )}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Room Grid/List */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredAndSortedRooms.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
          >
            {filteredAndSortedRooms.map((room, index) => (
              <div key={room.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
                <RoomCard room={room} onViewDetails={handleViewDetails} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">🏨</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No rooms found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters to find more options.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  type: [],
                  priceRange: [0, 1000],
                  availability: [],
                  condition: [],
                });
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accommodations;
