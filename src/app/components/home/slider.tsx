import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { PortalSite, CardProps } from "@/types";

/* Swiper styles */
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const JobTrainingPortals: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  /* ───────── DATA ───────── */
  const nationalJobSites: PortalSite[] = [
    { id: 1, name: "BDJOBS", url: "https://bdjobs.com/", logo: "https://bdjobs.com/images/logo.png", category: "National" },
    { id: 2, name: "Skill Jobs", url: "https://skill.jobs/", logo: "https://i.ibb.co/gbJYgFS1/Skill-jobs.png", category: "National" },
    { id: 3, name: "Careerjet", url: "https://www.careerjet.com.bd/", logo: "https://i.ibb.co/jZrCpSTf/career-Jet.png", category: "National" },
    { id: 4, name: "nextjobz", url: "https://nextjobz.com.bd/", logo: "https://i.ibb.co/wrbnrMTg/next-jobs.png", category: "National" },
    { id: 5, name: "Teletalk", url: "https://alljobs.teletalk.com.bd/", logo: "https://i.ibb.co/d4Rk8zP2/images.png", category: "Government" },
    { id: 6, name: "Jobs.com.bd", url: "http://www.job.com.bd/", logo: "http://job.com.bd/images/logo.gif", category: "National" },
  ];

  const internationalJobSites: PortalSite[] = [
    { id: 1, name: "ReliefWeb", url: "https://reliefweb.int/jobs", logo: "https://reliefweb.int/themes/custom/common_design_subtheme/img/logos/rw-logo-desktop.svg", category: "International" },
    { id: 2, name: "Idealist", url: "https://www.idealist.org/en", logo: "./public/idealist.jpg", category: "International" },
    { id: 3, name: "Impactpool", url: "https://www.impactpool.org/", logo: "https://i.ibb.co/DHvsmtqQ/2.png", category: "UN Jobs" },
    { id: 4, name: "Devex", url: "https://www.devex.com/jobs/search", logo: "https://i.ibb.co/N85f06w/dev.png", category: "International" },
  ];

  const trainingSites: PortalSite[] = [
    { id: 1, name: "Coursera", url: "https://www.coursera.org/", logo: "https://i.ibb.co/1GjPmFww/course.png", category: "Online Learning" },
    { id: 2, name: "Kaya", url: "https://kayaconnect.org/", logo: "https://i.ibb.co/XZjfX029/Kaya.png", category: "Humanitarian" },
    { id: 3, name: "EdX", url: "https://www.edx.org/", logo: "./public/edx.png", category: "Professional" },
    { id: 4, name: "Udemy", url: "https://www.udemy.com/", logo: "./public/udemy.png", category: "Online Learning" }, // safer fallback
  ];

  /* ───────── CARD ───────── */
  const Card: FC<CardProps> = ({ site, buttonText = "Visit Site" }) => (
    <motion.div whileHover={{ y: -6 }} className="flex flex-col h-[340px] bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="p-6 flex flex-col flex-grow items-center text-center">
        <div className="h-20 w-full flex items-center justify-center bg-slate-50 rounded-lg mb-4 p-3">
          <img
            src={site.logo}
            alt={`${site.name} official logo`}
            loading="lazy"
            decoding="async"
            width="140"
            height="70"
            className="max-h-full object-contain"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/fallback.webp"; }}
          />
        </div>
        <span className="text-xs font-bold text-blue-600 mb-1">{site.category}</span>
        <h3 className="text-lg font-bold mb-2">{site.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">Explore career opportunities and resources at {site.name}.</p>
      </div>
      <div className="p-4 mt-auto">
        <a href={site.url} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
          {buttonText}
        </a>
      </div>
    </motion.div>
  );

  /* ───────── SECTION ───────── */
  const Section = ({ title, data, btn }: any) => (
    <section>
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {data.map((site: PortalSite) => (
          <SwiperSlide key={site.id}>
            <Card site={site} buttonText={btn} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-4 gap-6 p-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[320px] bg-gray-100 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdfe] py-16">
      <div className="max-w-[1400px] mx-auto px-4 space-y-12">
        <Section title="National Portals" data={nationalJobSites} btn="Browse Jobs" />
        <Section title="Global Job Sites" data={internationalJobSites} btn="Explore Careers" />
        <Section title="Training Platforms" data={trainingSites} btn="View Courses" />
      </div>
    </div>
  );
};

export default JobTrainingPortals;