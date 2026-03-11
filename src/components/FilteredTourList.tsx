import React from 'react';
import TourCard from './tours/TourCard';
import { motion } from 'framer-motion';

interface FilteredTourListProps {
  tours: any[];
  loading?: boolean;
}

export default function FilteredTourList({ tours, loading }: FilteredTourListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          No tours found matching your filters.
        </div>
        <div className="text-gray-400 text-sm mt-2">
          Try adjusting your filters to see more results.
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tours.map((tour, index) => (
        <motion.div
          key={tour.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <TourCard tour={tour} />
        </motion.div>
      ))}
    </div>
  );
}
