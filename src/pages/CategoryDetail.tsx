import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories, tours } from '../data/mockData';
import TourCard from '../components/tours/TourCard';
import FilterSidebar, { FilterValues } from '../components/FilterSidebar';
import FilteredTourList from '../components/FilteredTourList';

export default function CategoryDetail() {
  const { category } = useParams();
  const categoryData = categories.find(c => c.slug === category) || categories[0];
  const relatedTours = tours.filter(t => {
    const cat = t.category;
    if (Array.isArray(cat)) return cat.some(c => c.trim().toLowerCase() === categoryData.name.toLowerCase());
    if (typeof cat === 'string') return cat.split(',').map(c => c.trim().toLowerCase()).includes(categoryData.name.toLowerCase());
    return false;
  });

  const baseTours = relatedTours.length > 0 ? relatedTours : tours;

  const [filters, setFilters] = useState<FilterValues>({
    searchTerm: '',
    minPrice: '',
    maxPrice: '',
    minRating: 0,
    sortBy: 'recommended',
  });

  const getPrice = (tour: any) =>
    typeof tour?.price === 'number' ? tour.price : Number(tour?.price?.startingFrom ?? 0);

  const getRating = (tour: any) => Number(tour?.rating ?? 0);

  const getLocationText = (tour: any) => {
    const loc = tour?.location;
    if (typeof loc === 'string') return loc;
    if (loc && typeof loc === 'object') return [loc.country, ...(loc.cities || [])].filter(Boolean).join(', ');
    return '';
  };

  const filteredAndSortedTours = useMemo(() => {
    const q = filters.searchTerm.trim().toLowerCase();
    const min = filters.minPrice === '' ? null : Number(filters.minPrice);
    const max = filters.maxPrice === '' ? null : Number(filters.maxPrice);

    const filtered = baseTours.filter((t: any) => {
      const price = getPrice(t);
      const rating = getRating(t);
      const locText = getLocationText(t).toLowerCase();

      const matchesDestination = q === '' || t.title.toLowerCase().includes(q) || locText.includes(q);
      const matchesMinPrice = min === null || (!Number.isNaN(min) && price >= min);
      const matchesMaxPrice = max === null || (!Number.isNaN(max) && price <= max);
      const matchesRating = filters.minRating === 0 || rating >= filters.minRating;

      return matchesDestination && matchesMinPrice && matchesMaxPrice && matchesRating;
    });

    const withIndex = filtered.map((t: any, i: number) => ({ t, i }));
    const compare = (a: any, b: any) => {
      if (filters.sortBy === 'recommended') return a.i - b.i;
      if (filters.sortBy === 'priceLow') return getPrice(a.t) - getPrice(b.t) || a.i - b.i;
      if (filters.sortBy === 'priceHigh') return getPrice(b.t) - getPrice(a.t) || a.i - b.i;
      if (filters.sortBy === 'ratingHigh') return getRating(b.t) - getRating(a.t) || a.i - b.i;
      if (filters.sortBy === 'ratingLow') return getRating(a.t) - getRating(b.t) || a.i - b.i;
      return a.i - b.i;
    };

    return withIndex.sort(compare).map(x => x.t);
  }, [baseTours, filters]);

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      minPrice: '',
      maxPrice: '',
      minRating: 0,
      sortBy: 'recommended',
    });
  };

  return (
    <div className="pt-20 sm:pt-28 bg-secondary min-h-screen pb-24 sm:pb-0">
      <div className="bg-primary py-12 sm:py-20 text-center -mt-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Travel Categories
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl uppercase">
            {categoryData.name}
          </h1>
          <p className="mt-4 text-white/80 leading-relaxed">
            Discover curated packages designed around this travel style.
          </p>
        </div>
      </div>

      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <aside className="lg:col-span-4 xl:col-span-3">
              <FilterSidebar
                values={filters}
                onChange={setFilters}
                resultCount={filteredAndSortedTours.length}
                onClear={clearFilters}
              />
            </aside>
            <div className="lg:col-span-8 xl:col-span-9">
              <FilteredTourList
                tours={filteredAndSortedTours}
                onClearFilters={clearFilters}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
