import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLoginMutation } from '../context/authApi';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading: isSubmitting, error }] = useLoginMutation();
  const navigate = useNavigate();

  // ত্রুটি হ্যান্ডলিং এবং টোস্ট নোটিফিকেশন
  useEffect(() => {
    if (error) {
      toast.error(error.data?.message || 'লগইন ব্যর্থ হয়েছে');
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
      toast.success('লগইন সফল!');
      navigate('/dashboard');
    } catch (err) {
      // ত্রুটি টোস্ট useEffect এ হ্যান্ডল করা হবে
      console.error('লগইন ত্রুটি:', err);
    }
  };

  const handleSocialLogin = (provider) => {
    toast(`Continue with ${provider}`, { icon: '🔐' });
    // এখানে সোশ্যাল লগইন লজিক ইমপ্লিমেন্ট করুন
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <motion.h1
                className="text-3xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                স্বাগতম
              </motion.h1>
              <p className="text-gray-600">আপনার অ্যাকাউন্টে সাইন ইন করুন</p>
            </div>

            <form onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                  ইমেইল ঠিকানা
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-right mt-2">
                  <Link to="/forgetPassword" className="text-sm text-indigo-600 hover:text-indigo-500">
                    পাসওয়ার্ড ভুলে গেছেন?
                  </Link>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center mb-6"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    সাইন ইন হচ্ছে...
                  </span>
                ) : (
                  <span className="flex items-center">
                    সাইন ইন <FiArrowRight className="ml-2" />
                  </span>
                )}
              </motion.button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">অথবা এর মাধ্যমে চালিয়ে যান</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium flex items-center justify-center hover:bg-gray-50"
                >
                  <FcGoogle className="h-5 w-5 mr-2" />
                  <span>Google</span>
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleSocialLogin('Facebook')}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium flex items-center justify-center hover:bg-gray-50"
                >
                  <FaFacebook className="h-5 w-5 mr-2 text-blue-600" />
                  <span>Facebook</span>
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleSocialLogin('LinkedIn')}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium flex items-center justify-center hover:bg-gray-50"
                >
                  <FaLinkedin className="h-5 w-5 mr-2 text-blue-700" />
                  <span>LinkedIn</span>
                </motion.button>
              </div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-600">
                অ্যাকাউন্ট নেই?{' '}
                <Link to="/signuphome" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  সাইন আপ
                </Link>
              </p>
            </motion.div>
          </div>

          <div className="bg-gray-50 px-8 py-6 rounded-b-2xl text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-600 text-sm"
            >
              সাইন ইন করে, আপনি আমাদের{' '}
              <a href="/terms" className="text-indigo-600 hover:text-indigo-500">
                সেবার শর্তাবলী
              </a>{' '}
              এবং{' '}
              <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                গোপনীয়তা নীতি
              </a>{' '}
              এর সাথে সম্মত হচ্ছেন।
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}