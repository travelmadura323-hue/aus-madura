import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Phone, Mail, MapPin, Globe, Building2, Users, Briefcase } from 'lucide-react';
import { cn } from '../../lib/utils';
import EnquiryModal from '../EnquiryModal';
import Image from '/images/logo.png';



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
        // { name: 'Careers', path: '/company/careers' },
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
        { name: 'India', path: '/pages/india' },
        { name: 'Malaysia', path: '/pages/Malaysia' },
        { name: 'Singapore', path: '/pages/singapore' },
        { name: 'Sri Lanka', path: '/pages/sri lanka' },
        { name: 'Vietnam', path: '/pages/vietnam' },
        { name: 'Australia', path: '/pages/australia' },
      ]
    },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        (isScrolled || location.pathname !== '/') ? 'bg-primary/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 left-0 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <div className={cn(
            "relative transition-all duration-300",
            (isScrolled || location.pathname !== '/') ? "w-14 h-14" : "w-20 h-20"
          )}>
            <img
              src={Image}
              alt="Madura Global Logo"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>

          <div className="flex flex-col">
            {/* <span className={cn(
              "text-xl font-black tracking-tighter leading-none transition-colors",
              (isScrolled || location.pathname !== '/') ? "text-white" : "text-primary transition-colors"
            )}>
              Madura<span className="text-accent pl-1">Global</span>
            </span> */}
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
                    isScrolled ? "text-slate-700" : "text-[#191975]"
                  )}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  className={cn(
                    "text-sm font-medium flex items-center gap-1 hover:text-accent transition-colors ",
                    isScrolled ? "text-slate-700" : "text-[#191975]"
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
                      className="block px-4 py-2 text-black text-slate-600 hover:bg-secondary hover:text-primary"
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
            <div className="p-8">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center p-2 border border-slate-100 shadow-sm">
                    <img src={Image} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xl font-black text-primary tracking-tighter">
                    Madura<span className="text-accent">Global</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-primary shadow-sm active:scale-90 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-2">
                {navLinks.map(link => (
                  <div key={link.name} className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                    <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">{link.name}</div>
                    {link.dropdown ? (
                      <div className="grid grid-cols-1 gap-3">
                        {link.dropdown.map(item => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="text-primary font-bold text-lg flex items-center justify-between group active:translate-x-1 transition-all"
                          >
                            {item.name}
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm opacity-0 group-active:opacity-100 group-hover:opacity-100 transition-all">
                              <ChevronDown className="w-4 h-4 -rotate-90 text-accent" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        to={link.path || '#'}
                        className="text-primary font-bold text-lg block active:translate-x-1 transition-all"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-primary text-white p-8 rounded-[2.5rem] shadow-xl shadow-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
                <div className="relative z-10">
                  <h4 className="font-bold text-accent mb-4">Contact Our Specialists</h4>
                  <div className="space-y-4">
                    <a href="tel:+61434500743" className="flex items-center gap-4 text-sm font-medium hover:text-accent transition-colors">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Phone className="w-5 h-5 text-accent" /></div>
                      +61 434 500 743
                    </a>
                    <a href="mailto:australia@maduraglobal.com" className="flex items-center gap-4 text-sm font-medium hover:text-accent transition-colors">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Mail className="w-5 h-5 text-accent" /></div>
                      australia@maduraglobal.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header >
  );
}
