import { FC } from "react";
import { motion } from "framer-motion";

const tourismImages: string[] = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da", // Taj Mahal
  "/images/5.png", // Temple architecture
  "https://images.unsplash.com/photo-1548013146-72479768bada", // Rajasthan Palace
  "https://images.unsplash.com/photo-1587474260584-136574528ed5", // Varanasi
  "/images/6.png", // Kerala
  "https://images.unsplash.com/photo-1514222134-b57cbb8ce073", // Hampi
  "https://images.unsplash.com/photo-1596176530529-78163a4f7af2", // Madurai
  "https://images.unsplash.com/photo-1566552881560-0be862a7c445", // Jaipur
];

const India = () => {
  return (
    <div className="bg-white text-neutral-800">

      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1564507592333-c60657eea523"
          alt="India Heritage"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-semibold text-white mb-6 leading-tight">
            India Is Experienced Through Its Layers.
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Temple architecture carved in stone. Royal courts that shaped dynasties.
            Sacred rivers, intricate rituals and living traditions carried forward for centuries.
          </p>
        </motion.div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-8 text-lg leading-relaxed text-neutral-700"
        >
          <p>
            India reveals itself gradually — through its regions, its heritage cities,
            its spiritual centres and its culinary traditions shaped by geography,
            trade and time.
          </p>

          <p>
            From monumental architecture to refined regional cuisines, every journey
            requires thoughtful sequencing — balancing immersion, comfort and
            cultural understanding.
          </p>

          <p>
            We design India journeys with precision and perspective, ensuring that
            each experience feels considered, immersive and seamless.
          </p>
        </motion.div>
      </section>

      {/* IMAGE GALLERY SECTION */}
      <section className="pb-24 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12">
          Discover India Through Its Heritage & Landscapes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {tourismImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl shadow-lg group"
            >
              <img
                src={`${image}?auto=format&fit=crop&w=900&q=80`}
                alt="India Tourism"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-neutral-900 text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8">
          Experience Travel With Depth and Structure.
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition">
            Explore Journeys to India
          </button>

          <button className="border border-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition">
            Book a Free Travel Consultation
          </button>
        </div>
      </section>

    </div>
  );
};

export default India;