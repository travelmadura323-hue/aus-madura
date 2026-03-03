import React from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const PackageDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const allPackages = Object.values(packagesData).flat() as Package[];
  const pkg = allPackages.find((p) => p.id === Number(id));

  if (!pkg) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Package Not Found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>{pkg.title}</h1>

      <img
        src={pkg.image}
        alt={pkg.title}
        style={{
          width: "100%",
          maxHeight: "450px",
          objectFit: "cover",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      />

      <p style={{ marginTop: "20px", fontSize: "18px", color: "#555" }}>
        {pkg.description}
      </p>

      <div style={{ marginTop: "20px" }}>
        <h3>📍 Location: {pkg.location}</h3>
        <h3>🕒 Duration: {pkg.duration}</h3>
        <h3>💰 Price: ${pkg.price}</h3>
      </div>

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "30px",
          padding: "10px 18px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ← Back to Packages
      </button>
    </div>
  );
};

export default PackageDetails;