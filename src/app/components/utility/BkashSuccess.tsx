import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useConfirmBkashPaymentMutation } from "@/redux/features/paymentApi";
import { authApi } from "@/redux/features/authApi";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const BkashSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmBkashPayment] = useConfirmBkashPaymentMutation();

  const hasConfirmed = useRef(false);

  useEffect(() => {
    console.log("✅ BKASH CALLBACK URL:", window.location.href);

    const paymentID =
      params.get("paymentID") ||
      params.get("paymentId") ||
      params.get("trxID");

    // ❌ ONLY check paymentID (NOT status)
    if (!paymentID) {
      toast.error("Payment ID missing");
      navigate("/", { replace: true });
      return;
    }

    if (hasConfirmed.current) return;
    hasConfirmed.current = true;

    const confirmPayment = async () => {
      try {
        console.log("🚀 Calling confirm API with:", paymentID);

        await confirmBkashPayment({ paymentID }).unwrap();

        // 🔄 refresh profile cache
        dispatch(authApi.util.invalidateTags(["Profile"]));

        toast.success("Subscription activated 🎉");
        navigate("/dbhome", { replace: true });
      } catch (err) {
        console.error("❌ Confirm failed:", err);
        toast.error("Payment confirmation failed");
        navigate("/", { replace: true });
      }
    };

    confirmPayment();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg font-semibold animate-pulse">
        Confirming your payment…
      </p>
    </div>
  );
};

export default BkashSuccess;
