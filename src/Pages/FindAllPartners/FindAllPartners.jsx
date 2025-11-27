import { useLoaderData } from "react-router";

import { useState } from "react";
import { PartnerCard } from "../../components/PartnerCard";

const FindAllPartners = () => {
  const data = useLoaderData();
  const [partners, setPartners] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/partners?search=${search_text}`
      );
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    const sorted = [...partners].sort((a, b) => {
      if (field === "rating") return b.rating - a.rating;
      if (field === "experience") return b.experienceLevel.localeCompare(a.experienceLevel);
      return 0;
    });
    setPartners(sorted);
  };

  return (
    <div className="p-6">
      <div className="text-3xl font-bold text-center mb-2">Find Partners</div>
      <p className="text-center text-gray-500 mb-6">
        Search and explore available study partners.
      </p>

      <form onSubmit={handleSearch} className="flex justify-between mb-6 gap-4">
        <button
          type="button"
          onClick={() => handleSort("rating")}
          className="btn btn-sm btn-secondary rounded-full"
        >
          Sort by Rating
        </button>
        <label className="flex items-center w-full max-w-md rounded-full border border-gray-300 overflow-hidden">
          <input
            type="search"
            name="search"
            placeholder="Search by name or subject"
            className="flex-1 px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm rounded-full m-1"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </label>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map((partner) => (
          <PartnerCard key={partner._id} partner={partner} />
        ))}
      </div>
    </div>
  );
};

export default FindAllPartners;
