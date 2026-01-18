import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Link, useNavigate, To } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiShieldStarLine,
  RiMenu3Line,
  RiCloseLine,
  RiArrowDownSLine,
  RiDashboardLine,
  RiTimeLine,
  RiUser3Line,
} from "react-icons/ri";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { LuStar } from "react-icons/lu";
import { GiStarGate } from "react-icons/gi";

import { useGetProfileQuery, logout } from "../../../redux/features/authApi";
import { NavItem, User } from "@/types";

// ────────────────────────────────────────────────────────────────
// Navigation Configuration (filtered at render time)
// ────────────────────────────────────────────────────────────────
const NAV_CONFIG: NavItem[] = [
  { label: "Home", path: "/", type: "link" },

  {
    label: "Jobs Here",
    key: "jobs",
    type: "dropdown",
    items: [
      { label: "BDjobs Sites", path: "/bdjobs" },
      { label: "Int. Jobs Sites", path: "/intjobs" },
      { label: "NGO Jobs", path: "/ngo" },
      { label: "INGO Jobs", path: "/ingo" },
      { label: "UN-Jobs", path: "/un", restricted: true },
      { label: "Embassy Jobs", path: "/emb", restricted: true },
      { label: "Donor Jobs", path: "/donor", restricted: true },
    ],
  },

  {
    label: "Resume Kit",
    key: "resume",
    type: "dropdown",
    items: [
      { label: "Resume Maker", path: "/resume", restricted: true },
      { label: "Cover Letter Maker", path: "/coverhome" },
      { label: "Match & Insights", path: "/matchhome", restricted: true },
    ],
  },

  {
    label: "Candidate Kit",
    key: "candidate",
    type: "dropdown",
    items: [
      { label: "Training Sites", path: "/trainings" },
      { label: "Written Test", path: "/writtenTest" },
      { label: "Interview Practice", path: "/InterviewSimulator", restricted: true },
      { label: "Interview Questions", path: "/qahome", restricted: true },
    ],
  },

  {
    label: "Services Kit",
    key: "services",
    type: "dropdown",
    items: [
      { label: "PowerPoint Maker", path: "/ppthome", restricted: true },
      { label: "Document Maker", path: "/dochome", restricted: true },
      // { label: "Excel Format Maker", path: "/excelhome", restricted: true, hidden: true },
    ],
  },
];

// ────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────
interface NavItemProps {
  item: NavItem;
  activeDropdown: string | null;
  setActiveDropdown: Dispatch<SetStateAction<string | null>>;
  user?: User; // optional → most important fix
  onRestrictedClick: (e: React.MouseEvent, path?: string) => void;
}

interface MobileMenuProps {
  navItems: NavItem[];
  user?: User; // optional
  isPremium: boolean;
  onClose: () => void;
  onRestrictedClick: (e: React.MouseEvent, path?: string) => void;
}

// ────────────────────────────────────────────────────────────────
// Components
// ────────────────────────────────────────────────────────────────

const Navbar: React.FC = () => {
  const { data, isLoading } = useGetProfileQuery();
  const user = data?.user as User | undefined;

  const navigate = useNavigate();

  const [sticky, setSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);

  const isPremium = user?.subscriptionType === "premium" && user?.subscriptionStatus === "active";

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const calculateTimeLeft = (): string => {
      const targetDate = isPremium ? user?.subscriptionExpiresAt : user?.freeTrialExpiresAt;
      if (!targetDate) return "—";

      const expiry = new Date(targetDate).getTime();
      const diff = expiry - Date.now();

      if (diff <= 0) return "Expired";

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);

      return `${days}d ${hours}h ${minutes}m`;
    };

    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000);
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [user, isPremium]);

  // Sticky navbar
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRestrictedClick = (e: React.MouseEvent, path?: string) => {
    if (path && !user) {
      e.preventDefault();
      navigate("/signin", { state: { from: window.location.pathname + window.location.search } });
    }
  };

  return (
    <>
      {/* ─── NAVBAR ─────────────────────────────────────────────── */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          sticky
            ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100/70 py-2.5"
            : "bg-gradient-to-b from-white/40 to-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo + Mobile toggle */}
          <div className="flex items-center gap-5">
            <button
              className="lg:hidden text-slate-800 -ml-2 p-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle menu"
            >
              <RiMenu3Line size={26} />
            </button>

            <Link to="/" className="block transition-transform hover:scale-[1.02] active:scale-95">
              <img
                src="https://i.ibb.co/Y75Y5NSb/banner.gif"
                alt="Cross Careers"
                className="h-9 sm:h-10 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_CONFIG.map((item) =>
              item.hidden ? null : (
                <NavItemComponent
                  key={item.key ?? item.path}
                  item={item}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  user={user}
                  onRestrictedClick={handleRestrictedClick}
                />
              )
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-5 sm:gap-7">
            {!isPremium && showUpgradeBanner && (
              <div className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-700 text-white text-xs font-bold uppercase tracking-wider rounded-full pl-5 pr-2 py-1.5 shadow-md">
                <span>Get Plus</span>
                <button
                  onClick={() => navigate("/priceing")}
                  className="bg-white text-indigo-700 rounded-full p-1.5 hover:bg-indigo-50 transition-colors"
                  aria-label="Upgrade plan"
                >
                  <GiStarGate size={18} />
                </button>
                <button
                  onClick={() => setShowUpgradeBanner(false)}
                  className="p-1 text-white/70 hover:text-white transition-colors"
                  aria-label="Dismiss banner"
                >
                  <RiCloseLine size={20} />
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="w-10 h-10 bg-slate-200/70 animate-pulse rounded-full" />
            ) : user ? (
              <UserMenu user={user} isPremium={isPremium} timeLeft={timeLeft} />
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="px-6 py-2.5 bg-slate-900 hover:bg-indigo-700 text-white text-sm font-bold uppercase tracking-wider rounded-full transition-all shadow-sm hover:shadow-md"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ─── MOBILE MENU ────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            navItems={NAV_CONFIG}
            user={user}
            isPremium={isPremium}
            onClose={() => setMobileMenuOpen(false)}
            onRestrictedClick={handleRestrictedClick}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// ────────────────────────────────────────────────────────────────
// Nav Item (Desktop)
// ────────────────────────────────────────────────────────────────
function NavItemComponent({
  item,
  activeDropdown,
  setActiveDropdown,
  user,
  onRestrictedClick,
}: NavItemProps) {
  const isActive = activeDropdown === item.key;

  if (item.type === "link" && item.path) {
    return (
      <Link
        to={item.path as To}
        className="text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-indigo-600 transition-colors py-2 px-1"
      >
        {item.label}
      </Link>
    );
  }

  if (!item.key || !item.items) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setActiveDropdown(item.key)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <button
        type="button"
        className={`flex items-center gap-1.5 py-2 px-1 text-sm font-bold uppercase tracking-wider transition-colors ${
          isActive ? "text-indigo-600" : "text-slate-700 hover:text-indigo-600"
        }`}
      >
        {item.label}
        <RiArrowDownSLine className={`transition-transform ${isActive ? "rotate-180" : ""}`} size={18} />
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 pt-2 z-50"
          >
            <div className="bg-white border border-slate-200/70 shadow-xl rounded-xl min-w-[240px] py-1.5 overflow-hidden">
              {item.items.map((sub) =>
                sub.hidden ? null : (
                  <Link
                    key={sub.path}
                    to={sub.path as To}
                    onClick={(e) => onRestrictedClick(e, sub.path)}
                    className="flex items-center justify-between px-5 py-3 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    {sub.label}
                    {sub.restricted && !user && <RiShieldStarLine className="text-amber-500" size={18} />}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// User Menu (Dropdown)
// ────────────────────────────────────────────────────────────────
interface UserMenuProps {
  user: User;
  isPremium: boolean;
  timeLeft: string;
}

function UserMenu({ user, isPremium, timeLeft }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "U";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="group focus:outline-none"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 transition-all shadow-sm ${
            isPremium
              ? "bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 border-indigo-300 ring-2 ring-indigo-200/40"
              : "bg-slate-600 border-slate-300"
          }`}
        >
          {initials}
        </div>

        {isPremium && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-br from-yellow-400 to-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded-sm border border-white shadow-sm uppercase tracking-tighter">
            Plus
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100/80 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-xl font-bold border border-white/20">
                  {initials}
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold truncate text-base">
                    {user.firstName} {user.lastName}
                  </h4>
                  <p className="text-xs text-slate-300/90 truncate mt-0.5">{user.email}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 text-xs">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-slate-300 uppercase text-[10px] font-bold tracking-wider mb-1">Plan</div>
                  <div className="font-bold">{isPremium ? "Premium" : "Free Trial"}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-slate-300 uppercase text-[10px] font-bold tracking-wider mb-1 flex items-center gap-1.5">
                    <RiTimeLine size={13} /> Remaining
                  </div>
                  <div className="font-mono font-bold text-indigo-300">{timeLeft}</div>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="p-2">
              <MenuAction icon={<RiDashboardLine />} onClick={() => navigate("/dbhome")}>
                Dashboard
              </MenuAction>
              <MenuAction icon={<LuStar />} onClick={() => navigate("/priceing")}>
                Upgrade to Plus
              </MenuAction>
              <MenuAction icon={<RiUser3Line />} onClick={() => navigate("/profile")}>
                Account Settings
              </MenuAction>

              <div className="my-2 mx-3 h-px bg-slate-100" />

              <MenuAction icon={<FiLogOut />} onClick={logout} danger>
                Sign Out
              </MenuAction>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const MenuAction: React.FC<{
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}> = ({ icon, children, onClick, danger = false }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3.5 px-5 py-3.5 text-sm rounded-xl transition-colors ${
      danger
        ? "text-red-600 hover:bg-red-50 active:bg-red-100"
        : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
    }`}
  >
    <span className="text-slate-400">{icon}</span>
    <span>{children}</span>
  </button>
);

// ────────────────────────────────────────────────────────────────
// Mobile Sidebar Menu
// ────────────────────────────────────────────────────────────────
function MobileMenu({ navItems, user, isPremium, onClose, onRestrictedClick }: MobileMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 24, stiffness: 300 }}
        className="absolute inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <span className="text-xl font-bold text-slate-900">Menu</span>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-700 hover:text-slate-900">
            <RiCloseLine size={28} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-2">
          {navItems.map((item) =>
            item.hidden ? null : item.type === "link" && item.path ? (
              <Link
                key={item.path}
                to={item.path as To}
                className="block px-6 py-4 text-base font-medium text-slate-800 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                onClick={onClose}
              >
                {item.label}
              </Link>
            ) : (
              <div key={item.key} className="border-b border-slate-100 last:border-none">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-base font-medium text-slate-800"
                  onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key ?? null)}
                >
                  {item.label}
                  <RiArrowDownSLine
                    className={`transition-transform ${openDropdown === item.key ? "rotate-180" : ""}`}
                    size={20}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openDropdown === item.key && item.items && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden bg-slate-50"
                    >
                      <div className="py-1">
                        {item.items.map((sub) =>
                          sub.hidden ? null : (
                            <Link
                              key={sub.path}
                              to={sub.path as To}
                              onClick={(e) => {
                                onRestrictedClick(e, sub.path);
                                onClose();
                              }}
                              className="flex items-center justify-between px-9 py-3.5 text-base text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors"
                            >
                              {sub.label}
                              {sub.restricted && !user && <RiShieldStarLine className="text-amber-500" size={18} />}
                            </Link>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          )}
        </div>

        {/* Footer / Auth */}
        <div className="border-t border-slate-200 p-6 bg-slate-50 mt-auto">
          {user ? (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold truncate">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm text-slate-500">
                    {isPremium ? "Premium Plan" : "Free Trial"}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full py-3.5 bg-red-50 text-red-700 font-medium rounded-xl hover:bg-red-100 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onClose();
                navigate("/signin");
              }}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors text-lg"
            >
              Sign In
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Navbar;