import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';
import Image from '/images/logo.png';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          {/* Column 1: About */}
          <div className="flex flex-col items-start px-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden p-1">
                <img
                  src={Image}
                  alt="Madura Travel Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/madura/100/100";
                  }}
                />
              </div>
            </div>
            <p className="text-white text-sm leading-relaxed mb-6 max-w-xs">
              Madura Global - Your trusted partner for global travel solutions for over 40 years. Excellence in service, every step of the way.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/maduratravel/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/maduratravelaus?igsh=MXYwaHc1YWZydmh3Zw%3D%3D" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/madura-travel-service-p-ltd/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="px-2">
            <h4 className="text-lg font-bold mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-4 text-white/80 text-sm">
              <li><Link to="/company/our-story" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/company/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3: Top Destinations */}
          <div className="px-2">
            <h4 className="text-lg font-bold mb-6 text-accent">Top Destinations</h4>
            <ul className="space-y-4 text-white/80 text-sm">
              <li><Link to="/destinations/india" className="hover:text-white transition-colors">India</Link></li>
              <li><Link to="/destinations/australia" className="hover:text-white transition-colors">Australia</Link></li>
              <li><Link to="/destinations/vietnam" className="hover:text-white transition-colors">Vietnam </Link></li>
              <li><Link to="/destinations/singapore" className="hover:text-white transition-colors">Singapore City</Link></li>
              <li><Link to="/destinations/sri-lanka" className="hover:text-white transition-colors">Sri Lanka</Link></li>
            </ul>
          </div>

          {/* Column 4: News & Contact */}
          <div className="px-2">
            <h4 className="text-lg font-bold mb-6 text-accent">Newsletter</h4>
            <p className="text-white/80 text-sm mb-6 max-w-xs">Subscribe to get the latest travel deals and updates.</p>
            <form className="relative mb-8">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-accent transition-colors text-white"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-white p-1.5 rounded-md hover:bg-white hover:text-primary transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Phone className="w-4 h-4 text-accent shrink-0" /> +61 434 500 743
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Mail className="w-4 h-4 text-accent shrink-0" /> australia@maduraglobal.com
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/60 text-xs text-center md:text-left">
          <p>© 2026 Madura Global. All rights reserved.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link to="/complaint-policy" className="hover:text-accent transition-colors">Compliant Policy</Link>
            <Link to="/disclaimer" className="hover:text-accent transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
