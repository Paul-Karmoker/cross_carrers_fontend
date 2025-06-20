import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {  useGetprofileQuery } from "../context/authApi";
import { motion, AnimatePresence } from "framer-motion";
import { RiShieldStarLine } from "react-icons/ri";
import { FiLogOut, FiLayout, FiLogIn } from "react-icons/fi";
import {logout} from "../context/authApi";
function Navbar() {
  const { data, isLoading } = useGetprofileQuery();
  const user = data?.user; // API response structure: { 
 
  const [sticky, setSticky] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const navigate = useNavigate();

  // Handle sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicking outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdown &&
        dropdownRefs.current[openDropdown] &&
        !dropdownRefs.current[openDropdown].contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleDropdownToggle = (key, event) => {
    event.preventDefault();
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const handleLogin = () => {
    const currentPath = window.location.pathname;
    navigate("/signin", { state: { from: currentPath } });
  };

  const handleRestrictedClick = (event, path) => {
    event.preventDefault();
    navigate("/signin", { state: { from: path } });
  };

  const isRestricted = (path) => {
    const restrictedPaths = [
      "/matchhome",
      "/resume-maker",
      "/un",
      "/emb",
      "/donor",
      "/qahome",
      "/careercoach",
      "/InterviewSimulator",
      "/ppthome",
      "/dochome",
      "/excelhome",
      "/consult",
    ];
    return restrictedPaths.includes(path) && !user;
  };

  // UserDropdown Component
  const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    if (!user) return null;

    const getInitials = () => {
      const fi = user.firstName?.[0] ?? "";
      const li = user.lastName?.[0] ?? "";
      return (fi + li).toUpperCase() || "U";
    };

    return (
      <div className="relative">
        {/* Avatar + Badge Wrapper */}
        <div className="relative inline-block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {getInitials()}
          </motion.button>

          {(user.subscriptionType === "premium" || user.subscriptionType === "freeTrial") && (
            <span
              className={`
                absolute top-0 right-0 
                transform translate-x-1/2 -translate-y-1/2 
                bg-gradient-to-r ${user.subscriptionType === "premium" ? "from-yellow-400 to-orange-400" : "from-green-400 to-teal-400"} 
                text-xs font-bold px-2.5 py-1 rounded-full shadow-lg text-white
                border ${user.subscriptionType === "premium" ? "border-yellow-300" : "border-green-300"}
              `}
            >
              {user.subscriptionType === "premium" ? "PLUS" : "TRIAL"}
            </span>
          )}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-60 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50"
            >
              <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
                <p className="text-sm font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-600 truncate">{user.email}</p>
                <p className="text-xs font-medium text-gray-600">
                  Referral Code: <span className="font-bold text-purple-600">{user.referralCode}</span>
                </p>
                <p className="text-xs font-medium text-gray-600">
                  Subscription Plan: <span className="font-bold text-purple-600">{user.subscriptionPlan}</span>
                </p>
              </div>
              <div className="py-1 border-t border-gray-100">
                <motion.button
                  whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}
                  onClick={() => {
                    navigate("/dbhome");
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FiLayout className="mr-3 text-gray-500" />
                  Dashboard
                </motion.button>
                <motion.button
                  whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}
                 onClick={()=>{
                    navigate("/priceing");
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <RiShieldStarLine className="mr-3 text-gray-500" />
                  Upgrade your plan
                </motion.button>
                <motion.button
                  whileHover={{ x: 5, backgroundColor: "#f3f4f6" }}
                 onClick={logout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FiLogOut className="mr-3 text-gray-500" />
                  Logout
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const navItems = (
    <>
      <li>
        <Link to="/" className="hover:text-purple-400 text-[17px] transition duration-300 font-medium">
          Home
        </Link>
      </li>

      {/* Jobs Here Dropdown */}
      <li className="relative group">
        <details
          ref={(el) => (dropdownRefs.current["jobs"] = el)}
          open={openDropdown === "jobs"}
        >
          <summary
            className="hover:text-purple-400 text-[17px] transition duration-300 cursor-pointer font-medium"
            onClick={(e) => handleDropdownToggle("jobs", e)}
          >
            Jobs Here
          </summary>
          <ul className="p-3 bg-white shadow-xl rounded-lg absolute left-0 min-w-[220px] z-50">
            <li>
              <Link to="/bdjobs" className="hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-700">
                BDjobs Sites
              </Link>
            </li>
            <li>
              <Link to="/intjobs" className="hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-700">
                Int. Jobs Sites
              </Link>
            </li>
            <li>
              <Link to="/ngo" className="hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-700">
                NGO Jobs
              </Link>
            </li>
            <li>
              <Link to="/ingo" className="hover:bg-gray-100 p-2 text-[17px] rounded-md block text-gray-700">
                INGO Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/un"
                className={`hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-800 ${
                  isRestricted("/un") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/un") ? (e) => handleRestrictedClick(e, "/un") : undefined}
              >
                UN-Jobs {isRestricted("/un") && <RiShieldStarLine className="inline w-7 h-7 text-orange-500 ml-2" />}
              </Link>
            </li>
            <li>
              <Link
                to="/emb"
                className={`hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-700 ${
                  isRestricted("/emb") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/emb") ? (e) => handleRestrictedClick(e, "/emb") : undefined}
              >
                Embassy Jobs {isRestricted("/emb") && <RiShieldStarLine className="inline w-7 h-7 text-orange-500 ml-2" />}
              </Link>
            </li>
            <li>
              <Link
                to="/donor"
                className={`hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-700 ${
                  isRestricted("/donor") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/donor") ? (e) => handleRestrictedClick(e, "/donor") : undefined}
              >
                Donor Jobs {isRestricted("/donor") && <RiShieldStarLine className="inline w-7 h-7 text-orange-500 ml-2" />}
              </Link>
            </li>
          </ul>
        </details>
      </li>

      {/* Resume Build Dropdown */}
      <li className="relative group">
        <details
          ref={(el) => (dropdownRefs.current["resume"] = el)}
          open={openDropdown === "resume"}
        >
          <summary
            className="hover:text-purple-400 text-[17px] transition duration-300 cursor-pointer font-medium"
            onClick={(e) => handleDropdownToggle("resume", e)}
          >
            Resume Kit
          </summary>
          <ul className="p-3 bg-white shadow-xl rounded-lg absolute left-0 min-w-[220px] z-50">
            <li>
              <Link
                to="/resume-maker"
                className={`hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-700 ${
                  isRestricted("/resume-maker") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={
                  isRestricted("/resume-maker")
                    ? (e) => handleRestrictedClick(e, "/resume-maker")
                    : undefined
                }
              >
                Resume Maker {isRestricted("/resume-maker") && <RiShieldStarLine className="inline w-7 h-7 text-orange-500 ml-2" />}
              </Link>
            </li>
            <li>
              <Link to="/coverhome" className="hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-700">
                Cover Letter Maker
              </Link>
            </li>
            <li>
              <Link
                to="/matchhome"
                className={`hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-700 ${
                  isRestricted("/matchhome") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={
                  isRestricted("/matchhome") ? (e) => handleRestrictedClick(e, "/matchhome") : undefined
                }
              >
                Match & Insights {isRestricted("/matchhome") && <RiShieldStarLine className="inline w-7 h-7 text-orange-500 ml-2" />}
              </Link>
            </li>
          </ul>
        </details>
      </li>

      {/* Training Here Dropdown */}
      <li className="relative group">
        <details
          ref={(el) => (dropdownRefs.current["Candidate"] = el)}
          open={openDropdown === "Candidate"}
        >
          <summary
            className="hover:text-purple-400 text-[17px] transition duration-300 cursor-pointer font-medium"
            onClick={(e) => handleDropdownToggle("Candidate", e)}
          >
            Candidate Kit
          </summary>
          <ul className="p-3 bg-white shadow-xl rounded-lg absolute left-0 min-w-[220px] z-50">
            <li>
              <Link to="/trainings" className="hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-700">
                Training Sites
              </Link>
            </li>
            <li>
              <Link
                to="/InterviewSimulator"
                className={`hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-700 ${
                  isRestricted("/InterviewSimulator") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={
                  isRestricted("/InterviewSimulator")
                    ? (e) => handleRestrictedClick(e, "/InterviewSimulator")
                    : undefined
                }
              >
                Interview Practice {isRestricted("/InterviewSimulator") && <RiShieldStarLine className="inline w-7 h-7 text-orange-500 ml-2" />}
              </Link>
            </li>
            <li>
              <Link
                to="/qahome"
                className={`hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-700 ${
                  isRestricted("/qahome") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/qahome") ? (e) => handleRestrictedClick(e, "/qahome") : undefined}
              >
                Interview Questions {isRestricted("/qahome") && <RiShieldStarLine className="inline w-7 h-7 text-orange-500 ml-2" />}
              </Link>
            </li>
          </ul>
        </details>
      </li>

      {/* Services Here Dropdown */}
      <li className="relative group">
        <details
          ref={(el) => (dropdownRefs.current["services"] = el)}
          open={openDropdown === "services"}
        >
          <summary
            className="hover:text-purple-400 text-[17px] transition duration-300 cursor-pointer font-medium"
            onClick={(e) => handleDropdownToggle("services", e)}
          >
            Services Kit
          </summary>
          <ul className="p-3 bg-white shadow-xl rounded-lg absolute left-0 min-w-[220px] z-50">
            <li>
              <Link
                to="/ppthome"
                className={`hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-700 ${
                  isRestricted("/ppthome") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/ppthome") ? (e) => handleRestrictedClick(e, "/ppthome") : undefined}
              >
                PowerPoint Maker {isRestricted("/ppthome") && <RiShieldStarLine className="inline w-7 h-7 text-orange-500 ml-2" />}
              </Link>
            </li>
            <li>
              <Link
                to="/dochome"
                className={`hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-700 ${
                  isRestricted("/dochome") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/dochome") ? (e) => handleRestrictedClick(e, "/dochome") : undefined}
              >
                Document Maker {isRestricted("/dochome") && <RiShieldStarLine className="inline w-7 h-7 text-orange-500 ml-2" />}
              </Link>
            </li>
            <li>
              <Link
                to="/excelhome"
                className={`hover:bg-gray-100 text-[17px] p-2 rounded-md block text-gray-700 ${
                  isRestricted("/excelhome") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={
                  isRestricted("/excelhome") ? (e) => handleRestrictedClick(e, "/excelhome") : undefined
                }
              >
                Excel Format Maker {isRestricted("/excelhome") && <RiShieldStarLine className="inline w-7 h-7 text-orange-500 ml-2" />}
              </Link>
            </li>
          </ul>
        </details>
      </li>

      {/* Career Consultant Link */}
      <li className="hidden" >
        <Link
          to="/consult"
          className={`hover:text-purple-400 text-[17px] text-[17px] transition duration-300 font-medium ${
            isRestricted("/consult") ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={isRestricted("/consult") ? (e) => handleRestrictedClick(e, "/consult") : undefined}
        >
          Career Coach {isRestricted("/consult") && <RiShieldStarLine className="inline w-7 h-7 text-orange-500 ml-2" />}
        </Link>
      </li>
    </>
  );

  return (
    <div
      className={`max-w-screen-2xl z-50 container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 transition-all duration-300 ${
        sticky
          ? "shadow-lg bg-white/95 backdrop-blur-md"
          : "bg-gradient-to-r from-indigo-50 to-purple-50"
      }`}
    >

      <div className="navbar py-4">
        {/* Mobile Menu Button and Logo */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-white rounded-box w-64"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/" className="text-3xl font-bold text-indigo-600">
            <img src="https://i.ibb.co/279KyNKC/Logo.gif" className="w-44 h-auto" alt="Logo" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-6 text-gray-700">{navItems}</ul>
        </div>

        {/* Auth Section */}
        <div className="navbar-end">
          {isLoading ? (
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
          ) : user ? (
            <UserDropdown />
          ) : (
            <motion.button
              onClick={handleLogin}
              className="relative overflow-hidden px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(99, 102, 241, 0.6)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{
                boxShadow: "0 0 0 0 rgba(99, 102, 241, 0.4)",
              }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(99, 102, 241, 0.4)",
                  "0 0 12px 6px rgba(99, 102, 241, 0.4)",
                  "0 0 0 0 rgba(99, 102, 241, 0)",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{
                    y: [0, -3, 0, 3, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <FiLogIn className="text-lg" />
                </motion.span>
                <motion.span
                  animate={{
                    opacity: [1, 0.8, 1],
                    transition: {
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    },
                  }}
                >
                  Sign In
                </motion.span>
              </div>
              <motion.span
                className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"
                whileHover={{ opacity: 0.1 }}
              />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;