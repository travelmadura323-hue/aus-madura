import React from 'react';
import { Globe, Heart, MapPin } from 'lucide-react';
import { tours } from '../data/mockData';
import DestinationPackages from '../components/tours/DestinationPackages';

const Vietnam = () => {
  const vietnamTours = tours.filter((t) =>
    (typeof t.location === 'string' ? t.location : t.location.country).toLowerCase().includes('vietnam')
  );

  return (
    <DestinationPackages
      country="Vietnam"
      heroImage="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=80"
      tagline="Heritage. Nature. Eternal Charm."
      description="A land of staggering natural beauty and cultural complexities, of dynamic megacities and hill-tribe villages."
      features={[
        { title: "Natural Beauty", desc: "From Halong Bay to the Mekong Delta.", icon: <Globe className="w-8 h-8" /> },
        { title: "Rich History", desc: "Ancient temples and colonial architecture.", icon: <Heart className="w-8 h-8" /> },
        { title: "Warm Hospitality", desc: "Experience the heart and soul of Vietnam.", icon: <MapPin className="w-8 h-8" /> }
      ]}
      tours={vietnamTours}
    />
  );
};

export default Vietnam;