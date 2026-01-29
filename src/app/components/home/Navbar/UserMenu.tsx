import { User } from "@/types";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { logout } from "@/redux/features/authApi";

interface Props {
  user: User;
  isPremium: boolean;
}

export default function UserMenu({ user, isPremium }: Props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}` || "U";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold"
      >
        {initials}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl"
          >
            <div className="p-4 border-b">
              <div className="font-semibold">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-xs text-slate-500">
                {isPremium ? "Premium Plan" : "Free Trial"}
              </div>
            </div>

            <button
              onClick={() => navigate("/profile")}
              className="w-full px-4 py-3 text-left hover:bg-slate-50"
            >
              Account Settings
            </button>

            <button
              onClick={logout}
              className="w-full px-4 py-3 flex items-center gap-2 text-red-600 hover:bg-red-50"
            >
              <FiLogOut /> Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
