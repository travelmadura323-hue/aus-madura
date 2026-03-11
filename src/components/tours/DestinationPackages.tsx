import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TourCard from './TourCard';
import TourFilters from '../TourFilters';
interface DestinationPackagesProps {
    country: string;
    heroImage: string;
    tagline: string;
    description: string;
    features: Array<{ title: string; desc: string; icon: React.ReactNode }>;
    tours: any[];
    titlePrefix?: string;
}
const handleFilters = (filters: any) => {
    console.log("Filters selected:", filters);
};

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
                    <div className="absolute inset-0 bg-black/55" />
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="text-white font-bold uppercase tracking-[0.4em] text-xs md:text-base mb-6 block drop-shadow-lg">
                            {tagline}
                        </span>
                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight uppercase drop-shadow-2xl">
                            <span className="text-xl md:text-3xl lg:text-4xl block mb-2 opacity-90">{titlePrefix}</span>
                            <span className="text-white italic font-serif">{country}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
                            {description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 🔹 Quick Info Grid */}
            <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-xl border border-slate-100"
                        >
                            <div className="text-accent mb-6 bg-accent/10 w-fit p-3 md:p-4 rounded-2xl md:rounded-3xl">{feature.icon}</div>
                            <h3 className="text-xl md:text-[24px] font-bold text-primary mb-3">{feature.title}</h3>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 🔹 Packages Section */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 px-4 text-center md:text-left">
                    <div className="mb-6 md:mb-0">
                        <span className="text-accent font-bold uppercase tracking-widest text-[10px] mb-2 block">Our Collection</span>
                        <h2 className="text-3xl md:text-[40px] font-bold text-primary">Signature {country} Tours</h2>
                    </div>
                    <TourFilters
                        onFiltersChange={handleFilters}
                        showPrice={true}
                        showRating={true}
                        showDestination={false}
                        showDuration={false}
                    />
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

        </div>
    );
};

export default DestinationPackages;
