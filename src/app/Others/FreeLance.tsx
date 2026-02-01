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
          Access premium Freelance job listings and career resources on {site.name}.
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
    { id: 1, name: 'Upwork', url: 'https://www.upwork.com/', logo: 'https://i.ibb.co.com/4wLm11VF/upwork.png' },
    { id: 2, name: 'Fiverr', url: 'https://www.fiverr.com/?source=top_nav', logo: 'https://i.ibb.co.com/PGfpfLyG/Fiverr.png' },
    { id: 3, name: 'Freelancer.com', url: 'https://www.freelancer.com/', logo: 'https://i.ibb.co.com/Swmxgk9g/Freelance.png' },
    { id: 4, name: 'Guru', url: 'https://www.guru.com/', logo: 'https://i.ibb.co.com/4Ry4fMdK/guru.jpg' },
    { id: 5, name: 'PeoplePerHour', url: 'https://www.peopleperhour.com/', logo: 'https://i.ibb.co.com/JFyCWnyY/peopleperhour.png' },
    { id: 6, name: 'Toptal', url: 'https://www.toptal.com/', logo: 'https://assets.toptal.io/images?url=https%3A%2F%2Fwww.toptal.com%2Ftoptal-logo.png&width=360' },
    { id: 7, name: '99designs', url: 'https://99designs.com/', logo: 'https://i.ibb.co.com/jkFXWrrW/99d.png' },
    { id: 8, name: 'FlexJobs', url: 'https://www.flexjobs.com/', logo: 'https://assets.flexjobs.com/blobcontent/flexjobs/images/fj-logo.svg' },
    { id: 9, name: 'We Work Remotely', url: 'https://weworkremotely.com/', logo: 'https://weworkremotely.com/assets/LogoV1-5a0dbe26661ab0602beaf98f789d6e43824f60d122d4abd700268f394ddc1beb.svg' },
    { id: 10, name: 'SolidGigs', url: 'https://solidgigs.com/', logo: 'https://solidgigs.com/wp-content/uploads/2025/01/solidgigs-logo-new-full.png' },
    { id: 11, name: 'Contra', url: 'https://contra.com/discover?view=people', logo: 'https://i.ibb.co.com/pBCLCzBt/Contra.png' },
    { id: 12, name: 'Truelancer', url: 'https://www.truelancer.com/', logo: 'https://i.ibb.co.com/wNqp9CDx/true.jpg' },
    { id: 13, name: 'Ureed', url: 'https://ureed.com/', logo: 'https://i.ibb.co.com/fzWMV2bj/Ureed.png' },
    { id: 14, name: 'Workana', url: 'https://www.workana.com/', logo: 'https://i.ibb.co.com/N2028Ff3/Workana.png' },
    { id: 15, name: 'Kolabtree', url: 'https://www.kolabtree.com/', logo: 'https://i.ibb.co.com/TD1XKS1F/Kolabtree.jpg' },
    { id: 16, name: 'designcrowd', url: 'https://www.designcrowd.com/jobs/home', logo: 'https://dcstatic.com/images/logos/designcrowd-logo-5b55787f20.svg' },
    { id: 17, name: 'Behance', url: 'https://www.behance.net/joblist?tracking_source=nav20', logo: 'https://i.ibb.co.com/yc0hVxCh/images.png' },
    { id: 18, name: 'Hubstaff Talent', url: 'https://hubstafftalent.net/', logo: 'https://i.ibb.co.com/yc7dtgHN/Hubstaff-Talent.png' },
    { id: 19, name: 'Zeerk', url: 'https://zeerk.com/', logo: 'https://zeerk.com/wp-content/uploads/2025/12/zeerk_logo.png' },
    { id: 20, name: 'Jobbers', url: 'https://www.jobbers.io/', logo: 'https://r2.jobbers.io/uploads/2022/05/jobbers-logo-web.png' }
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
              Top 20 Freelance <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Job Portals</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Navigate your career journey with confidence. We've aggregated the most trusted 
              freelance platforms to help you find your next big opportunity Globally .
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