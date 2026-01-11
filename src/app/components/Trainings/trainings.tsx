import React, { FC } from "react";


interface TrainingResource {
  id: number;
  name: string;
  url: string;
  logo: string;
  description: string;
  category?: string; 
}

const TRAINING_DATA: TrainingResource[] = [
  {
    id: 1,
    name: "Coursera",
    url: "https://www.coursera.org/",
    logo: "../train/course.png",
    description: "Professional certificates and degrees from top universities",
  },
  {
    id: 2,
    name: "edX",
    url: "https://www.edx.org/",
    logo: "https://www.edx.org/trademark-logos/edx-logo-elm.svg",
    description: "Online courses from the world's best universities",
  },
  {
    id: 3,
    name: "Kaya",
    url: "https://kayaconnect.org/",
    logo: "https://kayaconnect.org/theme/image.php/humanitarian_academy/theme_humanitarian_academy/1731568967/logo",
    description: "Humanitarian learning platform with free courses",
  },
  {
    id: 4,
    name: "InterAction",
    url: "https://www.interaction.org/training/",
    logo: "https://translatorswithoutborders.org/wp-content/uploads/2020/10/Interaction-logo.png",
    description: "Training for humanitarian and development professionals",
  },
  {
    id: 5,
    name: "HL Academy",
    url: "https://www.humanitarianleadershipacademy.org/",
    logo: "https://www.humanitarianleadershipacademy.org/wp-content/uploads/2023/03/HLA-logo.png",
    description: "Humanitarian leadership and capacity building",
  },
  {
    id: 6,
    name: "UNITAR",
    url: "https://www.unitar.org/free-and-open-courses",
    logo: "https://www.unitar.org/themes/custom/unitar_2018/logo.png",
    description: "United Nations Institute for Training and Research",
  },
  {
    id: 7,
    name: "BDR",
    url: "https://buildingabetterresponse.org/",
    logo: "https://buildingabetterresponse.org/wp-content/uploads/2022/05/BBR_Logo_Color_RGB.svg",
    description: "Building a Better Response training",
  },
  {
    id: 8,
    name: "NLA",
    url: "https://nla1.org/",
    logo: "https://nla1.org/wp-content/uploads/2023/10/75th-19-600x600.png.webp",
    description: "Norwegian Learning Academy",
  },
  {
    id: 9,
    name: "Humanitarian U",
    url: "https://humanitarianu.org/prof-dev-courses/",
    logo: "https://humanitarianu.org/wp-content/uploads/2021/06/HU-logo-no-bg-1024x1024.png",
    description: "Professional development courses for humanitarians",
  },
  {
    id: 10,
    name: "DisasterReady",
    url: "https://www.disasterready.org/",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAentUgp5Ji5w4X6otC3bC6sVHPZ90HMLkXg&s",
    description: "Free humanitarian and development training",
  },
  {
    id: 11,
    name: "ReliefWeb",
    url: "https://reliefweb.int/training",
    logo: "https://reliefweb.int/themes/custom/common_design_subtheme/img/logos/rw-logo-desktop.svg",
    description: "Training opportunities in humanitarian sector",
  },
  {
    id: 12,
    name: "CALP Network",
    url: "https://www.calpnetwork.org/capacity-building/online-learning/",
    logo: "../train/calp.png",
    description: "Cash transfer programming training",
  },
  {
    id: 13,
    name: "ACFID",
    url: "https://acfid.asn.au/learning/",
    logo: "https://acfid.asn.au/wp-content/uploads/2022/02/ACFID-logo.svg",
    description: "Australian Council for International Development",
  },
  {
    id: 14,
    name: "AHA Trainings",
    url: "https://aha-trainings.de/certificates/certificate-locally-led-humanitarian-action",
    logo: "https://aha-trainings.de/images/AHA_Logo_web_rgb.svg",
    description: "Locally-led humanitarian action training",
  },
  {
    id: 15,
    name: "Global Institute",
    url: "https://globalhumanitarianinstitute.org/",
    logo: "https://globalhumanitarianinstitute.org/wp-content/uploads/2023/04/final-logo.png",
    description: "Professional humanitarian training",
  },
  {
    id: 16,
    name: "IDS",
    url: "https://www.ids.ac.uk/learn-at-ids/",
    logo: "https://www.ids.ac.uk/wp-content/themes/ids/assets/img/project/logo.svg",
    description: "Institute of Development Studies",
  },
  {
    id: 17,
    name: "NPTEL",
    url: "https://nptel.ac.in/courses",
    logo: "https://nptel.ac.in/assets/shared/logo-m.jpg",
    description: "Free online courses from Indian institutions",
  },
  {
    id: 18,
    name: "Mind Luster",
    url: "https://www.mindluster.com/",
    logo: "https://www.mindluster.com/resources/main_logo.png?d",
    description: "Free online courses and certifications",
  },
  {
    id: 19,
    name: "OpenLearn Create",
    url: "https://www.open.edu/openlearncreate/local/ocwfreecourses/freecourse.php",
    logo: "../train/OL.png",
    description: "Free courses from The Open University",
  },
  {
    id: 20,
    name: "CASH-Hub",
    url: "https://cash-hub.org/training-and-development/online-courses/",
    logo: "../train/CH.png",
    description: "Cash and voucher assistance training",
  },
  {
    id: 21,
    name: "Tools4Dev",
    url: "https://tools4dev.org/online-courses/",
    logo: "../train/td.png",
    description: "Practical resources for development workers",
  },
  {
    id: 22,
    name: "FutureLearn",
    url: "https://www.futurelearn.com/",
    logo: "../train/FL.png",
    description: "Online courses from top universities",
  },
];

/**
 * Sub-component for individual Training Cards to improve maintainability and performance.
 */
const TrainingCard: FC<{ training: TrainingResource }> = ({ training }) => (
  <div className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden transform hover:-translate-y-1">
    {/* Logo Header Section */}
    <div className="relative h-44 w-full flex items-center justify-center bg-slate-50/50 p-8">
      <img
        src={training.logo}
        alt={`${training.name} logo`}
        loading="lazy"
        className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
      />
      {/* Decorative Accent */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    </div>

    <div className="p-6 flex flex-col flex-grow items-center text-center">
      <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
        {training.name}
      </h3>

      <p className="text-sm leading-relaxed text-slate-500 mb-6 flex-grow">
        {training.description}
      </p>

      <a
        href={training.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full py-3 px-4 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-all duration-300 group-hover:shadow-lg active:scale-95"
        aria-label={`Explore courses at ${training.name}`}
      >
        Explore Courses
        <svg
          className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
    </div>
  </div>
);

/**
 * Trainings Page Component
 */
const Trainings: FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <main>
        {/* Hero Section with refined visual hierarchy */}
        <section className="relative bg-slate-900 pt-32 pb-20 overflow-hidden">
          {/* Background Pattern/Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500 blur-[120px]" />
          </div>

          <div className="container relative z-10 mx-auto px-6 text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
              Learning Ecosystem
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Professional Training{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Resources
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Accelerate your career with our curated collection of elite
              humanitarian and development learning platforms.
            </p>
          </div>
        </section>

        {/* Resource Grid */}
        <section className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Recommended Platforms
              </h2>
              <p className="text-slate-500">
                Access {TRAINING_DATA.length} verified educational providers
              </p>
            </div>
            <div className="h-1 w-24 bg-blue-600 rounded-full hidden md:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {TRAINING_DATA.map((training) => (
              <TrainingCard key={training.id} training={training} />
            ))}
          </div>
        </section>

        {/* Support/CTA Section */}
        <section className="bg-white border-y border-slate-100 py-16">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl border-1 mx-auto bg-slate-50 rounded-xl p-8 md:p-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Can't find what you're looking for?
              </h2>
              <p className="text-slate-600 mb-8">
                Our database is constantly updating with new humanitarian
                resources and capacity building programs.
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-700 underline-offset-4 hover:underline">
                Suggest a training provider
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Trainings;
