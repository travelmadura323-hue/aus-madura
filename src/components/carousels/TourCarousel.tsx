import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import TourCard from '../tours/TourCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function TourCarousel({ tours }: { tours: any[] }) {
    return (
        <div className="w-full relative px-4 sm:px-0">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={32}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 }
                }}
                className="pb-12"
            >
                {tours.map((tour) => (
                    <SwiperSlide key={tour.id}>
                        <TourCard tour={tour} />
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
