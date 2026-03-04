import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, MapPin, Compass, Building2, Users, Phone, Mail, Award, Globe, Plane, Star, Quote, Images } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tours } from '../data/mockData';
import TourCard from '../components/tours/TourCard';
import { cn } from '../lib/utils';
// import motive == from 'framer-motion/client';
import Chairmanimage from '/images/VKT-BALAN.png';




// export default function Home() {
//   const heroRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"]
//   });
const images = import.meta.glob('/images/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});
const gallery = import.meta.glob('/src/gallery/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});


export default function Home() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // ✅ Slides = DATA ONLY
  const slides = [
    {
      image: images['/images/Temple1.png'],
      title: "Explore India",
      subtitle:
        "Curated India journeys from Australia — thoughtfully designed around history, culture and regional depth",
      buttons: [
        { text: "Explore Journeys to India", link: "/pages/india" }
      ]
    },
    {
      image: images['/images/landscape.png'],
      title: "Explore Australia",
      subtitle:
        "From coastlines to desert interiors, Australia revealed through thoughtful design and disciplined execution.",
      buttons: [
        { text: "Explore Australia Tours", link: "/pages/australia" }
      ]
    }
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
    <div className="overflow-x-hidden">
      <section
        ref={heroRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative h-[85vh] flex items-center justify-center overflow-hidden"
      >
        {/* Floating Consultation Button - Sliding Tab */}
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          whileHover={{ x: -10 }}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] hidden md:block"
        >
          <Link to="/contact">
            <button className=" w-48 h-20
        bg-accent
        text-primary
        rounded-2xl
        shadow-lg
        flex flex-col items-center justify-center
        gap-1
        transition-all duration-300
        hover:shadow-xl">
              <div className=" text-accent p-2 rounded-lg group-hover:bg-accent group-hover:text-white transition-colors">
              </div>
              <span className="whitespace-nowrap tracking-tight">Book a Free Consultation</span>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </button>
          </Link>
        </motion.div>

        {/* Mobile Floating Button */}
        <div className="fixed bottom-6 right-6 z-50 md:hidden">
          <Link to="/contact">
            <button className="bg-accent text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-white/20">
              <Phone className="w-6 h-6" />
            </button>
          </Link>
        </div>

        {/* Background Slides */}
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <motion.div style={{ y }} className="absolute inset-0">
              {/* ✅ Dynamic Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </motion.div>
          </motion.div>
        ))}

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 text-center pt-10"
        >
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* <span className="inline-block bg-accent/20 backdrop-blur-md text-accent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-accent/30">
              Welcome to Madura Global
            </span> */}

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
              {slides[currentSlide].title.split(" ").map((word, i, arr) =>
                i === arr.length - 1 ? (
                  <span
                    key={i}
                    className="text-accent italic font-serif block md:inline"
                  >
                    {word}
                  </span>
                ) : (
                  word + " "
                )
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-200 max-w-2xl mx-auto mb-10">
              {slides[currentSlide].subtitle}
            </p>

            {/* ✅ Dynamic Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {slides[currentSlide].buttons.map((btn, index) => (
                <Link key={index} to={btn.link}>
                  <button className="bg-accent text-white font-bold px-8 py-4 rounded-full  hover:bg-white hover:text-primary transition-all flex items-center gap-2 group shadow-lg shadow-accent/20 ">
                    {btn.text}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1  transition-transform" />
                  </button>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20 mt -3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                currentSlide === i ? "bg-accent w-8" : "bg-white/50"
              )}
            />
          ))}
        </div>
      </section>
      {/* Trending Destinations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent font-bold uppercase tracking-widest text-xs mb-2 block">Global Favorites</span>
            <h2 className="text-4xl font-bold text-primary">Trending Destinations</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { id: 'vietnam', name: 'Vietnam', price: '850', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&h=800&q=80', link: '/pages/vietnam' },
              { id: 'malaysia', name: 'Malaysia', price: '650', image: images['/images/Gemini_Generated_Image_hkiwomhkiwomhkiw.png'], link: '/pages/malaysia' },
              { id: 'singapore', name: 'Singapore', price: '950', image: images['/images/Gemini_Generated_Image_4sxymo4sxymo4sxy.png'] as string, link: '/pages/singapore' },
              { id: 'sri-lanka', name: 'Sri Lanka', price: '550', image: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&w=600&h=800&q=80', link: '/pages/sri-lanka' },
              { id: 'india', name: 'India', price: '350', image: images['/images/11.png'], link: '/pages/india' }
            ].map((dest, idx) => (
              <Link key={dest.id} to={dest.link} onClick={() => window.scrollTo(0, 0)}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-lg">
                    <img
                      src={dest.image as string}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Price Badge - Bottom Left */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-1">Starting from</div>
                      <div className="bg-accent text-white font-black px-3 py-1 rounded-lg shadow-xl inline-block text-lg">
                        ${dest.price}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{dest.name}</h3>
                    <div className="w-8 h-1 bg-accent mx-auto mt-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Popular India Tours */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-accent font-bold uppercase tracking-widest text-xs mb-2 block">International Highlights</span>
              <h2 className="text-4xl font-bold text-primary">Popular India Tours</h2>
            </div>
            <Link
              to="/pages/india" onClick={() => window.scrollTo(0, 0)}
              className="text-primary font-bold flex items-center gap-2 hover:text-accent transition-colors group"
            >
              View All India Tours
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tours.filter(t => t.id.includes('kerala') || t.id.includes('rajasthan')).map((tour, idx) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <TourCard tour={tour} />
              </motion.div>
            ))}
            {/* Added mock cards for variety */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <TourCard tour={{
                slug: 'kashmir-paradise',
                title: 'Kashmir Paradise Escape',
                location: 'Kashmir, India',
                duration: '6 Days / 5 Nights',
                price: 950,
                image: images['/images/Gemini_Generated_Image_54pojh54pojh54po.png'] as string,
              }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <TourCard tour={{
                slug: 'golden-triangle',
                title: 'Golden Triangle Special',
                location: 'Delhi, Agra, Jaipur',
                duration: '5 Days / 4 Nights',
                price: 750,
                image: images['/images/2.png'] as string,
              }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Australia Specials - Highlight the 5 new tours */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 px-4">
            <div>
              <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-2 block">Exclusive Feature</span>
              <h2 className="text-4xl md:text-5xl font-black text-primary">Iconic Australia </h2>
            </div>
            <p className="text-slate-500 max-w-sm text-right hidden md:block italic">
              Explore the Great Outback, the Great Barrier Reef, and the vibrant cities of the land down under.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {tours.filter((t: any) => {
              const loc = typeof t.location === 'string' ? t.location : t.location.country;
              return loc.toLowerCase().includes('australia');
            }).map((tour, idx) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <TourCard tour={tour} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/seasia/1920/1080"
            alt="SE Asia"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore the Wonders of Southeast Asia</h2>
              <p className="text-slate-300 mb-10 text-lg">
                Immerse yourself in the vibrant cultures, stunning landscapes, and culinary delights of Vietnam, Singapore, Malaysia, and beyond.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                {['Vietnam', 'Singapore', 'Malaysia', 'Sri Lanka'].map(c => (
                  <div key={c} className="flex items-center gap-3 text-white font-bold">
                    <div className="w-2 h-2 bg-accent rounded-full" /> {c}
                  </div>
                ))}
              </div>
              <button className="bg-accent text-primary font-bold px-10 py-4 rounded-full hover:bg-white transition-all">
                Explore International Packages
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl overflow-hidden h-64 shadow-2xl">
                <img src="https://picsum.photos/seed/v1/400/400" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl overflow-hidden h-64 shadow-2xl mt-8">
                <img src="https://picsum.photos/seed/v2/400/400" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="py-24 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative inline-block mb-8">

                {/* Red box */}
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent rounded-2xl z-0"></div>

                {/* Image */}
                <img
                  src={Chairmanimage}
                  alt="Chairman V.K.T Balan"
                  className="relative z-10 w-80 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white"
                />

              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Quote className="w-16 h-16 text-accent mb-8 opacity-50" />
              <h2 className="text-4xl font-bold mb-6">A Message from Our Chairman</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8 italic">
                "For over four decades,we have carried the dreams of millions .Trusted by more than 4 million travelers,we believe travel is not a transaction,it is a responsibility.Every journey we create is backed by experience,care,and an uncompromising promise: Client happiness and true value for every penny spent.This is not our slogan ;it is our promise."
              </p>
              <div>
                <div className="text-2xl font-bold text-accent">Kalaimamani<span className="ml-2">V.K.T Balan</span></div>
                <div className="text-slate-400">Chairman</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us with Badges */}
      <section className="py-28 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">

          {/* Top Tagline */}
          <span className="text-sm font-semibold tracking-[0.4em] text-red-500 uppercase">
            Experience. Quality. Trust.
          </span>

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-bold text-primary mt-6 mb-6">
            Advantage of Choosing Us
          </h2>

          {/* Description */}
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-20">
            Join millions of happy travelers who trust Madura Travel Service (P) Ltd,
            one of India’s leading travel companies. With over four decades of excellence,
            we craft unforgettable journeys backed by global expertise and personalized service.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { number: "4M+", label: "Happy Travelers" },
              { number: "28K+", label: "Destinations Covered" },
              { number: "40+", label: "Years of Excellence" },
              { number: "200K+", label: "5-Star Client Ratings" }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#f3ece3] rounded-3xl p-14 shadow-sm hover:shadow-2xl transition-all duration-300 group"
              >
                <h3 className="text-6xl font-extrabold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                  {item.number}
                </h3>
                <p className="text-slate-700 text-lg font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Feedbacks Section */}
      <section className="py-32 bg-gradient-to-b from-secondary to-white">
        <div className="max-w-7xl mx-auto px-6">


          {/* Header */}
          <div className="relative mb-16">

            {/* View All - aligned with Testimonials label */}
            <div className="absolute right-0 top-6">
              <Link
                to="/company/testimonials" onClick={() => window.scrollTo(0, 0)}
                className="text-primary font-bold flex items-center gap-2 hover:text-accent transition-colors group"
              >
                View All
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Center Content */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm tracking-[0.3em] uppercase text-accent font-semibold">
                Testimonials
              </span>

              <h2 className="text-5xl font-extrabold text-primary mt-4 mb-6">
                What Our Travelers Say
              </h2>

              <p className="text-lg text-slate-500 leading-relaxed">
                Real stories from real people who trusted us to plan their journeys.
              </p>
            </div>

          </div>


          {/* Testimonials Data */}
          {(() => {
            const testimonials = [
              {
                name: "S. Vijay",
                text: "We had a wonderful experience for our Sri Lanka trip. All arrangements were seamless and Mr. Sudharsan ensured we were comfortable throughout."
              },
              {
                name: "Hariharan Balasubramanian",
                text: "Systematic and careful VISA processing. Timely updates were provided and my family is delighted with the customer service."
              },
              {
                name: "Subhashini Srivatsan",
                text: "Excellent, personalised, professional and patient service by Ms. Deepa and her team."
              },
              {
                name: "Jagadeesh Jayaraman",
                text: "They understood our requirements perfectly and gave us a well-planned tour. Wonderful coordination and experience!"
              }
            ]

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {testimonials.map((feedback, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-square bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col justify-between relative"
                  >
                    {/* Quote */}
                    <div className="absolute -top-5 left-6 bg-accent text-white px-3 py-1 rounded-full text-xl shadow-md">
                      “
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 text-accent mt-6">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-slate-600 text-sm leading-relaxed mt-4">
                      {feedback.text}
                    </p>

                    {/* User */}
                    <div className="flex items-center gap-3 mt-6">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-bold text-primary text-sm">
                        {feedback.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-primary text-sm">
                          {feedback.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          Verified Traveler
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )
          })()}

        </div>
      </section>

      {/* Logo Carousel Section */}
      <section className="py-24 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-20 text-center">
          <span className="text-accent font-bold uppercase tracking-[0.4em] text-xs mb-3 block">Global Network</span>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">Our Trusted Partners</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Collaborating with leading airlines, hotels, and tourism boards worldwide to deliver excellence.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative flex flex-col gap-12">
          {/* Row 1 */}
          <div className="flex w-full overflow-hidden select-none">
            <div className="flex min-w-full shrink-0 gap-12 items-center justify-around animate-marquee">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={`logo-1-${i}`} className="w-40 h-20 flex items-center justify-center p-4  transition-all duration-500">
                  <img
                    src={gallery[`/src/gallery/img-${i}.jpg`]}
                    alt={`Partner ${i}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
              {/* Duplicate for seamless effect */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={`logo-1-dup-${i}`} className="w-40 h-20 flex items-center justify-center p-4  transition-all duration-500">
                  <img
                    src={gallery[`/src/gallery/img-${i}.jpg`]}
                    alt={`Partner ${i}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 (Reverse) */}
          <div className="flex w-full overflow-hidden select-none">
            <div className="flex min-w-full shrink-0 gap-12 items-center justify-around animate-marquee-reverse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={`logo-2-${i}`} className="w-40 h-20 flex items-center justify-center p-4   transition-all duration-500">
                  <img
                    src={gallery[`/src/gallery/img-${i}.jpg`]}
                    alt={`Partner ${i}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
              {/* Duplicate for seamless effect */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={`logo-2-dup-${i}`} className="w-40 h-20 flex items-center justify-center p-4  transition-all duration-500">
                  <img
                    src={gallery[`/src/gallery/img-${i}.jpg`]}
                    alt={`Partner ${i}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Grid (Static on Small Screens for Stability) */}
        <div className="md:hidden mt-16 px-6">
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`mobile-logo-${i}`} className="bg-slate-50 rounded-2xl p-6 flex items-center justify-center h-24 border border-slate-100">
                <img
                  src={gallery[`/src/gallery/img-${i}.jpg`]}
                  alt={`Partner ${i}`}
                  className="max-w-full max-h-full object-contain opacity-70"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
