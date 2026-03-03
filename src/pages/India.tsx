import React from "react";
import { useNavigate } from "react-router-dom";
import packagesData from "../data/packages.json";

interface Package {
  id: number;
  title: string;
  duration: string;
  price: number;
  location: string;
  image: string;
  description: string;
}

const India: React.FC = () => {
  const navigate = useNavigate();

  const indiaPackages = (packagesData as any).india as Package[];

  return (
    <div style={{ padding: "40px" }}>
      <h2>India Tour Packages</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "30px",
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
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
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
                  background: "red",
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
  );
};

export default India;