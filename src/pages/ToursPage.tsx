import { useMemo } from "react";
import TourCard from "../components/tours/TourCard";
import TourCardSkeleton from "../components/ui/TourCardSkeleton";
import { Tour } from "../types";
import { useTours } from "../hooks/useTours";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&h=600&q=80";

export default function ToursPage() {
  const { tours, loading, error } = useTours();

  const toursForCard = useMemo(
    () =>
      tours.map((t) => ({
        ...t,
        image: t.image || (t.gallery && t.gallery[0]) || PLACEHOLDER_IMAGE,
        slug: t.slug || t.id || "",
      })),
    [tours]
  );

  return (
    <section className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">Explore Tours</h1>
        <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          Discover curated tour packages for unforgettable journeys.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TourCardSkeleton key={i} />
            ))}
          </div>
        ) : toursForCard.length === 0 ? (
          <div className="text-center py-16 text-slate-500">No tours available yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {toursForCard.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
