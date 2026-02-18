/* eslint-disable no-unused-vars */
import React, { FC, useMemo } from "react";
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";
import { Helmet } from "react-helmet-async";

interface UNAgency {
  name: string;
  url: string;
  category: string;
}

type AgenciesByCategory = Record<string, UNAgency[]>;

const UnitedNationsCareers: FC = () => {

  const unAgencies: readonly UNAgency[] = [
    { name: "UN - Food and Agriculture Organization (FAO)", url: "https://jobs.fao.org/careersection/fao_external/jobsearch.ftl?lang=en", category: "Food & Agriculture" },
    { name: "International Fund for Agricultural Development (IFAD)", url: "https://www.ifad.org/en/work-with-us", category: "Food & Agriculture" },
    { name: "International Labour Organization (ILO)", url: "https://jobs.ilo.org/go/All-Jobs/2842101/", category: "Labor Rights" },
    { name: "International Organization for Migration (IOM)", url: "https://bangladesh.iom.int/careers", category: "Migration" },
    { name: "UN Women", url: "https://asiapacific.unwomen.org/en/about-us/jobs", category: "Gender Equality" },
    { name: "UN-AIDS", url: "https://www.unaids.org/en/vacanciesandtenders/vacancies", category: "Health" },
    { name: "UN Capital Development Fund", url: "https://www.uncdf.org/employment", category: "Development" },
    { name: "UN Development Programme (UNDP)", url: "https://www.undp.org/bangladesh/careers", category: "Development" },
    { name: "UNESCO", url: "https://careers.unesco.org/", category: "Education & Culture" },
    { name: "United Nations Population Fund (UNFPA)", url: "https://www.unfpa.org/jobs", category: "Population" },
    { name: "UN High Commissioner for Refugees (UNHCR)", url: "https://www.unhcr.org/careers-unhcr", category: "Refugees" },
    { name: "UNICEF", url: "https://jobs.unicef.org/en-us/listing/", category: "Children" },
    { name: "UNIDO", url: "https://careers.unido.org/search/", category: "Industrial Development" },
    { name: "UNODC", url: "https://www.unodc.org/unodc/en/about-unodc/employment-opportunities.html", category: "Drugs & Crime" },
    { name: "UN Office for Project Services (UNOPS)", url: "https://jobs.unops.org/", category: "Project Management" },
    { name: "UN World Food Programme", url: "https://www.wfp.org/careers", category: "Food Assistance" },
    { name: "UN World Health Organization", url: "https://www.who.int/careers", category: "Health" },
    { name: "World Bank Group", url: "https://www.worldbank.org/en/about/careers", category: "Development Finance" },
    { name: "UN World Trade Organization", url: "https://www.wto.org/english/thewto_e/vacan_e/career_e.htm", category: "Trade" },
    { name: "International Court of Justice", url: "https://www.icj-cij.org/current-vacancies", category: "Justice" },
    { name: "International Maritime Organization", url: "https://www.imo.org/en/About/careers/vacancies", category: "Maritime" },
    { name: "International Seabed Authority", url: "https://www.isa.org.jm/career-opportunities/", category: "Maritime" },
    { name: "International Telecommunication Union (ITU)", url: "https://jobs.itu.int/", category: "Technology" },
    { name: "Pan American Health Organization (PAHO)", url: "https://www.paho.org/en/careers-paho", category: "Health" },
    { name: "UN Environment Programme (UNEP)", url: "https://www.unep.org/jobs", category: "Environment" },
    { name: "UN Human Settlements Programme (UN-HABITAT)", url: "https://unhabitat.org/join-us", category: "Urban Development" },
    { name: "UN Volunteer (UNV)", url: "https://www.unv.org/become-volunteer", category: "Volunteering" }
  ];

  const agenciesByCategory: AgenciesByCategory = useMemo(() => {
    return unAgencies.reduce<AgenciesByCategory>((acc, agency) => {
      (acc[agency.category] ??= []).push(agency);
      return acc;
    }, {});
  }, []);

  return (
    <>
      <Helmet>
        <title>United Nations Jobs 2025 | UN Careers & International Organizations</title>
        <meta name="description" content="Explore official United Nations career opportunities across UNDP, UNICEF, WHO, FAO, UNHCR and other global organizations. Apply for UN jobs worldwide." />
        <meta name="keywords" content="UN jobs 2025, United Nations careers, UNDP jobs, UNICEF careers, WHO jobs, international organization jobs, humanitarian jobs" />
        <link rel="canonical" href="https://crosscareers.com/un" />

        {/* Open Graph */}
        <meta property="og:title" content="United Nations Jobs 2025 | UN Careers" />
        <meta property="og:description" content="Browse official UN job openings across major UN agencies and global organizations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://crosscareers.com/un" />

        {/* FAQ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I apply for United Nations jobs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can apply directly through official UN agency career portals such as UNDP, UNICEF, WHO, and careers.un.org."
                }
              },
              {
                "@type": "Question",
                "name": "What qualifications are required for UN jobs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most UN positions require a university degree, relevant professional experience, and strong English skills. Some roles require additional UN languages."
                }
              },
              {
                "@type": "Question",
                "name": "Are there entry-level jobs in the UN?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, entry-level positions are available through internships, UN Volunteers, and the Young Professionals Programme (YPP)."
                }
              },
              {
                "@type": "Question",
                "name": "Do UN jobs require international relocation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Many UN roles are international, but some positions are country-based and do not require relocation."
                }
              },
              {
                "@type": "Question",
                "name": "Is work experience mandatory for UN careers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, most professional roles require relevant work experience, though internships and volunteer roles may have flexible requirements."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <Navbar />

      <section className="bg-gradient-to-r from-blue-900 to-blue-600 py-14 text-white mt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            United Nations Career Opportunities
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Discover global career opportunities across UN agencies and affiliated organizations.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-14">

        {Object.entries(agenciesByCategory).map(([category, agencies]) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-blue-300 pb-2">
              {category}
            </h2>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {agencies.map(({ name, url }) => (
                <article key={name} className="bg-white border p-6 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {name}
                  </h3>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-block text-center py-2 text-sm font-medium text-white bg-blue-600"
                  >
                    Visit Career Site
                  </a>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* FAQ Section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Frequently Asked Questions About UN Careers
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">1. How do I apply for United Nations jobs?</h3>
              <p className="text-gray-600">Applications must be submitted through official UN agency websites or the UN Careers portal.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">2. What degree is needed for UN jobs?</h3>
              <p className="text-gray-600">Most professional roles require at least a bachelor's or master's degree in a relevant field.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">3. Are UN jobs competitive?</h3>
              <p className="text-gray-600">Yes, UN positions are highly competitive due to global demand and limited openings.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">4. Can fresh graduates apply for UN jobs?</h3>
              <p className="text-gray-600">Fresh graduates can apply for internships, volunteer programs, or YPP opportunities.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">5. Do UN jobs pay well?</h3>
              <p className="text-gray-600">UN salaries are competitive and often tax-free, with additional benefits depending on duty station.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">6. Is experience in NGOs helpful?</h3>
              <p className="text-gray-600">Yes, NGO and humanitarian experience strengthens UN job applications.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">7. Are UN jobs remote?</h3>
              <p className="text-gray-600">Some UN positions offer remote or hybrid options, but most are location-based.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">8. What languages are required?</h3>
              <p className="text-gray-600">English is mandatory for most roles. Knowledge of French, Spanish, or Arabic is advantageous.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">9. How long does UN recruitment take?</h3>
              <p className="text-gray-600">Recruitment can take several weeks to months depending on the agency.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">10. Are there volunteer opportunities?</h3>
              <p className="text-gray-600">Yes, the UN Volunteer (UNV) programme provides global volunteer opportunities.</p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default UnitedNationsCareers;
