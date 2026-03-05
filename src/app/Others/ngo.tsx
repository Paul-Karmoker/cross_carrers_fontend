import React, { FC, ReactNode } from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from '../components/home/navbar';
import Footer from '../components/home/footer';

/**
 * Interfaces for Type Safety
 */
interface NgoCardProps {
  name: string;
  url: string;
}

interface SectionProps {
  id: string;
  letter: string;
  children: ReactNode;
}

/**
 * Constants
 */
const ALPHABET: string[] = [
  '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

/**
 * Modern NGO Card Component
 * Enhanced with better accessibility and hover states
 */
const NgoCard: FC<NgoCardProps> = ({ name, url }) => {
  if (!name || !url) return null;

  return (
    <div className="group bg-white p-6 border-[1px] border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
      <div className="flex-grow">
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors duration-300">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-emerald-600 group-hover:text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800 leading-tight mb-4 group-hover:text-emerald-700">
          {name}
        </h3>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 text-emerald-600 font-semibold text-sm transition-all hover:bg-emerald-600 hover:text-white"
      >
        View Careers
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  );
};

/**
 * Section Wrapper Component
 */
const NgoSection: FC<SectionProps> = ({ id, letter, children }) => (
  <section id={id} className="scroll-mt-32 mb-16">
    <div className="flex items-center gap-6 mb-8">
      <div className="flex items-center justify-center w-16 h-16  bg-slate-900 text-white text-3xl font-black shadow-lg">
        {letter}
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {children}
    </div>
  </section>
);

/**
 * Main NGO Hub Page
 */
const NgoHub: FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900">
<Helmet>

  {/* SEO Title */}
  <title>
    Bangladesh NGO Jobs 2026 | International Humanitarian & Development Careers | CrossCareers
  </title>

  {/* Meta Description */}
  <meta
    name="description"
    content="Explore 500+ NGO job opportunities in Bangladesh and worldwide, including humanitarian, UN, development, nonprofit, and international careers. Updated daily with official links by CrossCareers."
  />

  {/* Meta Keywords */}
  <meta
    name="keywords"
    content="Bangladesh NGO jobs 2026, international NGO jobs, humanitarian jobs, UN jobs, development careers, nonprofit jobs, NGO career portal, global NGO careers, aid organization jobs, NGO job listings Bangladesh, CrossCareers NGO hub"
  />

  {/* Canonical URL */}
  <link rel="canonical" href="https://crosscareers.com/ngo-jobs-bangladesh" />

  {/* Robots */}
  <meta
    name="robots"
    content="index, follow, max-image-preview:large"
  />

  {/* Open Graph / Facebook */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Bangladesh NGO Jobs 2026 | International Humanitarian & Development Careers | CrossCareers" />
  <meta property="og:description" content="Browse hundreds of verified NGO, UN, humanitarian, and development job opportunities in Bangladesh and globally. Apply directly through official portals." />
  <meta property="og:url" content="https://crosscareers.com/ngo-jobs-bangladesh" />
  <meta property="og:image" content="https://crosscareers.com/logo/favcon.png" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Bangladesh NGO Jobs 2026 | CrossCareers" />
  <meta name="twitter:description" content="Discover verified NGO, UN, humanitarian, and development careers in Bangladesh and internationally. Updated daily." />
  <meta name="twitter:image" content="https://crosscareers.com/logo/favcon.png" />

  {/* Structured Data */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Bangladesh NGO Career Hub",
      "url": "https://crosscareers.com/ngo-jobs-bangladesh",
      "description": "Find hundreds of Bangladesh NGO, UN, humanitarian, and development career opportunities with direct official links, updated daily.",
      "publisher": {
        "@type": "Organization",
        "name": "CrossCareers",
        "url": "https://crosscareers.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://crosscareers.com/logo/favcon.png"
        }
      }
    })}
  </script>

</Helmet>
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-emerald-400 uppercase bg-emerald-400/10 rounded-full border border-emerald-400/20">
            Professional Resource
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            NGO Career <span className="text-emerald-500">Hub</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A comprehensive gateway to humanitarian and development opportunities with leading organizations in Bangladesh.
          </p>
          <a
            href="#A"
            className="inline-flex items-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] group"
          >
            Start Exploring
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </header>

      {/* Navigation Bar (Sticky) */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {ALPHABET.map((letter) => (
              <a
                key={letter}
                href={`#${letter}`}
                className="w-9 h-9 flex items-center justify-center text-sm font-bold text-slate-500 transition-all hover:bg-slate-900 hover:text-white"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        
        {/* A Section */}
        <NgoSection id="A" letter="A">
          <NgoCard name="ASA (Association for Social Advancement)" url="https://jobs.asabd.org/" />
          <NgoCard name="Ain o Salish Kendra (ASK)" url="https://www.askbd.org/ask/category/vacancy-announcement/job-opportunities/" />
          <NgoCard name="Aparajeyo Bangladesh" url="https://aparajeyo.org/#" />
          <NgoCard name="Autism Welfare Foundation" url="https://aparajeyo.org/#" />
        </NgoSection>

        {/* B Section */}
        <NgoSection id="B" letter="B">
          <NgoCard name="BRAC" url="https://careers.brac.net/" />
          <NgoCard name="Bangladesh Environmental Lawyers Association (BELA)" url="http://bela.org.bd" />
          <NgoCard name="BARCIK (Bangladesh Resource Center for Indigenous Knowledge)" url="https://www.barcikbd.org/career/" />
          <NgoCard name="BDPC (Bangladesh Disaster Preparedness Center)" url="https://www.bdpc.org.bd/index.php/stay-informed/jobs" />
          <NgoCard name="BEDS (Bangladesh Environment and Development Society)" url="https://www.bedsbd.org/about-us/career" />
          <NgoCard name="Bangladesh Association for Social Advancement (BASA)" url="https://basango.org/career.html" />
          <NgoCard name="BURO Bangladesh" url="https://www.burobd.org/" />
          <NgoCard name="Bangladesh Legal Aid and Services Trust (BLAST)" url="https://blast.org.bd/" />
        </NgoSection>

        {/* C Section */}
        <NgoSection id="C" letter="C">
          <NgoCard name="CCDB (Christian Commission for Development in Bangladesh)" url="https://ccdbbd.org/" />
          <NgoCard name="COAST Trust" url="https://coastbd.net/job-opportunity-for-leadership-position/" />
          <NgoCard name="Center for Natural Resource Studies (CNRS)" url="https://cnrs.org.bd/career/" />
          <NgoCard name="Centre for Disability in Development (CDD)" url="https://cdd.org.bd/2019/10/18/career-with-cdd/" />
          <NgoCard name="CHRISTIAN SERVICE SOCIETY (CSS)" url="https://www.cssbd.org/careers.php" />
        </NgoSection>

        {/* D Section */}
        <NgoSection id="D" letter="D">
          <NgoCard name="Dhaka Ahsania Mission (DAM)" url="https://www.ahsaniamission.org.bd/job/" />
          <NgoCard name="Dustho Shasthya Kendra (DSK)" url="https://www.dskbangladesh.org/career/" />
          <NgoCard name="DORP (Development Organization of the Rural Poor)" url="https://dorpbd.org/career/" />
        </NgoSection>

        {/* E Section */}
        <NgoSection id="E" letter="E">
          <NgoCard name="Eco-Social Development Organization (ESDO)" url="https://esdo.net.bd/" />
          <NgoCard name="Eminence Associates for Social Development" url="https://eminence-bd.org/employment/" />
        </NgoSection>

        {/* G Section */}
        <NgoSection id="G" letter="G">
          <NgoCard name="Grameen Bank" url="https://grameenbank.org.bd/about/career" />
          <NgoCard name="Gram Bikash Kendra (GBK)" url="https://www.gbk-bd.org/" />
          <NgoCard name="Gana Unnayan Kendra (GUK)" url="https://www.gukbd.net/careers/" />
          <NgoCard name="Gram Unnayan Karma (GUK)" url="https://guk.org.bd/career" />
          <NgoCard name="Green Hill (গ্রীন হিল)" url="http://www.greenhill-bd.org/notice-board/job-circular" />
        </NgoSection>

        {/* J Section */}
        <NgoSection id="J" letter="J">
          <NgoCard name="Jagorani Chakra Foundation (JCF)" url="https://jcf.org.bd/available-jobs/" />
          <NgoCard name="Jago Nari" url="https://www.jagonari.org/" />
          <NgoCard name="JAAGO Foundation" url="https://jaago.com.bd/career" />
        </NgoSection>

        {/* S Section */}
        <NgoSection id="S" letter="S">
          <NgoCard name="Shakti Foundation" url="https://www.shakti.org.bd/career" />
          <NgoCard name="Sajida Foundation" url="https://career.sajida.org/" />
          <NgoCard name="SETU Bangladesh" url="https://setu.ngo/" />
          <NgoCard name="Society for Health Extension and Development (SHED)" url="https://shedbd.org/" />
          <NgoCard name="Shariatpur Development Society (SDS)" url="https://www.sdsbd.org/notice/job-opportunity/" />
          <NgoCard name="Social and Economic Enhancement Program (SEEP)" url="https://www.seep.org.bd/jobs/" />
          <NgoCard name="Surjer Hashi Network" url="https://shnnetwork.org/career/" />
          <NgoCard name="Shushilan" url="https://shushilan.org/human-resource-cell" />
        </NgoSection>

        {/* T Section */}
        <NgoSection id="T" letter="T">
          <NgoCard name="Transparency International Bangladesh (TIB)" url="https://career.ti-bangladesh.org/" />
          <NgoCard name="TMSS (Thengamara Mohila Sabuj Sangha)" url="https://tmss-bd.org/careers/" />
          <NgoCard name="Teach For Bangladesh" url="https://teachforbangladesh.org/careers/" />
        </NgoSection>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center justify-center pt-20">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Back to Top
          </button>
        </div>
        {/* FAQ Section */}
<section className="bg-white py-16 lg:py-24 border-t border-gray-100">
  <div className="container mx-auto px-6 max-w-5xl">

    <div className="text-center mb-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Frequently Asked Questions About NGO Jobs
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        Many professionals searching for careers in humanitarian and development sectors often ask similar questions about NGO jobs, recruitment processes, salaries, and organizational values. 
        Below are some of the most commonly searched questions online related to NGO employment and career development.
      </p>
    </div>

    <div className="space-y-10 text-gray-700 leading-relaxed">

      <div>
        <h3 className="font-bold text-xl mb-2">1. How can I get a job in an NGO?</h3>
        <p>
          Getting a job in an NGO usually requires a combination of relevant education, practical experience, and demonstrated commitment to social development. Many organizations look for candidates who have degrees in fields such as social science, development studies, public health, economics, logistics, or environmental science. However, practical field experience often matters just as much as formal education.
          To increase your chances, candidates should regularly monitor trusted job portals, professional networks, and NGO career websites. Volunteering with community organizations or local NGOs can also provide valuable experience. Additionally, developing skills in project management, monitoring and evaluation, procurement, or humanitarian logistics can make applicants more competitive in the development sector.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">2. What qualifications are required to work in an NGO?</h3>
        <p>
          The qualifications needed for NGO jobs vary depending on the role and level of responsibility. Entry-level roles may require a bachelor's degree, while managerial or technical roles often require a master's degree along with professional experience. Specialized positions such as program managers, finance specialists, or supply chain professionals often require additional certifications or sector-specific expertise.
          Beyond academic qualifications, NGOs typically value strong communication skills, cultural sensitivity, ethical conduct, and the ability to work in challenging environments. Experience working with communities or managing development projects can significantly strengthen a candidate's profile.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">3. Where can I find NGO job opportunities online?</h3>
        <p>
          NGO job opportunities can be found through several reliable online platforms. Global organizations often publish vacancies on their official websites, while local opportunities may appear on national job portals. Some specialized platforms also focus specifically on humanitarian and development sector careers.
          In addition to job boards, professionals often find opportunities through professional networks such as LinkedIn, development sector mailing lists, and humanitarian career platforms. Following major NGOs, United Nations agencies, and international organizations can also help job seekers stay informed about upcoming opportunities.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">4. What skills are important for NGO professionals?</h3>
        <p>
          NGOs operate in complex social environments, so professionals need a mix of technical and interpersonal skills. Important skills include project management, financial accountability, monitoring and evaluation, communication, and stakeholder coordination.
          Many NGOs also prioritize professionals who can work under pressure, adapt to changing situations, and collaborate with diverse teams. Digital skills, data analysis, and reporting capabilities are increasingly important as organizations focus more on evidence-based program design and accountability to donors and communities.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">5. Do NGOs provide international career opportunities?</h3>
        <p>
          Yes, many international NGOs offer opportunities to work in different countries. These positions often involve humanitarian response, development programming, or technical advisory roles. Professionals with experience in project management, supply chain management, health programs, or emergency response are often considered for international assignments.
          International NGO careers can be highly rewarding because they provide opportunities to contribute to global development goals while gaining cross-cultural experience. However, these roles usually require significant field experience and a strong understanding of humanitarian principles.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">6. What is PSEA in NGO work?</h3>
        <p>
          PSEA stands for Prevention of Sexual Exploitation and Abuse. It is a critical policy adopted by humanitarian and development organizations to ensure that staff members do not abuse their positions of power when working with vulnerable communities. PSEA policies emphasize zero tolerance for exploitation, harassment, or abuse.
          Most NGOs require staff members to complete PSEA training and sign codes of conduct before starting work. These policies are designed to protect communities and ensure that humanitarian assistance is delivered with dignity, accountability, and respect for human rights.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">7. Why is gender equality important in NGO programs?</h3>
        <p>
          Gender equality is a core principle in development and humanitarian programming because social and economic inequalities often affect women and marginalized groups more severely. NGOs integrate gender perspectives into their programs to ensure that projects benefit everyone fairly and inclusively.
          By addressing gender disparities, organizations can improve education access, healthcare outcomes, economic participation, and community resilience. Gender-sensitive programming also helps ensure that development interventions do not unintentionally reinforce existing inequalities.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">8. What is the typical salary in NGO jobs?</h3>
        <p>
          NGO salaries vary widely depending on the organization, country, and level of responsibility. Entry-level positions may offer modest salaries, while senior technical or managerial roles can offer competitive compensation comparable to private sector positions. International organizations often provide structured salary scales and additional benefits.
          In many cases, NGO compensation packages include benefits such as health insurance, retirement contributions, travel allowances, or hardship allowances for field assignments. Candidates should carefully review the full compensation package rather than focusing only on the base salary.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">9. What should I include when introducing myself in an NGO interview?</h3>
        <p>
          When introducing yourself during an NGO interview, it is important to briefly explain your professional background, relevant experience, and motivation for working in the development sector. Candidates should highlight achievements that demonstrate problem-solving ability, teamwork, and commitment to social impact.
          A strong self-introduction usually connects personal values with the organization's mission. For example, professionals may discuss their experience supporting community programs, managing humanitarian logistics, or implementing development projects that improved people's lives.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">10. How can I improve my chances of getting shortlisted for NGO jobs?</h3>
        <p>
          To increase the chances of being shortlisted, applicants should tailor their CV and cover letter to the specific job description. Many organizations use applicant tracking systems, so including relevant keywords from the vacancy announcement can improve visibility.
          Candidates should also focus on demonstrating measurable achievements rather than simply listing responsibilities. Providing examples of successful projects, program outcomes, or operational improvements can make an application more compelling to recruiters.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">11. Do NGOs offer remote or flexible work options?</h3>
        <p>
          Many NGOs have adopted flexible work arrangements, especially after the global expansion of digital collaboration tools. While field-based roles often require physical presence in project locations, many technical, research, or coordination roles can be performed remotely or through hybrid arrangements.
          Remote work opportunities are particularly common for roles involving data analysis, policy research, communications, or digital program management. However, the availability of remote positions depends on the organization's operational model and project requirements.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">12. What is humanitarian logistics?</h3>
        <p>
          Humanitarian logistics focuses on planning, implementing, and controlling the efficient movement of relief items, services, and information during emergencies or development programs. It includes procurement, transportation, warehousing, inventory management, and distribution of aid supplies.
          Effective humanitarian logistics ensures that essential resources such as food, medicine, shelter materials, and equipment reach affected communities quickly and efficiently. Strong logistics systems are critical for responding to disasters and maintaining operational accountability in humanitarian programs.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">13. Are NGO careers stable long term?</h3>
        <p>
          NGO careers can offer long-term professional growth, particularly for individuals who build strong technical expertise and leadership skills. However, some positions depend on project funding cycles, which may affect contract duration. Professionals who continuously develop their skills often find new opportunities across different organizations and countries.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">14. What are the benefits of working in the development sector?</h3>
        <p>
          Working in the development sector provides the opportunity to contribute to meaningful social change while gaining diverse professional experience. Many professionals find NGO work rewarding because it allows them to support communities, address global challenges, and collaborate with people from different cultures and backgrounds.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">15. Why do people choose careers in NGOs?</h3>
        <p>
          People choose NGO careers for different reasons, including the desire to contribute to social impact, support vulnerable communities, and participate in meaningful development work. While the sector can be demanding, many professionals value the sense of purpose and global perspective that NGO work provides.
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

export default NgoHub;