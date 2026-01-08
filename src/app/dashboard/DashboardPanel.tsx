import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiUser,
  FiPieChart,
} from "react-icons/fi";
import { User } from "./types";
import { JSX } from "react";

interface DashboardPanelProps {
  user: User;
}

export function DashboardPanel({ user }: DashboardPanelProps): JSX.Element {
  const monthlyData: number[] = [30, 60, 45, 80, 65, 90, 70];
  const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-gray-500 font-medium flex items-center">
            <FiDollarSign className="mr-2" /> Current Points
          </h3>
          <p className="text-3xl font-bold text-indigo-600">
            {user.points}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-gray-500 font-medium flex items-center">
            <FiUser className="mr-2" /> Active Referrals
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {Math.floor(user.points / 26)}
          </p>
        </motion.div>
      </div>

      {/* Monthly Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FiPieChart className="mr-2" /> Monthly Activity
        </h3>

        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <div className="relative w-full h-64">
            {/* Bars */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end h-48">
              {monthlyData.map((height: number, index: number) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`w-8 rounded-t-lg ${
                    index % 2 === 0
                      ? "bg-indigo-500"
                      : "bg-purple-500"
                  }`}
                />
              ))}
            </div>

            {/* Month Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around pt-2 text-xs text-gray-500">
              {months.map((month: string, index: number) => (
                <div key={index} className="w-8 text-center">
                  {month}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
