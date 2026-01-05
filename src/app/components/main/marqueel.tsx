import React, { useMemo } from "react";
import Marquee from "react-fast-marquee";

// 1. Define strict types for the portal data
interface JobPortal {
  id: number;
  name: string;
  url: string;
  logo: string;
  type: "image" | "text";
  style?: string; // Optional style for text-based logos
}

const JobPortalMarquee: React.FC = () => {
  // 2. Use useMemo to prevent unnecessary re-renders of the data array
  const jobPortals: JobPortal[] = useMemo(
    () => [
      {
        id: 1,
        name: "Open for Advertisement",
        url: "#",
        logo: "https://i.ibb.co/08JP22L/Open-for-Advertisements.png",
        type: "image",
      },
      {
        id: 2,
        name: "Open for Advertisement",
        url: "#",
        logo: "https://i.ibb.co/08JP22L/Open-for-Advertisements.png",
        type: "image",
      },
      {
        id: 3,
        name: "Open for Advertisement",
        url: "#",
        logo: "https://i.ibb.co/08JP22L/Open-for-Advertisements.png",
        type: "image",
      },
      {
        id: 4,
        name: "Open for Advertisement",
        url: "#",
        logo: "https://i.ibb.co/08JP22L/Open-for-Advertisements.png",
        type: "image",
      },
      {
        id: 5,
        name: "Open for Advertisement",
        url: "#",
        logo: "https://i.ibb.co/08JP22L/Open-for-Advertisements.png",
        type: "image",
      },
    ],
    []
  );

  return (
    <section className="w-full bg-white dark:bg-gray-950 py-8 border-y border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4">
        {/* Optional Label for Professional Context */}
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6">
          Official Partners & Advertisers
        </p>

        <div className="relative group">
          {/* 3. Industry Standard Gradient Overlays (Fading Edges) */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-gray-950 dark:via-gray-950/80 z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-gray-950 dark:via-gray-950/80 z-10 pointer-events-none" />

          <Marquee
            direction="left"
            pauseOnHover
            speed={40}
            gradient={false}
            className="flex items-center"
          >
            {jobPortals.map((portal) => (
              <div
                key={portal.id}
                className="mx-10 flex items-center justify-center transition-all duration-300 opacity-60 hover:opacity-100 filter grayscale hover:grayscale-0"
              >
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative p-2"
                >
                  {portal.type === "image" ? (
                    <img
                      src={portal.logo}
                      alt={portal.name}
                      // 4. Performance: Lazy load and height containment
                      loading="lazy"
                      className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span
                      className={`text-xl font-bold px-4 py-2 rounded-lg ${portal.style || "bg-gray-100 text-gray-800"}`}
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
    </section>
  );
};

export default JobPortalMarquee;
