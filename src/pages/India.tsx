import React from "react";
import { useNavigate } from "react-router-dom";
import packagesData from "../data/packages.json";

interface PackageType {
  id: number;
  title: string;
  duration: string; // "7 Days / 6 Nights"
  price: number;
  location: string;
  image: string;
  description: string;
}

const India: React.FC = () => {
  const navigate = useNavigate();
  const indiaPackages: PackageType[] = packagesData.india || [];

  return (
    <div style={{ padding: "60px", background: "#f4f6f9" }}>
      <h2 style={{ fontSize: "32px", marginBottom: "40px" }}>
        India Tour Packages
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
        }}
      >
        {indiaPackages.map((pkg) => {
          const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(pkg.price);

          return (
            <div
              key={pkg.id}
              style={{
                background: "#fff",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-8px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              {/* Image Section */}
              <div style={{ position: "relative" }}>
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  style={{
                    width: "100%",
                    height: "230px",
                    objectFit: "cover",
                  }}
                />

                {/* Duration Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    background: "white",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  ⏱ {pkg.duration}
                </div>

                {/* Location */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    left: "15px",
                    color: "white",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  📍 {pkg.location}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "20px" }}>
                <h3 style={{ marginBottom: "10px", color: "#1a237e" }}>
                  {pkg.title}
                </h3>

                <p style={{ color: "#777", marginBottom: "5px" }}>
                  Starting from
                </p>

                <h2 style={{ color: "#0d47a1", marginBottom: "15px" }}>
                  {formattedPrice}
                </h2>

                <button
                  onClick={() => navigate(`/package/${pkg.id}`)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#d32f2f",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  View Details →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default India;