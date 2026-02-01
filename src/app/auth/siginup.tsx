"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiTag,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";
import { useSignupMutation } from "../../redux/features/authApi";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  referralCode?: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [signup, { isLoading, error }] = useSignupMutation();

  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    referralCode: "",
  });

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  /* -------------------- HANDLERS -------------------- */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signup(formData).unwrap();

      localStorage.setItem("verify_email", formData.email);
      toast.success("OTP sent to your email");
      navigate("/verify-otp");
    } catch (err: any) {
      let message = "Signup failed";

      // ✅ RTK Query error handling (JSON)
      if (err?.data?.message) {
        message = err.data.message;
      }
      // ✅ HTML / text error handling
      else if (typeof err?.data === "string") {
        if (err.data.includes("Email already in use")) {
          message = "This email is already in use";
        }
      }
      // ✅ Fallback (network / unknown)
      else if (err?.error) {
        message = err.error;
      }

      toast.error(message);
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
          className="w-full max-w-2xl z-10"
        >
          {/* Main Card */}
          <div className="bg-white rounded-xl  border-[1px] border-indigo-500 overflow-hidden">
            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <Link
                  to="/"
                  className="inline-block mb-4 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://i.ibb.co/Y75Y5NSb/banner.gif"
                    alt="Cross Careers"
                    className="h-10 object-contain mx-auto"
                  />
                </Link>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Create Account
                </h1>
                <p className="text-slate-500 text-sm mt-2">
                  Join us today! Enter your details below.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* First Name */}
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700 ml-1">
                      First Name
                    </label>
                    <div
                      className={`relative group transition-all duration-300 rounded-xl border ${focusedInput === "firstName" ? "border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]" : "border-slate-200 bg-slate-50"}`}
                    >
                      <div
                        className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${focusedInput === "firstName" ? "text-indigo-600" : "text-slate-400"}`}
                      >
                        <FiUser size={20} />
                      </div>
                      <input
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={() => setFocusedInput("firstName")}
                        onBlur={() => setFocusedInput(null)}
                        className="w-full pl-11 pr-4 py-3 bg-transparent rounded-xl outline-none text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                        placeholder="John"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700 ml-1">
                      Last Name
                    </label>
                    <div
                      className={`relative group transition-all duration-300 rounded-xl border ${focusedInput === "lastName" ? "border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]" : "border-slate-200 bg-slate-50"}`}
                    >
                      <div
                        className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${focusedInput === "lastName" ? "text-indigo-600" : "text-slate-400"}`}
                      >
                        <FiUser size={20} />
                      </div>
                      <input
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={() => setFocusedInput("lastName")}
                        onBlur={() => setFocusedInput(null)}
                        className="w-full pl-11 pr-4 py-3 bg-transparent rounded-xl outline-none text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
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
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput("email")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full pl-11 pr-4 py-3 bg-transparent rounded-xl outline-none text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Password
                  </label>
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
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput("password")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full pl-11 pr-12 py-3 bg-transparent rounded-xl outline-none text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      placeholder="••••••••"
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

                {/* Referral Code */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Referral Code{" "}
                    <span className="text-slate-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div
                    className={`relative group transition-all duration-300 rounded-xl border ${focusedInput === "referralCode" ? "border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]" : "border-slate-200 bg-slate-50"}`}
                  >
                    <div
                      className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${focusedInput === "referralCode" ? "text-indigo-600" : "text-slate-400"}`}
                    >
                      <FiTag size={20} />
                    </div>
                    <input
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput("referralCode")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full pl-11 pr-4 py-3 bg-transparent rounded-xl outline-none text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      placeholder="REF123"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-indigo-600 text-white rounded-xl font-bold py-3.5 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:bg-indigo-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <FiArrowRight size={18} />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>

            {/* Footer Section of Card */}
            <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
              <p className="text-slate-600 text-sm">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors hover:underline"
                >
                  Sign in
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
