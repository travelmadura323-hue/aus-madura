import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Info, Camera } from 'lucide-react';
import { destinations, tours } from '../data/mockData';
import TourCard from '../components/tours/TourCard';

export default function DestinationDetail() {
  const { country } = useParams();
  const destination = destinations.find(d => d.id === country) || destinations[0];
  const relatedTours = tours.filter(t => t.location.country.toLowerCase().includes(destination.name.toLowerCase()));

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h1 className="text-[32px] font-bold text-white mb-6 uppercase">{destination.name}</h1>
              <p className="text-xl text-slate-200 max-w-2xl mx-auto">{destination.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-3">
              <div className="mb-16">
                <h2 className="text-[24px] font-bold text-primary mb-6">About {destination.name}</h2>
                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                  {destination.description} This destination offers a unique blend of history, culture, and natural beauty. Whether you're looking for adventure, relaxation, or cultural immersion, {destination.name} has something for everyone.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Info className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Why Visit?</h4>
                      <p className="text-sm text-slate-500">Stunning landscapes, rich cultural heritage, and world-class hospitality.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Camera className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Top Attractions</h4>
                      <p className="text-sm text-slate-500">Historic monuments, local markets, and breathtaking natural sites.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-[24px] font-bold text-primary mb-10">Top Tour Packages</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedTours.length > 0 ? (
                    relatedTours.map(tour => <TourCard key={tour.id} tour={tour} />)
                  ) : (
                    tours.slice(0, 3).map(tour => <TourCard key={tour.id} tour={tour} />)
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-[24px] font-bold text-primary mb-10">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="rounded-xl overflow-hidden h-40">
                      <img src={`https://picsum.photos/seed/dest-${destination.id}-${i}/400/400`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
