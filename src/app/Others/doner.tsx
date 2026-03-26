import React, { FC, memo, useState, useMemo, ChangeEvent } from "react";
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { blogPosts } from './blogs/blogdata';


interface DonorOrganization {
  readonly id: number;
  readonly name: string;
  readonly url: string;
  readonly logo: string;
}

interface DonorCardProps {
  organization: DonorOrganization;
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

// Get 6 most recent blog posts related to donor/international development careers
const relevantCategories = ['Career Guide', 'Interview Support', 'Resume / CV', 'International Careers', 'Finance & Administration'];
const relatedArticles = blogPosts
  .filter(post => relevantCategories.includes(post.category))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 6);

const DonorCard: FC<DonorCardProps> = ({ organization }) => {
  return (
    <div className="group bg-white border border-gray-100 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden rounded-xl shadow-sm hover:shadow-lg">
      <div className="p-8 flex flex-col items-center flex-grow">
        <div className="w-full h-24 mb-6 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors duration-300">
          <img
            src={organization.logo}
            alt={`${organization.name} Logo`}
            className="max-h-full max-w-full object-contain filter transition-all duration-500"
            loading="lazy"
          />
        </div>

        <h3 className="text-xl font-bold mb-2 text-center text-gray-800 group-hover:text-indigo-600 transition-colors">
          {organization.name}
        </h3>
        
        <p className="text-sm text-gray-500 text-center mb-6">
          Explore career opportunities and job vacancies with {organization.name} in Bangladesh.
        </p>
      </div>

      <div className="px-8 pb-8">
        <a
          href={organization.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg group-hover:shadow-indigo-200"
          aria-label={`Visit ${organization.name} website`}
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

const DonorOrganizations: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const organizations: readonly DonorOrganization[] = [
    {
      id: 1,
      name: "ECHO",
      url: "https://civil-protection-humanitarian-aid.ec.europa.eu/who/jobs-and-opportunities_en",
      logo: "https://i.ibb.co/s4DZWnr/1.png",
    },
    {
      id: 2,
      name: "FCDO",
      url: "https://fco.tal.net/vx/lang-en-GB/mobile-0/appcentre-ext/brand-2/xf-ba80fc1e6921/candidate/jobboard/vacancy/1/adv/?f_Item_Opportunity_15689_lk=1739",
      logo: "https://i.ibb.co/yczFfgvs/2.png",
    },
    {
      id: 3,
      name: "Australian Government - DFAT",
      url: "https://www.dfat.gov.au/careers",
      logo: "https://i.ibb.co/fdKXtZbR/3.png",
    },
    {
      id: 4,
      name: "Australian Council for International Development",
      url: "https://acfid.asn.au/jobsa",
      logo: "https://i.ibb.co/CKHrVfbw/4.png",
    },
    {
      id: 5,
      name: "Norwegian Aid - NORAD",
      url: "https://www.norad.no/en/careers/careers/",
      logo: "https://i.ibb.co/ynfwTrgv/5.png",
    },
    {
      id: 6,
      name: "DANIDA",
      url: "https://bangladesh.um.dk/en/about-us/job-opportunities/job-vacancy",
      logo: "/donor/6.jpg",
    },
    {
      id: 7,
      name: "Global Affairs Canada (GAC)",
      url: "https://staffing-les.international.gc.ca/en/search/",
      logo: "/donor/7.png",
    },
    {
      id: 8,
      name: "European Union External Actions (EEAS)",
      url: "https://www.eeas.europa.eu/eeas/vacancies_en",
      logo: "https://i.ibb.co/FLWWMJD8/8.png",
    },
    {
      id: 9,
      name: "Green Climate Fund",
      url: "https://jobs.greenclimate.fund/",
      logo: "https://i.ibb.co/CKxVtgQW/9.png",
    },
    {
      id: 10,
      name: "Luxembourg Development Agency",
      url: "https://luxdev.lu/en/recruitment/definitions",
      logo: "https://i.ibb.co/N2kBxjtk/10.png",
    },
    {
      id: 11,
      name: "Agency for Agricultural Development of Morocco",
      url: "https://www.ada.gov.ma/en/recruitment/Appel%20%C3%A0%20candidature",
      logo: "https://i.ibb.co/WNTg4wJk/11.png",
    },
    {
      id: 12,
      name: "Asian Development Bank",
      url: "https://www.adb.org/work-with-us/careers/current-opportunities",
      logo: "https://i.ibb.co/5grkDcGp/12.png",
    },
    {
      id: 13,
      name: "Asian Infrastructure Investment Bank",
      url: "https://www.aiib.org/en/opportunities/career/job-vacancies/staff/index.html",
      logo: "https://i.ibb.co/60HCXXBQ/13.png",
    },
    {
      id: 14,
      name: "Bhutan Trust Fund",
      url: "https://www.bhutantrustfund.bt/public_page/announcement_details/27",
      logo: "https://i.ibb.co/7cBwnY2/14.png",
    },
    {
      id: 15,
      name: "Conservation International Fund",
      url: "https://www.conservation.org/about/conservation-international-jobs",
      logo: "https://i.ibb.co/Q7GmTX9N/15.png",
    },
    {
      id: 16,
      name: "GIZ Bangladesh",
      url: "https://www.giz.de/en/jobs/giz_job_opportunities.html",
      logo: "https://i.ibb.co/S7wmdCR4/16.png",
    },
    {
      id: 17,
      name: "European Investment Bank",
      url: "https://www.eib.org/en/about/careers/index",
      logo: "https://i.ibb.co/kg1W0ZsD/17.png",
    },
    {
      id: 18,
      name: "Enabel - Belgian Development Agency",
      url: "https://www.enabel.be/work-with-us/",
      logo: "https://i.ibb.co/08vWdLz/18.png",
    },
    {
      id: 19,
      name: "European Bank for Reconstruction and Development",
      url: "https://www.ebrd.com/careers-at-the-ebrd.html",
      logo: "https://i.ibb.co/BHSLBcBf/19.png",
    },
    {
      id: 20,
      name: "World Bank Group",
      url: "https://worldbankgroup.csod.com/ux/ats/careersite/1/home?c=worldbankgroup",
      logo: "https://i.ibb.co/zWfXx9qN/20.png",
    },
    {
      id: 21,
      name: "International Finance Corporation",
      url: "https://www.ifc.org/en/about/careers",
      logo: "https://i.ibb.co/dshFzzcn/21.png",
    },
  ];

  // Filter organizations based on search term
  const filteredOrganizations = useMemo(() => {
    return organizations.filter(org =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrganizations.length / ITEMS_PER_PAGE);
  const currentOrganizations = useMemo(() => {
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    return filteredOrganizations.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredOrganizations, currentPage]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50">
      <Helmet>
        {/* Primary Title Tag */}
        <title>
          Donor Organizations Jobs 2026 | International Development Careers | CrossCareers
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Explore donor organization jobs in Bangladesh 2026. Find career opportunities with World Bank, ADB, GIZ, USAID, FCDO, and international development agencies."
        />

        {/* Primary Keywords */}
        <meta
          name="keywords"
          content="donor organizations jobs, international development careers, World Bank jobs Bangladesh, ADB careers, GIZ Bangladesh, USAID vacancies, FCDO jobs, development agencies, international donor jobs, aid organizations careers"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://crosscareers.com/donor-organizations-jobs" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Donor Organizations Jobs 2026 | International Development Careers | CrossCareers" />
        <meta property="og:description" content="Discover career opportunities at international donor organizations in Bangladesh. Find jobs at World Bank, ADB, GIZ, USAID, and development agencies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://crosscareers.com/donor-organizations-jobs" />
        <meta property="og:image" content="https://crosscareers.com/logo/favcon.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Donor Organizations Jobs | CrossCareers" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CrossCareersBD" />
        <meta name="twitter:creator" content="@CrossCareersBD" />
        <meta name="twitter:title" content="Donor Organizations Jobs 2026 | International Development Careers | CrossCareers" />
        <meta name="twitter:description" content="Find donor organization jobs and international development careers in Bangladesh. Verified opportunities at World Bank, ADB, GIZ, USAID, and more." />
        <meta name="twitter:image" content="https://crosscareers.com/logo/favcon.png" />
        <meta name="twitter:image:alt" content="Donor Organizations Jobs | CrossCareers" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CrossCareers",
            "url": "https://crosscareers.com/",
            "logo": "https://crosscareers.com/logo/favcon.png",
            "description": "AI-powered career hub offering verified donor organization jobs, international development careers, and global development opportunities in Bangladesh.",
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
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-bold tracking-widest text-indigo-300 uppercase bg-indigo-400/10 rounded-full border border-indigo-400/30">
            International Development Careers
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight">
            Donor Organizations{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-200">
              Jobs in Bangladesh
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Your gateway to global development careers. Explore job opportunities at leading donor agencies, multilateral banks, and international development organizations operating in Bangladesh.
          </p>
          <a
            href="#portals"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] group text-base sm:text-lg"
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
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-indigo-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:max-w-md group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by organization name..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700 font-medium"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredOrganizations.length} donor organizations
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <main className="container mx-auto px-6 py-16 flex-grow">
        {currentOrganizations.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentOrganizations.map((organization) => (
                <DonorCard key={organization.id} organization={organization} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-20 flex justify-center items-center space-x-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-3 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-indigo-50 transition-all text-gray-700 shadow-sm"
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
                          ? 'bg-indigo-600 text-white shadow-indigo-200 scale-110 border-indigo-600' 
                          : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-indigo-50 transition-all text-gray-700 shadow-sm"
                  aria-label="Next page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            )}

            {/* Bottom Call to Action */}
            <div className="mt-20 p-8 md:p-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Don't see the donor organization you're looking for?</h3>
                <p className="text-gray-600 leading-relaxed">
                  We regularly update our database with new donor agencies and development organizations. Check back often or suggest an organization to add.
                </p>
              </div>
              <button className="whitespace-nowrap px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
                <a href="/contact-us">Suggest an Organization</a>
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-indigo-300">
            <div className="p-4 bg-indigo-50 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-xl font-medium">No donor organizations found matching your search.</p>
            <button 
              onClick={() => {setSearchTerm(''); setCurrentPage(1);}} 
              className="mt-4 text-indigo-600 font-bold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </main>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="container mx-auto px-6 py-16 bg-gradient-to-b from-white to-indigo-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Related Career Articles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enhance your chances of landing a donor organization job with expert advice from our blog.
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
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                    <time dateTime={article.date}>
                      {formatDateForSEO(article.date).display}
                    </time>
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-indigo-700 line-clamp-2">
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

      {/* FAQ Section */}
      <section className="bg-white py-16 lg:py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About Donor Organization Jobs in Bangladesh
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore common questions about international development careers, donor agency recruitment, and working with multilateral organizations in Bangladesh.
            </p>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-indigo-700">1. What types of jobs are available at donor organizations in Bangladesh?</h3>
              <p>Donor organizations offer diverse career opportunities including project management, program coordination, monitoring and evaluation, finance and administration, procurement, logistics, communications, policy analysis, and technical advisory roles. Both local and international positions are available depending on the organization's requirements.</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-indigo-700">2. How can I apply for jobs at international donor agencies?</h3>
              <p>Most donor organizations post job vacancies on their official websites. You can also check specialized development job portals and professional networking platforms. Applications typically require a CV, cover letter, academic certificates, and sometimes technical assessments. Many organizations use online application systems with detailed requirements.</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-indigo-700">3. What qualifications are required for donor organization jobs?</h3>
              <p>Requirements vary by position. Most professional roles require at least a bachelor's degree in relevant fields such as development studies, economics, public policy, business administration, or international relations. Advanced degrees (master's or PhD) are often preferred for senior positions. Relevant work experience, language skills, and technical expertise are highly valued.</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-indigo-700">4. Do donor organizations hire local Bangladeshi staff?</h3>
              <p>Yes, most international donor agencies and development organizations in Bangladesh employ local staff for various positions. Local staff bring valuable knowledge of the country context, language proficiency, and understanding of local systems. Many organizations have dedicated country offices with a mix of international and local staff.</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-indigo-700">5. What is the recruitment process for donor organizations?</h3>
              <p>The recruitment process typically involves: 1) Application submission, 2) Written assessment or technical test, 3) Panel interview, 4) Reference checks, 5) Background verification, and 6) Offer and onboarding. The process can take several weeks to months depending on the position and organization's procedures.</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-indigo-700">6. Are donor organization jobs well-paid in Bangladesh?</h3>
              <p>Donor organization positions generally offer competitive salaries and comprehensive benefits packages. Compensation often includes health insurance, transportation allowance, housing allowance, retirement benefits, and professional development opportunities. International positions come with additional expatriate benefits and allowances.</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-indigo-700">7. What language skills are important for donor organization jobs?</h3>
              <p>English proficiency is essential for most donor organization positions. Knowledge of Bengali is valuable for local staff positions involving field work and government liaison. Additional languages like French, Spanish, Arabic, or German can be advantageous, especially for international organizations with global operations.</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-indigo-700">8. Can I get an internship at donor organizations in Bangladesh?</h3>
              <p>Many donor agencies and development organizations offer internship programs for students and recent graduates. These internships provide valuable experience in international development, project management, and organizational operations. Opportunities are typically advertised on organizational websites or through university career centers.</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-indigo-700">9. What is the work culture like at donor organizations?</h3>
              <p>Donor organization work environments are professional, multicultural, and results-driven. Staff work with colleagues from diverse backgrounds and nationalities. Professionalism, integrity, transparency, and commitment to development outcomes are highly valued. Work-life balance policies vary by organization but generally support employee well-being.</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-indigo-700">10. How competitive are donor organization job applications?</h3>
              <p>Donor organization positions are highly competitive due to attractive benefits, international exposure, and career development opportunities. Successful candidates typically have strong academic credentials, relevant work experience, excellent communication skills, and language proficiency. Networking and professional references can significantly improve chances.</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-indigo-700">11. What skills are most in demand at donor organizations?</h3>
              <p>Skills in high demand include project management, monitoring and evaluation, financial management, procurement, logistics, data analysis, policy analysis, communications, and technical expertise in sectors like health, education, agriculture, climate change, and governance. Strong analytical and interpersonal skills are also essential.</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3 text-indigo-700">12. What career growth opportunities exist in donor organizations?</h3>
              <p>Donor organization careers offer excellent growth opportunities. Professionals can advance to senior management roles, technical specialist positions, or country director positions. Many organizations provide training programs, leadership development opportunities, and cross-country assignments. International experience can lead to opportunities with other development organizations, government agencies, or private sector roles.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default memo(DonorOrganizations);