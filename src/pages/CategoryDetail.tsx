import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { categories } from "../data/mockData";
import { useTours } from "../hooks/useTours";
import FilteredTourList from "../components/FilteredTourList";

interface FilterValues {
  searchTerm: string;
  minPrice: string;
  maxPrice: string;
  minRating: number;
  sortBy: string;
}

export default function CategoryDetail() {
  const { category } = useParams();

  // ✅ Use Firestore tours instead of mockData
  const { tours, loading } = useTours();

  // ✅ FIX: Normalize slug comparison - handle both "family" and "family-tourism" format
  const categoryData = useMemo(() => {
    let found = categories.find(c => c.slug === category);
    
    // If not found by full slug, try matching by ID
    if (!found && category) {
      found = categories.find(c => c.id === category);
    }
    
    // If still not found, try prefix match
    if (!found && category) {
      found = categories.find(c => c.slug.startsWith(category) || category.startsWith(c.id));
    }
    
    return found || categories[0];
  }, [category]);

  // ✅ Match tours by categories - FIX: Use id/slug for accurate matching
  const relatedTours = useMemo(() => {
    // Extract the category ID (e.g., "family" from "family-tourism")
    const categoryId = categoryData.id.toLowerCase().trim();
    
    return tours.filter((t: any) => {
      // ✅ Check new categories array field (Firestore tours)
      if (Array.isArray(t.categories) && t.categories.length > 0) {
        return t.categories.some((c: string) => {
          const cLower = c.trim().toLowerCase();
          // EXACT match only: "family" === "family"
          return cLower === categoryId;
        });
      }
      // ✅ Fallback: check old category string field (mockData tours)
      if (typeof t.category === "string") {
        return t.category
          .split(",")
          .map((c: string) => c.trim().toLowerCase())
          .some((c: string) => {
            // EXACT match only
            return c === categoryId || c === categoryData.name.toLowerCase();
          });
      }
      // ✅ Fallback: check old category array field (mockData tours)
      if (Array.isArray(t.category)) {
        return t.category.some((c: string) => {
          const cLower = c.trim().toLowerCase();
          // EXACT match only
          return cLower === categoryId || cLower === categoryData.name.toLowerCase();
        });
      }
      return false;
    });
  }, [tours, categoryData.id, categoryData.name]);

  // ✅ NO FALLBACK: Only show tours that match this category
  const baseTours = relatedTours;

  const [filters, setFilters] = useState<FilterValues>({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    minRating: 0,
    sortBy: "recommended",
  });

  const getPrice = (tour: any) =>
    typeof tour?.price === "number" ? tour.price : Number(tour?.price?.startingFrom ?? 0);
  const getRating = (tour: any) => Number(tour?.rating ?? 0);
  const getLocationText = (tour: any) => {
    const loc = tour?.location;
    if (typeof loc === "string") return loc;
    if (loc && typeof loc === "object") return [loc.country, ...(loc.cities || [])].filter(Boolean).join(", ");
    return "";
  };

  const filteredAndSortedTours = useMemo(() => {
    const q = filters.searchTerm.trim().toLowerCase();
    const min = filters.minPrice === "" ? null : Number(filters.minPrice);
    const max = filters.maxPrice === "" ? null : Number(filters.maxPrice);

    const filtered = baseTours.filter((t: any) => {
      const price = getPrice(t);
      const rating = getRating(t);
      const locText = getLocationText(t).toLowerCase();
      const matchesSearch = q === "" || (t.title || "").toLowerCase().includes(q) || locText.includes(q);
      const matchesMin = min === null || price >= min;
      const matchesMax = max === null || price <= max;
      const matchesRating = filters.minRating === 0 || rating >= filters.minRating;
      return matchesSearch && matchesMin && matchesMax && matchesRating;
    })
    // ✅ Ensure image fallback
    .map((t: any) => ({
      ...t,
      image: t.image || (t.gallery && t.gallery[0]) || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&h=600&q=80",
      slug: t.slug || t.id,
    }));

    return filtered.sort((a: any, b: any) => {
      if (filters.sortBy === "priceLow") return getPrice(a) - getPrice(b);
      if (filters.sortBy === "priceHigh") return getPrice(b) - getPrice(a);
      if (filters.sortBy === "ratingHigh") return getRating(b) - getRating(a);
      if (filters.sortBy === "ratingLow") return getRating(a) - getRating(b);
      return 0;
    });
  }, [baseTours, filters]);

  const clearFilters = () => setFilters({ searchTerm: "", minPrice: "", maxPrice: "", minRating: 0, sortBy: "recommended" });

  const hasActiveFilters = filters.searchTerm !== "" || filters.minPrice !== "" || filters.maxPrice !== "" || filters.minRating !== 0 || filters.sortBy !== "recommended";

  return (
    <div className="pt-20 sm:pt-28 bg-secondary min-h-screen pb-24 sm:pb-0">
      <div className="bg-primary py-12 sm:py-20 text-center -mt-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Travel Categories</span>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl uppercase">{categoryData.name}</h1>
          <p className="mt-4 text-white/80 leading-relaxed">Discover curated packages designed around this travel style.</p>
        </div>
      </div>

      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500">
              {loading
                ? "Loading..."
                : <>Showing <span className="font-semibold text-primary">{filteredAndSortedTours.length}</span> package{filteredAndSortedTours.length !== 1 ? "s" : ""}
                </>
              }
            </p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition">Reset Filters</button>
            )}
          </div>

          {/* Filters */}
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white shadow-card p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-5">
              <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" /></svg>
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Filters & sorting</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              {/* Search */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Search</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                  <input type="text" placeholder="Search tours" value={filters.searchTerm} onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })} className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50" />
                </div>
              </div>
              {/* Price */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Price Range (AUD)</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">Min</span>
                    <input type="number" value={filters.minPrice} placeholder="0" onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50" />
                  </div>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">Max</span>
                    <input type="number" value={filters.maxPrice} placeholder="50000" onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50" />
                  </div>
                </div>
              </div>
              {/* Rating */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Minimum Rating</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  <select value={filters.minRating} onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })} className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50 appearance-none">
                    <option value={0}>Any</option>
                    <option value={3}>3+ Stars</option>
                    <option value={4}>4+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                  </select>
                </div>
              </div>
              {/* Sort */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Sort</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M7 12h10M11 18h2" /></svg>
                  <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })} className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50 appearance-none">
                    <option value="recommended">Recommended</option>
                    <option value="priceLow">Price: Low → High</option>
                    <option value="priceHigh">Price: High → Low</option>
                    <option value="ratingHigh">Rating: High → Low</option>
                    <option value="ratingLow">Rating: Low → High</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <FilteredTourList tours={filteredAndSortedTours} loading={loading} onClearFilters={clearFilters} />
        </div>
      </section>
    </div>
  );
}