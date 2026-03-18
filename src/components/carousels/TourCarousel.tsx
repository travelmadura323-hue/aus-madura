import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import TourCard from '../tours/TourCard';
import 'swiper/css';
import 'swiper/css/pagination'; 
const im = import.meta.glob('/images/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',  
}) as Record<string, string>;

export default function TourCarousel({ tours }: { tours: any[] }) {
  return (
    <div className="w-full relative px-4 sm:px-0">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 16 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 3, spaceBetween: 32 }
        }}
        className="pb-12"
        style={{ paddingBottom: '3rem' }}
      >
        {tours.map((tour) => (
          <SwiperSlide key={tour.id} style={{ height: 'auto' }}>
            <div className="h-full">
              <TourCard tour={tour} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{`
        .swiper-slide {
          height: auto !important;
          display: flex !important;
        }
        .swiper-pagination-bullet-active {
          background: #cc1715 !important;
        }
      `}</style>
    </div>
  );
}
