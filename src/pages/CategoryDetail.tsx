import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories, tours } from '../data/mockData';
import TourCard from '../components/tours/TourCard';

export default function CategoryDetail() {
  const { category } = useParams();
  const categoryData = categories.find(c => c.slug === category) || categories[0];
  const relatedTours = tours.filter(t => {
    const cat = t.category;
    if (Array.isArray(cat)) return cat.some(c => c.trim().toLowerCase() === categoryData.name.toLowerCase());
    if (typeof cat === 'string') return cat.split(',').map(c => c.trim().toLowerCase()).includes(categoryData.name.toLowerCase());
    return false;
  });

  return (
    <div className="pt-20 bg-secondary min-h-screen">
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`https://picsum.photos/seed/${categoryData.id}/1920/1080`}
            alt={categoryData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-4">
              Curated Travel Style
            </span>
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-white mb-4 leading-tight uppercase">
              {categoryData.name}
            </h1>
            <p className="text-base md:text-lg text-slate-200 max-w-xl">
              Specialized travel experiences tailored around this theme, with handpicked itineraries and
              professionally curated journeys.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-accent font-bold uppercase tracking-widest text-[10px] mb-2 block">
                Tailored Collections
              </span>
              <h2 className="text-[24px] font-bold text-primary">
                {categoryData.name} Packages
              </h2>
              <p className="text-slate-500 mt-3 max-w-xl text-sm md:text-base">
                Choose from our curated selection of {categoryData.name.toLowerCase()} journeys crafted to match
                different travel styles, budgets, and expectations.
              </p>
            </div>
            <Link
              to="/"
              className="text-primary font-bold flex items-center gap-2 hover:text-accent transition-colors group text-sm"
            >
              Back to Home
              <span className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-accent">
                <span className="block w-2 h-2 border-t-2 border-r-2 border-current rotate-180 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(relatedTours.length > 0 ? relatedTours : tours).map(tour => (
              <TourCard key={tour.id || tour.slug} tour={tour as any} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
