import React, { FC } from 'react';
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";
import { Helmet } from 'react-helmet-async';

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

        <h3 className="text-xl font-bold mb-2 text-center text-blue-600 transition-colors">
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
          className="flex items-center justify-center w-full py-2 bg-blue-600 text-white font-semibold transition-all duration-300 shadow-gray-200 group-hover:shadow-blue-200"
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
    { id: 2, name: 'SmartJobs', url: 'https://smartjob.portal.gov.bd/', logo: 'https://i.ibb.co.com/FbNfXxrd/my-jobs.png' },
    { id: 3, name: 'nextjobz', url: 'https://nextjobz.com.bd/', logo: 'https://i.ibb.co.com/wrbnrMTg/next-jobs.png' },
    { id: 4, name: 'Teletalk All Jobs', url: 'https://alljobs.teletalk.com.bd/', logo: 'https://i.ibb.co.com/d4Rk8zP2/images.png' },
    { id: 5, name: 'Jobs.com.bd', url: 'http://www.job.com.bd/', logo: 'http://job.com.bd/images/logo.gif' },
    { id: 6, name: 'Careerjet', url: 'https://www.careerjet.com.bd/', logo: 'https://i.ibb.co/jZrCpSTf/career-Jet.png' },
    { id: 7, name: 'Shomvob', url: 'https://shomvob.com/', logo: 'https://i.ibb.co/B5fwpbKm/shomvob.png' },
    { id: 8, name: 'Bikroy Jobs', url: 'https://bikroy.com/en/ads/bangladesh/jobs', logo: 'https://i.ibb.co/vC8NR6Fp/bikroy.png' },
    { id: 9, name: 'BDJobsToday', url: 'https://www.bdjobstoday.com/', logo: 'https://i.ibb.co/237LkdxQ/4.png' },
    { id: 10, name: 'Chakri.com.bd', url: 'https://chkri.com/', logo: 'https://i.ibb.co/fd7pGq5F/5.png' },
    { id: 11, name: 'BDjobsLive', url: 'https://www.bdjobslive.com/', logo: 'https://i.ibb.co/CKB8Bc1Y/6.png' },
    { id: 12, name: 'NRBJobs', url: 'https://www.nrbjobs.com/', logo: 'https://i.ibb.co/Kjm0bxhB/7.png' },
    { id: 13, name: 'Skill Jobs', url: 'https://skill.jobs/', logo: 'https://i.ibb.co.com/gbJYgFS1/Skill-jobs.png' },
    { id: 14, name: 'Jobs Media', url: 'https://www.jobmedia.com.bd/', logo: 'https://i.ibb.co.com/LDV35hNc/JObs-Media.png' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
<Helmet>
  {/* Primary Title Tag */}
  <title>
    Bangladeshi Job Portals 2026 | Top BD Jobs, Government & Private Careers | CrossCareers
  </title>

  {/* Meta Description */}
  <meta
    name="description"
    content="Explore the top Bangladeshi job portals in 2026. Access verified platforms for government jobs, private sector careers, remote work, and freelance opportunities in Bangladesh."
  />

  {/* Primary Keywords */}
  <meta
    name="keywords"
    content="Bangladesh jobs, BD job portals, Bangladeshi careers 2026, government jobs Bangladesh, private sector jobs BD, career opportunities in Dhaka, freelance jobs Bangladesh, remote work BD, top Bangladeshi job websites, online job boards Bangladesh, internship opportunities Bangladesh, NGO jobs Bangladesh, IT jobs Bangladesh, healthcare jobs BD"
  />

  {/* Canonical URL */}
  <link rel="canonical" href="https://crosscareers.com/bangladesh-jobs-sites" />

  {/* Open Graph / Facebook */}
  <meta property="og:title" content="Bangladeshi Job Portals 2026 | Top BD Jobs, Government & Private Careers | CrossCareers" />
  <meta property="og:description" content="Discover the best Bangladeshi job portals in 2026. Verified platforms for government, private, remote, and freelance career opportunities in Bangladesh." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://crosscareers.com/bangladesh-jobs-sites" />
  <meta property="og:image" content="https://crosscareers.com/logo/favcon.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Bangladeshi Job Portals 2026 | CrossCareers" />
  <meta property="og:locale" content="en_US" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@CrossCareersBD" />
  <meta name="twitter:creator" content="@CrossCareersBD" />
  <meta name="twitter:title" content="Bangladeshi Job Portals 2026 | Top BD Jobs, Government & Private Careers | CrossCareers" />
  <meta name="twitter:description" content="Access the best Bangladeshi job portals in 2026. Find verified government, private, freelance, and remote work opportunities across Bangladesh." />
  <meta name="twitter:image" content="https://crosscareers.com/logo/favcon.png" />
  <meta name="twitter:image:alt" content="Bangladeshi Job Portals 2026 | CrossCareers" />

  {/* Structured Data */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "CrossCareers",
      "url": "https://crosscareers.com/",
      "logo": "https://crosscareers.com/logo/favcon.png",
      "description": "AI-powered career hub offering verified Bangladeshi job portals, government and private sector opportunities, freelance & remote jobs, and career resources in Bangladesh.",
      "sameAs": [
        "https://www.facebook.com/CrossCareersBD",
        "https://www.linkedin.com/company/crosscareers",
        "https://twitter.com/CrossCareersBD"
      ]
    })}
  </script>
</Helmet>

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
              Navigate your career journey with confidence. We've aggregated the most trusted platforms to help you find your next big opportunity in Bangladesh.
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

          {/* Bottom Call to Action */}
          <div className="mt-20 p-8 md:p-12 bg-white border-[1px] border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Can't find what you're looking for?</h3>
              <p className="text-gray-600 leading-relaxed">
                Our database is updated weekly with new niche job boards and international remote platforms operating in Bangladesh.
              </p>
            </div>
            <button className="whitespace-nowrap px-8 py-2 bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition-colors">
              Suggest a Portal
            </button>
          </div>
        </section>
      {/* FAQ Section */}
<section className="bg-white py-16 lg:py-24 border-t border-gray-100">
  <div className="container mx-auto px-6 max-w-5xl">

    <div className="text-center mb-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Frequently Asked Questions About Jobs in Bangladesh
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        Job seekers in Bangladesh often search online for information about job portals, recruitment processes, salaries, and career opportunities. 
        Below are some of the most commonly searched questions related to finding jobs and building careers in Bangladesh.
      </p>
    </div>

    <div className="space-y-10 text-gray-700 leading-relaxed">

      <div>
        <h3 className="font-bold text-xl mb-2">1. What are the best job portals in Bangladesh?</h3>
        <p>
          Bangladesh has several trusted job portals where employers publish vacancies across different sectors. 
          These platforms allow job seekers to search opportunities in industries such as banking, technology, NGOs, manufacturing, and education. 
          Many portals also offer resume building tools, career resources, and job alerts to help candidates stay informed about new opportunities.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">2. How can I find NGO jobs in Bangladesh?</h3>
        <p>
          NGO jobs in Bangladesh are commonly advertised through specialized job portals, professional networking platforms, 
          and the official websites of development organizations. Many NGOs recruit professionals for roles in project management, 
          logistics, monitoring and evaluation, community development, and public health. Candidates with relevant experience 
          and strong communication skills often have better opportunities in the development sector.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">3. How do I apply for jobs online in Bangladesh?</h3>
        <p>
          Applying for jobs online usually requires creating a profile on a job portal and uploading a professional resume. 
          After finding a suitable position, candidates can submit their application along with a customized cover letter. 
          Carefully reading the job description and highlighting relevant skills in the CV can significantly increase the chances 
          of being shortlisted by recruiters.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">4. What qualifications are required to get a good job in Bangladesh?</h3>
        <p>
          The required qualifications depend on the type of job and industry. Many professional positions require at least 
          a bachelor's degree, while managerial roles often require a master's degree and several years of experience. 
          Employers also value practical skills such as communication, teamwork, problem solving, and digital literacy.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">5. What is the average salary in Bangladesh?</h3>
        <p>
          Salaries in Bangladesh vary depending on the industry, organization, and experience level of the employee. 
          Entry-level positions usually offer moderate salaries, while experienced professionals in sectors such as banking, 
          technology, and international development may receive significantly higher compensation along with additional benefits.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">6. How can I prepare for a job interview in Bangladesh?</h3>
        <p>
          Preparing for an interview involves researching the organization, understanding the job responsibilities, 
          and practicing common interview questions. Candidates should be ready to explain their experience, 
          professional achievements, and how their skills align with the requirements of the position. 
          Confidence and clear communication are important factors during interviews.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">7. What skills are most in demand in Bangladesh?</h3>
        <p>
          Employers in Bangladesh increasingly look for candidates who possess both technical and soft skills. 
          Skills such as data analysis, project management, financial management, digital marketing, and 
          information technology are highly valued. At the same time, communication, adaptability, and teamwork 
          are essential for professional success.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">8. Are government jobs better than private sector jobs in Bangladesh?</h3>
        <p>
          Government jobs are often considered attractive because they provide long-term stability, structured 
          promotion systems, and retirement benefits. Private sector jobs, however, may offer faster career growth, 
          higher salaries, and opportunities to develop specialized skills. The best choice depends on an individual’s 
          career goals and personal preferences.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">9. How can fresh graduates find jobs in Bangladesh?</h3>
        <p>
          Fresh graduates can begin their careers by applying for internships, trainee programs, and entry-level 
          positions offered by organizations. These opportunities help build professional experience and improve 
          employability. Participating in training programs, workshops, and volunteer activities can also strengthen 
          a candidate’s profile.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">10. Do international organizations hire professionals from Bangladesh?</h3>
        <p>
          Many international organizations and development agencies hire professionals from Bangladesh for national 
          and regional roles. These organizations often require specialists in project management, logistics, finance, 
          monitoring and evaluation, and humanitarian response. Strong English communication skills and relevant 
          experience are often important requirements.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">11. What is humanitarian logistics?</h3>
        <p>
          Humanitarian logistics involves managing the procurement, transportation, storage, and distribution of 
          relief supplies during emergencies and development programs. Effective logistics ensures that essential 
          resources such as food, medicine, and shelter materials reach affected communities quickly and efficiently.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">12. What should I say when introducing myself in an interview?</h3>
        <p>
          A professional self-introduction should briefly summarize your education, work experience, and career goals. 
          Candidates should highlight achievements and explain how their skills match the requirements of the job. 
          A clear and confident introduction can create a strong first impression during interviews.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">13. Are remote jobs available for professionals in Bangladesh?</h3>
        <p>
          Yes, remote job opportunities have increased significantly in recent years. Many international companies 
          and digital businesses now hire professionals from Bangladesh for roles in software development, design, 
          digital marketing, customer support, and online consulting. Remote work allows professionals to access 
          global career opportunities without relocating.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">14. What are the benefits of working in the development sector?</h3>
        <p>
          Careers in the development sector allow professionals to contribute to meaningful social change while 
          gaining diverse professional experience. Many individuals find NGO and humanitarian work rewarding 
          because it focuses on improving communities, reducing poverty, and supporting sustainable development.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">15. Why do people choose careers in NGOs?</h3>
        <p>
          Many professionals choose NGO careers because they want to make a positive impact on society. 
          Working in development programs provides opportunities to support vulnerable communities, 
          collaborate with international organizations, and gain valuable cross-cultural experience.
        </p>
      </div>

    </div>
  </div>
</section>
      </main>

      <Footer />
    </div>
  );
};

export default BdJobs;