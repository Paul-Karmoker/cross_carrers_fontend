import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiDollarSign,
  FiLogOut,
  FiCheckCircle,
} from "react-icons/fi";
import { User } from "./types";
import { logout } from "./hooks";
import { toast } from "react-hot-toast";
import { JSX } from "react";

interface Props {
  user: User;
}

export function Sidebar({ user }: Props): JSX.Element {
  return (
    <div className="md:w-1/3 bg-white shadow-2xl rounded-2xl p-8">
      <div className="flex flex-col items-center">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="relative mb-4">
          <img
            src={user.photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-indigo-100"
          />
          <div className="absolute -bottom-2 -right-2 bg-indigo-600 rounded-full p-2">
            <FiUser className="text-white text-sm" />
          </div>
        </motion.div>

        <h2 className="text-2xl font-bold text-gray-800">
          {user.firstName} {user.lastName}
        </h2>

        <div className="text-sm text-gray-500 flex items-center">
          <FiMail className="mr-1" /> {user.email}
        </div>

        <div className="text-sm text-gray-600 flex items-center">
          <FiPhone className="mr-1" /> {user.mobileNumber}
        </div>

        {user.address && (
          <div className="text-sm text-gray-600 flex items-center">
            <FiMapPin className="mr-1" /> {user.address}
          </div>
        )}

        <span className="mt-4 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-semibold">
          <FiCheckCircle className="inline mr-1" />
          {user.subscriptionType === "premium"
            ? "Premium User"
            : user.subscriptionPlan.toUpperCase()}
        </span>

        <div className="mt-6 grid grid-cols-2 gap-4 w-full">
          <div className="bg-indigo-50 p-4 rounded-lg text-center">
            <FiDollarSign /> <p className="font-bold">{user.points}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <p className="font-bold">{Math.floor(user.points / 26)}</p>
          </div>
        </div>

        <motion.button
          onClick={() => {
            logout();
            toast.success("Logged out successfully");
          }}
          className="mt-6 px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg flex items-center"
        >
          <FiLogOut className="mr-2" /> Logout
        </motion.button>
      </div>
    </div>
  );
}
