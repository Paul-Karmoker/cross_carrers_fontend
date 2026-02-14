import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/features/authApi";
import { User } from "@/types";

import {
  RiDashboardLine,
  RiVipCrown2Line,
  RiSettings3Line,
  RiLogoutBoxRLine,
  RiUser3Line,
} from "react-icons/ri";

interface Props {
  user: User;
  isPremium: boolean;
  remainingTime: string;
  onClose: () => void;
}

export default function UserDropdown({
  user,
  isPremium,
  remainingTime,
  onClose,
}: Props) {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ───────── Outside click close ───────── */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleLogout = () => {
    onClose();
    logout();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-4 w-[340px] rounded-xl bg-white border border-slate-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] z-[999]"
    >
      {/* ───────── Header ───────── */}
      <div className="p-5 border-b bg-gradient-to-br from-slate-50 to-white rounded-t-2xl">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <RiUser3Line className="text-indigo-600" size={22} />
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-slate-900 truncate">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-xs text-slate-500 truncate">
              {user.email}
            </div>

            {user.referralCode && (
              <div className="mt-2 inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-700">
                Referral Code: {user.referralCode}
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 flex items-center gap-2 text-xs">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold ${
              isPremium
                ? "bg-amber-400 text-black"
                : "bg-slate-200 text-slate-800"
            }`}
          >
            {isPremium && <RiVipCrown2Line size={14} />}
            {isPremium ? "Premium Plan" : "Free Trial"}
          </span>

          <span className="px-2.5 py-1 rounded-full bg-slate-100 font-mono text-slate-700">
            {remainingTime}
          </span>
        </div>
      </div>

      {/* ───────── Menu ───────── */}
      <div className="p-2">
        <MenuItem
          icon={<RiDashboardLine size={18} />}
          onClick={() => go("/dbhome")}
        >
          Dashboard
        </MenuItem>

        {!isPremium && (
          <MenuItem
            highlight
            icon={<RiVipCrown2Line size={18} className="text-amber-500" />}
            onClick={() => go("/priceing")}
          >
            Upgrade to Plus
          </MenuItem>
        )}

        

        <div className="my-2 h-px bg-slate-200" />

        <MenuItem
          danger
          icon={<RiLogoutBoxRLine size={18} />}
          onClick={handleLogout}
        >
          Sign Out
        </MenuItem>
      </div>
    </div>
  );
}

/* ───────── Menu Item ───────── */
function MenuItem({
  children,
  onClick,
  icon,
  danger = false,
  highlight = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
  highlight?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : highlight
          ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      {icon}
      <span className="flex-1 text-left">{children}</span>
    </button>
  );
}
