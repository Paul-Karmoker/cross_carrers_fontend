import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// --- Types ---
interface PortalSite {
  id: number;
  name: string;
  url: string;
  logo: string;
  category: "National" | "International" | "Training";
}

interface CardProps {
  site: PortalSite;
  buttonText: string;
}

// --- Data ---
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
    name: "Teletalk All Jobs",
    url: "https://alljobs.teletalk.com.bd/",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRFUgbjYu-gsviQMoecCi60uUXXXF9anBrAA&s",
    category: "National",
  },
  {
    id: 7,
    name: "CrossCareers",
    url: "/bdjobs",
    logo: "https://i.ibb.co/Y75Y5NSb/banner.gif",
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
    id: 3,
    name: "Impactpool",
    url: "https://www.impactpool.org/",
    logo: "https://i.ibb.co/DHvsmtqQ/2.png",
    category: "International",
  },
  {
    id: 4,
    name: "Devex",
    url: "https://www.devex.com/jobs/search",
    logo: "https://i.ibb.co/N85f06w/dev.png",
    category: "International",
  },
  {
    id: 5,
    name: "DevNetJOBS",
    url: "https://devnetjobs.org/",
    logo: "https://i.ibb.co/cKvPr0B4/DJ.png",
    category: "International",
  },
  {
    id: 6,
    name: "CrossCareers",
    url: "/intjobs",
    logo: "https://i.ibb.co/Y75Y5NSb/banner.gif",
    category: "International",
  },
];

const trainingSites: PortalSite[] = [
  {
    id: 1,
    name: "Coursera",
    url: "https://www.coursera.org/",
    logo: "https://i.ibb.co/1GjPmFww/course.png",
    category: "Training",
  },
  {
    id: 2,
    name: "Kaya",
    url: "https://kayaconnect.org/",
    logo: "https://kayaconnect.org/theme/image.php/humanitarian_academy/theme_humanitarian_academy/1731568967/logo",
    category: "Training",
  },
  {
    id: 3,
    name: "EdX",
    url: "https://www.edx.org/",
    logo: "https://www.edx.org/trademark-logos/edx-logo-elm.svg",
    category: "Training",
  },
  {
    id: 5,
    name: "Udemy",
    url: "https://www.udemy.com/",
    logo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
    category: "Training",
  },
  {
    id: 6,
    name: "CrossCareers",
    url: "/paid",
    logo: "https://i.ibb.co/Y75Y5NSb/banner.gif",
    category: "Training",
  },
];

// --- Components ---

const PortalCard: React.FC<CardProps> = ({ site, buttonText }) => (
  <motion.div whileHover={{ y: -8 }} className="h-full p-3">
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col overflow-hidden">
      <div className="p-6 flex-grow flex flex-col items-center justify-center">
        <div className="h-16 w-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
          <img
            src={site.logo}
            alt={site.name}
            className="max-h-full max-w-[140px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
        </div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center line-clamp-1">
          {site.name}
        </h3>
        <span className="mt-1 px-3 py-1 text-[10px] uppercase tracking-widest font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
          {site.category}
        </span>
      </div>

      <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-2.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 font-semibold rounded-xl text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm"
        >
          {buttonText}
        </a>
      </div>
    </div>
  </motion.div>
);

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => (
  <div className="text-center mb-12">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white"
    >
      {title}
    </motion.h2>
    <p className="mt-3 text-gray-500 dark:text-gray-400 font-medium">
      {subtitle}
    </p>
    <div className="w-16 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full" />
  </div>
);

const JobTrainingPortals: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const swiperSettings = {
    modules: [Autoplay, Pagination, Navigation],
    spaceBetween: 20,
    slidesPerView: 1,
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { clickable: true, dynamicBullets: true },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    },
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] dark:bg-gray-950 py-16 space-y-24">
      {/* National Section */}
      <section className="container mx-auto px-4">
        <SectionHeader
          title="National Job Portals"
          subtitle="Top career opportunities within the country"
        />
        <Swiper {...swiperSettings} className="pb-14">
          {nationalJobSites.map((site) => (
            <SwiperSlide key={site.id}>
              <PortalCard site={site} buttonText="Browse Jobs" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* International Section */}
      <section className="bg-white dark:bg-gray-900/50 py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Global Opportunities"
            subtitle="Explore international development and humanitarian roles"
          />
          <Swiper {...swiperSettings} className="pb-14">
            {internationalJobSites.map((site) => (
              <SwiperSlide key={site.id}>
                <PortalCard site={site} buttonText="Explore Global" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Training Section */}
      <section className="container mx-auto px-4">
        <SectionHeader
          title="Skills & Training"
          subtitle="Enhance your expertise with world-class courses"
        />
        <Swiper {...swiperSettings} className="pb-14">
          {trainingSites.map((site) => (
            <SwiperSlide key={site.id}>
              <PortalCard site={site} buttonText="Start Learning" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default JobTrainingPortals;
