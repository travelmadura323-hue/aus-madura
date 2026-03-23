import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase-config";
import { Tour } from "../types";

export function useTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const q = query(collection(db, "tours"));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => {
          const raw = d.data() as any;
          return {
            ...raw,
            id: d.id, // IMPORTANT: always use Firestore doc.id
            location: raw.location ?? { country: "", cities: [] },
            duration: raw.duration ?? { days: 0, nights: 0 },
            price: raw.price ?? { startingFrom: 0, currency: "AUD", perPerson: true },
            highlights: raw.highlights ?? [],
            tourPlan: raw.tourPlan ?? [],
            included: raw.included ?? [],
            excluded: raw.excluded ?? [],
            faqs: raw.faqs ?? [],
            gallery: raw.gallery ?? [],
            categories: raw.categories ?? [], // ✅ Ensure categories field
          } as Tour;
        });
        setTours(data);
        setLoading(false);
      },
      (err) => {
        setError(err?.message || "Failed to subscribe to tours");
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  return { tours, loading, error };
}

