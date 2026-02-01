"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiArrowRight, FiTag } from "react-icons/fi";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* -------------------- HANDLERS -------------------- */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await signup(formData).unwrap();

      // store email for OTP verification
      localStorage.setItem("verify_email", formData.email);

      toast.success("OTP sent to your email");
      navigate("/verify-otp");
    } catch (err: any) {
      toast.error(err?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ======================== UI ======================== */
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white border border-indigo-500 rounded-xl"
        >
          <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-center mb-2">
              Create Your Account
            </h1>

            <p className="text-center text-gray-500 mb-6">
              Sign up to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                {(["firstName", "lastName"] as const).map((field) => (
                  <div key={field}>
                    <label className="text-sm font-medium">
                      {field === "firstName" ? "First Name" : "Last Name"}
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-3 text-gray-400" />
                      <input
                        name={field}
                        required
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full pl-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Referral Code */}
              <div>
                <label className="text-sm font-medium">
                  Referral Code (optional)
                </label>
                <div className="relative">
                  <FiTag className="absolute left-3 top-3 text-gray-400" />
                  <input
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleChange}
                    className="w-full pl-10 py-2.5 border rounded-lg"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">
                  {(error as any)?.data?.message ||
                    "Something went wrong"}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex justify-center items-center"
              >
                {isSubmitting ? "Processing..." : "Continue"}
                <FiArrowRight className="ml-2" />
              </button>

              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/signin" className="text-indigo-600 font-medium">
                  Sign in
                </Link>
              </p>

              <p className="text-center text-xs text-indigo-600">
                A 6-digit OTP will be sent to verify your email
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
