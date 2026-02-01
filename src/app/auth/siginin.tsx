import { motion } from "framer-motion";
import { useState, useEffect, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";

import { useLoginMutation } from "../../redux/features/authApi";

interface AuthError {
  data?: {
    message?: string;
  };
}

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Only keeping the standard Login Mutation
  const [login, { isLoading: isSubmitting, error }] = useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const authErr = error as AuthError;
      toast.error(authErr.data?.message || "Login failed. Please try again.");
    }
  }, [error]);

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
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-grow relative flex items-center justify-center p-4 py-20 lg:py-28 overflow-hidden">
        {/* Modern Grid Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.4] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_800px_at_50%_200px,#C7D2FE,transparent)] opacity-20"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
          className="w-full max-w-[440px] z-10"
        >
          {/* Main Card */}
          <div className="bg-white border border-indigo-500 rounded-xl  overflow-hidden">
            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="text-center mb-10">
                <Link
                  to="/"
                  className="inline-block mb-6 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://i.ibb.co/Y75Y5NSb/banner.gif"
                    alt="Cross Careers"
                    className="h-12 object-contain mx-auto"
                  />
                </Link>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Welcome back
                </h1>
                <p className="text-slate-500 text-sm mt-2">
                  Please enter your email and password to sign in.
                </p>
              </div>

              {/* Form - No Divider or Social Buttons anymore */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Email Address
                  </label>
                  <div
                    className={`relative group transition-all duration-300 rounded-xl border ${focusedInput === "email" ? "border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]" : "border-slate-200 bg-slate-50"}`}
                  >
                    <div
                      className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${focusedInput === "email" ? "text-indigo-600" : "text-slate-400"}`}
                    >
                      <FiMail size={20} />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-11 pr-4 py-3 bg-transparent rounded-xl outline-none text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      placeholder="e.g. james@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedInput("email")}
                      onBlur={() => setFocusedInput(null)}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-semibold text-slate-700">
                      Password
                    </label>
                    <Link
                      to="/forgetPassword"
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div
                    className={`relative group transition-all duration-300 rounded-xl border ${focusedInput === "password" ? "border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]" : "border-slate-200 bg-slate-50"}`}
                  >
                    <div
                      className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${focusedInput === "password" ? "text-indigo-600" : "text-slate-400"}`}
                    >
                      <FiLock size={20} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-11 pr-12 py-3 bg-transparent rounded-xl outline-none text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedInput("password")}
                      onBlur={() => setFocusedInput(null)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
                    >
                      {showPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 text-white rounded-xl font-bold py-3.5 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:bg-indigo-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <FiArrowRight size={18} />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>

            {/* Card Footer */}
            <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
              <p className="text-slate-600 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors hover:underline"
                >
                  Create account
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
