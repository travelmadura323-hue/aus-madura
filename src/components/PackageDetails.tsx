import { useParams } from "react-router-dom";
import { useState } from "react";
import { tours } from "../data/mockData";
import EnquiryModal from "./EnquiryModal";


export default function PackageDetails() {
  const { id } = useParams();

  const tour = tours.find(
    (t) => t.id?.toString() === id || t.slug === id || t.id === id
  );

  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">

      {/* LEFT CONTENT */}
      <div className="md:col-span-2 space-y-6 sm:space-y-8">

        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-[250px] sm:h-[400px] object-cover rounded-2xl shadow"
        />

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{tour.title}</h1>

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
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 h-fit lg:sticky top-28">

        <h3 className="text-lg font-semibold mb-2">From</h3>
        <p className="text-3xl font-bold text-red-600 mb-6">
          {displayCurrency}{displayPrice.toLocaleString()}
        </p>

        <button
          onClick={() => setIsEnquiryModalOpen(true)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Send Enquiry
        </button>
      </div>

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </div>

  );
}