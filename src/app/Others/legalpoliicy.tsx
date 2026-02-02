import React, { FC, useMemo } from 'react';
import Navbar from '../components/home/navbar';
import Footer from '../components/home/footer';

/**
 * Reusable Section Header
 */
interface SectionHeaderProps {
  number: number;
  title: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ number, title }) => (
  <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
    <span className="bg-indigo-600 text-white rounded-xl w-10 h-10 flex items-center justify-center mr-4 shadow">
      {number}
    </span>
    {title}
  </h2>
);

/**
 * Legal Policy Component
 */
const LegalPolicy: FC = () => {
  const currentDate = useMemo(
    () =>
      new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
    []
  );

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto px-6 py-16 mt-16">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Legal & Compliance
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Disclaimer & Refund Policy
          </h1>
          <p className="text-slate-500">
            Last Updated: <span className="text-slate-900">{currentDate}</span>
          </p>
        </header>

        {/* Intro */}
        <div className="relative bg-white border border-slate-200 p-8 rounded-3xl shadow-sm mb-16">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600" />
          <p className="text-slate-600 leading-relaxed text-lg">
            This Disclaimer and Refund & Cancellation Policy governs the use of services
            provided by <strong className="text-slate-900">CrossCareers</strong>. By
            accessing or purchasing any service from this platform, you agree to be bound
            by the terms outlined below in accordance with the laws of Bangladesh.
          </p>
        </div>

        <div className="space-y-20">
          {/* DISCLAIMER SECTION */}
          <section>
            <SectionHeader number={1} title="General Disclaimer" />
            <p className="text-slate-600 leading-relaxed">
              CrossCareers is an AI-powered career support platform providing job
              information, resume tools, interview preparation resources, productivity
              tools, and educational content. All services are provided strictly for
              informational and guidance purposes only.
            </p>
          </section>

          <section>
            <SectionHeader number={2} title="No Employment Guarantee" />
            <p className="text-slate-600 leading-relaxed">
              CrossCareers does not guarantee job placement, interview calls, employment
              offers, salary outcomes, or employer responses. Hiring decisions are solely
              made by third-party employers, and results may vary based on individual
              qualifications and market conditions.
            </p>
          </section>

          <section>
            <SectionHeader number={3} title="AI & Advisory Disclaimer" />
            <p className="text-slate-600 leading-relaxed">
              AI-powered tools and generated content are intended to assist users in career
              preparation and decision-making. They do not replace professional, legal, or
              human resource advice. Users are responsible for reviewing, validating, and
              using outputs appropriately.
            </p>
          </section>

          <section>
            <SectionHeader number={4} title="Third-Party Content & Links" />
            <p className="text-slate-600 leading-relaxed">
              This platform may include links to third-party websites, job listings, or
              services. CrossCareers does not control, endorse, or assume responsibility
              for third-party content, availability, or practices.
            </p>
          </section>

          <section>
            <SectionHeader number={5} title="Limitation of Liability" />
            <p className="text-slate-600 leading-relaxed">
              To the fullest extent permitted under Bangladeshi law, CrossCareers shall not
              be liable for any direct, indirect, incidental, or consequential loss arising
              from the use of this platform or reliance on its content.
            </p>
          </section>

          {/* REFUND & CANCELLATION SECTION */}
          <section>
            <SectionHeader number={6} title="Scope of Refund & Cancellation Policy" />
            <p className="text-slate-600 leading-relaxed">
              This policy applies to all paid digital services offered by CrossCareers,
              including resume services, interview preparation, AI tools, consultations,
              and subscription-based features.
            </p>
          </section>

          <section>
            <SectionHeader number={7} title="No-Refund Rule" />
            <p className="text-slate-600 leading-relaxed">
              Due to the digital and service-based nature of offerings, refunds are not
              provided once a service has been fully delivered, accessed, used, or
              completed.
            </p>
          </section>

          <section>
            <SectionHeader number={8} title="Eligible Refund Conditions" />
            <ul className="list-disc ml-6 space-y-2 text-slate-600">
              <li>Duplicate or excess payment</li>
              <li>Technical failure preventing access to a paid service</li>
              <li>Payment deducted but service not delivered due to platform error</li>
            </ul>
          </section>

          <section>
            <SectionHeader number={9} title="Cancellation Policy" />
            <p className="text-slate-600 leading-relaxed">
              Users may request cancellation before service delivery begins. Once a service
              has started or digital access is granted, cancellation may no longer be
              possible.
            </p>
          </section>

          <section>
            <SectionHeader number={10} title="Refund Request Procedure" />
            <p className="text-slate-600 leading-relaxed">
              Refund requests must be submitted formally via email and include the
              registered email address, transaction reference, reason for request, and
              complete receiver account information (Bank or MFS).
            </p>
            <p className="mt-4 font-medium text-slate-700">
              Email: <a href="mailto:info@crosscareers.com" className="text-indigo-600">
                info@crosscareers.com
              </a>
            </p>
          </section>

          <section>
            <SectionHeader number={11} title="Refund Processing Timeline" />
            <p className="text-slate-600 leading-relaxed">
              Approved refunds will be processed within <strong>7 (seven) working days</strong>
              through the designated receiving account, subject to banking or MFS provider
              processing times.
            </p>
          </section>

          <section>
            <SectionHeader number={12} title="Legal Compliance & Jurisdiction" />
            <p className="text-slate-600 leading-relaxed">
              This policy complies with the Consumer Rights Protection Act, 2009, Digital
              Commerce Management Guidelines of Bangladesh, and applicable financial laws.
              Any disputes shall fall under the jurisdiction of Dhaka District Courts.
            </p>
          </section>

          {/* Footer Note */}
          <section className="text-center pt-10 border-t border-slate-200">
            <p className="text-slate-400 text-sm italic max-w-2xl mx-auto">
              By continuing to use this platform or purchasing any service, you confirm
              that you have read, understood, and agreed to this Disclaimer and Refund &
              Cancellation Policy.
            </p>
            <div className="mt-8 text-slate-500 font-bold text-xs tracking-widest uppercase">
              © {currentYear} CrossCareers | All Rights Reserved
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPolicy;
