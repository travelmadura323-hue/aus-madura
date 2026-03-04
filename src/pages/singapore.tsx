import React from 'react';
import { Globe, Heart, MapPin } from 'lucide-react';
import { tours } from '../data/mockData';
import DestinationPackages from '../components/tours/DestinationPackages';

const Singapore = () => {
  const singaporeTours = tours.filter((t) =>
    (typeof t.location === 'string' ? t.location : t.location.country).toLowerCase().includes('singapore')
  );

  return (
    <DestinationPackages
      country="Singapore"
      heroImage="https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?auto=format&fit=crop&w=1920&q=80"
      tagline="The Garden City of the Future"
      description="A global hub of culture, finance, and entertainment where tradition meets cutting-edge innovation."
      features={[
        { title: "Urban Oasis", desc: "Stunning gardens and sustainable architecture.", icon: <Globe className="w-8 h-8" /> },
        { title: "Food Paradise", desc: "From hawker centers to Michelin-starred dining.", icon: <Heart className="w-8 h-8" /> },
        { title: "Family Fun", desc: "World-class attractions at Sentosa and beyond.", icon: <MapPin className="w-8 h-8" /> }
      ]}
      tours={singaporeTours}
    />
  );
};

export default Singapore;