import React from "react";
import { useNavigate } from "react-router-dom";
import packagesData from "../data/packages.json";

const India: React.FC = () => {
  const navigate = useNavigate();
  const indiaPackages = packagesData.india;

  return (
    <div style={{ fontFamily: "sans-serif", background: "#f9fafc" }}>
      
      {/* ================= HERO SECTION ================= */}
      <section
        style={{
          height: "90vh",
          backgroundImage: "url('/images/india-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center"
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4))"
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "60px", marginBottom: "20px" }}>
            Discover Incredible India
          </h1>
          <p style={{ fontSize: "20px", maxWidth: "700px", margin: "0 auto" }}>
            Explore majestic palaces, spiritual temples, vibrant culture and
            breathtaking landscapes across India.
          </p>

          <button
            style={{
              marginTop: "30px",
              padding: "14px 30px",
              fontSize: "16px",
              background: "#ff6b00",
              border: "none",
              borderRadius: "30px",
              color: "white",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Explore Packages ↓
          </button>
        </div>
      </section>



      {/* ================= PACKAGES SECTION ================= */}
      <section style={{ padding: "80px 60px" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "36px",
            marginBottom: "60px"
          }}
        >
          Popular India Tour Packages
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px"
          }}
        >
          {indiaPackages.map((pkg: any) => (
            <div
              key={pkg.id}
              style={{
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                transition: "0.3s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-10px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              {/* Image */}
              <div style={{ position: "relative" }}>
                <img
                  src={pkg.image || "/images/india-default.jpg"}
                  alt={pkg.title}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover"
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    background: "#ff6b00",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: 600
                  }}
                >
                  {pkg.duration.days} Days
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: "25px" }}>
                <h3 style={{ marginBottom: "10px" }}>{pkg.title}</h3>

                <p style={{ color: "gray", fontSize: "14px" }}>
                  {pkg.location.cities.join(", ")}
                </p>

                <p style={{ marginTop: "15px", fontWeight: 600 }}>
                  Starting From
                </p>

                <h2 style={{ color: "#ff6b00", margin: "5px 0" }}>
                  {pkg.price.currency} {pkg.price.startingFrom}
                </h2>

                <button
                  onClick={() => navigate(`/package/${pkg.id}`)}
                  style={{
                    marginTop: "15px",
                    padding: "10px 18px",
                    background: "#111",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    width: "100%"
                  }}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section
        style={{
          background: "#111",
          color: "white",
          textAlign: "center",
          padding: "80px 20px"
        }}
      >
        <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>
          Ready to Explore India?
        </h2>
        <p style={{ marginBottom: "30px" }}>
          Book your dream vacation today and experience the magic of India.
        </p>
        <button
          style={{
            padding: "14px 30px",
            fontSize: "16px",
            background: "#ff6b00",
            border: "none",
            borderRadius: "30px",
            color: "white",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Contact Us
        </button>
      </section>

    </div>
  );
};

export default India;