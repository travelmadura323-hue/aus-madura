import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Destination {
    id: string;
    name: string;
    price: string;
    image: string;
    link: string;
}

export default function TrendingDestinationsCarousel({ destinations }: { destinations: Destination[] }) {
    return (
        <div className="w-full relative px-4 sm:px-0">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 5 }
                }}
                className="pb-12"
            >
                {destinations.map((dest, idx) => (
                    <SwiperSlide key={dest.id}>
                        <Link to={dest.link} onClick={() => window.scrollTo(0, 0)}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-lg bg-slate-100">
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                    <div className="absolute bottom-4 left-4 z-10">
                                        <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-1">Starting from</div>
                                        <div className="bg-accent text-white font-black px-3 py-1 rounded-lg shadow-xl inline-block text-lg">
                                            ${dest.price}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{dest.name}</h3>
                                </div>
                            </motion.div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            <style>{`
        .swiper-button-next, .swiper-button-prev {
          color: #cc1715 !important;
          background: rgba(255, 255, 255, 0.8);
          width: 40px !important;
          height: 40px !important;
          border-radius: 50%;
          transform: scale(0.8);
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .swiper-button-next::after, .swiper-button-prev::after {
          font-size: 18px !important;
          font-weight: bold;
        }
        .swiper-pagination-bullet-active {
          background: #cc1715 !important;
        }
      `}</style>
        </div>
    );
}
