import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import { PartnerCard } from "../../components/PartnerCard";

const FindAllPartners = () => {
  const initialData = useLoaderData();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true); // show spinner on first load

  // Handle initial loader data
  useEffect(() => {
    setPartners(initialData);
    setLoading(false);
  }, [initialData]);

  const fetchPartners = async (search = "", sort = "") => {
    setLoading(true);

    try {
      let url = `https://study-mate-server-steel-nine.vercel.app/partners?`;
      if (search) url += `search=${search}&`;
      if (sort) url += `sort=${sort}&`;

      const res = await fetch(url);

      // Force visible spinner during slow network
      await new Promise((r) => setTimeout(r, 800));

      const data = await res.json();

      if (data.success) setPartners(data.partners);
      else setPartners([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;
    fetchPartners(search_text);
  };

  const handleSort = (field) => {
    fetchPartners("", field);
  };

  return (
    <div className="p-6">
      <div className="text-3xl font-bold text-center mb-2">Find Partners</div>
      <p className="text-center text-gray-500 mb-6">
        Search and explore available study partners.
      </p>

      <form
        onSubmit={handleSearch}
        className="flex justify-between mb-6 gap-4 items-center"
      >
        {/* Left side: Sort buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleSort("rating")}
            className="btn btn-sm btn-secondary rounded-full"
          >
            Sort by Rating
          </button>
          <button
            type="button"
            onClick={() => handleSort("experience")}
            className="btn btn-sm btn-secondary rounded-full"
          >
            Sort by Experience
          </button>
        </div>

        {/* Right side: Search input */}
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

      {/* ⬇️ CENTERED LOADING SPINNER ⬇️ */}
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <PartnerCard key={partner._id} partner={partner} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FindAllPartners;
