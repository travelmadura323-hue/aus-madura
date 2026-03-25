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
  // ✅ Show country name only, not all cities
  const displayLocation = typeof tour.location === 'string'
    ? tour.location
    : [tour.location.cities?.[0], tour.location.country]
      .filter(Boolean)
      .join(', ');

  const displayDuration = typeof tour.duration === 'string'
    ? tour.duration
    : `${tour.duration.days} Days / ${tour.duration.nights} Nights`;

  const displayPrice = typeof tour.price === 'number'
    ? tour.price
    : tour.price.startingFrom;

  const displayCurrency =
    typeof tour.price === "object"
      ? tour.price.currency === "AUD" ? "AUD$" : "AUD$"
      : "AUD$";

  // ✅ Single source of truth for the tour URL
  const tourUrl = `/tours/${tour.slug}`;
  const handleNavigate = () => window.scrollTo(0, 0);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-100/80 group flex flex-col h-full relative hover:shadow-card-hover transition-shadow duration-300"
    >
      {/* Premium Badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-gradient-to-r from-accent to-accent/80 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
          <Award className="w-3 h-3" />
          Premium
        </div>
      </div>

      {/* Image Section */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <Link to={tourUrl} onClick={handleNavigate}>
          <div className="relative w-full h-full">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
          </div>
        </Link>

        {/* Duration Badge */}
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2 shadow-xl border border-white/20">
            <Calendar className="w-4 h-4 text-accent" />
            {displayDuration}
          </div>
        </div>

        {/* Location Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 z-10">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-accent" />
            </div>
            <span className="text-sm font-semibold drop-shadow-lg">{displayLocation}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 relative">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className={`w-4 h-4 ${star <= (tour as any).rating ? 'fill-accent text-accent' : 'text-slate-300'}`} />
          ))}
          <span className="text-xs text-slate-500 ml-2">({(tour as any).rating || '4.9'})</span>
        </div>

        {/* ✅ Title is now also a clickable link */}
        <Link to={tourUrl} onClick={handleNavigate}>
          <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 line-clamp-2 leading-tight hover:text-accent transition-colors cursor-pointer">
            {tour.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {tour.description || "Discover the hidden gems and iconic landmarks of this breathtaking destination with our expert-led tour."}
        </p>

        {/* Features */}
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

        {/* Price + CTA in same row */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Starting from
            </span>
            <span className="text-lg md:text-xl font-extrabold text-primary">
              {displayCurrency}{displayPrice.toLocaleString()}
            </span>
            <span className="text-sm text-slate-500 mt-0.5">/person</span>
          </div>

          {/* CTA Button */}
          <Link
            to={tourUrl}
            onClick={handleNavigate}
            className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-semibold flex items-center justify-center hover:bg-accent transition-colors"
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
    </motion.div>
  );
}