import React from 'react';
import Navber from './navbar';
import Footer from './footer';

function Ingo() {
  return (
    <>
      <Navber />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 mt-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 py-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          </div>
          <div className="max-w-7xl mx-auto text-center relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans tracking-tight">
              International NGO Careers Hub
            </h1>
            <p className="mt-2 text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Discover global opportunities with leading international NGOs
            </p>
            <div className="mt-6">
              <a 
                href="#A" 
                className="inline-flex items-center px-8 py-4 border-2 border-white/20 text-lg font-semibold rounded-full text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Explore Organizations
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
          <div className="flex flex-wrap justify-center gap-2 mb-8 -mt-8 sticky top-20 bg-white/80 backdrop-blur-sm py-4 z-10 rounded-xl border border-gray-200 shadow-sm">
            {['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((letter) => (
              <a 
                key={letter}
                href={`#${letter}`}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-all duration-150 shadow-xs hover:shadow-sm text-base"
              >
                {letter}
              </a>
            ))}
          </div>

          {/* NGO Listings */}
          <div className="space-y-20">
            {/* # Section */}
            <div id="#" className="scroll-mt-20">
              <div className="flex items-center mb-2">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">#</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard 
                  name="3F-United Federation of Danish Workers" 
                  url="https://www.3f.dk/om-3f/job-i-3f/jobopslag" 
                />
              </div>
            </div>

            {/* A Section */}
            <div id="A" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">A</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Australian Baptist Missionary Society" url="https://baptistmissionaustralia.org/serve/opportunities/" />
                <NgoCard name="Academy for Educational Development (AED)" url="https://www.aed.com/careers" />
                <NgoCard name="ACDI/VOCA" url="https://internationaljobs-acdivoca.icims.com/jobs/intro" />
                <NgoCard name="ACTED" url="https://www.acted.org/en/get-involved/join-us/vacancies/" />
                <NgoCard name="Action Aid- Bangladesh" url="https://jobs.actionaidbd.org/" />
                <NgoCard name="Action Contre La Faim (Action Against Hunger)" url="https://www.actionagainsthunger.org/careers/current-openings/" />
                <NgoCard name="Action for Enterprise" url="http://www.actionforenterprise.org/index.php" />
                <NgoCard name="Action on Disability & Development (ADD)" url="https://add.org.uk/jobs/" />
                <NgoCard name="Adventist Development & Relief Agency International (ADRA)" url="https://www.adrabangladesh.org/careers" />
                <NgoCard name="AIDA, Ayuda, Intercambio Y Desarrollo" url="https://coordinadoraongd.org/organizaciones/asociacion-aida-ayuda-intercambio-y-desarrollo/" />
                <NgoCard name="Al Basar International Foundation" url="https://albasar.org.uk/" />
                <NgoCard name="Al-Khair Foundation Bangladesh" url="https://alkhair.org/application-for-employment/" />
                <NgoCard name="ACIL Solidarity Center" url="https://www.solidaritycenter.org/" />
                <NgoCard name="Americares Foundation" url="https://www.americares.org/take-action/jobs/" />
                <NgoCard name="Amrock Academy Society" url="https://www.amaroksociety.org/" />
                <NgoCard name="Andheri Hilfe Bangladesh" url="https://www.andheri-hilfe.de/informieren/presse-service-downloads/english/" />
                <NgoCard name="Apasen International" url="https://alkhair.org/application-for-employment/" />
                <NgoCard name="Article 19" url="https://www.article19.org/careers/" />
                <NgoCard name="ASHOKA : Innovators for the Public" url="https://www.ashoka.org/en-bd/ashoka-career-opportunities" />
                <NgoCard name="Asia Arsenic Network" url="https://aanbangladesh.org/" />
                <NgoCard name="Asian Disaster Preparedness Centre" url="https://www.adpc.net/igo/contents/HRA/ADPC-JoinUS.asp" />
                <NgoCard name="Assemblies of God Mission" url="https://www.agmissionbd.com/" />
                <NgoCard name="Association for Aid and Relief, Japan (AAR Japan)" url="https://aarjapan.gr.jp/en/" />
                <NgoCard name="Association of Medical Doctors for Asia (AMDA)" url="https://www.amdainternational.com/" />
                <NgoCard name="Acid Survivors Foundation" url="https://acidsurvivors.org/category/job-circular/" />
              </div>
            </div>

            {/* B Section */}
            <div id="B" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">B</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Bangladesh American Society of Muslim Aid for Humanity Inc." url="https://basmah.org/" />
                <NgoCard name="Bangladesh Development Initiative" url="https://www.bdiusa.org/" />
                <NgoCard name="Baptist Mid Mission Bangladesh" url="https://www.bmm.org/job-openings" />
                <NgoCard name="BASUG-Diaspora & Development" url="https://www.basug.eu/" />
                <NgoCard name="BBC Media Action" url="https://www.bbc.co.uk/mediaaction/contact/jobs" />
                <NgoCard name="BHN Association" url="https://www.bhninc.org/careers" />
                <NgoCard name="BRAC International" url="https://bracinternational.org/career/" />
              </div>
            </div>

            {/* C Section */}
            <div id="C" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">C</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Carter Center" url="https://www.cartercenter.org/about/careers/index.html" />
                <NgoCard name="Catholic Agency for Overseas Development (CAFOD)" url="https://cafod.org.uk/work-with-us" />
                <NgoCard name="Caritas Internationalis" url="https://www.caritas.org/who-we-are/career/" />
                <NgoCard name="Children International" url="https://www.children.org/learn-more/employment" />
                <NgoCard name="CIRDAP" url="https://cirdap.org/category/opportunities/" />
                <NgoCard name="CARE-Bangladesh" url="https://career.carebangladesh.org" />
                <NgoCard name="CAP Anamur" url="https://cap-anamur.org/en/jobs/" />
                <NgoCard name="Caritas Switzerland" url="https://www.caritas.ch/en/career/" />
                <NgoCard name="Catholic Relief Services(CRS)" url="https://www.crs.org/about/careers" />
                <NgoCard name="Christian Aid" url="https://jobs.christianaid.org.uk/jobs/home/" />
                <NgoCard name="Compassion International Bangladesh" url="https://surl.li/ssxykv" />
                <NgoCard name="CONCERN - Worldwide" url="https://jobs.concern.net/jobsinternational/home/" />
                <NgoCard name="Counterpart International Inc." url="https://www.counterpart.org/careers/" />
                <NgoCard name="Chemonics International Inc." url="https://chemonics.com/jobs/" />
                <NgoCard name="Cordaid" url="https://www.cordaid.org/en/" />
              </div>
            </div>

            {/* D Section */}
            <div id="D" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">D</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="DAKBHANGA" url="https://www.dakbhanga.org/career-with-us/" />
                <NgoCard name="Damien Foundation" url="https://www.damienfoundation-bd.com/career" />
                <NgoCard name="Danish Bangladesh Leprosy Mission" url="https://tlmbangladesh.org/jobs/" />
                <NgoCard name="Danish Refugee Council" url="https://drc.ngo/about-us/work-with-us/" />
                <NgoCard name="DIAKONIA / Swedish Free Church Aid" url="https://www.diakonia.se/en/about-us/job-opportunities/" />
              </div>
            </div>

            {/* E Section */}
            <div id="E" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">E</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Education and Development Foundation (Educo)" url="https://www.educo.org.bd/work-with-us/" />
                <NgoCard name="Enfants Du Monde" url="https://edm.ch/en/employment/" />
                <NgoCard name="Engender Health Int." url="https://www.engenderhealth.org/about/work-with-us/careers" />
              </div>
            </div>

            {/* F Section */}
            <div id="F" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">F</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="F H Association" url="https://www.fh.org/about/careers/" />
                <NgoCard name="Friedrich Naumann Foundation" url="https://www.freiheit.org/career" />
                <NgoCard name="Families for Children" url="https://buildingfamiliesforchildren.org/employment/" />
                <NgoCard name="FHI 360" url="https://www.fhi360.org/join-our-team/" />
                <NgoCard name="Fida International Bangladesh" url="https://fida.fi/en/work-with-us/" />
                <NgoCard name="Friedrich Ebert Stiftung (FES)" url="https://bangladesh.fes.de/about/join-us.html" />
                <NgoCard name="Fundacion ETEA Para EL Desarrollo Y LA Cooperacion" url="https://fundacionetea.org/en/" />
                <NgoCard name="Fred Hollows Foundation" url="https://www.hollows.org/careers/" />
                <NgoCard name="Financial Literacy International, Inc." url="https://www.financialliteracyinternational.org/" />
              </div>
            </div>

            {/* G Section */}
            <div id="G" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">G</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Global One" url="https://www.careers-page.com/global-one" />
                <NgoCard name="Global Relief Agape in Solidarity" url="https://agape.org.bd/" />
                <NgoCard name="Good Neighbours Bangladesh" url="https://gnbangla.org/jobs/" />
                <NgoCard name="Gender and Water Alliance (GWA)" url="http://genderandwater.org/en/bangladesh" />
                <NgoCard name="GIZ" url="https://www.giz.de/en/jobs/giz_job_opportunities.html" />
                <NgoCard name="Global Alliance for Improved Nutrition(GAIN)" url="https://www.gainhealth.org/careers#vacancies" />
              </div>
            </div>

            {/* H Section */}
            <div id="H" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">H</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Habitat for Humanity International" url="https://www.habitat.org/about/careers" />
                <NgoCard name="Handicap International" url="https://apply.workable.com/hi-jobs/?lng=en" />
                <NgoCard name="Health And Education For All (HAEFA)" url="https://www.haefabd.org/career/" />
                <NgoCard name="Heart to Heart Foundation" url="https://www.h2h.foundation/" />
                <NgoCard name="HEKS/EPER" url="https://en.heks.ch/who-we-are/working-hekseper" />
                <NgoCard name="Helen Keller International" url="https://helenkellerintl.org/careers/" />
                <NgoCard name="HelpAge International (HAI)-Bangladesh" url="https://www.helpage.org/work-with-us/vacancies/" />
                <NgoCard name="Helvetas Swiss Intercooperation" url="https://www.helvetas.org/en/switzerland/who-we-are/jobs" />
                <NgoCard name="Hope Worldwide Bangladesh" url="https://hopeww.org.bd/?page_id=3874" />
                <NgoCard name="Humanity First Bangladesh" url="https://humanityfirst.org/global-health-bangladesh-maternity-services/" />
                <NgoCard name="Hospice Bangladesh" url="https://hospicebangladesh.com/en/careers/" />
              </div>
            </div>

            {/* I Section */}
            <div id="I" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">I</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Insaan Aid" url="https://insaanaid.org/" />
                <NgoCard name="International Development Enterprises (IDE)" url="https://www.ideglobal.org/careers" />
                <NgoCard name="International Justice Mission" url="https://www.ijm.org/careers" />
                <NgoCard name="International Needs" url="https://internationalneedsbd.org/" />
                <NgoCard name="INAFI" url="http://www.inafiindia.net/" />
                <NgoCard name="International Relief and Development" url="https://ird.global/careers/" />
                <NgoCard name="IORWD" url="https://themwl.org/en/node/35993" />
                <NgoCard name="International Relief Friendship Foundation" url="https://irff.us/" />
                <NgoCard name="International Rescue Committee (IRC)" url="https://careers.rescue.org/us/en/search-results" />
                <NgoCard name="IPAS" url="https://ipas.wd5.myworkdayjobs.com/Ipas" />
                <NgoCard name="Islamic Relief Bangladesh" url="https://islamicrelief.org.bd/stay-informed/jobs/" />
                <NgoCard name="Islamic Aid" url="https://islamicaid.com/about-us/work-with-us/" />
              </div>
            </div>

            {/* J Section */}
            <div id="J" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">J</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Jhpiego" url="https://www.jhpiego.org/careers/" />
                <NgoCard name="Johns Hopkins University" url="https://jobs.jhu.edu/search/" />
                <NgoCard name="Justice & Care" url="https://justiceandcare.org/join-the-team/" />
                <NgoCard name="JACE" url="https://jacengos.org/en/" />
              </div>
            </div>

            {/* K Section */}
            <div id="K" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">K</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Konrad Adenauer Stiftung" url="https://www.kas.de/de/karriere" />
                <NgoCard name="Korean Civil Cultural Center" url="https://ngr.korean-culture.org/en" />
                <NgoCard name="Korean Development Association in Bangladesh (KDAB)" url="https://kdab.org.bd/current-vacancies/" />
                <NgoCard name="Kuwait Society for Relief (KSR)" url="https://ksr.org.bd/" />
              </div>
            </div>

            {/* L Section */}
            <div id="L" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">L</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Land O Lakes" url="https://careers.landolakesinc.com/us/en" />
                <NgoCard name="Learning for Life Bangladesh" url="https://www.learninglife.org.uk/job-oportunities/" />
                <NgoCard name="Leprosy Mission" url="https://tlmbangladesh.org/jobs/" />
                <NgoCard name="Lepra Bangladesh" url="https://www.lepra.org.uk/who-we-are/careers-at-lepra" />
                <NgoCard name="Life & Life Onplus" url="https://lifeandlife.org/" />
              </div>
            </div>

            {/* M Section */}
            <div id="M" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">M</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="MAF Bangladesh" url="https://mafint.org/serve-maf/current-vacancies" />
                <NgoCard name="Management Science for Health" url="https://msh.org/work-with-us/" />
                <NgoCard name="Med Global Inc." url="https://medglobal.org/careers/" />
                <NgoCard name="Medecins du Monde" url="https://www.medecinsdumonde.org/en/all-our-vacancies/" />
                <NgoCard name="Medicins Sans Frontieres" url="https://www.msf.org/jobs" />
                <NgoCard name="Mennonite Central Committee (MCC)" url="https://mcc.org/careers" />
                <NgoCard name="Mercy Corps." url="https://www.mercycorps.org/careers" />
                <NgoCard name="Muslim Aid-UK" url="https://www.muslimaid.org/vacancies/" />
                <NgoCard name="Muslim Hands International" url="https://muslimhands.org.uk/home" />
                <NgoCard name="MSI Reproductive Choices" url="https://www.msichoices.org/who-we-are/careers/" />
                <NgoCard name="Max Foundation" url="https://maxfoundation.org/our-story/#jobs" />
              </div>
            </div>

            {/* N Section */}
            <div id="N" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">N</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Norwegian Refugee Council" url="https://www.nrc.no/careers" />
                <NgoCard name="Nutrition International" url="https://msh.org/work-with-us/" />
                <NgoCard name="Normisjon Bangladesh" url="https://www.normisjon.no/vare-prosjekter/bangladesh/" />
                <NgoCard name="NETZ partnership for Development and Justice" url="https://bangladesch.org/en/" />
              </div>
            </div>

            {/* O Section */}
            <div id="O" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">O</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="OISCA-IDB (JAPAN)" url="https://oisca-international.org/" />
                <NgoCard name="OXFAM -Bangladesh" url="https://jobs.oxfam.org.uk/jobs/vacancy/find/results/" />
                <NgoCard name="Orbis International Inc." url="https://www.orbis.org/en/about-us/employment" />
              </div>
            </div>

            {/* P Section */}
            <div id="P" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">P</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Pathfinder International" url="https://www.pathfinder.org/careers/" />
                <NgoCard name="Peace Winds Japan" url="https://en.peace-winds.org/3105/" />
                <NgoCard name="Plan International Bangladesh" url="https://jobs.plan-international.org/" />
                <NgoCard name="Population Council (USA)" url="https://popcouncil.org/careers/" />
                <NgoCard name="Practical Action" url="https://practicalaction.org/careers/" />
                <NgoCard name="Premiere Urgence International (PUI)" url="https://www.premiere-urgence.org/en/our-job-offers/" />
                <NgoCard name="Project Concern International" url="https://www.pciglobal.in/jobs/" />
                <NgoCard name="Project Hope" url="https://www.projecthope.org/careers/" />
                <NgoCard name="Pure Earth" url="https://www.pureearth.org/careers/" />
              </div>
            </div>

            {/* Q Section */}
            <div id="Q" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">Q</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Qatar Charity" url="https://www.qcharity.org/blog/opportunities?lang=en" />
              </div>
            </div>

            {/* R Section */}
            <div id="R" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">R</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Relief International" url="https://www.ri.org/work-with-us/" />
                <NgoCard name="RTI International" url="https://careers.rti.org/jobs" />
                <NgoCard name="Room to Read Bangladesh" url="https://www.roomtoread.org/about-us/careers/" />
              </div>
            </div>

            {/* S Section */}
            <div id="S" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">S</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Save The Children" url="https://www.savethechildren.org/us/about-us/careers" />
                <NgoCard name="Sil International" url="https://www.sil.org/resources/publications/about/career" />
                <NgoCard name="Sesame Workshop Bangladesh" url="https://sesameworkshop.org/about-us/careers/" />
                <NgoCard name="Sharjah Charity International" url="https://sharjahcharityintl.com/" />
                <NgoCard name="School Aid Japan- Bangladesh" url="https://www.schoolaidjapan.or.jp/en" />
                <NgoCard name="SNV Netherlands Development Organization, Bangladesh" url="https://www.snv.org/careers" />
                <NgoCard name="Society for International Ministries (SIM)" url="https://www.sil.org/resources/publications/about/career" />
                <NgoCard name="Solidar Suisse" url="https://solidar.ch/en/about-us/jobs/" />
                <NgoCard name="Solidarided Network Asia" url="https://www.solidaridadnetwork.org/jobs/" />
                <NgoCard name="SONNE International, Austria" url="https://sonne-intl.com/index.php/careers/" />
                <NgoCard name="SOS - Children's Village International in Bangladesh" url="https://www.sos-bangladesh.org/careers" />
                <NgoCard name="SAP-Bangladesh" url="https://sapbd.org/career/" />
                <NgoCard name="SLOP Bangladesh" url="https://slopbbd.org/" />
                <NgoCard name="Street Child Bangladesh" url="https://street-child.org/careers/" />
                <NgoCard name="Stromme Foundation" url="https://strommefoundation.org/east-africa/about-us-east-africa/vacancies" />
                <NgoCard name="Swisscontact- Bangladesh" url="https://www.swisscontact.org/en/countries/bangladesh/jobs" />
                <NgoCard name="Symbiosis International" url="https://symbiosis.org.au/get-involved/" />
                <NgoCard name="Sightsavers Bangladesh" url="https://www.sightsavers.org/jobs/" />
              </div>
            </div>

            {/* T Section */}
            <div id="T" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">T</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Teach for Bangladesh" url="https://teachforbangladesh.org/careers/" />
                <NgoCard name="Tear Fund" url="https://jobs.tearfund.org/jobs/home/" />
                <NgoCard name="Terre des Homes" url="https://www.tdh.org/en/about-us/careers" />
                <NgoCard name="Terre-Des-Homes (Netherlands)" url="https://www.terredeshommes.nl/en/jobs" />
                <NgoCard name="The Carter Center" url="https://shorturl.at/PWgQQ" />
                <NgoCard name="The Optimists" url="https://theoptimists.org/career/" />
                <NgoCard name="Transform Aid International Bangladesh" url="https://baptistworldaid.org.au/career/" />
                <NgoCard name="Tranzsend-Bangladesh" url="https://www.tranzsendbd.org/" />
                <NgoCard name="The Hunger Project" url="https://thp.org/who-we-are/opportunities/" />
                <NgoCard name="Transparency International Bangladesh (TIB)" url="https://career.ti-bangladesh.org/" />
              </div>
            </div>

            {/* U Section */}
            <div id="U" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">U</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Uchicago Research Bangladesh LLC" url="https://www.urb-bd.org/Scopes/IO" />
                <NgoCard name="United Purpose" url="https://united-purpose.org/vacancies" />
                <NgoCard name="United Kingdom Bangladesh Education Trust (UKBET)" url="https://www.ukbet-bd.org/2021/03/23/join-the-ukbet-team/" />
                <NgoCard name="USP-Bangladesh" url="https://usp.jobs/" />
                <NgoCard name="URC-CHS" url="https://www.urc-chs.com/" />
              </div>
            </div>

            {/* V Section */}
            <div id="V" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">V</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Voluntary Service Overseas (VSO)" url="https://www.vsointernational.org/about/careers" />
                <NgoCard name="Volunteers Association for Bangladesh" url="https://www.vabonline.org" />
              </div>
            </div>

            {/* W Section */}
            <div id="W" className="scroll-mt-20">
              <div className="flex items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 font-mono">W</h2>
                <div className="ml-4 h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NgoCard name="Water & Life Bangladesh" url="https://eauetvie.fr/bangladesh/careers/" />
                <NgoCard name="Water & Sanitation for the Urban Poor (WSUP)" url="https://wsup.com/get-involved/work-with-us/vacancies/" />
                <NgoCard name="Water Aid" url="https://www.wateraid.org/bd/jobs-opportunity" />
                <NgoCard name="Water.org" url="https://water.org/careers/" />
                <NgoCard name="Welt hungerhilfe Bangladesh" url="https://www.welthungerhilfe.org/jobs" />
                <NgoCard name="Wild Team UK" url="https://www.wildteam.org.uk/" />
                <NgoCard name="Wildlife Conservation Society (WCS)" url="https://www.wcs.org/about-us/careers" />
                <NgoCard name="Winrock International" url="https://winrock.org/work-with-us/careers/job-openings/" />
                <NgoCard name="World Concern" url="https://worldconcern.org/about/careers" />
                <NgoCard name="World Wild Life (WWL)" url="https://www.worldwildlife.org/about/careers" />
                <NgoCard name="World Vision Bangladesh" url="https://www.wvi.org/career" />
                <NgoCard name="War Child" url="https://careers.warchild.org.uk/home.html" />
                <NgoCard name="World Renew" url="https://world-renew.breezy.hr/" />
                <NgoCard name="World Mission Prayer" url="https://wmpl.org/service-opportunities/" />
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
            className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 text-sm font-medium rounded-lg text-indigo-600 bg-white hover:bg-gray-50 hover:border-indigo-300 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 w-full text-center group-hover:shadow-xs"
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

export default Ingo;