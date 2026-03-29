import { FC, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "./navbar";
import Footer from "./footer";
import Slider from "./slider";
import Guide from "./guide";

// Banner component
const Banner: FC = () => {
  const words = ["INTERVIEW", "JOB", "RESUME/CV", "WRITTEN TEST", "DOCS MAKER", "POWERPOINT MAKER"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 400);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gray-50 py-12 px-4 overflow-hidden">
      {/* Background Image Banner - Low Opacity */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/back.avif" 
          alt="CrossCareers AI Job Portal Background"
          className="w-full h-full object-cover opacity-20" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-transparent to-gray-50/50"></div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20 z-10"></div>

      {/* Content Layer */}
      <div className="relative z-20 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-2 mt-2 font-['Playfair_Display_SC'] drop-shadow-lg">
          CrossCareers
        </h1>

        <h2 className="text-lg font-bold md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
          An AI-powered career hub providing job opportunities, resume building,
          interview preparation, and productivity tools to help job seekers build
          skills and succeed in a competitive market.
        </h2>

        <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
          <span>Bangladesh First AI Generated Career Support Hub for </span>
          <span
            className={`inline-block w-40 sm:w-56 md:w-64 text-center whitespace-nowrap transition-all duration-500 transform font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent ${
              fade ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-1"
            }`}
          >
            {words[currentIndex]}
          </span>
        </h2>

        <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transform transition hover:scale-105 focus:outline-none">
          For More - Click on top "JOBS HERE"
        </button>
      </div>
    </div>
  );
};

// Main homepage component
const Index: FC = () => {
  return (
    <>
      <Helmet>
        {/* Optimized 56-character title for Google Search */}
        <title>AI Resume Builder & Interview Prep BD | CrossCareers</title>
        
        {/* Meta Description for SEO Snippet */}
        <meta 
          name="description" 
          content="CrossCareers: Bangladesh's leading AI-powered job portal. Free AI resume building, interview simulations, and job listings for NGOs and international firms." 
        />
        
        {/* Standard SEO Tags */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://crosscareers.com/" />
      </Helmet>

      <Navbar />
      <Banner />
      <Slider />
      <Guide />
      <Footer />
    </>
  );
};

export default Index;