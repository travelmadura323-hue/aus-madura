import { useState } from 'react';

interface Filters {
  priceRange: [number, number];
  rating: number;
  duration: string;
  destinations: string[];
  searchTerm: string;
  sortBy: 'price-low-high' | 'price-high-low' | 'rating' | 'duration';
}

export function useTourFilters(initialFilters?: Partial<Filters>) {
  const [filters, setFilters] = useState<Filters>({
    priceRange: [100, 5000],
    rating: 0,
    duration: '',
    destinations: [],
    searchTerm: '',
    sortBy: 'price-low-high',
    ...initialFilters
  });

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
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
  };

  return {
    filters,
    setFilters,
    updateFilters,
    clearAllFilters
  };
}
