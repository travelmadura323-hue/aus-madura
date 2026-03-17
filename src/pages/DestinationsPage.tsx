import { Link } from "react-router-dom";
import { Destination } from "../types";
import { useDestinations } from "../hooks/useDestinations";
import { useTours } from "../hooks/useTours";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&h=800&q=80";

export default function DestinationsPage() {
  const { destinations, loading, error } = useDestinations();
  const { tours } = useTours();

  const getImage = (d: Destination) =>
    (d.images && d.images[0]) || (d as unknown as { image?: string }).image || PLACEHOLDER_IMAGE;
  const getRegion = (d: Destination) => d.country || d.region || "Explore";
  const getStartingFrom = (d: Destination) => {
    const name = String(d.name || "").toLowerCase();
    const country = String(d.country || d.region || "").toLowerCase();
    const matched = tours.filter((t: any) => {
      const loc = typeof t.location === "string" ? t.location : (t.location?.country || "");
      const lc = String(loc).toLowerCase();
      return (name && lc.includes(name)) || (country && lc.includes(country));
    });
    const prices = matched
      .map((t: any) => (typeof t.price === "number" ? t.price : Number(t.price?.startingFrom ?? 0)))
      .filter((p: number) => Number.isFinite(p) && p > 0);
    const min = prices.length ? Math.min(...prices) : 0;
    const fallback = Number((d as any).price ?? 0);
    return min || fallback || 0;
  };

  return (
    <section className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
          Explore Destinations
        </h1>
        <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          Choose your next adventure from our curated collection of destinations.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="rounded-3xl overflow-hidden shadow-xl h-[350px] bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-16 text-slate-500">No destinations available yet.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((dest) => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.slug || dest.id}`}
                className="group"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-xl h-[350px]">
                  <img
                    src={getImage(dest)}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-6 left-6 z-10">
                    <div className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em] mb-2 drop-shadow-sm">
                      Starting from
                    </div>
                    <div className="bg-accent text-white font-black px-4 py-1.5 rounded-xl shadow-xl inline-block text-xl">
                      AUD${getStartingFrom(dest).toLocaleString()}
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold">{dest.name}</h3>
                    <p className="text-sm opacity-90">{getRegion(dest)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
