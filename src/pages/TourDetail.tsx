import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from "react";
import {
  Clock, Users, MapPin, Check, X, ChevronRight,
  Calendar, Star, MessageSquarePlus,
  HelpCircle, ChevronDown, ShieldCheck, Info,
  ArrowRight
} from 'lucide-react';
import { tours } from '../data/mockData';
import { useTourBySlug } from '../hooks/useTourBySlug';
import TourCard from '../components/tours/TourCard';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TourDetail() {
  const { slug } = useParams();
  const { tour: firestoreTour, loading } = useTourBySlug(slug);
  const mockTour = tours.find((t: { slug?: string }) => t.slug === slug);
  const tour = firestoreTour || mockTour || tours[0];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', countryCode: '+61',
    date: '', adults: '1', children: '0', infants: '0',
    message: '', website: ''
  });
  const [formErrors, setFormErrors] = useState<{ phone?: string; date?: string }>({});

  const validatePhone = (phone: string, cc: string): string | undefined => {
    const d = phone.replace(/\D/g, "").replace(/^0+/, "");
    if (!d) return "Phone number is required.";
    const rules: Record<string, { min: number; max: number; label: string }> = {
      "+61": { min: 9, max: 9, label: "Australian numbers must be 9 digits." },
      "+91": { min: 10, max: 10, label: "Indian numbers must be 10 digits." },
      "+1": { min: 10, max: 10, label: "US/Canada numbers must be 10 digits." },
      "+44": { min: 10, max: 10, label: "UK numbers must be 10 digits." },
      "+971": { min: 9, max: 9, label: "UAE numbers must be 9 digits." },
      "+65": { min: 8, max: 8, label: "Singapore numbers must be 8 digits." },
      "+60": { min: 9, max: 10, label: "Malaysian numbers must be 9–10 digits." },
    };
    const r = rules[cc];
    if (r && (d.length < r.min || d.length > r.max)) return r.label;
    if (!r && (d.length < 6 || d.length > 15)) return "Enter a valid phone number.";
    return undefined;
  };
  const [showDatePicker, setShowDatePicker] = useState(false);
  const validateDate = (date: string): string | undefined => {
    if (!date) return "Please select a travel date.";
    const s = new Date(date), t = new Date();
    t.setHours(0, 0, 0, 0);
    if (isNaN(s.getTime())) return "Invalid date.";
    if (s < t) return "Date must be today or in the future.";
    const max = new Date(); max.setFullYear(max.getFullYear() + 5);
    if (s > max) return "Choose a date within the next 5 years.";
    return undefined;
  };

  const todayStr = () => new Date().toISOString().split("T")[0];
  const maxDateStr = () => { const d = new Date(); d.setFullYear(d.getFullYear() + 5); return d.toISOString().split("T")[0]; };

  const handlePhoneChange = (v: string) => {
    setFormData(p => ({ ...p, phone: v }));
    setFormErrors(p => ({ ...p, phone: validatePhone(v, formData.countryCode) }));
  };
  const handleCCChange = (v: string) => {
    setFormData(p => ({ ...p, countryCode: v }));
    if (formData.phone) setFormErrors(p => ({ ...p, phone: validatePhone(formData.phone, v) }));
  };
  const handleDateChange = (v: string) => {
    setFormData(p => ({ ...p, date: v }));
    setFormErrors(p => ({ ...p, date: validateDate(v) }));
  };
  const [showMobileForm, setShowMobileForm] = useState(false);
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website.trim() !== "") return;
    const phoneErr = validatePhone(formData.phone, formData.countryCode);
    const dateErr = validateDate(formData.date);
    if (phoneErr || dateErr) { setFormErrors({ phone: phoneErr, date: dateErr }); return; }

    const crmUrl = import.meta.env.VITE_CRM_URL;
    if (!crmUrl) { alert("CRM URL not configured."); return; }

    setBookingStatus('submitting');
    try {
      const phone = `${formData.countryCode}${formData.phone.replace(/\D/g, "").replace(/^0+/, "")}`;
      const response = await fetch(crmUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          name: formData.name, email: formData.email, phone,
          date: formData.date, enquiry: "Tours",
          destination: `Tour Booking: ${tour.title}`,
          source: "Global website",
        }).toString()
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      setBookingStatus('success');
      setFormData({ name: '', email: '', phone: '', countryCode: '+61', date: '', adults: '1', children: '0', infants: '0', message: '', website: '' });
      setFormErrors({});
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
      setBookingStatus('idle');
    }
  };
  const isMobile = window.innerWidth < 768; // adjust breakpoint if needed

  const FieldError = ({ message }: { message?: string }) =>
    message ? <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" /></svg>{message}</p> : null;

  const displayLocation = typeof tour.location === 'string' ? tour.location : tour.location.country || tour.location.cities.join(', ');
  const displayDuration = typeof tour.duration === 'string' ? tour.duration : `${tour.duration.days} Days / ${tour.duration.nights} Nights`;
  const displayPrice = typeof tour.price === 'number' ? tour.price : tour.price.startingFrom;

  if (loading) return <div className="pt-28 flex items-center justify-center min-h-screen text-slate-500">Loading tour...</div>;
  if (!tour) return <div className="pt-28 flex items-center justify-center min-h-screen text-slate-500">Tour not found. <Link to="/tours" className="ml-2 text-accent">Back</Link></div>;

  return (
    <div className="pt-18 bg-slate-50 min-h-screen">

      {/* ── Hero ── */}
      <section className="relative h-[45vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }} animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src={tour.image} alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-6 sm:pb-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="hidden sm:flex items-center gap-2 text-white/80 text-xs mb-4 bg-black/20 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/10">
              <Link to="/" className="hover:text-accent">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white font-medium truncate max-w-[200px]">{tour.title}</span>
            </div>
            {/* ✅ Mobile: smaller title */}
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-5 drop-shadow-2xl uppercase leading-tight">
              {tour.title}
            </h1>
            {/* ✅ Mobile: stacked badges, smaller text */}
            <div className="flex flex-wrap gap-2 sm:gap-4 text-white">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl border border-white/10">
                <Clock className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-accent shrink-0" />
                <span className="text-xs sm:text-base font-medium">{displayDuration}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl border border-white/10">
                <MapPin className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-accent shrink-0" />
                <span className="text-xs sm:text-base font-medium">{displayLocation}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-12 lg:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">

            {/* ── Main Content ── */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-10">

              {/* Quick Info Grid — ✅ 2 cols on mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  {
                    label: 'Min Age',
                    value: `${tour.minimumAge ?? '1'}+ Yrs`,
                    icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  },
                  {
                    label: 'Travelers',
                    value: (tour as any).travelers ?? 'Flexible',
                    icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  },
                  {
                    label: 'Starting',
                    value: tour.startingPlace || 'Airport',
                    icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  },
                  {
                    label: 'Rating',
                    value: `${tour.rating ?? '4.9'} / 5`,
                    icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-accent mb-2 p-2 bg-accent/10 rounded-xl w-fit">{item.icon}</div>
                    <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</div>
                    <div className="text-xs sm:text-sm font-bold text-primary leading-tight">
                      {String(item.value ?? "N/A")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              {(tour as any).highlights && (tour as any).highlights.length > 0 && (
                <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">

                  <h2 className="text-base sm:text-xl font-bold text-primary mb-4 sm:mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-5 sm:h-6 bg-accent rounded-full shrink-0" />
                    Tour Highlights
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(tour as any).highlights.map((h: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </div>
                        <span className="text-slate-600 text-sm sm:text-base">{h}</span>
                      </div>
                    ))}
                  </div>

                </div>
              )}
              {/* ))}
                </div>
              </div> */}
              <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-base sm:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 sm:h-6 bg-accent rounded-full shrink-0" />
                  Description
                </h2>

                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {tour.description || "No description available."}
                </p>
              </div>

              {/* Overview */}
              {/* <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-base sm:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 sm:h-6 bg-accent rounded-full shrink-0" />
                  Tour Overview
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base italic">
                  "{tour.overview || "Experience the best of this destination with our carefully crafted itinerary."}"
                </p>
              </div> */}

              {/* Tour Plan */}
              <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-base sm:text-xl font-bold text-primary mb-6 sm:mb-8 flex items-center gap-2">
                  <span className="w-1.5 h-5 sm:h-6 bg-accent rounded-full shrink-0" />
                  Day-by-Day Journey
                </h2>
                <div className="space-y-6">
                  {(tour.tourPlan || [
                    { day: 1, title: 'Arrival & Welcome', description: 'Meet our representative at the airport and transfer to your hotel.' },
                    { day: 2, title: 'City Exploration', description: 'Full day sightseeing of major landmarks and local markets.' },
                    { day: 3, title: 'Nature & Adventure', description: 'Explore the natural beauty and participate in outdoor activities.' },
                    { day: 4, title: 'Departure', description: 'Final shopping and transfer to the airport.' }
                  ]).map((day: any, idx: number) => (
                    <div key={idx} className="relative pl-10 sm:pl-14 pb-6 border-l-2 border-dashed border-slate-100 last:border-0">
                      <div className="absolute left-[-16px] sm:left-[-20px] top-0 w-8 h-8 sm:w-10 sm:h-10 bg-accent rounded-xl sm:rounded-2xl flex items-center justify-center text-xs sm:text-sm font-bold text-white shadow-lg shadow-accent/30 rotate-45">
                        <span className="-rotate-45">{day.day}</span>
                      </div>
                      <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                        <h3 className="text-sm sm:text-base font-bold text-primary mb-1.5">Day {day.day}: {day.title}</h3>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-base sm:text-xl font-bold text-primary mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-5 sm:h-6 bg-accent rounded-full shrink-0" />
                  Image Gallery
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {((tour as any).gallery || [
                    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1524492707947-2f85a1a24d3c?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80'
                  ]).map((img: string, idx: number) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden">
                      <img src={img} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Included / Excluded — ✅ stacked on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-[#191975]/5 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#191975]/20">
                  <h3 className="text-sm sm:text-base font-bold text-[#191975] mb-4 sm:mb-6 flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 bg-[#191975] rounded-xl flex items-center justify-center text-white shrink-0">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    What's Included
                  </h3>
                  <ul className="space-y-3">
                    {(tour.included || ['Premium Hotel Stay', 'Luxury Transportation', 'Guided Cultural Tours', 'Full Board Meals', 'Activity Charges']).map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-3 text-[#191975] text-xs sm:text-sm font-medium">
                        <Check className="w-4 h-4 shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-100 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200">
                  <h3 className="text-sm sm:text-base font-bold text-slate-700 mb-4 sm:mb-6 flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 bg-slate-400 rounded-xl flex items-center justify-center text-white shrink-0">
                      <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    What's Excluded
                  </h3>
                  <ul className="space-y-3">
                    {(tour.excluded || ['International Airfare', 'Visa Processing Charges', 'Travel & Health Insurance', 'Additional Activities', 'Private Shopping']).map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-3 text-red-600 text-xs sm:text-sm font-medium">
                        <X className="w-4 h-4 shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQs */}
              {tour.faqs && (
                <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">
                  <h2 className="text-base sm:text-xl font-bold text-primary mb-6 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent shrink-0" />
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {tour.faqs.map((faq: any, idx: number) => (
                      <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
                        <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors">
                          <span className="font-semibold text-primary text-sm sm:text-base pr-4">{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 text-accent transition-transform shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                        </button>
                        {/* ✅ Mobile Bottom Sheet Form */}
                        <AnimatePresence>
                          {showMobileForm && (
                            <>
                              {/* Backdrop */}
                              <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="lg:hidden fixed inset-0 bg-black/60 z-[95]"
                                onClick={() => setShowMobileForm(false)}
                              />
                              {/* Sheet */}
                              <motion.div
                                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="lg:hidden fixed bottom-0 left-0 w-full bg-primary rounded-t-3xl z-[96] max-h-[90vh] overflow-y-auto pb-8"
                              >
                                {/* Handle */}
                                <div className="flex justify-center pt-3 pb-2">
                                  <div className="w-10 h-1 bg-white/30 rounded-full" />
                                </div>
                                <div className="px-5 pb-4">
                                  <div className="flex items-center justify-between mb-4">
                                    <div>
                                      <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Starting From</div>
                                      <div className="text-2xl font-black text-white">AUD${displayPrice.toLocaleString()}</div>
                                    </div>
                                    <button onClick={() => setShowMobileForm(false)} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white">
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>

                                  <h4 className="text-white font-bold mb-3 text-sm flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-accent" /> Book This Tour
                                  </h4>

                                  {bookingStatus === 'success' ? (
                                    <div className="text-center py-6">
                                      <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Check className="w-6 h-6 text-white" />
                                      </div>
                                      <h5 className="text-white font-bold mb-1">Enquiry Sent!</h5>
                                      <p className="text-slate-400 text-xs">Our expert will contact you soon.</p>
                                      <button onClick={() => { setBookingStatus('idle'); setShowMobileForm(false); }} className="mt-4 text-accent font-bold text-xs hover:underline">Done</button>
                                    </div>
                                  ) : (
                                    <form onSubmit={handleBookingSubmit} className="space-y-2.5">
                                      <input required type="text" placeholder="Full Name"
                                        className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white"
                                        value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                                      <input required type="email" placeholder="Email Address"
                                        className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white"
                                        value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
                                      <div>
                                        <div className="grid grid-cols-3 gap-2">
                                          <select className="bg-white/10 border border-white/10 rounded-xl px-2 py-2.5 text-white text-xs focus:outline-none"
                                            value={formData.countryCode} onChange={e => handleCCChange(e.target.value)}>
                                            {["+61", "+91", "+1", "+44", "+971", "+65", "+60", "+94", "+84"].map(c => (
                                              <option key={c} value={c} className="bg-primary">{c}</option>
                                            ))}
                                          </select>
                                          <input required type="tel" placeholder="Phone"
                                            className={`col-span-2 bg-white/10 border rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none ${formErrors.phone ? 'border-red-400' : 'border-white/10 focus:border-white'}`}
                                            value={formData.phone} onChange={e => handlePhoneChange(e.target.value)} />
                                        </div>
                                        <FieldError message={formErrors.phone} />
                                      </div>
                                      <div className="relative w-full">
                                        <input
                                          type="text"
                                          readOnly
                                          placeholder="Select travel date"
                                          value={formData.date}
                                          onClick={() => setShowDatePicker(true)} // we'll open a custom picker
                                          className={`w-full bg-white/10 border rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none ${formErrors.date ? "border-red-400" : "border-white/10 focus:border-white"
                                            }`}
                                        />
                                        {/* Calendar icon */}
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none">
                                          📅
                                        </span>
                                        {/* Mobile-friendly placeholder */}
                                        {!formData.date && (
                                          <p className="text-white text-xs mt-1">Select a date</p>
                                        )}
                                        {/* Error message */}
                                        {formErrors.date && <FieldError message={formErrors.date} />}
                                      </div>
                                      <div className="grid grid-cols-3 gap-2">
                                        {[{ label: 'Adults', f: 'adults' }, { label: 'Children', f: 'children' }, { label: 'Infants', f: 'infants' }].map(({ label, f }) => (
                                          <div key={f}>
                                            <label className="text-[10px] text-white/70 mb-1 block">{label}</label>
                                            <input type="number" min={0} placeholder="0"
                                              className="w-full bg-white/10 border border-white/10 rounded-xl px-2 py-2 text-white text-sm focus:outline-none focus:border-white"
                                              value={(formData as any)[f]} onChange={e => setFormData(p => ({ ...p, [f]: e.target.value }))} />
                                          </div>
                                        ))}
                                      </div>
                                      <textarea placeholder="Special Requests" rows={2}
                                        className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white resize-none"
                                        value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />
                                      <div className="hidden"><input type="text" name="website" autoComplete="off" tabIndex={-1} value={formData.website} onChange={e => setFormData(p => ({ ...p, website: e.target.value }))} /></div>
                                      <button type="submit" disabled={bookingStatus === 'submitting' || !!formErrors.phone || !!formErrors.date}
                                        className="w-full bg-white text-black font-black py-3 rounded-xl hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50">
                                        {bookingStatus === 'submitting' ? 'Processing...' : <><MessageSquarePlus className="w-4 h-4" />Send Enquiry</>}
                                      </button>
                                    </form>
                                  )}
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                        {/* Mobile Sticky Book Now */}
                        <DatePicker
                          selected={formData.date ? new Date(formData.date) : null}
                          onChange={(date: Date | null) => {
                            if (date) handleDateChange(date.toISOString().split("T")[0]);
                            setShowDatePicker(false);
                          }}
                          minDate={new Date()}
                          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 5))}
                          placeholderText="Select a date"
                          inline={!isMobile} // inline for desktop only
                          withPortal={isMobile} // portal popup for mobile
                        />

                        {/* ✅ Mobile Sticky Bar */}
                        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-100 px-4 py-3 z-[90] flex items-center justify-between shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Starting from</span>
                            <span className="text-lg font-black text-primary">AUD${displayPrice.toLocaleString()}</span>
                          </div>
                          <button
                            onClick={() => setShowMobileForm(true)}
                            className="bg-accent text-white font-black px-6 py-2.5 rounded-xl shadow-lg shadow-accent/20 active:scale-95 transition-all flex items-center gap-2 text-sm"
                          >
                            <Calendar className="w-4 h-4" /> Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-1">
              <div id="booking-form" className="scroll-mt-28 bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="sticky top-24 space-y-6">

                  <div className="bg-primary p-5 rounded-2xl sm:rounded-3xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent opacity-10 rounded-full -mr-12 -mt-12" />
                    <div className="relative z-10">
                      <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1">Starting From</div>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl sm:text-3xl font-black text-white">AUD${displayPrice.toLocaleString()}</span>
                        <span className="text-slate-400 text-xs">/ person</span>
                      </div>


                      <h4 className="text-white font-bold mb-3 text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" /> Book This Tour
                      </h4>

                      {bookingStatus === 'success' ? (
                        <div className="text-center py-6">
                          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Check className="w-6 h-6 text-white" />
                          </div>
                          <h5 className="text-white font-bold mb-1">Enquiry Sent!</h5>
                          <p className="text-slate-400 text-xs">Our expert will contact you soon.</p>
                          <button onClick={() => setBookingStatus('idle')} className="mt-4 text-accent font-bold text-xs hover:underline">Make another booking</button>
                        </div>
                      ) : (
                        <form onSubmit={handleBookingSubmit} className="space-y-2.5">
                          <input required type="text" placeholder="Full Name"
                            className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white"
                            value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                          <input required type="email" placeholder="Email Address"
                            className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white"
                            value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
                          <div>
                            <div className="grid grid-cols-3 gap-2">
                              <select className="bg-white/10 border border-white/10 rounded-xl px-2 py-2.5 text-white text-xs focus:outline-none"
                                value={formData.countryCode} onChange={e => handleCCChange(e.target.value)}>
                                {["+61", "+91", "+1", "+44", "+971", "+65", "+60", "+94", "+84"].map(c => (
                                  <option key={c} value={c} className="bg-primary">{c}</option>
                                ))}
                              </select>
                              <input required type="tel" placeholder="Phone"
                                className={`col-span-2 bg-white/10 border rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none ${formErrors.phone ? 'border-red-400' : 'border-white/10 focus:border-white'}`}
                                value={formData.phone} onChange={e => handlePhoneChange(e.target.value)} />
                            </div>
                            <FieldError message={formErrors.phone} />
                          </div>
                          <div>
                            <input required type="date" min={todayStr()} max={maxDateStr()}
                              className={`w-full bg-white/10 border rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none ${formErrors.date ? 'border-red-400' : 'border-white/10 focus:border-white'}`}
                              value={formData.date} onChange={e => handleDateChange(e.target.value)} />
                            <FieldError message={formErrors.date} />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {[{ label: 'Adults', f: 'adults' }, { label: 'Children', f: 'children' }, { label: 'Infants', f: 'infants' }].map(({ label, f }) => (
                              <div key={f}>
                                <label className="text-[10px] text-white/70 mb-1 block">{label}</label>
                                <input type="number" min={0} placeholder="0"
                                  className="w-full bg-white/10 border border-white/10 rounded-xl px-2 py-2 text-white text-sm focus:outline-none focus:border-white"
                                  value={(formData as any)[f]} onChange={e => setFormData(p => ({ ...p, [f]: e.target.value }))} />
                              </div>
                            ))}
                          </div>
                          <textarea placeholder="Special Requests" rows={2}
                            className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white resize-none"
                            value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />
                          <div className="hidden"><input type="text" name="website" autoComplete="off" tabIndex={-1} value={formData.website} onChange={e => setFormData(p => ({ ...p, website: e.target.value }))} /></div>
                          <button type="submit" disabled={bookingStatus === 'submitting' || !!formErrors.phone || !!formErrors.date}
                            className="w-full bg-white text-black font-black py-3 rounded-xl hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50">
                            {bookingStatus === 'submitting' ? 'Processing...' : <><MessageSquarePlus className="w-4 h-4" />Send Enquiry</>}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                  <h4 className="font-bold text-primary mb-1 text-sm">Need Expert Help?</h4>
                  <p className="text-slate-500 text-xs mb-4">Our travel specialists are available 24/7.</p>
                  <div className="flex justify-center gap-3">
                    <a href="tel:+61" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all text-primary">
                      <ShieldCheck className="w-5 h-5" />
                    </a>
                    <a href="mailto:mail@maduratravel.com" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all text-primary">
                      <Info className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tours */}
          <div className="mt-16 sm:mt-24">
            <div className="flex items-end justify-between mb-8 sm:mb-12">
              <div>
                <span className="text-accent font-bold uppercase tracking-widest text-[10px] mb-1 block">Our Collection</span>
                <h2 className="text-lg sm:text-2xl font-bold text-primary">Similar Experiences</h2>
              </div>
              <Link to="/destinations" className="text-primary font-bold flex items-center gap-1.5 hover:text-accent transition-all group text-sm">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* ✅ Mobile: single col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.filter((t: any) => t.slug !== slug).slice(0, 3).map((t: any) => (
                <TourCard key={t.id || t.slug} tour={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Book Now */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-100 px-4 py-3 z-[90] flex items-center justify-between shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
        <div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Starting from</span>
          <span className="text-lg font-black text-primary">AUD${displayPrice.toLocaleString()}</span>
        </div>
        <button
          onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-accent text-white font-black px-6 py-2.5 rounded-xl shadow-lg shadow-accent/20 active:scale-95 transition-all flex items-center gap-2 text-sm"
        >
          <Calendar className="w-4 h-4" /> Book now
        </button>
      </div>
    </div>
  );
}