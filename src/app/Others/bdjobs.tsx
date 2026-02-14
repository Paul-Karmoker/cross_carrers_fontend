import React, { FC } from 'react';
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";

/**
 * Interface for Job Portal data structure
 */
interface JobSite {
  id: number;
  name: string;
  url: string;
  logo: string;
  description?: string;
}

/**
 * Props for the JobCard sub-component
 */
interface JobCardProps {
  site: JobSite;
}

/**
 * Optimized JobCard Component
 * Features better hover states, transitions, and accessible link handling
 */
const JobCard: FC<JobCardProps> = ({ site }) => {
  return (
    <div className="group bg-white border border-gray-100 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
      <div className="p-8 flex flex-col items-center flex-grow">
     
        <div className="w-full h-24 mb-6 flex items-center justify-center bg-gray-50 p-4 group-hover:bg-white transition-colors duration-300">
          <img
            src={site.logo}
            alt={`${site.name} Logo`}
            className="max-h-full max-w-full object-contain filter transition-all duration-500"
            loading="lazy"
          />
        </div>

        <h3 className="text-xl font-bold  mb-2 text-center text-blue-600 transition-colors">
          {site.name}
        </h3>
        
        <p className="text-sm text-gray-500 text-center mb-6">
          Access premium job listings and career resources on {site.name}.
        </p>
      </div>

      <div className="px-8 pb-8">
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-2 bg-blue-600 text-white font-semibold  transition-all duration-300 shadow-gray-200 group-hover:shadow-blue-200"
          aria-label={`Visit ${site.name} website`}
        >
          Explore Careers
          <svg 
            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

const BdJobs: FC = () => {
  const jobSites: JobSite[] = [
    { id: 1, name: 'BDJOBS', url: 'https://bdjobs.com/', logo: 'https://i.ibb.co/Qv0BH1gF/bdjobs.png' },
    { id: 2, name: 'Skill Jobs', url: 'https://skill.jobs/', logo: 'https://i.ibb.co.com/gbJYgFS1/Skill-jobs.png' },
    { id: 3, name: 'MyJobs', url: 'https://www.myjobs.com.bd/', logo: 'https://i.ibb.co.com/V07DnQ8y/myjobs.jpg' },
    { id: 4, name: 'nextjobz', url: 'https://nextjobz.com.bd/', logo: 'https://i.ibb.co.com/wrbnrMTg/next-jobs.png' },
    { id: 5, name: 'Teletalk All Jobs', url: 'https://alljobs.teletalk.com.bd/', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRFUgbjYu-gsviQMoecCi60uUXXXF9anBrAA&s' },
    { id: 6, name: 'Jobs.com.bd', url: 'http://www.job.com.bd/', logo: 'http://job.com.bd/images/logo.gif' },
    { id: 7, name: 'Careerjet', url: 'https://www.careerjet.com.bd/', logo: 'https://i.ibb.co/jZrCpSTf/career-Jet.png' },
    { id: 8, name: 'Shomvob', url: 'https://shomvob.com/', logo: 'https://i.ibb.co/B5fwpbKm/shomvob.png' },
    { id: 9, name: 'Bikroy Jobs', url: 'https://bikroy.com/en/ads/bangladesh/jobs', logo: 'https://i.ibb.co/vC8NR6Fp/bikroy.png' },
    { id: 10, name: 'BDJobsToday', url: 'https://www.bdjobstoday.com/', logo: 'https://i.ibb.co/237LkdxQ/4.png' },
    { id: 11, name: 'Chakri.com.bd', url: 'https://chkri.com/', logo: 'https://i.ibb.co/fd7pGq5F/5.png' },
    { id: 12, name: 'BDjobsLive', url: 'https://www.bdjobslive.com/', logo: 'https://i.ibb.co/CKB8Bc1Y/6.png' },
    { id: 13, name: 'NRBJobs', url: 'https://www.nrbjobs.com/', logo: 'https://i.ibb.co/Kjm0bxhB/7.png' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-grow pt-20">
        <section className="relative overflow-hidden bg-gray-900 py-20 lg:py-28">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Bangladeshi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Job Portals</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Navigate your career journey with confidence. We've aggregated the most trusted 
              platforms to help you find your next big opportunity in Bangladesh.
            </p>
          </div>
        </section>

        {/* Portals Grid Section */}
        <section className="container mx-auto px-6 py-16 lg:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Premium Portals</h2>
              <div className="h-1.5 w-20 bg-blue-600 rounded-full mt-3"></div>
            </div>
            <p className="text-gray-500 font-medium">Showing {jobSites.length} Verified Platforms</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {jobSites.map((site) => (
              <JobCard key={site.id} site={site} />
            ))}
          </div>
          
          {/* Bottom Call to Action or Insight */}
          <div className="mt-20 p-8 md:p-12 bg-white border-[1px] border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Can't find what you're looking for?</h3>
              <p className="text-gray-600 leading-relaxed">
                Our database is updated weekly with new niche job boards and international remote platforms operating in Bangladesh.
              </p>
            </div>
            <button className="whitespace-nowrap px-8 py-2 bg-blue-50 text-blue-700 font-bold  hover:bg-blue-100 transition-colors">
              Suggest a Portal
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BdJobs;