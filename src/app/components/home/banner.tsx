import { FC, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";

const Home: FC = () => {
  return (
    <>
      {/* ================= SEO + SCHEMA ================= */}
      <Helmet>
        <title>
          Bangladesh & Global Jobs | NGO, UN Careers & AI Tools – CrossCareers
        </title>

        <meta
          name="description"
          content="AI-powered career hub for Bangladesh and global jobs, NGO & UN careers, resumes, interviews, productivity and professional document tools."
        />

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CrossCareers",
            url: "https://crosscareers.com",
            description:
              "AI-powered career hub offering Bangladesh and global jobs, NGO and UN careers, and smart career tools.",
          })}
        </script>

        {/* Website Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "CrossCareers",
            url: "https://crosscareers.com",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://crosscareers.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>
      {/* ================= HERO SECTION ================= */}
      <section className="max-w-screen-2xl container mx-auto px-4 md:px-20 mt-12">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 md:p-14 shadow-lg text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            CrossCareers
          </h1>
          <h2 className="mt-3 text-xl md:text-2xl font-semibold text-gray-800 max-w-3xl mx-auto">
            AI-Powered Career Hub: Jobs, Resumes, Interviews & Productivity Tools
          </h2>
          <p className="mt-5 text-lg text-gray-700 max-w-3xl mx-auto">
            A modern career intelligence platform connecting professionals in
            Bangladesh with global opportunities, verified employers, and
            AI-driven tools for faster career growth.
          </p>
        </div>
      </section>

      {/* ================= CONTENT SECTIONS ================= */}
      <main className="max-w-screen-2xl container mx-auto px-4 md:px-20 mt-12 grid gap-8">

        {/* Grid layout for two side-by-side cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Section 1 */}
          <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-gray-900">
              Jobs in Bangladesh & Global Markets
            </h3>
            <p className="mt-3 text-gray-700">
              Discover verified job opportunities across Bangladesh and
              international markets, including private sector, development,
              remote, and cross-border roles.
            </p>
            <ul className="mt-4 list-disc pl-6 text-gray-700">
              <li>Bangladesh Job Circulars</li>
              <li>International & Remote Jobs</li>
              <li>Freelance & Platform-Based Work</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-gray-900">
              NGO, UN & Embassy Career Portals
            </h3>
            <p className="mt-3 text-gray-700">
              Direct access to Bangladesh and global NGO, UN agency, and embassy
              career pages—no middlemen, no unreliable listings.
            </p>
            <ul className="mt-4 list-disc pl-6 text-gray-700">
              <li>Bangladesh NGO Careers</li>
              <li>International NGO Vacancies</li>
              <li>UN & Embassy Jobs in Bangladesh</li>
            </ul>
          </section>
        </div>

        {/* Grid layout for next two side-by-side cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Section 3 */}
          <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-gray-900">
              AI Career Tools for Job Success
            </h3>
            <p className="mt-3 text-gray-700">
              Smart AI tools designed for Bangladesh and global recruitment
              standards—optimize resumes, analyze jobs, and prepare for interviews
              with confidence.
            </p>
            <ul className="mt-4 list-disc pl-6 text-gray-700">
              <li>ATS-Friendly Resume Builder</li>
              <li>Job Description & Resume Matching</li>
              <li>Cover Letter Generator</li>
              <li>Interview, Viva & Written Test Practice</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-gray-900">
              Professional Documents & Presentations
            </h3>
            <p className="mt-3 text-gray-700">
              Create polished reports, official documents, and presentations for
              NGOs, corporates, donors, and international job applications—within
              minutes.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
