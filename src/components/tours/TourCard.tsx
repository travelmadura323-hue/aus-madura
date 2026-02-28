import { motion } from 'framer-motion';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TourCardProps {
  tour: {
    slug: string;
    title: string;
    location: string;
    duration: string;
    price: number;
    image: string;
  };
  key?: string | number;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
          <Clock className="w-3 h-3" /> {tour.duration}
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center gap-1 text-white text-xs">
            <MapPin className="w-3 h-3 text-accent" /> {tour.location}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-primary mb-2 line-clamp-1">{tour.title}</h3>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Starting from</span>
            <span className="text-xl font-bold text-primary">${tour.price.toLocaleString()}</span>
          </div>
          <Link
            to={`/tours/${tour.slug}`}
            className="flex items-center gap-2 text-sm font-bold text-accent hover:text-primary transition-colors"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
