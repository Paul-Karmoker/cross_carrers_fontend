import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useConfirmBkashPaymentMutation } from "@/redux/features/paymentApi";
import { toast } from "react-hot-toast";

// ── Types ────────────────────────────────────────────────

type PlanId = "monthly" | "quarterly" | "semiannual" | "yearly";

// ── Component ───────────────────────────────────────────

const BkashSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [confirmBkashPayment] = useConfirmBkashPaymentMutation();

  useEffect(() => {
    const paymentID = searchParams.get("paymentID");
    const status = searchParams.get("status");
    const selectedPlan = localStorage.getItem("selectedPlan");

    if (!paymentID || status !== "success" || !selectedPlan) {
      toast.error("Payment failed or cancelled");
      navigate("/upgrade-plan", { replace: true });
      return;
    }

    const confirmPayment = async () => {
      try {
        await confirmBkashPayment({
          paymentID,
          plan: selectedPlan as PlanId,
        }).unwrap();

        toast.success("Subscription upgraded successfully 🎉");
        localStorage.removeItem("selectedPlan");
        navigate("/dashboard", { replace: true });
      } catch (error: unknown) {
        const message =
          error && typeof error === "object" && "data" in error && error.data && typeof error.data === "object" && "message" in error.data
            ? String((error.data as { message?: unknown }).message)
            : "Payment confirmation failed";

        toast.error(message);
        navigate("/upgrade-plan", { replace: true });
      }
    };

    confirmPayment();
  }, [searchParams, navigate, confirmBkashPayment]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
      <h2 className="text-lg font-semibold text-indigo-800 animate-pulse">
        Confirming your payment, please wait...
      </h2>
    </div>
  );
};

export default BkashSuccess;