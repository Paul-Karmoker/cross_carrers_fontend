
//import { useLogoutMutation } from '../context/authApi';

import { motion } from 'framer-motion';
import { logout } from '../context/authApi';
export default function Logout() {
  


 

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
          onClick={logout}
          
          className="w-full bg-red-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-all duration-300"
        >
          
          Logout
        </button>
      </div>
    </motion.div>
  );
}