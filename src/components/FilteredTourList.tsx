import React from 'react';
import TourCard from './tours/TourCard';
import TourCardSkeleton from './ui/TourCardSkeleton';
import EmptyState from './ui/EmptyState';
import { motion } from 'framer-motion';

interface FilteredTourListProps {
  tours: any[];
  loading?: boolean;
  onClearFilters?: () => void;
}

export default function FilteredTourList({ tours, loading, onClearFilters }: FilteredTourListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <TourCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <EmptyState
        title="No tours found"
        description="Try adjusting your filters to discover more packages that match your preferences."
        actionLabel="Clear all filters"
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {tours.map((tour, index) => (
        <motion.div
          key={tour.id || tour.slug || index}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
        >
          <TourCard tour={tour} />
        </motion.div>
      ))}
    </div>
  );
}
