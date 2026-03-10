import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Phone, Mail, MapPin, Globe, Building2, Users, Briefcase, Send } from 'lucide-react';
import { cn } from '../../lib/utils';
import EnquiryModal from '../EnquiryModal';
import Image from '/images/logo8.png';

const im = import.meta.glob('../../../images/im/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});

const trustLogos = [
  { src: '../../../images/im/Ministry of Tourism.jpg', alt: 'Ministry of Tourism India' },
  { src: '../../../images/im/Aussie.jpg', alt: 'Aussie Specialist' },
  { src: '../../../images/im/iata.png', alt: 'IATA' }
];
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      name: 'About',
      dropdown: [
        { name: 'Our Story', path: '/company/our-story' },
        { name: 'Testimonials', path: '/company/testimonials' },
        { name: 'Media', path: '/company/media' },

      ]
    },
    {
      name: 'Destinations',
      dropdown: [
        { name: 'India', path: '/destinations/india' },
        { name: 'Australia', path: '/destinations/australia' },
        { name: 'Malaysia', path: '/destinations/malaysia' },
        { name: 'Singapore', path: '/destinations/singapore' },
        { name: 'Sri Lanka', path: '/destinations/sri-lanka' },
        { name: 'Vietnam', path: '/destinations/vietnam' },
      ]
    },
    {
      name: 'Categories',
      dropdown: [
        { name: 'Family Tourism', path: '/categories/family-tourism' },
        { name: 'Honeymoon Tourism', path: '/categories/honeymoon-tourism' },
        { name: 'Spiritual Tourism', path: '/categories/spiritual-tourism' },
        { name: 'Group Tourism', path: '/categories/group-tourism' },
      ]
    },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-300',
          (isScrolled || location.pathname !== '/') ? 'bg-primary/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'
        )}
      >
        <div className="w-full px-4 md:px-10 h-full flex items-center justify-between gap-4">
          {/* <div className="flex items-center gap-2 md:gap-4 shrink-0"> */}
          {/* Main Logo */}
          <Link to="/" className="flex flex-col items-center">
            <div
              className={cn(
                "relative transition-all duration-300 flex items-center justify-center overflow-hidden shrink-0",
                (isScrolled || location.pathname !== "/")
                  ? "w-12 h-12 md:w-20 md:h-20"
                  : "w-14 h-14 md:w-24 md:h-24"
              )}
            >
              <img
                src={Image}
                alt="Madura Global Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* <span className="mt-1 bg-accent text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full tracking-widest shadow-md">
              Since 1986
            </span> */}
          </Link>

          {/* Trust Logos
            {[
              { src: im['../../../images/im/Ministry of Tourism.jpg'], alt: 'Ministry of Tourism India' },
              { src: im['../../../images/im/Aussie.jpg'], alt: 'Aussie Specialist' },
              { src: im['../../../images/im/iata.png'], alt: 'IATA' }
            ].map((badge, idx) => (
              <div
                key={idx}
                className={cn(
                  "rounded-lg shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 transition-all duration-300 p-1",
                  (isScrolled || location.pathname !== '/')
                    ? "w-10 h-10 md:w-14 md:h-14"
                    : "w-12 h-12 md:w-20 md:h-20"
                )}
              >
                <img
                  src={badge.src as string}
                  alt={badge.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            }
  
          {/* </div> */}

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
                      "text-sm font-medium hover:text-accent transition-colors ",
                      isScrolled ? "text-white" : "text-[#ffffff]"
                    )}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    className={cn(
                      "text-sm font-medium flex items-center gap-1 hover:text-accent transition-colors ",
                      isScrolled ? "text-white" : "text-[#ffffff]"
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
                        className="block px-4 py-2 text-black text-slate-600 hover:bg-secondary hover:text-primary transition-colors"
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
              className="hidden lg:flex items-center gap-2 bg-accent text-white font-bold px-6 py-3 rounded-full text-xs md:text-sm hover:bg-white hover:text-primary transition-all shadow-lg shadow-accent/40"
            >
              Enquiry
            </button>
            <button
              className="lg:hidden p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="text-white w-6 h-6" />
              ) : (
                <Menu className="text-white w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-white z-[60] lg:hidden overflow-y-auto w-full h-screen"
          >
            <div className="flex flex-col h-full">
              {/* Header Container */}
              <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-6 py-6 border-b border-slate-100 flex justify-between items-center">
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center p-2 border border-slate-100 shadow-sm">
                  <img src={Image} alt="Logo" className="h-full w-auto object-contain" />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-primary active:scale-95 transition-transform"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Content */}
              <div className="flex-grow px-6 py-8">
                <div className="space-y-4">
                  {navLinks.map((link) => (
                    <div key={link.name} className="overflow-hidden">
                      {link.path ? (
                        <Link
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="w-full flex items-center justify-between p-5 rounded-2xl bg-slate-50 text-primary border border-slate-100 transition-all duration-300"
                        >
                          <span className="text-lg font-bold uppercase tracking-wider">{link.name}</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => setExpandedSection(expandedSection === link.name ? null : link.name)}
                          className={cn(
                            "w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300",
                            expandedSection === link.name ? "bg-primary text-white" : "bg-slate-50 text-primary border border-slate-100"
                          )}
                        >
                          <span className="text-lg font-bold uppercase tracking-wider">{link.name}</span>
                          {link.dropdown && <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", expandedSection === link.name ? "rotate-180" : "")} />}
                        </button>
                      )}

                      <AnimatePresence>
                        {expandedSection === link.name && link.dropdown && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-slate-50/50 rounded-b-2xl -mt-4 pt-8 pb-4 px-4 border-x border-b border-slate-100"
                          >
                            <div className="grid grid-cols-1 gap-2">
                              {link.dropdown?.map((item, idx) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center justify-between p-4 rounded-xl bg-white shadow-sm border border-slate-100 group active:bg-accent transition-all"
                                >
                                  <span className="font-semibold text-primary group-active:text-white">{item.name}</span>
                                  <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-active:bg-white/20">
                                    <ChevronDown className="w-4 h-4 -rotate-90 text-accent group-active:text-white" />
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Main CTA */}
                <div className="mt-10">
                  <button
                    onClick={() => {
                      setIsEnquiryModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-accent text-white font-black py-5 rounded-[2rem] shadow-xl shadow-accent/20 flex items-center justify-center gap-3 text-lg hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Send className="w-6 h-6" />
                    Book a free consultation
                  </button>
                </div>

                {/* Contact Quick Link */}
                <div className="mt-8 bg-primary text-white p-8 rounded-[2.5rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full translate-x-8 -translate-y-8" />
                  <div className="relative z-10">
                    <h4 className="font-bold text-accent text-lg mb-6">Need expert help?</h4>
                    <div className="space-y-4">
                      <a href="tel:+61434500743" className="flex items-center gap-4 group/item">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover/item:bg-accent transition-colors">
                          <Phone className="w-5 h-5 text-accent group-hover/item:text-white" />
                        </div>
                        <span className="font-medium">+61 434 500 743</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
