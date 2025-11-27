import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-20 py-10 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* LOGO + NAME */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl font-extrabold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              StudyMate
            </h1>
            <p className="text-gray-600 mt-2 text-center md:text-left max-w-md">
              Your personalized platform to find study partners, build academic connections, 
              and grow together through shared learning.
            </p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 text-xl">
            <a
              href="https://www.facebook.com/share/1JidC6wjpg/"
              className="p-3 rounded-full bg-white shadow hover:bg-blue-500 hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/Oba__yed?t=EIvozOLy03Z3SgP-CGQDiw&s=09"
              className="p-3 rounded-full bg-white shadow hover:bg-sky-500 hover:text-white transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammad-obayed-sarkar-873360253?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="p-3 rounded-full bg-white shadow hover:bg-blue-700 hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.instagram.com/obayed__sarkar?igsh=MTc4ZGpqa2pza2d4dg=="
              className="p-3 rounded-full bg-white shadow hover:bg-pink-600 hover:text-white transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="text-center mt-8 pt-6 border-t border-gray-300 text-gray-600 text-sm">
          © {new Date().getFullYear()} StudyMate. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
