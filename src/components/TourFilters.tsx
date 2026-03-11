import React, { useState } from "react";
import {
  DollarSign,
  Star,
  Calendar,
  MapPin,
  Search,
  ChevronDown,
} from "lucide-react";

interface TourFiltersProps {
  onFiltersChange: (filters: Filters) => void;
  showPrice?: boolean;
  showRating?: boolean;
  showDuration?: boolean;
  showDestination?: boolean;
}

interface Filters {
  priceRange: [number, number];
  rating: number;
  duration: string;
  destinations: string[];
  searchTerm: string;
  sortBy: "price-low-high" | "price-high-low" | "rating" | "duration";
}

export default function TourFilters({
  onFiltersChange,
  showPrice = true,
  showRating = true,
  showDuration = true,
  showDestination = true,
}: TourFiltersProps) {
  const [filters, setFilters] = useState<Filters>({
    priceRange: [100, 5000],
    rating: 0,
    duration: "",
    destinations: [],
    searchTerm: "",
    sortBy: "price-low-high",
  });

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const destinations = [
    "Dubai",
    "Singapore",
    "Maldives",
    "Thailand",
    "Europe",
    "Australia",
  ];

  const updateFilters = (newFilters: Partial<Filters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const toggleDestination = (destination: string) => {
    const updatedDestinations = filters.destinations.includes(destination)
      ? filters.destinations.filter((d) => d !== destination)
      : [...filters.destinations, destination];

    updateFilters({ destinations: updatedDestinations });
  };

  const clearAllFilters = () => {
    const reset: Filters = {
      priceRange: [100, 5000],
      rating: 0,
      duration: "",
      destinations: [],
      searchTerm: "",
      sortBy: "price-low-high",
    };

    setFilters(reset);
    onFiltersChange(reset);
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-4 h-4 ${s <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
            }`}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search packages or destinations..."
          value={filters.searchTerm}
          onChange={(e) => updateFilters({ searchTerm: e.target.value })}
          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-accent"
        />
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Price Filter */}
        {showPrice && (
          <div className="relative">
            <button
              onClick={() =>
                setOpenMenu(openMenu === "price" ? null : "price")
              }
              className="filter-btn"
            >
              <DollarSign className="icon" />
              Price (AUD)
              <ChevronDown className="chev" />
            </button>

            {openMenu === "price" && (
              <div className="dropdown">
                <button
                  onClick={() => updateFilters({ priceRange: [100, 500] })}
                >
                  $100 – $500
                </button>

                <button
                  onClick={() => updateFilters({ priceRange: [500, 1000] })}
                >
                  $500 – $1000
                </button>

                <button
                  onClick={() => updateFilters({ priceRange: [1000, 3000] })}
                >
                  $1000 – $3000
                </button>

                <button
                  onClick={() => updateFilters({ priceRange: [3000, 10000] })}
                >
                  $3000 – $10000
                </button>
              </div>
            )}
          </div>
        )}

        {/* Rating Filter */}
        {showRating && (
          <div className="relative">
            <button
              onClick={() =>
                setOpenMenu(openMenu === "rating" ? null : "rating")
              }
              className="filter-btn"
            >
              <Star className="icon" />
              Rating
              <ChevronDown className="chev" />
            </button>

            {openMenu === "rating" && (
              <div className="dropdown">
                {[5, 4, 3].map((r) => (
                  <button
                    key={r}
                    onClick={() => updateFilters({ rating: r })}
                    className="flex items-center gap-2"
                  >
                    <StarRating rating={r} />
                    {r}+ Stars
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Duration */}
        {showDuration && (
          <div className="relative">
            <button
              onClick={() =>
                setOpenMenu(openMenu === "duration" ? null : "duration")
              }
              className="filter-btn"
            >
              <Calendar className="icon" />
              Duration
              <ChevronDown className="chev" />
            </button>

            {openMenu === "duration" && (
              <div className="dropdown">
                {["1-3", "4-6", "7-10", "10+"].map((d) => (
                  <button
                    key={d}
                    onClick={() => updateFilters({ duration: d })}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Destination */}
        {showDestination && (
          <div className="relative md:col-span-3">
            <button
              onClick={() =>
                setOpenMenu(
                  openMenu === "destination" ? null : "destination"
                )
              }
              className="filter-btn"
            >
              <MapPin className="icon" />
              Destinations
              <ChevronDown className="chev" />
            </button>

            {openMenu === "destination" && (
              <div className="dropdown max-h-60 overflow-y-auto">
                {destinations.map((d) => (
                  <label
                    key={d}
                    className="flex items-center gap-2 p-2"
                  >
                    <input
                      type="checkbox"
                      checked={filters.destinations.includes(d)}
                      onChange={() => toggleDestination(d)}
                    />
                    {d}
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sorting */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => updateFilters({ sortBy: "price-low-high" })}
          className="sort-btn"
        >
          Price Low → High
        </button>

        <button
          onClick={() => updateFilters({ sortBy: "price-high-low" })}
          className="sort-btn"
        >
          Price High → Low
        </button>

        <button
          onClick={() => updateFilters({ sortBy: "rating" })}
          className="sort-btn"
        >
          Best Rating
        </button>

        <button
          onClick={() => updateFilters({ sortBy: "duration" })}
          className="sort-btn"
        >
          Duration
        </button>
      </div>

      {/* Clear */}
      <button
        onClick={clearAllFilters}
        className="w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg"
      >
        Clear All Filters
      </button>
    </div>
  );
}