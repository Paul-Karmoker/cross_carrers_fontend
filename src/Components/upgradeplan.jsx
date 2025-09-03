import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { useGetprofileQuery, useSubscribeMutation } from "../context/authApi";
import { FaPaypal } from "react-icons/fa";
import Navbar from "./navbar";
import Footer from "./footer";


const CheckoutForm = ({ plan, onSuccess, onClose }) => {
  const { data: profile } = useGetprofileQuery();
  const [subscribe] = useSubscribeMutation();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState("bkash");
  const [transactionId, setTransactionId] = useState("TXN987654321");
  const [paymentNumber, setPaymentNumber] = useState("01712345678");

  const paymentId = `PAY${new Date().toISOString().replace(/[:.-]/g, '').slice(2, 12)}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    const subscriptionData = {
      userId: profile?.user?._id || "68361edaf2c1bbac35e4d621",
      subscriptionPlan: plan.id,
      paymentId,
      transactionId,
      paymentProvider,
      paymentNumber,
      amount: plan.price,
    };

    try {
      console.log("Submitting subscription data:", subscriptionData);
      const response = await subscribe(subscriptionData).unwrap();
      console.log("API response:", response);
      if (response.user && response.user.message === "Subscription request submitted successfully") {
        toast.success("Payment successful! Subscription upgraded.", { duration: 4000 });
        onSuccess();
        onClose();
      } else {
        setError("Subscription failed. Please try again.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setError(err.data?.message || "Failed to connect to server. Please check your network.");
    }
    setProcessing(false);
  };
  const paymentIcons = {
    bkash: <FaPaypal className="text-pink-600 w-5 h-5" />,
    nagad: <FaPaypal className="text-orange-600 w-5 h-5" />,
    rocket: <FaPaypal className="text-purple-600 w-5 h-5" />,
  };

  return ( <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-5"
      >
        <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-indigo-900 text-center tracking-tight">Subscription Confirmation</h2>
        <h3 className="text-lg font-semibold text-red-600 text-center tracking-tight">Bkash/Nagad/Rocket: 01315974775</h3>
          <div className="bg-gradient-to-br from-white to-indigo-50 p-4 rounded-xl shadow-md border border-indigo-200 transform hover:scale-[1.01] transition-transform duration-200">
            <p className="text-gray-800 text-base font-semibold"><strong>Plan:</strong> {plan.name}</p>
            <p className="text-gray-800 text-base font-semibold"><strong>Price:</strong> {plan.price === 0 ? "Free" : `${plan.price} BDT`}</p>
            <p className="text-gray-800 text-base font-semibold"><strong>Duration:</strong> {plan.id.charAt(0).toUpperCase() + plan.id.slice(1)}</p>
            <p className="text-gray-800 text-base font-semibold"><strong>Payment ID:</strong> {paymentId}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">Choose Payment Provider</label>
              <div className="relative">
                <select
                  value={paymentProvider}
                  onChange={(e) => setPaymentProvider(e.target.value)}
                  className="w-full p-2.5 pl-9 border border-indigo-300 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm appearance-none"
                >
                  <option value="bkash">bKash</option>
                  <option value="nagad">Nagad</option>
                  <option value="rocket">Rocket</option>
                </select>
                <span className="absolute left-2.5 top-1/2 transform -translate-y-1/2">
                  {paymentIcons[paymentProvider]}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">Your Transaction ID</label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g., TXN987654321"
                className="w-full p-2.5 border border-indigo-300 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">Your Payment Number</label>
              <input
                type="text"
                value={paymentNumber}
                onChange={(e) => setPaymentNumber(e.target.value)}
                placeholder="e.g., 01712345678"
                className="w-full p-2.5 border border-indigo-300 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
              />
            </div>
            {error && <div className="text-red-600 text-xs font-medium bg-red-50 p-2 rounded-lg">{error}</div>}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={processing}
              className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? "Processing..." : "Confirm Subscription"}
            </motion.button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-indigo-700 hover:text-indigo-900 hover:underline font-semibold text-sm transition-all duration-200"
            >
              Cancel
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

CheckoutForm.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default function UpgradePlan() {
  const navigate = useNavigate();
  const { data: profile } = useGetprofileQuery();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { id: "trial", name: "Trial", price: 0, features: ["Access to basic features", "Limited messaging", "Standard support", "7-day trial period"] },
    { id: "monthly", name: "Monthly", price: 150, features: ["Everything in Trial", "Extended messaging limits", "Priority support", "Advanced features"] },
    { id: "quarterly", name: "Quarterly", price: 260, features: ["Everything in Monthly", "Analytics tools", "Custom integrations", "Save 10% vs. monthly"] },
    { id: "semiannual", name: "Semiannual", price: 450, features: ["Everything in Quarterly", "Dedicated support", "Advanced reporting", "Save 20% vs. monthly"] },
    { id: "yearly", name: "Yearly", price: 520, features: ["Everything in Semiannual", "Full feature access", "Exclusive updates", "Best value (25% savings)"] },
  ];

  // Define plan hierarchy (lower to higher tier)
  const planOrder = {
    trial: 1,
    monthly: 2,
    quarterly: 3,
    semiannual: 4,
    yearly: 5,
  };

  // Get current plan from profile, default to 'trial' if not available
  const currentPlan = profile?.user?.subscriptionPlan || "trial";
  const currentPlanRank = planOrder[currentPlan] || 1;

  // Function to check if a plan is lower or equal to the current plan
  const isPlanDisabled = (planId) => {
    const planRank = planOrder[planId];
    return planRank <= currentPlanRank;
  };

  const handleUpgrade = () => {
    navigate("/dashboard");
    setSelectedPlan(null);
  };

  return (
    <div>
        <Navbar/>
      
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-900 p-6 md:p-10 flex items-center justify-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-indigo-900 tracking-tight drop-shadow-sm">
          Select Your Subscription
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {plans.map((plan) => {
            const disabled = isPlanDisabled(plan.id);
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 * plans.indexOf(plan) }}
                className={`bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-indigo-100 transition-all duration-300 ${
                  disabled ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-2xl hover:border-indigo-300'
                }`}
              >
                <h2 className="text-2xl font-bold mb-4 text-indigo-900 tracking-tight">{plan.name}</h2>
                <p className="text-3xl md:text-4xl font-extrabold mb-6 text-indigo-800">
                  {plan.price === 0 ? "Free" : `${plan.price} BDT`}
                  <span className="text-base text-gray-600 font-normal">/{plan.id}</span>
                </p>
                {plan.id === currentPlan ? (
                  <div className="bg-indigo-100 text-indigo-800 p-3 rounded-lg mb-6 text-center font-semibold shadow-sm">
                    Your Current Plan
                  </div>
                ) : (
                  <motion.button
                    whileHover={disabled ? {} : { scale: 1.05 }}
                    whileTap={disabled ? {} : { scale: 0.95 }}
                    onClick={() => !disabled && setSelectedPlan(plan)}
                    disabled={disabled}
                    className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                      disabled
                        ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-blue-700 text-white hover:from-indigo-700 hover:to-blue-800'
                    }`}
                  >
                    {disabled ? "Unavailable" : "Select Plan"}
                  </motion.button>
                )}
                <ul className="space-y-3 text-sm text-gray-700 mt-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-3 h-3 bg-indigo-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg"
            >
              <CheckoutForm
                plan={selectedPlan}
                onSuccess={handleUpgrade}
                onClose={() => setSelectedPlan(null)}
              />
            </motion.div>
          </motion.div>
        )}
        <p className="text-center text-gray-600 mt-12 text-base font-medium">
          Need a custom plan?{" "}
          <a href="/contact-sales" className="text-indigo-700 hover:text-indigo-900 hover:underline font-semibold transition-all duration-200">
            Contact Our Sales Team
          </a>
        </p>
      </div>
    </div>
        <Footer/>
    </div>
  
  );
}