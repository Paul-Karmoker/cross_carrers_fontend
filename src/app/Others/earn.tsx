import React, { FC } from 'react';
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";

/**
 * Interface for Feature Card mapping
 */
interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

/**
 * Reusable Feature Card Component
 */
const FeatureCard: FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Earn: FC = () => {
  const features: FeatureProps[] = [
    {
      icon: '🤝',
      title: 'Referral Rewards',
      description: 'Receive a 15% reward credit for every new professional who joins our community through your unique invitation.'
    },
    {
      icon: '📊',
      title: 'Transparent Tracking',
      description: 'Monitor your network growth and community contributions through your personalized member dashboard.'
    },
    {
      icon: '🌱',
      title: 'Community Growth',
      description: 'Support a sustainable professional ecosystem. As our network expands, so do the exclusive perks for our active members.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Hero Section */}
          <section className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 mb-6">
              Grow Your Network & Earn Community Rewards
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Enhance your professional journey. Join our Referral Program to share the value of our platform with your network and earn rewards for your contributions.
            </p>
          </section>

          {/* Core Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-8">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
                <h2 className="text-2xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                  Premium Membership Benefits
                </h2>
                <p className="text-blue-800 leading-relaxed">
                  Unlock advanced networking tools and exclusive access to our community reward system by upgrading to a Premium Membership today. 
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">How It Works</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Distribute your professional invitation link, welcome new colleagues to the platform, and receive credits directly to your account as per our community guidelines.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-200">
                    Get Started with Premium
                  </button>
                  <button className="bg-white border-2 border-blue-100 text-blue-700 hover:border-blue-200 px-8 py-4 rounded-xl font-bold transition-all">
                    Member Dashboard
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* Footer Note */}
          <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 italic leading-relaxed text-sm">
                <span className="font-bold text-gray-700 not-italic uppercase tracking-wider mr-2">Terms:</span>
                An <span className="font-semibold text-gray-800">Active Member</span> is defined as an individual 
                maintaining a verified paid subscription in accordance with their selected membership tier. 
                Rewards are subject to our standard community terms and policies.
              </p>
            </div>
          </section>
        
          {/* Social CTA */}
          <div className="mt-16 text-center">
            <p className="text-xl font-semibold text-blue-800">
              Invite your colleagues and strengthen our professional community today.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Earn;