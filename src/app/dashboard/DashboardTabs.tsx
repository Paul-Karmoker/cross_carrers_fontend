import { motion } from "framer-motion";
import {
  FiHome,
  FiUser,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";
import { TabKey } from "./types";
import { JSX } from "react";

interface DashboardTabsProps {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}

interface TabItem {
  key: TabKey;
  label: string;
  icon: JSX.Element;
}

export function DashboardTabs({
  activeTab,
  onChange,
}: DashboardTabsProps): JSX.Element {
  const tabs: TabItem[] = [
    { key: "dashboard", label: "Dashboard", icon: <FiHome /> },
    { key: "profile", label: "Profile", icon: <FiUser /> },
    { key: "withdraw", label: "Withdraw", icon: <FiDollarSign /> },
    { key: "history", label: "History", icon: <FiClock /> },
  ];

  return (
    <div className="flex space-x-2 mb-6 bg-white rounded-xl shadow-lg p-2">
      {tabs.map((tab) => (
        <motion.button
          key={tab.key}
          whileHover={{ scale: 1.05 }}
          onClick={() => onChange(tab.key)}
          className={`flex-1 px-4 py-3 font-semibold rounded-lg transition-all flex items-center justify-center space-x-2 ${
            activeTab === tab.key
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          aria-label={`Switch to ${tab.label}`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
