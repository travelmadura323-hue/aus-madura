import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
    name: string;
    text: string;
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
    return (
        <div className="w-full relative px-4 sm:px-0">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 }
                }}
                className="pb-16"
            >
                {testimonials.map((feedback, idx) => (
                    <SwiperSlide key={idx}>
                        <motion.div
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="h-full bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col justify-between relative"
                        >
                            <div className="absolute -top-5 left-6 bg-accent text-white px-3 py-1 rounded-full text-xl shadow-md">
                                “
                            </div>

                            <div className="flex gap-1 text-accent mt-6">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <p className="text-slate-600 text-sm leading-relaxed mt-4 flex-grow italic">
                                {feedback.text}
                            </p>

                            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-50">
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
