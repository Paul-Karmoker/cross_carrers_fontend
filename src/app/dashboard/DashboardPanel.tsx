import { motion } from "framer-motion";
import { FiDollarSign, FiUser, FiActivity, FiArrowUpRight } from "react-icons/fi";
import { User } from "./types";
import { JSX } from "react";

interface DashboardPanelProps {
  user: User;
}

export function DashboardPanel({ user }: DashboardPanelProps): JSX.Element {
 
  const currentYear = [30, 60, 45, 80, 65, 90, 70];
  const lastYear = [20, 40, 55, 60, 50, 75, 60];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  
  const getPath = (data: number[]) =>
    data.map((val, i) => `${(i * 100) / (data.length - 1)},${100 - val}`).join(" ");

  return (
    <div className="space-y-8 border-1  p-8 min-h-screen">
     
      <div className="grid grid-cols-1  md:grid-cols-3 gap-6">
        {[
          { label: "Total Points", val: user.points, icon: <FiDollarSign />, color: "text-indigo-600" },
          { label: "Active Referrals", val: Math.floor(user.points / 26), icon: <FiUser />, color: "text-emerald-600" },
          { label: "Growth Rate", val: "+12.5%", icon: <FiActivity />, color: "text-blue-600" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border-1 border-gray-100 p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <span className="text-gray-400 p-2 bg-gray-50">{item.icon}</span>
              <FiArrowUpRight className="text-gray-300" />
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{item.label}</p>
              <p className={`text-2xl font-mono font-bold ${item.color}`}>{item.val}</p>
            </div>
          </motion.div>
        ))}
      </div>


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-[50px] border-1 border-gray-100"
      >
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Performance Analytics</h3>
            <p className="text-xs text-gray-400">Monthly user engagement metrics</p>
          </div>
          <div className="flex gap-4 text-xs font-medium">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-500" /> Current</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-200" /> Previous</span>
          </div>
        </div>

        <div className="relative h-64 w-full">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
            {/* Grid Lines */}
            {[0, 25, 50, 75, 100].map((tick) => (
              <line key={tick} x1="0" y1={tick} x2="100" y2={tick} stroke="#f1f5f9" strokeWidth="0.5" />
            ))}


            <motion.polyline
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1.5"
              points={getPath(lastYear)}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />


            <motion.polyline
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              points={getPath(currentYear)}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />


            {currentYear.map((val, i) => (
              <motion.circle
                key={i}
                cx={(i * 100) / (currentYear.length - 1)}
                cy={100 - val}
                r="1.2"
                fill="#6366f1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + i * 0.1 }}
              />
            ))}
          </svg>


          <div className="flex justify-between mt-6">
            {months.map((m, i) => (
              <span key={i} className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                {m}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}