import React, { FC } from 'react';
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { blogPosts, BlogPost } from './blogs/blogdata/blogdata01'; // adjust path if needed

/**
 * Interface for Job Portal data structure
 */
interface JobSite {
  id: number;
  name: string;
  url: string;
  logo: string;
  description?: string;
}

/**
 * Props for the JobCard sub-component
 */
interface JobCardProps {
  site: JobSite;
}
 {/* FAQ Structured Data for SEO */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What are global remote jobs?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Global remote jobs allow professionals to work from any country while collaborating with international companies through digital platforms and online tools."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Are remote jobs legitimate and safe?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most verified remote job platforms screen employers, but candidates should always research companies and avoid roles requesting upfront payments."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Which industries hire the most remote workers globally?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Technology, digital marketing, customer support, finance, content creation, and project management are among the fastest-growing remote hiring sectors worldwide."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do remote jobs pay competitive salaries?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Many global remote roles offer competitive salaries based on skills, experience, and market demand, sometimes adjusted by geographic location."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What skills are required for remote work?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Strong communication, time management, digital collaboration, problem-solving, and technical proficiency are essential skills for successful remote professionals."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How can I find verified remote job platforms?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Use trusted global job boards specializing in remote and hybrid opportunities with transparent company profiles and secure application systems."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Are hybrid jobs different from remote jobs?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Hybrid jobs combine remote work flexibility with occasional office presence, while fully remote roles require no physical office attendance."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I work remotely for companies in another country?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, many companies hire international talent remotely, though tax regulations, payment methods, and employment laws may vary."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do remote jobs require specific time zone availability?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Some roles require overlap with company time zones, while others offer asynchronous work flexibility across global regions."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How can I improve my chances of getting a remote job?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Optimize your resume for remote skills, build a strong online presence, tailor applications, and apply consistently through verified global platforms."
                    }
                  }
                ]
              })}
            </script>
/**
 * Optimized JobCard Component
 * Features better hover states, transitions, and accessible link handling
 */
const JobCard: FC<JobCardProps> = ({ site }) => {
  return (
    <div className="group bg-white border border-gray-100 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
      <div className="p-8 flex flex-col items-center flex-grow">
        <div className="w-full h-24 mb-6 flex items-center justify-center bg-gray-50 p-4 group-hover:bg-white transition-colors duration-300">
          <img
            src={site.logo}
            alt={`${site.name} Logo`}
            className="max-h-full max-w-full object-contain filter transition-all duration-500"
            loading="lazy"
          />
        </div>

        <h3 className="text-xl font-bold mb-2 text-center text-blue-600 transition-colors">
          {site.name}
        </h3>
        
        <p className="text-sm text-gray-500 text-center mb-6">
          Access premium remote job listings and career resources on {site.name}.
        </p>
      </div>

      <div className="px-8 pb-8">
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-2 bg-blue-600 text-white font-semibold transition-all duration-300 shadow-gray-200 group-hover:shadow-blue-200"
          aria-label={`Visit ${site.name} website`}
        >
          Explore Careers
          <svg 
            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};
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

const relevantCategories = ['Career Guide', 'Skill Development', 'Interview Support', 'Resume / CV', 'Workplace Wellness & Culture'];
const relatedArticles = blogPosts
  .filter(post => relevantCategories.includes(post.category))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 6);

const BdJobs: FC = () => {
  const jobSites: JobSite[] = [
    { id: 1, name: 'FlexJobs', url: 'https://www.flexjobs.com/', logo: 'https://assets.flexjobs.com/blobcontent/flexjobs/images/fj-logo.svg' },
    { id: 2, name: 'We Work Remotely', url: 'https://weworkremotely.com/', logo: 'https://weworkremotely.com/assets/LogoV1-5a0dbe26661ab0602beaf98f789d6e43824f60d122d4abd700268f394ddc1beb.svg' },
    { id: 3, name: 'Remote.co', url: 'https://remote.co/', logo: 'https://i.ibb.co.com/VWDrsTg5/remote-co-400x202.png' },
    { id: 4, name: 'Remote OK', url: 'https://remoteok.com/', logo: 'https://i.ibb.co.com/LzhVZvqS/remote-ok-400x202.png' },
    { id: 5, name: 'Jobspresso', url: 'https://jobspresso.co/', logo: 'https://jobspresso.co/wp-content/uploads/2015/05/cropped-Jobspresso-logo-2-cropped1.png' },
    { id: 6, name: 'Wellfound', url: 'https://wellfound.com/', logo: 'https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/64626a4a74818ca87606a470_Primary_Logo_-_Black.svg' },
    { id: 7, name: 'Working Nomads', url: 'https://www.workingnomads.com/jobs', logo: 'https://i.ibb.co.com/bjfdzL5j/Work.png' },
    { id: 8, name: 'Remotive', url: 'https://remotive.com/', logo: 'https://i.ibb.co.com/sJP7nXmt/Remotive-New-Logo.png' },
    { id: 9, name: 'NoDesk', url: 'https://nodesk.co/remote-jobs/', logo: 'https://i.ibb.co.com/v6HGzb87/No.png' },
    { id: 10, name: 'Remote100K', url: 'https://remote100k.com/', logo: 'https://i.ibb.co.com/BVHgKbhx/Remote100k.png' },
    { id: 11, name: 'ZipRecruiter', url: 'https://www.ziprecruiter.ie/', logo: 'https://i.ibb.co.com/84DpjNWv/Zip.png' },
    { id: 12, name: 'Marcor', url: 'https://work.mercor.com/explore?utm_campaign=lowKD&utm_medium=google_ads&gad_source=1&gad_campaignid=23301219055&gbraid=0AAAAA_5Wc8zRPxm2eYuqCeq0-wKC7p2FD&gclid=Cj0KCQiAyvHLBhDlARIsAHxl6xpe7U7fEMOuBLzEWV1j36XDekwCykou1-1CoG4oOecXcJpuoR59OMoaAjV6EALw_wcB', logo: 'https://i.ibb.co.com/PZGstxNM/marcor.png' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
<Helmet>
  {/* Primary Title Tag */}
  <title>Remote & Hybrid Jobs 2026 | Work From Home, Freelance & Global Opportunities | CrossCareers</title>

  {/* Meta Description */}
  <meta
    name="description"
    content="Explore top remote, hybrid, freelance, and work-from-home job portals worldwide in 2026. Find verified platforms for flexible, global career opportunities."
  />

  {/* Primary Keywords */}
  <meta
    name="keywords"
    content="remote jobs 2026, hybrid jobs 2026, work from home, freelance jobs, global remote platforms, flexible jobs, online jobs, telecommute opportunities, part-time remote work, digital nomad jobs, job boards 2026, international remote jobs"
  />

  {/* Canonical URL */}
  <link rel="canonical" href="https://crosscareers.com/remote-jobs-worldwide" />

  {/* Open Graph / Facebook */}
  <meta property="og:title" content="Remote & Hybrid Jobs 2026 | Work From Home, Freelance & Global Opportunities | CrossCareers" />
  <meta property="og:description" content="Discover the best remote and hybrid job portals globally. Access verified platforms to find flexible, freelance, and online work opportunities in 2026." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://crosscareers.com/remote-jobs-worldwide" />
  <meta property="og:image" content="https://crosscareers.com/logo/favcon.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Remote & Hybrid Jobs Portal 2026 | CrossCareers" />
  <meta property="og:locale" content="en_US" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@CrossCareersBD" />
  <meta name="twitter:creator" content="@CrossCareersBD" />
  <meta name="twitter:title" content="Remote & Hybrid Jobs 2026 | Work From Home, Freelance & Global Opportunities | CrossCareers" />
  <meta name="twitter:description" content="Access verified remote and hybrid job portals worldwide. Explore freelance, work-from-home, and global flexible job opportunities in 2026." />
  <meta name="twitter:image" content="https://crosscareers.com/logo/favcon.png" />
  <meta name="twitter:image:alt" content="Remote & Hybrid Jobs Portal 2026 | CrossCareers" />

  {/* Structured Data */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "CrossCareers",
      "url": "https://crosscareers.com/remote-jobs-worldwide",
      "logo": "https://crosscareers.com/logo/favcon.png",
      "description": "AI-powered career hub offering verified remote & hybrid jobs, freelance opportunities, online work, and global career resources.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://crosscareers.com/remote-jobs-worldwide?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    })}
  </script>
</Helmet>

      <Navbar />
      <main className="flex-grow pt-20">
        <section className="relative overflow-hidden bg-gray-900 py-20 lg:py-28">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Remote & Hybrid <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Job Portals</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Navigate your career journey with confidence. We've aggregated the most trusted platforms to help you find remote jobs worldwide.
            </p>
          </div>
        </section>

        {/* Portals Grid Section */}
        <section className="container mx-auto px-6 py-16 lg:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Remote & Hybrid Jobs Portals</h2>
              <div className="h-1.5 w-20 bg-blue-600 rounded-full mt-3"></div>
            </div>
            <p className="text-gray-500 font-medium">Showing {jobSites.length} Verified Platforms</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {jobSites.map((site) => (
              <JobCard key={site.id} site={site} />
            ))}
          </div>
          
          {/* Bottom Call to Action or Insight */}
          <div className="mt-20 p-8 md:p-12 bg-white border-[1px] border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Can't find what you're looking for?</h3>
              <p className="text-gray-600 leading-relaxed">
                Our database is updated weekly with new niche job boards and international remote platforms operating globally.
              </p>
            </div>
            <button className="whitespace-nowrap px-8 py-2 bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition-colors">
            <a href="/contact-us">Suggest a Portal</a>
            </button>
          </div>
        </section>

{/* Related Articles Section */}
{relatedArticles.length > 0 && (
  <section className="bg-gray-50 py-10 lg:py-6 -mt-16">
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
<section className="container mx-auto px-6 pb-20 mt-10">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
      Remote Jobs – Frequently Asked Questions (FAQ 2026)
    </h2>

    <div className="space-y-6">
      {[
        {
          q: "What are remote jobs and how do they work?",
          a: "Remote jobs allow professionals to work from any location while collaborating with companies globally through digital tools. They include full-time, part-time, freelance, and contract roles across industries like tech, marketing, finance, and customer support."
        },
        {
          q: "Are remote jobs legitimate and safe for freelancers?",
          a: "Yes. Most verified remote platforms like We Work Remotely, FlexJobs, Remote.co, and Remote OK screen employers. Always research companies, read reviews, and avoid roles asking for upfront payments to stay safe."
        },
        {
          q: "Which industries hire the most remote workers worldwide?",
          a: "Technology (software development, AI/ML), digital marketing, customer support, finance, graphic design, content creation, project management, and virtual assistance are leading sectors for remote work globally."
        },
        {
          q: "Do remote jobs pay competitive salaries?",
          a: "Many remote roles offer competitive salaries based on skills, experience, and market demand. Some companies adjust pay according to location, while others offer uniform global rates."
        },
        {
          q: "What skills are most in demand for remote work?",
          a: "In-demand remote skills include software development, web and app design, digital marketing, SEO, copywriting, data analysis, AI/ML, project management, communication, time management, and proficiency with collaboration tools like Slack, Zoom, and Trello."
        },
        {
          q: "How can I find verified remote job platforms?",
          a: "Use trusted global job boards and freelance marketplaces like Upwork, Fiverr, Toptal, We Work Remotely, Remote.co, FlexJobs, and Remote OK. Look for platforms with verified companies, secure payment systems, and transparent job postings."
        },
        {
          q: "Are hybrid jobs different from fully remote jobs?",
          a: "Yes. Hybrid jobs combine remote work with occasional office attendance, while fully remote roles allow you to work entirely from anywhere, offering maximum flexibility."
        },
        {
          q: "Can I work remotely for companies in another country?",
          a: "Absolutely. Many companies hire international talent remotely. You may need to manage tax rules, international payments, and employment laws depending on your country and the employer’s location."
        },
        {
          q: "Do remote jobs require working in specific time zones?",
          a: "Some roles require time overlap with company headquarters, while others are fully asynchronous, allowing global freelancers to work flexible hours across different regions."
        },
        {
          q: "How can I increase my chances of landing a remote job?",
          a: "Optimize your resume for remote skills, create a strong online portfolio, maintain professional LinkedIn and GitHub profiles, tailor applications to job descriptions, and consistently apply through reputable global platforms."
        },
        {
          q: "Which remote job platforms are most searched globally?",
          a: "Top platforms include Upwork, Fiverr, Toptal, We Work Remotely, FlexJobs, Remote.co, Remote OK, Freelancer, PeoplePerHour, and 99designs. These sites attract millions of remote job seekers worldwide."
        },
        {
          q: "Can beginners start with remote jobs?",
          a: "Yes. Beginners should start by focusing on in-demand skills, creating a portfolio with small projects, offering competitive rates, and gradually building client reviews on trusted remote platforms."
        }
      ].map((item, index) => (
        <div key={index} className="bg-white border border-gray-100 p-6 hover:shadow-sm transition-all duration-300">
          <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      </main>
      <Footer />
    </div>
  );
};

export default BdJobs;
