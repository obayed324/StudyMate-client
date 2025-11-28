import React, { useEffect, useState } from "react";
import { PartnerCard } from "./PartnerCard";

const TopPartnersSection = () => {
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
          <PartnerCard
            key={partner._id}
            partner={partner}
            redirectPath={`/partner/${partner._id}`} // send desired redirect path
          />
        ))}
      </div>
    </div>
  );
};

export default TopPartnersSection;
