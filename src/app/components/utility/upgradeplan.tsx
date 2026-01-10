import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Check, CreditCard, Sparkles } from "lucide-react"; // Install lucide-react
import Navbar from "../home/navbar";
import Footer from "../home/footer";
import { useStartBkashPaymentMutation } from "@/redux/features/paymentApi";
import bKashLogo from "../../assets/Image/BKash-Icon-Logo.wine.png";
type PlanId = "monthly" | "quarterly" | "semiannual" | "yearly";

interface Plan {
  id: PlanId;
  name: string;
  price: number;
  duration: string;
  features: string[];
  recommended?: boolean;
}

const plans: readonly Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: 150,
    duration: "/mo",
    features: ["Everything in Trial", "Extended messaging limits", "Priority support", "Advanced features"],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: 260,
    duration: "/3 months",
    features: ["Everything in Monthly", "Analytics tools", "Custom integrations", "Save 10% vs. monthly"],
  },
  {
    id: "semiannual",
    name: "Semiannual",
    price: 450,
    duration: "/6 months",
    features: ["Everything in Quarterly", "Dedicated support", "Advanced reporting", "Save 20% vs. monthly"],
  },
  {
    id: "yearly",
    name: "Yearly",
    price: 520,
    duration: "/year",
    recommended: true, // Highlights the best value
    features: ["Everything in Semiannual", "Full feature access", "Exclusive updates", "Best value (25% savings)"],
  },
] as const;

const UpgradePlan = () => {
  const [startBkashPayment, { isLoading }] = useStartBkashPaymentMutation();

  const handleSelectPlan = async (planId: PlanId) => {
    try {
      localStorage.setItem("selectedPlan", planId);
      const response = await startBkashPayment({ plan: planId }).unwrap();
      window.location.href = response.bkashURL;
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to start bKash payment");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-grow py-20 px-4 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-4"
            >
              <Sparkles size={16} />
              <span>Premium Access</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Ready to upgrade your plan?
            </h1>
            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
              Choose the plan that fits your workflow. Unlock advanced features and priority support.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative group bg-white rounded-3xl p-8 border transition-all duration-300 flex flex-col ${
                  plan.recommended 
                    ? "border-indigo-500 shadow-2xl shadow-indigo-100 scale-105 z-10" 
                    : "border-slate-200 hover:border-indigo-200 hover:shadow-xl"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-lg">
                    Best Value
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-slate-500 font-semibold text-sm">BDT{plan.duration}</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    plan.recommended
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  } disabled:opacity-50 active:scale-[0.98]`}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Upgrade Now
                    </>
                  )}
                </button>

                <div className="mt-8 space-y-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Included Features</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.recommended ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                          <Check className={`w-3 h-3 ${plan.recommended ? 'text-indigo-600' : 'text-slate-600'} stroke-[3px]`} />
                        </div>
                        <span className="text-sm text-slate-600 leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Secure Payment Footer */}
          <div className="mt-24 mb-10 flex flex-col items-center justify-center">
  {/* Trust Badge */}
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="group flex items-center gap-4 px-8 py-4 bg-white/60 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl"
  >
    <div className="relative">
      <div className="absolute inset-0 bg-[#D12053]/10 rounded-full blur-lg group-hover:blur-xl transition-all" />
      <img 
        src={bKashLogo} // Using the import from above
        alt="bKash"
        className="relative w-10 h-10 object-contain"
        onError={(e) => {
          // Fallback if image still fails to load
          e.currentTarget.src = "https://freelogopng.com/images/all_img/1656234833bkash-logo.png";
        }}
      />
    </div>

    <div className="flex flex-col">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Secure Checkout</p>
      <p className="text-sm text-slate-700">
        Payments processed by <span className="font-extrabold text-[#D12053] tracking-tight">bKash</span>
      </p>
    </div>
  </motion.div>

  {/* Secondary Info */}
  <div className="mt-6 flex flex-col items-center gap-2">
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
      <p className="text-slate-500 text-xs font-medium">SSL Encrypted & 100% Secure</p>
    </div>
    <p className="text-slate-400 text-[11px]">
      Need help? <a href="#" className="underline hover:text-indigo-600 transition">Contact Support</a>
    </p>
  </div>
</div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UpgradePlan;