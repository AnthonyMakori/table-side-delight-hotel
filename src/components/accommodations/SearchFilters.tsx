import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FilterOptions, SortOption } from '@/types/accommodation';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
}

const sortOptions: SortOption[] = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating-desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Most Popular', value: 'popular' },
];

const roomTypes = ['Single', 'Double', 'Suite', 'Penthouse'];
const availabilityOptions = ['Available', 'Taken'];
const conditionOptions = ['Newly renovated', 'Standard', 'Needs maintenance'];

export const SearchFilters = ({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  totalResults,
}: SearchFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...filters.type, type]
      : filters.type.filter(t => t !== type);
    onFiltersChange({ ...filters, type: newTypes });
  };

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    const newAvailability = checked
      ? [...filters.availability, availability]
      : filters.availability.filter(a => a !== availability);
    onFiltersChange({ ...filters, availability: newAvailability });
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    const newConditions = checked
      ? [...filters.condition, condition]
      : filters.condition.filter(c => c !== condition);
    onFiltersChange({ ...filters, condition: newConditions });
  };

  const handlePriceRangeChange = (values: number[]) => {
    onFiltersChange({ ...filters, priceRange: [values[0], values[1]] });
  };

  const clearFilters = () => {
    onFiltersChange({
      type: [],
      priceRange: [0, 1000],
      availability: [],
      condition: [],
    });
  };

  const hasActiveFilters = 
    filters.type.length > 0 ||
    filters.availability.length > 0 ||
    filters.condition.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000;

  return (
    <div className="space-y-4">
      {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search rooms by name, type, or features..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">
                !
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{totalResults} rooms found</span>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-3 h-3 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.type.map((type) => (
            <Badge key={type} variant="secondary" className="cursor-pointer" onClick={() => handleTypeChange(type, false)}>
              {type} <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          {filters.availability.map((availability) => (
            <Badge key={availability} variant="secondary" className="cursor-pointer" onClick={() => handleAvailabilityChange(availability, false)}>
              {availability} <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          {filters.condition.map((condition) => (
            <Badge key={condition} variant="secondary" className="cursor-pointer" onClick={() => handleConditionChange(condition, false)}>
              {condition} <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}

      {/* Filter Panel */}
      <Collapsible open={showFilters} onOpenChange={setShowFilters}>
        <CollapsibleContent className="animate-slide-up">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Room Type Filter */}
              <div>
                <h4 className="font-medium mb-3">Room Type</h4>
                <div className="grid grid-cols-2 gap-3">
                  {roomTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2 border-b border-muted pb-2">
                      <Checkbox
                        id={type}
                        checked={filters.type.includes(type)}
                        onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                      />
                      <label htmlFor={type} className="text-sm cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h4 className="font-medium mb-3">Price Range (per night)</h4>
                <div className="px-3 ">
                  <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={filters.priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}+</span>
                  </div>
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <h4 className="font-medium mb-3">Availability</h4>
                <div className="grid grid-cols-2 gap-3">
                  {availabilityOptions.map((availability) => (
                    <div key={availability} className="flex items-center space-x-2">
                      <Checkbox
                        id={availability}
                        checked={filters.availability.includes(availability)}
                        onCheckedChange={(checked) => handleAvailabilityChange(availability, checked as boolean)}
                      />
                      <label htmlFor={availability} className="text-sm cursor-pointer">
                        {availability}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Condition Filter */}
              <div>
                <h4 className="font-medium mb-3">Room Condition</h4>
                <div className="space-y-3">
                  {conditionOptions.map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={filters.condition.includes(condition)}
                        onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                      />
                      <label htmlFor={condition} className="text-sm cursor-pointer">
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};