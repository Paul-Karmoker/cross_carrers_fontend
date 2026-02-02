import React, { FC, useMemo } from 'react';
import Navbar from '../components/home/navbar';
import Footer from '../components/home/footer';

/**
 * Interfaces for Type Safety
 */
interface SectionHeaderProps {
  number: number;
  title: string;
}

interface RightCardProps {
  text: string;
}

/**
 * Reusable UI Components
 */
const SectionHeader: FC<SectionHeaderProps> = ({ number, title }) => (
  <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center group">
    <span className="bg-indigo-600 text-white rounded-xl w-10 h-10 flex items-center justify-center mr-4 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
      {number}
    </span>
    {title}
  </h2>
);

const RightCard: FC<RightCardProps> = ({ text }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300">
    <p className="text-slate-700 font-medium flex items-start">
      <span className="text-emerald-500 mr-3">✓</span>
      {text}
    </p>
  </div>
);

/**
 * PrivacyPolicy Component (TSX)
 */
const PrivacyPolicy: FC = () => {
  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto px-6 py-16 md:py-24 mt-16">
        {/* Hero Section */}
        <header className="mb-16 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Legal Transparency
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Privacy Policy & <br />
            <span className="text-indigo-600">Payment Terms</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Last Updated: <span className="text-slate-900">{currentDate}</span>
          </p>
        </header>

        {/* Abstract Box */}
        <div className="relative overflow-hidden bg-white border border-slate-200 p-8 rounded-3xl shadow-sm mb-16">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600" />
          <p className="text-slate-600 leading-relaxed text-lg">
            This Privacy Policy and Payment Dispute Resolution governs the collection, use, and protection of personal data by 
            <strong className="text-slate-900"> Cross Careers</strong> in compliance with Bangladeshi law. By utilizing our 
            digital platform and services, you provide explicit consent to the terms outlined herein.
          </p>
        </div>

        <div className="space-y-20">
          {/* Section 1: Data Collection */}
          <section>
            <SectionHeader number={1} title="Data Collection & Usage" />
            <div className="ml-0 md:ml-14 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">1.1 Data Taxonomy</h3>
                  <ul className="space-y-3">
                    {['Personal ID (Name, Email, Phone)', 'Professional Data (Resumes, History)', 'Payment Records (Secure Gateways)', 'Technical Metadata (IP, Cookies)'].map((item) => (
                      <li key={item} className="flex items-center text-slate-600 text-sm">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-3" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">1.2 Operational Purpose</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Data is processed exclusively to facilitate career services, comply with Bangladeshi legal mandates (Digital Security Act 2018), and optimize site performance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Security */}
          <section>
            <SectionHeader number={2} title="Data Protection & Security" />
            <div className="ml-0 md:ml-14 grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900 text-slate-300 p-8 rounded-2xl shadow-xl">
                <h3 className="text-white font-bold mb-4 text-xl">2.1 Technical Safeguards</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-indigo-400 font-bold">Enc:</span>
                    <span>SSL/TLS End-to-End Encryption for all transmissions.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-indigo-400 font-bold">Acc:</span>
                    <span>Strict role-based access control for authorized personnel.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
                <h3 className="text-indigo-900 font-bold mb-4 text-xl">2.2 Third-Party Disclosure</h3>
                <p className="text-indigo-800/80 leading-relaxed mb-4">
                  We maintain a strict <strong>"No-Sale"</strong> data policy. Sharing occurs only with:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['bKash', 'Nagad', 'Govt Authorities'].map(tag => (
                    <span key={tag} className="bg-white px-3 py-1 rounded-full text-xs font-bold text-indigo-600 border border-indigo-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: User Rights */}
          <section>
            <SectionHeader number={4} title="User Rights Under Bangladeshi Law" />
            <div className="ml-0 md:ml-14">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <RightCard text="Access stored personal data" />
                <RightCard text="Rectify account inaccuracies" />
                <RightCard text="Request data erasure" />
                <RightCard text="Withdraw processing consent" />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between bg-white border-2 border-dashed border-slate-200 p-6 rounded-2xl">
                <p className="text-slate-500 font-medium mb-4 sm:mb-0">Submit formal data requests to:</p>
                <a href="mailto:ceo.crosscareers@gmail.com" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-colors">
                  ceo@crosscareers.com
                </a>
              </div>
            </div>
          </section>

          {/* Section 5: Payments */}
          <section>
            <SectionHeader number={5} title="Payment Policy & Dispute Resolution" />
            <div className="ml-0 md:ml-14 space-y-8">
              <div className="grid md:grid-cols-3 gap-4">
                {['Bank Transfer', 'MFS (bKash/Nagad)', 'Credit/Debit Cards'].map((m) => (
                  <div key={m} className="bg-white border border-slate-200 p-4 rounded-xl text-center font-bold text-slate-700 uppercase tracking-tight text-xs">
                    {m}
                  </div>
                ))}
              </div>
              <div className="bg-rose-50 border border-rose-100 p-8 rounded-2xl">
                <h3 className="text-rose-900 font-bold mb-4">Refund & Jurisdictional Terms</h3>
                <ul className="space-y-3 text-rose-800/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-600">•</span>
                    No refunds are issued for digitally completed services.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-600">•</span>
                    Disputes must be initiated within 7 calendar days of the transaction.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-600">•</span>
                    Legal jurisdiction: Dhaka District Courts under the Arbitration Act, 2001.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-32 -mb-32" />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Contact & Legal Notices</h2>
                <p className="text-slate-400 mb-6">Formal legal correspondence must be directed to our registered Mirpur office.</p>
                <div className="space-y-2 text-slate-300 not-italic">
                  <p className="font-bold text-white text-lg">Cross Careers</p>
                  <p>32/2, BBCS Lane, Senpara Parbota</p>
                  <p>Mirpur-10, Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <p className="text-indigo-300 font-bold text-sm uppercase mb-2">Electronic Communications</p>
                <a href="mailto:ed.youthindevelopment@gmail.com" className="text-xl font-bold hover:text-indigo-400 transition-colors break-all">
                  info@crosscareers.com
                </a>
              </div>
            </div>
          </section>

          {/* Acknowledgement */}
          <section className="text-center pt-10 border-t border-slate-200">
            <p className="text-slate-400 text-sm max-w-2xl mx-auto italic">
              By continuing to browse this platform, you acknowledge that you have read, understood, and agreed to be legally bound by this Policy under Bangladeshi jurisdiction.
            </p>
            <div className="mt-8 text-slate-500 font-bold text-xs tracking-widest uppercase">
              © {currentYear} Cross Careers | All Rights Reserved
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;