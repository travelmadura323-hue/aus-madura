import React, { useState } from 'react';
import { DollarSign, Star, Calendar, MapPin, Search, Filter, ChevronDown } from 'lucide-react';

interface TourFiltersProps {
  onFiltersChange: (filters: Filters) => void;
}

interface Filters {
  priceRange: [number, number];
  rating: number;
  duration: string;
  destinations: string[];
  searchTerm: string;
  sortBy: 'price-low-high' | 'price-high-low' | 'rating' | 'duration';
}

export default function TourFilters({ onFiltersChange }: TourFiltersProps) {
  const [filters, setFilters] = useState<Filters>({
    priceRange: [100, 5000],
    rating: 0,
    duration: '',
    destinations: [],
    searchTerm: '',
    sortBy: 'price-low-high'
  });

  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const destinations = ['Dubai', 'Singapore', 'Maldives', 'Thailand', 'Europe', 'Australia'];

  const handlePriceChange = (value: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange: value }));
    onFiltersChange({ ...filters, priceRange: value });
  };

  const handleRatingChange = (rating: number) => {
    setFilters(prev => ({ ...prev, rating }));
    onFiltersChange({ ...filters, rating });
  };

  const handleDurationChange = (duration: string) => {
    setFilters(prev => ({ ...prev, duration }));
    onFiltersChange({ ...filters, duration });
  };

  const handleDestinationToggle = (destination: string) => {
    setFilters(prev => ({
      ...prev,
      destinations: prev.destinations.includes(destination)
        ? prev.destinations.filter(d => d !== destination)
        : [...prev.destinations, destination]
    }));
    onFiltersChange({
      ...filters,
      destinations: filters.destinations.includes(destination)
        ? filters.destinations.filter(d => d !== destination)
        : [...filters.destinations, destination]
    });
  };

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy: sortBy as any }));
    onFiltersChange({ ...filters, sortBy: sortBy as any });
  };

  const handleSearchChange = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
    onFiltersChange({ ...filters, searchTerm });
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [100, 5000],
      rating: 0,
      duration: '',
      destinations: [],
      searchTerm: '',
      sortBy: 'price-low-high'
    });
    onFiltersChange({
      priceRange: [100, 5000],
      rating: 0,
      duration: '',
      destinations: [],
      searchTerm: '',
      sortBy: 'price-low-high'
    });
  };

  const formatPriceRange = (min: number, max: number) => {
    return `$${min} – $${max}`;
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by package name or destination..."
          value={filters.searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Price Filter */}
        <div className="relative">
          <button
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-white hover:border-accent transition-colors"
          >
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-accent" />
              <span className="font-medium">Price Filter (USD)</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
          </button>

          {isPriceOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-4">
              <div className="space-y-2">
                <button
                  onClick={() => handlePriceChange([100, 500])}
                  className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                    filters.priceRange[0] === 100 && filters.priceRange[1] === 5000 ? 'bg-accent text-white' : ''
                  }`}
                >
                  $100 – $500
                </button>
                <button
                  onClick={() => handlePriceChange([500, 1000])}
                  className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                    filters.priceRange[0] === 500 && filters.priceRange[1] === 1000 ? 'bg-accent text-white' : ''
                  }`}
                >
                  $500 – $1000
                </button>
                <button
                  onClick={() => handlePriceChange([1000, 3000])}
                  className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                    filters.priceRange[0] === 1000 && filters.priceRange[1] === 3000 ? 'bg-accent text-white' : ''
                  }`}
                >
                  $1000 – $3000
                </button>
                <button
                  onClick={() => handlePriceChange([3000, 10000])}
                  className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                    filters.priceRange[0] === 3000 && filters.priceRange[1] === 10000 ? 'bg-accent text-white' : ''
                  }`}
                >
                  $3000 – $10000
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="relative">
          <button
            onClick={() => setIsRatingOpen(!isRatingOpen)}
            className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-white hover:border-accent transition-colors"
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              <span className="font-medium">Rating Filter</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isRatingOpen ? 'rotate-180' : ''}`} />
          </button>

          {isRatingOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-4">
              <div className="space-y-2">
                <button
                  onClick={() => handleRatingChange(5)}
                  className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                    filters.rating === 5 ? 'bg-accent text-white' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <StarRating rating={5} />
                    <span>5 Stars</span>
                  </div>
                </button>
                <button
                  onClick={() => handleRatingChange(4)}
                  className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                    filters.rating === 4 ? 'bg-accent text-white' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <StarRating rating={4} />
                    <span>4+ Stars</span>
                  </div>
                </button>
                <button
                  onClick={() => handleRatingChange(3)}
                  className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                    filters.rating === 3 ? 'bg-accent text-white' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <StarRating rating={3} />
                    <span>3+ Stars</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Duration Filter */}
        <div className="relative">
          <button
            onClick={() => setIsDurationOpen(!isDurationOpen)}
            className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-white hover:border-accent transition-colors"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="font-medium">Duration Filter (Days)</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isDurationOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDurationOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-4">
              <div className="space-y-2">
                <button
                  onClick={() => handleDurationChange('1-3')}
                  className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                    filters.duration === '1-3' ? 'bg-accent text-white' : ''
                  }`}
                >
                  1–3 Days
                </button>
                <button
                  onClick={() => handleDurationChange('4-6')}
                  className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                    filters.duration === '4-6' ? 'bg-accent text-white' : ''
                  }`}
                >
                  4–6 Days
                </button>
                <button
                  onClick={() => handleDurationChange('7-10')}
                  className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                    filters.duration === '7-10' ? 'bg-accent text-white' : ''
                  }`}
                >
                  7–10 Days
                </button>
                <button
                  onClick={() => handleDurationChange('10+')}
                  className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                    filters.duration === '10+' ? 'bg-accent text-white' : ''
                  }`}
                >
                  10+ Days
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Destination Filter */}
        <div className="relative md:col-span-2 lg:col-span-3">
          <button
            onClick={() => setIsDestinationOpen(!isDestinationOpen)}
            className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-white hover:border-accent transition-colors"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="font-medium">Destination Filter</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isDestinationOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDestinationOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-4">
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {destinations.map((destination) => (
                  <label key={destination} className="flex items-center gap-3 p-2 hover:bg-accent hover:text-white rounded cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={filters.destinations.includes(destination)}
                      onChange={() => handleDestinationToggle(destination)}
                      className="w-4 h-4 text-accent rounded focus:ring-2 focus:ring-accent/20"
                    />
                    <span className={`text-sm ${filters.destinations.includes(destination) ? 'text-white' : 'text-gray-700'}`}>
                      {destination}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sorting Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:border-accent transition-colors"
          >
            <span className="text-sm font-medium">Sort by Price</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSortOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-2">
              <button
                onClick={() => handleSortChange('price-low-high')}
                className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                  filters.sortBy === 'price-low-high' ? 'bg-accent text-white' : ''
                }`}
              >
                Low to High
              </button>
              <button
                onClick={() => handleSortChange('price-high-low')}
                className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                  filters.sortBy === 'price-high-low' ? 'bg-accent text-white' : ''
                }`}
              >
                High to Low
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:border-accent transition-colors"
          >
            <span className="text-sm font-medium">Rating</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSortOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-2">
              <button
                onClick={() => handleSortChange('rating')}
                className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                  filters.sortBy === 'rating' ? 'bg-accent text-white' : ''
                }`}
              >
                Rating
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:border-accent transition-colors"
          >
            <span className="text-sm font-medium">Duration</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSortOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-2">
              <button
                onClick={() => handleSortChange('duration')}
                className={`w-full text-left p-2 rounded hover:bg-accent hover:text-white transition-colors ${
                  filters.sortBy === 'duration' ? 'bg-accent text-white' : ''
                }`}
              >
                Duration
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="mt-6">
        <button
          onClick={clearAllFilters}
          className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
