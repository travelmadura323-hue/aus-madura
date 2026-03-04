import React from 'react';
import { Globe, Heart, MapPin } from 'lucide-react';
import { tours } from '../data/mockData';
import DestinationPackages from '../components/tours/DestinationPackages';

const Malaysia = () => {
  const malaysiaTours = tours.filter((t) =>
    (typeof t.location === 'string' ? t.location : t.location.country).toLowerCase().includes('Malaysia')
  );

  return (
    <DestinationPackages
      country="Malaysia"
      heroImage="https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&w=1920&q=80"
      tagline="A Vibrant Mix of Cultures"
      description="Experience the modernity of Kuala Lumpur, the beaches of Langkawi, and the ancient rainforests of Taman Negara."
      features={[
        { title: "Cultural Diversity", desc: "A unique blend of Malay, Chinese, and Indian influences.", icon: <Globe className="w-8 h-8" /> },
        { title: "Natural Wonders", desc: "Pristine beaches and tropical rainforests.", icon: <Heart className="w-8 h-8" /> },
        { title: "Modern Cities", desc: "World-class shopping and dining in KL.", icon: <MapPin className="w-8 h-8" /> }
      ]}
      tours={malaysiaTours}
    />
  );
};

export default Malaysia;