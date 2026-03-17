import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { tours as mockTours } from "../data/mockData";
import { Tour } from "../types";

export function useTourBySlug(slug: string | undefined) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setTour(null);
      setLoading(false);
      return;
    }
    const fetchTour = async () => {
      setLoading(true);
      setError(null);
      try {
        const snapshot = await getDocs(
          query(collection(db, "tours"), where("slug", "==", slug))
        );
        if (!snapshot.empty) {
          const d = snapshot.docs[0];
          const raw = d.data();
          const gallery = raw.gallery ?? [];
          const data = {
            id: d.id,
            ...raw,
            image: raw.image || (gallery[0]),
            location: raw.location ?? { country: "", cities: [] },
            duration: raw.duration ?? { days: 0, nights: 0 },
            price: raw.price ?? { startingFrom: 0, currency: "AUD", perPerson: true },
            highlights: raw.highlights ?? [],
            tourPlan: raw.tourPlan ?? [],
            included: raw.included ?? [],
            excluded: raw.excluded ?? [],
            faqs: raw.faqs ?? [],
          } as Tour;
          setTour(data);
        } else {
          const fallback = (mockTours as unknown as Tour[]).find((t) => t.slug === slug);
          setTour(fallback || null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tour");
        const fallback = (mockTours as unknown as Tour[]).find((t) => t.slug === slug);
        setTour(fallback || null);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [slug]);

  return { tour, loading, error };
}
