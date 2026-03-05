import React, { FC } from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";

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
{/* FAQ Structured Data for SEO */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What are freelance jobs?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Freelance jobs allow professionals to work independently, offering services to global clients on short-term or project-based contracts through online platforms."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can I start freelancing online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Create a professional profile, showcase your portfolio, set competitive rates, and apply consistently on trusted freelance job platforms."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are freelance platforms safe and reliable?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most verified platforms provide secure payment systems, client reviews, and dispute resolution features to protect freelancers."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can freelancers work with international clients?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, freelance platforms connect professionals with global clients across multiple industries without geographical restrictions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which skills are in demand for freelance work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Web development, graphic design, digital marketing, content writing, data analysis, and virtual assistance are highly demanded freelance skills."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do freelancers get paid?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Freelancers typically receive payments through secure escrow systems, bank transfers, PayPal, Payoneer, or direct platform payment gateways."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is freelancing a stable career option?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Freelancing can provide stable income when professionals build strong client relationships, maintain consistent performance, and diversify income streams."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do freelance platforms charge fees?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most freelance platforms charge service fees or commission percentages from freelancer earnings or client payments."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can beginners find freelance jobs easily?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Beginners can secure freelance jobs by building niche expertise, offering competitive pricing, and delivering high-quality work consistently."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can I increase my freelance income globally?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Specialize in high-demand skills, improve your portfolio, maintain excellent client ratings, and target higher-paying international clients."
                  }
                }
              ]
            })}
          </script>
/**
 * Props for the JobCard sub-component
 */
interface JobCardProps {
  site: JobSite;
}

/**
 * Optimized JobCard Component
 */
const JobCard: FC<JobCardProps> = ({ site }) => {
  return (
    <div className="group bg-white border border-gray-100 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
      <div className="p-8 flex flex-col items-center flex-grow">

        <div className="w-full h-24 mb-6 flex items-center justify-center bg-gray-50 p-4 group-hover:bg-white transition-colors duration-300">
          <img
            src={site.logo}
            alt={`${site.name} official logo`}
            className="max-h-full max-w-full object-contain filter transition-all duration-500"
            loading="lazy"
          />
        </div>

        <h3 className="text-xl font-bold mb-2 text-center text-blue-600 transition-colors">
          {site.name}
        </h3>

        <p className="text-sm text-gray-500 text-center mb-6">
          Explore freelance jobs and remote career opportunities on {site.name}.
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

const BdJobs: FC = () => {

  const jobSites: JobSite[] = [
    { id: 1, name: 'Upwork', url: 'https://www.upwork.com/', logo: 'https://i.ibb.co.com/4wLm11VF/upwork.png' },
    { id: 2, name: 'Fiverr', url: 'https://www.fiverr.com/', logo: 'https://i.ibb.co.com/PGfpfLyG/Fiverr.png' },
    { id: 3, name: 'Freelancer.com', url: 'https://www.freelancer.com/', logo: 'https://i.ibb.co.com/Swmxgk9g/Freelance.png' },
    { id: 4, name: 'Guru', url: 'https://www.guru.com/', logo: 'https://i.ibb.co.com/4Ry4fMdK/guru.jpg' },
    { id: 5, name: 'PeoplePerHour', url: 'https://www.peopleperhour.com/', logo: 'https://i.ibb.co.com/JFyCWnyY/peopleperhour.png' },
    { id: 6, name: 'Toptal', url: 'https://www.toptal.com/', logo: 'https://i.ibb.co.com/KcGxt5ZR/images.jpg' },
    { id: 7, name: '99designs', url: 'https://99designs.com/', logo: 'https://i.ibb.co.com/jkFXWrrW/99d.png' },
    { id: 8, name: 'FlexJobs', url: 'https://www.flexjobs.com/', logo: 'https://assets.flexjobs.com/blobcontent/flexjobs/images/fj-logo.svg' },
    { id: 9, name: 'We Work Remotely', url: 'https://weworkremotely.com/', logo: 'https://i.ibb.co.com/ycXv5HVx/wwe.jpg' },
    { id: 10, name: 'SolidGigs', url: 'https://solidgigs.com/', logo: 'https://solidgigs.com/wp-content/uploads/2025/01/solidgigs-logo-new-full.png' },
    { id: 11, name: 'Contra', url: 'https://contra.com/', logo: 'https://i.ibb.co.com/pBCLCzBt/Contra.png' },
    { id: 12, name: 'Truelancer', url: 'https://www.truelancer.com/', logo: 'https://i.ibb.co.com/wNqp9CDx/true.jpg' },
    { id: 13, name: 'Ureed', url: 'https://ureed.com/', logo: 'https://i.ibb.co.com/fzWMV2bj/Ureed.png' },
    { id: 14, name: 'Workana', url: 'https://www.workana.com/', logo: 'https://i.ibb.co.com/N2028Ff3/Workana.png' },
    { id: 15, name: 'Kolabtree', url: 'https://www.kolabtree.com/', logo: 'https://i.ibb.co.com/TD1XKS1F/Kolabtree.jpg' },
    { id: 16, name: 'DesignCrowd', url: 'https://www.designcrowd.com/', logo: 'https://i.ibb.co.com/Z11710b1/de.jpg' },
    { id: 17, name: 'Behance', url: 'https://www.behance.net/joblist', logo: 'https://i.ibb.co.com/yc0hVxCh/images.png' },
    { id: 18, name: 'Hubstaff Talent', url: 'https://hubstafftalent.net/', logo: 'https://i.ibb.co.com/yc7dtgHN/Hubstaff-Talent.png' },
    { id: 19, name: 'Zeerk', url: 'https://zeerk.com/', logo: 'https://zeerk.com/wp-content/uploads/2025/12/zeerk_logo.png' },
    { id: 20, name: 'Jobbers', url: 'https://www.jobbers.io/', logo: 'https://r2.jobbers.io/uploads/2022/05/jobbers-logo-web.png' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">

<Helmet>
  {/* Primary Title Tag */}
  <title>Top Freelance Job Portals 2026 | Home-Based Remote Work & Global Freelance Platforms | CrossCareers</title>

  {/* Meta Description */}
  <meta 
    name="description" 
    content="Explore the top 20 freelance job portals including Upwork, Fiverr, Toptal, Freelancer, and more. Find global remote jobs, freelance gigs, home-based work, and verified career platforms curated by CrossCareers in 2026." 
  />

  {/* Primary Keywords */}
  <meta
    name="keywords"
    content="freelance jobs 2026, top freelance platforms, work from home jobs, remote freelance work, Upwork jobs, Fiverr gigs, Toptal remote projects, Freelancer.com jobs, home-based online jobs, global freelance opportunities, digital nomad jobs, verified career platforms"
  />

  {/* Canonical URL */}
  <link rel="canonical" href="https://crosscareers.com/freelance-jobs-online" />

  {/* Open Graph / Facebook */}
  <meta property="og:title" content="Top Freelance Job Portals 2026 | Home-Based Remote Work & Global Freelance Platforms | CrossCareers" />
  <meta property="og:description" content="Discover verified freelance job platforms to find remote work, global career opportunities, and home-based gigs in 2026." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://crosscareers.com/freelance-jobs-online" />
  <meta property="og:image" content="https://crosscareers.com/logo/favcon.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Top Freelance Job Portals 2026 | CrossCareers" />
  <meta property="og:locale" content="en_US" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@CrossCareersBD" />
  <meta name="twitter:creator" content="@CrossCareersBD" />
  <meta name="twitter:title" content="Top Freelance Job Portals 2026 | Home-Based Remote Work & Global Freelance Platforms | CrossCareers" />
  <meta name="twitter:description" content="Access the top global freelance job portals including Upwork, Fiverr, Toptal, and Freelancer. Find remote, home-based work and verified freelance opportunities in 2026." />
  <meta name="twitter:image" content="https://crosscareers.com/logo/favcon.png" />
  <meta name="twitter:image:alt" content="Top Freelance Job Portals 2026 | CrossCareers" />

  {/* Structured Data */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "CrossCareers Freelance Job Portals",
      "url": "https://crosscareers.com/freelance-jobs-online",
      "logo": "https://crosscareers.com/logo/favcon.png",
      "description": "Curated list of top global freelance job platforms including Upwork, Fiverr, Toptal, and more. Verified remote and home-based work opportunities for freelancers in 2026.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://crosscareers.com/freelance-jobs-online?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    })}
  </script>
</Helmet>

      <Navbar />

      <main className="flex-grow pt-20">

        <section className="relative overflow-hidden bg-gray-900 py-20 lg:py-28">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Top Freelance Job Portals for Remote & Global Work
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover trusted freelance platforms to find remote jobs, global clients, and verified career opportunities worldwide.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-6 py-16 lg:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Verified Freelance Platforms</h2>
              <div className="h-1.5 w-20 bg-blue-600 rounded-full mt-3"></div>
            </div>
            <p className="text-gray-500 font-medium">
              Showing {jobSites.length} Trusted Platforms
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {jobSites.map((site) => (
              <JobCard key={site.id} site={site} />
            ))}
          </div>
        </section>
{/* FAQ Section */}
<section className="container mx-auto px-6 pb-20">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
      Freelance Jobs – Frequently Asked Questions (FAQ 2026)
    </h2>

    <div className="space-y-6">
      {[
        {
          q: "What are freelance jobs and how do they work globally?",
          a: "Freelance jobs allow professionals to work independently for clients worldwide on short-term projects or contracts. Freelancers provide services like web development, graphic design, content writing, digital marketing, virtual assistance, and AI services through verified global platforms such as Upwork, Fiverr, Toptal, and Freelancer."
        },
        {
          q: "Which freelance skills are most in demand internationally?",
          a: "High-demand freelance skills include web and app development, UI/UX design, SEO, digital marketing, content writing, copywriting, data analysis, AI/ML services, video editing, social media management, and virtual assistance. These skills attract clients willing to pay premium rates globally."
        },
        {
          q: "How can I start freelancing successfully from any country?",
          a: "To start freelancing, create a professional online profile, showcase a strong portfolio, define your niche, set competitive rates, and consistently apply on verified platforms. Maintaining a strong LinkedIn, GitHub, or portfolio website boosts credibility and client trust."
        },
        {
          q: "Are freelance platforms safe and reliable for international payments?",
          a: "Yes. Verified platforms provide secure escrow systems, client reviews, dispute resolution, and reliable global payment methods such as PayPal, Payoneer, Wise, and direct bank transfers. Always verify client profiles before starting projects."
        },
        {
          q: "Can I work with clients from different countries and time zones?",
          a: "Absolutely. Freelancers can collaborate with clients worldwide. Some roles require overlap with client time zones, while many allow asynchronous work, enabling maximum flexibility across regions."
        },
        {
          q: "How do freelancers get paid for international projects?",
          a: "Payments are typically processed through escrow, secure payment gateways, or direct bank transfers. Payment schedules vary by platform and project terms, but reputable platforms ensure timely and safe payments globally."
        },
        {
          q: "Do freelance platforms charge service fees or commissions?",
          a: "Yes. Most platforms deduct a small commission from freelancer earnings or client payments. Understanding platform fees helps you price services effectively and maximize earnings."
        },
        {
          q: "Is freelancing a stable long-term career option?",
          a: "Freelancing can be highly stable and profitable when you specialize in in-demand skills, maintain strong client relationships, diversify your portfolio, and consistently deliver high-quality work."
        },
        {
          q: "How can beginners secure freelance jobs easily?",
          a: "Beginners should focus on niche skills, create a strong portfolio with sample projects, set competitive rates, and consistently deliver high-quality work. Participating in online freelance communities and networking also increases job opportunities."
        },
        {
          q: "How can I increase my freelance income globally?",
          a: "Specialize in high-demand skills, optimize your profiles and portfolios, maintain excellent client ratings, expand to international freelance marketplaces, and target clients willing to pay premium rates for quality services."
        },
        {
          q: "Which are the top global freelance platforms most searched by professionals?",
          a: "The most trusted and frequently searched freelance platforms include Upwork, Fiverr, Toptal, Freelancer, Guru, PeoplePerHour, 99designs, FlexJobs, and Workana. These platforms connect freelancers with international clients across diverse industries."
        },
        {
          q: "Can I freelance part-time while having a full-time job?",
          a: "Yes. Many professionals start part-time freelancing to gain experience and additional income. Effective time management, clear deadlines, and prioritization are essential for balancing full-time employment with freelance projects."
        },
        {
          q: "What mistakes should new freelancers avoid globally?",
          a: "Avoid low-paying projects, skipping client research, neglecting contracts, ignoring platform guidelines, overcommitting, and failing to maintain a professional online presence. Learning from feedback and building credibility ensures long-term success."
        }
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white border border-gray-100 p-6 hover:shadow-sm transition-all duration-300"
        >
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
