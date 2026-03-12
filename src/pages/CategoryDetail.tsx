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
    <div className="pt-20 bg-secondary min-h-screen">
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`https://picsum.photos/seed/${categoryData.id}/1920/1080`}
            alt={categoryData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4">
              Curated Travel Style
            </span>
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-white mb-4 leading-tight uppercase">
              {categoryData.name}
            </h1>
            <p className="text-base md:text-lg text-slate-200 max-w-xl">
              Specialized travel experiences tailored around this theme, with handpicked itineraries and
              professionally curated journeys.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-accent font-bold uppercase tracking-widest text-[10px] mb-2 block">
                Tailored Collections
              </span>
              <h2 className="text-[24px] font-bold text-primary">
                {categoryData.name} Packages
              </h2>
              <p className="text-slate-500 mt-3 max-w-xl text-sm md:text-base">
                Choose from our curated selection of {categoryData.name.toLowerCase()} journeys crafted to match
                different travel styles, budgets, and expectations.
              </p>
            </div>
            <Link
              to="/"
              className="text-primary font-bold flex items-center gap-2 hover:text-accent transition-colors group text-sm"
            >
              Back to Home
              <span className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-accent">
                <span className="block w-2 h-2 border-t-2 border-r-2 border-current rotate-180 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>

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
