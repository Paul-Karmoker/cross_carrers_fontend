import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useConfirmBkashPaymentMutation } from "@/redux/features/paymentApi";
import { toast } from "react-hot-toast";

const BkashSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [confirmBkashPayment] = useConfirmBkashPaymentMutation();

  // prevent double execution (React strict mode)
  const hasConfirmed = useRef(false);

  useEffect(() => {
    const paymentID =
      searchParams.get("paymentID") ||
      searchParams.get("paymentId") ||
      searchParams.get("trxID");

    const plan = localStorage.getItem("selectedPlan");

    // 🔴 HARD VALIDATION
    if (!paymentID || !plan) {
      toast.error("Invalid payment callback");
      navigate("/upgrade-plan", { replace: true });
      return;
    }

    if (hasConfirmed.current) return;
    hasConfirmed.current = true;

    const confirmPayment = async () => {
      try {
        await confirmBkashPayment({
          paymentID,
          plan: plan as any,
        }).unwrap();

        toast.success("Subscription activated successfully 🎉");
        localStorage.removeItem("selectedPlan");
        navigate("/dashboard", { replace: true });
      } catch (error) {
        toast.error("Payment confirmation failed");
        navigate("/upgrade-plan", { replace: true });
      }
    };

    confirmPayment();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
      <h2 className="text-lg font-semibold text-indigo-800 animate-pulse">
        Confirming your payment, please wait...
      </h2>
    </div>
  );
};

export default BkashSuccess;
