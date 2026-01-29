import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/features/authApi";
import { User } from "@/types";

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
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  /* ───────── Navigation helper ───────── */
  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  /* ───────── Logout handler (CORRECT) ───────── */
  const handleLogout = () => {
    onClose();
    logout(); // ✅ token remove + redirect handled here
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-80 rounded-2xl bg-white shadow-2xl border border-slate-100 z-[999]"
    >
      {/* ───── Header ───── */}
      <div className="p-5 border-b bg-slate-50 rounded-t-2xl">
        <div className="font-semibold text-slate-900">
          {user.firstName} {user.lastName}
        </div>
        <div className="text-xs text-slate-500 truncate">
          {user.email}
        </div>

        <div className="mt-4 flex gap-2 text-xs">
          <span
            className={`px-2 py-1 rounded font-semibold ${
              isPremium
                ? "bg-amber-400 text-black"
                : "bg-slate-200 text-slate-800"
            }`}
          >
            {isPremium ? "Premium" : "Free Trial"}
          </span>

          <span className="px-2 py-1 rounded bg-slate-200 font-mono">
            {remainingTime}
          </span>
        </div>
      </div>

      {/* ───── Menu ───── */}
      <div className="p-2">
        <MenuItem onClick={() => go("/dbhome")}>
          Dashboard
        </MenuItem>

        {!isPremium && (
          <MenuItem onClick={() => go("/priceing")}>
            Upgrade to Plus
          </MenuItem>
        )}

        <MenuItem onClick={() => go("/settings")}>
          Account Settings
        </MenuItem>

        <div className="my-2 h-px bg-slate-100" />

        <MenuItem danger onClick={handleLogout}>
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
  danger = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}
