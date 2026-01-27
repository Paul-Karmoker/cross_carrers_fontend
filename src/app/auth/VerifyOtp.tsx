import { motion } from "framer-motion";
import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiKey, FiArrowRight } from "react-icons/fi";
import { toast } from "react-hot-toast";

import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";
import { useOtpvarifyMutation } from "../../redux/features/authApi";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const email = localStorage.getItem("verify_email");
  const [verifyOtp, { isLoading }] = useOtpvarifyMutation();

  useEffect(() => {
    if (!email) {
      navigate("/signin");
    }
  }, [email, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await verifyOtp({ email: email!, otp }).unwrap();

      toast.success("Email verified successfully 🎉");

      localStorage.removeItem("verify_email");
      navigate("/signin");
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-20 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white border border-indigo-200 rounded-xl p-8"
        >
          <h1 className="text-2xl font-bold text-center mb-2">Verify Email</h1>

          <p className="text-center text-sm text-gray-500 mb-6">
            Enter the 6-digit OTP sent to your email
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FiKey className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter OTP"
                className="w-full pl-11 py-3 text-center tracking-widest font-bold rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex justify-center items-center gap-2"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
              <FiArrowRight />
            </motion.button>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
