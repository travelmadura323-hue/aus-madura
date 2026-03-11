import { Link } from "react-router-dom";
import { destinations } from "../data/mockData";

export default function Destinations() {
  return (
    <section className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-primary text-center mb-14">
          Explore Destinations
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {destinations.map((destination) => (
            <Link
              key={destination.id}
              to={`/destinations/${destination.id}`}
              className="group"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl h-[350px]">

                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/40"></div>

                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl text-white font-bold">
                    {destination.name}
                  </h3>
                  <p className="text-sm opacity-80">
                    {destination.region}
                  </p>
                </div>

              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}