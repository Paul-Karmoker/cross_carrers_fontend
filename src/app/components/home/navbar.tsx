import React, { useEffect, useState, useRef, JSX } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGetProfileQuery, logout } from "../../../redux/features/authApi";
import { motion, AnimatePresence } from "framer-motion";
import { GiStarGate } from "react-icons/gi";
import {
  RiShieldStarLine,
  RiMenu3Line,
  RiCloseLine,
  RiArrowDownSLine,
  RiDashboardLine,
  RiTimeLine,
  RiVipCrown2Fill,
  RiUser3Line,
} from "react-icons/ri";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { MdWorkspacePremium } from "react-icons/md";
import { NavItem, User } from "@/types";

// ... (Preserve your NAV_CONFIG here)
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

      {

        label: "Interview Practice",

        path: "/InterviewSimulator",

        restricted: true,

      },

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

      {

        label: "Excel Format Maker",

        path: "/excelhome",

        restricted: true,

        hidden: true,

      },

    ],

  },

  {

    label: "Career Coach",

    path: "/consult",

    type: "link",

    restricted: true,

    hidden: true,

  },

];
const Navbar: React.FC = () => {
  const { data, isLoading } = useGetProfileQuery();
  const user: User | undefined = data?.user as any;
  const navigate = useNavigate();
  const location = useLocation();

  const [sticky, setSticky] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showGetPlus, setShowGetPlus] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<string>("");

  const navRef = useRef<HTMLDivElement>(null);

  // Enterprise Subscription Logic
  const isPremium = user?.subscriptionType === "premium" && user?.subscriptionStatus === "active";

  useEffect(() => {
    const calculateTime = () => {
      // Determine which date to use based on user status
      const targetDateStr = isPremium 
        ? user?.subscriptionExpiresAt 
        : user?.freeTrialExpiresAt;

      if (!targetDateStr) return "N/A";

      const expiry = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const diff = expiry - now;

      if (diff <= 0) return "Expired";

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      return `${days}d ${hours}h ${minutes}m`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [user, isPremium]);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRestrictedClick = (e: React.MouseEvent, path?: string) => {
    if (path && !user) {
      e.preventDefault();
      navigate("/signin", { state: { from: path } });
    }
  };

  const UserAvatar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const initials = (user?.firstName?.[0] || "") + (user?.lastName?.[0] || "");

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center focus:outline-none group"
        >
          {/* Avatar with dynamic border */}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm border-2 shadow-sm transition-all duration-300 ${
            isPremium ? "bg-gradient-to-br from-indigo-600 to-violet-700 border-white ring-2 ring-indigo-100" : "bg-slate-500 border-white"
          }`}>
            {initials.toUpperCase() || "U"}
          </div>
          
          {/* Premium Badge Sticker */}
          {isPremium && (
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-yellow-400 text-slate-900 text-[8px] font-black px-1 rounded-sm border border-white shadow-sm uppercase tracking-tighter"
            >
              Plus
            </motion.div>
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              className="absolute right-0 mt-3 w-80 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden z-50 rounded-none"
            >
              {/* User Identity Section */}
              <div className="p-6 bg-slate-900 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center font-bold border border-white/20">
                    {initials.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate text-sm">{user?.firstName} {user?.lastName}</h4>
                    <p className="text-[11px] text-slate-400 truncate tracking-tight">{user?.email}</p>
                  </div>
                </div>

                {/* Subscription Meta */}
                <div className="mt-5 p-3 bg-white/5 border border-white/10 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 ${isPremium ? "bg-indigo-500 text-white" : "bg-slate-700 text-slate-300"}`}>
                      {isPremium ? "PRO PLAN" : "FREE TRIAL"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <RiTimeLine /> Remaining
                    </span>
                    <span className="text-xs font-mono font-bold text-indigo-400">{timeLeft}</span>
                  </div>
                </div>
              </div>

              {/* Menu Actions */}
              <div className="p-2 bg-white">
                <button onClick={() => {navigate("/dbhome"); setIsOpen(false)}} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <RiDashboardLine className="text-slate-400" /> Dashboard
                </button>
                <button onClick={() => {navigate("/profile"); setIsOpen(false)}} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <RiUser3Line className="text-slate-400" /> Account Settings
                </button>
                <div className="h-px bg-slate-100 my-2 mx-4" />
                <button onClick={() => {logout(); setIsOpen(false)}} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium">
                  <FiLogOut /> Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        sticky ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-12 flex justify-between items-center">
        {/* Left: Brand */}
        <div className="flex items-center gap-4">
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-900">
            <RiMenu3Line size={24} />
          </button>
          <Logo />
        </div>

        {/* Center: Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_CONFIG.map((item, idx) => {
            if (item.hidden) return null;
            return (
              <div key={idx} className="relative group" onMouseEnter={() => setActiveDropdown(item.key || null)} onMouseLeave={() => setActiveDropdown(null)}>
                <div className="flex items-center gap-1.5 cursor-pointer py-2">
                  <span className={`text-[13px] font-bold uppercase tracking-wider transition-colors ${activeDropdown === item.key ? "text-indigo-600" : "text-slate-600"}`}>
                    {item.label}
                  </span>
                  {item.type === "dropdown" && <RiArrowDownSLine className={`transition-transform duration-300 ${activeDropdown === item.key ? "rotate-180 text-indigo-600" : "text-slate-400"}`} />}
                </div>
                {/* Enterprise Style Dropdown */}
                <AnimatePresence>
                  {activeDropdown === item.key && item.items && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute left-0 top-full pt-2 w-56">
                      <div className="bg-white border border-slate-200 shadow-xl p-2 rounded-none">
                        {item.items.map((sub, sIdx) => (
                          <Link key={sIdx} to={sub.path} className="flex justify-between items-center px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 uppercase tracking-tighter">
                            {sub.label}
                            {sub.restricted && !user && <RiShieldStarLine className="text-amber-500" />}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right: Actions & User */}
        <div className="flex items-center gap-4">
          {/* CTA with Close Button */}
          {!isPremium && showGetPlus && (
            <div className="hidden sm:flex items-center bg-indigo-600 text-white rounded-none pl-4 py-0.5 pr-0.5 gap-3 border border-indigo-700">
              <span className="text-[10px] font-black uppercase tracking-widest">Get Plus</span>
              <button onClick={() => navigate("/priceing")} className="bg-white text-indigo-600 p-1.5 hover:bg-indigo-50 transition-colors">
                <GiStarGate size={16} />
              </button>
              <button onClick={() => setShowGetPlus(false)} className="px-1.5 hover:text-indigo-200">
                <RiCloseLine size={18} />
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="w-10 h-10 bg-slate-100 animate-pulse rounded-none border border-slate-200" />
          ) : user ? (
            <UserAvatar />
          ) : (
            <button onClick={() => navigate("/signin")} className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all">
              <FiLogIn /> Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const Logo: React.FC = () => (
  <Link to="/" className="block transition-transform active:scale-95">
    <img src="https://i.ibb.co/Y75Y5NSb/banner.gif" alt="Cross Careers" className="h-8 md:h-9 object-contain" />
  </Link>
);

export default Navbar;