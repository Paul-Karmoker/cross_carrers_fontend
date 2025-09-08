import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSignupMutation } from "../context/authApi";
import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiCheck,
  FiTag,
} from "react-icons/fi";
import PaymentModal from "../Membership/paymentmodel";

export default function Signup() {
  const [signup, { isLoading, error }] = useSignupMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    referralCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    userId: "",
    userName: "",
    amount: 0,
    plan: "",
    durationLabel: "",
  });

  const handlePaymentSuccess = () => {
  toast.success("Payment successful! Your premium account is now active.");
  navigate("/dashboard");
};

  const pricingOptions = {
    free: {
      title: "Free Trial",
      price: "0",
      period: "7 days",
      features: [
        "Full content access -",
        "Interview Practice",
        "Written Test Practice",
        "Resume Building",
        "Match & Insights",
      ],
      cta: "Start Free Trial",
    },
    paid: {
      title: "Premium",
      prices: {
        monthly: { amount: "79", label: "monthly" },
        quarterly: { amount: "230", label: "quarterly" },
        semiannual: { amount: "450", label: "semiannual" },
        yearly: { amount: "750", label: "yearly" },
      },
      features: [
        "Full content access -",
        "Interview Practice",
        "Written Test Practice",
        "Resume Building",
        "Match & Insights",
      ],
      cta: "Get Premium",
    },
  };

  const billingCycles = [
    { id: "monthly", label: "monthly" },
    { id: "quarterly", label: "quarterly" },
    { id: "semiannual", label: "semiannual" },
    { id: "yearly", label: "yearly" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await signup({
        ...formData,
        plan: selectedPlan,
        billingCycle: selectedPlan === "paid" ? billingCycle : undefined,
      });

      if (result.error) {
        throw new Error(result.error.data?.message || "Signup failed");
      }

      const userId = result.data?.user?._id || result.data?.user?.id;


      if (selectedPlan === "free") {
        toast.success("Welcome! Your free trial is active");
        navigate("/signin"); // Redirect to login page
        return;
      }

      const planInfo = pricingOptions.paid.prices[billingCycle];
      setPaymentDetails({
     userId,
     subscriptionPlan: billingCycle,
     amount: Number(planInfo.amount),
});
      setShowPaymentModal(true);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.message || "An error occurred during signup");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: { y: -5 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 md:p-8 mt-20">
      <motion.div
        initial="initial"
        animate="animate"
        variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
      >
        {/* LEFT: Plan Selection */}
        <div className="w-full lg:w-2/5 bg-gradient-to-b from-indigo-900 to-indigo-700 text-white p-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-indigo-200 mb-6">Select the perfect option for your needs</p>

          <div className="bg-indigo-800/30 rounded-xl p-1 mb-8 grid grid-cols-4 gap-1">
            {billingCycles.map((cycle) => (
              <button
                key={cycle.id}
                onClick={() => setBillingCycle(cycle.id)}
                disabled={selectedPlan === "free"}
                className={`py-2 px-1 text-sm rounded-lg transition-all ${
                  billingCycle === cycle.id && selectedPlan !== "free"
                    ? "bg-white text-indigo-800 font-medium shadow-sm"
                    : "text-indigo-200 hover:text-white disabled:opacity-50"
                }`}
              >
                {cycle.label}
              </button>
            ))}
          </div>

          <div className="space-y-5">
            {Object.entries(pricingOptions).map(([key, plan]) => (
              <motion.div
                key={key}
                variants={cardVariants}
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
                      ৳{key === "free" ? plan.price : plan.prices[billingCycle].amount}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="mt-0.5 mr-2 text-indigo-300" />
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

        {/* RIGHT: Signup Form */}
        <div className="w-full lg:w-3/5 p-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Create Your Account
            </h1>
            <p className="text-gray-500 text-center mb-6">
              {selectedPlan === "free"
                ? "Start your 7-day free trial today"
                : "Get started with premium access"}
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                {["firstName", "lastName"].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {field === "firstName" ? "First Name" : "Last Name"}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        id={field}
                        name={field}
                        type="text"
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={formData[field]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Email, Password, Referral */}
              {[
                {
                  id: "email",
                  type: "email",
                  icon: <FiMail className="text-gray-400" />,
                  placeholder: "your@email.com",
                  required: true,
                },
                {
                  id: "password",
                  type: "password",
                  icon: <FiLock className="text-gray-400" />,
                  placeholder: "••••••••",
                  required: true,
                  minLength: 6,
                },
                {
                  id: "referralCode",
                  type: "text",
                  icon: <FiTag className="text-gray-400" />,
                  placeholder: "5-digit code",
                  required: false,
                },
              ].map(({ id, type, icon, placeholder, required, minLength }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {id === "referralCode"
                      ? "Referral Code (optional)"
                      : id.charAt(0).toUpperCase() + id.slice(1)}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {icon}
                    </div>
                    <input
                      id={id}
                      name={id}
                      type={type}
                      placeholder={placeholder}
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={formData[id]}
                      onChange={handleChange}
                      required={required}
                      minLength={minLength}
                    />
                  </div>
                  {id === "password" && (
                    <p className="mt-1 text-xs text-gray-500">
                      Minimum 6 characters
                    </p>
                  )}
                </div>
              ))}

              {error && (
                <p className="text-red-500 text-sm text-center">
                  {error.data?.message || "An error occurred. Please try again."}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-md flex items-center justify-center transition-all disabled:opacity-50"
              >
                {isSubmitting || isLoading ? (
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {selectedPlan === "free" ? "Start Free Trial" : "Get Premium Access"}
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/signin" className="text-indigo-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Payment Modal */}
     <PaymentModal
  isOpen={showPaymentModal}
  onClose={() => setShowPaymentModal(false)}
  paymentDetails={paymentDetails}
  onPaymentSuccess={handlePaymentSuccess}  // নতুন যোগ করা
/>
    </div>
  );
}