import React, { useState, useEffect } from "react";
import { Award, Globe, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const images = import.meta.glob('../../images/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const gal = import.meta.glob('../gallery/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const im = import.meta.glob('../../images/im/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const accreditationDetails = [
  {
    image: im['../../images/im/iaai.jpg'],
    title: "IAAI",
    description: "Indian Association of Tour Operators (IAAI) is a premier organization representing tour operators and travel agencies in India, promoting ethical business practices and professional standards in the tourism industry.",
  },
  {
    image: im['../../images/im/download.png'],
    title: "Ministry of Tourism",
    description: "Official recognition from India's Ministry of Tourism, certifying our commitment to promoting tourism and maintaining high standards in travel services.",
  },
  {
    image: im['../../images/im/taai.png'],
    title: "TAAI",
    description: "Travel Agents Association of India (TAAI) is one of the oldest and most respected associations of travel agents in India, ensuring professional excellence and consumer protection.",
  },
  {
    image: im['../../images/im/tafi.jpg'],
    title: "TAFI",
    description: "Travel Agents Federation of India (TAFI) is a national body representing travel agents and tour operators, working towards the growth and development of the travel industry in India.",
  },
];

export default function OurStoryPage() {
  const [selectedLogo, setSelectedLogo] = useState<any>(null);
  const location = useLocation();

  // ✅ Scroll with navbar offset
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.replace("#", ""));
        if (el) {
          const navbarHeight = 96;
          const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 150);
    }
  }, [location]);

  return (
    <div className="pt-25 -mt-15 sm:pt-28">

      {/* ── Hero ── */}
      <div className="bg-primary py-12 sm:py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">About Us</span>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">Our Story</h1>
          <p className="mt-4 text-white/80 leading-relaxed">
            From a passion for travel to a premium global travel agency, discover the journey that shaped Madura Global.
          </p>
        </div>
      </div>

      {/* ── Vision / Mission ── */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ✅ MOBILE: single col, centered text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "👁️", title: "Our Vision", text: "To be the foremost global travel company, enriching lives through unforgettable experiences and pioneering innovation in the travel industry." },
              { icon: "🏆", title: "Our Mission", text: "Strive to cultivate meaningful connections, promote cultural understanding, and foster sustainable tourism practices while delivering unparalleled value to our clients." },
              { icon: "⚛️", title: "Our Core Values", text: "Embracing innovation, prioritizing honesty, accountability, and professionalism while fostering inclusivity and teamwork." },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 text-center hover:shadow-xl transition">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full text-2xl">{item.icon}</div>
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Content ── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* ✅ MOBILE: image goes below text, both full width */}
          <div className="grid items-start gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-2">
            <div>
              <h4 className="text-2xl sm:text-3xl font-bold text-foreground">Discover about Madura Global</h4>

              <h6 className="text-xl sm:text-2xl text-primary mt-4 font-semibold">Establishment</h6>
              <p className="mt-3 leading-relaxed text-muted-foreground text-sm sm:text-base">
                Madura Global is a premium travel and advisory platform connecting Australia with India and select international destinations through curated, intelligently designed journeys. Built upon the 40-year legacy of Madura Travel Service (P) Ltd in India, our foundation is rooted in operational depth, long-standing regional partnerships and multi-generational expertise.
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground text-sm sm:text-base">
                We specialise in crafting structured travel experiences that balance cultural authenticity with refined execution. From heritage landscapes and spiritual circuits to contemporary luxury itineraries, every journey is thoughtfully designed for Australian travellers seeking clarity, comfort and meaningful engagement.
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground text-sm sm:text-base">
                Madura Global does not operate as a transactional tour reseller. We function as a strategic bridge — combining Australian consultation standards with on-ground precision across India and beyond.
              </p>

              <h6 className="text-xl sm:text-2xl text-primary mt-6 font-semibold">Awards & Recognition</h6>
              <p className="mt-3 leading-relaxed text-muted-foreground text-sm sm:text-base">
                Over the years, our company has earned recognition from numerous esteemed government and private institutions. We are honored to have received the prestigious Kalaimamani Award from the Government of Tamil Nadu. We also secured two Limca Records for orchestrating the largest cultural groups from India to destinations worldwide, and pioneering the entry into the digital market during the early 2000s.
              </p>

              <h6 className="text-xl sm:text-2xl text-primary mt-6 font-semibold">Travel & Visa</h6>
              <p className="mt-3 leading-relaxed text-muted-foreground text-sm sm:text-base">
                Your trusted travel partner in seamless travel experiences for over 39 years. Established in 1986, we have been committed to providing unparalleled service for both international and domestic Air Ticketing, Train and Bus Services & Cruise Transport and expertise in visa facilitation across 195 Countries.
              </p>

              <h6 className="text-xl sm:text-2xl text-primary mt-6 font-semibold">Tourism and Ancillary Services</h6>
              <p className="mt-3 leading-relaxed text-muted-foreground text-sm sm:text-base">
                Your premier choice for unforgettable travel experiences backed by 39 years of expertise and the esteemed approval of the Ministry of Tourism, Government of India. We have been dedicated to curating exceptional journeys for millions of passengers including Families, Honeymooners, Corporate & Business travellers, Solo Travellers, Student Educational Trips and many more.
              </p>
            </div>

            {/* ✅ MOBILE: full width, auto height */}
            <div className="w-full overflow-hidden rounded-2xl">
              <img
                src={images['../../images/Group1.jpeg'] as string}
                alt="Our team on a tour"
                className="w-full h-auto object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Clients ── */}
      <section className="py-8 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-14">
            <h4 className="text-sm font-semibold tracking-widest text-[#cc1715] uppercase mb-3">Our Esteemed Clients</h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#191975] mb-4">Trusted by the Best</h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-base sm:text-lg leading-relaxed">
              Join millions of happy travelers who trust Madura Travel Service (P) Ltd., one of India's leading travel companies.
            </p>
          </div>
          {/* ✅ MOBILE: 2 cols with tighter padding */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8">
            {Array.from({ length: 40 }).map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-3 sm:p-6 flex items-center justify-center hover:shadow-md transition">
                <img
                  src={gal[`../gallery/img-${index + 1}.jpg`] as string}
                  alt={`Client ${index + 1}`}
                  className="max-h-16 sm:max-h-28 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards & Recognitions ── */}
      <section className="py-12 sm:py-24 bg-gray-50">
        {/* ✅ MOBILE: centered, correct padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900 mb-10 sm:mb-16">
            Awards & Recognitions
          </h2>

          {/* Top Logos — ✅ MOBILE: column, gap fixed */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-12 sm:mb-24">
            <img src={im['../../images/im/rsh_100cg_truem-4.png']} alt="Incredible India" className="h-20 sm:h-24 object-contain" />
            <img src={im['../../images/im/rsh_100cg_truem-10.jpeg']} alt="Enchanting Tamil Nadu" className="h-20 sm:h-24 object-contain" />
          </div>

          {/* Government Recognitions */}
          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-indigo-900 mb-8 sm:mb-12">
            Government Recognitions
          </h3>
          {/* ✅ MOBILE: 2 cols */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-10 max-w-6xl mx-auto mb-12 sm:mb-24">
            {[
              { img: im['../../images/im/111.png'], label: "Primary Host" },
              { img: im['../../images/im/22-1.png'], label: "Record Holder" },
              { img: im['../../images/im/33-1.png'], label: "M.I.C.E Leader" },
              { img: im['../../images/im/44-1.png'], label: "Record Holder" },
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <img src={item.img} alt={item.label} className="h-14 sm:h-20 mx-auto mb-3 sm:mb-6 object-contain" />
                <span className="inline-block px-2 sm:px-4 py-1 sm:py-2 text-indigo-900 border border-indigo-200 rounded-full font-semibold text-xs sm:text-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Subsidiaries — ✅ MOBILE: wrap properly with gap */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 mb-8 sm:mb-16">
            Our Subsidiaries
          </h3>
          {/* ✅ Subsidiaries with card background — matches accreditations style */}
          <div className="max-w-5xl mx-auto mb-12 sm:mb-24">
            {/* Mobile: row1 = 3, row2 = 2 centered */}
            <div className="flex flex-col gap-4 sm:hidden">
              <div className="flex justify-center gap-4">
                {[
                  im['../../images/im/rsh_100cg_true.png'],
                  im['../../images/im/MADURAGLOBALIMMIGRATION-300x300.png'],
                  im['../../images/im/madura-intitute-300x300.png'],
                ].map((logo, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-slate-100 flex items-center justify-center w-24 h-24">
                    <img src={logo} alt="Subsidiary" className="h-14 w-auto object-contain" />
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4">
                {[
                  im['../../images/im/Madura-Global-Logo-150x150.png'],
                  im['../../images/im/111.png'],
                ].map((logo, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md border border-slate-100 flex items-center justify-center w-24 h-24">
                    <img src={logo} alt="Subsidiary" className="h-14 w-auto object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: all 5 in one row with cards */}
            <div className="hidden sm:flex justify-center items-center gap-15">
              {[
                im['../../images/im/rsh_100cg_true.png'],
                im['../../images/im/MADURAGLOBALIMMIGRATION-300x300.png'],
                im['../../images/im/madura-intitute-300x300.png'],
                im['../../images/im/Madura-Global-Logo-150x150.png'],
                im['../../images/im/111.png'],
              ].map((logo, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-slate-100 flex items-center justify-center w-36 h-36 transition-all duration-300 group">
                  <img src={logo} alt="Subsidiary" className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div> 
          <section id="our-accreditations" className="scroll-mt-28 py-8 sm:py-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 mb-8 sm:mb-12">
              Our Accreditations
            </h3>
            {/* ✅ MOBILE: 2 cols */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {accreditationDetails.map((logo, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLogo(logo)}
                  className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <img src={logo.image} alt={logo.title} className="h-14 sm:h-20 mx-auto object-contain" />
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* ── Accreditation Modal ── */}
      {selectedLogo && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200] px-4"
          onClick={() => setSelectedLogo(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSelectedLogo(null)} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">✕</button>
            <img src={selectedLogo.image} alt={selectedLogo.title} className="h-20 sm:h-24 mx-auto mb-4 sm:mb-6 object-contain" />
            <h4 className="text-xl sm:text-2xl font-bold text-primary mb-3">{selectedLogo.title}</h4>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{selectedLogo.description}</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}