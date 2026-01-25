import { FC, useEffect, useState } from "react";
import Slider, { Settings as SlickSettings } from "react-slick";
import { motion } from "framer-motion";
import {PortalSite, CardProps} from "@/types"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white shadow-lg rounded-full p-2 border border-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300 hidden md:block"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white shadow-lg rounded-full p-2 border border-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300 hidden md:block"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );
};


const JobTrainingPortals: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const settings: SlickSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, arrows: false, dots: true },
      },
    ],
  };

  /* --------------------------------------------------
     Data (Organized)
  -------------------------------------------------- */
  const nationalJobSites: PortalSite[] = [
    {
      id: 1,
      name: "BDJOBS",
      url: "https://bdjobs.com/",
      logo: "https://bdjobs.com/images/logo.png",
      category: "National",
    },
    {
      id: 2,
      name: "Skill Jobs",
      url: "https://skill.jobs/",
      logo: "https://skill.jobs/images/logo-01-01-01-01.png",
      category: "National",
    },
    {
      id: 3,
      name: "MyJobs",
      url: "https://www.myjobs.com.bd/",
      logo: "https://www.myjobs.com.bd/media/front-end/img/main-logo.png",
      category: "National",
    },
    {
      id: 4,
      name: "eJobs",
      url: "https://www.ejobs.com.bd/",
      logo: "https://www.ejobs.com.bd/images/logo.png",
      category: "National",
    },
    {
      id: 5,
      name: "Teletalk",
      url: "https://alljobs.teletalk.com.bd/",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRFUgbjYu-gsviQMoecCi60uUXXXF9anBrAA&s",
      category: "Government",
    },
    {
      id: 6,
      name: "Jobs.com.bd",
      url: "http://www.job.com.bd/",
      logo: "http://job.com.bd/images/logo.gif",
      category: "National",
    },
  ];

  const internationalJobSites: PortalSite[] = [
    {
      id: 1,
      name: "ReliefWeb",
      url: "https://reliefweb.int/jobs",
      logo: "https://reliefweb.int/themes/custom/common_design_subtheme/img/logos/rw-logo-desktop.svg",
      category: "International",
    },
    {
      id: 2,
      name: "Idealist",
      url: "https://www.idealist.org/en",
      logo: "https://www.idealist.org/assets/b8509b56fd9bdacd8b367a86fa5a1481ab19099f/images/logos/logo-idealist.svg",
      category: "International",
    },
    {
      id: 3,
      name: "Impactpool",
      url: "https://www.impactpool.org/",
      logo: "https://i.ibb.co/DHvsmtqQ/2.png",
      category: "UN Jobs",
    },
    {
      id: 4,
      name: "Devex",
      url: "https://www.devex.com/jobs/search",
      logo: "https://i.ibb.co/N85f06w/dev.png",
      category: "International",
    },
  ];

  const trainingSites: PortalSite[] = [
    {
      id: 1,
      name: "Coursera",
      url: "https://www.coursera.org/",
      logo: "https://i.ibb.co/1GjPmFww/course.png",
      category: "Online Learning",
    },
    {
      id: 2,
      name: "Kaya",
      url: "https://kayaconnect.org/",
      logo: "https://kayaconnect.org/theme/image.php/humanitarian_academy/theme_humanitarian_academy/1731568967/logo",
      category: "Humanitarian",
    },
    {
      id: 3,
      name: "EdX",
      url: "https://www.edx.org/",
      logo: "https://www.edx.org/trademark-logos/edx-logo-elm.svg",
      category: "Professional",
    },
    {
      id: 4,
      name: "Udemy",
      url: "https://www.udemy.com/",
      logo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
      category: "Online Learning",
    },
  ];

  /* --------------------------------------------------
     Subcomponents
  -------------------------------------------------- */
  const Card: FC<CardProps> = ({ site, buttonText = "Visit Site" }) => (
    <div className="px-3 py-8">
      <motion.div
        whileHover={{ y: -10 }}
        className="group flex flex-col h-[380px] bg-white  border-[1px] transition-all duration-500 overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

        <div className="p-6 flex flex-col flex-grow items-center text-center">
          {/* Logo Container */}
          <div className="h-24 w-full flex items-center justify-center bg-slate-50 rounded-xl mb-6 p-4 group-hover:bg-white transition-colors duration-300">
            <img
              src={site.logo}
              alt={site.name}
              className="max-h-full max-w-full object-contain filter group-hover:grayscale-0 transition-all duration-300"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://via.placeholder.com/150x80?text=Portal";
              }}
            />
          </div>

          {/* Text Content */}
          <span className="text-[10px] font-bold tracking-[0.1em] text-blue-600 uppercase mb-2">
            {site.category}
          </span>
          <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
            {site.name}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
            Explore premium career opportunities and expert resources at{" "}
            {site.name}.
          </p>
        </div>

        {/* Footer Action */}
        <div className="p-6 pt-0 mt-auto">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-3 px-4 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-all duration-300 group-hover:shadow-lg active:scale-95"
          >
            {buttonText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </motion.div>
    </div>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-10 text-center relative">
      <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
        {children}
      </h2>
      <div className="flex justify-center items-center gap-1">
        <div className="w-12 h-1 bg-blue-600 rounded-full" />
        <div className="w-2 h-1 bg-blue-300 rounded-full" />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-[380px] bg-slate-100 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdfe] min-h-screen py-16">
      <style>{`
        .slick-dots li button:before { color: #3b82f6; font-size: 10px; opacity: 0.3; }
        .slick-dots li.slick-active button:before { color: #2563eb; opacity: 1; }
        .slick-list { margin: 0 -12px; }
        .slick-slide > div { padding: 0 4px; }
      `}</style>

      <div className="max-w-[1420px] mx-auto px-4 space-y-24">
       
        <section>
          <SectionTitle>National Portals</SectionTitle>
          <Slider {...settings}>
            {nationalJobSites.map((site) => (
              <Card key={site.id} site={site} buttonText="Browse Jobs" />
            ))}
          </Slider>
        </section>

        <section>
          <SectionTitle>Global Reach</SectionTitle>
          <Slider {...settings}>
            {internationalJobSites.map((site) => (
              <Card key={site.id} site={site} buttonText="Explore Careers" />
            ))}
          </Slider>
        </section>

        <section>
          <SectionTitle>Skill Development</SectionTitle>
          <Slider {...settings}>
            {trainingSites.map((site) => (
              <Card key={site.id} site={site} buttonText="View Courses" />
            ))}
          </Slider>
        </section>
      </div>
    </div>
  );
};

export default JobTrainingPortals;
