import React from "react";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";
import errorImg from "../assets/error-404.png"

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-green-50 to-white text-gray-700 px-4">
      {/* Illustration */}
      <img
        src={errorImg}
        alt="404 Illustration"
        className="w-64 md:w-80 mb-8 animate-bounce-slow"
        onError={(e) => (e.target.style.display = "none")}
      />

      {/* 404 Text */}
      <h1 className="text-7xl md:text-8xl font-extrabold text-green-700 mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Oops! Page Not Found 🌿
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.  
        Let's get you back on track to a greener place.
      </p>

      {/* Back Home Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all duration-300 hover:scale-105"
      >
        <FaHome className="text-lg" /> Go Home
      </Link>

      
    </div>
  );
};

export default ErrorPage;
