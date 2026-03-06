import { motion } from 'framer-motion';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
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

  const displayCurrency = (typeof tour.price === 'object' && tour.price.currency === 'INR') ? '₹' : '$';

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group flex flex-col"
    >
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <Link to={`/tours/${tour.slug}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </Link>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
          <Clock className="w-3 h-3 text-accent" /> {displayDuration}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center gap-1 text-white text-xs">
            <MapPin className="w-3 h-3 text-accent" /> {displayLocation}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg font-bold text-primary mb-2">{tour.title}</h3>
        <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
          {tour.description || "Discover the hidden gems and iconic landmarks of this breathtaking destination with our expert-led tour."}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Starting from</span>
            <span className="text-2xl font-black text-primary">{displayCurrency}{displayPrice.toLocaleString()}</span>
          </div>

          <Link
            to={`/tours/${tour.slug}`}
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-2 text-sm font-bold text-accent hover:text-primary transition-colors"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
