import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSignupMutation } from "../../redux/features/authApi";
import {
  SignupFormData,
  PaymentDetails,
  BillingCycle,
  PlanType,
} from "../components/signup/types";
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";
import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiCheck,
  FiTag,
} from "react-icons/fi";

import PaymentModal from "../components/signup/PaymentModal";

export default function Signup() {
  const [signup, { isLoading, error }] = useSignupMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    referralCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("free");
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    userId: "",
    subscriptionPlan: "monthly",
    amount: 0,
  });

  /* ─────────────────────────────
     Handlers
  ───────────────────────────── */

  const handlePaymentSuccess = () => {
    toast.success("Payment successful! Your premium account is now active.");
    navigate("/dashboard");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const signupPayload = {
        ...formData,
        plan: selectedPlan,
        ...(selectedPlan === "paid" && { billingCycle }),
      };

      const result = await signup(signupPayload);

      if ("error" in result && result.error) {
        throw new Error(
          (result.error as any)?.data?.message || "Signup failed"
        );
      }

      const userId =
        (result as any)?.data?.user?._id || (result as any)?.data?.user?.id;

      if (selectedPlan === "free") {
        // 🔐 store email for OTP verification (hidden context)
        localStorage.setItem("verify_email", formData.email);

        toast.success("OTP sent to your email");
        navigate("/verify-otp");
        return;
      }

      const planInfo = pricingOptions.paid.prices[billingCycle];

      setPaymentDetails({
        userId,
        subscriptionPlan: billingCycle,
        amount: Number(planInfo.amount),
      });

      setShowPaymentModal(true);
    } catch (err: any) {
      console.error("Signup error:", err);
      toast.error(err.message || "An error occurred during signup");
    } finally {
      setIsSubmitting(false);
    }
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

  const billingCycles: { id: BillingCycle; label: BillingCycle }[] = [
    { id: "monthly", label: "monthly" },
    { id: "quarterly", label: "quarterly" },
    { id: "semiannual", label: "semiannual" },
    { id: "yearly", label: "yearly" },
  ];

  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: { y: -5 },
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl bg-white border border-indigo-500 rounded-xl overflow-hidden flex flex-col lg:flex-row"
        >
          {/* LEFT: Plan Selection */}
          <div className="w-full lg:w-2/5 bg-gradient-to-b h-[740px] from-indigo-900 to-indigo-700 text-white p-8">
            <h1 className="text-2xl font-bold mb-1">Choose Your Plan</h1>
            <p className="text-indigo-200 mb-2">
              Select the perfect option for your needs
            </p>

            <div className="bg-indigo-800/30 rounded-xl h-[50px] p-1 mb-4 grid grid-cols-4 gap-1">
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

            <div className="space-y-4">
              {(Object.entries(pricingOptions) as [PlanType, any][]).map(
                ([key, plan]) => (
                  <motion.div
                    key={key}
                    variants={cardVariants}
                    whileHover="hover"
                    onClick={() => setSelectedPlan(key)}
                    className={`relative overflow-hidden h-[270px] rounded-xl p-6 border-2 transition-all cursor-pointer ${
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
                        <h3 className="text-xl font-bold mb-0.5">
                          {plan.title}
                        </h3>
                        <p className="text-indigo-200 text-sm">
                          {key === "free"
                            ? plan.period
                            : `Billed ${billingCycle}`}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold">
                          ৳
                          {key === "free"
                            ? plan.price
                            : plan.prices[billingCycle].amount}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-1 mb-4">
                      {plan.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <FiCheck className="mt-0.25 mr-2 text-indigo-300" />
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
                )
              )}
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
                {/* Name fields */}
                <div className="grid grid-cols-2 gap-4">
                  {(["firstName", "lastName"] as const).map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field === "firstName" ? "First Name" : "Last Name"}
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-3 text-gray-400" />
                        <input
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {[
                  { id: "email", type: "email", icon: <FiMail /> },
                  { id: "password", type: "password", icon: <FiLock /> },
                  { id: "referralCode", type: "text", icon: <FiTag /> },
                ].map(
                  ({
                    id,
                    type,
                    icon,
                  }: {
                    id: string;
                    type: string;
                    icon: React.ReactNode;
                  }) => (
                    <div key={id}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {id === "referralCode"
                          ? "Referral Code (optional)"
                          : id.charAt(0).toUpperCase() + id.slice(1)}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">
                          {icon}
                        </span>
                        <input
                          name={id}
                          type={type}
                          value={(formData as any)[id]}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  )
                )}

                {error && (
                  <p className="text-red-500 text-sm text-center">
                    {(error as any)?.data?.message ||
                      "An error occurred. Please try again."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex justify-center items-center"
                >
                  {isSubmitting || isLoading ? "Processing..." : "Continue"}
                  <FiArrowRight className="ml-2" />
                </button>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-indigo-600 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>

                <p className="text-center text-indigo-600 text-sm font-medium">
                  After clicking continue, you’ll receive a 6-digit OTP to
                  verify your email
                </p>
              </form>
            </div>
          </div>
        </motion.div>

        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          paymentDetails={paymentDetails}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </div>

      <Footer />
    </>
  );
}
