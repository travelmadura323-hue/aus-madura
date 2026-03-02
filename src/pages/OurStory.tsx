import React from "react"
import { Award, Globe, Users, Heart } from "lucide-react"
import { image } from "framer-motion/client";

 const OurStory = import.meta.glob('/images/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});
const gal = import.meta.glob('/src/gallery/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});

const stats = [
  { icon: Globe, value: "28K+", label: "Total Destinations" },
  { icon: Users, value: "4M+", label: "Happy Travelers" },
  { icon: Award, value: "40+", label: "Years of Excellence" },
  { icon: Heart, value: "200K+", label: "Satisfaction Rate" },
]

export default function OurStoryPage() {
  return (
    <div className="pt-28">

      {/* Hero Section */}
      <div className="bg-primary py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

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
              <div key={index} className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
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
        <div className="mx-auto max-w-7xl  px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h4 className="font-Arial text-3xl font-bold text-foreground">Discover about
Madura Travel Service (P) Ltd</h4>
          <h6 className="text-3xl  text-primary">
 Establishment
</h6>

<p className="mt-4 leading-relaxed text-muted-foreground">
  The journey of our company commenced on January 17th, 1986, right in the heart of Chennai Egmore, nestled within the vibrant state of Tamil Nadu, India. It marked the inception of a visionary's dream, dedicated to delivering authentic travel services to our valued customers.

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
            <img src={OurStory['/images/WhatsApp-Image-2024-11-21-at-16.41.41_0f849961-767x1024 (1).jpg']} 
            alt="Our team on a tour" 
            fill className="object-cover" 
            sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>

         

        </div>
        

        {/* Why Choose Us */}
       <section className="w-full bg-white">
        <div className="mt-16 text-center">
    <p className="text-sm font-semibold text-accent uppercase tracking-wider">
      Experience. Quality. Trust.
    </p>
    <h2 className="mt-2 text-4xl font-bold text-[#cc1715] md:text-5xl">
      Why Choose Us?
    </h2>
    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
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
        </section>
</section>
        {/* Clients Section */}
        <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">

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
            src={gal[`/src/gallery/img-${index + 1}.jpg`]}
            alt={`Client ${index + 1}`}
            className="max-h-28 object-contain"
          />
        </div>
      ))}
    </div>

  </div>
</section>

      </div>
    // </div>
  )
}