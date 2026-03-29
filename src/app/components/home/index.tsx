import { FC, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "./navbar";
import Footer from "./footer";
import Slider from "./slider";
import Guide from "./guide";

// Banner component with refined animation
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
    }, 2500); // Slower interval (2.5s) gives users more time to read

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="relative bg-gray-50 py-16 px-4 overflow-hidden min-h-[500px] flex items-center justify-center">
      {/* Background Image Banner - Low Opacity */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/back.avif" 
          alt="CrossCareers AI Job Portal Background"
          className="w-full h-full object-cover opacity-15" 
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-transparent to-gray-50"></div>
      </div>

      {/* Background pattern layer */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-10"></div>

      {/* Content Layer */}
      <div className="relative z-20 text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-extrabold text-gray-900 mb-4 font-['Playfair_Display_SC'] tracking-tight drop-shadow-sm">
          CrossCareers
        </h1>

        <p className="text-lg font-medium md:text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
          An AI-powered career hub providing job opportunities, resume building,
          interview preparation, and productivity tools to help job seekers 
          succeed in the competitive Bangladesh market.
        </p>

        <h2 className="text-xl md:text-3xl text-gray-700 mb-10 font-medium">
          <span>Bangladesh's First AI Career Support for </span>
          <br className="md:hidden" />
          <span
            className={`inline-block min-w-[200px] transition-all duration-500 transform font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent ${
              fade ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"
            }`}
          >
            {words[currentIndex]}
          </span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-700 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform transition hover:-translate-y-1 active:scale-95"
          >
            GET STARTED - EXPLORE JOBS
          </button>
        </div>
      </div>
    </div>
  );
};

// Main homepage component
const Index: FC = () => {
  return (
    <>
      <Helmet>
        {/* Pro SEO Title: 58 characters (Ideal for Google) */}
        <title>AI Resume Builder, Interview Prep & NGO Jobs BD | CrossCareers</title>
        
        {/* Pro Meta Description: 155 characters (Ideal for Google) */}
        <meta 
          name="description" 
          content="The #1 AI career platform in Bangladesh. Build ATS-friendly resumes, prepare for interviews, and find the latest NGO and International jobs. Start for free!" 
        />
        
        {/* Social Media Tags (Open Graph) */}
        <meta property="og:title" content="AI Resume Builder & NGO Jobs BD | CrossCareers" />
        <meta property="og:description" content="Build your career with AI-powered tools and verified job listings in Bangladesh." />
        <meta property="og:url" content="https://crosscareers.com/" />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://crosscareers.com/" />
      </Helmet>

      <Navbar />
      <main>
        <Banner />
        <Slider />
        <Guide />
      </main>
      <Footer />
    </>
  );
};

export default Index;