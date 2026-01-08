import { useState, useCallback, FormEvent, ChangeEvent, JSX } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  FiDollarSign,
  FiCreditCard,
  FiAlertCircle,
  FiArrowUp,
} from "react-icons/fi";
import { useWithdrawMutation } from "../../redux/features/authApi";
import { User, WithdrawForm, PaymentProvider } from "./types";
import { useDebounce } from "./hooks";

interface WithdrawPanelProps {
  user: User;
}

export function WithdrawPanel({ user }: WithdrawPanelProps): JSX.Element {
  /* =======================
     API Hook
  ======================= */

  const [withdraw, { isLoading: isWithdrawing }] = useWithdrawMutation();

  /* =======================
     State
  ======================= */

  const [withdrawForm, setWithdrawForm] = useState<WithdrawForm>({
    points: "",
    paymentProvider: "bkash",
    paymentNumber: "",
  });

  const debouncedWithdrawForm = useDebounce<WithdrawForm>(withdrawForm, 300);

  /* =======================
     Validation
  ======================= */

  const validateWithdrawForm = useCallback((): boolean => {
    const points: number = Number(debouncedWithdrawForm.points);

    if (!points || points <= 0 || points > user.points) {
      toast.error(
        `Invalid withdrawal amount. Available: ${user.points} points`
      );
      return false;
    }

    if (points < 50) {
      toast.error("Minimum 50 points required for withdrawal");
      return false;
    }

    if (debouncedWithdrawForm.paymentNumber.length < 10) {
      toast.error("Payment number must be at least 10 digits");
      return false;
    }

    return true;
  }, [debouncedWithdrawForm, user.points]);

  /* =======================
     Handler
  ======================= */

  const handleWithdraw = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateWithdrawForm()) return;

    try {
      await withdraw({
        amount: Number(debouncedWithdrawForm.points),
      }).unwrap();

      toast.success("Withdrawal requested successfully");

      setWithdrawForm({
        points: "",
        paymentProvider: "bkash",
        paymentNumber: "",
      });
    } catch (err: unknown) {
      toast.error(
        (err as { data?: { message?: string } })?.data?.message ||
          "Failed to process withdrawal"
      );
    }
  };

  /* =======================
     JSX (UNCHANGED UI)
  ======================= */

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleWithdraw}
      className="bg-white p-8 rounded-xl shadow-lg space-y-6"
      aria-label="Withdraw points form"
    >
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <FiDollarSign className="mr-2" /> Withdraw Points
      </h3>

      <div className="bg-indigo-50 p-4 rounded-lg">
        <p className="text-gray-600 font-medium flex items-center">
          <FiCreditCard className="mr-2" /> Available: {user.points} points
        </p>

        {user.points < 50 && (
          <p className="text-red-500 text-sm mt-2 flex items-center">
            <FiAlertCircle className="mr-2" /> Minimum 50 points required for
            withdrawal
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Points to withdraw
        </label>
        <input
          type="number"
          placeholder="Points to withdraw"
          value={withdrawForm.points}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setWithdrawForm({
              ...withdrawForm,
              points: e.target.value,
            })
          }
          required
          min={50}
          max={user.points}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        {withdrawForm.points &&
          Number(withdrawForm.points) < 50 && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <FiAlertCircle className="mr-2" /> Enter at least 50 points
            </p>
          )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Method
        </label>
        <select
          value={withdrawForm.paymentProvider}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setWithdrawForm({
              ...withdrawForm,
              paymentProvider: e.target.value as PaymentProvider,
            })
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="bkash">bKash</option>
          <option value="nagad">Nagad</option>
          <option value="rocket">Rocket</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Number
        </label>
        <input
          type="text"
          placeholder="Payment Number"
          value={withdrawForm.paymentNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setWithdrawForm({
              ...withdrawForm,
              paymentNumber: e.target.value.replace(/\D/g, ""),
            })
          }
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={
          isWithdrawing ||
          user.points < 50 ||
          Number(withdrawForm.points) < 50
        }
        className="px-8 py-3 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isWithdrawing ? (
          "Processing..."
        ) : (
          <>
            <FiArrowUp className="mr-2" /> Submit Withdrawal
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
