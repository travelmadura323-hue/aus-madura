import React from "react";
import { useParams } from "react-router-dom";
import packagesData from "../data/packages.json";

const PackageDetails: React.FC = () => {
  const { id } = useParams();

  const allPackages = Object.values(packagesData).flat() as any[];
  const pkg = allPackages.find((p) => p.id === Number(id));

  if (!pkg) return <h2>Package Not Found</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>{pkg.title}</h2>
      <img
        src={pkg.image}
        alt={pkg.title}
        style={{ width: "400px", marginTop: "20px" }}
      />
      <p style={{ marginTop: "20px" }}>{pkg.description}</p>
      <h3>Duration: {pkg.duration}</h3>
      <h3>Price: ${pkg.price}</h3>
    </div>
  );
};

export default PackageDetails;