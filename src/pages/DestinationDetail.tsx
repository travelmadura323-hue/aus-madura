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
      <div className="bg-primary py-12 sm:py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Destinations
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            {destination.name}
          </h1>
          <p className="mt-4 text-white/80 leading-relaxed">
            {destination.description}
          </p>
        </div>
      </div>

      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
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
