/* eslint-disable no-unused-vars */
import React, { FC, useMemo } from "react";
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { blogPosts} from './blogs/blogdata'; // adjust path if needed

interface UNAgency {
  name: string;
  url: string;
  category: string;
}

type AgenciesByCategory = Record<string, UNAgency[]>;

// Get 6 most recent blog posts (sorted by date descending)
const relevantCategories = ['Career Guide', 'UN Jobs Guide', 'Resume / CV'];
const relatedArticles = blogPosts
  .filter(post => relevantCategories.includes(post.category))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 6);

const UnitedNationsCareers: FC = () => {
  const unAgencies: readonly UNAgency[] = [
    {
      name: "UN - Food and Agriculture Organization (FAO)",
      url: "https://jobs.fao.org/careersection/fao_external/jobsearch.ftl?lang=en",
      category: "Food & Agriculture",
    },
    {
      name: "International Fund for Agricultural Development (IFAD)",
      url: "https://www.ifad.org/en/work-with-us",
      category: "Food & Agriculture",
    },
    {
      name: "International Labour Organization (ILO)",
      url: "https://jobs.ilo.org/go/All-Jobs/2842101/",
      category: "Labor Rights",
    },
    {
      name: "International Organization for Migration (IOM)",
      url: "https://bangladesh.iom.int/careers",
      category: "Migration",
    },
    {
      name: "UN Women",
      url: "https://asiapacific.unwomen.org/en/about-us/jobs",
      category: "Gender Equality",
    },
    {
      name: "UN-AIDS",
      url: "https://www.unaids.org/en/vacanciesandtenders/vacancies",
      category: "Health",
    },
    {
      name: "UN Capital Development Fund",
      url: "https://www.uncdf.org/employment",
      category: "Development",
    },
    {
      name: "UN Development Programme (UNDP)",
      url: "https://www.undp.org/bangladesh/careers",
      category: "Development",
    },
    {
      name: "UNESCO",
      url: "https://careers.unesco.org/",
      category: "Education & Culture",
    },
    {
      name: "United Nations Population Fund (UNFPA)",
      url: "https://www.unfpa.org/jobs",
      category: "Population",
    },
    {
      name: "UN High Commissioner for Refugees (UNHCR)",
      url: "https://www.unhcr.org/careers-unhcr",
      category: "Refugees",
    },
    {
      name: "UNICEF",
      url: "https://jobs.unicef.org/en-us/listing/",
      category: "Children",
    },
    {
      name: "UNIDO",
      url: "https://careers.unido.org/search/",
      category: "Industrial Development",
    },
    {
      name: "UNODC",
      url: "https://www.unodc.org/un/en/about-unodc/employment-opportunities.html",
      category: "Drugs & Crime",
    },
    {
      name: "UN Office for Project Services (UNOPS)",
      url: "https://jobs.unops.org/",
      category: "Project Management",
    },
    {
      name: "UN World Food Programme",
      url: "https://www.wfp.org/careers",
      category: "Food Assistance",
    },
    {
      name: "UN World Health Organization",
      url: "https://www.who.int/careers",
      category: "Health",
    },
    {
      name: "World Bank Group",
      url: "https://www.worldbank.org/en/about/careers",
      category: "Development Finance",
    },
    {
      name: "UN World Trade Organization",
      url: "https://www.wto.org/english/thewto_e/vacan_e/career_e.htm",
      category: "Trade",
    },
    {
      name: "International Court of Justice",
      url: "https://www.icj-cij.org/current-vacancies",
      category: "Justice",
    },
    {
      name: "International Maritime Organization",
      url: "https://www.imo.org/en/About/careers/vacancies",
      category: "Maritime",
    },
    {
      name: "International Seabed Authority",
      url: "https://www.isa.org.jm/career-opportunities/",
      category: "Maritime",
    },
    {
      name: "International Telecommunication Union (ITU)",
      url: "https://jobs.itu.int/",
      category: "Technology",
    },
    {
      name: "Pan American Health Organization (PAHO)",
      url: "https://www.paho.org/en/careers-paho",
      category: "Health",
    },
    {
      name: "UN Environment Programme (UNEP)",
      url: "https://www.unep.org/jobs",
      category: "Environment",
    },
    {
      name: "UN Human Settlements Programme (UN-HABITAT)",
      url: "https://unhabitat.org/join-us",
      category: "Urban Development",
    },
    {
      name: "UN Volunteer (UNV)",
      url: "https://www.unv.org/become-volunteer",
      category: "Volunteering",
    },
  ];

  const agenciesByCategory: AgenciesByCategory = useMemo(() => {
    return unAgencies.reduce<AgenciesByCategory>((acc, agency) => {
      (acc[agency.category] ??= []).push(agency);
      return acc;
    }, {});
  }, []);

  const formatDateForSEO = (dateString: string) => {
    const date = new Date(dateString);
    return {
      iso: date.toISOString().split("T")[0],
      display: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  // Generate structured data for all agencies
  const generateAgenciesStructuredData = () => {
    const agenciesList = unAgencies.map(agency => ({
      "@type": "Organization",
      "name": agency.name,
      "url": agency.url,
      "description": `Official career portal for ${agency.name} - ${agency.category} opportunities`,
      "category": agency.category,
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "United Nations Agencies Career Portals",
      "description": "Comprehensive list of official UN agency career websites and job portals",
      "numberOfItems": unAgencies.length,
      "itemListElement": agenciesList.map((agency, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": agency,
      })),
    };
  };

  // Generate breadcrumb structured data
  const generateBreadcrumbStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://crosscareers.com/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "United Nations Careers",
        "item": "https://crosscareers.com/united-nation-jobs-bangladesh",
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Helmet>
        {/* Primary Title Tag with Keywords */}
        <title>
          United Nations Jobs 2026 | UN Careers & International Organizations | CrossCareers
        </title>

        {/* Meta Description with Rich Snippet */}
        <meta
          name="description"
          content="Explore official United Nations career opportunities 2026 across UNDP, UNICEF, WHO, FAO, UNHCR, and 25+ UN agencies. Apply for international jobs, humanitarian careers, and development positions worldwide."
        />

        {/* Comprehensive Keywords */}
        <meta
          name="keywords"
          content="UN jobs 2026, United Nations careers, UNDP jobs, UNICEF careers, WHO jobs, FAO jobs, UNHCR careers, international organization jobs, humanitarian jobs, UN development programme, UN career portal, UN jobs Bangladesh, UN jobs Asia, UN jobs remote, UN internships, UN volunteer, YPP 2026, UN recruitment, international development jobs, NGO careers, global jobs 2026"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://crosscareers.com/united-nation-jobs-bangladesh" />

        {/* Alternate Language Versions */}
        <link rel="alternate" href="https://crosscareers.com/united-nation-jobs-bangladesh" hrefLang="en" />
        <link rel="alternate" href="https://crosscareers.com/united-nation-jobs-bangladesh" hrefLang="x-default" />

        {/* Robots Meta Tag */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />

        {/* Author and Publisher */}
        <meta name="author" content="CrossCareers" />
        <meta name="publisher" content="CrossCareers" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="United Nations Jobs 2026 | UN Careers & International Organizations" />
        <meta property="og:description" content="Browse official UN job openings across 25+ UN agencies including UNDP, UNICEF, WHO, FAO, UNHCR, and more. Start your international career today." />
        <meta property="og:url" content="https://crosscareers.com/united-nation-jobs-bangladesh" />
        <meta property="og:site_name" content="CrossCareers" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="United Nations Careers 2026 - Global Job Opportunities" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CrossCareersBD" />
        <meta name="twitter:creator" content="@CrossCareersBD" />
        <meta name="twitter:title" content="United Nations Jobs 2026 | UN Careers & International Organizations" />
        <meta name="twitter:description" content="Explore official UN career opportunities across 25+ agencies. Find jobs with UNDP, UNICEF, WHO, FAO, UNHCR, and more. Apply now for 2026 positions." />
        <meta name="twitter:image:alt" content="United Nations Careers 2026" />

        {/* Geo Tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.position" content="40.7128;-74.0060" />
        <meta name="ICBM" content="40.7128, -74.0060" />

        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#0B2B5E" />

        {/* Organization Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CrossCareers",
            "url": "https://crosscareers.com/",
            "logo": "https://crosscareers.com/logo/favcon.png",
            "description": "AI-powered career hub offering curated international job portals and verified global career opportunities in humanitarian, UN, NGO, aid, and development sectors worldwide.",
            "sameAs": [
              "https://www.facebook.com/profile.php?id=61574918625249",
              "https://x.com/crosscareer",
              "https://www.linkedin.com/company/crosscareers",
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US",
            },
          })}
        </script>

        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbStructuredData())}
        </script>

        {/* WebPage Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "United Nations Jobs 2026 | UN Careers & International Organizations",
            "description": "Complete guide to United Nations careers with official job portals for all UN agencies including UNDP, UNICEF, WHO, FAO, and UNHCR.",
            "url": "https://crosscareers.com/united-nation-jobs-bangladesh",
            "inLanguage": "en-US",
            "datePublished": "2026-01-01",
            "dateModified": new Date().toISOString().split("T")[0],
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": unAgencies.map((agency, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "name": agency.name,
                "url": agency.url,
              })),
            },
          })}
        </script>

        {/* FAQ Structured Data - Enhanced */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I apply for United Nations jobs in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To apply for UN jobs in 2026, you must submit applications through official UN agency career portals. Key platforms include UNDP jobs portal, UNICEF careers, WHO recruitment, FAO jobs, UNHCR careers, and the main UN Careers portal (careers.un.org). Each agency has its own application system and requirements.",
                },
              },
              {
                "@type": "Question",
                "name": "What qualifications are required for UN jobs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UN positions typically require a university degree (Bachelor's or Master's) in relevant fields, professional work experience (2-7 years depending on level), strong English proficiency, and often additional UN languages like French, Spanish, or Arabic. International experience and specialized skills in development, humanitarian work, or policy are highly valued.",
                },
              },
              {
                "@type": "Question",
                "name": "Are there entry-level UN jobs for fresh graduates?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, entry-level opportunities include the UN Young Professionals Programme (YPP), UN Internships, UN Volunteers (UNV), and Junior Professional Officer (JPO) programmes. These pathways provide excellent entry points for fresh graduates and early-career professionals to start their UN careers.",
                },
              },
              {
                "@type": "Question",
                "name": "What is the UN Young Professionals Programme (YPP) 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The UN Young Professionals Programme (YPP) is a recruitment initiative for talented early-career professionals to start a career with the United Nations. The 2026 YPP application typically opens in mid-2026. Candidates must have a first-level university degree, be under 32 years old, and be a citizen of participating countries.",
                },
              },
              {
                "@type": "Question",
                "name": "Do UN jobs offer remote work options?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "While most UN positions are location-based at headquarters or field offices, some roles offer remote or hybrid work arrangements, particularly in areas like research, communications, data analysis, and consultancy positions. Remote opportunities have increased since 2020 and continue to be available for certain roles.",
                },
              },
              {
                "@type": "Question",
                "name": "What is the average UN salary and benefits?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UN salaries are competitive and tax-exempt, ranging from $37,000 to over $200,000 annually depending on grade and experience. Benefits include health insurance, pension, education grants for dependents, housing allowance, and home leave travel. The salary scale is standardized across UN agencies based on duty station classification.",
                },
              },
              {
                "@type": "Question",
                "name": "How long does UN recruitment take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UN recruitment typically takes 3 to 9 months from application to offer. The process includes initial screening, written assessments, competency-based interviews, reference checks, and final approval. Candidates are advised to be patient and apply to multiple opportunities across different UN agencies.",
                },
              },
              {
                "@type": "Question",
                "name": "Which UN agency has the most job opportunities?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UNDP, UNICEF, WHO, WFP, and UNHCR typically have the highest number of job openings. The UN Secretariat also regularly recruits through the UN Careers portal. Job availability varies by duty station, funding, and organizational needs throughout the year.",
                },
              },
            ],
          })}
        </script>

        {/* Job Posting Structured Data for Agencies */}
        <script type="application/ld+json">
          {JSON.stringify(generateAgenciesStructuredData())}
        </script>
      </Helmet>
      <Navbar />
      {/* Hero Section - Fixed to match your style */}
<div className="relative bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-700 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
  <div className="max-w-7xl mx-auto text-center relative">
    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
      <span className="text-sm font-semibold text-white">Global Opportunities 2026</span>
    </div>

    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans tracking-tight">
      United Nations Careers Hub
    </h1>

    <p className="mt-6 text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
      Discover global opportunities with United Nations agencies and international organizations. Browse by category to find your next career move.
    </p>

    <div className="mt-8 -mb-4">
      <a
        href="#agencies"
        className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-lg font-semibold rounded-full text-white bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        Explore UN Agencies
      </a>
    </div>
  </div>
</div>

      {/* Main Content */}
      <main className="bg-gray-50 flex-grow ">
        <div className="container mx-auto px-6 py-16" id="agencies">
          {/* Agency Sections */}
          {Object.entries(agenciesByCategory).map(([category, agencies]) => (
            <section key={category} className="mb-16 ml-36 last:mb-0" aria-label={`${category} Agencies Section`}>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-1 bg-blue-600 rounded-full" aria-hidden="true"></div>
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                  {category}
                </h2>
              </div>

              <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {agencies.map(({ name, url }) => (
                  <article
                    key={name}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 hover:border-blue-300"
                    aria-label={`${name} career portal`}
                  >
                    <div className="p-6 flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
                        {name}
                      </h3>
                      <div className="h-px w-12 bg-blue-500 group-hover:w-24 transition-all duration-300 mb-4"></div>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        Official Career Portal
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 group-hover:shadow-md"
                        aria-label={`View job opportunities at ${name}`}
                      >
                        View Opportunities
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <section className="bg-gray-50 py-10 lg:py-6 -mt-8 ">
              <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Related Career Articles
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Boost your job search with expert advice from our blog.
                  </p>
                </div>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  {relatedArticles.map(article => (
                    <Link
                      key={article.id}
                      to={`/career-guide/${article.slug}`}
                      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {article.category}
                          </span>
                          <time dateTime={article.date}>
                            {formatDateForSEO(article.date).display}
                          </time>
                        </div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* FAQ Section */}
          <section className="mt-24" id="faq" aria-label="Frequently Asked Questions">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Frequently Asked <span className="text-blue-600">Questions</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about building a career with the United Nations.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-5">
              {[
                {
                  q: "How do I apply for United Nations jobs in 2026?",
                  a: "Applications must be submitted through official UN agency websites or the UN Careers portal (careers.un.org). Each agency has its own recruitment system, so ensure you create a profile and follow specific application instructions. Key portals include UNDP jobs, UNICEF careers, WHO recruitment, FAO jobs, and UNHCR careers.",
                },
                {
                  q: "What degree is needed for UN jobs?",
                  a: "Most professional roles require at least a bachelor's degree in a relevant field. For specialized positions (e.g., policy, economics, public health), a master's degree is often preferred or required. Advanced degrees can significantly enhance your competitiveness.",
                },
                {
                  q: "Are UN jobs competitive?",
                  a: "Yes, UN positions are highly competitive with acceptance rates often below 1% for some roles. A strong educational background, relevant work experience (typically 2-7 years), language skills, and international exposure significantly enhance your application chances.",
                },
                {
                  q: "Can fresh graduates apply for UN jobs?",
                  a: "Fresh graduates can apply for internships, volunteer programs (UNV), or the Young Professionals Programme (YPP). These pathways offer excellent entry points to gain experience and build a network. Many UN professionals start their careers through these programmes.",
                },
                {
                  q: "Do UN jobs pay well?",
                  a: "UN salaries are competitive and tax-exempt, with P-2 level starting around $50,000-$65,000 annually and senior positions exceeding $150,000. Benefits include comprehensive health insurance, pension contributions, education grants for dependents, housing allowance, and home leave travel.",
                },
                {
                  q: "Is experience in NGOs helpful?",
                  a: "Absolutely. Experience in NGOs, humanitarian organizations, or international development strengthens your application and demonstrates practical field experience and commitment to the UN's mission. Field experience is particularly valuable for operations and program roles.",
                },
                {
                  q: "Are UN jobs remote?",
                  a: "Some UN positions offer remote or hybrid options, but the majority are location-based at headquarters (New York, Geneva, Vienna, Nairobi), regional offices, or field duty stations. Remote opportunities are more common in consultancy roles, research positions, and technical support functions.",
                },
                {
                  q: "What languages are required?",
                  a: "English is mandatory for most roles. Proficiency in French, Spanish, Arabic, Russian, or Chinese is highly advantageous and often required for certain duty stations or international posts. Bilingual candidates have a significant competitive advantage.",
                },
                {
                  q: "How long does UN recruitment take?",
                  a: "Recruitment can take 3 to 9 months from application to offer. The process includes initial screening, written assessments, competency-based interviews, reference checks, and final approval. Patience is key, and staying engaged with the agency's updates is recommended.",
                },
                {
                  q: "Are there volunteer opportunities?",
                  a: "Yes, the UN Volunteer (UNV) programme offers global volunteer opportunities, both online and on-site. It's an excellent way to gain hands-on experience and contribute to UN projects worldwide. Over 8,000 UN Volunteers serve annually in more than 50 countries.",
                },
              ].map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
                >
                  <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-800 list-none">
                    <span className="text-lg">{faq.q}</span>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform duration-300">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-600 border-t border-gray-100">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UnitedNationsCareers;