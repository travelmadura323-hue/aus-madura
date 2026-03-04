import React from 'react';
import { Globe, Heart, MapPin } from 'lucide-react';
import { tours } from '../../data/mockData';
import DestinationPackages from '../tours/DestinationPackages';

const SriLanka = () => {
  const sriLankaTours = tours.filter((t) =>
    (typeof t.location === 'string' ? t.location : t.location.country).toLowerCase().includes('sri-lanka')
  );

  return (
    <DestinationPackages
      country="Sri Lanka"
      heroImage="https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&w=1920&q=80"
      tagline="The Pearl of the Indian Ocean"
      description="Discover ancient ruins, lush tea plantations, and pristine beaches in this island paradise."
      features={[
        { title: "Ancient Ruins", desc: "Explore Sigiriya, Polonnaruwa, and Anuradhapura.", icon: <Globe className="w-8 h-8" /> },
        { title: "Wildlife Safaris", desc: "Spot leopards, elephants, and blue whales.", icon: <Heart className="w-8 h-8" /> },
        { title: "Tea Country", desc: "Scenic train rides through emerald green hills.", icon: <MapPin className="w-8 h-8" /> }
      ]}
      tours={sriLankaTours}
    />
  );
};

export default SriLanka;