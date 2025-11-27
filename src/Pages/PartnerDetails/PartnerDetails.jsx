import { useLoaderData } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const PartnerDetails = () => {
  const { partner } = useLoaderData();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    if (!user) {
      toast.error("You must be logged in to send a request.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/partners/${partner._id}/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: user.email }),
        }
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Partner request sent successfully!");
      } else {
        toast.error("Failed to send request.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-8 bg-linear-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl animate-fadeIn">
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        {/* Profile Image */}
        <div className="relative w-full lg:w-1/3 flex justify-center">
          <img
            src={partner.profileimage}
            alt={partner.name}
            className="w-64 h-64 object-cover rounded-3xl shadow-xl border-4 border-white transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 px-4 py-2 rounded-full shadow-md font-semibold text-purple-700">
            ⭐ {partner.rating?.toFixed(1) || 0}
          </div>
        </div>

        {/* Partner Info */}
        <div className="flex-1 flex flex-col justify-between space-y-6">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-500 animate-textGradient">
            {partner.name}
          </h1>

          <div className="space-y-2 text-lg text-gray-700">
            <p>
              <span className="font-semibold">Subject:</span> {partner.subject}
            </p>
            <p>
              <span className="font-semibold">Study Mode:</span> {partner.studyMode}
            </p>
            <p>
              <span className="font-semibold">Experience Level:</span> {partner.experienceLevel}
            </p>
            <p>
              <span className="font-semibold">Availability:</span> {partner.availabilityTime}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {partner.location}
            </p>
            <p>
              <span className="font-semibold">Partner Count:</span> {partner.partnerCount || 0}
            </p>
          </div>

          <button
            onClick={handleRequest}
            disabled={loading}
            className={`mt-4 lg:mt-6 w-full lg:w-1/2 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500"
            }`}
          >
            {loading ? "Sending..." : "Send Partner Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
