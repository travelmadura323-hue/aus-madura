import { useParams } from "react-router-dom";
import { useState } from "react";
import packages from "../data/packages.json";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface Package {
  id: number;
  title: string;
  duration: string;
  price: number;
  location: string;
  image: string;
  description: string;
}

export default function PackageDetails() {
  const { id } = useParams();

  const allPackages: Package[] = Object.values(packages).flat();

  const packageData = allPackages.find(
    (pkg) => pkg.id.toString() === id
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    adults: 1
  });

  if (!packageData)
    return <div className="p-10 text-center">Package Not Found</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

      {/* LEFT CONTENT */}
      <div className="md:col-span-2 space-y-6">

        <img
          src={packageData.image}
          alt={packageData.title}
          className="w-full h-[400px] object-cover rounded-2xl shadow"
        />

        <h1 className="text-3xl font-bold">{packageData.title}</h1>

        <div className="flex gap-6 text-gray-600 text-sm">
          <p>📍 {packageData.location}</p>
          <p>⏳ {packageData.duration}</p>
        </div>

        <p className="text-gray-700 leading-relaxed">
          {packageData.description}
        </p>

        {/* Dummy Tour Plan */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Tour Plan</h2>

          {[1, 2, 3].map((day) => (
            <div
              key={day}
              className="border rounded-lg p-4 mb-3 bg-gray-50"
            >
              <h4 className="font-semibold">Day {day}</h4>
              <p className="text-gray-600 text-sm">
                Detailed itinerary description for day {day}.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="bg-white shadow-xl rounded-2xl p-6 h-fit sticky top-10">

        <h3 className="text-lg font-semibold mb-2">From</h3>
        <p className="text-3xl font-bold text-red-600 mb-6">
          ₹{packageData.price}
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
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
            required
          />

          <PhoneInput
  country={"in"}
  enableSearch={true}
  inputClass="!w-full !h-[48px]"
/>

          <input
            type="date"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
            required
          />

          <input
            type="number"
            min="1"
            defaultValue={1}
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