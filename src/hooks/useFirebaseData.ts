import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase-config';
import { destinations as mockDestinations, tours as mockTours } from '../data/mockData';

export const useFirebaseData = () => {
  const [destinations, setDestinations] = useState<any[]>(mockDestinations);
  const [tours, setTours] = useState<any[]>(mockTours);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch Destinations
        const destSnapshot = await getDocs(collection(db, 'destinations'));
        if (!destSnapshot.empty) {
          const destData = destSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setDestinations(destData);
        }

        // Fetch Tours
        const toursSnapshot = await getDocs(collection(db, 'tours'));
        if (!toursSnapshot.empty) {
          const toursData = toursSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTours(toursData);
        }
      } catch (error) {
        console.error("Error fetching Firestore data, falling back to mock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { destinations, tours, loading };
};
