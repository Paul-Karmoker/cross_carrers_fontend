import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FiUser, FiMail, FiLock, FiArrowRight, FiCheck } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FiTag } from 'react-icons/fi';

export default function ProfessionalSignupMembership() {
  // Signup form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    referralCode: "",
  });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Membership state
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("free");

  const pricingOptions = {
    free: {
      title: "freeTrial",
      price: "0",
      period: "7 days",
      features: [
        "Full platform access",
        "All premium features",
        "Cancel anytime",
        "No credit card required",
      ],
      cta: "Start Free Trial",
    },
    paid: {
      title: "premium",
      prices: {
        monthly: { amount: "52", perMonth: "52" },
        quarterly: { amount: "150", perMonth: "50", save: "Save 6" },
        halfYearly: { amount: "270", perMonth: "45", save: "Save 42" },
        yearly: { amount: "490", perMonth: "41", save: "Save 134" },
      },
      features: [
        "Unlimited content access",
        "Ad-free experience",
        "Priority customer support",
        "Exclusive content library",
        "Early feature access",
      ],
      cta: "Get Premium",
    },
  };

  const billingCycles = [
    { id: "monthly", label: "Monthly" },
    { id: "quarterly", label: "Quarterly" },
    { id: "halfYearly", label: "6 Months" },
    { id: "yearly", label: "Annual" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Sign up the user
      const signupRes = await axios.post("http://localhost:4001/auth/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        referralCode: formData.referralCode,
      });
      toast.success("Signup successful");

      // pull the new user’s ID out of the response
      const userId =
        signupRes.data.userId || signupRes.data._id || signupRes.data.id;

      // 2. If they chose premium, kick off bKash payment
      if (selectedPlan === "paid") {
        const amount = Number(pricingOptions.paid.prices[billingCycle].amount);
        const paymentBody = {
          userId,
          plan: billingCycle,
          amount,
          phoneNumber: "01315974775", // replace as needed
          paymentReference: `INV-${Date.now()}`, // or your own ref generator
        };

        const bkashRes = await axios.post(
          "http://localhost:4001/bkash/create",
          paymentBody
        );

        // assume the API returns a paymentUrl
        const { paymentUrl } = bkashRes.data;
        window.location.href = paymentUrl;
      } else {
        // 3. Free trial: just go to dashboard/sign‑in
        navigate("/signinhome");
        toast.success("Welcome! Your free trial is active");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "An error occurred during signup"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast(`Continue with ${provider}`, { icon: "🔐" });
    // Implement your social login logic here
  };

  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: { y: -5 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 md:p-8 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row -mt-6"
      >
        {/* Left Side - Membership Options */}
        <div className="w-full lg:w-2/5 bg-gradient-to-b from-indigo-900 to-indigo-700 text-white p-8 md:p-10">
          <div className="mb-5">
            <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
            <p className="text-indigo-200">
              Select the perfect option for your needs
            </p>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="bg-indigo-800/30 rounded-xl p-1 mb-8 grid grid-cols-4 gap-1">
            {billingCycles.map((cycle) => (
              <motion.button
                key={cycle.id}
                onClick={() => setBillingCycle(cycle.id)}
                whileTap={{ scale: 0.95 }}
                className={`py-2 px-1 text-sm rounded-lg transition-all ${
                  billingCycle === cycle.id
                    ? "bg-white text-indigo-800 font-medium shadow-sm"
                    : "text-indigo-200 hover:text-white"
                }`}
              >
                {cycle.label}
              </motion.button>
            ))}
          </div>

          {/* Pricing Cards */}
          <div className="space-y-5 -mt-4">
            {Object.entries(pricingOptions).map(([key, plan]) => (
              <motion.div
                key={key}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                onClick={() => setSelectedPlan(key)}
                className={`relative overflow-hidden rounded-xl p-6 border-2 transition-all cursor-pointer ${
                  selectedPlan === key
                    ? "border-white bg-indigo-600/20 shadow-lg"
                    : "border-indigo-700/50 hover:border-indigo-500"
                }`}
              >
                {key === "paid" && (
                  <div className="absolute top-1 right-3 bg-amber-400 text-indigo-900 px-2 py-1 text-xs font-bold rounded-md">
                    MOST POPULAR
                  </div>
                )}

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                    <p className="text-indigo-200 text-sm">
                      {key === "free" ? plan.period : `Billed ${billingCycle}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      ৳
                      {key === "free"
                        ? plan.price
                        : plan.prices[billingCycle].amount}
                    </p>
                    {key === "paid" && plan.prices[billingCycle].save && (
                      <p className="text-xs text-indigo-200">
                        {plan.prices[billingCycle].save}
                      </p>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="mt-0.5 mr-2 text-indigo-300 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`text-center py-2 px-4 rounded-lg font-medium text-sm ${
                    selectedPlan === key
                      ? "bg-white text-indigo-800"
                      : "bg-indigo-800/50 text-white"
                  }`}
                >
                  {selectedPlan === key ? "Selected" : plan.cta}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-3/5 p-8 md:p-10">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-500">
                {selectedPlan === "free"
                  ? "Start your 7-day free trial today"
                  : "Get started with premium access"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder=""
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder=""
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 6 characters
                </p>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="referralCode"
                >
                  Referral Code{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiTag className="text-gray-400" />
                  </div>
                  <input
                    id="referralCode"
                    name="referralCode"
                    type="text"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="5‑digit code"
                    value={formData.referralCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* ... your existing form inputs for firstName, lastName, email, password, referralCode */}
              {/* unchanged */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {selectedPlan === "free"
                      ? "Start Free Trial"
                      : "Get Premium Access"}{" "}
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </motion.button>

              {/* ... rest of your “Or sign up with” social buttons and links */}
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
