import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Info, Search, SlidersHorizontal, Star, ArrowUpDown } from "lucide-react";
import FilteredTourList from "../components/FilteredTourList";
import { useDestinationBySlug } from "../hooks/useDestinationBySlug";
import { useTours } from "../hooks/useTours";
import { useTourFilters } from "../hooks/useTourFilters";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&h=900&q=80";

export default function DestinationDetailPage() {
  const { id, city } = useParams();
  const { destination, loading, error } = useDestinationBySlug(id);
  const { tours, loading: toursLoading } = useTours();
  const { filters, updateFilters, clearAllFilters } = useTourFilters({
    sortBy: "price-low-high",
    priceRange: [0, 50000],
    rating: 0,
  });

  const destinationName = (destination?.name || "").toLowerCase().trim();
  const destinationCountry = (destination?.country || destination?.region || "").toLowerCase().trim();
  // ✅ Also check slug for matching (e.g. "india", "australia")
  const destinationSlug = (destination?.slug || id || "").toLowerCase().trim();
  // ✅ NEW: Get countries included for this destination (for header destinations like "Mainland Europe")
  const countriesIncludedLower = (destination?.countriesIncluded || [])
    .filter((c: string) => c && c.trim())
    .map((c: string) => c.toLowerCase().trim());
  const destinationHeader = (destination?.header || "").toLowerCase().trim();
  
  // ✅ Only use countriesIncluded if it's actually populated
  const hasCountriesIncluded = countriesIncludedLower.length > 0;

  // ✅ Format city name for display (decode URI and capitalize)
  const displayCityName = city ? decodeURIComponent(city).replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase()) : null;
  const cityLower = city ? city.toLowerCase().replace(/-/g, " ") : null;

  // ✅ FIXED: More robust tour matching with destination header support
  const relatedTours = tours.filter((t: any) => {
    // If city is specified, filter ONLY by matching city
    if (cityLower) {
      // For city view, strictly check if the city is in the tour's cities array
      const tourCities = Array.isArray(t.location?.cities) 
        ? t.location.cities.map((c: string) => c.toLowerCase().trim())
        : [];
      
      // Check if any city in the tour matches the selected city OR if city is in tour title
      const matchesCity = tourCities.some((tourCity: string) => 
        tourCity === cityLower || 
        tourCity.replace(/\s+/g, '') === cityLower.replace(/\s+/g, '')
      ) || (t.title && t.title.toLowerCase().includes(cityLower));

      // Also verify destination matches
      const locRaw = typeof t.location === "string"
        ? t.location
        : (t.location?.country || "");
      const destinationMatches = 
        (destinationName && locRaw.toLowerCase().includes(destinationName)) ||
        (destinationCountry && locRaw.toLowerCase().includes(destinationCountry)) ||
        (destinationSlug && locRaw.toLowerCase().includes(destinationSlug)) ||
        (countriesIncludedLower.length > 0 && countriesIncludedLower.some((c: string) => locRaw.toLowerCase().includes(c)));
      
      // DEBUG
      console.log("=== CITY FILTER DEBUG ===");
      console.log("Tour:", t.title);
      console.log("tourCities:", tourCities);
      console.log("cityLower:", cityLower);
      console.log("matchesCity:", matchesCity);
      console.log("locRaw:", locRaw);
      console.log("destinationName:", destinationName);
      console.log("destinationCountry:", destinationCountry);
      console.log("destinationSlug:", destinationSlug);
      console.log("countriesIncludedLower:", countriesIncludedLower);
      console.log("destinationMatches:", destinationMatches);
      console.log("FINAL:", matchesCity && destinationMatches);
      console.log("---");
      
      return matchesCity && destinationMatches;
    }

    // ✅ Original logic for destination-only view with header support
    const tourCountry = typeof t.location === "string"
      ? t.location
      : (t.location?.country || t.location?.cities?.join(" ") || "");
    const lc = String(tourCountry).toLowerCase().trim();

    // ✅ NEW: Check if tour country is in countriesIncluded array for header-based filtering
    // Use EXACT word matching to avoid false positives (e.g., "Asia" shouldn't match "East Asia")
    if (countriesIncludedLower.length > 0) {
      return countriesIncludedLower.some((c: string) => {
        // EXACT match: exact string match or word boundary match
        return lc === c || 
               lc.endsWith(" " + c) || 
               lc.startsWith(c + " ") || 
               lc.includes(" " + c + " ");
      });
    }

    // ✅ For single destination (like Malaysia, Singapore), use EXACT matching, not substring
    // This prevents "East Asia" from showing on Malaysia page
    if (destinationSlug && destinationSlug !== "") {
      // Exact match: tour country must exactly match destination slug
      const slugMatches = lc === destinationSlug || 
                         lc.endsWith(" " + destinationSlug) || 
                         lc.startsWith(destinationSlug + " ") || 
                         lc.includes(" " + destinationSlug + " ");
      if (slugMatches) return true;
    }

    if (destinationName && destinationName !== "") {
      // Exact match: tour country must exactly match destination name
      const nameMatches = lc === destinationName || 
                         lc.endsWith(" " + destinationName) || 
                         lc.startsWith(destinationName + " ") || 
                         lc.includes(" " + destinationName + " ");
      if (nameMatches) return true;
    }

    if (destinationCountry && destinationCountry !== "") {
      // Exact match: tour country must exactly match destination country
      const countryMatches = lc === destinationCountry || 
                            lc.endsWith(" " + destinationCountry) || 
                            lc.startsWith(destinationCountry + " ") || 
                            lc.includes(" " + destinationCountry + " ");
      if (countryMatches) return true;
    }

    return false;
  });

  // ✅ Only show tours that actually match this destination (no fallback to all tours)
  const toursToFilter = relatedTours;

  const filteredTours = toursToFilter
    .filter((tour: any) => {
      const price =
        typeof tour.price === "number" ? tour.price : tour.price?.startingFrom ?? 0;
      const rating = Number(tour.rating ?? 0);

      const matchesPrice =
        price >= filters.priceRange[0] && price <= filters.priceRange[1];
      const matchesRating = filters.rating === 0 || rating >= filters.rating;
      const matchesSearch =
        !filters.searchTerm ||
        (tour.title || "").toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesPrice && matchesRating && matchesSearch;
    })
    .sort((a: any, b: any) => {
      const aPrice =
        typeof a.price === "number" ? a.price : a.price?.startingFrom ?? 0;
      const bPrice =
        typeof b.price === "number" ? b.price : b.price?.startingFrom ?? 0;
      const aRating = Number(a.rating ?? 0);
      const bRating = Number(b.rating ?? 0);

      if (filters.sortBy === "price-low-high") return aPrice - bPrice;
      if (filters.sortBy === "price-high-low") return bPrice - aPrice;
      if (filters.sortBy === "rating") return bRating - aRating;
      return 0;
    })
    // ✅ Ensure image fallback so cards always show
    .map((t: any) => ({
      ...t,
      image: t.image || (t.gallery && t.gallery[0]) || PLACEHOLDER_IMAGE,
      slug: t.slug || t.id,
    }));

  if (loading) {
    return (
      <div className="pt-28 min-h-screen flex items-center justify-center text-slate-500">
        Loading destination...
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="pt-28 min-h-screen flex flex-col items-center justify-center text-slate-600 gap-4">
        <div>Destination not found.</div>
        <Link to="/destinations" className="text-accent font-bold">
          Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-18 bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="relative h-[55vh] sm:h-[65vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          src={(destination.images && destination.images[0]) || (destination as any)?.image || PLACEHOLDER_IMAGE}
          alt={displayCityName || destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pb-10 sm:pb-16">
            <div className="text-white/80 text-xs mb-3">
              <Link to="/" className="hover:text-white">Home</Link> /{" "}
              <Link to="/destinations" className="hover:text-white">Destinations</Link> /{" "}
              <Link to={`/destinations/${id}`} className="hover:text-white">{destination.name}</Link>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase">
              {displayCityName || destination.name}
            </h1>
            <p className="mt-4 text-white/85 max-w-2xl">
              {city ? `Explore all tour packages in ${displayCityName}, ${destination.name}` : (destination.description || "Discover curated packages for this destination.")}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-8 p-4 rounded-2xl border border-red-200 bg-red-50 text-red-700">
              {error}
            </div>
          )}



          {/* Tours */}
          <div className="mb-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-[24px] font-bold text-primary">Top Tour Packages</h2>
                <p className="text-slate-500 mt-2">
                  Showing {filteredTours.length} package{filteredTours.length !== 1 ? "s" : ""}
                  {relatedTours.length === 0 && tours.length > 0 && (
                    <span className="ml-2 text-xs text-amber-600">(showing all tours)</span>
                  )}
                </p>
              </div>
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent self-start md:self-auto"
              >
                Reset filters
              </button>
            </div>

            {/* Filters */}
            <div className="mb-10 rounded-3xl border border-slate-200 bg-white shadow-card p-4 sm:p-5">
              <div className="flex items-center gap-2 text-primary font-bold mb-4">
                <SlidersHorizontal className="w-5 h-5 text-accent" />
                Filters & sorting
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-4">
                {/* Search */}
                <div className="xl:col-span-4">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      value={filters.searchTerm}
                      onChange={(e) => updateFilters({ searchTerm: e.target.value })}
                      placeholder="Search tours (title)"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/60 text-sm font-semibold text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                    />
                  </div>
                </div>
                {/* Price */}
                <div className="xl:col-span-4">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Price range (AUD)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">Min</span>
                      <input inputMode="numeric" value={String(filters.priceRange[0])}
                        onChange={(e) => updateFilters({ priceRange: [Number(e.target.value || 0), filters.priceRange[1]] })}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/60 text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">Max</span>
                      <input inputMode="numeric" value={String(filters.priceRange[1])}
                        onChange={(e) => updateFilters({ priceRange: [filters.priceRange[0], Number(e.target.value || 0)] })}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/60 text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                      />
                    </div>
                  </div>
                </div>
                {/* Rating */}
                <div className="xl:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Min rating</label>
                  <div className="relative">
                    <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select value={filters.rating} onChange={(e) => updateFilters({ rating: Number(e.target.value) })}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/60 text-sm font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer">
                      <option value={0}>Any</option>
                      <option value={3}>3+ Stars</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                    </select>
                  </div>
                </div>
                {/* Sort */}
                <div className="xl:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Sort</label>
                  <div className="relative">
                    <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select value={filters.sortBy} onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/60 text-sm font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer">
                      <option value="price-low-high">Price: Low → High</option>
                      <option value="price-high-low">Price: High → Low</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <FilteredTourList tours={filteredTours} loading={toursLoading} onClearFilters={clearAllFilters} />
          </div>

          {/* Gallery */}
          <div>
            <h2 className="text-[24px] font-bold text-primary mb-8">Photo Gallery</h2>
            {destination.images && destination.images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {destination.images.slice(0, 12).map((img, i) => (
                  <div key={img + i} className="rounded-xl overflow-hidden h-32 sm:h-40 bg-slate-100">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500">No images yet.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}