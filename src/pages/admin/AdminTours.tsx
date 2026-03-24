import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase-config';
import { Plus, Edit2, Trash2, X, AlertCircle, Search, MapPin, Clock, Star, RefreshCw, CheckCircle2, Image as ImageIcon, List, Map, Users, Info, PlusCircle, Trash } from 'lucide-react';
import { tours as mockTours } from '../../data/mockData';

const categories_list = [
  'Group Tourism', 'Honeymoon Tourism', 'Family Packages', 
  'Adventure Tours', 'Luxury Travel', 'Religious Tours', 'MICE'
];

const AdminTours = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<any | null>(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState<any>({
    id: '',
    slug: '',
    title: '',
    image: '',
    description: '',
    overview: '',
    price: 0,
    currency: 'AUD',
    country: '',
    cities: '',
    days: 1,
    nights: 0,
    travelersAdults: 2,
    travelersChildren: 1,
    travelersInfants: 0,
    minimumAge: 5,
    startingPlace: '',
    rating: 5.0,
    category: [],
    status: 'Active',
    highlights: '',
    gallery: ['', '', '', ''],
    tourPlan: [{ day: 1, title: '', description: '' }],
    included: '',
    excluded: '',
    relatedPackages: ''
  });

  const fetchTours = useCallback(async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'tours'));
      const toursData: any[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        toursData.push({ 
          ...data,
          id: doc.id, 
          status: data.status || 'Active'
        });
      });
      setTours(toursData);
      setFilteredTours(toursData);
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAndMigrate = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'tours'));
        
        if (querySnapshot.empty) {
          setIsSyncing(true);
          const batch = writeBatch(db);
          for (const tour of mockTours) {
            const docId = tour.slug || tour.id || doc(collection(db, 'tours')).id;
            const newDocRef = doc(db, 'tours', docId);
            batch.set(newDocRef, { 
              ...tour, 
              id: docId,
              status: 'Active',
              rating: tour.rating || 5.0,
              category: Array.isArray(tour.category) ? tour.category : (tour.category ? [tour.category] : [])
            });
          }
          await batch.commit();
          setIsSyncing(false);
          await fetchTours();
        } else {
          const toursData: any[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            toursData.push({ ...data, id: doc.id, status: data.status || 'Active' });
          });
          setTours(toursData);
          setFilteredTours(toursData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Migration error:", error);
        setLoading(false);
      }
    };
    checkAndMigrate();
  }, [fetchTours]);

  useEffect(() => {
    const result = tours.filter(t => 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.location?.country?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTours(result);
  }, [searchTerm, tours]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this tour package?")) {
      try {
        await deleteDoc(doc(db, 'tours', id));
        fetchTours();
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  const openAddModal = () => {
    setEditingTour(null);
    setFormData({
      id: '',
      slug: '',
      title: '',
      image: '',
      description: '',
      overview: '',
      price: 0,
      currency: 'AUD',
      country: '',
      cities: '',
      days: 1,
      nights: 0,
      travelersAdults: 2,
      travelersChildren: 1,
      travelersInfants: 0,
      minimumAge: 5,
      startingPlace: '',
      rating: 5.0,
      category: [],
      status: 'Active',
      highlights: '',
      gallery: ['', '', '', ''],
      tourPlan: [{ day: 1, title: '', description: '' }],
      included: '',
      excluded: '',
      relatedPackages: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (tour: any) => {
    setEditingTour(tour);
    setFormData({
      id: tour.id || '',
      slug: tour.slug || '',
      title: tour.title || '',
      image: tour.image || '',
      description: tour.description || '',
      overview: tour.overview || '',
      price: tour.price?.startingFrom || 0,
      currency: tour.price?.currency || 'AUD',
      country: tour.location?.country || '',
      cities: (tour.location?.cities || []).join(', '),
      days: tour.duration?.days || 0,
      nights: tour.duration?.nights || 0,
      travelersAdults: tour.travelers?.adults || 2,
      travelersChildren: tour.travelers?.children || 1,
      travelersInfants: tour.travelers?.infants || 0,
      minimumAge: tour.minimumAge || 5,
      startingPlace: tour.startingPlace || '',
      rating: tour.rating || 5.0,
      category: Array.isArray(tour.category) ? tour.category : [],
      status: tour.status || 'Active',
      highlights: (tour.highlights || []).join('\n'),
      included: (tour.included || []).join('\n'),
      excluded: (tour.excluded || []).join('\n'),
      gallery: tour.gallery && Array.isArray(tour.gallery) ? [...tour.gallery, '', '', '', ''].slice(0, 4) : ['', '', '', ''],
      tourPlan: tour.tourPlan && Array.isArray(tour.tourPlan) ? tour.tourPlan : [{ day: 1, title: '', description: '' }],
      relatedPackages: (tour.relatedPackages || []).join(', ')
    });
    setIsModalOpen(true);
  };

  const handleTourPlanChange = (index: number, field: string, value: any) => {
    const newPlan = [...formData.tourPlan];
    newPlan[index] = { ...newPlan[index], [field]: value };
    setFormData({ ...formData, tourPlan: newPlan });
  };

  const addTourPlanDay = () => {
    setFormData({
      ...formData,
      tourPlan: [...formData.tourPlan, { day: formData.tourPlan.length + 1, title: '', description: '' }]
    });
  };

  const removeTourPlanDay = (index: number) => {
    const newPlan = formData.tourPlan.filter((_: any, i: number) => i !== index).map((day: any, i: number) => ({ ...day, day: i + 1 }));
    setFormData({ ...formData, tourPlan: newPlan });
  };

  const handleGalleryChange = (index: number, value: string) => {
    const newGallery = [...formData.gallery];
    newGallery[index] = value;
    setFormData({ ...formData, gallery: newGallery });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tourPayload = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        image: formData.image,
        description: formData.description,
        overview: formData.overview,
        startingPlace: formData.startingPlace,
        status: formData.status,
        rating: Number(formData.rating),
        minimumAge: Number(formData.minimumAge),
        price: { 
          startingFrom: Number(formData.price), 
          currency: formData.currency, 
          perPerson: true 
        },
        location: { 
          country: formData.country, 
          cities: formData.cities.split(',').map((c: string) => c.trim()).filter(Boolean) 
        },
        duration: { 
          days: Number(formData.days), 
          nights: Number(formData.nights) 
        },
        travelers: {
          adults: Number(formData.travelersAdults),
          children: Number(formData.travelersChildren),
          infants: Number(formData.travelersInfants)
        },
        highlights: formData.highlights.split('\n').filter((h: string) => h.trim()),
        included: formData.included.split('\n').filter((i: string) => i.trim()),
        excluded: formData.excluded.split('\n').filter((x: string) => x.trim()),
        category: formData.category,
        gallery: formData.gallery.filter((url: string) => url.trim()),
        tourPlan: formData.tourPlan.filter((plan: any) => plan.title.trim()),
        relatedPackages: formData.relatedPackages.split(',').map((p: string) => p.trim()).filter(Boolean),
        reviews: editingTour?.reviews || 0
      };

      const { id: _, ...cleanPayload } = tourPayload as any;

      if (editingTour && editingTour.id) {
        // Use setDoc instead of updateDoc for better reliability
        await setDoc(doc(db, 'tours', editingTour.id), cleanPayload, { merge: true });
      } else {
        const newTourRef = doc(collection(db, 'tours'));
        await setDoc(newTourRef, { ...cleanPayload, id: newTourRef.id });
      }
      setIsModalOpen(false);
      fetchTours();
    } catch (error: any) {
      console.error("Error saving: ", error);
      alert(`Save failed: ${error.message || 'Unknown error'}`);
    }
  };

  if (isSyncing) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <RefreshCw className="h-12 w-12 text-primary animate-spin mb-4" />
        <h2 className="text-2xl font-black text-gray-900 mb-2">Migrating Tours</h2>
        <p className="text-gray-500">Bringing your existing JSON data into Firestore...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Tours Management</h1>
          <div className="flex items-center text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100 mt-2 w-fit">
            <CheckCircle2 className="w-3 h-3 mr-1.5" /> Synchronized with Global Site
          </div>
        </div>
        <button onClick={openAddModal} className="flex items-center px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:shadow-primary/30 transition-all transform hover:scale-[1.02]">
          <Plus className="h-4 w-4 mr-2" /> Add New Tour
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search by title or country..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 text-gray-900 font-medium"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
             <div className="col-span-full py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-sm italic">Loading Collection...</div>
        ) : filteredTours.length === 0 ? (
             <div className="col-span-full py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-sm italic">No matching tours found</div>
        ) : filteredTours.map((tour) => (
          <div key={tour.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={tour.image} 
                alt={tour.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => openEditModal(tour)}
                  className="bg-white/90 backdrop-blur-md p-3 rounded-2xl text-primary hover:bg-white transition-all transform hover:scale-110 shadow-xl"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleDelete(tour.id!)}
                  className="bg-white/90 backdrop-blur-md p-3 rounded-2xl text-red-600 hover:bg-white transition-all transform hover:scale-110 shadow-xl"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                   <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">
                     {tour.price?.currency || 'AUD'} {tour.price?.startingFrom}
                   </span>
                   <span className="bg-white/20 backdrop-blur-md text-white border border-white/20 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">
                     {tour.duration?.days}D / {tour.duration?.nights}N
                   </span>
                </div>
                <h3 className="text-xl font-black text-white leading-tight group-hover:text-primary transition-colors line-clamp-2">{tour.title}</h3>
              </div>
            </div>

            <div className="p-8 space-y-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                 <div className="flex items-center text-gray-400">
                    <MapPin className="h-3 w-3 mr-1 text-primary" />
                    {tour.location?.country}
                 </div>
                 <div className="flex items-center text-amber-500">
                    <Star className="h-3 w-3 mr-1 fill-amber-500" />
                    {tour.rating || 5.0}
                 </div>
              </div>
              <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed flex-1">{tour.description}</p>
              
              <div className="pt-4 flex flex-wrap gap-2 border-t border-gray-50">
                 {(Array.isArray(tour.category) ? tour.category : []).slice(0, 2).map((c: string) => (
                    <span key={c} className="text-[9px] font-black text-gray-400 border border-gray-100 px-3 py-1 rounded-full uppercase tracking-widest">
                       {c}
                    </span>
                 ))}
                 {tour.status === 'Draft' && (
                    <span className="text-[9px] font-black text-white bg-gray-400 px-3 py-1 rounded-full uppercase tracking-widest ml-auto">
                      Draft
                    </span>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Comprehensive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity" onClick={() => setIsModalOpen(false)} />

          <div className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">
                  {editingTour ? 'Edit Package' : 'Publish Adventure'}
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Full Package Architect</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-14 h-14 flex items-center justify-center bg-white rounded-3xl text-gray-400 hover:text-red-500 hover:shadow-xl transition-all border border-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-12">
              <form id="tour-form" onSubmit={handleFormSubmit} className="space-y-12">
                
                {/* Section 1: Basic Identity */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary">
                    <Info className="w-5 h-5" />
                    <h4 className="text-sm font-black uppercase tracking-widest">Basic Identity</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Permanent ID (Reference Only)</label>
                      <input type="text" readOnly value={formData.id} className="w-full bg-gray-100 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-400 cursor-not-allowed" placeholder="Auto-generated" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">URL Slug</label>
                      <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner" placeholder="tour-title-slug" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Tour Title</label>
                      <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner" />
                    </div>
                  </div>
                </div>

                {/* Section 2: Logistics & Pricing */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary">
                    <Map className="w-5 h-5" />
                    <h4 className="text-sm font-black uppercase tracking-widest">Logistics & Pricing</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Country</label>
                      <input type="text" required value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Cities (Comma Separated)</label>
                      <input type="text" value={formData.cities} onChange={(e) => setFormData({...formData, cities: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Price</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">{formData.currency}</span>
                        <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Currency Code</label>
                      <input type="text" value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Days</label>
                      <input type="number" value={formData.days} onChange={(e) => setFormData({...formData, days: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Nights</label>
                      <input type="number" value={formData.nights} onChange={(e) => setFormData({...formData, nights: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Minimum Age</label>
                      <input type="number" value={formData.minimumAge} onChange={(e) => setFormData({...formData, minimumAge: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Starting Place</label>
                      <input type="text" value={formData.startingPlace} onChange={(e) => setFormData({...formData, startingPlace: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Rating (1-5)</label>
                        <input type="number" step="0.1" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all" />
                     </div>
                     <div className="flex flex-col">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Travelers (A / C / I)</label>
                        <div className="flex gap-2">
                           <input type="number" value={formData.travelersAdults} onChange={(e) => setFormData({...formData, travelersAdults: e.target.value})} className="flex-1 bg-gray-50 border-none rounded-2xl px-4 py-4 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Adults" />
                           <input type="number" value={formData.travelersChildren} onChange={(e) => setFormData({...formData, travelersChildren: e.target.value})} className="flex-1 bg-gray-50 border-none rounded-2xl px-4 py-4 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Child" />
                           <input type="number" value={formData.travelersInfants} onChange={(e) => setFormData({...formData, travelersInfants: e.target.value})} className="flex-1 bg-gray-50 border-none rounded-2xl px-4 py-4 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Infant" />
                        </div>
                     </div>
                     <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Status</label>
                        <div className="flex gap-2">
                          {['Active', 'Draft'].map(s => (
                            <button key={s} type="button" onClick={() => setFormData({...formData, status: s})} className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${formData.status === s ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}>{s}</button>
                          ))}
                        </div>
                     </div>
                  </div>
                </div>

                {/* Section 3: Narratives & Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary">
                    <List className="w-5 h-5" />
                    <h4 className="text-sm font-black uppercase tracking-widest">Narratives & Content</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Short Description (Card Bio)</label>
                        <textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all resize-none shadow-inner" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Full Overview (HTML/Rich-ish Text)</label>
                        <textarea rows={6} value={formData.overview} onChange={(e) => setFormData({...formData, overview: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Categories</label>
                        <div className="flex flex-wrap gap-2">
                          {categories_list.map(cat => (
                            <button key={cat} type="button" onClick={() => {
                                const current = formData.category;
                                const next = current.includes(cat) ? current.filter((c: string) => c !== cat) : [...current, cat];
                                setFormData({...formData, category: next});
                              }} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${formData.category.includes(cat) ? 'bg-primary text-white border-primary' : 'bg-white text-gray-400 border-gray-100'}`}>
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                       <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Highlights (One per line)</label>
                        <textarea rows={5} value={formData.highlights} onChange={(e) => setFormData({...formData, highlights: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Included (One per line)</label>
                          <textarea rows={5} value={formData.included} onChange={(e) => setFormData({...formData, included: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Excluded (One per line)</label>
                          <textarea rows={5} value={formData.excluded} onChange={(e) => setFormData({...formData, excluded: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-primary/20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Media Assets */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-primary">
                    <ImageIcon className="w-5 h-5" />
                    <h4 className="text-sm font-black uppercase tracking-widest">Media Assets</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Hero Image URL (Main)</label>
                        <input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner" placeholder="/images/hero.jpg" />
                     </div>
                     <div className="space-y-4">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Gallery (4 Photos Max)</label>
                        <div className="grid grid-cols-2 gap-4">
                           {formData.gallery.map((url: string, i: number) => (
                             <input key={i} type="text" placeholder={`Photo Path ${i+1}`} value={url} onChange={(e) => handleGalleryChange(i, e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-primary/20" />
                           ))}
                        </div>
                     </div>
                  </div>
                </div>

                {/* Section 5: Itinerary (Tour Plan) */}
                <div className="space-y-6 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary">
                      <Clock className="w-5 h-5" />
                      <h4 className="text-sm font-black uppercase tracking-widest">Detailed Itinerary</h4>
                    </div>
                    <button type="button" onClick={addTourPlanDay} className="flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-all border border-gray-100">
                      <PlusCircle className="w-3 h-3" /> Add Day
                    </button>
                  </div>
                  <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200">
                    {formData.tourPlan.map((plan: any, i: number) => (
                      <div key={i} className="flex gap-6 p-6 bg-white rounded-3xl border border-gray-100 group">
                        <div className="flex-shrink-0 flex flex-col items-center">
                           <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-black text-lg">
                             {plan.day}
                           </div>
                           <button type="button" onClick={() => removeTourPlanDay(i)} className="mt-4 p-2 text-red-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                             <Trash className="w-4 h-4" />
                           </button>
                        </div>
                        <div className="flex-1 space-y-4">
                           <input type="text" placeholder={`Day ${plan.day} Highlights Title`} value={plan.title} onChange={(e) => handleTourPlanChange(i, 'title', e.target.value)} className="w-full bg-gray-50 border-none rounded-xl px-5 py-3 text-sm font-black focus:ring-2 focus:ring-primary/20" />
                           <textarea placeholder="Tell the story of this day..." rows={3} value={plan.description} onChange={(e) => handleTourPlanChange(i, 'description', e.target.value)} className="w-full bg-gray-50 border-none rounded-xl px-5 py-3 text-xs font-bold text-gray-600 resize-none" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                 {/* Section 6: Advanced Connectivity */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Users className="w-5 h-5" />
                      <h4 className="text-sm font-black uppercase tracking-widest">Connectivity</h4>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Related Packages (Comma Separated Slugs)</label>
                      <input type="text" value={formData.relatedPackages} onChange={(e) => setFormData({...formData, relatedPackages: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all font-mono" placeholder="slug-1, slug-2, slug-3" />
                    </div>
                </div>

              </form>
            </div>

            <div className="p-8 border-t border-gray-50 flex justify-end gap-4 bg-white/80 backdrop-blur-md">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)} 
                className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors"
              >
                Cancel Changes
              </button>
              <button 
                form="tour-form"
                type="submit" 
                className="px-12 py-5 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-3xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {editingTour ? 'Confirm Updates' : 'Publish Massive Package'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTours;
