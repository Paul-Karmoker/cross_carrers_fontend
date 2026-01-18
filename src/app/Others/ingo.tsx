import React from 'react';
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";

interface NGOCardProps {
  name: string;
  url: string;
}

interface NGOListing {
  name: string;
  url: string;
}

interface NGOSection {
  letter: string;
  listings: NGOListing[];
}

const NGOCard: React.FC<NGOCardProps> = ({ name, url }) => {
  return (
    <div className="bg-white overflow-hidden  transition-all duration-300 border border-gray-100 group hover:border-indigo-100">
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 w-10 h-10  bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center mr-3">
            <span className="text-indigo-600 font-semibold text-sm">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-3 leading-tight">
            {name}
          </h3>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-50">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 text-sm font-medium text-indigo-600 bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-300 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 w-full text-center group-hover:shadow-xs hover:scale-[1.02]"
          >
            View Opportunities
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const Ingo: React.FC = () => {
  const alphabet = [
    '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  const ngoSections: NGOSection[] = [
    {
      letter: '#',
      listings: [
        { name: '3F-United Federation of Danish Workers', url: 'https://www.3f.dk/om-3f/job-i-3f/jobopslag' }
      ]
    },
    {
      letter: 'A',
      listings: [
        { name: 'Australian Baptist Missionary Society', url: 'https://baptistmissionaustralia.org/serve/opportunities/' },
        { name: 'Academy for Educational Development (AED)', url: 'https://www.aed.com/careers' },
        { name: 'ACDI/VOCA', url: 'https://internationaljobs-acdivoca.icims.com/jobs/intro' },
        { name: 'ACTED', url: 'https://www.acted.org/en/get-involved/join-us/vacancies/' },
        { name: 'Action Aid- Bangladesh', url: 'https://jobs.actionaidbd.org/' },
        { name: 'Action Contre La Faim (Action Against Hunger)', url: 'https://www.actionagainsthunger.org/careers/current-openings/' },
        { name: 'Action for Enterprise', url: 'http://www.actionforenterprise.org/index.php' },
        { name: 'Action on Disability & Development (ADD)', url: 'https://add.org.uk/jobs/' },
        { name: 'Adventist Development & Relief Agency International (ADRA)', url: 'https://www.adrabangladesh.org/careers' },
        { name: 'AIDA, Ayuda, Intercambio Y Desarrollo', url: 'https://coordinadoraongd.org/organizaciones/asociacion-aida-ayuda-intercambio-y-desarrollo/' },
        { name: 'Al Basar International Foundation', url: 'https://albasar.org.uk/' },
        { name: 'Al-Khair Foundation Bangladesh', url: 'https://alkhair.org/application-for-employment/' },
        { name: 'ACIL Solidarity Center', url: 'https://www.solidaritycenter.org/' },
        { name: 'Americares Foundation', url: 'https://www.americares.org/take-action/jobs/' },
        { name: 'Amrock Academy Society', url: 'https://www.amaroksociety.org/' },
        { name: 'Andheri Hilfe Bangladesh', url: 'https://www.andheri-hilfe.de/informieren/presse-service-downloads/english/' },
        { name: 'Apasen International', url: 'https://alkhair.org/application-for-employment/' },
        { name: 'Article 19', url: 'https://www.article19.org/careers/' },
        { name: 'ASHOKA : Innovators for the Public', url: 'https://www.ashoka.org/en-bd/ashoka-career-opportunities' },
        { name: 'Asia Arsenic Network', url: 'https://aanbangladesh.org/' },
        { name: 'Asian Disaster Preparedness Centre', url: 'https://www.adpc.net/igo/contents/HRA/ADPC-JoinUS.asp' },
        { name: 'Assemblies of God Mission', url: 'https://www.agmissionbd.com/' },
        { name: 'Association for Aid and Relief, Japan (AAR Japan)', url: 'https://aarjapan.gr.jp/en/' },
        { name: 'Association of Medical Doctors for Asia (AMDA)', url: 'https://www.amdainternational.com/' },
        { name: 'Acid Survivors Foundation', url: 'https://acidsurvivors.org/category/job-circular/' }
      ]
    },
    {
      letter: 'B',
      listings: [
        { name: 'Bangladesh American Society of Muslim Aid for Humanity Inc.', url: 'https://basmah.org/' },
        { name: 'Bangladesh Development Initiative', url: 'https://www.bdiusa.org/' },
        { name: 'Baptist Mid Mission Bangladesh', url: 'https://www.bmm.org/job-openings' },
        { name: 'BASUG-Diaspora & Development', url: 'https://www.basug.eu/' },
        { name: 'BBC Media Action', url: 'https://www.bbc.co.uk/mediaaction/contact/jobs' },
        { name: 'BHN Association', url: 'https://www.bhninc.org/careers' },
        { name: 'BRAC International', url: 'https://bracinternational.org/career/' }
      ]
    },
    {
      letter: 'C',
      listings: [
        { name: 'Carter Center', url: 'https://www.cartercenter.org/about/careers/index.html' },
        { name: 'Catholic Agency for Overseas Development (CAFOD)', url: 'https://cafod.org.uk/work-with-us' },
        { name: 'Caritas Internationalis', url: 'https://www.caritas.org/who-we-are/career/' },
        { name: 'Children International', url: 'https://www.children.org/learn-more/employment' },
        { name: 'CIRDAP', url: 'https://cirdap.org/category/opportunities/' },
        { name: 'CARE-Bangladesh', url: 'https://career.carebangladesh.org' },
        { name: 'CAP Anamur', url: 'https://cap-anamur.org/en/jobs/' },
        { name: 'Caritas Switzerland', url: 'https://www.caritas.ch/en/career/' },
        { name: 'Catholic Relief Services(CRS)', url: 'https://www.crs.org/about/careers' },
        { name: 'Christian Aid', url: 'https://jobs.christianaid.org.uk/jobs/home/' },
        { name: 'Compassion International Bangladesh', url: 'https://surl.li/ssxykv' },
        { name: 'CONCERN - Worldwide', url: 'https://jobs.concern.net/jobsinternational/home/' },
        { name: 'Counterpart International Inc.', url: 'https://www.counterpart.org/careers/' },
        { name: 'Chemonics International Inc.', url: 'https://chemonics.com/jobs/' },
        { name: 'Cordaid', url: 'https://www.cordaid.org/en/' }
      ]
    },
    {
      letter: 'D',
      listings: [
        { name: 'DAKBHANGA', url: 'https://www.dakbhanga.org/career-with-us/' },
        { name: 'Damien Foundation', url: 'https://www.damienfoundation-bd.com/career' },
        { name: 'Danish Bangladesh Leprosy Mission', url: 'https://tlmbangladesh.org/jobs/' },
        { name: 'Danish Refugee Council', url: 'https://drc.ngo/about-us/work-with-us/' },
        { name: 'DIAKONIA / Swedish Free Church Aid', url: 'https://www.diakonia.se/en/about-us/job-opportunities/' }
      ]
    },
    {
      letter: 'E',
      listings: [
        { name: 'Education and Development Foundation (Educo)', url: 'https://www.educo.org.bd/work-with-us/' },
        { name: 'Enfants Du Monde', url: 'https://edm.ch/en/employment/' },
        { name: 'Engender Health Int.', url: 'https://www.engenderhealth.org/about/work-with-us/careers' }
      ]
    }
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, letter: string) => {
    e.preventDefault();
    const element = document.getElementById(letter);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 mt-20">

        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          </div>
          <div className="max-w-7xl mx-auto text-center relative">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-sm font-semibold text-white">Global Opportunities</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans tracking-tight">
              International NGO Careers Hub
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Discover global opportunities with leading international NGOs. Browse by organization to find your next career move.
            </p>
            <div className="mt-10">
              <a
                href="#A"
                className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-lg font-semibold rounded-full text-white bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Explore Organizations
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-3 h-5 w-5 animate-bounce"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm">Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Global</div>
                <div className="text-sm">Coverage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Direct</div>
                <div className="text-sm">Career Links</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Updated</div>
                <div className="text-sm">Regularly</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Alphabet Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 -mt-8 sticky top-24 bg-white/90 backdrop-blur-md py-6 z-10 border border-gray-200 shadow-lg">
            {alphabet.map((letter) => (
              <a
                key={letter}
                href={`#${letter}`}
                onClick={(e) => handleScrollToSection(e, letter)}
                className="w-12 h-12 flex items-center justify-center  bg-gradient-to-b from-white to-gray-50 border border-gray-200 hover:border-indigo-400 hover:from-indigo-50 hover:to-white hover:text-indigo-600 font-medium transition-all duration-200 shadow-xs hover:shadow-md text-lg hover:scale-105"
              >
                {letter}
              </a>
            ))}
          </div>

          {/* NGO Listings */}
          <div className="space-y-20">
            {ngoSections.map((section) => (
              <div
                key={section.letter}
                id={section.letter}
                className="scroll-mt-24"
              >
                <div className="flex items-center mb-10">
                  <div className="w-14 h-14  bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <h2 className="text-3xl font-bold text-white font-mono">
                      {section.letter}
                    </h2>
                  </div>
                  <div className="ml-6 h-0.5 flex-1 bg-gradient-to-r from-indigo-300 via-purple-300 to-transparent"></div>
                  <div className="ml-6 text-sm font-medium text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                    {section.listings.length} organizations
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {section.listings.map((listing) => (
                    <NGOCard
                      key={`${section.letter}-${listing.name}`}
                      name={listing.name}
                      url={listing.url}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Back to Top Button */}
            <div className="flex justify-center mt-20">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3 group-hover:-translate-y-0.5 transition-transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Back to Top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ingo;