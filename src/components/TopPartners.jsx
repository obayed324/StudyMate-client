import React, { useEffect, useState, useContext } from "react";
import { PartnerCard } from "./PartnerCard";
import { AuthContext } from "../context/AuthContext";

const TopPartnersSection = () => {
  const { user } = useContext(AuthContext);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    // Fetch top-rated partners (public endpoint)
    fetch("http://localhost:3000/partners/top-rated")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPartners(data.partners);
      })
      .catch((err) =>
        console.error("Failed to fetch top partners:", err)
      );
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Top Study Partners
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <PartnerCard key={partner._id} partner={partner} />
        ))}
      </div>
    </div>
  );
};

export default TopPartnersSection;
