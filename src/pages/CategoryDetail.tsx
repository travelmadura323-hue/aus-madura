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
    <div className="pt-20">
      <div className="bg-primary py-12 sm:py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Travel Categories
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            {categoryData.name}
          </h1>
          <p className="mt-4 text-white/80 leading-relaxed">
            Specialized travel experiences tailored to your needs.
          </p>
        </div>
      </div>

      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-16">
            <div className="lg:col-span-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8 sm:mb-10">Available Packages</h2>
              {relatedTours.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedTours.map(tour => <TourCard key={tour.id} tour={tour} />)}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-4xl">🗺️</div>
                  <h3 className="text-xl font-bold text-primary mb-3">No Packages Available Yet</h3>
                  <p className="text-slate-500 max-w-md leading-relaxed mb-8">
                    We're currently curating exciting {categoryData.name} packages. Check back soon or explore our other tours.
                  </p>
                  <Link
                    to="/tours"
                    className="bg-accent text-white font-bold px-8 py-3 rounded-full hover:bg-primary transition-all"
                  >
                    Browse All Tours
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
