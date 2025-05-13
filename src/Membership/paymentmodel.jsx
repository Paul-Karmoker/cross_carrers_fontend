// src/components/PaymentModal.jsx
import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { FaMoneyBillWave, FaWallet, FaPhoneAlt } from "react-icons/fa";
import nagod from "../../public/nagad-icon.svg"
import bkash from "../../public/bkash-icon.svg"
import axios from "axios";
import { user } from "@nextui-org/theme";
import { Space } from "lucide-react";

const PaymentModal = ({ isOpen, onClose, paymentDetails }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // Validate 11‑digit BD phone
    if (!/^01\d{9}$/.test(phoneNumber)) {
      toast.error("Enter a valid 11‑digit Bangladeshi number");
      return;
    }

    setIsProcessing(true);
    try {
      const paymentBody = {
        userId: paymentDetails.userId,
        plan: paymentDetails.plan,
        duration: paymentDetails.durationLabel,
        amount: paymentDetails.amount,
        phoneNumber,
        paymentMethod,
        paymentReference: `INV-${Date.now()}`,
      };

      // 1) kick off payment
      const { data } = await axios.post(
        `/api/payments/${paymentMethod}/create`,
        paymentBody
      );

      // if external URL, redirect user
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      }

      // 2) update user to premium
      await axios.put(`/api/users/${paymentDetails.userId}/upgrade`, {
        userId: paymentDetails.userId,
        userName: paymentDetails.userName,
        plan: paymentDetails.plan,
        duration: paymentDetails.durationLabel,
        paymentReference: paymentBody.paymentReference,
      });

      toast.success("Your plan is now Premium!");
      onClose();
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Confirm Your Payment</h2>

          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">User ID:</span>
              <span className="font-medium">{paymentDetails.userId}</span>
              <span className="text-sm text-gray-600">User Name</span>
              <span className="font-medium">{paymentDetails.userName}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Plan Duration:</span>
              <span className="font-medium">{paymentDetails.durationLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Amount Due:</span>
              <span className="text-lg font-bold">
                ৳{paymentDetails.amount}
              </span>
            </div>
          </div>

          <form onSubmit={handlePaymentSubmit} className="space-y-5">
            {/* Payment Method */}
            <div>
              <h3 className="text-sm font-medium mb-2">Select Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                {["bkash", "nagad"].map((m) => (
                  <label
                    key={m}
                    className={`flex flex-col items-center border-2 rounded-lg p-4 cursor-pointer transition ${
                      paymentMethod === m
                        ? m === "bkash"
                          ? "border-pink-500"
                          : "border-orange-500"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m}
                      checked={paymentMethod === m}
                      onChange={() => setPaymentMethod(m)}
                      className="sr-only"
                    />
                    {m === "bkash" ? (
                      <img src={bkash} size={28} className="text-pink-500 mb-2" />
                    ) : (
                      <img src={nagod} size={28} className="text-orange-500 mb-2" />
                    )}
                    <span className="text-sm font-medium">
                      {m.toUpperCase()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhoneAlt className="text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Enter the number linked to your {paymentMethod.toUpperCase()} account.
              </p>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isProcessing ? "Processing..." : "Confirm & Pay"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
