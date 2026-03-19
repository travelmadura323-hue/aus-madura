import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { Tour, defaultTour } from "../../types";
import { ChevronDown, ChevronRight, Plus, Search, Trash2, Pencil } from "lucide-react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const COUNTRY_OPTIONS = [
  "India", "Australia", "Vietnam", "Sri Lanka", "Singapore",
  "Malaysia", "Thailand", "Nepal", "Maldives", "Bhutan", "Indonesia", "UAE", "Other",
];

// ✅ Tour categories — multi-select
const CATEGORY_OPTIONS = [
  "Family",
  "Honeymoon",
  "Spiritual",
  "Group",
];

const generateSlug = (title: string) =>
  title.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function ToursDashboard() {
  const navigate = useNavigate();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [form, setForm] = useState<Tour>(defaultTour);
  const [uploading, setUploading] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState<string | null>(null);

  const fetchTours = async () => {
    setLoading(true); setError(null);
    try {
      const snapshot = await getDocs(collection(db, "tours"));
      const data = snapshot.docs.map((d) => {
        const raw: any = d.data();
        return {
          ...defaultTour, ...raw, id: d.id,
          location: raw.location ?? defaultTour.location,
          duration: raw.duration ?? defaultTour.duration,
          price: raw.price ?? defaultTour.price,
          highlights: raw.highlights ?? [],
          tourPlan: raw.tourPlan ?? [],
          included: raw.included ?? [],
          excluded: raw.excluded ?? [],
          faqs: raw.faqs ?? [],
          gallery: raw.gallery ?? [],
          categories: raw.categories ?? [], // ✅ categories field
        } as Tour;
      });
      setTours(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tours");
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchTours(); }, []);

  const uploadSingleFile = (file: File, path: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const task = uploadBytesResumable(ref(storage, path), file);
      task.on("state_changed",
        (s) => setUploadProgressText(`Uploading: ${Math.round((s.bytesTransferred / s.totalBytes) * 100)}%`),
        (e) => reject(new Error(e.code === "storage/unauthorized" ? "Permission denied." : `Upload failed: ${e.message}`)),
        async () => resolve(await getDownloadURL(task.snapshot.ref))
      );
    });

  const uploadTourImagesFromDevice = async (files: FileList | null, mode: "main" | "gallery") => {
    if (!files || files.length === 0) return;
    setUploading(true); setError(null);
    try {
      const slug = (form.slug || form.title || "tour").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        urls.push(await uploadSingleFile(files[i], `tours/${slug}/${Date.now()}-${files[i].name.replace(/[^a-zA-Z0-9._-]/g, "_")}`));
      }
      setForm((p) => mode === "main" ? { ...p, image: urls[0] || p.image } : { ...p, gallery: [...(p.gallery || []), ...urls] });
      setUploadProgressText("✓ Upload complete");
      setTimeout(() => setUploadProgressText(null), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
      setUploadProgressText(null);
    } finally { setUploading(false); }
  };

  const handleSave = async () => {
    const slug = form.slug?.trim() || generateSlug(form.title || "tour");
    try {
      const { id, ...payload } = form;
      const payloadClean = {
        ...payload,
        slug,
        location: form.location || defaultTour.location,
        duration: form.duration || defaultTour.duration,
        price: { ...(form.price || defaultTour.price), currency: "AUD", perPerson: true },
        highlights: form.highlights || [],
        tourPlan: form.tourPlan || [],
        included: form.included || [],
        excluded: form.excluded || [],
        faqs: form.faqs || [],
        categories: (form as any).categories || [],
        minimumAge: (form as any).minimumAge ?? null,
        rating: (form as any).rating ?? null,
        travelers: (form as any).travelers ?? null,
      };
      if (editingTour?.id) {
        await updateDoc(doc(db, "tours", editingTour.id), payloadClean as Record<string, unknown>);
      } else {
        await addDoc(collection(db, "tours"), payloadClean);
      }
      setModalOpen(false); setEditingTour(null); setForm(defaultTour); fetchTours();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this tour?")) return;
    try {
      await deleteDoc(doc(db, "tours", id));
      setSelectedIds((p) => { const n = new Set(p); n.delete(id); return n; });
      fetchTours();
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to delete"); }
  };

  // ✅ Toggle category checkbox
  const toggleCategory = (cat: string) => {
    const current: string[] = (form as any).categories || [];
    const updated = current.includes(cat) ? current.filter((c) => c !== cat) : [...current, cat];
    setForm({ ...form, categories: updated } as any);
  };

  const toggleSelect = (id: string) => setSelectedIds((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleSelectAll = () => selectedIds.size === filteredTours.length ? setSelectedIds(new Set()) : setSelectedIds(new Set(filteredTours.map((t) => t.id!).filter(Boolean)));
  const toggleExpand = (id: string) => setExpandedIds((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const openAdd = () => { setForm({ ...defaultTour, categories: [] } as any); setEditingTour(null); setModalOpen(true); };
  const openEdit = (tour: Tour) => { setForm({ ...defaultTour, ...tour, categories: (tour as any).categories || [] } as any); setEditingTour(tour); setModalOpen(true); };

  const addHighlight = () => setForm({ ...form, highlights: [...form.highlights, ""] });
  const updateHighlight = (i: number, v: string) => { const a = [...form.highlights]; a[i] = v; setForm({ ...form, highlights: a }); };
  const removeHighlight = (i: number) => setForm({ ...form, highlights: form.highlights.filter((_, j) => j !== i) });

  const addTourPlan = () => setForm({ ...form, tourPlan: [...form.tourPlan, { day: 0, title: "", description: "" }] });
  const updateTourPlan = (i: number, field: keyof { day: number; title: string; description: string }, v: string | number) => { const a = [...form.tourPlan]; (a[i] as any)[field] = v; setForm({ ...form, tourPlan: a }); };
  const removeTourPlan = (i: number) => setForm({ ...form, tourPlan: form.tourPlan.filter((_, j) => j !== i) });

  const addIncluded = () => setForm({ ...form, included: [...form.included, ""] });
  const updateIncluded = (i: number, v: string) => { const a = [...form.included]; a[i] = v; setForm({ ...form, included: a }); };
  const removeIncluded = (i: number) => setForm({ ...form, included: form.included.filter((_, j) => j !== i) });

  const addExcluded = () => setForm({ ...form, excluded: [...form.excluded, ""] });
  const updateExcluded = (i: number, v: string) => { const a = [...form.excluded]; a[i] = v; setForm({ ...form, excluded: a }); };
  const removeExcluded = (i: number) => setForm({ ...form, excluded: form.excluded.filter((_, j) => j !== i) });

  const addFaq = () => setForm({ ...form, faqs: [...form.faqs, { question: "", answer: "" }] });
  const updateFaq = (i: number, field: "question" | "answer", v: string) => { const a = [...form.faqs]; a[i][field] = v; setForm({ ...form, faqs: a }); };
  const removeFaq = (i: number) => setForm({ ...form, faqs: form.faqs.filter((_, j) => j !== i) });

  const filteredTours = tours.filter((t) => (t.title || "").toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-primary">Tours Management</h1>
        <button onClick={() => navigate("/admin/destinations")} className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-primary font-semibold text-sm">
          Go to Admin/Destination
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">⚠️ {error}</div>}

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search tours..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">{selectedIds.size} selected</span>
          <button onClick={openAdd} className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-medium hover:bg-accent/90 transition-colors">
            <Plus className="w-4 h-4" /> Add Tour
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading tours...</div>
        ) : filteredTours.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No tours found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="w-10 p-3 text-left"><input type="checkbox" checked={filteredTours.length > 0 && selectedIds.size === filteredTours.length} onChange={toggleSelectAll} className="rounded" /></th>
                  <th className="w-10 p-3" />
                  <th className="p-3 text-left font-medium text-slate-700">Title</th>
                  <th className="p-3 text-left font-medium text-slate-700">Country</th>
                  <th className="p-3 text-left font-medium text-slate-700">Categories</th>
                  <th className="p-3 text-left font-medium text-slate-700">Slug</th>
                  <th className="p-3 text-left font-medium text-slate-700">Price</th>
                  <th className="p-3 text-left font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTours.map((tour) => (
                  <React.Fragment key={tour.id}>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3"><input type="checkbox" checked={selectedIds.has(tour.id!)} onChange={() => toggleSelect(tour.id!)} className="rounded" /></td>
                      <td className="p-2"><button onClick={() => toggleExpand(tour.id!)} className="p-1 hover:bg-slate-100 rounded">{expandedIds.has(tour.id!) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</button></td>
                      <td className="p-3 font-medium text-slate-800">{tour.title || "N/A"}</td>
                      <td className="p-3 text-sm">{tour.location?.country ? <span className="text-slate-700">{tour.location.country}</span> : <span className="text-red-400 font-medium">⚠ Missing</span>}</td>
                      {/* ✅ Show categories as badges */}
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {((tour as any).categories || []).length > 0
                            ? ((tour as any).categories as string[]).map((c) => (
                              <span key={c} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full font-medium">{c}</span>
                            ))
                            : <span className="text-slate-400 text-xs">—</span>
                          }
                        </div>
                      </td>
                      <td className="p-3 text-xs font-mono">{tour.slug ? <span className="text-slate-500">{tour.slug}</span> : <span className="text-red-400">⚠ Missing</span>}</td>
                      <td className="p-3 text-sm">AUD${tour.price?.startingFrom ?? 0}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(tour)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(tour.id!)} className="p-2 rounded-lg hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                    {expandedIds.has(tour.id!) && (
                      <tr className="bg-slate-50/80">
                        <td colSpan={8} className="p-4">
                          <div className="grid sm:grid-cols-3 gap-4 text-sm">
                            <div><strong>Country:</strong> {tour.location?.country || "N/A"}</div>
                            <div><strong>Cities:</strong> {tour.location?.cities?.join(", ") || "N/A"}</div>
                            <div><strong>Duration:</strong> {tour.duration?.days ?? 0}D / {tour.duration?.nights ?? 0}N</div>
                            <div><strong>Slug:</strong> <span className="font-mono text-xs">{tour.slug || "N/A"}</span></div>
                            <div className="sm:col-span-2"><strong>Categories:</strong> {((tour as any).categories || []).join(", ") || "N/A"}</div>
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

      {/* ===== MODAL ===== */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center overflow-y-auto z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl my-8">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-primary">{editingTour ? "Edit Tour" : "Add Tour"}</h2>
              <button onClick={() => { setModalOpen(false); setEditingTour(null); }} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>

            <div className="p-6 space-y-4">

              {/* Title + Slug */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Title <span className="text-red-400">*</span></label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value, slug: editingTour ? form.slug : generateSlug(e.target.value) })}
                    className="w-full border rounded-xl px-4 py-2.5"
                    placeholder="Tour title"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Slug <span className="text-slate-400">(auto)</span></label>
                  <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border rounded-xl px-4 py-2.5 font-mono text-sm" placeholder="auto-generated" />
                  <p className="text-[10px] text-slate-400 mt-1">URL: /tours/<strong>{form.slug || "slug"}</strong></p>
                </div>
              </div>

              {/* Images */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">Main Image</label>
                  <input
                    type="text"
                    placeholder="Paste image URL here"
                    value={form.image || ""}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2.5"
                  />
                  {uploading && <div className="mt-2"><p className="text-xs text-slate-500 mb-1">{uploadProgressText}</p><div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-accent h-1.5 rounded-full animate-pulse w-3/4"></div></div></div>}
                  {!uploading && uploadProgressText && <p className="mt-1 text-xs text-green-600">{uploadProgressText}</p>}
                  {form.image && <img src={form.image} alt="Main" className="mt-3 w-full max-w-[320px] h-40 object-cover rounded-xl border border-slate-200" />}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">Gallery Images</label>
                  <input
                    type="text"
                    placeholder="Paste image URL"
                    className="flex-1 border rounded-xl px-4 py-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const value = (e.target as HTMLInputElement).value;
                        if (!value) return;

                        setForm((prev) => ({
                          ...prev,
                          gallery: [...(prev.gallery || []), value],
                        }));

                        (e.target as HTMLInputElement).value = "";
                      }
                    }}
                  />
                  {!!(form.gallery?.length) && (
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {form.gallery.slice(0, 6).map((g, i) => (
                        <div key={i} className="relative">
                          <img src={g} alt="" className="w-16 h-16 object-cover rounded-lg border border-slate-200" />
                          <button type="button" onClick={() => setForm((p) => ({ ...p, gallery: p.gallery.filter((_, j) => j !== i) }))} className="absolute -top-2 -right-2 bg-white border border-slate-200 rounded-full w-6 h-6 text-xs">×</button>
                        </div>
                      ))}
                      {form.gallery.length > 6 && <div className="text-xs text-slate-500 self-center">+{form.gallery.length - 6} more</div>}
                    </div>
                  )}
                </div>
              </div>

              {/* Starting Place */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Starting Place</label>
                <input value={form.startingPlace} onChange={(e) => setForm({ ...form, startingPlace: e.target.value })} className="w-full border rounded-xl px-4 py-2.5" />
              </div>

              {/* Country + Cities */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Country <span className="text-red-400">*</span></label>
                  <select value={form.location?.country || ""} onChange={(e) => setForm({ ...form, location: { ...form.location, country: e.target.value } })} className="w-full border rounded-xl px-4 py-2.5 bg-white">
                    <option value="">-- Select Country --</option>
                    {COUNTRY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {!form.location?.country && <p className="text-[10px] text-red-400 mt-1">⚠ Required — tour won't appear on destination pages</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Cities (comma separated)</label>
                  <input value={form.location?.cities?.join(", ")} onChange={(e) => setForm({ ...form, location: { ...form.location, cities: e.target.value.split(",").map((c) => c.trim()).filter(Boolean) } })} className="w-full border rounded-xl px-4 py-2.5" placeholder="e.g. Delhi, Agra, Jaipur" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">

                {/* Minimum Age */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Minimum Age</label>
                  <input
                    type="number"
                    value={(form as any).minimumAge ?? ""}
                    placeholder="e.g. 5"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        minimumAge: e.target.value === "" ? undefined : Number(e.target.value),
                      } as any)
                    }
                    className="w-full border rounded-xl px-4 py-2.5"
                  />
                </div>
                {/* Travelers */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Travelers
                  </label>
                  <input
                    type="text"
                    value={(form as any).travelers ?? ""}
                    placeholder="e.g. 2-10 People / Flexible"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        travelers: e.target.value,
                      } as any)
                    }
                    className="w-full border rounded-xl px-4 py-2.5"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    value={(form as any).rating ?? ""}
                    placeholder="e.g. 4.9"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        rating: e.target.value === "" ? undefined : Number(e.target.value),
                      } as any)
                    }
                    className="w-full border rounded-xl px-4 py-2.5"
                  />
                </div>

              </div>

              {/* Duration + Price */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Days</label>
                  <input
                    type="number"
                    value={form.duration?.days ?? ""}
                    placeholder="Enter days"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        duration: {
                          ...form.duration,
                          nights: e.target.value === "" ? undefined : Number(e.target.value),
                        },
                      })
                    }
                    className="w-full border rounded-xl px-4 py-2.5"
                  />
                  <label className="block text-xs font-medium text-slate-500 mb-1">Nights</label>
                  <input
                    type="number"
                    value={form.duration?.nights ?? ""}
                    placeholder="Enter nights"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        duration: {
                          ...form.duration,
                          nights: e.target.value === "" ? undefined : Number(e.target.value),
                        },
                      })
                    }
                    className="w-full border rounded-xl px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Price (AUD)</label>
                  <input
                    type="number"
                    value={form.price?.startingFrom ?? ""}
                    placeholder="Enter price"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        price: {
                          ...form.price,
                          startingFrom: e.target.value === "" ? undefined : Number(e.target.value),
                        },
                      })
                    }
                    className="w-full border rounded-xl px-4 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Currency</label>
                <input value="AUD" readOnly className="w-full border rounded-xl px-4 py-2.5 bg-slate-50 text-slate-500 cursor-not-allowed" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                <textarea value={(form as any).description || ""} onChange={(e) => setForm({ ...form, description: e.target.value } as any)} className="w-full border rounded-xl px-4 py-2.5 text-sm" rows={3} placeholder="Short description shown on tour cards" />
              </div>

              {/* ✅ CATEGORIES — Multi-select checkboxes */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">
                  Categories <span className="text-slate-400">(select all that apply)</span>
                </label>
                <div className="border rounded-xl p-4 bg-slate-50/50">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CATEGORY_OPTIONS.map((cat) => {
                      const selected = ((form as any).categories || []).includes(cat);
                      return (
                        <label key={cat} className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer transition-all text-sm ${selected ? 'bg-primary text-white border-primary' : 'bg-white text-slate-700 border-slate-200 hover:border-primary/40'}`}>
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleCategory(cat)}
                            className="hidden"
                          />
                          <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${selected ? 'bg-white border-white' : 'border-slate-300'}`}>
                            {selected && <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span className="leading-tight">{cat}</span>
                        </label>
                      );
                    })}
                  </div>
                  {((form as any).categories || []).length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <p className="text-xs text-slate-500">Selected: <span className="font-medium text-primary">{((form as any).categories as string[]).join(", ")}</span></p>
                    </div>
                  )}
                </div>
              </div>

              <DynamicList label="Highlights" items={form.highlights} onAdd={addHighlight} onUpdate={updateHighlight} onRemove={removeHighlight} />
              <DynamicList label="Included" items={form.included} onAdd={addIncluded} onUpdate={updateIncluded} onRemove={removeIncluded} />
              <DynamicList label="Excluded" items={form.excluded} onAdd={addExcluded} onUpdate={updateExcluded} onRemove={removeExcluded} />

              {/* Tour Plan */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">Tour Plan</h3>
                {form.tourPlan.map((d, i) => (
                  <div key={i} className="border rounded-xl p-4 mb-2 flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input type="number" placeholder="Day" value={d.day || ""} onChange={(e) => updateTourPlan(i, "day", Number(e.target.value) || 0)} className="w-20 border rounded-lg px-2 py-2" />
                      <input placeholder="Title" value={d.title} onChange={(e) => updateTourPlan(i, "title", e.target.value)} className="flex-1 border rounded-lg px-2 py-2" />
                      <button onClick={() => removeTourPlan(i)} className="text-red-500 px-2 rounded">Remove</button>
                    </div>
                    <textarea placeholder="Description" value={d.description} onChange={(e) => updateTourPlan(i, "description", e.target.value)} className="w-full border rounded-lg px-2 py-2 text-sm" rows={2} />
                  </div>
                ))}
                <button onClick={addTourPlan} className="mt-2 text-accent font-medium text-sm">+ Add Day</button>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="font-medium text-slate-700 mb-2">FAQ</h3>
                {form.faqs.map((f, i) => (
                  <div key={i} className="border rounded-xl p-4 mb-2">
                    <input placeholder="Question" value={f.question} onChange={(e) => updateFaq(i, "question", e.target.value)} className="w-full border rounded-lg px-2 py-2 mb-2" />
                    <input placeholder="Answer" value={f.answer} onChange={(e) => updateFaq(i, "answer", e.target.value)} className="w-full border rounded-lg px-2 py-2" />
                    <button onClick={() => removeFaq(i)} className="mt-2 text-red-500 text-sm">Remove</button>
                  </div>
                ))}
                <button onClick={addFaq} className="mt-2 text-accent font-medium text-sm">+ Add FAQ</button>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3">
              <button onClick={handleSave} disabled={uploading} className="flex-1 bg-accent text-white py-2.5 rounded-xl font-medium hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed">
                {uploading ? "Uploading..." : "Save Tour"}
              </button>
              <button onClick={() => setModalOpen(false)} className="px-6 py-2.5 border rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DynamicList({ label, items, onAdd, onUpdate, onRemove }: {
  label: string; items: string[];
  onAdd: () => void; onUpdate: (i: number, v: string) => void; onRemove: (i: number) => void;
}) {
  return (
    <div>
      <h3 className="font-medium text-slate-700 mb-2">{label}</h3>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input value={item} onChange={(e) => onUpdate(i, e.target.value)} className="flex-1 border rounded-xl px-4 py-2" />
          <button onClick={() => onRemove(i)} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl">Remove</button>
        </div>
      ))}
      <button onClick={onAdd} className="text-accent font-medium text-sm">+ Add {label}</button>
    </div>
  );
}