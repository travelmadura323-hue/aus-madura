import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, MapPin, Compass, Building2, Users, Phone, Mail, Award, Globe, Plane, Star, Quote } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tours } from '../data/mockData';
import TourCard from '../components/tours/TourCard';
import { cn } from '../lib/utils';

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "/images/2.png",
      title: "Discover Incredible India",
      subtitle: "Experience the royal heritage and natural beauty of the subcontinent."
    },
    {
      image: "/images/4.png",
      title: "Explore Southeast Asia",
      subtitle: "From the bustling streets of Singapore to the serene beaches of Vietnam."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Slider & Parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <motion.div style={{ y }} className="absolute inset-0">
              <img
                src="/src/images/1.png"
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </motion.div>
          </motion.div>
        ))}

        <motion.div 
          style={{ opacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 text-center"
        >
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-accent/20 backdrop-blur-md text-accent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-accent/30">
              Welcome to Madura Global
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
              {slides[currentSlide].title.split(' ').map((word, i) => (
                i === slides[currentSlide].title.split(' ').length - 1 ? 
                <span key={i} className="text-accent italic font-serif block md:inline">{word}</span> : 
                word + ' '
              ))}
            </h1>
            <p className="text-lg text-slate-200 max-w-2xl mx-auto mb-10">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-accent text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all flex items-center gap-2 group shadow-lg shadow-accent/20">
                Explore Destinations <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-accent text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all flex items-center gap-2 group shadow-lg shadow-accent/20">
                Explore India <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-accent text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all flex items-center gap-2 group shadow-lg shadow-accent/20">
                Explore Australia <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {/* <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all flex items-center gap-2">
                <Play className="w-5 h-5 fill-white" /> Explore India
              </button> */}
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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

      {/* Popular India Tours */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-accent font-bold uppercase tracking-widest text-xs mb-2 block">Domestic Highlights</span>
              <h2 className="text-4xl font-bold text-primary">Popular India Tours</h2>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:text-accent transition-colors group">
              View All India Tours <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
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
                image: 'https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?auto=format&fit=crop&w=600&h=400&q=80'
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
                image: '/src/images/4.png'
              }} />
            </motion.div>
          </div>
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
              { name: 'Vietnam', price: '850', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&h=800&q=80' },
              { name: 'Malaysia', price: '650', image: '/src/images/Gemini_Generated_Image_hkiwomhkiwomhkiw.png' },
              { name: 'Singapore', price: '950', image: 'https://images.unsplash.com/photo-1525625239514-75b4b17b9979?auto=format&fit=crop&w=600&h=800&q=80' },
              { name: 'Sri Lanka', price: '550', image: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&w=600&h=800&q=80' },
              { name: 'India', price: '350', image: 'https://images.unsplash.com/photo-1524492707947-519a51e33117?auto=format&fit=crop&w=600&h=800&q=80' }
            ].map((dest, idx) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-lg">
                  <img 
                    src={dest.image} 
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
            ))}
          </div>
        </div>
      </section>

      {/* SE Asia Section */}
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

      {/* Why Choose Us with Badges */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Why Choose Us?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              With over four decades of excellence, we are committed to providing the best travel experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              // { icon: <Award className="w-8 h-8" />, title: 'Kalaimamani Award', badge: '🏆' },
              { icon: <Globe className="w-8 h-8" />, title: '195+ Countries', badge: '🌍' },
              { icon: <Plane className="w-8 h-8" />, title: '4M+ Travelers', badge: '✈' },
              { icon: <Award className="w-8 h-8" />, title: '40+ Years', badge: '🏅' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-secondary p-8 rounded-2xl text-center border border-slate-100 flex flex-col items-center gap-4"
              >
                <div className="text-4xl">{item.badge}</div>
                <h3 className="text-lg font-bold text-primary">{item.title}</h3>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Compass className="w-10 h-10 text-accent" />, title: 'Expert Guidance', desc: 'Our travel experts have years of experience crafting the perfect itineraries.' },
              { icon: <Building2 className="w-10 h-10 text-accent" />, title: 'Corporate Standards', desc: 'We maintain the highest standards of service and reliability in the industry.' },
              { icon: <Users className="w-10 h-10 text-accent" />, title: 'Personalized Service', desc: 'Every trip is tailored to your specific needs and preferences.' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
                <p className="text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Note Section */}
      <section className="py-24 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative inline-block mb-8">
                <img 
                  src="https://picsum.photos/seed/founder/500/600" 
                  alt="Founder" 
                  className="rounded-2xl shadow-2xl relative z-10"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent rounded-2xl -z-0" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Quote className="w-16 h-16 text-accent mb-8 opacity-50" />
              <h2 className="text-4xl font-bold mb-6">A Message from Our Founder</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8 italic">
                "Travel is the only thing you buy that makes you richer. At Madura Travel Service, we don't just sell tickets; we craft experiences that stay with you forever. Our commitment to excellence and personalized service has been our guiding light for over 40 years."
              </p>
              <div>
                <div className="text-2xl font-bold text-accent">Dr. V.S. Murali</div>
                <div className="text-slate-400">Founder & Managing Director</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feedbacks Section */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">What Our Travelers Say</h2>
            <p className="text-slate-500">Real stories from real people who traveled with us.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Ananya Sharma', location: 'Delhi', text: 'The Kerala tour was absolutely magical. Everything from the houseboat to the tea gardens was perfectly organized.' },
              { name: 'Rahul Verma', location: 'Mumbai', text: 'Madura Travel made our Singapore family trip so easy. Highly recommend their services for international travel.' },
              { name: 'Priya Patel', location: 'Gujarat', text: 'The attention to detail in our Rajasthan heritage tour was impressive. We felt like royalty throughout the trip.' }
            ].map((feedback, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100"
              >
                <div className="flex gap-1 text-accent mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 mb-6 italic">"{feedback.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center font-bold text-primary">
                    {feedback.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-primary">{feedback.name}</div>
                    <div className="text-xs text-slate-400">{feedback.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Carousel Section */}
      <section className="py-24 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
          <span className="text-accent font-bold uppercase tracking-widest text-xs mb-2 block">Our Network</span>
          <h2 className="text-4xl font-bold text-primary">Our Trusted Partners & Affiliations</h2>
        </div>
        
        <div className="space-y-14">
          {/* Row 1: Left to Right */}
          <div className="flex gap-20 animate-marquee whitespace-nowrap">
            {[1,2,3,4,5,6,1,2,3,4,5,6].map((i, idx) => (
              <div key={idx} className="flex items-center justify-center  opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                <img 
                  src={`/images/gallery/img-${i}.jpg`} 
                  alt="Partner Logo" 
                  className="h-12 object-contain"
                />
              </div>
            ))}
          </div>

          {/* Row 2: Right to Left */}
          <div className="flex gap-20 animate-marquee-reverse whitespace-nowrap">
            {[1,2,3,4,5,6,1,2,3,4,5,6].map((i, idx) => (
              <div key={idx} className="flex items-center justify-center  opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                <img 
                  src={`/src/images/gallery/img-${i}.jpg`} 
                  alt="Partner Logo" 
                  className="h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
