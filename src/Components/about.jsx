
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const about = () => {
  return (
    <>
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-5 py-20 mt-20">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            About <span className="text-blue-600">Cross Careers</span>
          </h1>
          
          <div className="bg-blue-50 p-8 rounded-xl shadow-sm">
            <p className="text-lg leading-relaxed text-gray-700">
              &quot;Empowering Future Leaders in the Development & Humanitarian Sector&quot; - with this vision, 
              <span className="font-bold text-blue-600"> Cross Careers</span> emerges as a dynamic 
              social enterprise committed to equipping young professionals with the skills, knowledge, 
              and practical experience needed to thrive.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              We bridge the gap between ambition and opportunity through a unique blend of online and hands-on training, 
              preparing the next generation for impactful careers across various sectors including:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                'Administration & HR', 
                'Finance & Operations', 
                'Monitoring & Evaluation',
                'Compliance & Security',
                'Logistics & Procurement',
                'Government Liaison',
                'GBV & Child Protection',
                'DRR & Climate Change',
                'Livelihood & Agriculture'
              ].map((item) => (
                <div key={item} className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
                  <p className="text-gray-800 font-medium">{item}</p>
                </div>
              ))}
            </div>
            
            <p className="text-lg leading-relaxed text-gray-700">
              Our comprehensive career services include resume building, interview coaching, and job placement 
              support to ensure our trainees transition successfully into the workforce.
            </p>
          </div>
        </section>

        {/* Purpose Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Purpose</h2>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              We serve as a comprehensive platform for professionals in the humanitarian and development sectors, 
              providing:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Up-to-date job vacancy information for NGOs and international organizations</li>
              <li>Global training opportunities to enhance professional skills</li>
              <li>Resources to navigate career growth in the development sector</li>
              <li>Information bridges to connect talent with meaningful opportunities</li>
            </ul>
            <p className="text-lg leading-relaxed text-gray-700 mt-4">
              While we don&apos;t facilitate direct applications, we empower you with the knowledge to pursue 
              opportunities aligned with your passion for creating positive change.
            </p>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-blue-600">Cross Careers</span>?
          </h2>
          
          <div className="space-y-10">
            {/* Service 1 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold">1</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Personalized Career Guidance</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our tailored career advice helps you identify growth opportunities, set achievable goals, 
                  and strategically navigate your career path. We provide the tools to strengthen your professional 
                  portfolio and develop a clear career roadmap.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold">2</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Job Search Assistance</h3>
                <p className="text-gray-700 leading-relaxed">
                  We provide timely advice on job openings, application strategies, and interview preparation. 
                  Our experts help you understand employer expectations and tailor your applications to stand out 
                  in a competitive market.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold">3</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">ATS-Optimized Application Materials</h3>
                <p className="text-gray-700 leading-relaxed">
                  We craft resumes and cover letters that pass Applicant Tracking Systems while highlighting 
                  your skills and achievements. Our documents are tailored to specific roles in the humanitarian 
                  and development sector.
                </p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold">4</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Interview Preparation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our comprehensive preparation includes mock interviews, practice tests, and coaching to help 
                  you articulate your experiences and demonstrate your expertise effectively.
                </p>
              </div>
            </div>

            {/* Service 5 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold">5</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Sector-Specific Expertise</h3>
                <p className="text-gray-700 leading-relaxed">
                  We support professionals across diverse sectors including DRR, GBV prevention, climate change 
                  adaptation, health, education, emergency response, and more, providing relevant, field-specific 
                  career guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Elevate Your Humanitarian Career</h2>
          <p className="text-lg mb-6 leading-relaxed">
            Cross Careers is more than a job search platform - we&apos;re your partner in professional growth. 
            Join us today to access the support, resources, and insights you need to advance your career in the 
            humanitarian and development sector.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            <a href="./contact">Connect Us</a>
          </button>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default about;