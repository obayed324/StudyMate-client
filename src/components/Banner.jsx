import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const images = [
  "https://i.ibb.co.com/bjYxpQjd/pexels-yankrukov-8199659.jpg",
  "https://i.ibb.co.com/Myk610WY/pexels-yankrukov-8199608.jpg",
  "https://i.ibb.co.com/FLNsgfnV/pexels-max-fischer-5212687.jpg",
];

const quotes = [
  {
    title: "Learn Together, Grow Faster",
    subtitle:
      "The best way to master anything is to study with the right partner.",
  },
  {
    title: "Study Smart, Not Hard",
    subtitle:
      "Boost your focus and stay motivated by connecting with like-minded learners.",
  },
  {
    title: "Your Study Journey Starts Here",
    subtitle:
      "Build meaningful learning connections and achieve your academic goals.",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((current - 1 + images.length) % images.length);

  const nextSlide = () =>
    setCurrent((current + 1) % images.length);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-xl mt-6">

      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="w-full shrink-0 relative">
            <img src={src} className="w-full h-[65vh] object-cover" />

            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

            {/* Quotes */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-white text-5xl md:text-6xl font-bold drop-shadow-lg">
                {quotes[current].title}
              </h1>

              <p className="text-gray-200 mt-4 text-lg md:text-xl max-w-2xl">
                {quotes[current].subtitle}
              </p>

              <button className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-all">
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 w-3 rounded-full transition-all ${
              current === i ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
