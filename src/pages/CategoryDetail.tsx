import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories, tours } from '../data/mockData';
import TourCard from '../components/tours/TourCard';
import TourFilters from '../components/TourFilters';
import FilteredTourList from '../components/FilteredTourList';
import { useTourFilters } from '../hooks/useTourFilters';

export default function CategoryDetail() {
  const { category } = useParams();
  const { filters, updateFilters } = useTourFilters();
  const categoryData = categories.find(c => c.slug === category) || categories[0];
  const relatedTours = tours.filter(t => {
    const cat = t.category;
    if (Array.isArray(cat)) return cat.some(c => c.trim().toLowerCase() === categoryData.name.toLowerCase());
    if (typeof cat === 'string') return cat.split(',').map(c => c.trim().toLowerCase()).includes(categoryData.name.toLowerCase());
    return false;
  });

  // Filter tours based on current filters
  const filteredTours = relatedTours.filter(tour => {
    const price = typeof tour.price === 'number' ? tour.price : tour.price.startingFrom;
    const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
    const matchesRating = filters.rating === 0 || true; // Assuming all tours have good ratings
    const matchesSearch = filters.searchTerm === '' || 
      tour.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      (typeof tour.location === 'string' ? tour.location : tour.location.country).toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesDestination = filters.destinations.length === 0 || 
      filters.destinations.some(dest => 
        (typeof tour.location === 'string' ? tour.location : tour.location.country).toLowerCase().includes(dest.toLowerCase())
      );

    return matchesPrice && matchesRating && matchesSearch && matchesDestination;
  });

  return (
    <div className="pt-20">
      <div className="bg-primary py-12 sm:py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Travel Categories
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            {categoryData.name}
          </h1>
          <p className="mt-4 text-white/80 leading-relaxed">
            Specialized travel experiences tailored to your needs.
          </p>
        </div>
      </div>

      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-16">
            <div className="lg:col-span-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8 sm:mb-10">Available Packages</h2>
              
              {/* Tour Filters */}
              <div className="mb-8">
                <TourFilters onFiltersChange={updateFilters} />
              </div>
              
              {/* Filtered Tour List */}
              <FilteredTourList tours={filteredTours} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
