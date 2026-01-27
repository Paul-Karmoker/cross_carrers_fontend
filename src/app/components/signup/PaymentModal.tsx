import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  FiX,
  FiPhone,
  FiHash,
  FiCheck,
  FiCreditCard,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useSubscribeMutation } from "../../../redux/features/authApi";

/* =======================
   Types
======================= */

type PaymentMethod = "bkash" | "nagad";

interface PaymentDetails {
  userId: string;
  subscriptionPlan: string;
  amount: number;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentDetails: PaymentDetails;
  onPaymentSuccess: () => void;
}

/* =======================
   Component
======================= */

const PaymentModal = ({
  isOpen,
  onClose,
  paymentDetails,
  onPaymentSuccess,
}: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("bkash");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [subscribe] = useSubscribeMutation();

  const generatePaymentId = (): string => {
    return `PAY${Date.now()}${Math.floor(Math.random() * 10000)}`;
  };

  const handlePaymentSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!/^01[3-9]\d{8}$/.test(phoneNumber)) {
      toast.error(
        "Please enter a valid 11-digit Bangladeshi mobile number (01XXXXXXXXX)"
      );
      return;
    }

    if (!transactionId.trim() || transactionId.length < 8) {
      toast.error("Transaction ID must be at least 8 characters");
      return;
    }

    setIsProcessing(true);

    try {
      const paymentData = {
        userId: paymentDetails.userId,
        subscriptionPlan: paymentDetails.subscriptionPlan,
        paymentId: generatePaymentId(),
        transactionId: transactionId.trim(),
        paymentProvider: paymentMethod,
        paymentNumber: phoneNumber,
        amount: paymentDetails.amount,
      };

      const response = await subscribe(paymentData).unwrap();

      if (response?.success) {
        toast.success("Payment successful! Subscription activated.");
        onClose();
        onPaymentSuccess();
      } else {
        throw new Error(response?.message || "Payment failed");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      toast.error(
        err?.data?.message ||
          err?.message ||
          "Payment failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen || !paymentDetails?.userId) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  Complete Your Payment
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Close payment modal"
                >
                  <FiX size={24} />
                </button>
              </div>
              <p className="text-sm opacity-90 mt-1">
                Upgrade to {paymentDetails.subscriptionPlan} plan
              </p>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Plan</span>
                  <span className="font-medium">
                    Premium ({paymentDetails.subscriptionPlan})
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    ৳{paymentDetails.amount}
                  </span>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handlePaymentSubmit}
                className="space-y-5"
              >
                {/* Payment Method */}
                <div>
                  <h3 className="text-sm font-medium mb-3">
                    Select Payment Method
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {(["bkash", "nagad"] as PaymentMethod[]).map(
                      (method) => (
                        <label
                          key={method}
                          className={`relative border rounded-lg p-4 cursor-pointer ${
                            paymentMethod === method
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === method}
                            onChange={() =>
                              setPaymentMethod(method)
                            }
                            className="hidden"
                          />
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center ${
                                method === "bkash"
                                  ? "bg-pink-500"
                                  : "bg-green-500"
                              }`}
                            >
                              <FiCreditCard className="text-white" />
                            </div>
                            <span className="text-sm font-medium">
                              {method.toUpperCase()}
                            </span>
                          </div>
                          {paymentMethod === method && (
                            <div className="absolute top-2 right-2 bg-indigo-500 rounded-full p-1">
                              <FiCheck className="text-white text-xs" />
                            </div>
                          )}
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(e.target.value)
                      }
                      placeholder="01XXXXXXXXX"
                      className="w-full pl-10 py-2.5 border rounded-lg"
                      maxLength={11}
                      required
                    />
                  </div>
                </div>

                {/* Transaction */}
                <div>
                  <label className="text-sm font-medium">
                    Transaction ID
                  </label>
                  <div className="relative">
                    <FiHash className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) =>
                        setTransactionId(e.target.value)
                      }
                      minLength={8}
                      required
                      className="w-full pl-10 py-2.5 border rounded-lg"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  {isProcessing
                    ? "Processing..."
                    : "Confirm & Complete Payment"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
