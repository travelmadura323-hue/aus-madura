import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';
import Image from '/images/logo.png';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-3 mb-6 pl-3">
              <div className="w-18 h-18 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden p-1">
                <img
                  src={Image}
                  alt="Madura Travel Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/madura/100/100";
                  }}
                />
              </div>
              {/* <span className="text-2xl font-black tracking-tighter">
                Madura<span className="text-accent pl-1">Global</span>
              </span> */}
            </div>
            <p className="text-white text-sm leading-relaxed mb-6">
              Madura Travel Service - Your trusted partner for global travel solutions for over 40 years. Excellence in service, every step of the way.
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
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-4 text-white text-sm">
              <li><Link to="/company/our-story" className="hover:text-white transition-colors">Our Story</Link></li>
              {/* <li><Link to="/company/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/mice" className="hover:text-white transition-colors">MICE Services</Link></li> */}
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/company/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
            </ul>
          </div>

          {/* Column 3: Top Destinations */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Top Destinations</h4>
            <ul className="space-y-4 text-white text-sm">
              <li><Link to="/destinations/india" className="hover:text-white transition-colors">India</Link></li>
              <li><Link to="/destinations/australia" className="hover:text-white transition-colors">Australia</Link></li>
              <li><Link to="/destinations/vietnam" className="hover:text-white transition-colors">Vietnam </Link></li>
              <li><Link to="/destinations/singapore" className="hover:text-white transition-colors">Singapore City</Link></li>
              <li><Link to="/destinations/sri-lanka" className="hover:text-white transition-colors">Sri Lanka</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Newsletter</h4>
            <p className="text-white text-sm mb-6">Subscribe to get the latest travel deals and updates.</p>
            <form className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-accent transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-primary p-1.5 rounded-md hover:bg-white transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm text-white">
                <Phone className="w-4 h-4 text-accent" /> +61 434 500 743
              </div>
              <div className="flex items-center gap-3 text-sm text-white">
                <Mail className="w-4 h-4 text-accent" /> australia@maduraglobal.com
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-white text-[10px] md:text-sm text-center md:text-left">
          <p className="opacity-80">© 2026 Madura Travel Service Pvt Ltd. All rights reserved.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 px-4">
            <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link to="/complaint-policy" className="hover:text-accent transition-colors">Compliant Policy</Link>
            <Link to="/disclaimer" className="hover:text-accent transition-colors">Disclaimer</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">Contact us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
