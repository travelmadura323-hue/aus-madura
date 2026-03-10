import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

interface Testimonial {
    name: string;
    text: string;
    image: string;
    designation: string;
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
    return (
        <div className="w-full relative px-4 sm:px-0">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={32}
                slidesPerView={1}
                pagination={{ 
                    clickable: true,
                    el: '.testimonial-pagination',
                    bulletClass: 'testimonial-bullet',
                    bulletActiveClass: 'testimonial-bullet-active'
                }}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 24 },
                    768: { slidesPerView: 2, spaceBetween: 24 },
                    1024: { slidesPerView: 3, spaceBetween: 28 },
                    1280: { slidesPerView: 3, spaceBetween: 32 }
                }}
                className="pb-20"
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
            >
                {testimonials.map((feedback, idx) => (
                    <SwiperSlide key={idx}>
                        <motion.div
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="h-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col justify-between relative min-h-[320px]"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 text-accent mb-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 flex-grow italic line-clamp-4">
                                "{feedback.text}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center font-bold text-primary text-sm sm:text-base border-2 border-accent/20">
                                    {feedback.name[0]}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-primary text-sm sm:text-base">
                                        {feedback.name}
                                    </div>
                                    <div className="text-xs sm:text-sm text-slate-500 mt-1">
                                        {feedback.designation}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            {/* Custom Pagination */}
            <div className="testimonial-pagination flex justify-center gap-2 mt-8"></div>
            
            <style>{`
                .testimonial-bullet {
                    width: 8px !important;
                    height: 8px !important;
                    background: #cbd5e1 !important;
                    border-radius: 50% !important;
                    opacity: 1 !important;
                    transition: all 0.3s ease !important;
                    margin: 0 4px !important;
                }
                
                .testimonial-bullet-active {
                    width: 32px !important;
                    height: 8px !important;
                    background: #cc1715 !important;
                    border-radius: 4px !important;
                    transform: scale(1) !important;
                }
                
                .swiper-pagination {
                    position: relative !important;
                    margin-top: 1rem !important;
                    bottom: auto !important;
                }
            `}</style>
        </div>
    );
}
