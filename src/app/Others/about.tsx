import React, { FC } from 'react';
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";

/**
 * Interface Definitions
 */
interface SectorCardProps {
  title: string;
}

interface ServiceItemProps {
  number: number;
  title: string;
  description: string;
}

/**
 * Sub-components for better maintainability and reusability
 */
const SectorCard: FC<SectorCardProps> = ({ title }) => (
  <div className="group bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
    <p className="text-gray-700 font-semibold group-hover:text-blue-700 transition-colors">
      {title}
    </p>
  </div>
);

const ServiceItem: FC<ServiceItemProps> = ({ number, title, description }) => (
  <div className="flex flex-col md:flex-row gap-8 items-start p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
    <div className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200 transform -rotate-3 group-hover:rotate-0 transition-transform">
      <span className="text-2xl font-black">{number}</span>
    </div>
    <div className="flex-1">
      <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-lg">
        {description}
      </p>
    </div>
  </div>
);

/**
 * About Page Component
 */
const About: FC = () => {
  const sectors: string[] = [
    'Administration & HR',
    'Finance & Operations',
    'Monitoring & Evaluation',
    'Compliance & Security',
    'Logistics & Procurement',
    'Government Liaison',
    'GBV & Child Protection',
    'DRR & Climate Change',
    'Livelihood & Agriculture'
  ];

  const services: Omit<ServiceItemProps, 'number'>[] = [
    {
      title: 'Personalized Career Guidance',
      description: 'Our tailored career advice helps you identify growth opportunities, set achievable goals, and strategically navigate your career path. We provide the tools to strengthen your professional portfolio and develop a clear career roadmap.'
    },
    {
      title: 'Job Search Assistance',
      description: 'We provide timely advice on job openings, application strategies, and interview preparation. Our experts help you understand employer expectations and tailor your applications to stand out in a competitive market.'
    },
    {
      title: 'ATS-Optimized Application Materials',
      description: 'We craft resumes and cover letters that pass Applicant Tracking Systems while highlighting your skills and achievements. Our documents are tailored to specific roles in the humanitarian and development sector.'
    },
    {
      title: 'Interview Preparation',
      description: 'Our comprehensive preparation includes mock interviews, practice tests, and coaching to help you articulate your experiences and demonstrate your expertise effectively.'
    },
    {
      title: 'Sector-Specific Expertise',
      description: 'We support professionals across diverse sectors including DRR, GBV prevention, climate change adaptation, health, education, emergency response, and more, providing relevant, field-specific career guidance.'
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-24 mt-10">
        
        {/* Hero Section */}
        <section className="mb-24 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
            Our Identity
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-10 tracking-tight leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Cross Careers</span>
          </h1>
          
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-10 rounded-3xl shadow-xl shadow-gray-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-700 italic relative z-10">
              &quot;Empowering Future Leaders in the Development & Humanitarian Sector&quot; 
              <span className="block mt-4 not-italic font-normal text-gray-600 text-lg">
                — With this vision, <span className="font-bold text-blue-600">Cross Careers</span> emerges as a dynamic 
                social enterprise committed to equipping young professionals with the skills, knowledge, 
                and practical experience needed to thrive.
              </span>
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg leading-relaxed text-gray-600 mb-6">
                We bridge the gap between ambition and opportunity through a unique blend of online and hands-on training, 
                preparing the next generation for impactful careers across various sectors.
              </p>
              <div className="p-6 bg-blue-600 rounded-2xl text-white">
                <p className="text-lg font-medium">
                  Comprehensive career services including resume building, interview coaching, and job placement support.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sectors.map((item) => (
                <SectorCard key={item} title={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <section className="mb-24">
          <div className="bg-gray-900 rounded-[3rem] p-10 md:p-16 text-white overflow-hidden relative">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Purpose</h2>
                <p className="text-gray-400 text-lg mb-8">
                  We serve as a comprehensive platform for professionals in the humanitarian and development sectors, 
                  facilitating growth through:
                </p>
                <ul className="space-y-4">
                  {[
                    "Up-to-date NGO job vacancy information",
                    "Global training opportunities",
                    "Career growth resources",
                    "Information bridges for talent"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="text-gray-200">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center">
                <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <p className="text-gray-300 italic leading-relaxed">
                    While we don&apos;t facilitate direct applications, we empower you with the knowledge to pursue 
                    opportunities aligned with your passion for creating positive change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">Cross Careers</span>?
            </h2>
            <p className="text-gray-600 text-lg">
              We provide the ecosystem you need to transition from a job seeker to a sector leader.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <ServiceItem 
                key={service.title}
                number={index + 1}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-800 rounded-[2.5rem] p-12 md:p-20 text-white text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Elevate Your Humanitarian Career
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Cross Careers is more than a job search platform - we&apos;re your partner in professional growth. 
              Join us today to access the support and insights you need to advance.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-white text-blue-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-2xl"
            >
              Connect With Us
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;