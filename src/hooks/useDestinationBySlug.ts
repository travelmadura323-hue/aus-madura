import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { destinations as mockDestinations } from "../data/mockData";
import { Destination } from "../types";

export function useDestinationBySlug(slugOrId: string | undefined) {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slugOrId) {
      setDestination(null);
      setLoading(false);
      return;
    }

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1) Try doc id lookup
        const byId = await getDoc(doc(db, "destinations", slugOrId));
        if (byId.exists()) {
          const raw: any = byId.data();
          setDestination({
            id: byId.id,
            ...raw,
            cities: raw.cities ?? [],
            images: raw.images ?? [],
            header: raw.header ?? "",
            countriesIncluded: raw.countriesIncluded ?? [],
          } as Destination);
          setLoading(false);
          return;
        }

        // 2) Try slug lookup
        const snap = await getDocs(query(collection(db, "destinations"), where("slug", "==", slugOrId)));
        if (!snap.empty) {
          const d = snap.docs[0];
          const raw: any = d.data();
          setDestination({
            id: d.id,
            ...raw,
            cities: raw.cities ?? [],
            images: raw.images ?? [],
            header: raw.header ?? "",
            countriesIncluded: raw.countriesIncluded ?? [],
          } as Destination);
          setLoading(false);
          return;
        }

        // 3) Fallback to mock data (legacy)
        const fallback = (mockDestinations as any[]).find((x) => x.id === slugOrId || x.slug === slugOrId);
        setDestination((fallback as any) || null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load destination");
        const fallback = (mockDestinations as any[]).find((x) => x.id === slugOrId || x.slug === slugOrId);
        setDestination((fallback as any) || null);
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, [slugOrId]);

  return { destination, loading, error };
}

