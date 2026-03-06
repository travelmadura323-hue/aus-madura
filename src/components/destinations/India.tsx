import React from 'react';
import { Globe, Heart, MapPin } from 'lucide-react';
import { tours } from '../../data/mockData';
import DestinationPackages from '../tours/DestinationPackages';

const India = () => {
  const indiaTours = tours.filter((t) =>
    (typeof t.location === 'string' ? t.location : t.location.country).toLowerCase().includes('india')
  );
  const photo = import.meta.glob('../../images/*.{png,jpg,jpeg,svg}', {
    eager: true,
    import: 'default',
  });

  return (
    <DestinationPackages
      country="India"
      titlePrefix="Incredible"
      heroImage={photo['../../images/1.png'] as string}
      tagline="Experience the Soul of a Nation"
      description="A land of diverse landscapes, ancient history, and vibrant traditions. From the snow-capped Himalayas to the tropical backwaters of Kerala, discover a world within a country."
      features={[
        { title: "Rich Heritage", desc: "Access to 40+ UNESCO World Heritage sites.", icon: <Globe className="w-8 h-8" /> },
        { title: "Vibrant Culture", desc: "Experience 1,600+ dialects and diverse cuisines.", icon: <Heart className="w-8 h-8" /> },
        { title: "Local Expertise", desc: "Our 40 years of local knowledge at your service.", icon: <MapPin className="w-8 h-8" /> }
      ]}
      tours={indiaTours}
    />
  );
};

export default India;