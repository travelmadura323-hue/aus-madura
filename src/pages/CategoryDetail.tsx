import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories, tours } from '../data/mockData';
import TourCard from '../components/tours/TourCard';

export default function CategoryDetail() {
  const { category } = useParams();
  const categoryData = categories.find(c => c.slug === category) || categories[0];
  const relatedTours = tours.filter(t => t.category === categoryData.name);

  return (
    <div className="pt-20">
      <section className="relative h-[40vh] flex items-center overflow-hidden">
        <img
          src={`https://picsum.photos/seed/${categoryData.id}/1920/1080`}
          alt={categoryData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{categoryData.name}</h1>
          <p className="text-lg sm:text-xl text-slate-300">Specialized travel experiences tailored to your needs.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-16">
            <div className="lg:col-span-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8 sm:mb-10">Available Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedTours.length > 0 ? (
                  relatedTours.map(tour => <TourCard key={tour.id} tour={tour} />)
                ) : (
                  tours.map(tour => <TourCard key={tour.id} tour={tour} />)
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
