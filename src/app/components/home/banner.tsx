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
          })}
        </script>
      </Helmet>
      {/* ================= HERO SECTION ================= */}
      <section className="max-w-screen-2xl container mx-auto px-4 md:px-20 mt-12">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-10 md:p-16 shadow-xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            CrossCareers
          </h1>
          <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800 max-w-3xl mx-auto">
            AI-Powered Career Hub: Jobs, Resumes, Interviews & Productivity Tools
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Modern career intelligence connecting professionals in Bangladesh with global
            opportunities, verified employers, and AI-driven tools for faster career growth.
          </p>
        </div>
      </section>

      {/* ================= CONTENT CARDS ================= */}
      <main className="max-w-screen-2xl container mx-auto px-4 md:px-20 mt-16 space-y-12">

        {/* Grid layout for first row of cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-bold text-gray-900">Jobs in Bangladesh & Global Markets</h3>
            <p className="mt-3 text-gray-700">
              Explore verified job opportunities across Bangladesh and international markets including private sector, development, remote, and cross-border roles.
            </p>
            <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-1">
              <li>Bangladesh Job Circulars</li>
              <li>International & Remote Jobs</li>
              <li>Freelance & Platform-Based Work</li>
            </ul>
          </section>

          <section className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-bold text-gray-900">NGO, UN & Embassy Career Portals</h3>
            <p className="mt-3 text-gray-700">
              Direct access to Bangladesh and global NGO, UN agency, and embassy career pages.
            </p>
            <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-1">
              <li>Bangladesh NGO Careers</li>
              <li>International NGO Vacancies</li>
              <li>UN & Embassy Jobs in Bangladesh</li>
            </ul>
          </section>
        </div>

        {/* Grid layout for second row of cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-bold text-gray-900">AI Career Tools for Job Success</h3>
            <p className="mt-3 text-gray-700">
              Smart AI tools designed for Bangladesh and global recruitment standards—optimize resumes, analyze jobs, and prepare for interviews with confidence.
            </p>
            <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-1">
              <li>ATS-Friendly Resume Builder</li>
              <li>Job Description & Resume Matching</li>
              <li>Cover Letter Generator</li>
              <li>Interview, Viva & Written Test Practice</li>
            </ul>
          </section>

          <section className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-bold text-gray-900">Professional Documents & Presentations</h3>
            <p className="mt-3 text-gray-700">
              Instantly create polished reports, official documents, and presentations for NGOs, corporates, donors, and international job applications.
            </p>
            <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-1">
              <li>Easily generate various academic and official reports</li>
              <li>Create AI-based PowerPoint presentations</li>
              <li>Match with current requirements</li>
              <li>Always make you ready for reporting and presentations</li>
            </ul>
          </section>
        </div>

      </main>
    </>
  );
};

export default Home;