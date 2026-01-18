import React, { FC, ReactNode } from 'react';
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
      </main>

      <Footer />
    </div>
  );
};

export default NgoHub;