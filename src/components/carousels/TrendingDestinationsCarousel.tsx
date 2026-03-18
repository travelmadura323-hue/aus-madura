import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const im = import.meta.glob('/images/*.{png,jpg,jpeg,svg}', {
    eager: true,
    import: 'default',
  }) as Record<string, string>;
interface Destination {
    id: string;
    name: string;
    price: string;
    image: string;
    link: string;
}

export default function TrendingDestinationsCarousel({ destinations }: { destinations: Destination[] }) {
    return (
        <div className="w-full relative group/carousel px-0">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                    el: '.trending-pagination',
                }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 5 }
                }}
                className="relative"
            >
                {destinations.map((dest, idx) => (
                    <SwiperSlide key={dest.id} className="pb-12">
                        <Link to={dest.link} onClick={() => window.scrollTo(0, 0)}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer relative"
                            >
                                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 shadow-xl bg-slate-100 ring-1 ring-black/5">
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                        loading="lazy"
                                    />
                                    {/* Premium Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                                    {/* Content inside Image */}
                                    <div className="absolute bottom-6 left-6 z-10">
                                        <div className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em] mb-2 drop-shadow-sm">
                                            Starting from
                                        </div>
                                        <div className="bg-accent text-white font-black px-4 py-1.5 rounded-xl shadow-xl inline-block text-xl transform group-hover:scale-110 transition-transform duration-500">
                                            AUD${dest.price}
                                        </div>
                                    </div>

                                    {/* Hover Action Indicator */}
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center px-2">
                                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300 tracking-tight">
                                        {dest.name}
                                    </h3>
                                    <div className="h-1 w-0 bg-accent mx-auto mt-2 transition-all duration-300 group-hover:w-12 rounded-full" />
                                </div>
                            </motion.div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* <div className="hidden md:block">
                <button className="trending-prev absolute left-[-20px] top-[40%] -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300 border border-slate-100 disabled:opacity-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="trending-next absolute right-[-20px] top-[40%] -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300 border border-slate-100 disabled:opacity-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div> */}

            {/* Custom Pagination Container - Centered and Spaced */}
            <div className="trending-pagination flex justify-center items-center gap-3 mt-4 h-8" />

            <style>{`
                .trending-pagination .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: #cbd5e1;
                    opacity: 1;
                    transition: all 0.3s ease;
                    margin: 0 !important;
                    border-radius: 4px;
                }
                .trending-pagination .swiper-pagination-bullet-active {
                    background: #cc1715;
                    width: 24px;
                }
            `}</style>
        </div>
    );
}
