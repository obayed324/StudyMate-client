import { Link } from "react-router";

export const PartnerCard = ({ partner }) => {
  const {
    _id,
    name,
    profileimage,
    subject,
    studyMode,
    experienceLevel,
    rating,
  } = partner;

  return (
    <div className="card bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="h-48 overflow-hidden rounded-t-xl">
        <img
          src={profileimage}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold">{name}</h2>
        <div className="flex gap-2 mt-1 text-sm text-gray-600">
          <span>Subject: {subject}</span>
          <span>| Mode: {studyMode}</span>
          <span>| Exp: {experienceLevel}</span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-yellow-500">
          ⭐ {rating?.toFixed(1) || "N/A"}
        </div>
        <div className="card-actions mt-4">
          <Link
            to={`/partner/${_id}`}
            className="btn btn-sm btn-primary w-full rounded-full hover:bg-linear-to-r hover:from-pink-500 hover:to-red-500 text-white"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};
