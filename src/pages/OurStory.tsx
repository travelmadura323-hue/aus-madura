import { motion } from 'framer-motion';

export default function OurStory() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-primary mb-10">Our Story</h1>
          <div className="prose prose-lg text-slate-600">
            <p className="mb-6">
              Founded with a passion for discovery, Madura Travel Service has been at the forefront of the travel industry for over four decades. We believe that travel is more than just visiting new places; it's about the stories we create and the memories we cherish.
            </p>
            <p className="mb-6">
              Our mission is to provide seamless, premium travel experiences that showcase the incredible diversity of India and the world. From the majestic forts of Rajasthan to the serene backwaters of Kerala, and the bustling streets of Singapore to the natural wonders of Vietnam, we bring the world closer to you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">40+</div>
                <div className="text-sm font-bold text-primary uppercase">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">50k+</div>
                <div className="text-sm font-bold text-primary uppercase">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">100+</div>
                <div className="text-sm font-bold text-primary uppercase">Destinations</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
