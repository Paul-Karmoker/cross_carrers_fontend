import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";

import {
  useLoginMutation,
  useGetGoogleAuthUrlQuery,
  useGetFacebookAuthUrlQuery,
  useGetLinkedInAuthUrlQuery,
} from "../../redux/features/authApi";

interface AuthError {
  data?: {
    message?: string;
  };
}

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [login, { isLoading: isSubmitting, error }] = useLoginMutation();
  const { data: googleAuthUrl } = useGetGoogleAuthUrlQuery();
  const { data: facebookAuthUrl } = useGetFacebookAuthUrlQuery();
  const { data: linkedInAuthUrl } = useGetLinkedInAuthUrlQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const authErr = error as AuthError;
      toast.error(authErr.data?.message || "Login failed. Please try again.");
    }
  }, [error]);

  const handleSocialLogin = (url: string | undefined, fallback: string) => {
    window.location.href = url || fallback;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />

      <main className="flex-grow  mt-8 flex items-center justify-center p-4 py-20 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-50 via-white to-indigo-50/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[460px]"
        >
          {/* Main Card */}
          <div className="relative group bg-white/70 backdrop-blur-2xl rounded-xl  border border-indigo-300 hover:border-indigo-300 transition-all duration-300">
            {/* Subtle Top Glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

            <div className="p-8 md:p-12">
              <header className="text-center mb-10">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                  Sign In
                </h1>
                <p className="text-slate-500 flex justify-center items-center gap-2 font-medium text-sm">
                  <span>Welcome back to</span>
                  <span className="text-indigo-600 font-bold">
                    <Link to="/" className="block">
                      <img
                        src="https://i.ibb.co/Y75Y5NSb/banner.gif"
                        alt="Cross Careers"
                        className="h-8 md:h-8 object-contain"
                      />
                    </Link>
                  </span>
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700  tracking-wider ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      <FiMail size={18} />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-11 pr-4 py-3 bg-slate-100/50 hover:bg-slate-100/80 focus:bg-white border-2 border-transparent focus:border-indigo-500/20 rounded-2xl outline-none transition-all duration-300 placeholder:text-slate-400"
                      placeholder="e.g. james@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm text-gray-700 font-bold  tracking-wider">
                      Password
                    </label>
                    <Link
                      to="/forgetPassword"
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      <FiLock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-11 pr-12 py-3 bg-slate-100/50 hover:bg-slate-100/80 focus:bg-white border-2 border-transparent focus:border-indigo-500/20 rounded-2xl outline-none transition-all duration-300 placeholder:text-slate-400"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {/* Toggle Eye Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
                    >
                      {showPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-5">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden bg-indigo-600 text-white text-sm  rounded-full hover:bg-indigo-700 font-bold py-3  shadow-xl shadow-indigo-100 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <span>Continue</span>
                          <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </motion.button>
                </div>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black text-slate-400">
                    <span className="bg-white px-4">Instant Access</span>
                  </div>
                </div>

                {/* Social Logins */}
                <div className="grid grid-cols-3 gap-3">
                  <SocialButton
                    icon={<FcGoogle size={20} />}
                    label="Google"
                    onClick={() => handleSocialLogin(googleAuthUrl?.url, "...")}
                  />
                  <SocialButton
                    icon={<FaFacebook className="text-[#1877F2]" size={20} />}
                    label="Facebook"
                    onClick={() =>
                      handleSocialLogin(facebookAuthUrl?.url, "...")
                    }
                  />
                  <SocialButton
                    icon={<FaLinkedin className="text-[#0A66C2]" size={20} />}
                    label="LinkedIn"
                    onClick={() =>
                      handleSocialLogin(linkedInAuthUrl?.url, "...")
                    }
                  />
                </div>
              </form>
            </div>

            <div className="bg-slate-50 p-6 border-t rounded-b-xl border-slate-100 text-center">
              <p className="text-slate-500 font-semibold text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
                >
                  create account
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

function SocialButton({
  icon,
  onClick,
  label,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      onClick={onClick}
      aria-label={`Login with ${label}`}
      className="flex items-center justify-center py-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-200 hover:shadow-sm transition-all duration-200"
    >
      {icon}
    </motion.button>
  );
}
