import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../context/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogOut, FiLayout, FiLogIn } from 'react-icons/fi';

function Navbar() {
  const { user, logout } = useAuth();
  const [sticky, setSticky] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const navigate = useNavigate();

  // UserDropdown component
  const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    if (!user) return null;

    const getInitials = () => {
      if (!user.firstName && !user.lastName) return 'U';
      return `${user.firstName ? user.firstName[0] : ''}${user.lastName ? user.lastName[0] : ''}`;
    };

    return (
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {getInitials()}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
            >
              <div className="py-1">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-700">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    navigate('/dbhome');
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FiLayout className="mr-3 text-gray-400" />
                  Dashboard
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    navigate('/');
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FiLogOut className="mr-3 text-gray-400" />
                  Logout
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = (key, event) => {
    event.preventDefault();
    setOpenDropdown(openDropdown === key ? null : key);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && dropdownRefs.current[openDropdown] && 
          !dropdownRefs.current[openDropdown].contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleLogin = () => {
    // Store current path before redirecting to login
    const currentPath = window.location.pathname;
    if (currentPath !== "/signinhome") {
      navigate("/signinhome", { state: { from: currentPath } });
    } else {
      navigate("/signinhome");
    }
  };

  const handleRestrictedClick = (event, path) => {
    event.preventDefault();
    navigate("/signinhome", { state: { from: path } });
  };

  const isRestricted = (path) => {
    const restrictedPaths = ["/matchhome", "/resume-maker", "/un", "/emb", "/donor", "/qahome", "/careercoach", "/InterviewSimulator", "/ppthome", "/dochome" ];
    return restrictedPaths.includes(path) && !user;
  };

  const navItems = (
    <>
      <li>
        <Link to="/" className="hover:text-purple-500 transition duration-300">
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
            className="hover:text-purple-500 transition duration-300 cursor-pointer"
            onClick={(e) => handleDropdownToggle("jobs", e)}
          >
            Jobs Here
          </summary>
          <ul className="p-2 bg-white shadow-lg rounded-lg absolute left-0 min-w-[200px] z-10">
            <li><Link to="/bdjobs" className="hover:bg-gray-100 p-2 rounded-md block">BDjobs Sites</Link></li>
            <li><Link to="/intjobs" className="hover:bg-gray-100 p-2 rounded-md block">Int. Jobs Sites</Link></li>
            <li><Link to="/ngo" className="hover:bg-gray-100 p-2 rounded-md block">NGO Jobs</Link></li>
            <li><Link to="/ingo" className="hover:bg-gray-100 p-2 rounded-md block">INGO Jobs</Link></li>
            <li>
              <Link 
                to="/un" 
                className={`hover:bg-gray-100 p-2 rounded-md block ${
                  isRestricted("/un") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/un") ? (e) => handleRestrictedClick(e, "/un") : undefined}
              >
                UN-Jobs {isRestricted("/un") && <span className="text-yellow-500 ml-2">★</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/emb" 
                className={`hover:bg-gray-100 p-2 rounded-md block ${
                  isRestricted("/emb") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/emb") ? (e) => handleRestrictedClick(e, "/emb") : undefined}
              >
                Embassy Jobs {isRestricted("/emb") && <span className="text-yellow-500 ml-2">★</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/donor" 
                className={`hover:bg-gray-100 p-2 rounded-md block ${
                  isRestricted("/donor") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/donor") ? (e) => handleRestrictedClick(e, "/donor") : undefined}
              >
                Donor Jobs {isRestricted("/donor") && <span className="text-yellow-500 ml-2">★</span>}
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
            className="hover:text-purple-500 transition duration-300 cursor-pointer"
            onClick={(e) => handleDropdownToggle("resume", e)}
          >
            Resume Kit
          </summary>
          <ul className="p-2 bg-white shadow-lg rounded-lg absolute left-0 min-w-[200px] z-10">
            <li className="hidden">
              <Link 
                to="/resume-maker" 
                className={`hover:bg-gray-100 p-2 rounded-md block ${
                  isRestricted("/resume-maker") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/resume-maker") ? (e) => handleRestrictedClick(e, "/resume-maker") : undefined}
              >
                Resume Maker {isRestricted("/resume-maker") && <span className="text-yellow-500 ml-2">★</span>}
              </Link>
            </li>
            <li><Link to="/coverhome" className="hover:bg-gray-100 p-2 rounded-md block">Cover Letter Maker</Link></li>
            <li className="">
              <Link 
                to="/matchhome" 
                className={`hover:bg-gray-100 p-2 rounded-md block ${
                  isRestricted("/matchhome") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/matchhome") ? (e) => handleRestrictedClick(e, "/matchhome") : undefined}
              >
                Match & Insights {isRestricted("/matchhome") && <span className="text-yellow-500 ml-2">★</span>}
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
            className="hover:text-purple-500 transition duration-300 cursor-pointer"
            onClick={(e) => handleDropdownToggle("Candidate", e)}
          >
            Candidate Kit
          </summary>
          <ul className="p-2 bg-white shadow-lg rounded-lg absolute left-0 min-w-[200px] z-10">
            <li>
              <Link to="/trainings" className="hover:bg-gray-100 p-2 rounded-md block">Training sites</Link>
            </li>
            <li className="">
              <Link 
                to="/InterviewSimulator" 
                className={`hover:bg-gray-100 p-2 rounded-md block ${
                  isRestricted("/InterviewSimulator") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/InterviewSimulator") ? (e) => handleRestrictedClick(e, "/InterviewSimulator") : undefined}
              >
                Interview Practice  {isRestricted("/InterviewSimulator") && <span className="text-yellow-500 ml-2">★</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/qahome" 
                className={`hover:bg-gray-100 p-2 rounded-md block ${
                  isRestricted("/qahome") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/qahome") ? (e) => handleRestrictedClick(e, "/qahome") : undefined}
              >
                Interview Questions {isRestricted("/qahome") && <span className="text-yellow-500 ml-2">★</span>}
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
            className="hover:text-purple-500 transition duration-300 cursor-pointer"
            onClick={(e) => handleDropdownToggle("services", e)}
          >
            Services Kit
          </summary>
          <ul className="p-2 bg-white shadow-lg rounded-lg absolute left-0 min-w-[200px] z-10">
            <li className="">
              <Link 
                to="/ppthome" 
                className={`hover:bg-gray-100 p-2 rounded-md block ${
                  isRestricted("/ppthome") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/ppthome") ? (e) => handleRestrictedClick(e, "/ppthome") : undefined}
              >
                PowerPoint Maker {isRestricted("/ppthome") && <span className="text-yellow-500 ml-2">★</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/dochome" 
                className={`hover:bg-gray-100 p-2 rounded-md block ${
                  isRestricted("/dochome") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/dochome") ? (e) => handleRestrictedClick(e, "/dochome") : undefined}
              >
                Document Maker {isRestricted("/dochome") && <span className="text-yellow-500 ml-2">★</span>}
              </Link>
            </li>
            <li className="hidden">
              <Link 
                to="/excelhome" 
                className={` hover:bg-gray-100 p-2 rounded-md block ${
                  isRestricted("/excelhome") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/excelhome") ? (e) => handleRestrictedClick(e, "/excelhome") : undefined}
              >
                Excel Format Maker {isRestricted("/excelhome") && <span className="text-yellow-500 ml-2">★</span>}
              </Link>
            </li>
          </ul>
        </details>
      </li>

      {/* Career Consultant Link */}
      <li className="hidden">
      <Link 
                to="/consult" 
                className={`hover:bg-gray-100 p-2 rounded-md block ${
                  isRestricted("/consult") ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isRestricted("/consult") ? (e) => handleRestrictedClick(e, "/consult") : undefined}
              >
                Career Coach {isRestricted("/consult") && <span className="text-yellow-500 ml-2">★</span>}
              </Link>
      </li>
    </>
  );

  return (
    <div className={`max-w-screen-2xl z-50 container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 ${
      sticky ? "sticky-navbar shadow-md bg-white/90 backdrop-blur-sm" : "bg-transparent"
    }`}>
      <div className="navbar py-4">
        {/* Mobile menu button and logo */}
        <div className="navbar-start">
          <div className="dropdown lg:">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navItems}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold">
            <img src="./public/logo/logo.gif" className="w-40 h-auto" alt="Logo" />
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center  lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">
            {navItems}
          </ul>
        </div>

        {/* Auth section */}
        <div className="navbar-end">
          {user ? <UserDropdown /> : (
            <motion.button
              onClick={handleLogin}
              className="relative overflow- px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(99, 102, 241, 0.6)"
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ 
                boxShadow: "0 0 0 0 rgba(99, 102, 241, 0.4)",
                backgroundSize: "100% 100%"
              }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(99, 102, 241, 0.4)",
                  "0 0 10px 5px rgba(99, 102, 241, 0.4)",
                  "0 0 0 0 rgba(99, 102, 241, 0)"
                ],
                backgroundPosition: [
                  "0% 0%",
                  "100% 100%",
                  "0% 0%"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ 
                    y: [0, -3, 0, 3, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <FiLogIn className="text-base" />
                </motion.span>
                <motion.span
                  animate={{
                    opacity: [1, 0.8, 1],
                    transition: {
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut"
                    }
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