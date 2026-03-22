import React from "react";
import { Link } from 'react-router-dom';
import { blogPosts, BlogPost } from '../../Others/blogs/blogdata/blogdata01';

const formatDateForSEO = (dateString: string) => {
  const date = new Date(dateString);
  return {
    iso: date.toISOString().split('T')[0],
    display: date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };
};

const relevantCategories = ['Career Guide', 'AI (Artificial Intelligence)', 'Interview Support', 'Resume / CV','Freelance & Remote'];
const relatedArticles = blogPosts
  .filter(post => relevantCategories.includes(post.category))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 6);

const SeoHomepageGuide = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 text-gray-800 leading-relaxed">

      {/* BONUS SEO H1 (Hidden but readable by Google) */}
      <h1 className="sr-only">
        NGO Jobs Bangladesh | UN Jobs | International Careers | AI Resume Builder | Career Tools
      </h1>

      {/* Visible Heading */}
      <h2 className="text-4xl font-bold mb-6">
        One Platform for Jobs, Career Preparation, and AI-Powered Professional Tools
      </h2>

      <p className="text-lg mb-10">
        CrossCareers is designed to help job seekers easily discover career
        opportunities and prepare professionally for recruitment processes.
        Instead of searching across many different websites, users can access
        job portals, career preparation tools, resume builders, and interview
        preparation systems in one place. The platform focuses on opportunities
        within Bangladesh as well as international careers including NGOs,
        INGOs, donor organizations, embassies, and United Nations agencies.
      </p>

      {/* NAVIGATION INTRO */}
      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          What You Can Find in the CrossCareers Navigation Bar
        </h2>

        <p className="mb-4">
          From the <strong>Navigation Bar</strong>, users can easily access
          multiple career development tools and job discovery resources.
          Each section is designed to help professionals find opportunities,
          build strong applications, and prepare for recruitment processes
          using AI-powered career tools.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          Jobs Here – Direct Access to Career Websites
        </h2>

        <p className="mb-4">
          The <strong>Jobs Here</strong> section helps users quickly navigate
          to the official career pages of the most important job platforms
          and organizations. Instead of manually searching multiple websites,
          users can simply click a link and immediately reach the career page
          of the relevant organization.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Job Categories Available
        </h3>

        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Bangladesh Jobs</strong> – Access major job portals such as
            Bdjobs and other leading Bangladeshi recruitment platforms.
          </li>

          <li>
            <strong>International Jobs</strong> – Global job platforms for
            international development, humanitarian, and professional careers.
          </li>

          <li>
            <strong>NGO Jobs</strong> – Career pages of local NGOs operating
            across Bangladesh in different development sectors.
          </li>

          <li>
            <strong>INGO Jobs</strong> – International NGOs working in
            humanitarian response and development programs worldwide.
          </li>

          <li>
            <strong>Freelance Jobs</strong> – Direct access to top freelance
            marketplaces where professionals can offer services and work
            independently.
          </li>

          <li>
            <strong>Remote Jobs</strong> – Global companies offering
            location-independent employment opportunities.
          </li>

          <li>
            <strong>Embassy Jobs</strong> – Career opportunities from foreign
            embassies and diplomatic missions operating in Bangladesh.
          </li>

          <li>
            <strong>Donor Jobs</strong> – Development partners and donor
            organizations supporting humanitarian and development programs.
          </li>

          <li>
            <strong>United Nations Jobs</strong> – Career portals of UN
            agencies such as UNDP, UNICEF, WFP, FAO, and other organizations
            working in Bangladesh and internationally.
          </li>
        </ul>
      </div>

      {/* RESUME KIT */}
      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Resume Kit – AI Resume and Cover Letter Builder
        </h2>

        <p className="mb-4">
          The <strong>Resume Kit</strong> section allows users to create
          professional resumes and cover letters using artificial intelligence.
          Modern recruitment systems often use Applicant Tracking Systems
          (ATS) to filter applications, so resumes generated here are
          optimized for ATS compatibility and professional formatting.
        </p>

        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>AI Resume Builder</strong> – Generate structured resumes
            with professional formatting and ATS-friendly structure.
          </li>

          <li>
            <strong>AI Cover Letter Generator</strong> – Upload your resume
            and job advertisement to generate a customized cover letter
            instantly.
          </li>
        </ul>
      </div>

      {/* MATCH & INSIGHT */}
      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Match & Insight – Job Compatibility Analysis
        </h2>

        <p>
          The <strong>Match & Insight</strong> feature helps candidates
          understand how well their experience and qualifications match
          a specific job advertisement. Users can upload their resume
          and paste the job description. The AI system analyzes both
          documents and provides insights that help candidates improve
          their applications and increase the chances of getting
          shortlisted.
        </p>
      </div>

      {/* CANDIDATE KIT */}
      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Candidate Kit – Preparation for Recruitment Processes
        </h2>

        <p className="mb-4">
          Recruitment processes often include written tests and interviews.
          The <strong>Candidate Kit</strong> section helps job seekers prepare
          effectively using AI-powered career preparation tools.
        </p>

        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Training Resources</strong> – Access renowned global
            training platforms to improve professional skills and career
            development.
          </li>

          <li>
            <strong>Written Test Practice</strong> – Upload a job description
            and automatically generate written test practice questions.
          </li>

          <li>
            <strong>Interview Practice</strong> – Simulate real interview
            sessions based on job requirements.
          </li>

          <li>
            <strong>Interview Questions</strong> – Generate potential
            interview questions with suggested answers using AI.
          </li>
        </ul>
      </div>

      {/* SERVICE KIT */}
      <div className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Service Kit – AI Tools for Professional Work
        </h2>

        <p className="mb-4">
          The <strong>Service Kit</strong> section provides AI-powered tools
          that help professionals create presentations, reports, and
          professional documents quickly and efficiently.
        </p>

        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>AI PPT Generator</strong> – Create professional
            PowerPoint presentations using simple prompts.
          </li>

          <li>
            <strong>AI Document Generator</strong> – Generate reports,
            structured documents, and written content with AI support.
          </li>
        </ul>
      </div>

      {/* SEO Keyword Block */}
      <div className="border-t pt-8 text-sm text-gray-600">
        <p>
          Popular searches related to this platform include NGO Jobs Bangladesh,
          INGO Jobs Bangladesh, United Nations Jobs Bangladesh, International
          Development Careers, Humanitarian Jobs, Remote Jobs Platforms,
          Freelance Job Websites, AI Resume Builder, ATS Resume Generator,
          Interview Preparation Tools, and Career Development Resources.
        </p>
      </div>
    {/* Related Articles Section */}
{relatedArticles.length > 0 && (
  <section className="bg-gray-50 py-10 lg:py-6 ">
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
    </section>
  );
};

export default SeoHomepageGuide;