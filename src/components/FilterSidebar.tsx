import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export interface FilterValues {
  searchTerm: string;
  minPrice: string;
  maxPrice: string;
  minRating: number;
  sortBy: string;
}

interface FilterSidebarProps {
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  resultCount: number;
  onClear: () => void;
}

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'priceLow', label: 'Price: Low to High' },
  { value: 'priceHigh', label: 'Price: High to Low' },
  { value: 'ratingHigh', label: 'Rating: High to Low' },
  { value: 'ratingLow', label: 'Rating: Low to High' },
];

const RATING_OPTIONS = [
  { value: 0, label: 'Any rating' },
  { value: 3, label: '3+ Stars' },
  { value: 4, label: '4+ Stars' },
  { value: 4.5, label: '4.5+ Stars' },
];

export default function FilterSidebar({
  values,
  onChange,
  resultCount,
  onClear,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const update = (partial: Partial<FilterValues>) => {
    onChange({ ...values, ...partial });
  };

  const hasActiveFilters =
    values.searchTerm ||
    values.minPrice ||
    values.maxPrice ||
    values.minRating > 0 ||
    values.sortBy !== 'recommended';

  return (
    <div className="relative">
      {/* Mobile: Filter toggle button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-white border border-slate-200 shadow-card mb-6 touch-manipulation"
      >
        <span className="flex items-center gap-2 font-bold text-primary">
          <SlidersHorizontal className="w-5 h-5 text-accent" />
          Filters & Sort
        </span>
        <span className="text-sm text-slate-500">
          {resultCount} packages
        </span>
      </motion.button>

      {/* Desktop: Sidebar */}
      <div className="hidden lg:block sticky top-24">
        <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-card">
          <FilterPanel values={values} onChange={update} resultCount={resultCount} onClear={onClear} hasActiveFilters={hasActiveFilters} />
        </div>
      </div>

      {/* Mobile: Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl overflow-y-auto lg:hidden"
            >
              <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
                <h3 className="font-bold text-primary">Filters & Sort</h3>
                <button onClick={() => setIsOpen(false)} className="p-2 -m-2 rounded-xl hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5">
                <FilterPanel
                  values={values}
                  onChange={update}
                  resultCount={resultCount}
                  onClear={onClear}
                  hasActiveFilters={hasActiveFilters}
                  onApply={() => setIsOpen(false)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterPanel({
  values,
  onChange,
  resultCount,
  onClear,
  hasActiveFilters,
  onApply,
}: FilterSidebarProps & { hasActiveFilters: boolean; onApply?: () => void }) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Destination / Keyword
        </label>
        <input
          type="text"
          value={values.searchTerm}
          onChange={(e) => onChange({ searchTerm: e.target.value })}
          placeholder="e.g. India, Sydney"
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
        />
      </div>

      {/* Price range */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Price Range (AUD)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            inputMode="numeric"
            value={values.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            placeholder="Min"
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <span className="self-center text-slate-300">–</span>
          <input
            type="number"
            inputMode="numeric"
            value={values.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            placeholder="Max"
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Minimum Rating
        </label>
        <select
          value={values.minRating}
          onChange={(e) => onChange({ minRating: Number(e.target.value) })}
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
        >
          {RATING_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Sort By
        </label>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ sortBy: opt.value })}
              className={cn(
                'w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                values.sortBy === opt.value
                  ? 'bg-primary text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results & Actions */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <p className="text-sm text-slate-500">
          <span className="font-bold text-primary">{resultCount}</span> packages
        </p>
        <div className="flex gap-2">
          {hasActiveFilters && (
            <button
              onClick={() => { onClear(); onApply?.(); }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          )}
          {onApply && (
            <button
              onClick={onApply}
              className="flex-1 px-4 py-3 rounded-2xl bg-accent text-white font-bold text-sm hover:bg-accent/90"
            >
              Apply
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
