import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, MapPin, Check, X, ChevronRight, Calendar, Info } from 'lucide-react';
import { tours } from '../data/mockData';
import TourCard from '../components/tours/TourCard';

export default function TourDetail() {
  const { slug } = useParams();
  const tour = tours.find(t => t.slug === slug) || tours[0]; // Fallback to first tour for demo

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
              <Link to="/" className="hover:text-accent">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/tours" className="hover:text-accent">Tours</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{tour.title}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{tour.title}</h1>
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" /> {tour.duration}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" /> {tour.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-primary mb-6">Tour Overview</h2>
                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                  {tour.description || "Experience the best of this destination with our carefully crafted itinerary. We ensure a perfect blend of sightseeing, relaxation, and local experiences."}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Duration', value: tour.duration, icon: <Clock /> },
                    { label: 'Max Travelers', value: '12 People', icon: <Users /> },
                    { label: 'Min Age', value: '5+ Years', icon: <Info /> },
                    { label: 'Pickup', value: 'Airport', icon: <MapPin /> }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-secondary p-4 rounded-2xl border border-slate-100">
                      <div className="text-accent mb-2">{item.icon}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</div>
                      <div className="text-sm font-bold text-primary">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tour Plan */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-primary mb-8">Tour Plan</h2>
                <div className="space-y-6">
                  {(tour.plan || [
                    { day: 1, title: 'Arrival & Welcome', description: 'Meet our representative at the airport and transfer to your hotel.' },
                    { day: 2, title: 'City Exploration', description: 'Full day sightseeing of major landmarks and local markets.' },
                    { day: 3, title: 'Nature & Adventure', description: 'Explore the natural beauty and participate in outdoor activities.' },
                    { day: 4, title: 'Departure', description: 'Final shopping and transfer to the airport for your onward journey.' }
                  ]).map((day, idx) => (
                    <div key={idx} className="relative pl-12 pb-8 border-l-2 border-slate-100 last:border-0">
                      <div className="absolute left-[-13px] top-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-[10px] font-bold text-primary border-4 border-white">
                        {day.day}
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2">Day {day.day}: {day.title}</h3>
                      <p className="text-slate-500">{day.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included / Excluded */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-emerald-50/50 p-8 rounded-2xl border border-emerald-100">
                  <h3 className="text-lg font-bold text-emerald-900 mb-6 flex items-center gap-2">
                    <Check className="w-5 h-5" /> What's Included
                  </h3>
                  <ul className="space-y-4">
                    {['Accommodation', 'Daily Breakfast', 'Airport Transfers', 'Guided Tours', 'Entrance Fees'].map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm text-emerald-800">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-rose-50/50 p-8 rounded-2xl border border-rose-100">
                  <h3 className="text-lg font-bold text-rose-900 mb-6 flex items-center gap-2">
                    <X className="w-5 h-5" /> What's Excluded
                  </h3>
                  <ul className="space-y-4">
                    {['Airfare', 'Lunch & Dinner', 'Personal Expenses', 'Travel Insurance', 'Tips & Gratuities'].map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm text-rose-800">
                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Gallery */}
              {/* <div className="mb-12">
                <h2 className="text-3xl font-bold text-primary mb-8">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="rounded-xl overflow-hidden h-48">
                      <img src={`https://picsum.photos/seed/gallery-${i}/400/400`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="bg-primary text-white p-8 rounded-2xl shadow-xl">
                  <div className="text-sm text-slate-300 mb-2">Starting from</div>
                  <div className="text-4xl font-bold text-accent mb-6">${tour.price.toLocaleString()}</div>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between text-sm py-2 border-b border-white/10">
                      <span className="text-slate-400">Duration</span>
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2 border-b border-white/10">
                      <span className="text-slate-400">Location</span>
                      <span>{tour.location}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const btn = document.querySelector('button[onClick*="setIsEnquiryModalOpen(true)"]') as HTMLButtonElement;
                      if (btn) btn.click();
                    }}
                    className="w-full bg-accent text-primary font-bold py-4 rounded-xl hover:bg-white transition-all"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tours */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-primary mb-12">Related Tours</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tours.slice(0, 3).map(t => (
                <TourCard key={t.id} tour={t} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
