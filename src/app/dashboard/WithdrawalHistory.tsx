import { motion } from "framer-motion";
import {
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { useGetWithdrawalsQuery } from "../../redux/features/authApi";
import { Withdrawal, WithdrawHistoryResponse } from "./types";
import { JSX } from "react";

export function WithdrawalHistory(): JSX.Element {
  const {
    data,
    isLoading: isHistoryLoading,
  } = useGetWithdrawalsQuery();

  /**
   * Backend response structure:
   * getWithdrawals -> AuthResponse[]
   * We safely normalize it here
   */
  const withdrawals: Withdrawal[] =
    (data as unknown as WithdrawHistoryResponse)?.withdrawals ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-1 p-8"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <FiClock className="mr-2" /> Withdrawal History
      </h3>

      {/* Loading */}
      {isHistoryLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i: number) => (
            <div
              key={i}
              className="h-14 bg-gray-200  animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Data Table */}
      {!isHistoryLoading && withdrawals.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Provider</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {[...withdrawals]
                .sort(
                  (a: Withdrawal, b: Withdrawal) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((record: Withdrawal) => (
                  <tr
                    key={record._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      {new Date(record.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {record.points}
                    </td>

                    <td className="px-6 py-4 capitalize">
                      {record.paymentProvider}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                          record.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : record.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {record.status === "pending" ? (
                          <FiAlertCircle className="mr-1" />
                        ) : record.status === "completed" ? (
                          <FiCheckCircle className="mr-1" />
                        ) : (
                          <FiXCircle className="mr-1" />
                        )}
                        {record.status.charAt(0).toUpperCase() +
                          record.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!isHistoryLoading && withdrawals.length === 0 && (
        <div className="text-center py-12">
          <FiClock className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">
            No withdrawal history available
          </p>
        </div>
      )}
    </motion.div>
  );
}
