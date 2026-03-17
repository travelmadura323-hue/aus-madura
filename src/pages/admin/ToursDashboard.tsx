import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { Tour, defaultTour } from "../../types";
import { ChevronDown, ChevronRight, Plus, Search, Trash2, Pencil } from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
    setLoading(true);
    setError(null);
    try {
      const snapshot = await getDocs(collection(db, "tours"));
      const data = snapshot.docs.map((d) => {
        const raw: any = d.data();
        return {
          ...defaultTour,
          ...raw,
          id: d.id, // IMPORTANT: always use Firestore doc.id
          location: raw.location ?? defaultTour.location,
          duration: raw.duration ?? defaultTour.duration,
          price: raw.price ?? defaultTour.price,
          highlights: raw.highlights ?? [],
          tourPlan: raw.tourPlan ?? [],
          included: raw.included ?? [],
          excluded: raw.excluded ?? [],
          faqs: raw.faqs ?? [],
          gallery: raw.gallery ?? [],
        } as Tour;
      });
      setTours(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const uploadTourImagesFromDevice = async (files: FileList | null, mode: "main" | "gallery") => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const slug = (form.slug || form.title || "tour")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgressText(`Uploading ${i + 1} / ${files.length}...`);
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const fileRef = ref(storage, `tours/${slug}/${Date.now()}-${safeName}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        uploadedUrls.push(url);
      }

      setForm((prev) => {
        if (mode === "main") {
          return { ...prev, image: uploadedUrls[0] || prev.image };
        }
        return { ...prev, gallery: [...(prev.gallery || []), ...uploadedUrls] };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploadProgressText(null);
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const { id, ...payload } = form;
      const payloadClean = {
        ...payload,
        location: form.location || defaultTour.location,
        duration: form.duration || defaultTour.duration,
        price: { ...(form.price || defaultTour.price), currency: "AUD", perPerson: true },
        highlights: form.highlights || [],
        tourPlan: form.tourPlan || [],
        included: form.included || [],
        excluded: form.excluded || [],
        faqs: form.faqs || [],
      };
      if (editingTour?.id) {
        await updateDoc(doc(db, "tours", editingTour.id), payloadClean as Record<string, unknown>);
      } else {
        await addDoc(collection(db, "tours"), payloadClean);
      }
      setModalOpen(false);
      setEditingTour(null);
      setForm(defaultTour);
      fetchTours();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await deleteDoc(doc(db, "tours", id));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      fetchTours();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to delete tour (${id})`);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredTours.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredTours.map((t) => t.id!).filter(Boolean)));
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openAdd = () => {
    setForm(defaultTour);
    setEditingTour(null);
    setModalOpen(true);
  };

  const openEdit = (tour: Tour) => {
    setForm({ ...defaultTour, ...tour });
    setEditingTour(tour);
    setModalOpen(true);
  };

  const addHighlight = () => setForm({ ...form, highlights: [...form.highlights, ""] });
  const updateHighlight = (i: number, v: string) => {
    const arr = [...form.highlights];
    arr[i] = v;
    setForm({ ...form, highlights: arr });
  };
  const removeHighlight = (i: number) => setForm({ ...form, highlights: form.highlights.filter((_, j) => j !== i) });

  const addTourPlan = () => setForm({ ...form, tourPlan: [...form.tourPlan, { day: 0, title: "", description: "" }] });
  const updateTourPlan = (i: number, field: keyof { day: number; title: string; description: string }, v: string | number) => {
    const arr = [...form.tourPlan];
    (arr[i] as Record<string, unknown>)[field] = v;
    setForm({ ...form, tourPlan: arr });
  };
  const removeTourPlan = (i: number) => setForm({ ...form, tourPlan: form.tourPlan.filter((_, j) => j !== i) });

  const addIncluded = () => setForm({ ...form, included: [...form.included, ""] });
  const updateIncluded = (i: number, v: string) => {
    const arr = [...form.included];
    arr[i] = v;
    setForm({ ...form, included: arr });
  };
  const removeIncluded = (i: number) => setForm({ ...form, included: form.included.filter((_, j) => j !== i) });

  const addExcluded = () => setForm({ ...form, excluded: [...form.excluded, ""] });
  const updateExcluded = (i: number, v: string) => {
    const arr = [...form.excluded];
    arr[i] = v;
    setForm({ ...form, excluded: arr });
  };
  const removeExcluded = (i: number) => setForm({ ...form, excluded: form.excluded.filter((_, j) => j !== i) });

  const addFaq = () => setForm({ ...form, faqs: [...form.faqs, { question: "", answer: "" }] });
  const updateFaq = (i: number, field: "question" | "answer", v: string) => {
    const arr = [...form.faqs];
    arr[i][field] = v;
    setForm({ ...form, faqs: arr });
  };
  const removeFaq = (i: number) => setForm({ ...form, faqs: form.faqs.filter((_, j) => j !== i) });

  const filteredTours = tours.filter((t) =>
    (t.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-primary">Tours Management</h1>
        <button
          onClick={() => navigate("/admin/destinations")}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-primary font-semibold text-sm"
        >
          Go to Admin/Destination
        </button>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tours by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">{selectedIds.size} selected</span>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-medium hover:bg-accent/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Tour
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
                  <th className="w-10 p-3 text-left">
                    <input
                      type="checkbox"
                      checked={filteredTours.length > 0 && selectedIds.size === filteredTours.length}
                      onChange={toggleSelectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="w-10 p-3" />
                  <th className="p-3 text-left font-medium text-slate-700">Title</th>
                  <th className="p-3 text-left font-medium text-slate-700">Price</th>
                  <th className="p-3 text-left font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTours.map((tour) => (
                  <React.Fragment key={tour.id}>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(tour.id!)}
                          onChange={() => toggleSelect(tour.id!)}
                          className="rounded"
                        />
                      </td>
                      <td className="p-2">
                        <button onClick={() => toggleExpand(tour.id!)} className="p-1 hover:bg-slate-100 rounded">
                          {expandedIds.has(tour.id!) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="p-3 font-medium text-slate-800">{tour.title || "N/A"}</td>
                      <td className="p-3">
                        AUD${tour.price?.startingFrom ?? 0}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(tour)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(tour.id!)} className="p-2 rounded-lg hover:bg-red-50 text-red-600" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedIds.has(tour.id!) && (
                      <tr className="bg-slate-50/80">
                        <td colSpan={5} className="p-4">
                          <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div><strong>Starting Place:</strong> {tour.startingPlace || "N/A"}</div>
                            <div><strong>Country:</strong> {tour.location?.country || "N/A"}</div>
                            <div><strong>Cities:</strong> {tour.location?.cities?.join(", ") || "N/A"}</div>
                            <div><strong>Duration:</strong> {tour.duration?.days ?? 0}D / {tour.duration?.nights ?? 0}N</div>
                            <div className="sm:col-span-2"><strong>Highlights:</strong> {tour.highlights?.join(", ") || "N/A"}</div>
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
              <h2 className="text-xl font-bold text-primary">{editingTour ? "Edit Tour" : "Add Tour"}</h2>
              <button onClick={() => { setModalOpen(false); setEditingTour(null); }} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border rounded-xl px-4 py-2.5" placeholder="Tour title" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Slug</label>
                  <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border rounded-xl px-4 py-2.5" placeholder="tour-slug" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">Main Image (from device)</label>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={(e) => {
                      void uploadTourImagesFromDevice(e.target.files, "main");
                      e.currentTarget.value = "";
                    }}
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-slate-100 file:text-primary hover:file:bg-slate-200"
                  />
                  {form.image && (
                    <img
                      src={form.image}
                      alt="Tour main"
                      className="mt-3 w-full max-w-[320px] h-40 object-cover rounded-xl border border-slate-200"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">Gallery Images (multiple)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={uploading}
                    onChange={(e) => {
                      void uploadTourImagesFromDevice(e.target.files, "gallery");
                      e.currentTarget.value = "";
                    }}
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-slate-100 file:text-primary hover:file:bg-slate-200"
                  />
                  {uploadProgressText && (
                    <div className="mt-2 text-xs text-slate-500">{uploadProgressText}</div>
                  )}
                  {!!(form.gallery && form.gallery.length) && (
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {(form.gallery || []).slice(0, 6).map((g, i) => (
                        <div key={g + i} className="relative">
                          <img src={g} alt="" className="w-16 h-16 object-cover rounded-lg border border-slate-200" />
                          <button
                            type="button"
                            onClick={() => setForm((prev) => ({ ...prev, gallery: (prev.gallery || []).filter((_, j) => j !== i) }))}
                            className="absolute -top-2 -right-2 bg-white border border-slate-200 rounded-full w-6 h-6 text-xs hover:bg-slate-50"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {(form.gallery || []).length > 6 && (
                        <div className="text-xs text-slate-500 self-center">+{(form.gallery || []).length - 6} more</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Starting Place</label>
                <input value={form.startingPlace} onChange={(e) => setForm({ ...form, startingPlace: e.target.value })} className="w-full border rounded-xl px-4 py-2.5" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Country</label>
                  <input value={form.location?.country} onChange={(e) => setForm({ ...form, location: { ...form.location, country: e.target.value } })} className="w-full border rounded-xl px-4 py-2.5" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Cities (comma separated)</label>
                  <input value={form.location?.cities?.join(", ")} onChange={(e) => setForm({ ...form, location: { ...form.location, cities: e.target.value.split(",").map((c) => c.trim()).filter(Boolean) } })} className="w-full border rounded-xl px-4 py-2.5" />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Days</label>
                  <input type="number" value={form.duration?.days || 0} onChange={(e) => setForm({ ...form, duration: { ...form.duration, days: Number(e.target.value) } })} className="w-full border rounded-xl px-4 py-2.5" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Nights</label>
                  <input type="number" value={form.duration?.nights || 0} onChange={(e) => setForm({ ...form, duration: { ...form.duration, nights: Number(e.target.value) } })} className="w-full border rounded-xl px-4 py-2.5" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Price (Starting From)</label>
                  <input type="number" value={form.price?.startingFrom || 0} onChange={(e) => setForm({ ...form, price: { ...form.price, startingFrom: Number(e.target.value) } })} className="w-full border rounded-xl px-4 py-2.5" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Currency</label>
                <input
                  value="AUD"
                  readOnly
                  className="w-full border rounded-xl px-4 py-2.5 bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>

              <DynamicList label="Highlights" items={form.highlights} onAdd={addHighlight} onUpdate={updateHighlight} onRemove={removeHighlight} />
              <DynamicList label="Included" items={form.included} onAdd={addIncluded} onUpdate={updateIncluded} onRemove={removeIncluded} />
              <DynamicList label="Excluded" items={form.excluded} onAdd={addExcluded} onUpdate={updateExcluded} onRemove={removeExcluded} />

              <div>
                <h3 className="font-medium text-slate-700 mb-2">Tour Plan</h3>
                {form.tourPlan.map((d, i) => (
                  <div key={i} className="border rounded-xl p-4 mb-2 flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input type="number" placeholder="Day" value={d.day || ""} onChange={(e) => updateTourPlan(i, "day", Number(e.target.value) || 0)} className="w-20 border rounded-lg px-2 py-2" />
                      <input placeholder="Title" value={d.title} onChange={(e) => updateTourPlan(i, "title", e.target.value)} className="flex-1 border rounded-lg px-2 py-2" />
                      <button onClick={() => removeTourPlan(i)} className="text-red-500 hover:bg-red-50 px-2 rounded">Remove</button>
                    </div>
                    <textarea placeholder="Description" value={d.description} onChange={(e) => updateTourPlan(i, "description", e.target.value)} className="w-full border rounded-lg px-2 py-2 text-sm" rows={2} />
                  </div>
                ))}
                <button onClick={addTourPlan} className="mt-2 text-accent font-medium text-sm">+ Add Day</button>
              </div>

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
              <button
                onClick={handleSave}
                disabled={uploading}
                className="flex-1 bg-accent text-white py-2.5 rounded-xl font-medium hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : "Save"}
              </button>
              <button onClick={() => setModalOpen(false)} className="px-6 py-2.5 border rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DynamicList({
  label,
  items,
  onAdd,
  onUpdate,
  onRemove,
}: {
  label: string;
  items: string[];
  onAdd: () => void;
  onUpdate: (i: number, v: string) => void;
  onRemove: (i: number) => void;
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
