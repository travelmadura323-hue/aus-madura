import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase-config';
import { Plus, Edit2, Trash2, X, AlertCircle, Search, MapPin, Globe, RefreshCw, CheckCircle2, Trash, Wand2 } from 'lucide-react';
import { destinations as mockDestinations } from '../../data/mockData';

interface Destination {
  id?: string;
  name: string;
  type: string;
  image: string;
  description: string;
  region: string;
  status?: string;
}

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDest, setFilteredDest] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [formData, setFormData] = useState<Destination>({
    name: '', type: 'international', image: '', description: '', region: '', status: 'Active'
  });

  const fetchDestinations = useCallback(async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'destinations'));
      const destData: Destination[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        destData.push({ 
          ...data,
          id: doc.id, 
          status: data.status || 'Active'
        } as Destination);
      });
      setDestinations(destData);
      setFilteredDest(destData);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync Logic
  useEffect(() => {
    const checkAndMigrate = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'destinations'));
        
        if (querySnapshot.empty) {
          setIsSyncing(true);
          const batch = writeBatch(db);
          // Only add unique ones from mock data
          const uniqueNames = new Set();
          for (const dest of mockDestinations) {
            if (!uniqueNames.has(dest.name)) {
              const newDocRef = doc(collection(db, 'destinations'));
              batch.set(newDocRef, { ...dest, status: 'Active' });
              uniqueNames.add(dest.name);
            }
          }
          await batch.commit();
          setIsSyncing(false);
          await fetchDestinations();
        } else {
          fetchDestinations();
        }
      } catch (error) {
        console.error("Migration error:", error);
        setLoading(false);
      }
    };
    checkAndMigrate();
  }, [fetchDestinations]);

  // Handle Search
  useEffect(() => {
    const result = destinations.filter(d => 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      d.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDest(result);
  }, [searchTerm, destinations]);

  // Cleanup Duplicates Helper
  const cleanupDuplicates = async () => {
    if (!window.confirm("This will find and remove multiple entries with the same name, keeping only one. Proceed?")) return;
    
    setLoading(true);
    try {
      const seenNames = new Map();
      const docsToDelete: string[] = [];
      
      destinations.forEach(dest => {
        if (seenNames.has(dest.name)) {
          docsToDelete.push(dest.id!);
        } else {
          seenNames.set(dest.name, dest.id);
        }
      });
      
      if (docsToDelete.length === 0) {
        alert("No duplicates found!");
      } else {
        const batch = writeBatch(db);
        docsToDelete.forEach(id => {
          batch.delete(doc(db, 'destinations', id));
        });
        await batch.commit();
        alert(`Successfully removed ${docsToDelete.length} duplicates.`);
        fetchDestinations();
      }
    } catch (error) {
      console.error("Cleanup error:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        await deleteDoc(doc(db, 'destinations', id));
        fetchDestinations();
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  const openAddModal = () => {
    setEditingDest(null);
    setFormData({ name: '', type: 'international', image: '', description: '', region: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const openEditModal = (dest: Destination) => {
    setEditingDest(dest);
    setFormData({ ...dest });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { id, ...cleanPayload } = formData as any;
      if (editingDest && editingDest.id) {
        await updateDoc(doc(db, 'destinations', editingDest.id), cleanPayload);
      } else {
        await addDoc(collection(db, 'destinations'), cleanPayload);
      }
      setIsModalOpen(false);
      fetchDestinations();
    } catch (error) {
      console.error("Error saving: ", error);
      alert("Save failed.");
    }
  };

  if (isSyncing) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <RefreshCw className="h-12 w-12 text-primary animate-spin mb-4" />
        <h2 className="text-2xl font-black text-gray-900 mb-2">Syncing Data</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Major Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
           <h1 className="text-4xl font-black text-gray-900 tracking-tight">Destinations</h1>
           <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">Manage your global travel network</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={cleanupDuplicates} 
            className="flex items-center px-6 py-4 bg-amber-50 text-amber-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-amber-100 transition-all border border-amber-100"
            title="Remove records with same names"
          >
            <Wand2 className="h-4 w-4 mr-2" /> Cleanup Duplicates
          </button>
          <button 
            onClick={openAddModal} 
            className="flex items-center px-10 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:shadow-primary/30 transition-all transform hover:scale-[1.05] active:scale-[0.95] shadow-xl shadow-primary/20"
          >
            <Plus className="h-5 w-5 mr-3" /> Add New Destination
          </button>
        </div>
      </div>

      {/* Main List Container */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search unique locations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-8 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
              />
           </div>
           <div className="flex items-center gap-4 bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">{destinations.length} Active Records</span>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-50">
            <thead className="bg-gray-50/30">
              <tr>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Master Destination</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Region</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Class</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Operational</th>
                <th className="px-10 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Orbit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {loading ? (
                <tr>
                   <td colSpan={5} className="px-10 py-32 text-center text-gray-400 text-sm font-bold uppercase tracking-widest italic">Syncing Map Engine...</td>
                </tr>
              ) : filteredDest.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-10 py-32 text-center">
                      <div className="flex flex-col items-center">
                         <Globe className="h-12 w-12 text-gray-200 mb-4" />
                         <span className="text-gray-400 text-sm font-bold uppercase tracking-widest italic">No Mapped Data Found</span>
                      </div>
                   </td>
                </tr>
              ) : filteredDest.map((dest) => (
                <tr key={dest.id} className="hover:bg-primary/5 transition-all duration-300 group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-20 bg-gray-100 rounded-2xl overflow-hidden shadow-md flex-shrink-0 transform group-hover:scale-110 transition-transform">
                         <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-lg font-black text-gray-900 leading-tight group-hover:text-primary transition-colors">{dest.name}</div>
                        <div className="text-[10px] text-gray-400 truncate max-w-[250px] font-bold uppercase tracking-tight mt-1">{dest.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2 text-xs font-black text-gray-500 uppercase tracking-widest">
                       <MapPin className="h-3.5 w-3.5 text-primary" />
                       {dest.region}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                     <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                       dest.type === 'domestic' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                     }`}>
                       {dest.type}
                     </span>
                  </td>
                   <td className="px-10 py-6">
                    <span className="flex items-center gap-3">
                       <div className={`w-2.5 h-2.5 rounded-full ${dest.status === 'Active' ? 'bg-emerald-500 shadow-lg shadow-emerald-200 animate-pulse' : 'bg-gray-300'}`}></div>
                       <span className="text-xs font-black text-gray-700 uppercase tracking-widest">{dest.status || 'Active'}</span>
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all">
                      <button onClick={() => openEditModal(dest)} className="p-3 bg-white text-blue-600 rounded-2xl shadow-xl hover:bg-blue-600 hover:text-white transition-all border border-blue-100">
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete(dest.id!)} className="p-3 bg-white text-red-600 rounded-2xl shadow-xl hover:bg-red-600 hover:text-white transition-all border border-red-100">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

       {/* Modern Extended Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity" onClick={() => setIsModalOpen(false)} />

          <div className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden flex flex-col">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
               <div>
                  <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
                    {editingDest ? 'Modify Hub' : 'Register Location'}
                  </h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Satellite Mapping System</p>
               </div>
               <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-16 h-16 flex items-center justify-center bg-white rounded-[1.5rem] text-gray-400 hover:text-red-500 hover:shadow-2xl transition-all border border-gray-100"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto">
              <form id="dest-form" onSubmit={handleFormSubmit} className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Destination Legal Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-8 py-5 text-base font-black text-gray-900 focus:ring-4 focus:ring-primary/10 transition-all shadow-inner" placeholder="e.g. Australia" />
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Classification</label>
                    <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-5 text-sm font-black text-gray-900 focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer">
                      <option value="domestic">Domestic Hub</option>
                      <option value="international">Global Hub</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Geographic Region</label>
                    <input type="text" required value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-5 text-sm font-black text-gray-900 focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Oceania" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Image Path or URL</label>
                  <input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-5 text-sm font-black text-gray-900 focus:ring-4 focus:ring-primary/10 transition-all shadow-inner" placeholder="https://... or /images/photo.jpg" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Summary / Description</label>
                  <textarea required rows={5} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-8 py-5 text-sm font-bold text-gray-800 focus:ring-4 focus:ring-primary/10 transition-all resize-none shadow-inner"></textarea>
                </div>

                <div>
                   <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Operational Visibility</label>
                   <div className="flex gap-4">
                      {['Active', 'Draft'].map(s => (
                        <button key={s} type="button" onClick={() => setFormData({...formData, status: s})} className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${formData.status === s ? 'bg-gray-900 text-white border-gray-900 shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}>{s}</button>
                      ))}
                   </div>
                </div>
              </form>
            </div>

            <div className="p-10 border-t border-gray-50 flex justify-end gap-5 bg-gray-50/30">
               <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 py-5 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">Discard</button>
              <button form="dest-form" type="submit" className="px-12 py-5 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-[1.5rem] shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.05] transition-all">
                  Commit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDestinations;
