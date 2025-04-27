import React from 'react';
import Navber from './navbar';
import Footer from './footer';

function ngo() {
  return (
    <>
      <Navber />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 mt-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 py-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          </div>
          <div className="max-w-7xl mx-auto text-center relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans tracking-tight">
              NGO Career Hub
            </h1>
            <p className="mt-2 text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Explore career opportunities with leading NGOs across Bangladesh
            </p>
            <div className="mt-6">
              <a 
                href="#A" 
                className="inline-flex items-center px-8 py-4 border-2 border-white/20 text-lg font-semibold rounded-full text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Browse Organizations
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-3 h-5 w-5 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Alphabet Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 -mt-8 sticky top-20 bg-white/80 backdrop-blur-sm py-4 z-10 rounded-xl border border-gray-200 shadow-sm">
            {['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((letter) => (
              <a 
                key={letter}
                href={`#${letter}`}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 font-medium transition-all duration-150 shadow-xs hover:shadow-sm text-base"
              >
                {letter}
              </a>
            ))}
          </div>

          {/* NGO Listings */}
          <div className="space-y-20">
            {/* A Section */}
            <div id="A" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">A</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="ASA (Association for Social Advancement)" url="https://jobs.asabd.org/" />
                <NgoCard name="Ain o Salish Kendra (ASK)" url="https://www.askbd.org/ask/category/vacancy-announcement/job-opportunities/" />
                <NgoCard name="Aparajeyo Bangladesh" url="https://aparajeyo.org/#" />
                <NgoCard name="Autism Welfare Foundation" url="https://aparajeyo.org/#" />
              </div>
            </div>

            {/* B Section */}
            <div id="B" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">B</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="BRAC" url="https://careers.brac.net/" />
                <NgoCard name="Bangladesh Environmental Lawyers Association (BELA)" url="http://bela.org.bd" />
                <NgoCard name="BARCIK (Bangladesh Resource Center for Indigenous Knowledge)" url="https://www.barcikbd.org/career/" />
                <NgoCard name="BDPC (Bangladesh Disaster Preparedness Center)" url="https://www.bdpc.org.bd/index.php/stay-informed/jobs" />
                <NgoCard name="BEDS (Bangladesh Environment and Development Society)" url="https://www.bedsbd.org/about-us/career" />
                <NgoCard name="Bangladesh Association for Social Advancement (BASA)" url="https://basango.org/career.html" />
                <NgoCard name="BURO Bangladesh" url="https://www.burobd.org/" />
                <NgoCard name="Bangladesh Legal Aid and Services Trust (BLAST)" url="https://blast.org.bd/" />
              </div>
            </div>

            {/* C Section */}
            <div id="C" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">C</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="CCDB (Christian Commission for Development in Bangladesh)" url="https://ccdbbd.org/" />
                <NgoCard name="COAST Trust" url="https://coastbd.net/job-opportunity-for-leadership-position/" />
                <NgoCard name="Center for Natural Resource Studies (CNRS)" url="https://cnrs.org.bd/career/" />
                <NgoCard name="Centre for Disability in Development (CDD)" url="https://cdd.org.bd/2019/10/18/career-with-cdd/" />
                <NgoCard name="CHRISTIAN SERVICE SOCIETY (CSS)" url="https://www.cssbd.org/careers.php" />
              </div>
            </div>

            {/* D Section */}
            <div id="D" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">D</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Dhaka Ahsania Mission (DAM)" url="https://www.ahsaniamission.org.bd/job/" />
                <NgoCard name="Dustho Shasthya Kendra (DSK)" url="https://www.dskbangladesh.org/career/" />
                <NgoCard name="DORP (Development Organization of the Rural Poor)" url="https://dorpbd.org/career/" />
              </div>
            </div>

            {/* E Section */}
            <div id="E" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">E</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Eco-Social Development Organization (ESDO)" url="https://esdo.net.bd/" />
                <NgoCard name="Eminence Associates for Social Development" url="https://eminence-bd.org/employment/" />
              </div>
            </div>

            {/* F Section */}
            <div id="F" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">F</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Friendship NGO" url="https://friendship.ngo/" />
              </div>
            </div>

            {/* G Section */}
            <div id="G" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">G</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Grameen Bank" url="https://grameenbank.org.bd/about/career" />
                <NgoCard name="Gram Bikash Kendra (GBK)" url="https://www.gbk-bd.org/" />
                <NgoCard name="Gana Unnayan Kendra (GUK)" url="https://www.gukbd.net/careers/" />
                <NgoCard name="Gram Unnayan Karma (GUK)" url="https://guk.org.bd/career" />
                <NgoCard name="Green Hill (গ্রীন হিল)" url="http://www.greenhill-bd.org/notice-board/job-circular" />
              </div>
            </div>

            {/* H Section */}
            <div id="H" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">H</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              </div>
            </div>

            {/* I Section */}
            <div id="I" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">I</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Integrated Development Foundation (IDF)" url="https://idfbd.org/jobs/" />
              </div>
            </div>

            {/* J Section */}
            <div id="J" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">J</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Jagorani Chakra Foundation (JCF)" url="https://jcf.org.bd/available-jobs/" />
                <NgoCard name="Jago Nari" url="https://www.jagonari.org/" />
                <NgoCard name="JAAGO Foundation" url="https://jaago.com.bd/career" />
              </div>
            </div>

            {/* K Section */}
            <div id="K" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">K</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Khulna Mukti Seba Sangstha (KMSS)" url="https://kmssbd.org/index.php/media-events/career-with-us" />
              </div>
            </div>

            {/* L Section */}
            <div id="L" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">L</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Light House" url="https://lighthousebd.org/career/" />
                <NgoCard name="LightCastle Partners" url="https://lightcastlepartners.com/careers/" />
              </div>
            </div>

            {/* M Section */}
            <div id="M" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">M</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Manusher Jonno Foundation (MJF)" url="https://www.manusherjonno.org/get-involved/" />
                <NgoCard name="Mukti Cox's Bazar" url="https://www.mukticox.org/career/" />
              </div>
            </div>

            {/* N Section */}
            <div id="N" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">N</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Nagorik Uddyog (Citizen's Initiative)" url="http://www.nagorik-uddyog.org/" />
                <NgoCard name="Nabolok" url="https://nabolokbd.org/career-opportunity/" />
              </div>
            </div>

            {/* O Section */}
            <div id="O" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">O</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Odhikar" url="https://odhikar.org/" />
              </div>
            </div>

            {/* P Section */}
            <div id="P" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">P</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Proshika" url="https://www.proshika.org/" />
                <NgoCard name="People's Oriented Program Implementation (POPI)" url="https://www.popibd.org/career" />
                <NgoCard name="Prodipan" url="https://www.prodipan-bd.org/" />
              </div>
            </div>

            {/* Q Section */}
            <div id="Q" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">Q</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="" url="" />
              </div>
            </div>

            {/* R Section */}
            <div id="R" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">R</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="RDRS Bangladesh" url="https://rdrsbangladesh.org/" />
                <NgoCard name="RIC (Resource Integration Center)" url="https://www.ric-bd.org/news-career" />
                <NgoCard name="Rupantar" url="https://rupantar.org/career/" />
              </div>
            </div>

            {/* S Section */}
            <div id="S" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">S</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Shakti Foundation" url="https://www.shakti.org.bd/career" />
                <NgoCard name="Sajida Foundation" url="https://career.sajida.org/" />
                <NgoCard name="SETU Bangladesh" url="https://setu.ngo/" />
                <NgoCard name="Society for Health Extension and Development (SHED)" url="https://shedbd.org/" />
                <NgoCard name="Shariatpur Development Society (SDS)" url="https://www.sdsbd.org/notice/job-opportunity/" />
                <NgoCard name="Social and Economic Enhancement Program (SEEP)" url="https://www.seep.org.bd/jobs/" />
                <NgoCard name="Society for Underprivileged Families (SUF)" url="https://sufbd.net/vacancy/" />
                <NgoCard name="Surjer Hashi Network" url="https://shnnetwork.org/career/" />
                <NgoCard name="Shushilan" url="https://shushilan.org/human-resource-cell" />
              </div>
            </div>

            {/* T Section */}
            <div id="T" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">T</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Transparency International Bangladesh (TIB)" url="https://career.ti-bangladesh.org/" />
                <NgoCard name="TMSS (Thengamara Mohila Sabuj Sangha)" url="https://tmss-bd.org/careers/" />
                <NgoCard name="Trinamool Unnayan Sangstha (TUS)" url="https://www.trinamulchtbd.org/current-opportunities/" />
                <NgoCard name="Teach For Bangladesh" url="https://teachforbangladesh.org/careers/" />
              </div>
            </div>

            {/* U Section */}
            <div id="U" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">U</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Uddipan" url="https://erecruitment.uddipan.org/recruitment/"/>
                <NgoCard name="Underprivileged Children's Educational Programs (UCEP)" url="https://www.ucepbd.org/job-vacancy/"/>
              </div>
            </div>

            {/* V Section */}
            <div id="V" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">V</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="VERC (Village Education Resource Center)" url="https://www.vercbd.org/career.html" />
                <NgoCard name="Volunteers Association for Bangladesh" url="https://www.vabonline.org" />
                <NgoCard name="Voluntary Association for Rural Development (VARD)" url="https://www.vardbd.org/pgChild.php?pgID=pgVacancy01&mnuID=mnuAbtUs&prnt=no" />
              </div>
            </div>

            {/* W Section */}
            <div id="W" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">W</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Wave Foundation" url="https://wavefoundationbd.org/careers/" />
                <NgoCard name="Water & Sanitation for the Urban Poor (WSUP)" url="https://wsup.com/get-involved/work-with-us/vacancies/" />
              </div>
            </div>
            
            {/* Y Section */}
            <div id="Y" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">Y</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="YPSA (Young Power in Social Action)" url="https://ypsa.org/job-opportunity/" />

              </div>
            </div>

            {/* Back to Top Button */}
            <div className="flex justify-center mt-20">
              <a 
                href="#top" 
                className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 group"
              >
                <span className="mr-2">Back to Top</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Modern NGO Card Component
function NgoCard({ name, url }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 group">
      <div className="p-6 h-full flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-3">{name}</h3>
        <div className="mt-auto">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 text-sm font-medium rounded-lg text-emerald-600 bg-white hover:bg-gray-50 hover:border-emerald-300 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 w-full text-center group-hover:shadow-xs"
          >
            View Opportunities
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ngo;