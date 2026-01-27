import React, { useState, useMemo, ChangeEvent, FC } from 'react';
import Navbar from '../components/home/navbar';
import Footer from '../components/home/footer';

/**
 * Interfaces & Types
 */
interface JobSite {
  id: number;
  name: string;
  url: string;
  image: string;
  category: JobCategory;
}

type JobCategory = 
  | 'Humanitarian' 
  | 'Nonprofit' 
  | 'International' 
  | 'Development' 
  | 'UN System' 
  | 'All';

/**
 * Constants
 */
const ITEMS_PER_PAGE = 12;

const JOB_SITES_DATA: JobSite[] = [
  { id: 1, name: 'Reliefweb', url: 'https://reliefweb.int/jobs', image: 'https://reliefweb.int/themes/custom/common_design_subtheme/img/logos/rw-logo-desktop.svg', category: 'Humanitarian' },
  { id: 2, name: 'Idealist', url: 'https://www.idealist.org/en', image: 'https://www.idealist.org/assets/b8509b56fd9bdacd8b367a86fa5a1481ab19099f/images/logos/logo-idealist.svg', category: 'Nonprofit' },
  { id: 3, name: 'Impactpool', url: 'https://www.impactpool.org/', image: 'https://i.ibb.co/DHvsmtqQ/2.png', category: 'International' },
  { id: 4, name: 'DEVEX', url: 'https://www.devex.com/jobs/search', image: 'https://i.ibb.co/Kp53TmHW/1.png', category: 'Development' },
  { id: 5, name: 'DevNetJOBS.org', url: 'https://devnetjobs.org/', image: 'https://i.ibb.co/8nyTjyR7/3.png', category: 'Development' },
  { id: 6, name: 'Coordination SUD', url: 'https://www.coordinationsud.org/espace-emploi/', image: 'https://i.ibb.co/GQCDCNV4/4.png', category: 'Humanitarian' },
  { id: 7, name: 'UN Careers', url: 'https://careers.un.org/area-of-expertise?language=en', image: 'https://i.ibb.co/My9kyq6V/5.png', category: 'UN System' },
  { id: 8, name: 'Inspira', url: 'https://inspira.un.org/psp/PUNA1J/?cmd=login&languageCd=ENG', image: 'https://i.ibb.co/xSzSSjP2/6.png', category: 'UN System' },
  { id: 9, name: 'UNjobs.org', url: 'https://unjobs.org/duty_stations/bangladesh', image: 'https://i.ibb.co/Ng3hbjqD/7.png', category: 'UN System' },
  { id: 10, name: 'Development Aid', url: 'https://www.developmentaid.org/jobs/search?sort=highlighted.desc,postedDate.desc&sectors=12', image: 'https://i.ibb.co/S4jLD2L9/8.png', category: 'Development' },
  { id: 11, name: 'UNjobs.net', url: 'https://www.unjobnet.org/', image: 'https://i.ibb.co/qMBhxSVm/9.png', category: 'UN System' },
  { id: 12, name: 'UN Talent', url: 'https://untalent.org/jobs', image: 'https://i.ibb.co/5gb1KscJ/10.png', category: 'UN System' },
  { id: 13, name: 'Humanitarian Logistics Association', url: 'https://www.humanitarianlogistics.org/jobs', image: 'https://i.ibb.co/Jws34q17/11.png', category: 'Humanitarian' }
];

/**
 * JobCard Sub-component
 */
const JobCard: FC<{ site: JobSite }> = ({ site }) => (
  <div className="group bg-white shadow-sm transition-all duration-500 border border-gray-100 flex flex-col h-full overflow-hidden translate-y-0 hover:-translate-y-2">
    <div className="p-8 flex flex-col items-center flex-grow">
      <div className="relative mb-6 w-full h-24 flex items-center justify-center p-2 bg-gray-50  group-hover:bg-blue-50 transition-colors duration-500">
        <img
          src={site.image}
          alt={`${site.name} logo`}
          className="max-h-16 max-w-[80%] object-contain filter transition-all duration-500"
          loading="lazy"
        />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-blue-600 transition-colors">
        {site.name}
      </h3>
      
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-6">
        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
        {site.category}
      </span>
      
      <div className="mt-auto w-full">
        <a 
          href={site.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full px-5 py-2 bg-blue-600 text-white font-semibold  transition-all duration-300 transform active:scale-95"
        >
          Explore Careers
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  </div>
);

const IntJobs: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  /**
   * Derived States
   */
  const categories = useMemo<JobCategory[]>(() => 
    ['All', ...new Set(JOB_SITES_DATA.map(site => site.category))] as JobCategory[], 
  []);

  const filteredSites = useMemo(() => {
    return JOB_SITES_DATA.filter(site => {
      const matchesCategory = selectedCategory === 'All' || site.category === selectedCategory;
      const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const totalPages = Math.ceil(filteredSites.length / ITEMS_PER_PAGE);
  const currentSites = useMemo(() => {
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    return filteredSites.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredSites, currentPage]);

  /**
   * Event Handlers
   */
  const handleCategoryFilter = (category: JobCategory): void => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100">
      <Navbar />
      
      {/* Hero Header */}
      <header className="relative bg-slate-900 pt-32 pb-24 overflow-hidden mt-16">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-24 w-80 h-80 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-6 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            International <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Job Portals</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Bridge the gap to your global career. Access curated opportunities from 
            the world's most prestigious humanitarian and development organizations.
          </p>
        </div>
      </header>

      {/* Control Bar Section */}
      <section className="container mx-auto px-6 -mt-10 z-20">
        <div className="bg-white  p-6 md:p-8 border border-slate-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by organization name..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-[1px] focus:ring-blue-500 transition-all text-slate-700 font-medium"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-5 py-2.5  text-sm font-bold transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <main className="container mx-auto px-6 py-16 flex-grow">
        {currentSites.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentSites.map((site) => (
                <JobCard key={site.id} site={site} />
              ))}
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <nav className="mt-20 flex justify-center items-center space-x-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-3 border border-slate-200 disabled:opacity-30 hover:bg-white transition-all text-slate-700 shadow-sm"
                  aria-label="Previous page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`w-10 h-10 border-[1px]  text-sm font-bold transition-all ${
                        currentPage === number 
                          ? 'bg-blue-600 text-white  shadow-blue-200 scale-110' 
                          : 'bg-white text-slate-600 hover:bg-blue-50 border border-slate-200'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 border-[1px] border-slate-200  disabled:opacity-30 hover:bg-white transition-all text-slate-700 shadow-sm"
                  aria-label="Next page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white  border-[1px] border-dashed border-slate-300">
            <div className="p-4 bg-slate-50 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-500 text-xl font-medium">No results found for your search criteria.</p>
            <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All');}} 
                className="mt-4 text-blue-600 font-bold hover:underline"
            >
                Clear all filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default IntJobs;