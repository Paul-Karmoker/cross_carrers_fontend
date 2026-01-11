/* eslint-disable no-unused-vars */
import React, { FC, useMemo } from "react";
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";

/* =======================
   Types & Interfaces
======================= */

interface UNAgency {
  name: string;
  url: string;
  category: string;
}

type AgenciesByCategory = Record<string, UNAgency[]>;

/* =======================
   Component
======================= */

const UnitedNationsCareers: FC = () => {
  /* =======================
     Static Data
  ======================= */

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
    { name: "International Training Centre of the ILO", url: "https://www.itcilo.org/about/jobs", category: "Training" },
    { name: "International Telecommunication Union (ITU)", url: "https://jobs.itu.int/", category: "Technology" },
    { name: "Pan American Health Organization (PAHO)", url: "https://www.paho.org/en/careers-paho", category: "Health" },
    { name: "UN DGACM", url: "https://www.un.org/dgacm/en/content/careers", category: "Administration" },
    { name: "UN Department of Safety and Security (UNDSS)", url: "https://www.un.org/safety-and-security/en/join-us/careers", category: "Security" },
    { name: "UN International Computing Centre", url: "https://www.unicc.org/join-us/careers/", category: "Technology" },
    { name: "UN Institute for Training and Research (UNITAR)", url: "https://unitar.org/vacancy-announcements", category: "Training" },
    { name: "World Intellectual Property Organization (UNWIPO)", url: "https://www.wipo.int/jobs/en/", category: "Intellectual Property" },
    { name: "UN OCHA", url: "https://careers.un.org/home?language=en", category: "Humanitarian" },
    { name: "UN OHCHR", url: "https://www.ohchr.org/en/work-with-us", category: "Human Rights" },
    { name: "Office Of Internal Oversight Services", url: "https://oios.un.org/jobs", category: "Oversight" },
    { name: "UN Environment Programme (UNEP)", url: "https://www.unep.org/jobs", category: "Environment" },
    { name: "UN Human Settlements Programme (UN-HABITAT)", url: "https://unhabitat.org/join-us", category: "Urban Development" },
    { name: "Office for Disaster Risk Reduction (UNISDR)", url: "https://www.undrr.org/about-undrr/work-us", category: "Disaster Relief" },
    { name: "UN Volunteer (UNV)", url: "https://www.unv.org/become-volunteer", category: "Volunteering" },
    { name: "UNRCCA", url: "https://unrcca.unmissions.org/vacancies", category: "Regional" },
    { name: "UN Sustainable Development Group (UNSDG)", url: "https://unsdg.un.org/jobs", category: "Development" },
  ];

  /* =======================
     Memoized Grouping
  ======================= */

  const agenciesByCategory: AgenciesByCategory = useMemo(() => {
    return unAgencies.reduce<AgenciesByCategory>((acc, agency) => {
      (acc[agency.category] ??= []).push(agency);
      return acc;
    }, {});
  }, [unAgencies]);

  /* =======================
     Render
  ======================= */

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-600 py-14 text-white mt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            United Nations Career Opportunities
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Discover global career opportunities across UN agencies and affiliated organizations
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-4 py-14">
        {Object.entries(agenciesByCategory).map(([category, agencies]) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-blue-300 pb-2">
              {category}
            </h2>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {agencies.map(({ name, url }) => (
                <article
                  key={name}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {name}
                    </h3>

                    <div className="mt-auto">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Visit Career Site
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* Resources */}
        <section className="mt-20 bg-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            UN Career Resources
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">UN Careers Portal</h3>
              <p className="text-gray-600 mb-4">
                Central recruitment platform for UN Secretariat positions.
              </p>
              <a
                href="https://careers.un.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                Visit careers.un.org →
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                Young Professionals Programme
              </h3>
              <p className="text-gray-600 mb-4">
                Entry-level recruitment pathway for future UN leaders.
              </p>
              <a
                href="https://careers.un.org/ypp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                Learn about YPP →
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default UnitedNationsCareers;
