import { FC, useState, useEffect } from "react";

const Banner: FC = () => {
  const words = [
    "Interview",
    "Jobs",
    "Resume",
    "Written Test",
    "Word Docs Maker",
    "PowerPoint Maker",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 400); // slightly longer for smoother crossfade
    }, 1500); // change every 1.5 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="relative bg-gray-50 py-8 px-2 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

      <div className="relative text-center max-w-4xl mx-auto">
        {/* H1 with Playfair Display SC + drop shadow */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-2 mt-2 font-['Playfair_Display_SC'] drop-shadow-lg">
          CrossCareers
        </h1>

        {/* First H2: Description */}
        <h2 className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
          An AI-powered career hub providing job opportunities, resume building,
          interview preparation, and productivity tools to help job seekers build
          skills and succeed in a competitive market.
        </h2>

        {/* Second H2: Rotating word line */}
        <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
          <span>Bangladesh First AI Generated Career Support Hub for </span>
          <span
            className={`inline-block w-40 sm:w-56 md:w-64 text-center whitespace-nowrap transition-all duration-500 transform ${
              fade
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-1"
            } bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent font-bold`}
          >
            {words[currentIndex]}
          </span>
        </h2>

        {/* Call‑to‑Action Button */}
        <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transform transition hover:scale-105 focus:outline-none">
          Explore Jobs at "JOBS HERE"
        </button>
      </div>
    </div>
  );
};

export default Banner;