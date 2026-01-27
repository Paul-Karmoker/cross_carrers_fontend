import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useForgotPasswordMutation } from "../../redux/features/authApi";
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";
interface ApiError {
  data?: {
    message?: string;
  };
}

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  

  const isValidEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();

      toast.success(
        "A password reset link has been sent to your email address."
      );

      setEmail("");

      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (err) {
      const apiError = err as ApiError;
      toast.error(
        apiError?.data?.message ||
          "Failed to send reset link. Please try again."
      );
    }
  };

  /* =======================
     UI
  ======================= */

  return (
    <>
      <Navbar />
      
    <div className=" h-[650px]  flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white p-8 border border-indigo-300 rounded-xl  space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Forgot Password?
          </h2>
          <p className="mt-2 font-medium  text-sm text-gray-500">
            Enter your email address and we’ll send you a password reset link.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-label="Forgot password form"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              aria-label="Email address"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="w-full relative overflow-hidden bg-indigo-600 text-white text-sm  rounded-full hover:bg-indigo-700 font-bold py-3  shadow-xl shadow-indigo-100 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            aria-label="Send reset link"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </motion.button>

          {/* Back to Sign In */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              aria-label="Back to sign in"
            >
              Back to Sign In
            </button>
          </div>
        </form>
      </motion.div>
    </div>
      <Footer/>
    </>
    
  );
};

export default ForgotPassword;
