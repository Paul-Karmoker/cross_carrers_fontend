import React, { FC, memo, useState, useMemo, ChangeEvent } from "react";
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { blogPosts } from './blogs/blogdata';

interface Embassy {
  readonly id: number;
  readonly name: string;
  readonly url: string;
  readonly logo: string;
}

interface EmbassyCardProps {
  embassy: Embassy;
}

const ITEMS_PER_PAGE = 12;

const formatDateForSEO = (dateString: string) => {
  const date = new Date(dateString);
  return {
    iso: date.toISOString().split('T')[0],
    display: date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };
};

// Get 6 most recent blog posts related to embassy/international careers
const relevantCategories = ['Career Guide', 'Interview Support', 'Resume / CV', 'International Careers'];
const relatedArticles = blogPosts
  .filter(post => relevantCategories.includes(post.category))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 6);

/**
 * Optimized EmbassyCard Component
 */
const EmbassyCard: FC<EmbassyCardProps> = ({ embassy }) => {
  return (
    <div className="group bg-white border border-gray-100 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden rounded-xl shadow-sm hover:shadow-lg">
      <div className="p-8 flex flex-col items-center flex-grow">
        <div className="w-full h-24 mb-6 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg group-hover:from-emerald-100 group-hover:to-teal-100 transition-colors duration-300">
          <img
            src={embassy.logo}
            alt={`${embassy.name} Logo`}
            className="max-h-full max-w-full object-contain filter transition-all duration-500"
            loading="lazy"
          />
        </div>

        <h3 className="text-xl font-bold mb-2 text-center text-gray-800 group-hover:text-emerald-600 transition-colors">
          {embassy.name}
        </h3>
        
        <p className="text-sm text-gray-500 text-center mb-6">
          Explore career opportunities and job vacancies at the {embassy.name} in Bangladesh.
        </p>
      </div>

      <div className="px-8 pb-8">
        <a
          href={embassy.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-2.5 bg-emerald-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg group-hover:shadow-emerald-200"
          aria-label={`Visit ${embassy.name} website`}
        >
          View Opportunities
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

const EmbassyJobs: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const embassies: readonly Embassy[] = [
    {
      id: 1,
      name: "Embassy of Brazil",
      url: "https://www.gov.br",
      logo: "https://i.ibb.co/9k4XkfTC/1.png",
    },
    {
      id: 2,
      name: "Embassy of Japan",
      url: "https://www.bd.emb-japan.go.jp/itpr_en/11_000001_00635.html",
      logo: "https://i.ibb.co/FkfSpzcf/2.png",
    },
    {
      id: 3,
      name: "Embassy of Sweden",
      url: "https://www.swedenabroad.se/en/embassies/bangladesh-dhaka/about-us/vacancies/#",
      logo: "https://i.ibb.co/s9PMmbQG/3.png",
    },
    {
      id: 4,
      name: "Embassy of Switzerland",
      url: "https://www.eda.admin.ch/countries/bangladesh/en/home/news/open-job-vacancies.html",
      logo: "https://i.ibb.co/Pst4QK0j/4.png",
    },
    {
      id: 5,
      name: "Embassy of China",
      url: "http://bd.china-embassy.gov.cn/eng/sgxx/",
      logo: "https://i.ibb.co/TBh8sHNc/5.png",
    },
    {
      id: 6,
      name: "Embassy of France",
      url: "https://bd.ambafrance.org/Job-Offer-at-Agence-francaise-de-developpement-AFD",
      logo: "https://i.ibb.co/hxpT4922/6.png",
    },
    {
      id: 7,
      name: "Embassy of Indonesia",
      url: "https://kemlu.go.id/dhaka",
      logo: "https://i.ibb.co/2Q8cSKR/7.png",
    },
    {
      id: 8,
      name: "Embassy of Italy",
      url: "https://ambdhaka.esteri.it/en/news/dall_ambasciata/2024/02/recruitment-notice/",
      logo: "https://i.ibb.co/bgf9ZvHf/8.png",
    },
    {
      id: 9,
      name: "Embassy of Korea",
      url: "https://overseas.mofa.go.kr/bd-en/brd/m_2124/view.do?seq=760021",
      logo: "https://i.ibb.co/9mFQv4qZ/9.png",
    },
    {
      id: 10,
      name: "Embassy of Philippines",
      url: "https://dhakape.dfa.gov.ph/advisories",
      logo: "https://i.ibb.co/qF22HfPJ/10.jpg",
    },
    {
      id: 11,
      name: "Australian High Commission",
      url: "https://bangladesh.embassy.gov.au/daca/JobVacancies.html",
      logo: "https://i.ibb.co/60p2RWYc/11.png",
    },
    {
      id: 12,
      name: "Embassy of United States",
      url: "https://bd.usembassy.gov/jobs/",
      logo: "https://i.ibb.co/chXRGX1m/12.png",
    },
    {
      id: 13,
      name: "Royal Bhutanese Embassy",
      url: "https://www.mfa.gov.bt/rbedhaka/vacancy-announcement/",
      logo: "https://i.ibb.co/39z0NbMF/13.png",
    },
    {
      id: 14,
      name: "Embassy of Nepal",
      url: "https://bd.nepalembassy.gov.np/",
      logo: "https://i.ibb.co.com/cX7z6VKm/Nepal.jpg",
    },
    {
      id: 15,
      name: "Embassy of Denmark",
      url: "https://bangladesh.um.dk/en/about-us/job-opportunities",
      logo: "https://i.ibb.co/mVnz7JVM/14.jpg",
    },
    {
      id: 16,
      name: "Embassy of Netherlands",
      url: "https://www.netherlandsandyou.nl/web/bangladesh/about-us",
      logo: "https://i.ibb.co/LDjx1sjP/15.jpg",
    },
    {
      id: 17,
      name: "Royal Norwegian Embassy",
      url: "https://www.norway.no/en/bangladesh/norway-bangladesh/vacancies/",
      logo: "https://i.ibb.co/gMRFRfRK/16.png",
    },
    {
      id: 18,
      name: "Royal Thai Embassy",
      url: "https://dhaka.thaiembassy.org/en/page/cate-7842-annoucements?menu=5d83296215e39c2540006a0e",
      logo: "https://i.ibb.co/dshVZRF1/17.png",
    },
    {
      id: 19,
      name: "Embassy of South Korea",
      url: "https://overseas.mofa.go.kr/bd-en/brd/m_2124/view.do?seq=760021",
      logo: "https://i.ibb.co/b5C7Zfsp/18.jpg",
    },
    {
      id: 20,
      name: "Embassy of Vietnam",
      url: "https://vnembassy-dhaka.mofa.gov.vn/en-us/embassy/Notice%20from%20the%20Embassy/Pages/default.aspx",
      logo: "https://i.ibb.co/W4Lgvxx6/19.png",
    },
    {
      id: 21,
      name: "Embassy of Argentina",
      url: "https://ebang.cancilleria.gob.ar/es/job-opportunity-embassy",
      logo: "https://i.ibb.co/67rc57q8/20.jpg",
    },
    {
      id: 22,
      name: "Embassy of Canada",
      url: "https://www.jobbank.gc.ca/jobsearch/",
      logo: "https://i.ibb.co/p6wmNpTb/21.png",
    },
  ];

  // Filter embassies based on search term
  const filteredEmbassies = useMemo(() => {
    return embassies.filter(embassy =>
      embassy.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEmbassies.length / ITEMS_PER_PAGE);
  const currentEmbassies = useMemo(() => {
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    return filteredEmbassies.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredEmbassies, currentPage]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      <Helmet>
        {/* Primary Title Tag */}
        <title>
          Embassy Jobs in Bangladesh 2026 | Foreign Mission Careers | CrossCareers
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Explore embassy jobs in Bangladesh 2026. Find career opportunities at foreign missions including US, UK, Japan, Australia, and European embassies in Dhaka."
        />

        {/* Primary Keywords */}
        <meta
          name="keywords"
          content="embassy jobs Bangladesh, foreign mission careers, diplomatic jobs Dhaka, US embassy jobs, UK embassy careers, Australian High Commission vacancies, Japanese embassy recruitment, European embassies Bangladesh, international organization jobs, diplomatic service careers"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://crosscareers.com/embassy-jobs-bangladesh" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Embassy Jobs in Bangladesh 2026 | Foreign Mission Careers | CrossCareers" />
        <meta property="og:description" content="Discover embassy job opportunities at foreign missions in Bangladesh. Find careers at US, UK, Australian, Japanese, and European embassies in Dhaka." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://crosscareers.com/embassy-jobs-bangladesh" />
        <meta property="og:image" content="https://crosscareers.com/logo/favcon.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Embassy Jobs in Bangladesh | CrossCareers" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CrossCareersBD" />
        <meta name="twitter:creator" content="@CrossCareersBD" />
        <meta name="twitter:title" content="Embassy Jobs in Bangladesh 2026 | Foreign Mission Careers | CrossCareers" />
        <meta name="twitter:description" content="Find embassy jobs and foreign mission career opportunities in Bangladesh. Verified vacancies at US, UK, Australian, Japanese, and European embassies." />
        <meta name="twitter:image" content="https://crosscareers.com/logo/favcon.png" />
        <meta name="twitter:image:alt" content="Embassy Jobs in Bangladesh | CrossCareers" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CrossCareers",
            "url": "https://crosscareers.com/",
            "logo": "https://crosscareers.com/logo/favcon.png",
            "description": "AI-powered career hub offering verified embassy jobs, foreign mission career opportunities, and diplomatic service resources in Bangladesh.",
            "sameAs": [
              "https://www.facebook.com/profile.php?id=61574918625249",
              "https://x.com/crosscareer",
              "https://www.linkedin.com/company/crosscareers",
            ]
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-bold tracking-widest text-emerald-300 uppercase bg-emerald-400/10 rounded-full border border-emerald-400/30">
            Diplomatic Careers
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight">
            Embassy Jobs in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
              Bangladesh
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Your gateway to international career opportunities. Explore job vacancies at foreign embassies, high commissions, and diplomatic missions in Dhaka.
          </p>
          <a
            href="#portals"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] group text-base sm:text-lg"
          >
            Explore Opportunities
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Search Section */}
      <section id="portals" className="container mx-auto px-6 -mt-8 z-20 scroll-mt-20">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-emerald-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:max-w-md group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by embassy name..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-700 font-medium"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredEmbassies.length} diplomatic missions
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <main className="container mx-auto px-6 py-16 flex-grow">
        {currentEmbassies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentEmbassies.map((embassy) => (
                <EmbassyCard key={embassy.id} embassy={embassy} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-20 flex justify-center items-center space-x-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-3 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-emerald-50 transition-all text-gray-700 shadow-sm"
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
                      className={`w-10 h-10 border text-sm font-bold rounded-lg transition-all ${
                        currentPage === number 
                          ? 'bg-emerald-600 text-white shadow-emerald-200 scale-110 border-emerald-600' 
                          : 'bg-white text-gray-600 hover:bg-emerald-50 border border-gray-200'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-emerald-50 transition-all text-gray-700 shadow-sm"
                  aria-label="Next page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            )}

            {/* Bottom Call to Action */}
            <div className="mt-20 p-8 md:p-12 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Don't see the embassy you're looking for?</h3>
                <p className="text-gray-600 leading-relaxed">
                  We regularly update our database with new diplomatic missions and career opportunities. Check back often or suggest a mission to add.
                </p>
              </div>
              <button className="whitespace-nowrap px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg">
                <a href="/contact-us">Suggest a Mission</a>
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-emerald-300">
            <div className="p-4 bg-emerald-50 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-xl font-medium">No embassies found matching your search.</p>
            <button 
              onClick={() => {setSearchTerm(''); setCurrentPage(1);}} 
              className="mt-4 text-emerald-600 font-bold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </main>

      {/* Related Articles Section - MOVED OUTSIDE THE CONDITIONAL */}
      {relatedArticles.length > 0 && (
        <section className="container mx-auto px-6 py-16 bg-gradient-to-b from-white to-emerald-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Related Career Articles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enhance your chances of landing an embassy job with expert advice from our blog.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {relatedArticles.map(article => (
              <Link
                key={article.id}
                to={`/career-guide/${article.slug}`}
                className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 hover:-translate-y-1"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                    <time dateTime={article.date}>
                      {formatDateForSEO(article.date).display}
                    </time>
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-emerald-700 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section - MOVED OUTSIDE THE CONDITIONAL */}
      <section className="bg-white py-16 lg:py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About Embassy Jobs in Bangladesh
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore common questions about diplomatic careers, embassy recruitment processes, and working with foreign missions in Bangladesh.
            </p>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-emerald-700">1. What types of jobs are available at embassies in Bangladesh?</h3>
              <p>Embassies in Bangladesh offer diverse career opportunities including administrative positions, consular services, political and economic analysis, public diplomacy, security roles, logistics, human resources, finance, and IT support. Both local staff and international positions are available depending on the mission's requirements.</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-emerald-700">2. How can I apply for a job at a foreign embassy in Dhaka?</h3>
              <p>Most embassies post job vacancies on their official websites. You can also check the embassy's social media channels and career portals. Applications typically require a CV, cover letter, and sometimes additional documents like academic certificates and language proficiency proof. Some embassies use online application systems while others accept applications via email.</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-emerald-700">3. What qualifications are required for embassy jobs in Bangladesh?</h3>
              <p>Requirements vary by position. Most roles require at least a bachelor's degree, strong English proficiency, and relevant work experience. Additional language skills (French, Arabic, Japanese, etc.), diplomatic experience, and specialized expertise can be advantageous. Security clearances and background checks are standard for many positions.</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-emerald-700">4. Do embassies hire local Bangladeshi staff?</h3>
              <p>Yes, most embassies and high commissions in Bangladesh employ local staff for various positions including administrative assistants, drivers, security personnel, translators, and technical staff. Local staff play a crucial role in embassy operations and are valued for their knowledge of local culture, language, and systems.</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-emerald-700">5. What is the recruitment process for embassy jobs?</h3>
              <p>The recruitment process typically involves: 1) Application submission with CV and cover letter, 2) Written examination or skills assessment, 3) Panel interview, 4) Background verification, 5) Security clearance, and 6) Medical examination. The process can take several weeks to months depending on the position and embassy procedures.</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-emerald-700">6. Are embassy jobs well-paid in Bangladesh?</h3>
              <p>Embassy positions generally offer competitive salaries and benefits compared to local market rates. Compensation packages may include health insurance, transportation allowance, housing allowance, and annual leave benefits. International positions often come with additional expatriate benefits and allowances.</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-emerald-700">7. What language skills are important for embassy jobs?</h3>
              <p>English proficiency is essential for most embassy positions. Knowledge of Bengali is valuable for local staff positions involving interaction with Bangladeshi officials and citizens. Additional languages like French, Japanese, Korean, Arabic, Chinese, German, or Spanish can be significant advantages, especially for positions requiring communication with the home country.</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-emerald-700">8. Can I get an internship at a foreign embassy in Bangladesh?</h3>
              <p>Many embassies offer internship programs for students and recent graduates. These internships provide valuable experience in diplomacy, international relations, and embassy operations. Internship opportunities are typically advertised on embassy websites or through university career centers. Some internships are paid while others may be voluntary.</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-emerald-700">9. What is the work culture like at embassies?</h3>
              <p>Embassy work environments are professional, multicultural, and often fast-paced. Staff work with colleagues from different nationalities and backgrounds. Punctuality, discretion, professionalism, and respect for diplomatic protocols are highly valued. Work hours are typically standard business hours, though some positions may require availability for events or emergencies.</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-emerald-700">10. How competitive are embassy job applications?</h3>
              <p>Embassy positions are highly competitive due to the attractive benefits, international exposure, and career development opportunities. Successful candidates typically have strong academic credentials, relevant experience, excellent communication skills, and language proficiency. Networking, professional references, and understanding diplomatic protocols can improve your chances.</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-emerald-700">11. Do I need security clearance for embassy jobs?</h3>
              <p>Yes, most embassy positions require security clearance due to the sensitive nature of diplomatic work. The clearance process involves background checks, reference verification, and may include interviews with security officers. The process can take several weeks to complete and is a standard requirement before appointment.</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-emerald-700">12. What career growth opportunities exist in embassy careers?</h3>
              <p>Embassy careers offer excellent growth opportunities. Local staff can advance to senior administrative positions, supervisory roles, or specialized technical positions. Some embassies provide training programs and professional development opportunities. International exposure and diplomatic experience can also lead to opportunities with international organizations, NGOs, or private sector roles requiring international expertise.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default memo(EmbassyJobs);