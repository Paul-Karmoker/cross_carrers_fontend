import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { 
  RiShieldStarLine, RiMenu3Line, RiCloseLine, 
  RiArrowDownSLine, RiDashboardLine 
} from "react-icons/ri";
import { FiLogOut, FiLogIn } from "react-icons/fi";

// API & Types
import { useGetProfileQuery, useLogoutMutation } from "@/redux/features/authApi";
import { NavItem, NavSubItem } from "@/app/types";

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
    ],
  },
];

const Navbar: React.FC = () => {
  const { data, isLoading } = useGetProfileQuery();
  const user = data;
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();

  // States
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Optimized Scroll Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 30) setIsScrolled(true);
    else setIsScrolled(false);
  });

  // Action Handlers
  const handleAuthRedirect = useCallback((path: string) => {
    navigate("/signin", { state: { from: path } });
    setMobileOpen(false);
  }, [navigate]);

  const toggleAccordion = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // --- Sub-Components ---
  
  const NavAction = () => (
    <div className="flex items-center gap-3">
      {isLoading ? (
        <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
      ) : user ? (
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate("/dbhome")}>
          <div className="hidden md:block text-right">
            <p className="text-[12px] font-bold text-gray-800 leading-none">{user.firstName}</p>
            <span className="text-[10px] text-indigo-500 font-medium">Dashboard</span>
          </div>
          <div className="h-10 w-10 rounded-full bg-indigo-600 border-2 border-white shadow-sm flex items-center justify-center text-white font-bold ring-1 ring-indigo-100">
            {data.firstName.toUpperCase()}
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/signin")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
        >
          <FiLogIn /> <span className="hidden sm:inline">Sign In</span>
        </button>
      )}
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-2" 
          : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-12 flex items-center justify-between">
          
          {/* Logo & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-gray-700 p-1">
              <RiMenu3Line size={26} />
            </button>
            <Link to="/" className="shrink-0 transition-transform active:scale-95">
              <img src="https://i.ibb.co/Y75Y5NSb/banner.gif" alt="Logo" className="h-8 md:h-10" />
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-2">
            {NAV_CONFIG.map((item) => {
              const isLocked = item.restricted && !user;
              if (item.type === "link") {
                return (
                  <Link
                    key={item.label}
                    to={item.path!}
                    onClick={(e) => isLocked && (e.preventDefault(), handleAuthRedirect(item.path!))}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                      location.pathname === item.path ? "text-indigo-600 bg-indigo-50" : "text-gray-600 hover:text-indigo-600"
                    }`}
                  >
                    {item.label} {isLocked && <RiShieldStarLine className="text-orange-400" />}
                  </Link>
                );
              }

              return (
                <div 
                  key={item.key} 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.key!)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition-all ${
                    activeDropdown === item.key ? "text-indigo-600 bg-indigo-50" : "text-gray-600"
                  }`}>
                    {item.label} <RiArrowDownSLine className={`transition-transform ${activeDropdown === item.key ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === item.key && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-1 w-56 bg-white border border-gray-100 shadow-xl rounded-2xl p-2 overflow-hidden"
                      >
                        {item.items?.map((sub) => {
                          const subLocked = sub.restricted && !user;
                          return (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              onClick={(e) => subLocked && (e.preventDefault(), handleAuthRedirect(sub.path))}
                              className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                            >
                              {sub.label} {subLocked && <RiShieldStarLine className="text-orange-400" />}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <NavAction />
        </div>
      </header>

      {/* --- Mobile Sidebar --- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[110]" 
            />
            <motion.div 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[120] shadow-2xl flex flex-col"
            >
              <div className="p-5 flex justify-between items-center border-b">
                <img src="https://i.ibb.co/Y75Y5NSb/banner.gif" alt="Logo" className="h-8" />
                <button onClick={() => setMobileOpen(false)} className="text-gray-400 p-1"><RiCloseLine size={28} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {NAV_CONFIG.map((item) => (
                  <div key={item.label}>
                    {item.type === "link" ? (
                      <Link
                        to={item.path!}
                        onClick={() => setMobileOpen(false)}
                        className="block p-3 rounded-xl font-semibold text-gray-700 hover:bg-indigo-50"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <div className="space-y-1">
                        <button 
                          onClick={() => toggleAccordion(item.key!)}
                          className={`w-full flex items-center justify-between p-3 font-semibold rounded-xl ${expanded[item.key!] ? "bg-indigo-50 text-indigo-600" : "text-gray-700"}`}
                        >
                          {item.label} <RiArrowDownSLine className={expanded[item.key!] ? "rotate-180" : ""} />
                        </button>
                        <AnimatePresence>
                          {expanded[item.key!] && (
                            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden pl-4">
                              {item.items?.map(sub => (
                                <Link 
                                  key={sub.path} to={sub.path} onClick={() => setMobileOpen(false)}
                                  className="block p-3 text-sm font-medium text-gray-500 hover:text-indigo-600"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {user && (
                <div className="p-4 border-t">
                  <button 
                    onClick={() => useLogoutMutation()}
                    className="w-full flex items-center justify-center gap-2 p-3 text-red-600 font-bold bg-red-50 rounded-xl"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;