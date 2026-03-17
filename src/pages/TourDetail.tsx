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
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

// ─── Wrapper: provides reCAPTCHA context ──────────────────────────────────────
export default function TourDetailWrapper() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
      <TourDetail />
    </GoogleReCaptchaProvider>
  );
}

// ─── Inner component: safely uses useGoogleReCaptcha ─────────────────────────
function TourDetail() {
  const { slug } = useParams();
  const { tour: firestoreTour, loading } = useTourBySlug(slug);
  const mockTour = tours.find((t: { slug?: string }) => t.slug === slug);
  const tour = firestoreTour || mockTour || tours[0];
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    date: '',
    travelers: '1',
    adults: '1',
    children: '0',
    infants: '0',
    message: '',
    website: ''
  });

  const [formErrors, setFormErrors] = useState<{ phone?: string; date?: string }>({});

  // ─── Validation helpers ────────────────────────────────────────────────────

  const validatePhone = (phone: string, countryCode: string): string | undefined => {
    const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
    if (!digits) return "Phone number is required.";

    const rules: Record<string, { min: number; max: number; label: string }> = {
      "+91":  { min: 10, max: 10, label: "Indian numbers must be 10 digits." },
      "+1":   { min: 10, max: 10, label: "US/Canada numbers must be 10 digits." },
      "+44":  { min: 10, max: 10, label: "UK numbers must be 10 digits." },
      "+61":  { min: 9,  max: 9,  label: "Australian numbers must be 9 digits." },
      "+971": { min: 9,  max: 9,  label: "UAE numbers must be 9 digits." },
      "+965": { min: 8,  max: 8,  label: "Kuwait numbers must be 8 digits." },
      "+966": { min: 9,  max: 9,  label: "Saudi numbers must be 9 digits." },
      "+968": { min: 8,  max: 8,  label: "Oman numbers must be 8 digits." },
      "+973": { min: 8,  max: 8,  label: "Bahrain numbers must be 8 digits." },
      "+974": { min: 8,  max: 8,  label: "Qatar numbers must be 8 digits." },
      "+880": { min: 10, max: 10, label: "Bangladesh numbers must be 10 digits." },
      "+60":  { min: 9,  max: 10, label: "Malaysian numbers must be 9–10 digits." },
      "+65":  { min: 8,  max: 8,  label: "Singapore numbers must be 8 digits." },
      "+62":  { min: 9,  max: 12, label: "Indonesian numbers must be 9–12 digits." },
      "+63":  { min: 10, max: 10, label: "Philippine numbers must be 10 digits." },
      "+90":  { min: 10, max: 10, label: "Turkish numbers must be 10 digits." },
      "+20":  { min: 10, max: 10, label: "Egyptian numbers must be 10 digits." },
      "+27":  { min: 9,  max: 9,  label: "South African numbers must be 9 digits." },
      "+39":  { min: 9,  max: 10, label: "Italian numbers must be 9–10 digits." },
      "+33":  { min: 9,  max: 9,  label: "French numbers must be 9 digits." },
      "+81":  { min: 10, max: 10, label: "Japanese numbers must be 10 digits." },
      "+82":  { min: 9,  max: 10, label: "Korean numbers must be 9–10 digits." },
      "+86":  { min: 11, max: 11, label: "Chinese numbers must be 11 digits." },
      "+852": { min: 8,  max: 8,  label: "Hong Kong numbers must be 8 digits." },
      "+7":   { min: 10, max: 10, label: "Russian numbers must be 10 digits." },
      "+49":  { min: 10, max: 11, label: "German numbers must be 10–11 digits." },
      "+31":  { min: 9,  max: 9,  label: "Dutch numbers must be 9 digits." },
      "+46":  { min: 9,  max: 9,  label: "Swedish numbers must be 9 digits." },
      "+47":  { min: 8,  max: 8,  label: "Norwegian numbers must be 8 digits." },
      "+48":  { min: 9,  max: 9,  label: "Polish numbers must be 9 digits." },
      "+358": { min: 9,  max: 10, label: "Finnish numbers must be 9–10 digits." },
    };

    const rule = rules[countryCode];
    if (rule) {
      if (digits.length < rule.min || digits.length > rule.max) return rule.label;
    } else {
      if (digits.length < 6 || digits.length > 15) return "Enter a valid phone number (6–15 digits).";
    }
    return undefined;
  };

  const validateDate = (date: string): string | undefined => {
    if (!date) return "Please select a travel date.";
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selected.getTime())) return "Invalid date.";
    if (selected < today) return "Travel date must be today or in the future.";
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 5);
    if (selected > maxDate) return "Please choose a date within the next 5 years.";
    return undefined;
  };

  const todayString = () => new Date().toISOString().split("T")[0];
  const maxDateString = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 5);
    return d.toISOString().split("T")[0];
  };

  // ─── Live field handlers ───────────────────────────────────────────────────

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
    setFormErrors(prev => ({ ...prev, phone: validatePhone(value, formData.countryCode) }));
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData(prev => ({ ...prev, countryCode: value }));
    if (formData.phone) {
      setFormErrors(prev => ({ ...prev, phone: validatePhone(formData.phone, value) }));
    }
  };

  const handleDateChange = (value: string) => {
    setFormData(prev => ({ ...prev, date: value }));
    setFormErrors(prev => ({ ...prev, date: validateDate(value) }));
  };

  // ─── Submit ────────────────────────────────────────────────────────────────

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website.trim() !== "") {
      console.log("Bot detected");
      return;
    }

    // Full validation on submit
    const phoneErr = validatePhone(formData.phone, formData.countryCode);
    const dateErr = validateDate(formData.date);
    if (phoneErr || dateErr) {
      setFormErrors({ phone: phoneErr, date: dateErr });
      return;
    }

    if (!executeRecaptcha) {
      alert("Security check not ready. Please wait a moment and try again.");
      return;
    }

    const captchaToken = await executeRecaptcha("tour_booking");
    setBookingStatus('submitting');

    try {
      const cleanedPhone = formData.phone.replace(/\D/g, "").replace(/^0+/, "");
      const phone = `${formData.countryCode}${cleanedPhone}`;

      const response = await fetch(import.meta.env.VITE_CRM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          phone,
          date: formData.date,
          enquiry: "Tours",
          nationality: "Australia",
          destination: `Tour Booking: ${tour.title}`,
          captchaToken: captchaToken || ""
        }).toString()
      });

      const text = await response.text();
      let result: any = null;
      try { result = text ? JSON.parse(text) : null; } catch { result = null; }

      if (!response.ok) throw new Error(result?.message || text || `CRM error: ${response.status}`);

      if (result?.success === true || response.ok) {
        setBookingStatus('success');
        setFormData({
          name: '', email: '', phone: '', countryCode: '+91',
          date: '', travelers: '1', adults: '1', children: '0',
          infants: '0', message: '', website: ''
        });
        setFormErrors({});
      } else {
        throw new Error(result?.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('Something went wrong. Please try again or contact us directly.');
      setBookingStatus('idle');
    }
  };

  // ─── Error message component ───────────────────────────────────────────────

  const FieldError = ({ message }: { message?: string }) =>
    message ? (
      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
        </svg>
        {message}
      </p>
    ) : null;

  // ─── Display helpers ───────────────────────────────────────────────────────

  const displayLocation = typeof tour.location === 'string'
    ? tour.location
    : `${tour.location.cities.join(', ')}`;

  const displayDuration = typeof tour.duration === 'string'
    ? tour.duration
    : `${tour.duration.days} Days / ${tour.duration.nights} Nights`;

  const displayPrice = typeof tour.price === 'number'
    ? tour.price
    : tour.price.startingFrom;

  const displayCurrency = 'AUD$';

  if (loading) {
    return (
      <div className="pt-28 flex items-center justify-center min-h-screen">
        <div className="text-slate-500">Loading tour...</div>
      </div>
    );
  }
  if (!tour) {
    return (
      <div className="pt-28 flex items-center justify-center min-h-screen">
        <div className="text-slate-500">Tour not found.</div>
        <Link to="/tours" className="ml-2 text-accent">Back to Tours</Link>
      </div>
    );
  }

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
          className="w-full h-full object-cover px-4 sm:px-0 rounded-[2rem] sm:rounded-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-end pb-8 sm:pb-16 px-6">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden sm:flex items-center gap-2 text-white/80 text-xs mb-6 bg-black/20 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/10"
            >
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium truncate max-w-[200px]">{tour.title}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-[32px] font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl uppercase leading-tight"
            >
              {tour.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 sm:gap-8 text-white"
            >
              <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10">
                <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
                <span className="text-sm sm:text-lg font-medium">{displayDuration}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10">
                <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
                <span className="text-sm sm:text-lg font-medium">{displayLocation}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 lg:py-20 relative z-10 -mt-6 sm:-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Main Content */}
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

              {/* Highlights */}
              <div className="bg-white p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h2 className="text-xl sm:text-[24px] font-bold text-primary mb-6 sm:mb-8 flex items-center gap-3">
                  <span className="w-2 h-6 sm:h-8 bg-accent rounded-full" />
                  Tour Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
              <div className="bg-white p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h2 className="text-xl sm:text-[24px] font-bold text-primary mb-6 flex items-center gap-3">
                  <span className="w-2 h-6 sm:h-8 bg-accent rounded-full" />
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
                    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1524492707947-2f85a1a24d3c?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80'
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

              {/* Inclusion / Exclusion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#191975]/5 p-10 rounded-[2.5rem] border border-[#191975]/20">
                  <h3 className="text-xl font-bold text-[#191975] mb-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#191975] rounded-2xl flex items-center justify-center text-white">
                      <Check className="w-5 h-5" />
                    </div>
                    What's Included
                  </h3>
                  <ul className="space-y-5 list-none">
                    {(tour.included || ['Premium Hotel Stay', 'Luxury Transportation', 'Guided Cultural Tours', 'Full Board Meals', 'Activity Charges']).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-[#191975] font-medium">
                        <Check className="w-5 h-5 shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-100 p-10 rounded-[2.5rem] border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-700 mb-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-400 rounded-2xl flex items-center justify-center text-white">
                      <X className="w-5 h-5" />
                    </div>
                    What's Excluded
                  </h3>
                  <ul className="space-y-5">
                    {(tour.excluded || ['International Airfare', 'Visa Processing Charges', 'Travel & Health Insurance', 'Additional Activities', 'Private Shopping']).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-red-600 font-medium">
                        <X className="w-5 h-5 shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQs */}
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

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">

                {/* Booking Card */}
                <div className="bg-primary p-5 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

                  <div className="relative z-10">
                    <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">Starting From</div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-[32px] font-black text-white">{displayCurrency}{displayPrice.toLocaleString()}</span>
                      <span className="text-slate-400 text-sm">/ person</span>
                    </div>

                    <div id="booking-form" className="bg-white/5 p-1 rounded-xl border border-white/10">
                      <h4 className="text-white font-bold mb-2 flex items-center gap-2">
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
                          <h5 className="text-white font-bold text-lg mb-2">Enquiry Sent!</h5>
                          <p className="text-slate-400 text-sm">Our expert will contact you soon.</p>
                          <button
                            onClick={() => setBookingStatus('idle')}
                            className="mt-6 text-accent font-bold text-sm hover:underline"
                          >
                            Make another booking
                          </button>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleBookingSubmit} className="space-y-3">

                          {/* Name */}
                          <input
                            required
                            type="text"
                            placeholder="Full Name"
                            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />

                          {/* Email */}
                          <input
                            required
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />

                          {/* Phone */}
                          <div>
                            <div className="grid grid-cols-3 gap-2">
                              <select
                                className="bg-white/10 border border-white/10 rounded-xl px-2 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors"
                                value={formData.countryCode}
                                onChange={(e) => handleCountryCodeChange(e.target.value)}
                              >
                                {["+91","+1","+44","+971","+965","+966","+968","+973","+974",
                                  "+880","+60","+65","+62","+63","+90","+20","+27","+39",
                                  "+33","+81","+82","+86","+852","+61","+7","+49","+31",
                                  "+46","+47","+48","+358"
                                ].map(code => (
                                  <option key={code} value={code} className="bg-primary">{code}</option>
                                ))}
                              </select>
                              <input
                                required
                                type="tel"
                                placeholder="Phone Number"
                                className={`col-span-2 bg-white/10 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none transition-colors ${
                                  formErrors.phone ? 'border-red-400' : 'border-white/10 focus:border-white'
                                }`}
                                value={formData.phone}
                                onChange={(e) => handlePhoneChange(e.target.value)}
                              />
                            </div>
                            <FieldError message={formErrors.phone} />
                          </div>

                          {/* Date */}
                          <div>
                            <input
                              required
                              type="date"
                              min={todayString()}
                              max={maxDateString()}
                              className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors ${
                                formErrors.date ? 'border-red-400' : 'border-white/10 focus:border-white'
                              }`}
                              value={formData.date}
                              onChange={(e) => handleDateChange(e.target.value)}
                            />
                            <FieldError message={formErrors.date} />
                          </div>

                          {/* Travelers */}
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { label: 'Adults', field: 'adults', min: 1 },
                              { label: 'Children', field: 'children', min: 0 },
                              { label: 'Infants', field: 'infants', min: 0 },
                            ].map(({ label, field, min }) => (
                              <div key={field}>
                                <label className="text-xs text-white/70 mb-1 block">{label}</label>
                                <input
                                  type="number"
                                  min={min}
                                  placeholder="0"
                                  className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-white"
                                  value={(formData as any)[field]}
                                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                />
                              </div>
                            ))}
                          </div>

                          {/* Message */}
                          <textarea
                            placeholder="Special Requests"
                            rows={3}
                            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white transition-colors resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          />

                          {/* Honeypot */}
                          <div className="hidden">
                            <input
                              type="text"
                              name="website"
                              autoComplete="off"
                              tabIndex={-1}
                              value={formData.website}
                              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            />
                          </div>

                          {/* Submit */}
                          <button
                            type="submit"
                            disabled={bookingStatus === 'submitting' || !!formErrors.phone || !!formErrors.date}
                            className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-accent/20 disabled:opacity-50"
                          >
                            {bookingStatus === 'submitting' ? 'Processing...' : (
                              <>
                                <MessageSquarePlus className="w-5 h-5" />
                                Send Enquiry
                              </>
                            )}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 text-center">Protected by reCAPTCHA</p>

                {/* Support Card */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
                  <h4 className="font-bold text-primary mb-2">Need Expert Help?</h4>
                  <p className="text-slate-500 text-sm mb-6">Our travel specialists are available 24/7 to help you.</p>
                  <div className="flex justify-center gap-4">
                    <a href="tel:+91" className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all text-primary">
                      <ShieldCheck className="w-6 h-6" />
                    </a>
                    <a href="mailto:mail@maduratravel.com" className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all text-primary">
                      <Info className="w-6 h-6" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Related Tours */}
          <div className="mt-32">
            <div className="flex items-end justify-between mb-16 px-4">
              <div>
                <span className="text-accent font-bold uppercase tracking-widest text-[10px] mb-2 block">Our Collection</span>
                <h2 className="text-[24px] font-bold text-primary">Similar Experiences</h2>
              </div>
              <Link to="/destinations" className="text-primary font-bold flex items-center gap-2 hover:text-accent transition-all group">
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

      {/* Mobile Sticky Book Now */}
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