import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useForgotPasswordMutation } from '../context/authApi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('ইমেইল লিখুন');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('সঠিক ইমেইল ফরম্যাট লিখুন');
      return;
    }
    try {
      await forgotPassword({ email }).unwrap();
      toast.success('পাসওয়ার্ড রিসেট লিঙ্ক আপনার ইমেইলে পাঠানো হয়েছে');
      setEmail('');
      setTimeout(() => navigate('/signinhome'), 3000); // Redirect to sign-in after 3 seconds
    } catch (err) {
      toast.error(err.data?.message || 'রিসেট লিঙ্ক পাঠাতে ব্যর্থ। আবার চেষ্টা করুন।');
    }
  };

  return (
    <div className="min-h-screen bg-green-100 text-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">পাসওয়ার্ড ভুলে গেছেন?</h2>
          <p className="mt-2 text-sm text-gray-400">
            আপনার ইমেইল লিখুন এবং আমরা একটি পাসওয়ার্ড রিসেট লিঙ্ক পাঠাব
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6" aria-label="পাসওয়ার্ড রিসেট ফর্ম">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="আপনার ইমেইল লিখুন"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="ইমেইল"
            />
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="রিসেট লিঙ্ক পাঠান"
            >
              {isLoading ? 'পাঠানো হচ্ছে...' : 'রিসেট লিঙ্ক পাঠান'}
            </motion.button>
          </div>
          <div className="text-center">
            <a
              href="/login"
              className="text-sm font-medium text-purple-600 hover:text-purple-400"
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
              aria-label="সাইন ইন পেজে ফিরে যান"
            >
              সাইন ইন পেজে ফিরে যান
            </a>
          </div>
        </form>
      </motion.div>
     
    </div>
  );
};

export default ForgotPassword;