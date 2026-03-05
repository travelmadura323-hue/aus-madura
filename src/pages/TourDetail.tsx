import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, Users, MapPin, Check, X, ChevronRight,
  Calendar, Info, Wallet, Map, Star, MessageSquarePlus,
  HelpCircle, ChevronDown, Plane, Hotel, ShieldCheck, Coffee,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { tours } from '../data/mockData';
import TourCard from '../components/tours/TourCard';

export default function TourDetail() {
  const { slug } = useParams();
  const tour = tours.find(t => t.slug === slug) || tours[0];
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    travelers: '1',
    message: ''
  });

  const handleBookingSubmit = (e: any) => {
    e.preventDefault();
    setBookingStatus('submitting');
    setTimeout(() => {
      setBookingStatus('success');
      setFormData({ name: '', email: '', phone: '', date: '', travelers: '1', message: '' });
    }, 1500);
  };

  const displayLocation = typeof tour.location === 'string'
    ? tour.location
    : `${tour.location.cities.join(', ')}`;

  const displayDuration = typeof tour.duration === 'string'
    ? tour.duration
    : `${tour.duration.days} Days / ${tour.duration.nights} Nights`;

  const displayPrice = typeof tour.price === 'number'
    ? tour.price
    : tour.price.startingFrom;

  const displayCurrency = (typeof tour.price === 'object' && tour.price.currency === 'INR') ? '₹' : '$';

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-end pb-16">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-white/80 text-sm mb-6 bg-black/20 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/10"
            >
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{tour.title}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[32px] font-bold text-white mb-6 drop-shadow-2xl uppercase"
            >
              {tour.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-8 text-white"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                <Clock className="w-6 h-6 text-accent" />
                <span className="text-lg font-medium">{displayDuration}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                <MapPin className="w-6 h-6 text-accent" />
                <span className="text-lg font-medium">{displayLocation}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 relative z-10 -mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-12">

              {/* Features Quick Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Minimum Age', value: `${tour.minimumAge || '5'}+ Years`, icon: <Users /> },
                  { label: 'Travelers', value: tour.travelers ? `${tour.travelers.adults + tour.travelers.children} People` : 'Customizable', icon: <Users /> },
                  { label: 'Starting Place', value: tour.startingPlace || 'Airport', icon: <MapPin /> },
                  { label: 'Rating', value: `${(tour as any).rating || '4.9'} / 5.0`, icon: <Star /> }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="text-accent mb-3 p-3 bg-accent/10 rounded-2xl w-fit">{item.icon}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-sm font-bold text-primary">{item.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Highlights Section */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h2 className="text-[24px] font-bold text-primary mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-accent rounded-full" />
                  Tour Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {((tour as any).highlights || [
                    "Breathtaking scenery and photo opportunities",
                    "Expert local English-speaking guides",
                    "Luxury accommodation in prime locations",
                    "Authentic local culinary experiences"
                  ]).map((highlight: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="mt-1 w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-slate-600 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>


              {/* Overview */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h2 className="text-[24px] font-bold text-primary mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-accent rounded-full" />
                  Tour Overview
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg italic">
                  "{tour.overview || "Experience the best of this destination with our carefully crafted itinerary. We ensure a perfect blend of sightseeing, relaxation, and local experiences."}"
                </p>
              </div>

              {/* Tour Plan */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h2 className="text-[24px] font-bold text-primary mb-10 flex items-center gap-3">
                  <span className="w-2 h-8 bg-accent rounded-full" />
                  Day-by-Day Journey
                </h2>
                <div className="space-y-10">
                  {(tour.tourPlan || [
                    { day: 1, title: 'Arrival & Welcome', description: 'Meet our representative at the airport and transfer to your hotel.' },
                    { day: 2, title: 'City Exploration', description: 'Full day sightseeing of major landmarks and local markets.' },
                    { day: 3, title: 'Nature & Adventure', description: 'Explore the natural beauty and participate in outdoor activities.' },
                    { day: 4, title: 'Departure', description: 'Final shopping and transfer to the airport for your onward journey.' }
                  ]).map((day, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="relative pl-16 pb-8 border-l-2 border-dashed border-slate-100 last:border-0"
                    >
                      <div className="absolute left-[-21px] top-0 w-10 h-10 bg-accent rounded-2xl flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-accent/30 transform rotate-45">
                        <span className="transform -rotate-45">{day.day}</span>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-3xl group hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100">
                        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">Day {day.day}: {day.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{day.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Image Gallery */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h2 className="text-[24px] font-bold text-primary mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-accent rounded-full" />
                  Image Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {((tour as any).gallery || [
                    'https://picsum.photos/seed/g1/800/600',
                    'https://picsum.photos/seed/g2/800/600',
                    'https://picsum.photos/seed/g3/800/600',
                    'https://picsum.photos/seed/g4/800/600',
                    'https://picsum.photos/seed/g5/800/600',
                    'https://picsum.photos/seed/g6/800/600'
                  ]).map((img: string, idx: number) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="relative aspect-square rounded-2xl overflow-hidden shadow-md"
                    >
                      <img src={img} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                    </motion.div>
                  ))}
                </div>
              </div>


              {/* Inclusion/Exclusion Tabs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-emerald-50/40 p-10 rounded-[2.5rem] border border-emerald-100/50">
                  <h3 className="text-xl font-bold text-emerald-900 mb-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
                      <Check className="w-6 h-6" />
                    </div>
                    What's Included
                  </h3>
                  <ul className="space-y-5">
                    {(tour.included || ['Premium Hotel Stay', 'Luxury Transportation', 'Guided Cultural Tours', 'Full Board Meals', 'Activity Charges']).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-emerald-800 font-medium">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/40 p-10 rounded-[2.5rem] border border-rose-100/50">
                  <h3 className="text-xl font-bold text-rose-900 mb-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-500 rounded-2xl flex items-center justify-center text-white">
                      <X className="w-6 h-6" />
                    </div>
                    What's Excluded
                  </h3>
                  <ul className="space-y-5">
                    {(tour.excluded || ['International Airfare', 'Visa Processing Charges', 'Travel & Health Insurance', 'Additional Activities', 'Private Shopping']).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-rose-800 font-medium">
                        <div className="w-2 h-2 bg-rose-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQs Section */}
              {tour.faqs && (
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <h2 className="text-[24px] font-bold text-primary mb-10 flex items-center gap-3">
                    <HelpCircle className="w-10 h-10 text-accent" />
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {tour.faqs.map((faq, idx) => (
                      <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                        >
                          <span className="font-bold text-primary">{faq.question}</span>
                          <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 pt-0 text-slate-500 border-t border-slate-100 mt-2">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Sidebar Sticky Area */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">

                {/* Booking Card */}
                <div className="bg-primary p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

                  <div className="relative z-10">
                    <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">Exclusive Pricing</div>
                    <div className="flex items-baseline gap-2 mb-8">
                      <span className="text-[32px] font-black text-accent">{displayCurrency}{displayPrice.toLocaleString()}</span>
                      <span className="text-slate-400 text-sm">/ person</span>
                    </div>


                    <div id="booking-form" className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-accent" />
                        Book This Tour
                      </h4>

                      {bookingStatus === 'success' ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-8"
                        >
                          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8 text-white" />
                          </div>
                          <h5 className="text-white font-bold text-lg mb-2">Booking Successful!</h5>
                          <p className="text-slate-400 text-sm">Our expert will contact you soon.</p>
                          <button
                            onClick={() => setBookingStatus('idle')}
                            className="mt-6 text-accent font-bold text-sm hover:underline"
                          >
                            Make another booking
                          </button>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                          <input
                            required
                            type="text"
                            placeholder="Full Name"
                            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                          <input
                            required
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              required
                              type="tel"
                              placeholder="Phone"
                              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                            <input
                              required
                              type="date"
                              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                              value={formData.date}
                              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                          </div>
                          <select
                            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                            value={formData.travelers}
                            onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n} className="bg-primary">{n} Travelers</option>)}
                          </select>
                          <textarea
                            placeholder="Special Requests"
                            rows={3}
                            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          />
                          <button
                            type="submit"
                            disabled={bookingStatus === 'submitting'}
                            className="w-full bg-accent text-primary font-black py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-accent/20 disabled:opacity-50"
                          >
                            {bookingStatus === 'submitting' ? 'Processing...' : (
                              <>
                                <MessageSquarePlus className="w-5 h-5" />
                                Confirm Booking
                              </>
                            )}
                          </button>
                        </form>
                      )}
                    </div>

                    <p className="text-center text-[10px] text-slate-500 mt-6 font-medium">No hidden fees. Best price guarantee.</p>
                  </div>
                </div>


                {/* Support Card */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
                  <h4 className="font-bold text-primary mb-2">Need Expert Help?</h4>
                  <p className="text-slate-500 text-sm mb-6">Our travel specialists are available 24/7 to help you.</p>
                  <div className="flex justify-center gap-4">
                    <a href="tel:+91" className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all text-primary">
                      <ShieldCheck className="w-6 h-6" />
                    </a>
                    <a href="mailto:info@" className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all text-primary">
                      <Info className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Related Tours Section */}
          <div className="mt-32">
            <div className="flex items-end justify-between mb-16 px-4">
              <div>
                <span className="text-accent font-bold uppercase tracking-widest text-[10px] mb-2 block">Our Collection</span>
                <h2 className="text-[24px] font-bold text-primary">Similar Experiences</h2>
              </div>
              <Link to="/tours" className="text-primary font-bold flex items-center gap-2 hover:text-accent transition-all group">
                View All Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {tours.filter(t => t.slug !== slug).slice(0, 3).map(t => (
                <TourCard key={t.id || t.slug} tour={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Book Now Button */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-100 p-4 z-[90] flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Starting from</span>
          <span className="text-xl font-black text-primary">{displayCurrency}{displayPrice.toLocaleString()}</span>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('booking-form');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-accent text-primary font-black px-8 py-3 rounded-xl shadow-lg shadow-accent/20 active:scale-95 transition-all flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Book Now
        </button>
      </div>
    </div>
  );
}
