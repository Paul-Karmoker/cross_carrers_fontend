import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import Navbar from "../home/navbar";
import Footer from "../home/footer";
import { useStartBkashPaymentMutation } from "@/redux/features/paymentApi";
import bKashLogo from "../../assets/Image/BKash-Icon-Logo.wine.png";
import { authApi } from "@/redux/features/authApi";

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
    price: 89,
    duration: "/mo",
    features: [
      "Everything in Trial",
      "Extended messaging limits",
      "Priority support",
      "Advanced features",
    ],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: 199,
    duration: "/3 months",
    features: [
      "Everything in Monthly",
      "Analytics tools",
      "Custom integrations",
      "Save 10% vs. monthly",
    ],
  },
  {
    id: "semiannual",
    name: "Semiannual",
    price: 399,
    duration: "/6 months",
    features: [
      "Everything in Quarterly",
      "Dedicated support",
      "Advanced reporting",
      "Save 20% vs. monthly",
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    price: 599,
    duration: "/year",
    recommended: true,
    features: [
      "Everything in Semiannual",
      "Full feature access",
      "Exclusive updates",
      "Best value (25% savings)",
    ],
  },
] as const;

const UpgradePlan = () => {
  const [startBkashPayment, { isLoading }] =
    useStartBkashPaymentMutation();

  // 🔹 get logged-in user profile (cached state)
  const { data } =
    authApi.endpoints.getProfile.useQueryState();

  const currentPlan =
    data?.user?.subscriptionPlan as PlanId | undefined;

  const [activePlan, setActivePlan] =
    useState<PlanId | null>(null);

 const handleSelectPlan = async (planId: PlanId) => {
  if (isLoading || planId === currentPlan) return;

  try {
    setActivePlan(planId);
    const response = await startBkashPayment({
      plan: planId,
    }).unwrap();
    if (!response?.bkashURL) {
      throw new Error("Invalid bKash response");
    }

    // ✅ Redirect to bKash (backend already knows the plan)
    window.location.href = response.bkashURL;
  } catch (error: any) {
    setActivePlan(null);

    toast.error(
      error?.data?.message ||
        error?.message ||
        "Unable to start bKash payment"
    );
  }
};

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-grow py-20 px-4 relative overflow-hidden">
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

            <h1 className="text-4xl md:text-5xl font-black text-slate-900">
              Ready to upgrade your plan?
            </h1>

            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
              Choose the plan that fits your workflow. Unlock
              advanced features and priority support.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => {
              const isCurrentPlan =
                plan.id === currentPlan;

              const isLoadingPlan =
                isLoading && activePlan === plan.id;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-[8px] p-8 border flex flex-col ${
                    plan.recommended
                      ? "border-indigo-500 shadow-2xl shadow-indigo-100 scale-105 z-10"
                      : "border-slate-200 hover:border-indigo-200 hover:shadow-xl"
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                      Best Value
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900">
                      {plan.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900">
                        {plan.price}
                      </span>
                      <span className="text-slate-500 text-sm font-semibold">
                        BDT{plan.duration}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isCurrentPlan || isLoadingPlan}
                    onClick={() =>
                      handleSelectPlan(plan.id)
                    }
                    className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      plan.recommended
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    } ${
                      isCurrentPlan || isLoadingPlan
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isCurrentPlan ? (
                      "Current Plan"
                    ) : isLoadingPlan ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Upgrade Now"
                    )}
                  </button>

                  <div className="mt-8 space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex gap-3">
                        <Check className="w-4 h-4 text-indigo-600 mt-0.5" />
                        <span className="text-sm text-slate-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-24 flex flex-col items-center gap-6">
  {/* Trust Badge */}
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="group flex items-center gap-4 px-8 py-4 rounded-[8px]
      bg-white/70 backdrop-blur-md
      border border-slate-200
      shadow-[0_10px_30px_rgba(0,0,0,0.06)]
      hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]
      transition-all"
  >
    {/* Glow */}
    <div className="relative">
      <div className="absolute inset-0 bg-[#D12053]/15 rounded-full blur-xl group-hover:blur-2xl transition-all" />
      <img
        src={bKashLogo}
        alt="bKash"
        className="relative w-10 h-10 object-contain"
      />
    </div>

    {/* Text */}
    <div className="flex flex-col leading-tight">
      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
        Secure Payment
      </span>
      <span className="text-sm font-bold text-slate-700">
        Powered by <span className="text-[#D12053]">bKash</span>
      </span>
    </div>
  </motion.div>

  {/* Extra trust line */}
  <div className="flex items-center gap-2 text-xs text-slate-500">
    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
    <span>SSL encrypted • 100% secure checkout</span>
  </div>
</div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UpgradePlan;
