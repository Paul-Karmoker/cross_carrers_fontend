import { useState, useEffect, JSX } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useGetProfileQuery } from "../../redux/features/authApi";

import { Sidebar } from "./Sidebar";
import { DashboardTabs } from "./DashboardTabs";
import { TabKey, User } from "./types";
import { DashboardPanel } from "./DashboardPanel";
import { ProfilePanel } from "./ProfilePanel";
import { WithdrawPanel } from "./WithdrawPanel";
import { WithdrawalHistory } from "./WithdrawalHistory";

export default function Dashboard(): JSX.Element | null {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("dashboard");

  const { data, isLoading, error } = useGetProfileQuery();

  /**
   * ✅ Safely map API user → UI User
   * Backend does not provide all fields yet
   */
  const user: User | null = data?.user
    ? {
        firstName: data.user.firstName ?? "",
        lastName: data.user.lastName ?? "",
        email: data.user.email ?? "",
        mobileNumber: "",
        address: "",
        photo: "",
        points: 0,
        subscriptionType: "free",
        subscriptionPlan: "free",
      }
    : null;

  useEffect(() => {
    if ((error as { status?: number })?.status === 401) {
      toast.error("Please sign in");
      navigate("/signin");
    }
  }, [error, navigate]);

  /* =====================
     Loading State
  ===================== */

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  /* =====================
     Render
  ===================== */

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-6"
        >
          {/* Sidebar */}
          <Sidebar user={user} />

          {/* Main Content */}
          <div className="md:w-2/3">
            {/* ✅ Tabs */}
            <DashboardTabs activeTab={tab} onChange={setTab} />

            {/* Panels */}
            {tab === "dashboard" && <DashboardPanel user={user} />}
            {tab === "profile" && <ProfilePanel user={user} />}
            {tab === "withdraw" && <WithdrawPanel user={user} />}
            {tab === "history" && <WithdrawalHistory />}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
