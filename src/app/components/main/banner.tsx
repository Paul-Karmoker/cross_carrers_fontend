import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 1. Define Types for your data
interface Advertisement {
  id: number;
  image: string;
  alt: string;
}

const advertisements: Advertisement[] = [
  {
    id: 0,
    image: "https://i.ibb.co/HkMRZnb/6.jpg",
    alt: "Future Leaders Program",
  },
  {
    id: 1,
    image: "https://i.ibb.co/7x4CmDy8/1.jpg",
    alt: "Development Sector Training",
  },
  {
    id: 2,
    image: "https://i.ibb.co/KxyNXQfz/2.jpg",
    alt: "Humanitarian Workshop",
  },
  { id: 3, image: "https://i.ibb.co/ZpXSHBPj/3.jpg", alt: "Leadership Summit" },
  { id: 4, image: "https://i.ibb.co/ZpHcHMXM/4.jpg", alt: "Career Growth" },
  { id: 5, image: "https://i.ibb.co.com/FkL4xXDX/5.jpg", alt: "Global Impact" },
];

const Banner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-black">
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-6 flex flex-col md:flex-row items-center py-12 md:py-20 gap-8">
        {/* Left Content Column */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <div className="inline-block animate-fade-in">
            <img
              src="https://i.ibb.co/Y75Y5NSb/banner.gif"
              alt="Banner Logo"
              className="max-w-[300px] md:max-w-full h-auto drop-shadow-xl"
            />
          </div>

          <div className="relative pt-4">
            <div className="absolute -left-4 top-0 w-1 bg-green-600 h-full hidden md:block" />
            <p className="text-2xl md:text-4xl font-serif font-bold text-gray-800 dark:text-gray-100 leading-tight">
              &quot;
              <span className="text-green-700 dark:text-green-500 italic">
                Empowering
              </span>{" "}
              Future Leaders in the
              <span className="block mt-2">
                Development &amp; Humanitarian Sector.&quot;
              </span>
            </p>
          </div>
        </div>

        {/* Right Slider Column */}
        <div className="w-full md:w-1/2">
          <div className="relative group p-2 bg-white/30 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl">
            <Swiper
              spaceBetween={20}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="rounded-xl overflow-hidden"
            >
              {advertisements.map((ad, index) => (
                <SwiperSlide key={ad.id}>
                  <div className="relative aspect-[16/9] w-full bg-gray-200 animate-pulse-slow">
                    <img
                      src={ad.image}
                      alt={ad.alt}
                      // 2. Optimization: Load the first image immediately
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "low"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onLoad={(e) =>
                        (e.currentTarget.parentElement!.className =
                          "relative aspect-[16/9] w-full")
                      }
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
