import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase-config";
import { Destination } from "../types";

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const q = query(collection(db, "destinations"));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => {
          const raw = d.data() as any;
          return {
            id: d.id,
            ...raw,
            cities: raw.cities ?? [],
            images: raw.images ?? [],
          } as Destination;
        });
        setDestinations(data);
        setLoading(false);
      },
      (err) => {
        setError(err?.message || "Failed to subscribe to destinations");
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  return { destinations, loading, error };
}

