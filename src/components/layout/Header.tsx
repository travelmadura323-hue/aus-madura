import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Phone, Mail, MapPin, Globe, Building2, Users, Briefcase } from 'lucide-react';
import { cn } from '../../lib/utils';
import EnquiryModal from '../EnquiryModal';


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [location]);

  const navLinks = [
    {
      name: 'Our Company',
      dropdown: [
        { name: 'Our Story', path: '/company/our-story' },
        { name: 'Careers', path: '/company/careers' },
        { name: 'Media', path: '/company/media' },
        { name: 'Testimonials', path: '/company/testimonials' },
      ]
    },
    {
      name: 'Categories',
      dropdown: [
        { name: 'Medical Tourism', path: '/categories/medical-tourism' },
        { name: 'Spiritual Tourism', path: '/categories/spiritual-tourism' },
        { name: 'Wellness Tourism', path: '/categories/wellness-tourism' },
        { name: 'Sports Tourism', path: '/categories/sports-tourism' },
        { name: 'Family Tourism', path: '/categories/family-tourism' },
        { name: 'Honeymoon Tourism', path: '/categories/honeymoon-tourism' },
      ]
    },
    {
      name: 'Destinations',
      dropdown: [
        { name: 'India', path: '/destinations/india' },
        { name: 'Malaysia', path: '/destinations/malaysia' },
        { name: 'Singapore', path: '/destinations/singapore' },
        { name: 'Sri Lanka', path: '/destinations/sri-lanka' },
        { name: 'Vietnam', path: '/destinations/vietnam' },
      ]
    },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      )}
    >
    <div className="max-w-7xl mx-auto  flex  justify-between">
  <Link to="/" className="flex items-center">
    <div className="w-18 h-18 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden border border-slate-100">
      <img
        src="/images/logo.svg"
        alt="Madura Global Logo"
        className="w-full h-full object-contain"
      />
    </div>
        
          <div className="flex flex-col">
            <span className={cn(
              "text-xl font-black tracking-tighter leading-none",
              isScrolled ? "text-primary" : "text-white"
            )}>
              Madura<span className="text-accent">Global</span>
            </span>
            <span className={cn(
              "text-[8px] font-bold uppercase tracking-[0.3em] leading-none mt-1",
              isScrolled ? "text-slate-400" : "text-white/60"
            )}>
              Service Excellence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
            >
              {link.path ? (
                <Link
                  to={link.path}
                  className={cn(
                    "text-sm font-medium hover:text-accent transition-colors",
                    isScrolled ? "text-slate-700" : "text-white"
                  )}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  className={cn(
                    "text-sm font-medium flex items-center gap-1 hover:text-accent transition-colors",
                    isScrolled ? "text-slate-700" : "text-white"
                  )}
                >
                  {link.name} <ChevronDown className="w-4 h-4" />
                </button>
              )}

              {/* Dropdown */}
              {link.dropdown && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-100">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-secondary hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsEnquiryModalOpen(true)}
            className="hidden md:flex bg-accent text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-primary transition-all"
          >
            Enquiry
          </button>
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className={isScrolled ? "text-primary" : "text-white"} /> : <Menu className={isScrolled ? "text-primary" : "text-white"} />}
          </button>
        </div>
      </div>

      <EnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={() => setIsEnquiryModalOpen(false)} 
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-10">
                <span className="text-2xl font-bold text-primary">MENU</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-8 h-8 text-primary" /></button>
              </div>
              <div className="space-y-6">
                {navLinks.map(link => (
                  <div key={link.name} className="border-b border-slate-100 pb-4">
                    <div className="text-lg font-bold text-primary mb-2">{link.name}</div>
                    {link.dropdown && (
                      <div className="grid grid-cols-2 gap-2 pl-4">
                        {link.dropdown.map(item => (
                          <Link key={item.name} to={item.path} className="text-slate-600 text-sm py-1">{item.name}</Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3 text-slate-600"><Phone className="w-5 h-5" /> +91 98765 43210</div>
                <div className="flex items-center gap-3 text-slate-600"><Mail className="w-5 h-5" /> info@maduratravel.com</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
