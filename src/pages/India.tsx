import React from "react";
import { useNavigate } from "react-router-dom";
import packagesData from "../data/packages.json";

const India = () => {
  const navigate = useNavigate();
  const indiaPackages = packagesData.india;

const images = import.meta.glob('/images/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});
  return (
    <div>
      <div className="bg-[#191975] py-24 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-red-500">
            Press & News
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold">
            Media
          </h1>

          <p className="mt-6 text-gray-300 leading-relaxed">
            Stay updated with our latest news, press releases,
            and industry recognition.
          </p>
        </div>
      </div>


      {/* 🔹 Hero Section */}
      <div
        style={{
          height: "400px",
          backgroundImage: `url(${images['/images/Temple1.png']})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        ></div>

        {/* Text */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
            Explore Incredible India
          </h1>
          <p style={{ fontSize: "18px" }}>
            Discover Culture, Heritage & Natural Beauty
          </p>
        </div>
      </div>

      {/* 🔹 Packages Section */}
      <div style={{ padding: "50px 40px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          India Tour Packages
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {indiaPackages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                background: "#fff",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative" }}>
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "#fff",
                    padding: "6px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {pkg.duration}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: "15px" }}>
                <h3>{pkg.title}</h3>
                <p style={{ color: "gray" }}>{pkg.location}</p>

                <h4 style={{ marginTop: "10px" }}>
                  Starting from ${pkg.price}
                </h4>

                <button
                  onClick={() => navigate(`/package/${pkg.id}`)}
                  style={{
                    marginTop: "10px",
                    padding: "8px 14px",
                    background: "orange",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default India;