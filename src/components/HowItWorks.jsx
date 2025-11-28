import React from "react";
import { FaUserGraduate, FaSearch, FaBook, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    { icon: <FaUserGraduate size={40} />, title: "Sign Up", description: "Create your StudyMate account to get started." },
    { icon: <FaSearch size={40} />, title: "Find Partners", description: "Browse highly rated study partners based on subjects and skills." },
    { icon: <FaBook size={40} />, title: "Study Together", description: "Connect and schedule study sessions with your partner." },
    { icon: <FaCheckCircle size={40} />, title: "Achieve Goals", description: "Track progress and improve your learning outcomes." },
  ];

  return (
    <section className="max-w-7xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition-all">
            <div className="mb-4 text-blue-500">{step.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
