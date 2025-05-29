
import { useLogoutMutation } from '../context/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Logout() {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success('লগআউট সফল!');
      navigate('/login', { replace: true });
      setTimeout(() => window.location.reload(), 100); // রিডাইরেক্টের পর রিলোড
    } catch (error) {
      toast.error('লগআউট ত্রুটি: ' + (error.data?.message || 'কিছু ভুল হয়েছে'));
      console.error('লগআউট ত্রুটি:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">লগআউট নিশ্চিত করুন</h2>
        <p className="text-gray-600 mb-6">আপনি কি নিশ্চিত যে লগআউট করতে চান?</p>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full bg-red-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-all duration-300"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
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
              লগআউট হচ্ছে...
            </span>
          ) : (
            'লগআউট'
          )}
        </button>
      </div>
    </motion.div>
  );
}