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

const Srilanka: React.FC = () => {
  const navigate = useNavigate();
  const srilankaPackages = (packagesData as any).srilanka as Package[];

  return (
    <div>

      {/* 🔹 Hero Section */}
      <div
        style={{
          height: "400px",
          backgroundImage: "url('/images/srilanka-banner.jpg')",
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        ></div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
            Discover Sri Lanka
          </h1>
          <p style={{ fontSize: "18px" }}>
            Explore Beaches, Culture & Scenic Hills
          </p>
        </div>
      </div>

      {/* 🔹 Packages Section */}
      <div style={{ padding: "50px 40px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Sri Lanka Tour Packages
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {srilankaPackages?.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                background: "#fff",
              }}
            >
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
                    background: "#006400",
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

export default Srilanka;