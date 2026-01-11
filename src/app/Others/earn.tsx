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
      icon: '💰',
      title: '15% Commission',
      description: 'Earn a generous 15% commission on every purchase made by users who join using your unique referral link.'
    },
    {
      icon: '💳',
      title: 'Easy Payouts',
      description: 'Track your real-time earnings on your personal dashboard and withdraw securely once you hit the minimum threshold.'
    },
    {
      icon: '📈',
      title: 'Passive Income',
      description: 'Build a sustainable stream of income. The larger your network grows, the more rewards you accumulate.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Hero Section */}
          <section className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600 mb-6">
              Earn Rewards & Grow Your Network
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Unlock the full potential of your career network. Join our exclusive Referral Program 
              and turn your professional connections into passive earnings.
            </p>
          </section>

          {/* Core Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-8">
              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-xl">
                <h2 className="text-2xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                  🚀 Premium Membership Benefits
                </h2>
                <p className="text-purple-800 leading-relaxed">
                  Upgrade to a paid membership today and enjoy access to our lucrative referral-based earnings system. 
                  Get a unique referral code to share and earn commissions every time they join.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">🎯 Why Wait?</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Start sharing your referral link, grow your network, and watch your earnings rise. 
                  Check your dashboard regularly and withdraw as per our terms & policy.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg shadow-purple-200">
                    Upgrade Now & Start Earning
                  </button>
                  <button className="bg-white border-2 border-purple-100 text-purple-700 hover:border-purple-200 px-8 py-4 rounded-xl font-bold transition-all">
                    View Dashboard
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
              <div className="bg-blue-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 italic leading-relaxed">
                <span className="font-bold text-blue-800 not-italic uppercase tracking-wider text-sm mr-2">Note:</span>
                An <span className="font-semibold text-gray-900">Active User</span> is defined as a member 
                maintaining a continuous paid membership according to their selected premium plan tiers.
              </p>
            </div>
          </section>
       
          {/* Social CTA */}
          <div className="mt-16 text-center">
            <p className="text-2xl font-bold text-purple-700 animate-pulse">
              🔥 Spread the word, invite others, and enjoy the rewards! 🔥
            </p>
          </div>
              </div>
              </main>

      <Footer />
    </div>
  );
};

export default Earn;