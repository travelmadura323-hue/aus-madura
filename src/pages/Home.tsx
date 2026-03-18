import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, MapPin, Compass, Building2, Users, Phone, Mail, Award, Globe, Plane, Star, Quote, Images, MessageCircle, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TourCard from '../components/tours/TourCard';
import { cn } from '../lib/utils';
import Chairmanimage from '../../images/VKT-BALAN.png';
import image from '../../images/image.png';
import TrendingDestinationsCarousel from '../components/carousels/TrendingDestinationsCarousel';
import TourCarousel from '../components/carousels/TourCarousel';
import TestimonialCarousel from '../components/carousels/TestimonialCarousel';
import ContactForm from '../components/ContactForm';
import EnquiryModal from '../components/EnquiryModal';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { destinations as mockDestinations, tours as mockTours } from '../data/mockData';
import { useTours } from '../hooks/useTours';
import { useDestinations } from '../hooks/useDestinations';

const cel = import.meta.glob('/images/celebrity/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const im = import.meta.glob('../../images/im/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const logos = [
  {
    image: im['../../images/im/Aussie1.png'],
    title: "Aussie Specialist",
    description: "An Aussie Specialist is a travel agent who has completed official training about Australia's destinations, attractions, and travel planning. This certification shows that the agent has expert knowledge of Australian travel."
  },
  {
    image: im['../../images/im/iaai.jpg'],
    title: "IAAI",
    description: "The Indian Association of Accredited Travel Agents (IAAI) is a professional organization representing accredited travel agencies in India. It works to promote high standards, professionalism, and ethical practices in the travel and tourism industry."
  },
  {
    image: im['../../images/im/download.png'],
    title: "Tourism Partner",
    description: "The Outbound Tour Operators Association of India (OTOAI) is a national organization that represents travel companies in India specializing in outbound tourism—helping Indian travelers visit destinations around the world."
  },
  {
    image: im['../../images/im/taai.png'],
    title: "TAAI",
    description: "The Travel Agents Association of India (TAAI) is one of the oldest and most respected travel industry organizations in India. It represents travel agencies, tour operators, and travel professionals across the country."
  },
  {
    image: im['../../images/im/Ministry of Tourism.jpg'],
    title: "Ministry of Tourism",
    description: "The Ministry of Tourism, Government of India is the central government body responsible for promoting, developing, and regulating tourism in India."
  }
];

const images = import.meta.glob('/images/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const gallery = import.meta.glob('/src/gallery/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const gal = import.meta.glob('/images/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const own = import.meta.glob('/images/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export default function Home() {
  const { tours: firestoreTours } = useTours();
  const { destinations: firestoreDestinations } = useDestinations();

  const tours = (firestoreTours && firestoreTours.length > 0) ? firestoreTours : (mockTours as any[]);
  const destinations = (firestoreDestinations && firestoreDestinations.length > 0) ? firestoreDestinations : (mockDestinations as any[]);

  const getStartingFromForDestination = (dest: any) => {
    const name = String(dest?.name || '').toLowerCase();
    const country = String(dest?.country || dest?.region || '').toLowerCase();
    const candidates = tours.filter((t: any) => {
      const loc = typeof t.location === 'string' ? t.location : (t.location?.country || '');
      const lc = String(loc).toLowerCase();
      return (name && lc.includes(name)) || (country && lc.includes(country));
    });
    const prices = candidates
      .map((t: any) => (typeof t.price === 'number' ? t.price : Number(t.price?.startingFrom ?? 0)))
      .filter((p: number) => Number.isFinite(p) && p > 0);
    const min = prices.length ? Math.min(...prices) : 0;
    const fallback = Number(dest?.price ?? 0);
    return String(min || fallback || 0);
  };

  // ✅ FIXED: Cleaner swipe state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = Math.abs(touchStartY.current - e.changedTouches[0].clientY);

    // Only trigger swipe if horizontal movement dominates
    if (Math.abs(deltaX) > minSwipeDistance && deltaY < 80) {
      if (deltaX > 0) {
        // Swipe Left → Next
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        // Swipe Right → Previous
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const [selectedLogo, setSelectedLogo] = useState<(typeof logos)[0] | null>(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const slides = [
    {
      image: images['/images/Meenachi amman temple.png'],
      label: 'EXPLORE',
      title: 'INDIA',
      subtitle: 'Discover India through its temple heritage, royal cities, sacred landscapes and regional cuisines — thoughtfully curated journeys designed for travellers from Australia.',
      buttons: [
        { text: 'Explore Journeys to India', link: '/destinations/india', primary: true },
        { text: 'Book a Free Travel Consultation', link: '#enquiry', primary: false },
      ]
    },
    {
      image: images['/images/vietnam.png'],
      label: 'EXPLORE',
      title: 'VIETNAM',
      subtitle: 'From lantern-lit heritage towns to dramatic coastlines and vibrant street cuisine, explore Vietnam through curated journeys crafted for modern travellers.',
      buttons: [
        { text: 'Explore Journeys to Vietnam', link: '/destinations/vietnam', primary: true },
        { text: 'Book a Free Travel Consultation', link: '#enquiry', primary: false },
      ]
    },
    {
      image: images['/images/Austra.png'],
      label: 'EXPLORE',
      title: 'AUSTRALIA',
      subtitle: "Experience Australia's iconic cities, ancient landscapes, coastal drives and celebrated wine regions through expertly curated journeys.",
      buttons: [
        { text: 'Explore Australia Journeys', link: '/destinations/australia', primary: true },
        { text: 'Book a Free Travel Consultation', link: '#enquiry', primary: true },
      ]
    },
    {
      image: images['/images/sri-lanka.png'],
      label: 'EXPLORE',
      title: 'SRI LANKA',
      subtitle: "Journey through ancient kingdoms, tea country hills, wildlife reserves and tropical coastlines across one of Asia's most captivating island destinations.",
      buttons: [
        { text: 'Explore Journeys to Sri Lanka', link: '/destinations/sri-lanka', primary: true },
        { text: 'Book a Free Travel Consultation', link: '#enquiry', primary: false },
      ]
    },
  ];

  // Auto slide
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  return (
    <div className="overflow-x-hidden pb-24 md:pb-0">

      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 select-none"
      >
        <div className="fixed bottom-6 right-6 z-50 md:hidden pb-[env(safe-area-inset-bottom)]">
          <motion.button onClick={() => setIsEnquiryModalOpen(true)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="bg-accent text-white p-4 min-w-[56px] min-h-[56px] rounded-full shadow-accent-premium flex items-center justify-center border-2 border-white/20 touch-manipulation">
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        </div>
 
        <EnquiryModal isOpen={isEnquiryModalOpen} onClose={() => setIsEnquiryModalOpen(false)} />
 
        {slides.map((slide, index) => (
          <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: currentSlide === index ? 1 : 0 }} transition={{ duration: 1 }} className="absolute inset-0 z-0">
            <motion.div style={{ y }} className="absolute inset-0">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover pointer-events-none" />
              <div className="absolute inset-0 bg-black/55" />
            </motion.div>
          </motion.div>
        ))}
 
        <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-24">
          <motion.div key={currentSlide} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div key={`t-${currentSlide}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "circOut" }} className="relative flex flex-col items-center justify-center py-10">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-black text-[15vw] leading-none uppercase select-none pointer-events-none whitespace-nowrap">{slides[currentSlide].title}</span>
              <div className="relative z-10 flex items-center gap-4 mb-6">
                <div className="h-[1px] w-8 md:w-16 bg-white/50" />
                <span className="text-white text-xs md:text-sm lg:text-base font-bold uppercase tracking-[1em] pl-[1em]">{slides[currentSlide].label}</span>
                <div className="h-[1px] w-8 md:w-16 bg-white/50" />
              </div>
              <motion.h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 0.8 }} className="relative z-10 font-black uppercase tracking-tighter text-white drop-shadow-[0_10px_40px_rgba(255,255,255,0.2)]">{slides[currentSlide].title}</motion.h1>
            </motion.div>
            <p className="text-lg text-white max-w-2xl mx-auto mb-10">{slides[currentSlide].subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {slides[currentSlide].buttons.map((btn, index) => {
                const isModal = btn.link === '#enquiry';
                const el = <button onClick={() => isModal && setIsEnquiryModalOpen(true)} className={btn.primary ? "bg-accent text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all flex items-center gap-2 group shadow-lg shadow-accent/20" : "bg-white/10 backdrop-blur-sm border border-white/40 text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all flex items-center gap-2 group"}>{btn.text}<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></button>;
                return isModal ? <React.Fragment key={index}>{el}</React.Fragment> : <Link key={index} to={btn.link}>{el}</Link>;
              })}
            </div>
          </motion.div>
        </motion.div>
 
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => <button key={i} onClick={() => setCurrentSlide(i)} className={cn("w-3 h-3 rounded-full transition-all", currentSlide === i ? "bg-accent w-8" : "bg-white/50")} />)}
        </div>
      </section>
 

      {/* ===== OUR ACCREDITATIONS ===== */}
      {/* ✅ FIXED: Added scroll-mt-24 to prevent navbar overlap + id for anchor */}
         {/* ACCREDITATIONS */}
         <section id="our-accreditations" className="scroll-mt-24 py-12 sm:py-16 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent font-bold uppercase tracking-[0.4em] text-xs mb-3 block">Official Certifications</span>
            <h2 className="text-[28px] sm:text-[32px] font-bold text-primary mb-4">Our Accreditations</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Recognized by leading tourism and aviation authorities worldwide, ensuring your travel experience meets the highest standards of quality and safety.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {logos.map((logo, index) => (
              <motion.div key={index} whileHover={{ y: -5, scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedLogo(logo)} className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 group">
                <img src={logo.image} alt={logo.title} className="h-16 sm:h-20 mx-auto object-contain transition-transform duration-300 group-hover:scale-110" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/company/our-story#our-accreditations" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors group">
              View all certifications <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TRENDING DESTINATIONS ===== */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div className="text-left">
              <h2 className="text-[24px] font-bold text-primary">Trending Destinations</h2>
            </div>
          </div>
          <TrendingDestinationsCarousel
            destinations={destinations
              .filter((d: any) => d.status !== 'Draft')
              .map((d: any) => ({
                id: d.id,
                name: d.name,
                price: getStartingFromForDestination(d),
                image: (d.images && d.images[0]) || (d.image as string) || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&h=800&q=80',
                link: `/destinations/${d.slug || d.id}`
              }))}
          />
        </div>
      </section>

      {/* ===== POPULAR INDIA TOURS ===== */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div className="text-left">
              <h2 className="text-[24px] font-bold text-primary">Popular India Tours</h2>
            </div>
            <Link
              to="/destinations/india" onClick={() => window.scrollTo(0, 0)}
              className="text-primary font-bold flex items-center gap-2 hover:text-accent transition-colors group self-end md:self-auto"
            >
              View All Tours
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <TourCarousel
            tours={tours
              .map((t: any) => ({
                ...t,
                image: t.image || (t.gallery && t.gallery[0]) || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&h=600&q=80',
                slug: t.slug || t.id,
              }))
              .filter((t: any) => (typeof t.location === 'string' ? t.location : t.location.country).toLowerCase().includes('india'))}
          />
        </div>
      </section>

      {/* ===== ICONIC AUSTRALIA ===== */}
      <section className="py-12 sm:py-16 lg:py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 px-4">
            <div className="text-center md:text-left">
              <h2 className="text-[24px] font-bold text-primary">Iconic Australia</h2>
            </div>
            <Link
              to="/destinations/australia" onClick={() => window.scrollTo(0, 0)}
              className="text-primary font-bold flex items-center gap-2 hover:text-accent transition-colors group self-end md:self-auto"
            >
              View All Tours
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <TourCarousel
            tours={tours
              .map((t: any) => ({
                ...t,
                image: t.image || (t.gallery && t.gallery[0]) || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&h=600&q=80',
                slug: t.slug || t.id,
              }))
              .filter((t: any) => {
                const loc = typeof t.location === 'string' ? t.location : t.location.country;
                return (loc || '').toLowerCase().includes('australia');
              })}
          />
        </div>
      </section>

      {/* ===== CHAIRMAN MESSAGE ===== */}
      <section className="py-12 sm:py-16 lg:py-24 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative inline-block mb-8">
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-32 h-32 md:w-48 md:h-48 bg-accent rounded-2xl z-0"></div>
                <img
                  src={Chairmanimage}
                  alt="Chairman V.K.T Balan"
                  className="relative z-10 w-full max-w-[280px] sm:max-w-xs md:max-w-md aspect-square object-cover rounded-2xl shadow-2xl border-4 border-white"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Quote className="w-12 h-12 md:w-16 md:h-16 text-white mb-6 md:mb-8" />
              <h2 className="text-2xl md:text-3xl text-white font-bold mb-6">A Message from Our Chairman</h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 italic">
                "For over four decades, we have carried the dreams of millions. Trusted by more than 4 million travelers, we believe travel is not merely a transaction — it is a responsibility. Every journey we create is guided by experience, care, and an uncompromising promise: client happiness and true value for every penny spent. This is not just our slogan; it is our promise."
              </p>
              <div>
                <div className="text-2xl text-[#cc1715] font-bold text-white">"Kalaimamani" V.K.T. Balan</div>
                <div className="text-slate-400">Chairman - Madura Travel Service (P) Ltd.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP MESSAGES ===== */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-accent font-bold uppercase tracking-[0.4em] text-xs mb-3 block">Leadership Insights</span>
            <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-bold text-primary mb-6">
              Message from our Managing Director and Director
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed px-4">
              Hear from the visionary leaders who guide our commitment to excellence in travel services,
              each bringing unique expertise and passion to create unforgettable journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {/* MD Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-slate-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/60"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/10 rounded-full blur-xl"></div>

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                <div className="flex-shrink-0">
                  <div className="relative flex justify-center">
                    <img
                      src={own["/images/Sri sir.jpeg"] as string}
                      alt="Managing Director"
                      className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-2xl object-cover border-4 border-accent/20 shadow-xl"
                    />
                  </div>
                  <div className="text-center mt-3">
                    <div className="font-bold text-primary text-lg">Mr. Sriharan Balan</div>
                    <div className="text-sm text-slate-500">Managing Director</div>
                    <div className="text-xs text-slate-400">Madura Global Australia</div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-primary">Message from Our MD</h3>
                      <div className="inline-block px-2 py-1 bg-accent/10 rounded-full mt-1">
                        <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Managing Director</span>
                      </div>
                    </div>
                  </div>

                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-accent/30 mb-4" />
                  <p className="text-slate-600 text-sm sm:text-lg leading-relaxed mb-6 italic">
                    <span className="font-bold">From the Desk of the Managing Director</span>
                    <br />
                    "We are delighted to expand our footprint beyond India and take our strong legacy of expertise, ethics, and service excellence to customers across the globe. At Madura Travel Service, our mission has always been to help people explore the world safely, comfortably, and with complete trust.
                    <br />
                    As a Ministry of Tourism–approved travel company from India, we are proud to have strong affiliations with several governments and tourism boards including Singapore, Malaysia, South Korea, the United Arab Emirates, Great Britain, Vietnam, and many more. We are also honored to be an official partner in tourism promotion initiatives with the Australian Government.
                    <br />
                    Having served over four million customers during the past four decades, our experience, industry knowledge, and global network position us strongly to serve travelers and partners in Australia and beyond.
                    <br />
                    We look forward to building lasting relationships and delivering exceptional travel experiences worldwide."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Director Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-slate-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                <div className="flex-shrink-0">
                  <div className="relative flex justify-center">
                    <img
                      src={own["/images/Guru sir.jpeg"] as string}
                      alt="Vice President"
                      className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-2xl object-cover border-4 border-primary/20"
                    />
                  </div>
                  <div className="text-center mt-3">
                    <div className="font-bold text-primary text-lg">Guru Chandar</div>
                    <div className="text-sm text-slate-500">Director</div>
                    <div className="text-xs text-slate-400">Madura Global Australia</div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-primary">Director's Note</h3>
                      <div className="inline-block px-2 py-1 bg-primary/10 rounded-full mt-1">
                        <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Director</span>
                      </div>
                    </div>
                  </div>

                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-primary/30 mb-4" />
                  <p className="text-slate-600 text-sm sm:text-lg leading-relaxed mb-6 italic">
                    "When we set out to build Madura Global Australia, the intention was simple — to create a travel platform people could truly trust.
                    In a world where travel choices are endless, what matters most is guidance you can rely on and experiences that are thoughtfully crafted. I believe journeys should do more than move people between destinations; they should connect cultures, inspire new perspectives, and bring people together.
                    From Australia, our focus is to curate meaningful travel experiences — from group journeys to corporate and incentive travel — across India, Asia, and beyond.
                    This is only the beginning of what we are building here. My vision is for Madura to become a trusted gateway for journeys that are not just well organised, but truly memorable."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <Link
              to="/company/our-story"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-3 bg-primary text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-accent transition-all shadow-lg hover:shadow-xl group text-sm sm:text-base"
            >
              <span>Read More About Us</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[32px] font-bold text-primary mt-6 mb-6">The Madura Advantage</h2>
          <span className="text-sm font-semibold tracking-[0.4em] text-red-500 uppercase">
            Experience. Quality. Trust.
          </span>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-20 mt-6">
            Join millions of happy travelers who trust Madura Travel Service (P) Ltd,
            one of India's leading travel companies. With over four decades of excellence,
            we craft unforgettable journeys backed by global expertise and personalized service.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {[
              { number: "4 M+", label: "Happy Travelers" },
              { number: "195+", label: "Countries Covered" },
              { number: "40+", label: "Years of Excellence" },
              { number: "10K+", label: "5-Star Client Ratings" }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#f3ece3] rounded-3xl p-8 md:p-14 shadow-sm hover:shadow-2xl transition-all duration-300 group"
              >
                <h3 className="text-3xl md:text-[32px] font-extrabold text-slate-900 mb-2 md:mb-4 group-hover:text-primary transition-colors">
                  {item.number}
                </h3>
                <p className="text-slate-700 text-lg font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACCREDITATION MODAL ===== */}
      {selectedLogo && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200]"
          onClick={() => setSelectedLogo(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative shadow-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedLogo(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >✕</button>
            <img src={selectedLogo.image} alt={selectedLogo.title} className="h-24 mx-auto mb-6 object-contain" />
            <h4 className="text-2xl font-bold text-primary mb-3">{selectedLogo.title}</h4>
            <p className="text-gray-600 leading-relaxed">{selectedLogo.description}</p>
          </motion.div>
        </div>
      )}

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-secondary to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
            <div className="text-left flex-1">
              <span className="text-sm tracking-[0.3em] uppercase text-accent font-semibold">Testimonials</span>
              <h2 className="text-[24px] font-extrabold text-primary mt-4 mb-2">What Our Travelers Say</h2>
              <p className="text-lg text-slate-500 leading-relaxed">Real stories from real people who trusted us to plan their journeys.</p>
            </div>
            <Link
              to="/company/testimonials" onClick={() => window.scrollTo(0, 0)}
              className="text-primary font-bold flex items-center gap-2 hover:text-accent transition-colors group shrink-0 self-end md:self-auto"
            >
              View All
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <TestimonialCarousel
            testimonials={[
              {
                name: "Mr.YB Wong Hon Wai",
                designation: "Minister of Tourism, Malaysia",
                text: "I'm Happy For the Arrangement by the Madura Travel Service For past two weeks.I have the opportunity to travel to a few places an interesting Attraction one other the Unesco monuments Chennai. I'm happy with the services rendered Thank you",
                image: gal["/images/YB.jpg"] as string
              },
              {
                name: "Mr. Anbil Mahesh",
                designation: "Minister for Education - Government of Tamilnadu",
                image: cel["/images/celebrity/Anbil mahesh.jpg"] as string,
                text: "I extend my heartfelt thanks to the entire Madura Travel Service team for their professional assistance in organizing international trips for the students of Tamil Nadu's government schools, helping them realize their dreams."
              },
              {
                name: "Mr. Napoleon",
                designation: "Cine Actor & Politician",
                image: cel["/images/celebrity/nepoleon.jpg"] as string,
                text: "Mr. Sriharan Balan and his exceptional team provided seamless service, taking on the monumental task of organizing my son's wedding in Tokyo, Japan, in November 2024, with absolute ease."
              },
              {
                name: "Mr. Kamal Haasan",
                designation: "Cine Actor & Director",
                image: cel["/images/celebrity/Kamalhasan.jpg"] as string,
                text: "Mr. V.K.T. Balan was more than just a travel consultant; he was a cherished friend and pillar of support throughout my decades-long journey in cinema, right from my early days."
              },
              {
                name: "Mr. Venkatesh Bhat",
                designation: "TCDC Fame & CEO, Accord Hotels",
                image: cel["/images/celebrity/Venkatesh-Bhat.jpg"] as string,
                text: "My long-standing association with Madura Travel Service has made my global travels seamless and stress-free. Their expertise in handling visas ensures timely approvals without any delays."
              },
              {
                name: "Mrs. P. Susheela",
                designation: "Legendary Singer",
                image: cel["/images/celebrity/susheela.jpg"] as string,
                text: "My journey with Madura Travel Service began when Mr. VKT Balan helped me obtain my first passport. Since then, he has been a constant support, helping me travel the world and share my voice globally."
              },
              {
                name: "Mr. Sandy",
                designation: "Dance Master",
                image: cel['/images/celebrity/sandy.jpg'] as string,
                text: "Mr. Sriharan Balan has been a tremendous support during my international shows. His professional team is always available 24/7, ensuring that my travel experiences are smooth and enjoyable."
              },
            ]}
          />
        </div>
      </section>

      {/* ===== TRUSTED CLIENTS LOGO CAROUSEL ===== */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 lg:mb-20 text-center">
          <span className="text-accent font-bold uppercase tracking-[0.4em] text-xs mb-3 block">Global Network</span>
          <h2 className="text-[24px] font-bold text-primary mb-6">Our Trusted Clients</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Collaborating with leading airlines, hotels, and tourism boards worldwide to deliver excellence.
          </p>
        </div>

        {/* Desktop Marquee */}
        <div className="hidden md:flex relative flex-col gap-12">
          <div className="flex w-full overflow-hidden select-none">
            <div className="flex min-w-full shrink-0 gap-12 items-center justify-around animate-marquee pause-on-hover">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((i) => (
                <div key={`logo-1-${i}`} className="w-40 h-20 flex items-center justify-center p-4 transition-all duration-500">
                  <img src={gallery[`/src/gallery/img-${i}.jpg`]} alt={`Partner ${i}`} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((i) => (
                <div key={`logo-1-dup-${i}`} className="w-40 h-20 flex items-center justify-center p-4 transition-all duration-500">
                  <img src={gallery[`/src/gallery/img-${i}.jpg`]} alt={`Partner ${i}`} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full overflow-hidden select-none">
            <div className="flex min-w-full shrink-0 gap-12 items-center justify-around animate-marquee pause-on-hover">
              {[19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33].map((i) => (
                <div key={`logo-2-${i}`} className="w-40 h-20 flex items-center justify-center p-4 transition-all duration-500">
                  <img src={gallery[`/src/gallery/img-${i}.jpg`]} alt={`Partner ${i}`} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
              {[19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33].map((i) => (
                <div key={`logo-2-dup-${i}`} className="w-40 h-20 flex items-center justify-center p-4 transition-all duration-500">
                  <img src={gallery[`/src/gallery/img-${i}.jpg`]} alt={`Partner ${i}`} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Logos */}
        <div className="md:hidden flex flex-col gap-6 overflow-hidden px-4">
          <div className="flex gap-6 w-max animate-marquee">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, index) => (
              <div key={index} className="w-24 h-16 flex items-center justify-center bg-slate-50 rounded-xl shrink-0">
                <img src={gallery[`/src/gallery/img-${i}.jpg`]} alt={`Partner ${i}`} className="max-h-12 object-contain" />
              </div>
            ))}
          </div>
          <div className="flex gap-6 w-max animate-marquee-reverse">
            {[10, 11, 12, 13, 14, 15, 16, 17, 18, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((i, index) => (
              <div key={index} className="w-24 h-16 flex items-center justify-center bg-slate-50 rounded-xl shrink-0">
                <img src={gallery[`/src/gallery/img-${i}.jpg`]} alt={`Partner ${i}`} className="max-h-12 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}