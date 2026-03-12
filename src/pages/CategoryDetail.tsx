import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories, tours } from '../data/mockData';
import TourCard from '../components/tours/TourCard';

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

  const [sortBy, setSortBy] = useState<'recommended' | 'priceLow' | 'priceHigh' | 'ratingHigh' | 'ratingLow'>('recommended');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);

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
    const q = destinationQuery.trim().toLowerCase();
    const min = minPrice === '' ? null : Number(minPrice);
    const max = maxPrice === '' ? null : Number(maxPrice);

    const filtered = baseTours.filter((t: any) => {
      const price = getPrice(t);
      const rating = getRating(t);
      const locText = getLocationText(t).toLowerCase();

      const matchesDestination = q === '' || t.title.toLowerCase().includes(q) || locText.includes(q);
      const matchesMinPrice = min === null || (!Number.isNaN(min) && price >= min);
      const matchesMaxPrice = max === null || (!Number.isNaN(max) && price <= max);
      const matchesRating = minRating === 0 || rating >= minRating;

      return matchesDestination && matchesMinPrice && matchesMaxPrice && matchesRating;
    });

    const withIndex = filtered.map((t: any, i: number) => ({ t, i }));
    const compare = (a: any, b: any) => {
      if (sortBy === 'recommended') return a.i - b.i;
      if (sortBy === 'priceLow') return getPrice(a.t) - getPrice(b.t) || a.i - b.i;
      if (sortBy === 'priceHigh') return getPrice(b.t) - getPrice(a.t) || a.i - b.i;
      if (sortBy === 'ratingHigh') return getRating(b.t) - getRating(a.t) || a.i - b.i;
      if (sortBy === 'ratingLow') return getRating(a.t) - getRating(b.t) || a.i - b.i;
      return a.i - b.i;
    };

    return withIndex.sort(compare).map(x => x.t);
  }, [baseTours, destinationQuery, minPrice, maxPrice, minRating, sortBy]);

  return (
    <div className="pt-20 sm:pt-28 bg-secondary min-h-screen">
      {/* Header (match Our Story / Media / Privacy style) */}
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

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters + Sorting */}
          <div className="mb-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                  Destination
                </span>
                <input
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                  placeholder="Type country / city (e.g., India, Sydney)"
                  className="w-full bg-transparent text-sm font-semibold text-primary placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                  Price
                </span>
                <input
                  inputMode="numeric"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min"
                  className="w-full bg-transparent text-sm font-semibold text-primary placeholder:text-slate-400 focus:outline-none"
                />
                <span className="text-slate-300">—</span>
                <input
                  inputMode="numeric"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  className="w-full bg-transparent text-sm font-semibold text-primary placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                  Rating
                </span>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full bg-transparent text-primary font-bold text-sm focus:outline-none cursor-pointer"
                >
                  <option value={0}>Any</option>
                  <option value={3}>3+ Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                  Sort
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-transparent text-primary font-bold text-sm focus:outline-none cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="ratingHigh">Rating: High to Low</option>
                  <option value="ratingLow">Rating: Low to High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-slate-500">
              Showing <span className="font-bold text-primary">{filteredAndSortedTours.length}</span> packages
            </div>
            <button
              onClick={() => {
                setDestinationQuery('');
                setMinPrice('');
                setMaxPrice('');
                setMinRating(0);
                setSortBy('recommended');
              }}
              className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredAndSortedTours.map((tour: any) => (
              <TourCard key={tour.id || tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
