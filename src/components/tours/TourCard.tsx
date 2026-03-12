import { motion } from 'framer-motion';
import { Clock, MapPin, ArrowRight, Star, Users, Calendar, Globe, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TourCardProps {
  tour: {
    id?: string;
    slug: string;
    title: string;
    location: string | { country: string; cities: string[] };
    duration: string | { days: number; nights: number };
    price: number | { startingFrom: number; currency: string; perPerson: boolean };
    image: string;
    description?: string;
  };
  key?: string | number;
}

export default function TourCard({ tour }: TourCardProps) {
  const displayLocation = typeof tour.location === 'string'
    ? tour.location
    : tour.location.cities.join(', ');

  const displayDuration = typeof tour.duration === 'string'
    ? tour.duration
    : `${tour.duration.days} Days / ${tour.duration.nights} Nights`;

  const displayPrice = typeof tour.price === 'number'
    ? tour.price
    : tour.price.startingFrom;
  const displayCurrency =
    typeof tour.price === "object"
      ? tour.price.currency === "AUD"
        ? "AUD$"
        : "AUD$"
      : "AUD$";

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 group flex flex-col h-full relative hover:shadow-2xl transition-all duration-500"
    >
      {/* Premium Badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-gradient-to-r from-accent to-accent/80 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
          <Award className="w-3 h-3" />
          Premium
        </div>
      </div>

      {/* Enhanced Image Section */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <Link to={`/tours/${tour.slug}`} onClick={() => window.scrollTo(0, 0)}>
          <div className="relative w-full h-full">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
          </div>
        </Link>

        {/* Floating Duration Badge */}
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2 shadow-xl border border-white/20">
            <Calendar className="w-4 h-4 text-accent" />
            {displayDuration}
          </div>
        </div>

        {/* Enhanced Location Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 z-10">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-accent" />
            </div>
            <span className="text-sm font-semibold drop-shadow-lg">{displayLocation}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 relative">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 fill-accent text-accent" />
          ))}
          <span className="text-xs text-slate-500 ml-2">(4.9)</span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 line-clamp-2 leading-tight">
          {tour.title}
        </h3>

        {/* Enhanced Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {tour.description || "Discover the hidden gems and iconic landmarks of this breathtaking destination with our expert-led tour."}
        </p>

        {/* Features Row */}
        <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>Group</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3" />
            <span>Guided</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            <span>Top Rated</span>
          </div>
        </div>

        {/* Enhanced Price Section */}
        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Starting from</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-xl font-black text-primary leading-none">
                  {displayCurrency}{displayPrice.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 mb-1">/person</span>
              </div>
            </div>

            {/* Enhanced CTA Button */}
            <Link
              to={`/tours/${tour.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary/90 text-white font-bold px-6 py-3 rounded-2xl hover:from-accent hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 text-sm"
            >
              <span className="relative z-10">Explore Now</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
    </motion.div>
  );
}
