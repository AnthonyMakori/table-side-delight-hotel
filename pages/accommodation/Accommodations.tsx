import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchFilters } from '../../src/components/accommodations/SearchFilters';
import { RoomCard } from '../../src/components/accommodations/RoomCard';
import { mockRooms } from '../../src/data/rooms';
import { FilterOptions } from '../../src/types/accommodation';
import { Grid, List } from 'lucide-react';
import { Button } from '../../src/components/ui/button';
import { Skeleton } from '../../src/components/ui/skeleton';
import {Button3} from '../../src/components/ui/button3';
import { ArrowLeft } from 'lucide-react';

const Accommodations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    type: [],
    priceRange: [0, 1000],
    availability: [],
    condition: [],
  });

  const filteredAndSortedRooms = useMemo(() => {
    let filtered = mockRooms.filter(room => {
      // Search filter
      const matchesSearch = 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));

      // Type filter
      const matchesType = filters.type.length === 0 || filters.type.includes(room.type);

      // Price filter
      const matchesPrice = room.price.night >= filters.priceRange[0] && 
                          (filters.priceRange[1] >= 1000 || room.price.night <= filters.priceRange[1]);

      // Availability filter
      const matchesAvailability = filters.availability.length === 0 || filters.availability.includes(room.status);

      // Condition filter
      const matchesCondition = filters.condition.length === 0 || filters.condition.includes(room.condition);

      return matchesSearch && matchesType && matchesPrice && matchesAvailability && matchesCondition;
    });

    // Sort rooms
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price.night - b.price.night;
        case 'price-desc':
          return b.price.night - a.price.night;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'newest':
          return a.condition === 'Newly renovated' ? -1 : 1;
        case 'popular':
          return b.reviews.length - a.reviews.length;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filters, sortBy]);

  const handleViewDetails = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  const LoadingSkeleton = () => (
    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
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
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Find Your Perfect Stay
          </h1>
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
          <h2 className="text-2xl font-semibold text-foreground">
            Available Accommodations
          </h2>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Room Grid/List */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredAndSortedRooms.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
            {filteredAndSortedRooms.map((room, index) => (
              <div key={room.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
                <RoomCard
                  room={room}
                  onViewDetails={handleViewDetails}
                />
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