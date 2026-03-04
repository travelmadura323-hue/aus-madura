import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TourCard from './TourCard';

interface DestinationPackagesProps {
    country: string;
    heroImage: string;
    tagline: string;
    description: string;
    features: Array<{ title: string; desc: string; icon: React.ReactNode }>;
    tours: any[];
    titlePrefix?: string;
}

const DestinationPackages: React.FC<DestinationPackagesProps> = ({
    country,
    heroImage,
    tagline,
    description,
    features,
    tours,
    titlePrefix = 'Explore'
}) => {
    return (
        <div className="pt-20 bg-slate-50 min-h-screen">
            {/* 🔹 Premium Hero Section */}
            <section className="relative h-[60vh] flex items-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img
                        src={heroImage}
                        alt={country}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="text-accent font-bold uppercase tracking-[0.4em] text-sm mb-6 block">
                            {tagline}
                        </span>
                        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
                            {titlePrefix} <span className="text-accent italic font-serif">{country}</span>
                        </h1>
                        <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
                            {description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 🔹 Quick Info Grid */}
            <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100"
                        >
                            <div className="text-accent mb-6 bg-accent/10 w-fit p-4 rounded-3xl">{feature.icon}</div>
                            <h3 className="text-2xl font-bold text-primary mb-3">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 🔹 Packages Section */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
                    <div>
                        <span className="text-accent font-bold uppercase tracking-widest text-[10px] mb-2 block">Our Collection</span>
                        <h2 className="text-4xl font-bold text-primary">Signature {country} Tours</h2>
                    </div>
                    <p className="text-slate-500 max-w-md text-right hidden md:block italic">
                        "Travel is the only thing you buy that makes you richer." - Experience {country} like never before.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                    {tours.map((tour: any, idx) => (
                        <motion.div
                            key={tour.id || tour.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <TourCard tour={tour} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 🔹 CTA Section */}
            <section className="pb-32 max-w-7xl mx-auto px-4">
                <div className="bg-primary rounded-[3.5rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready for an adventure in {country}?</h2>
                        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12">
                            Our travel experts are ready to craft your perfect itinerary. Handpicked hotels, exclusive experiences, and seamless travel.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link to="/contact">
                                <button className="bg-accent text-primary font-black px-12 py-5 rounded-2xl hover:bg-white transition-all transform hover:scale-105 shadow-xl shadow-accent/20">
                                    Plan Your Trip
                                </button>
                            </Link>
                            <Link to="/contact">
                                <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold px-12 py-5 rounded-2xl hover:bg-white/20 transition-all">
                                    Contact Specialist
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DestinationPackages;
