import React, { useState } from "react"
import { Award, Globe, Users, Heart } from "lucide-react"
import { motion } from "framer-motion";

const images = import.meta.glob('../../images/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});
const gal = import.meta.glob('../gallery/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
});
const im = import.meta.glob('../../images/im/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});

const logos = [
  {
    image: im['../../images/im/Aussie1.png'],
    title: "Aussie Specialist",
    description: "An Aussie Specialist is a travel agent who has completed official training about Australia's destinations, attractions, and travel planning. This certification shows that the agent has expert knowledge of Australian travel."
  },

  {
    image: im['../../images/im/Ministry of Tourism.jpg'],
    title: "Ministry of Tourism India",
    description: "Official recognition from India's Ministry of Tourism, certifying our commitment to promoting tourism and maintaining high standards in travel services."
  }
];

const stats = [
  { icon: Globe, value: "28K+", label: "Total Destinations" },
  { icon: Users, value: "4M+", label: "Happy Travelers" },
  { icon: Award, value: "40+", label: "Years of Excellence" },
  { icon: Heart, value: "200K+", label: "Satisfaction Rate" },
]

const accreditationDetails = [

  {
    image: im['../../images/im/iaai.jpg'],
    title: "IAAI",
    description: "Indian Association of Tour Operators (IAAI) is a premier organization representing tour operators and travel agencies in India, promoting ethical business practices and professional standards in the tourism industry."
  },
  {
    image: im['../../images/im/download.png'],
    title: "Ministry of Tourism",
    description: "Official recognition from India's Ministry of Tourism, certifying our commitment to promoting tourism and maintaining high standards in travel services."
  },
  {
    image: im['../../images/im/taai.png'],
    title: "TAAI",
    description: "Travel Agents Association of India (TAAI) is one of the oldest and most respected associations of travel agents in India, ensuring professional excellence and consumer protection."
  },
  {
    image: im['../../images/im/tafi.jpg'],
    title: "TAFI",
    description: "Travel Agents Federation of India (TAFI) is a national body representing travel agents and tour operators, working towards the growth and development of the travel industry in India."
  }
];

export default function OurStoryPage() {
  const [selectedLogo, setSelectedLogo] = useState<any>(null);

  return (
    <div className="pt-20 sm:pt-28">

      {/* Hero Section */}
      <div className="bg-primary py-12 sm:py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            About Us
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            Our Story
          </h1>
          <p className="mt-4 text-white/80 leading-relaxed">
            From a passion for travel to a premium global travel agency,
            discover the journey that shaped Madura Global.
          </p>
        </div>
      </div>

      {/* Vision / Mission Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

            {[
              {
                icon: "👁️",
                title: "Our Vision",
                text: "To be the foremost global travel company, enriching lives through unforgettable experiences and pioneering innovation in the travel industry."
              },
              {
                icon: "🏆",
                title: "Our Mission",
                text: "Strive to cultivate meaningful connections, promote cultural understanding, and foster sustainable tourism practices while delivering unparalleled value to our clients."
              },
              {
                icon: "⚛️",
                title: "Our Core Values",
                text: "Embracing innovation, prioritizing honesty, accountability, and professionalism while fostering inclusivity and teamwork."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl  p-8 text-center hover:shadow-xl transition">
                <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center bg-blue-100 rounded-full text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* About Content Section */}<section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
            <div>
              <h4 className="font-Arial text-3xl font-bold text-foreground">Discover about
                Madura Global</h4>
              <h6 className="text-3xl  text-primary">
                Establishment
              </h6>

              <p className="mt-4 leading-relaxed text-muted-foreground">


                Madura Global is a premium travel and advisory platform connecting Australia with India and select international destinations through curated, intelligently designed journeys. Built upon the 40-year legacy of Madura Travel Service (P) Ltd in India, our foundation is rooted in operational depth, long-standing regional partnerships and multi-generational expertise.

                We specialise in crafting structured travel experiences that balance cultural authenticity with refined execution. From heritage landscapes and spiritual circuits to contemporary luxury itineraries, every journey is thoughtfully designed for Australian travellers seeking clarity, comfort and meaningful engagement.

                Madura Global does not operate as a transactional tour reseller. We function as a strategic bridge — combining Australian consultation standards with on-ground precision across India and beyond. Our commitment is to deliver travel experiences defined by discretion, structure and enduring quality.
              </p>
              <h6 className="text-3xl  text-primary">
                Awards & Recognition
              </h6>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                Over the years, our company has earned recognition from numerous esteemed government and private institutions. Notably, we are honored to have received the prestigious Kalaimamani Award from the Government of Tamil Nadu, a testament to our commitment and excellence in the travel industry. We take pride in being the sole recipient of the Kalaimamani Award within the entire travel fraternity. Additionally, our achievements include securing two Limca Records for orchestrating the largest cultural groups from India to destinations worldwide, and pioneering the entry into the digital market during the early 2000s. Furthermore, we have consistently ranked as a top seller for various airlines, including Air India, Oman Air, Jet Airways, SriLankan Airlines, among others.
              </p>
              <h6 className="text-3xl  text-primary">
                Travel & Visa
              </h6>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                Your trusted travel partner in seamless travel experiences for over 39 years. Established in 1986, we have been committed to providing unparalleled service for both international and domestic Air Ticketing, Train and bus Services & Cruise Transport and expertise in visa facilitation for across 195 Countries.</p>
              <h6 className="text-3xl  text-primary">
                Tourism and Ancillary Services
              </h6>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                Your premier choice for unforgettable travel experiences backed by 39 years of expertise and the esteemed approval of the Ministry of Tourism, Government of India. We have been dedicated to curating exceptional journeys for millions of passengers including Families, Honeymooners, Corporate & Business travellers, Solo Travellers, Student Educational Trips and many more.</p>
            </div>
            <div className="relative  w-full h-[800px] overflow-hidden rounded-2xl">
              <img src={images['../../images/WhatsApp-Image-2024-11-21-at-16.41.41_0f849961-767x1024 (1).jpg'] as string}
                alt="Our team on a tour"
                fill className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>



        </div>


        {/* Why Choose Us */}
        {/* <section className="w-full bg-white">
          <div className="mt-16 text-center">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider">
              Experience. Quality. Trust.
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#cc1715] md:text-5xl">
              Why Choose Us?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto px-4 text-muted-foreground text-sm sm:text-base">
              Join millions of happy travelers who trust Madura Travel Service...
            </p>
          </div>
          <div className="mt-20 grid gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-card p-8 text-center">
                <stat.icon className="mx-auto h-8 w-8 text-accent" />
                <div className="mt-3 font-arial text-3xl font-bold text-card-foreground">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section> */}
      </section>
      {/* Clients Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 🔹 Heading Section */}
          <div className="text-center mb-14">
            <h4 className="text-sm font-semibold tracking-widest text-[#cc1715] uppercase mb-3">
              Our Esteemed Clients
            </h4>

            <h2 className="text-3xl md:text-4xl font-bold text-[#191975] mb-4">
              Trusted by the Best
            </h2>

            <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
              Join millions of happy travelers who trust Madura Travel Service (P) Ltd.,
              one of India’s leading travel companies, for exceptional tour planning
              and unforgettable journeys.
            </p>
          </div>

          {/* 🔹 Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 40 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 flex items-center justify-center hover:shadow-md transition"
              >
                <img
                  src={gal[`../gallery/img-${index + 1}.jpg`] as string}
                  alt={`Client ${index + 1}`}
                  className="max-h-28 object-contain"
                />
              </div>
            ))}
          </div>

        </div>
      </section>
      <section className="py-12 sm:py-24 bg-gray-50 text-center">

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900 mb-10 sm:mb-16">
          Awards & Recognitions
        </h2>

        {/* Top Logos */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-70 mb-24">
          <img
            src={im['../../images/im/rsh_100cg_truem-4.png']}
            alt="Incredible India"
            className="h-24 object-contain"
          />
          <img
            src={im['../../images/im/rsh_100cg_truem-10.jpeg']}
            alt="Enchanting Tamil Nadu"
            className="h-24 object-contain"
          />
        </div>

        {/* Government Recognitions Grid */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 mb-8 sm:mb-12">
          Government Recognitions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          {[
            { img: im['../../images/im/111.png'], label: "Primary Host" },
            { img: im['../../images/im/22-1.png'], label: "Record Holder" },
            { img: im['../../images/im/33-1.png'], label: "M.I.C.E Leader" },
            { img: im['../../images/im/44-1.png'], label: "Record Holder" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.img}
                alt={item.label}
                className="h-20 mx-auto mb-6 object-contain"
              />
              <span className="inline-block px-4 py-2 text-indigo-900 border border-indigo-200 rounded-full font-semibold">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Subsidiaries Section */}
        <h3 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-16">
          Our Subsidiaries
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-35 max-w-7xl mx-auto px-4 mb-24">
          {[
            im['../../images/im/rsh_100cg_true.png'],
            im['../../images/im/MADURAGLOBALIMMIGRATION-300x300.png'],
            im['../../images/im/madura-intitute-300x300.png'],
            im['../../images/im/Madura-Global-Logo-150x150.png'],
            im['../../images/im/111.png'],
          ].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Subsidiary Logo"
              className="h-26 object-contain transition duration-300"
            />
          ))}
        </div>


        {/* Second Recognition Row */}
        <h3 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-12">
          Our Accreditations
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-9 max-w-6xl mx-auto px-4">
          {accreditationDetails.map((logo, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLogo(logo)}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <img
                src={logo.image}
                alt={logo.title}
                className="h-20 mx-auto object-contain"
              />
            </motion.div>
          ))}
        </div>

      </section>

      {/* Accreditation Modal */}
      {selectedLogo && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedLogo(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            {/* Logo */}
            <img
              src={selectedLogo.image}
              alt={selectedLogo.title}
              className="h-24 mx-auto mb-6 object-contain"
            />

            {/* Title */}
            <h4 className="text-2xl font-bold text-primary mb-3">
              {selectedLogo.title}
            </h4>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {selectedLogo.description}
            </p>
          </motion.div>
        </div>
      )}


    </div>
  )
}