import React, { useEffect, useState, useRef, FormEvent } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGetProfileQuery, logout } from "../../../redux/features/authApi";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiShieldStarLine,
  RiMenu3Line,
  RiCloseLine,
  RiArrowDownSLine,
  RiDashboardLine,
} from "react-icons/ri";
import { FiLogOut, FiLogIn } from "react-icons/fi";

// --- Types & Interfaces ---

interface SubNavItem {
  label: string;
  path: string;
  restricted?: boolean;
  hidden?: boolean;
}

interface NavItem {
  label: string;
  path?: string;
  key?: string;
  type: "link" | "dropdown";
  items?: SubNavItem[];
  restricted?: boolean;
  hidden?: boolean;
}

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

// --- Navigation Configuration ---
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
  const user: User | undefined = data?.user;
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const [sticky, setSticky] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>(
    {}
  );

  const navRef = useRef<HTMLDivElement>(null);

  // Scroll Handling
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileExpanded({});
    setActiveDropdown(null);
  }, [location]);

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Utility Functions ---

  const isRestricted = (path?: string): boolean => {
    if (!path) return false;
    const flatItems = NAV_CONFIG.flatMap((n) => n.items);
    const configItem = flatItems.find((i) => i?.path === path);
    return !!(configItem?.restricted && !user);
  };

  const handleRestrictedClick = (e: React.MouseEvent, path?: string) => {
    if (isRestricted(path)) {
      e.preventDefault();
      navigate("/signin", { state: { from: path } });
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileAccordion = (key: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // --- Internal Components ---

  const Logo: React.FC = () => (
    <Link to="/" className="block">
      <img
        src="https://i.ibb.co/Y75Y5NSb/banner.gif"
        alt="Cross Careers"
        className="h-8 md:h-10 object-contain"
      />
    </Link>
  );

  const UserAvatar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const initials = (user?.firstName?.[0] || "") + (user?.lastName?.[0] || "");

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center shadow-md border-2 border-white focus:outline-none"
        >
          {initials.toUpperCase() || "U"}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-black ring-opacity-5 origin-top-right"
            >
              <div className="px-4 py-3 bg-gray-50 border-b">
                <p className="text-sm font-bold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    navigate("/dbhome");
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <RiDashboardLine /> Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <div
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          sticky
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-gradient-to-r from-indigo-50 to-purple-50 py-3 md:py-4"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
            >
              <RiMenu3Line size={24} />
            </button>
            <Logo />
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_CONFIG.map((item, idx) => {
              if (item.hidden) return null;

              if (item.type === "link") {
                const locked = item.restricted && !user;
                return (
                  <Link
                    key={idx}
                    to={item.path || "#"}
                    onClick={(e) =>
                      locked && handleRestrictedClick(e, item.path)
                    }
                    className={`text-[15px] font-medium transition-colors flex items-center gap-1 ${
                      locked
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:text-indigo-600"
                    }`}
                  >
                    {item.label}
                    {locked && <RiShieldStarLine className="text-orange-400" />}
                  </Link>
                );
              }

              if (item.type === "dropdown") {
                return (
                  <div
                    key={item.key}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.key || null)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1 text-[15px] font-medium py-2 ${
                        activeDropdown === item.key
                          ? "text-indigo-600"
                          : "text-gray-700 hover:text-indigo-600"
                      }`}
                    >
                      {item.label} <RiArrowDownSLine />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.key && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-0 w-60 bg-white shadow-xl rounded-lg border border-gray-100 overflow-hidden z-50"
                        >
                          {item.items?.map((sub, sIdx) => {
                            if (sub.hidden) return null;
                            const locked = sub.restricted && !user;
                            return (
                              <Link
                                key={sIdx}
                                to={sub.path}
                                onClick={(e) =>
                                  locked && handleRestrictedClick(e, sub.path)
                                }
                                className={`block px-4 py-2.5 text-sm hover:bg-gray-50 ${
                                  locked
                                    ? "text-gray-400 cursor-not-allowed flex justify-between"
                                    : "text-gray-700"
                                }`}
                              >
                                {sub.label}
                                {locked && (
                                  <RiShieldStarLine className="text-orange-400 inline ml-2" />
                                )}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div>
            {isLoading ? (
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            ) : user ? (
              <UserAvatar />
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                <FiLogIn /> Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- MOBILE SIDE DRAWER MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[100] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
                <span className="font-bold text-lg text-indigo-700">
                  <Link to="/" className="block">
                    <img
                      src="https://i.ibb.co/Y75Y5NSb/banner.gif"
                      alt="Cross Careers"
                      className="h-8 md:h-8 object-contain"
                    />
                  </Link>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-white rounded-full text-gray-500 shadow-sm border border-gray-100 hover:text-red-500"
                >
                  <RiCloseLine size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {NAV_CONFIG.map((item, idx) => {
                  if (item.hidden) return null;

                  if (item.type === "link") {
                    const locked = item.restricted && !user;
                    return (
                      <Link
                        key={idx}
                        to={item.path || "#"}
                        onClick={(e) => {
                          if (locked) handleRestrictedClick(e, item.path);
                          else setMobileMenuOpen(false);
                        }}
                        className={`block px-4 py-3 rounded-lg text-[15px] font-medium mb-1 ${
                          locked
                            ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          {item.label}
                          {locked && (
                            <RiShieldStarLine className="text-orange-400" />
                          )}
                        </div>
                      </Link>
                    );
                  }

                  if (item.type === "dropdown" && item.key) {
                    const isExpanded = mobileExpanded[item.key];
                    return (
                      <div key={item.key} className="mb-1">
                        <button
                          onClick={() => toggleMobileAccordion(item.key!)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                            isExpanded
                              ? "bg-indigo-50 text-indigo-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {item.label}
                          <RiArrowDownSLine
                            className={`transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pr-2 py-2 space-y-1 border-l-2 border-indigo-100 ml-4 my-1">
                                {item.items?.map((sub, sIdx) => {
                                  if (sub.hidden) return null;
                                  const locked = sub.restricted && !user;
                                  return (
                                    <Link
                                      key={sIdx}
                                      to={sub.path}
                                      onClick={(e) => {
                                        if (locked)
                                          handleRestrictedClick(e, sub.path);
                                        else setMobileMenuOpen(false);
                                      }}
                                      className={`block px-3 py-2.5 rounded-md text-sm ${
                                        locked
                                          ? "text-gray-400 flex justify-between"
                                          : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                                      }`}
                                    >
                                      {sub.label}
                                      {locked && (
                                        <RiShieldStarLine className="text-orange-400 text-xs" />
                                      )}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {!user && (
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  <button
                    onClick={() => {
                      navigate("/signin");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow-lg active:scale-95 transition-transform flex justify-center items-center gap-2"
                  >
                    <FiLogIn /> Sign In
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
