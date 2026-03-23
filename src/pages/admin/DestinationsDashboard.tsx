import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc,setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { Destination, defaultDestination } from "../../types";
import { ChevronDown, ChevronRight, Plus, Search, Trash2, Pencil } from "lucide-react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const generateSlug = (name: string) =>
  name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

export default function DestinationsDashboard() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [form, setForm] = useState<Destination>(defaultDestination);
  const [uploading, setUploading] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState<string | null>(null);

  const fetchDestinations = async () => {
    setLoading(true); setError(null);
    try {
      const snapshot = await getDocs(collection(db, "destinations"));
      const data = snapshot.docs.map((d) => ({
        id: d.id, ...defaultDestination, ...d.data(),
        cities: d.data().cities ?? [],
        images: d.data().images ?? [],
        header: d.data().header ?? "",
        countriesIncluded: d.data().countriesIncluded ?? [],
      })) as Destination[];
      setDestinations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch destinations");
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchDestinations(); }, []);

  const uploadImagesFromDevice = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true); setError(null);
    try {
      const slug = (form.slug || form.name || "destination").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgressText(`Uploading ${i + 1} / ${files.length}...`);
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filePath = `destinations/${slug}/${Date.now()}-${safeName}`;
        const url = await new Promise<string>((resolve, reject) => {
          const task = uploadBytesResumable(ref(storage, filePath), file);
          task.on("state_changed",
            (s) => setUploadProgressText(`Uploading: ${Math.round((s.bytesTransferred / s.totalBytes) * 100)}%`),
            (e) => reject(new Error(`Upload failed: ${e.message}`)),
            async () => resolve(await getDownloadURL(task.snapshot.ref))
          );
        });
        uploadedUrls.push(url);
      }
      setForm((prev) => ({ ...prev, images: [...(prev.images || []), ...uploadedUrls] }));
      setUploadProgressText("✓ Upload complete");
      setTimeout(() => setUploadProgressText(null), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
      setUploadProgressText(null);
    } finally { setUploading(false); }
  };

  const handleSave = async () => {
    // ✅ Auto-generate slug if empty
    const slug = form.slug?.trim() || generateSlug(form.name || "destination");
    try {
      const { id, ...payload } = form;
      const payloadClean = {
        ...payload,
        slug,
        cities: form.cities ?? [],
        images: form.images ?? [],
        header: form.header ?? "",
        countriesIncluded: (form.countriesIncluded || []).filter(c => c.trim()),
      };
      if (editingDest?.id) {
        await setDoc(
          doc(db, "destinations", editingDest.id),
          payloadClean as Record<string, unknown>,
          { merge: true }
        );
      } else {
        await addDoc(collection(db, "destinations"), payloadClean);
      }
      setModalOpen(false); setEditingDest(null); setForm(defaultDestination); fetchDestinations();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this destination?")) return;
    try {
      await deleteDoc(doc(db, "destinations", id));
      fetchDestinations();
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to delete"); }
  };

  const toggleExpand = (id: string) => setExpandedIds((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const openAdd = () => { setForm({ ...defaultDestination, header: "", countriesIncluded: [] }); setEditingDest(null); setModalOpen(true); };
  const openEdit = (dest: Destination) => { setForm({ ...defaultDestination, ...dest, countriesIncluded: dest.countriesIncluded || [] }); setEditingDest(dest); setModalOpen(true); };

  const addCity = () => setForm({ ...form, cities: [...(form.cities || []), ""] });
  const updateCity = (i: number, v: string) => { const a = [...(form.cities || [])]; a[i] = v; setForm({ ...form, cities: a }); };
  const removeCity = (i: number) => setForm({ ...form, cities: form.cities.filter((_, j) => j !== i) });

  const addImage = () => setForm({ ...form, images: [...(form.images || []), ""] });
  const updateImage = (i: number, v: string) => { const a = [...(form.images || [])]; a[i] = v; setForm({ ...form, images: a }); };
  const removeImage = (i: number) => setForm({ ...form, images: form.images.filter((_, j) => j !== i) });

  const filteredDestinations = destinations.filter((d) => (d.name || "").toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-primary mb-6">Destinations Management</h1>

      {/* ✅ Info banner */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-sm">
        ℹ️ Destinations added here will automatically appear in the website header with their cities.
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">⚠️ {error}</div>}

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search destinations..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-medium hover:bg-accent/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Destination
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading destinations...</div>
        ) : filteredDestinations.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No destinations found. Add one to show it in the header!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="w-10 p-3" />
                  <th className="p-3 text-left font-medium text-slate-700">Name</th>
                  <th className="p-3 text-left font-medium text-slate-700">Slug</th>
                  <th className="p-3 text-left font-medium text-slate-700">Country</th>
                  <th className="p-3 text-left font-medium text-slate-700">Cities</th>
                  <th className="p-3 text-left font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDestinations.map((dest) => (
                  <React.Fragment key={dest.id}>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-2">
                        <button onClick={() => toggleExpand(dest.id!)} className="p-1 hover:bg-slate-100 rounded">
                          {expandedIds.has(dest.id!) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="p-3 font-medium text-slate-800">{dest.name || "N/A"}</td>
                      <td className="p-3 text-xs font-mono text-slate-500">{dest.slug || <span className="text-red-400">⚠ Missing</span>}</td>
                      <td className="p-3 text-sm text-slate-600">{dest.country || dest.region || "N/A"}</td>
                      {/* ✅ Show cities as tags */}
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {(dest.cities || []).length > 0
                            ? (dest.cities || []).slice(0, 3).map((c) => (
                                <span key={c} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full font-medium">{c}</span>
                              ))
                            : <span className="text-slate-400 text-xs">No cities</span>
                          }
                          {(dest.cities || []).length > 3 && (
                            <span className="text-[10px] text-slate-400">+{(dest.cities || []).length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(dest)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(dest.id!)} className="p-2 rounded-lg hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                    {expandedIds.has(dest.id!) && (
                      <tr className="bg-slate-50/80">
                        <td colSpan={6} className="p-4">
                          <div className="space-y-2 text-sm">
                            <div><strong>All Cities:</strong> {dest.cities?.join(", ") || "None"}</div>
                            <div><strong>Description:</strong> {dest.description ? dest.description.slice(0, 200) + (dest.description.length > 200 ? "..." : "") : "N/A"}</div>
                            {dest.images && dest.images.length > 0 && (
                              <div>
                                <strong>Images:</strong>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                  {dest.images.slice(0, 4).map((img, i) => <img key={i} src={img} alt="" className="w-16 h-16 object-cover rounded-lg" />)}
                                  {dest.images.length > 4 && <span className="text-slate-500 self-center">+{dest.images.length - 4} more</span>}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center overflow-y-auto z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl my-8">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-primary">{editingDest ? "Edit Destination" : "Add Destination"}</h2>
              <button onClick={() => { setModalOpen(false); setEditingDest(null); }} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="p-6 space-y-4">

              {/* Name + Slug */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Name <span className="text-red-400">*</span></label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value, slug: editingDest ? form.slug : generateSlug(e.target.value) })}
                    className="w-full border rounded-xl px-4 py-2.5"
                    placeholder="e.g. India"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Slug <span className="text-slate-400">(auto)</span></label>
                  <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border rounded-xl px-4 py-2.5 font-mono text-sm" placeholder="auto-generated" />
                  <p className="text-[10px] text-slate-400 mt-1">URL: /destinations/<strong>{form.slug || "slug"}</strong></p>
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Country</label>
                <input value={form.country || ""} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full border rounded-xl px-4 py-2.5" placeholder="e.g. India" />
              </div>

              {/* ✅ NEW: Region/Header field */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Header / Region <span className="text-slate-400">(e.g. Mainland Europe, Southeast Asia)</span></label>
                <input value={form.header || ""} onChange={(e) => setForm({ ...form, header: e.target.value })} className="w-full border rounded-xl px-4 py-2.5" placeholder="e.g. Mainland Europe" />
              </div>

              {/* ✅ NEW: Countries included for filtering */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-slate-500">Countries/Regions Included</label>
                  <span className="text-[10px] text-blue-500 font-medium">✓ Used for package filtering by header</span>
                </div>
                <p className="text-[10px] text-slate-500 mb-2">Enter countries to include when this destination is selected (e.g., France, Germany, Italy for Mainland Europe)</p>
                {(form.countriesIncluded || []).map((c, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={c} onChange={(e) => {
                      const updated = [...(form.countriesIncluded || [])];
                      updated[i] = e.target.value;
                      setForm({ ...form, countriesIncluded: updated });
                    }} className="flex-1 border rounded-xl px-4 py-2" placeholder="e.g. France, Germany, Spain" />
                    <button onClick={() => {
                      const updated = (form.countriesIncluded || []).filter((_, j) => j !== i);
                      setForm({ ...form, countriesIncluded: updated });
                    }} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl">Remove</button>
                  </div>
                ))}
                <button onClick={() => {
                  setForm({ ...form, countriesIncluded: [...(form.countriesIncluded || []), ""] });
                }} className="text-accent font-medium text-sm">+ Add Country</button>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                <textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border rounded-xl px-4 py-2.5" rows={3} placeholder="Short description" />
              </div>

              {/* ✅ Cities — shown in header dropdown */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-slate-700">Cities</h3>
                  <span className="text-[10px] text-blue-500 font-medium">✓ These appear in the header dropdown</span>
                </div>
                {(form.cities || []).map((c, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={c} onChange={(e) => updateCity(i, e.target.value)} className="flex-1 border rounded-xl px-4 py-2" placeholder="e.g. Chennai, Mumbai, Delhi" />
                    <button onClick={() => removeCity(i)} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl">Remove</button>
                  </div>
                ))}
                <button onClick={addCity} className="text-accent font-medium text-sm">+ Add City</button>
              </div>

              {/* Images */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">Images</h3>
                <div className="mb-3">
                  <label className="block text-xs font-medium text-slate-500 mb-2">Upload from device</label>
                  <input type="file" accept="image/*" multiple disabled={uploading}
                    onChange={(e) => { void uploadImagesFromDevice(e.target.files); e.currentTarget.value = ""; }}
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-slate-100 file:text-primary hover:file:bg-slate-200"
                  />
                  {uploadProgressText && <div className="mt-2 text-xs text-slate-500">{uploadProgressText}</div>}
                </div>
                <div className="text-xs text-slate-500 mb-2">Or paste image URLs:</div>
                {(form.images || []).map((img, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={img} onChange={(e) => updateImage(i, e.target.value)} className="flex-1 border rounded-xl px-4 py-2 text-sm" placeholder="https://..." />
                    <button onClick={() => removeImage(i)} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl">Remove</button>
                  </div>
                ))}
                <button onClick={addImage} className="text-accent font-medium text-sm">+ Add Image URL</button>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3">
              <button onClick={handleSave} disabled={uploading} className="flex-1 bg-accent text-white py-2.5 rounded-xl font-medium hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed">
                {uploading ? "Uploading..." : "Save Destination"}
              </button>
              <button onClick={() => setModalOpen(false)} className="px-6 py-2.5 border rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}