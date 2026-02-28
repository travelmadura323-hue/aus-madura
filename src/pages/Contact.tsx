import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-20">
      <section className="relative h-[40vh] flex items-center overflow-hidden">
        <img
          src="https://picsum.photos/seed/contact-hero/1920/1080"
          alt="Contact Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-slate-200">We're here to help you plan your next journey with Madura Travel.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-8">Get in Touch</h2>
                <p className="text-slate-500 mb-10">
                  Whether you have a question about a tour, need a custom itinerary, or want to discuss corporate travel, our team is ready to assist.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Phone</h4>
                    <p className="text-sm text-slate-500">+61 434 500 743</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Email</h4>
                    <p className="text-sm text-slate-500">australia@maduraglobal.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Office Address</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      1-11 Rosa Crescent Castle Hill 2154 NSW,<br />
                      Australia
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <h4 className="font-bold text-primary mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  {[
                    { Icon: Facebook, url: 'https://www.facebook.com/maduratravel/' },
                    { Icon: Instagram, url: 'https://www.instagram.com/maduratravelaus?igsh=MXYwaHc1YWZydmh3Zw%3D%3D' },
                    { Icon: Linkedin, url: 'https://www.linkedin.com/company/madura-travel-service-p-ltd/' }
                  ].map(({ Icon, url }, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-white transition-all border border-slate-100">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[500px] bg-slate-100 relative">
        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-bold uppercase tracking-widest text-xs">Google Map Embed Placeholder</p>
            <p className="text-sm">Castle Hill, NSW, Australia</p>
          </div>
        </div>
        {/* In a real app, you'd use an iframe or map library here */}
        <div className="w-full h-full bg-slate-200 opacity-50" />
      </section>
    </div>
  );
}
