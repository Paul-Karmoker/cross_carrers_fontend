import React, { useMemo } from "react";
import Marquee from "react-fast-marquee";

// 1. Define strict types for better DX and safety
interface Portal {
  id: number;
  name: string;
  url: string;
  logo: string;
  type: "image" | "text";
  style?: string;
}

const JobPortalMarquee: React.FC = () => {
  // 2. Memoize data to prevent re-allocation on parent re-renders
  const jobPortals: Portal[] = useMemo(
    () => [
      {
        id: 1,
        name: "Partner 1",
        url: "#",
        logo: "https://i.ibb.co/08JP22L/Open-for-Advertisements.png",
        type: "image",
      },
      {
        id: 2,
        name: "Partner 2",
        url: "#",
        logo: "https://i.ibb.co/08JP22L/Open-for-Advertisements.png",
        type: "image",
      },
      {
        id: 3,
        name: "Partner 3",
        url: "#",
        logo: "https://i.ibb.co/08JP22L/Open-for-Advertisements.png",
        type: "image",
      },
      {
        id: 4,
        name: "Partner 4",
        url: "#",
        logo: "https://i.ibb.co/08JP22L/Open-for-Advertisements.png",
        type: "image",
      },
      {
        id: 5,
        name: "Partner 5",
        url: "#",
        logo: "https://i.ibb.co/08JP22L/Open-for-Advertisements.png",
        type: "image",
      },
      {
        id: 6,
        name: "Partner 6",
        url: "#",
        logo: "https://i.ibb.co/08JP22L/Open-for-Advertisements.png",
        type: "image",
      },
    ],
    []
  );

  return (
    <section className="w-full bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Section Label */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Trusted Partners
            </span>
          </div>

          {/* Marquee Container with Modern Masking */}
          <div className="relative flex-1 w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <Marquee
              direction="left"
              pauseOnHover
              speed={40}
              gradient={false}
              autoFill={true} // Ensures the strip is always full
            >
              {jobPortals.map((portal) => (
                <div
                  key={portal.id}
                  className="mx-8 group transition-all duration-500"
                >
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block outline-none"
                  >
                    {portal.type === "image" ? (
                      <img
                        src={portal.logo}
                        alt={portal.name}
                        className="h-8 md:h-10 w-auto object-contain transition-all duration-500 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <span
                        className={`text-sm font-semibold transition-colors group-hover:text-blue-600 ${portal.style}`}
                      >
                        {portal.name}
                      </span>
                    )}
                  </a>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(JobPortalMarquee);
