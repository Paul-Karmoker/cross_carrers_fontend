/* eslint-disable no-unused-vars */
import React from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const PrivacyPolicy = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-5 py-20 mt-20">
        {/* Header Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy & Payment Terms
          </h1>
          <p className="text-lg text-gray-600">
            Last Updated: {currentDate}
          </p>
        </section>

        {/* Introduction */}
        <div className="bg-blue-50 p-6 rounded-lg mb-12">
          <p className="text-gray-700">
            This Privacy Policy and Payment Dispute Resolution  governs the collection, use, and protection of personal data by Cross Careers  in compliance with Bangladeshi law. By using our website and services, you  consent to this Policy.
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
              Data Collection & Usage
            </h2>
            <div className="ml-11 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">1.1 Types of Data Collected</h3>
                <p className="text-gray-700 mb-3">
                  We may collect:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Personal Identification Data:</strong> Name, email, phone number, address.</li>
                  <li><strong>Professional Data:</strong> Resume, work history, certifications.</li>
                  <li><strong>Payment Data (if applicable):</strong> Transaction records (processed via secure third-party gateways).</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, cookies.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">1.2 Purpose of Data Collection</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>To provide career services (resume building, job matching).</li>
                  <li>To comply with Bangladeshi legal obligations.</li>
                  <li>To improve service functionality.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">1.3 Legal Basis for Processing</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>User Consent (Digital Security Act, 2018, Section 32).</li>
                  <li>Contractual Necessity (for service delivery).</li>
                  <li>Legal Compliance (e.g., fraud prevention under Penal Code, 1860).</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
              Data Protection & Security
            </h2>
            <div className="ml-11 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2.1 Security Measures</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Encryption:</strong> SSL/TLS for data transmission.</li>
                  <li><strong>Access Control:</strong> Restricted to authorized personnel.</li>
                  <li><strong>Breach Protocol:</strong> Notification per Digital Security Act, 2018 (Section 33).</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2.2 Third-Party Sharing</h3>
                <p className="text-gray-700">
                  We <strong>do not sell</strong> your data. Limited sharing occurs with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                  <li>Payment processors (bKash, Nagad, or bank gateways).</li>
                  <li>Government authorities (if legally required).</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
              Cookies & Tracking Technologies
            </h2>
            <div className="ml-11 space-y-4">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Functional Cookies:</strong> Necessary for website operation.</li>
                <li><strong>Analytics Cookies:</strong> Improve user experience (opt-out available).</li>
                <li><strong>Third-Party Cookies:</strong> Google Analytics (anonymized data).</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">4</span>
              User Rights Under Bangladeshi Law
            </h2>
            <div className="ml-11 space-y-4">
              <p className="text-gray-700">
                You may:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                {[
                  '✅ Access your stored data',
                  '✅ Correct inaccuracies',
                  '✅ Request deletion (subject to legal retention periods)',
                  '✅ Withdraw consent (via email request)'
                ].map((right, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
                    <p className="text-gray-800">{right}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800">Submit requests to:</p>
                <p className="text-gray-700 mt-1">📧 ceo.crosscareers@gmail.com</p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">5</span>
              Payment Policy & Dispute Resolution
            </h2>
            <div className="ml-11 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">5.1 Payment Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  {[
                    'Bank Transfer (Bangladesh-based accounts)',
                    'Mobile Financial Services (bKash, Nagad)',
                    'Credit/Debit Cards (via secure gateways)'
                  ].map((method, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
                      <p className="text-gray-800">{method}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">5.2 Refund & Dispute Handling</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>No Refunds</strong> for completed services (e.g., resume drafting).</li>
                  <li><strong>Disputes must be filed within 7 days</strong> of transaction.</li>
                  <li><strong>Fraudulent charges</strong> will be investigated per Bangladesh Bank&lsquo;s Guidelines.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">5.3 Legal Jurisdiction</h3>
                <p className="text-gray-700">
                  All disputes shall be resolved under <strong>Bangladeshi law</strong> in <strong>Dhaka District Courts</strong>. Arbitration may apply per <strong>Arbitration Act, 2001</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">6</span>
              Amendments & Enforcement
            </h2>
            <div className="ml-11 space-y-4">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Changes to Policy:</strong> 30-day notice via website update.</li>
                <li><strong>Non-compliance:</strong> May result in service termination.</li>
                <li><strong>Governing Law:</strong> Laws of Bangladesh.</li>
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact & Legal Notices</h2>
            <p className="text-gray-700 mb-2">
              All legal notices must be sent to:
            </p>
            <address className="not-italic">
              <p className="font-semibold">Cross Careers</p>
              <p>32/2, BBCS Lane, Senpara Parbota, Mirpur-10</p>
              <p>Dhaka, Bangladesh</p>
              <p>Email: <a href="mailto:ed.youthindevelopment@gmail.com" className="text-blue-600">ed.youthindevelopment@gmail.com</a></p>
            </address>
          </section>

          {/* Acknowledgment */}
          <section className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">User Acknowledgment</h2>
            <p className="text-gray-700 mb-3">
              By continuing to use our services, you confirm:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>You have read and understood this Policy.</li>
              <li>You consent to data processing as described.</li>
              <li>You agree to dispute resolution under Bangladeshi jurisdiction.</li>
            </ul>
            <p className="text-gray-700 mt-4 font-semibold">
              This Policy is legally binding and enforceable in Bangladesh.
            </p>
          </section>

          {/* Copyright */}
          <div className="text-center text-gray-500 mt-8">
            <p>© Cross Careers | {new Date().getFullYear()}</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default PrivacyPolicy;