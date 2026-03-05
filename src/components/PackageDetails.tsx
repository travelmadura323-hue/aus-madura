import { useParams } from "react-router-dom";
import { useState } from "react";
import { tours } from "../data/mockData";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PackageDetails() {
  const { id } = useParams();

  const tour = tours.find(
    (t) => t.id?.toString() === id || t.slug === id || t.id === id
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    adults: 1
  });

  if (!tour)
    return <div className="p-10 text-center">Package Not Found</div>;

  const displayLocation = typeof tour.location === 'string'
    ? tour.location
    : tour.location.country;

  const displayDuration = typeof tour.duration === 'string'
    ? tour.duration
    : `${tour.duration.days} Days / ${tour.duration.nights} Nights`;

  const displayPrice = typeof tour.price === 'number'
    ? tour.price
    : tour.price.startingFrom;

  const displayCurrency = (typeof tour.price === 'object' && tour.price.currency === 'INR') ? '₹' : '$';

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

      {/* LEFT CONTENT */}
      <div className="md:col-span-2 space-y-6">

        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-[400px] object-cover rounded-2xl shadow"
        />

        <h1 className="text-3xl font-bold">{tour.title}</h1>

        <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
          <p>📍 {displayLocation}</p>
          <p>⏳ {displayDuration}</p>
          {tour.category && (
            <p className="bg-red-50 text-red-600 px-3 py-1 rounded-full font-semibold">
              🔖 {tour.category}
            </p>
          )}
        </div>

        <p className="text-gray-700 leading-relaxed">
          {tour.description || tour.overview}
        </p>

        {/* Tour Plan */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Tour Plan</h2>

          {(tour.tourPlan || [
            { day: 1, title: "Arrival", description: "Arrival and check-in" },
            { day: 2, title: "Sightseeing", description: "Full day sightseeing tour" },
            { day: 3, title: "Departure", description: "Final shopping and departure" }
          ]).map((step: any) => (
            <div
              key={step.day}
              className="border rounded-lg p-4 mb-3 bg-gray-50"
            >
              <h4 className="font-semibold">Day {step.day}: {step.title}</h4>
              <p className="text-gray-600 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="bg-white shadow-xl rounded-2xl p-6 h-fit sticky top-10">

        <h3 className="text-lg font-semibold mb-2">From</h3>
        <p className="text-3xl font-bold text-red-600 mb-6">
          {displayCurrency}{displayPrice.toLocaleString()}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Enquiry Submitted!");
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Name"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <PhoneInput
            country={"in"}
            enableSearch={true}
            inputClass="!w-full !h-[48px]"
            value={formData.phone}
            onChange={(phone) => setFormData({ ...formData, phone })}
          />

          <input
            type="date"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
            required
            value={formData.travelDate}
            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
          />

          <input
            type="number"
            min="1"
            value={formData.adults}
            onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) })}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Send Enquiry
          </button>
        </form>
      </div>
    </div>
  );
}