import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

interface Tour {
  id?: string;
  title: string;
  slug: string;
  description: string;
  startingPlace: string;
  location: { country: string; cities: string[] };
  duration: { days: number; nights: number };
  price: { startingFrom: number; currency: string; perPerson: boolean };
  travelers: { adults: number; children: number; infants: number };
  highlights: string[];
  tourPlan: { day: number; title: string; description: string }[];
  included: string[];
  excluded: string[];
  faqs: { question: string; answer: string }[];
}

export default function Dashboard() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Tour | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTours, setSelectedTours] = useState<string[]>([]);
  const [expandedTours, setExpandedTours] = useState<string[]>([]);

  const [form, setForm] = useState<Tour>({
    title: "",
    slug: "",
    description: "",
    startingPlace: "",
    location: { country: "", cities: [] },
    duration: { days: 0, nights: 0 },
    price: { startingFrom: 0, currency: "AUD", perPerson: true },
    travelers: { adults: 0, children: 0, infants: 0 },
    highlights: [],
    tourPlan: [],
    faqs: [],
    included: [],
    excluded: [],
  });

  // FETCH TOURS
  const fetchTours = async () => {
    const snapshot = await getDocs(collection(db, "tours"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,           // ⚠ this is required
      title: doc.data().title ?? "",
      slug: doc.data().slug ?? "",
      startingPlace: doc.data().startingPlace ?? "",
      location: doc.data().location ?? { country: "", cities: [] },
      duration: doc.data().duration ?? { days: 0, nights: 0 },
      price: doc.data().price ?? { startingFrom: 0, currency: "AUD", perPerson: true },
      highlights: doc.data().highlights ?? [],
      tourPlan: doc.data().tourPlan ?? [],
      included: doc.data().included ?? [],
      excluded: doc.data().excluded ?? [],
      faqs: doc.data().faqs ?? [],
      description: doc.data().description ?? "",
      travelers: doc.data().travelers ?? { adults: 0, children: 0, infants: 0 },
    })) as Tour[];
    setTours(data);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // SAVE TOUR
  const handleSubmit = async () => {
    if (editData) {
      await updateDoc(doc(db, "tours", editData.id!), { ...form } as any);
    } else {
      await addDoc(collection(db, "tours"), form);
    }
    setOpen(false);
    setEditData(null);
    fetchTours();
  };

  // DELETE TOUR
  // DELETE TOUR
  const handleDelete = async (id?: string) => {
    if (!id) {
      console.error("Tour ID missing!");
      return;
    }
    try {
      await deleteDoc(doc(db, "tours", id)); // must include id
      console.log("Deleted successfully:", id);
      // refresh table
      fetchTours();
      setSelectedTours(prev => prev.filter(x => x !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  // SELECTION & EXPAND
  const toggleSelect = (id: string) => {
    setSelectedTours((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const toggleExpand = (id: string) => {
    setExpandedTours((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // DYNAMIC FIELDS
  const addHighlight = () =>
    setForm({ ...form, highlights: [...form.highlights, ""] });
  const updateHighlight = (i: number, val: string) => {
    const arr = [...form.highlights];
    arr[i] = val;
    setForm({ ...form, highlights: arr });
  };
  const addDay = () =>
    setForm({
      ...form,
      tourPlan: [...form.tourPlan, { day: 0, title: "", description: "" }],
    });
  const updateDay = (i: number, field: string, val: any) => {
    const arr = [...form.tourPlan];
    arr[i][field as keyof typeof arr[0]] = val as never;
    setForm({ ...form, tourPlan: arr });
  };
  const addIncluded = () =>
    setForm({ ...form, included: [...form.included, ""] });
  const updateIncluded = (i: number, val: string) => {
    const arr = [...form.included];
    arr[i] = val;
    setForm({ ...form, included: arr });
  };
  const addExcluded = () =>
    setForm({ ...form, excluded: [...form.excluded, ""] });
  const updateExcluded = (i: number, val: string) => {
    const arr = [...form.excluded];
    arr[i] = val;
    setForm({ ...form, excluded: arr });
  };
  const addFaq = () =>
    setForm({ ...form, faqs: [...form.faqs, { question: "", answer: "" }] });
  const updateFaq = (i: number, field: string, val: string) => {
    const arr = [...form.faqs];
    arr[i][field as keyof typeof arr[0]] = val;
    setForm({ ...form, faqs: arr });
  };

  // FILTERED TOURS
  const filteredTours = tours.filter((tour) =>
    tour.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 pt-28">
      <h1 className="text-2xl font-bold mb-4">Tours Dashboard</h1>

      {/* SEARCH + ADD */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Tour"
          className="border rounded p-2 w-1/3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span>{selectedTours.length} Selected</span>
        <button
          onClick={() => {
            setOpen(true);
            setEditData(null);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Tour
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border-collapse shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-3">
              <input
                type="checkbox"
                checked={selectedTours.length === tours.length && tours.length > 0}
                onChange={() => {
                  selectedTours.length === tours.length
                    ? setSelectedTours([])
                    : setSelectedTours(tours.map((t) => t.id!));
                }}
              />
            </th>
            <th className="p-3">Title</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredTours.map((tour) => (
            <React.Fragment key={tour.id}>
              <tr className="hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedTours.includes(tour.id!)}
                    onChange={() => toggleSelect(tour.id!)}
                  />
                </td>
                <td
                  className="p-3 cursor-pointer"
                  onClick={() => toggleExpand(tour.id!)}
                >
                  {tour.title ?? "N/A"}
                </td>
                <td className="p-3">
                  A${tour.price?.startingFrom ?? 0}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEditData(tour);
                      setForm(tour);
                      setOpen(true);
                    }}
                    className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    ✏️
                  </button>
                  <tr key={tour.id}>
  <td>
    <button
      onClick={() => {
        console.log("Deleting tour id:", tour.id);
        handleDelete(tour.id);
      }}
    >
      🗑️
    </button>
  </td>
</tr>
                </td>
              </tr>

              {/* Expanded row */}
              {expandedTours.includes(tour.id!) && (
                <tr className="bg-gray-50">
                  <td colSpan={4} className="p-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <strong>Starting Place:</strong>{" "}
                        {tour.startingPlace ?? "N/A"}
                        <br />
                        <strong>Country:</strong>{" "}
                        {tour.location?.country ?? "N/A"}
                        <br />
                        <strong>Cities:</strong>{" "}
                        {tour.location?.cities?.join(", ") ?? "N/A"}
                      </div>
                      <div>
                        <strong>Duration:</strong>{" "}
                        {tour.duration?.days ?? 0} Days /{" "}
                        {tour.duration?.nights ?? 0} Nights
                        <br />
                        <strong>Highlights:</strong>{" "}
                        {tour.highlights?.join(", ") ?? "N/A"}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {open && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center overflow-auto z-50">
    <div className="bg-white p-6 w-[600px] max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
      <h2 className="text-xl mb-4">{editData ? "Edit Tour" : "Add Tour"}</h2>

      {/* BASIC FIELDS */}
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <input
        placeholder="Slug"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <input
        placeholder="Starting Place"
        value={form.startingPlace}
        onChange={(e) => setForm({ ...form, startingPlace: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <input
        placeholder="Country"
        value={form.location.country}
        onChange={(e) =>
          setForm({ ...form, location: { ...form.location, country: e.target.value } })
        }
        className="border p-2 w-full mb-2"
      />
      <input
        placeholder="Cities (comma separated)"
        value={form.location.cities.join(", ")}
        onChange={(e) =>
          setForm({ ...form, location: { ...form.location, cities: e.target.value.split(",").map(c => c.trim()) } })
        }
        className="border p-2 w-full mb-2"
      />
      <input
        placeholder="Duration Days"
        type="number"
        value={form.duration.days}
        onChange={(e) =>
          setForm({ ...form, duration: { ...form.duration, days: Number(e.target.value) } })
        }
        className="border p-2 w-full mb-2"
      />
      <input
        placeholder="Duration Nights"
        type="number"
        value={form.duration.nights}
        onChange={(e) =>
          setForm({ ...form, duration: { ...form.duration, nights: Number(e.target.value) } })
        }
        className="border p-2 w-full mb-2"
      />
      <input
        placeholder="Price (Starting From)"
        type="number"
        value={form.price.startingFrom}
        onChange={(e) =>
          setForm({ ...form, price: { ...form.price, startingFrom: Number(e.target.value) } })
        }
        className="border p-2 w-full mb-2"
      />
      <input
        placeholder="Currency"
        value="AUD"
        readOnly
        className="border p-2 w-full mb-2 bg-gray-50 text-gray-500 cursor-not-allowed"
      />

      {/* HIGHLIGHTS */}
      <h3 className="font-bold mt-4">Highlights</h3>
      {form.highlights.map((h, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input value={h} onChange={(e) => updateHighlight(i, e.target.value)} className="border p-2 w-full"/>
          <button onClick={() => { const arr = [...form.highlights]; arr.splice(i,1); setForm({ ...form, highlights: arr }) }} className="bg-red-500 text-white px-2">Remove</button>
        </div>
      ))}
      <button onClick={addHighlight} className="bg-blue-500 text-white px-4 py-1 mb-2">+ Add Highlight</button>

      {/* TOUR PLAN */}
      <h3 className="font-bold mt-4">Tour Plan</h3>
      {form.tourPlan.map((d, i) => (
        <div key={i} className="border p-2 mb-2">
          <input placeholder="Day" type="number" value={d.day} onChange={(e) => updateDay(i, "day", Number(e.target.value))}/>
          <input placeholder="Title" value={d.title} onChange={(e) => updateDay(i, "title", e.target.value)}/>
          <input placeholder="Description" value={d.description} onChange={(e) => updateDay(i, "description", e.target.value)}/>
        </div>
      ))}
      <button onClick={addDay} className="bg-blue-500 text-white px-4 py-1 mb-2">+ Add Day</button>

      {/* INCLUDED */}
      <h3 className="font-bold mt-4">Included</h3>
      {form.included.map((item, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input value={item} onChange={(e) => updateIncluded(i, e.target.value)} className="border p-2 w-full"/>
          <button onClick={() => { const arr = [...form.included]; arr.splice(i,1); setForm({ ...form, included: arr }) }} className="bg-red-500 text-white px-2">Remove</button>
        </div>
      ))}
      <button onClick={addIncluded} className="bg-blue-500 text-white px-4 py-1 mb-2">+ Add Included</button>

      {/* EXCLUDED */}
      <h3 className="font-bold mt-4">Excluded</h3>
      {form.excluded.map((item, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input value={item} onChange={(e) => updateExcluded(i, e.target.value)} className="border p-2 w-full"/>
          <button onClick={() => { const arr = [...form.excluded]; arr.splice(i,1); setForm({ ...form, excluded: arr }) }} className="bg-red-500 text-white px-2">Remove</button>
        </div>
      ))}
      <button onClick={addExcluded} className="bg-blue-500 text-white px-4 py-1 mb-2">+ Add Excluded</button>

      {/* FAQ */}
      <h3 className="font-bold mt-4">FAQ</h3>
      {form.faqs.map((f, i) => (
        <div key={i} className="mb-2">
          <input placeholder="Question" value={f.question} onChange={(e) => updateFaq(i, "question", e.target.value)} className="border p-2 w-full mb-1"/>
          <input placeholder="Answer" value={f.answer} onChange={(e) => updateFaq(i, "answer", e.target.value)} className="border p-2 w-full"/>
        </div>
      ))}
      <button onClick={addFaq} className="bg-blue-500 text-white px-4 py-1 mb-2">+ Add FAQ</button>

      {/* ACTION */}
      <div className="mt-4 flex gap-2">
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
        <button onClick={() => setOpen(false)} className="bg-gray-400 px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}