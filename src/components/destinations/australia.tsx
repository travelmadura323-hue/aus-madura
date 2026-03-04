import React from 'react';
import { Globe, Heart, MapPin } from 'lucide-react';
import { tours } from '../../data/mockData';
import DestinationPackages from '../tours/DestinationPackages';

const Australia = () => {
    const australiaTours = tours.filter((t) =>
        (typeof t.location === 'string' ? t.location : t.location.country).toLowerCase().includes('australia')
    );

    return (
        <DestinationPackages
            country="Australia"
            heroImage="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1920&q=80"
            tagline="Landscape. Culture. Continental Scale."
            description="From coastlines to desert interiors, Australia revealed through thoughtful design and disciplined execution. Explore the Great Outback and vibrant cities."
            features={[
                { title: "Iconic Landmarks", desc: "Visit the Sydney Opera House and Harbour Bridge.", icon: <Globe className="w-8 h-8" /> },
                { title: "Unique Wildlife", desc: "Meet kangaroos, koalas, and stunning marine life.", icon: <Heart className="w-8 h-8" /> },
                { title: "Natural Wonders", desc: "Explore the Great Barrier Reef and the Outback.", icon: <MapPin className="w-8 h-8" /> }
            ]}
            tours={australiaTours}
        />
    );
};

export default Australia;
