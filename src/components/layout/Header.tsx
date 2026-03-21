import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Send } from 'lucide-react';
import { cn } from '../../lib/utils';
import EnquiryModal from '../EnquiryModal';
import Image from '/images/logo8.png';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase-config';


interface FirestoreDestination {
  id: string;
  name: string;
  slug: string;
  country?: string;
  cities?: string[];
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedDestination, setExpandedDestination] = useState<string | null>(null);
  const [firestoreDestinations, setFirestoreDestinations] = useState<FirestoreDestination[]>([]);
  const location = useLocation();
  const [openCountry, setOpenCountry] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Load destinations from Firestore in real-time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'destinations'), (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        name: d.data().name || '',
        slug: d.data().slug || d.id,
        country: d.data().country || '',
        cities: d.data().cities || [],
      })) as FirestoreDestination[];
      setFirestoreDestinations(data.filter(d => d.name));
    });
    return () => unsub();
  }, []);
  const toggleCountry = (id: string) => {
    setOpenCountry(prev => (prev === id ? null : id));
  };

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
      // ✅ Dynamic from Fire
      //  name: 'Destinations',
      // dropdown: [
      //   { name: 'India', path: '/destinations/india' },
      //   { name: 'Australia', path: '/destinations/australia' },
      //   { name: 'Malaysia', path: '/destinations/malaysia' },
      //   { name: 'Singapore', path: '/destinations/singapore' },
      //   { name: 'Sri Lanka', path: '/destinations/sri-lanka' },
      //   { name: 'Vietnam', path: '/destinations/vietnam' },
      // ]

      dynamicDestinations: true,
    },
    {
      name: 'Categories',
      dropdown: [
        { name: 'Family', path: '/categories/family' },
        { name: 'Honeymoon', path: '/categories/honeymoon' },
        { name: 'Spiritual', path: '/categories/spiritual' },
        { name: 'Group', path: '/categories/group' },
      ]
    },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        (isScrolled || location.pathname !== '/')
          ? 'bg-primary/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-black/5'
          : 'bg-transparent py-5'
      )}>
        <div className="w-full px-4 md:px-10 h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center">
            <div className={cn(
              "relative transition-all duration-300 flex items-center justify-center overflow-hidden shrink-0",
              (isScrolled || location.pathname !== "/") ? "w-12 h-12 md:w-20 md:h-20" : "w-14 h-14 md:w-24 md:h-24"
            )}>
              <img src={Image} alt="Madura Global Logo" className="w-full h-full object-contain" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link: any) => (
              <div key={link.name} className="relative group">
                {link.path ? (
                  <Link to={link.path} className={cn("text-sm font-medium hover:text-accent transition-colors", isScrolled ? "text-white" : "text-white")}>
                    {link.name}
                  </Link>
                ) : (
                  <button className={cn("text-sm font-medium flex items-center gap-1 hover:text-accent transition-colors", isScrolled ? "text-white" : "text-white")}>
                    {link.name} <ChevronDown className="w-4 h-4" />
                  </button>
                )}

                {/* Static dropdown */}
                {link.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-slate-100 shadow-premium">
                    {link.dropdown.map((item: any) => (
                      <Link key={item.name} to={item.path} className="block px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors text-sm font-medium mx-2 rounded-xl">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* ✅ Dynamic Destinations dropdown with cities */}
                {link.dynamicDestinations && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-slate-100 shadow-premium max-h-[70vh] overflow-y-auto">
                    {firestoreDestinations.length === 0 ? (
                      <p className="px-4 py-2 text-sm text-slate-400">Loading...</p>
                    ) : (
                      firestoreDestinations.map((dest) => (
                        <div key={dest.id} className="group/dest">
                          {/* Destination name */}
                          <Link
                            to={`/destinations/${dest.slug}`}
                            className="flex items-center justify-between px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors text-sm font-bold mx-2 rounded-xl"
                          >
                            {dest.name}
                            {dest.cities && dest.cities.length > 0 && (
                              <ChevronDown className="w-3.5 h-3.5 text-slate-400 -rotate-90" />
                            )}
                          </Link>
                          {/* Cities under destination */}
                          {dest.cities && dest.cities.length > 0 && (
                            <div className="ml-4 mb-1">
                              {dest.cities.map((city) => (
                                <Link
                                  key={city}
                                  to={`/destinations/${dest.slug}/${city.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="flex items-center gap-2 px-4 py-1.5 text-slate-500 hover:text-primary hover:bg-slate-50 transition-colors text-xs mx-2 rounded-xl"
                                >

                                  <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                                  {city}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    {/* View all link */}
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <Link to="/destinations" className="block px-4 py-2 text-accent text-xs font-bold mx-2 rounded-xl hover:bg-slate-50 transition-colors">
                        View All Destinations →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.button onClick={() => setIsEnquiryModalOpen(true)} whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
              className="hidden lg:flex items-center gap-2 bg-accent text-white font-bold px-6 py-3 rounded-2xl text-xs md:text-sm shadow-accent-premium hover:bg-white hover:text-primary transition-colors duration-300">
              Enquiry
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} className="lg:hidden p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 touch-manipulation" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </header>

      <EnquiryModal isOpen={isEnquiryModalOpen} onClose={() => setIsEnquiryModalOpen(false)} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-white z-[60] lg:hidden overflow-y-auto w-full h-screen"
          >
            <div className="flex flex-col h-full">
              <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-6 py-6 flex justify-between items-center">
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center p-2 border border-slate-100 shadow-sm">
                  <img src={Image} alt="Logo" className="h-full w-auto object-contain" />
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-primary">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow px-6 py-8">
                <div className="space-y-4">
                  {navLinks.map((link: any) => (
                    <div key={link.name} className="overflow-hidden">
                      {link.path ? (
                        <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)}
                          className="w-full flex items-center justify-between p-5 rounded-2xl bg-slate-50 text-primary border border-slate-100">
                          <span className="text-lg font-bold uppercase tracking-wider">{link.name}</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => setExpandedSection(expandedSection === link.name ? null : link.name)}
                          className={cn("w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300",
                            expandedSection === link.name ? "bg-primary text-white" : "bg-slate-50 text-primary border border-slate-100"
                          )}
                        >
                          <span className="text-lg font-bold uppercase tracking-wider">{link.name}</span>
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", expandedSection === link.name ? "rotate-180" : "")} />
                        </button>
                      )}

                      <AnimatePresence>
                        {expandedSection === link.name && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="pt-4 pb-4 px-4">

                            {/* Static dropdown items */}
                            {link.dropdown && (
                              <div className="grid grid-cols-1 gap-2">
                                {link.dropdown.map((item: any) => (
                                  <Link key={item.name} to={item.path} onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-4 rounded-xl bg-white shadow-sm border border-slate-100 group active:bg-accent transition-all">
                                    <span className="font-semibold text-primary group-active:text-white">{item.name}</span>
                                    <ChevronDown className="w-4 h-4 -rotate-90 text-accent" />
                                  </Link>
                                ))}
                              </div>
                            )}

                            {/* ✅ Dynamic destinations with cities on mobile */}
                            {link.dynamicDestinations && (
                              <div className="grid grid-cols-1 gap-2">
                                {firestoreDestinations.map((dest) => (
                                  <div key={dest.id}>
                                    {/* Destination */}
                                    <button
                                      onClick={() => setExpandedDestination(expandedDestination === dest.id ? null : dest.id)}
                                      className="w-full flex items-center justify-between p-4 rounded-xl bg-white shadow-sm border border-slate-100"
                                    >
                                      <span className="font-bold text-primary">{dest.name}</span>
                                      {dest.cities && dest.cities.length > 0 && (
                                        <ChevronDown className={cn("w-4 h-4 text-accent transition-transform", expandedDestination === dest.id ? "rotate-180" : "")} />
                                      )}
                                    </button>
                                    {/* Cities */}
                                    <AnimatePresence>
                                      {expandedDestination === dest.id && dest.cities && dest.cities.length > 0 && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                          <div className="pl-4 pt-2 grid grid-cols-1 gap-1">
                                            {/* Link to destination page */}
                                            <Link to={`/destinations/${dest.slug}`} onClick={() => setIsMobileMenuOpen(false)}
                                              className="p-3 rounded-xl bg-primary/5 text-primary text-sm font-semibold text-center">
                                              View All {dest.name} Tours
                                            </Link>
                                            {dest.cities.map((city) => (
                                              <Link key={city} to={`/destinations/${dest.slug}/${city.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                                <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                                                <span className="text-sm text-primary">{city}</span>
                                              </Link>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                ))}
                                <Link to="/destinations" onClick={() => setIsMobileMenuOpen(false)}
                                  className="p-4 rounded-xl bg-accent/10 text-accent font-bold text-center text-sm">
                                  View All Destinations →
                                </Link>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pb-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
                  <motion.button whileTap={{ scale: 0.98 }}
                    onClick={() => { setIsEnquiryModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="w-full bg-accent text-white font-bold py-5 rounded-2xl shadow-accent-premium flex items-center justify-center gap-3 text-base min-h-[56px] touch-manipulation">
                    <Send className="w-6 h-6" />
                    Book a free consultation
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}