import React from 'react';
import { Helmet } from "react-helmet-async";
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
    },
      {
    letter: 'F',
    listings: [
      { name: 'F H Association', url: 'https://www.fh.org/about/careers/' },
      { name: 'Friedrich Naumann Foundation', url: 'https://www.freiheit.org/career' },
      { name: 'Families for Children', url: 'https://buildingfamiliesforchildren.org/employment/' },
      { name: 'FHI 360', url: 'https://www.fhi360.org/join-our-team/' },
      { name: 'Fida International Bangladesh', url: 'https://fida.fi/en/work-with-us/' },
      { name: 'Friedrich Ebert Stiftung (FES)', url: 'https://bangladesh.fes.de/about/join-us.html' },
      { name: 'Fundacion ETEA Para EL Desarrollo Y LA Cooperacion', url: 'https://fundacionetea.org/en/' },
      { name: 'Fred Hollows Foundation', url: 'https://www.hollows.org/careers/' },
      { name: 'Financial Literacy International, Inc.', url: 'https://www.financialliteracyinternational.org/' }
    ]
  },
  {
  letter: 'G',
  listings: [
    { name: 'Global One', url: 'https://www.careers-page.com/global-one' },
    { name: 'Global Relief Agape in Solidarity', url: 'https://agape.org.bd/' },
    { name: 'Good Neighbours Bangladesh', url: 'https://gnbangla.org/jobs/' },
    { name: 'Gender and Water Alliance (GWA)', url: 'http://genderandwater.org/en/bangladesh' },
    { name: 'GIZ', url: 'https://www.giz.de/en/jobs/giz_job_opportunities.html' },
    { name: 'Global Alliance for Improved Nutrition(GAIN)', url: 'https://www.gainhealth.org/careers#vacancies' }
  ]
},
{
  letter: 'H',
  listings: [
    { name: 'Habitat for Humanity International', url: 'https://www.habitat.org/about/careers' },
    { name: 'Handicap International', url: 'https://apply.workable.com/hi-jobs/?lng=en' },
    { name: 'Health And Education For All (HAEFA)', url: 'https://www.haefabd.org/career/' },
    { name: 'Heart to Heart Foundation', url: 'https://www.h2h.foundation/' },
    { name: 'HEKS/EPER', url: 'https://en.heks.ch/who-we-are/working-hekseper' },
    { name: 'Helen Keller International', url: 'https://helenkellerintl.org/careers/' },
    { name: 'HelpAge International (HAI)-Bangladesh', url: 'https://www.helpage.org/work-with-us/vacancies/' },
    { name: 'Helvetas Swiss Intercooperation', url: 'https://www.helvetas.org/en/switzerland/who-we-are/jobs' },
    { name: 'Hope Worldwide Bangladesh', url: 'https://hopeww.org.bd/?page_id=3874' },
    { name: 'Humanity First Bangladesh', url: 'https://humanityfirst.org/global-health-bangladesh-maternity-services/' },
    { name: 'Hospice Bangladesh', url: 'https://hospicebangladesh.com/en/careers/' }
  ]
},
{
  letter: 'I',
  listings: [
    { name: 'Insaan Aid', url: 'https://insaanaid.org/' },
    { name: 'International Development Enterprises (IDE)', url: 'https://www.ideglobal.org/careers' },
    { name: 'International Justice Mission', url: 'https://www.ijm.org/careers' },
    { name: 'International Needs', url: 'https://internationalneedsbd.org/' },
    { name: 'INAFI', url: 'http://www.inafiindia.net/' },
    { name: 'International Relief and Development', url: 'https://ird.global/careers/' },
    { name: 'IORWD', url: 'https://themwl.org/en/node/35993' },
    { name: 'International Relief Friendship Foundation', url: 'https://irff.us/' },
    { name: 'International Rescue Committee (IRC)', url: 'https://careers.rescue.org/us/en/search-results' },
    { name: 'IPAS', url: 'https://ipas.wd5.myworkdayjobs.com/Ipas' },
    { name: 'Islamic Relief Bangladesh', url: 'https://islamicrelief.org.bd/stay-informed/jobs/' },
    { name: 'Islamic Aid', url: 'https://islamicaid.com/about-us/work-with-us/' }
  ]
},
{
  letter: 'J',
  listings: [
    { name: 'Jhpiego', url: 'https://www.jhpiego.org/careers/' },
    { name: 'Johns Hopkins University', url: 'https://jobs.jhu.edu/search/' },
    { name: 'Justice & Care', url: 'https://justiceandcare.org/join-the-team/' },
    { name: 'JACE', url: 'https://jacengos.org/en/' }
  ]
},
{
  letter: 'K',
  listings: [
    { name: 'Konrad Adenauer Stiftung', url: 'https://www.kas.de/de/karriere' },
    { name: 'Korean Civil Cultural Center', url: 'https://ngr.korean-culture.org/en' },
    { name: 'Korean Development Association in Bangladesh (KDAB)', url: 'https://kdab.org.bd/current-vacancies/' },
    { name: 'Kuwait Society for Relief (KSR)', url: 'https://ksr.org.bd/' }
  ]
},
{
  letter: 'L',
  listings: [
    { name: 'Land O Lakes', url: 'https://careers.landolakesinc.com/us/en' },
    { name: 'Learning for Life Bangladesh', url: 'https://www.learninglife.org.uk/job-oportunities/' },
    { name: 'Leprosy Mission', url: 'https://tlmbangladesh.org/jobs/' },
    { name: 'Lepra Bangladesh', url: 'https://www.lepra.org.uk/who-we-are/careers-at-lepra' },
    { name: 'Life & Life Onplus', url: 'https://lifeandlife.org/' }
  ]
},
{
  letter: 'M',
  listings: [
    { name: 'MAF Bangladesh', url: 'https://mafint.org/serve-maf/current-vacancies' },
    { name: 'Management Science for Health', url: 'https://msh.org/work-with-us/' },
    { name: 'Med Global Inc.', url: 'https://medglobal.org/careers/' },
    { name: 'Medecins du Monde', url: 'https://www.medecinsdumonde.org/en/all-our-vacancies/' },
    { name: 'Medicins Sans Frontieres', url: 'https://www.msf.org/jobs' },
    { name: 'Mennonite Central Committee (MCC)', url: 'https://mcc.org/careers' },
    { name: 'Mercy Corps.', url: 'https://www.mercycorps.org/careers' },
    { name: 'Muslim Aid-UK', url: 'https://www.muslimaid.org/vacancies/' },
    { name: 'Muslim Hands International', url: 'https://muslimhands.org.uk/home' },
    { name: 'MSI Reproductive Choices', url: 'https://www.msichoices.org/who-we-are/careers/' },
    { name: 'Max Foundation', url: 'https://maxfoundation.org/our-story/#jobs' }
  ]
},
{
  letter: 'N',
  listings: [
    { name: 'Norwegian Refugee Council', url: 'https://www.nrc.no/careers' },
    { name: 'Nutrition International', url: 'https://msh.org/work-with-us/' },
    { name: 'Normisjon Bangladesh', url: 'https://www.normisjon.no/vare-prosjekter/bangladesh/' },
    { name: 'NETZ partnership for Development and Justice', url: 'https://bangladesch.org/en/' }
  ]
},
{
  letter: 'O',
  listings: [
    { name: 'OISCA-IDB (JAPAN)', url: 'https://oisca-international.org/' },
    { name: 'OXFAM -Bangladesh', url: 'https://jobs.oxfam.org.uk/jobs/vacancy/find/results/' },
    { name: 'Orbis International Inc.', url: 'https://www.orbis.org/en/about-us/employment' }
  ]
},
{
  letter: 'P',
  listings: [
    { name: 'Pathfinder International', url: 'https://www.pathfinder.org/careers/' },
    { name: 'Peace Winds Japan', url: 'https://en.peace-winds.org/3105/' },
    { name: 'Plan International Bangladesh', url: 'https://jobs.plan-international.org/' },
    { name: 'Population Council (USA)', url: 'https://popcouncil.org/careers/' },
    { name: 'Practical Action', url: 'https://practicalaction.org/careers/' },
    { name: 'Premiere Urgence International (PUI)', url: 'https://www.premiere-urgence.org/en/our-job-offers/' },
    { name: 'Project Concern International', url: 'https://www.pciglobal.in/jobs/' },
    { name: 'Project Hope', url: 'https://www.projecthope.org/careers/' },
    { name: 'Pure Earth', url: 'https://www.pureearth.org/careers/' }
  ]
},
{
  letter: 'Q',
  listings: [
    { name: 'Qatar Charity', url: 'https://www.qcharity.org/blog/opportunities?lang=en' }
  ]
},
{
  letter: 'R',
  listings: [
    { name: 'Relief International', url: 'https://www.ri.org/work-with-us/' },
    { name: 'RTI International', url: 'https://careers.rti.org/jobs' },
    { name: 'Room to Read Bangladesh', url: 'https://www.roomtoread.org/about-us/careers/' }
  ]
},
{
  letter: 'S',
  listings: [
    { name: 'Save The Children', url: 'https://www.savethechildren.org/us/about-us/careers' },
    { name: 'Sil International', url: 'https://www.sil.org/resources/publications/about/career' },
    { name: 'Sesame Workshop Bangladesh', url: 'https://sesameworkshop.org/about-us/careers/' },
    { name: 'Sharjah Charity International', url: 'https://sharjahcharityintl.com/' },
    { name: 'School Aid Japan- Bangladesh', url: 'https://www.schoolaidjapan.or.jp/en' },
    { name: 'SNV Netherlands Development Organization, Bangladesh', url: 'https://www.snv.org/careers' },
    { name: 'Society for International Ministries (SIM)', url: 'https://www.sil.org/resources/publications/about/career' },
    { name: 'Solidar Suisse', url: 'https://solidar.ch/en/about-us/jobs/' },
    { name: 'Solidarided Network Asia', url: 'https://www.solidaridadnetwork.org/jobs/' },
    { name: 'SONNE International, Austria', url: 'https://sonne-intl.com/index.php/careers/' },
    { name: 'SOS - Children\'s Village International in Bangladesh', url: 'https://www.sos-bangladesh.org/careers' },
    { name: 'SAP-Bangladesh', url: 'https://sapbd.org/career/' },
    { name: 'SLOP Bangladesh', url: 'https://slopbbd.org/' },
    { name: 'Street Child Bangladesh', url: 'https://street-child.org/careers/' },
    { name: 'Stromme Foundation', url: 'https://strommefoundation.org/east-africa/about-us-east-africa/vacancies' },
    { name: 'Swisscontact- Bangladesh', url: 'https://www.swisscontact.org/en/countries/bangladesh/jobs' },
    { name: 'Symbiosis International', url: 'https://symbiosis.org.au/get-involved/' },
    { name: 'Sightsavers Bangladesh', url: 'https://www.sightsavers.org/jobs/' }
  ]
},
{
  letter: 'T',
  listings: [
    { name: 'Teach for Bangladesh', url: 'https://teachforbangladesh.org/careers/' },
    { name: 'Tear Fund', url: 'https://jobs.tearfund.org/jobs/home/' },
    { name: 'Terre des Homes', url: 'https://www.tdh.org/en/about-us/careers' },
    { name: 'Terre-Des-Homes (Netherlands)', url: 'https://www.terredeshommes.nl/en/jobs' },
    { name: 'The Carter Center', url: 'https://shorturl.at/PWgQQ' },
    { name: 'The Optimists', url: 'https://theoptimists.org/career/' },
    { name: 'Transform Aid International Bangladesh', url: 'https://baptistworldaid.org.au/career/' },
    { name: 'Tranzsend-Bangladesh', url: 'https://www.tranzsendbd.org/' },
    { name: 'The Hunger Project', url: 'https://thp.org/who-we-are/opportunities/' },
    { name: 'Transparency International Bangladesh (TIB)', url: 'https://career.ti-bangladesh.org/' }
  ]
},
{
  letter: 'U',
  listings: [
    { name: 'Uchicago Research Bangladesh LLC', url: 'https://www.urb-bd.org/Scopes/IO' },
    { name: 'United Purpose', url: 'https://united-purpose.org/vacancies' },
    { name: 'United Kingdom Bangladesh Education Trust (UKBET)', url: 'https://www.ukbet-bd.org/2021/03/23/join-the-ukbet-team/' },
    { name: 'USP-Bangladesh', url: 'https://usp.jobs/' },
    { name: 'URC-CHS', url: 'https://www.urc-chs.com/' }
  ]
},
{
  letter: 'V',
  listings: [
    { name: 'Voluntary Service Overseas (VSO)', url: 'https://www.vsointernational.org/about/careers' },
    { name: 'Volunteers Association for Bangladesh', url: 'https://www.vabonline.org' }
  ]
},
{
  letter: 'W',
  listings: [
    { name: 'Water & Life Bangladesh', url: 'https://eauetvie.fr/bangladesh/careers/' },
    { name: 'Water & Sanitation for the Urban Poor (WSUP)', url: 'https://wsup.com/get-involved/work-with-us/vacancies/' },
    { name: 'Water Aid', url: 'https://www.wateraid.org/bd/jobs-opportunity' },
    { name: 'Water.org', url: 'https://water.org/careers/' },
    { name: 'Welt hungerhilfe Bangladesh', url: 'https://www.welthungerhilfe.org/jobs' },
    { name: 'Wild Team UK', url: 'https://www.wildteam.org.uk/' },
    { name: 'Wildlife Conservation Society (WCS)', url: 'https://www.wcs.org/about-us/careers' },
    { name: 'Winrock International', url: 'https://winrock.org/work-with-us/careers/job-openings/' },
    { name: 'World Concern', url: 'https://worldconcern.org/about/careers' },
    { name: 'World Wild Life (WWL)', url: 'https://www.worldwildlife.org/about/careers' },
    { name: 'World Vision Bangladesh', url: 'https://www.wvi.org/career' },
    { name: 'War Child', url: 'https://careers.warchild.org.uk/home.html' },
    { name: 'World Renew', url: 'https://world-renew.breezy.hr/' },
    { name: 'World Mission Prayer', url: 'https://wmpl.org/service-opportunities/' }
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
<Helmet>

  {/* SEO Title */}
  <title>
    International NGO Jobs 2026 | Global Humanitarian Careers | UN & Development Jobs | CrossCareers
  </title>

  {/* Meta Description */}
  <meta
    name="description"
    content="Find 500+ international NGO jobs including humanitarian, UN, development, nonprofit, and global careers. Updated daily with official links and top opportunities worldwide by CrossCareers."
  />

  {/* Keywords */}
  <meta
    name="keywords"
    content="International NGO jobs 2026, humanitarian jobs, UN jobs 2026, development careers, nonprofit jobs, global NGO careers, international humanitarian careers, Bangladesh NGO jobs, international development jobs, aid organization careers, NGO job portal, CrossCareers NGO jobs"
  />

  {/* Canonical URL */}
  <link
    rel="canonical"
    href="https://crosscareers.com/international-ngo-jobs"
  />

  {/* Robots */}
  <meta
    name="robots"
    content="index, follow, max-image-preview:large"
  />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="International NGO Jobs 2026 | Global Humanitarian Careers | CrossCareers" />
  <meta property="og:description" content="Explore hundreds of verified international NGO, UN, and development job opportunities worldwide. Apply directly through official portals." />
  <meta property="og:url" content="https://crosscareers.com/international-ngo-jobs" />
  <meta property="og:image" content="https://crosscareers.com/logo/favcon.png" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="International NGO Jobs 2026 | CrossCareers" />
  <meta name="twitter:description" content="Discover verified international NGO, UN, humanitarian, and development career opportunities worldwide." />
  <meta name="twitter:image" content="https://crosscareers.com/logo/favcon.png" />

  {/* Structured Data */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "International NGO Careers Hub",
      "url": "https://crosscareers.com/international-ngo-jobs",
      "description": "Browse hundreds of international NGO, UN, humanitarian, and development career opportunities with direct official links, updated daily.",
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

    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 mt-14">

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

          <div className="mt-6 -mb-4">
            <a
              href="#A"
              className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-lg font-semibold rounded-full text-white bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Explore Organizations
            </a>
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
              className="w-12 h-12 flex items-center justify-center bg-gradient-to-b from-white to-gray-50 border border-gray-200 hover:border-indigo-400 hover:from-indigo-50 hover:to-white hover:text-indigo-600 font-medium transition-all duration-200 shadow-xs hover:shadow-md text-lg hover:scale-105"
            >
              {letter}
            </a>
          ))}
        </div>

        {/* NGO Listings */}
        <div className="space-y-20">
          {ngoSections.map((section) => (
            <div key={section.letter} id={section.letter} className="scroll-mt-24">
              <div className="flex items-center mb-10">
                <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
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
              <span className="font-semibold">Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    {/* FAQ Section */}
<section className="bg-white py-16 lg:py-24 border-t border-gray-100">
  <div className="container mx-auto px-6 max-w-5xl">

    <div className="text-center mb-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Frequently Asked Questions About International NGO Jobs
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        Professionals interested in humanitarian and development careers often search for reliable platforms to find international NGO jobs. 
        Below are some of the most commonly searched questions related to global development careers, United Nations opportunities, 
        and international humanitarian job portals.
      </p>
    </div>

    <div className="space-y-10 text-gray-700 leading-relaxed">

      <div>
        <h3 className="font-bold text-xl mb-2">1. What are international NGO jobs?</h3>
        <p>
          International NGO jobs are professional positions within global non-governmental organizations that operate across multiple countries. 
          These roles focus on humanitarian assistance, disaster response, poverty reduction, health, education, and sustainable development. 
          Professionals working in international NGOs often collaborate with governments, UN agencies, and local communities to implement development programs and emergency responses.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">2. Where can I find international NGO job opportunities?</h3>
        <p>
          International NGO job opportunities can be found through specialized humanitarian job portals, official NGO career websites, 
          and global development job platforms. Many organizations publish vacancies through well-known international job portals 
          that focus on development, humanitarian assistance, and United Nations recruitment opportunities.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">3. Which websites are best for international NGO jobs?</h3>
        <p>
          Several trusted websites specialize in listing international NGO and development sector vacancies. Popular platforms include 
          ReliefWeb, Devex, Impactpool, Idealist, and UN job portals. These websites aggregate vacancies from international organizations, 
          UN agencies, and humanitarian NGOs operating around the world.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">4. Do international NGOs hire professionals from developing countries?</h3>
        <p>
          Yes, international NGOs recruit professionals from developing countries as well as from global talent pools. 
          Many organizations actively seek candidates with local knowledge, field experience, and technical expertise in areas 
          such as project management, monitoring and evaluation, supply chain management, and humanitarian coordination.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">5. What qualifications are required for international NGO jobs?</h3>
        <p>
          Most international NGO positions require a university degree in fields such as development studies, public health, 
          international relations, economics, engineering, or social sciences. In addition to academic qualifications, 
          organizations often prioritize candidates with relevant field experience, language skills, and demonstrated 
          commitment to humanitarian values.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">6. Are international NGO jobs competitive?</h3>
        <p>
          Yes, international NGO jobs can be highly competitive because they attract applicants from many countries. 
          Candidates who have strong professional experience, technical expertise, and international exposure 
          usually have a higher chance of being shortlisted for interviews.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">7. Do international NGOs offer remote work opportunities?</h3>
        <p>
          Some international NGOs offer remote or hybrid roles, particularly in areas such as research, policy analysis, 
          communications, information management, and digital program support. However, many humanitarian positions 
          still require field presence in project locations.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">8. What sectors do international NGOs work in?</h3>
        <p>
          International NGOs operate across many sectors including humanitarian response, food security, health systems, 
          education, climate change adaptation, refugee protection, and economic development. 
          Many organizations implement large-scale programs funded by governments and international donors.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">9. What is the difference between UN jobs and NGO jobs?</h3>
        <p>
          UN jobs are positions within United Nations agencies such as UNDP, UNICEF, or WFP, while NGO jobs 
          are roles within independent nonprofit organizations. Although both sectors work toward global development 
          and humanitarian goals, NGOs are typically more flexible and may operate projects funded by UN agencies or donor governments.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">10. What skills are important for international development careers?</h3>
        <p>
          Important skills for international development careers include project management, financial accountability, 
          monitoring and evaluation, supply chain management, stakeholder engagement, and strong communication abilities. 
          Many organizations also value leadership skills and experience working in multicultural environments.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">11. Are international NGO salaries competitive?</h3>
        <p>
          Salary levels vary widely depending on the organization, role, and duty station. 
          Senior technical and management positions often offer competitive salaries along with benefits 
          such as health insurance, travel allowances, housing support, and hardship allowances for challenging locations.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">12. How can I apply for international NGO jobs?</h3>
        <p>
          Candidates should apply directly through official career portals or trusted humanitarian job platforms. 
          Preparing a tailored CV and cover letter that highlights relevant experience, technical skills, 
          and measurable achievements can significantly increase the chances of being shortlisted.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">13. What experience is needed for international humanitarian jobs?</h3>
        <p>
          Many international humanitarian roles require previous field experience in development programs, 
          disaster response, refugee assistance, or community-based projects. Experience working with NGOs, 
          UN agencies, or donor-funded programs can greatly strengthen an applicant's profile.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">14. Can NGO work lead to international careers?</h3>
        <p>
          Yes, many professionals build international careers through NGO work. Starting with national positions 
          and gaining field experience often opens opportunities for regional or global roles within 
          humanitarian and development organizations.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-2">15. Why use international job portals for NGO careers?</h3>
        <p>
          International job portals simplify the job search process by aggregating vacancies from hundreds of NGOs, 
          development agencies, and humanitarian organizations worldwide. These platforms help professionals 
          quickly access verified job opportunities and stay informed about new openings in the global development sector.
        </p>
      </div>

    </div>
  </div>
</section>
    </div>

    <Footer />
  </>
);
}
export default Ingo;