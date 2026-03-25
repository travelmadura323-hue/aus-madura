import { motion, useAnimation, PanInfo } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttons?: Array<{
    text: string;
    link: string;
  }>;
}

interface HeroSectionProps {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();

  const minSwipeDistance = 80;
  const slideWidth = 100;

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isDragging) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, slides.length, isDragging]);

  // Animate to current slide
  useEffect(() => {
    controls.start({
      x: -currentSlide * slideWidth,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }
    });
  }, [currentSlide, controls]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipeThreshold = minSwipeDistance;

    if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > 500) {
      if (offset.x > 0) {
        // Swiped right - go to previous slide
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      } else {
        // Swiped left - go to next slide
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    } else {
      // Not enough swipe - snap back to current slide
      controls.start({
        x: -currentSlide * slideWidth,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30
        }
      });
    }
    setIsDragging(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        <motion.div
          className="flex h-full"
          animate={controls}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ width: `${slides.length * 100}%` }}
        >
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className="relative flex-shrink-0 w-full h-full"
              style={{ width: `${slideWidth}%` }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center text-white px-4 max-w-4xl mx-auto">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto"
                  >
                    {slide.subtitle}
                  </motion.p>

                  {slide.buttons && slide.buttons.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                      {slide.buttons.map((button, btnIndex) => (
                        <a
                          key={btnIndex}
                          href={button.link}
                          className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors duration-200 shadow-lg"
                        >
                          {button.text}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${currentSlide === index
                ? 'w-8 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Swipe Indicator for Mobile */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 md:hidden">
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 text-white/70 text-sm"
        >
          <div className="w-6 h-6 border-2 border-white/50 rounded-full flex items-center justify-center">
            <ChevronRight className="w-3 h-3" />
          </div>
          <span className="text-xs">Swipe to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
