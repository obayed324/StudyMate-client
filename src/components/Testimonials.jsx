import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    { name: "Alice Johnson", review: "StudyMate helped me find the perfect study partner for my Math class!", rating: 5 },
    { name: "Bob Smith", review: "The partners are really knowledgeable and supportive.", rating: 4.5 },
    { name: "Clara Lee", review: "I improved my exam scores thanks to StudyMate!", rating: 5 },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.floor(r.rating) ? "text-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4">{r.review}</p>
              <h3 className="font-semibold">{r.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
