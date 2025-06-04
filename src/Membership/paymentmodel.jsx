import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiX, FiPhone, FiHash, FiCheck, FiCreditCard } from 'react-icons/fi';
import { useSubscribeMutation } from '../context/authApi';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const PaymentModal = ({ isOpen, onClose, paymentDetails, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [subscribe] = useSubscribeMutation();

  const generatePaymentId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    return `PAY${timestamp}${randomNum}`;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!/^01[3-9]\d{8}$/.test(phoneNumber)) {
      toast.error('Please enter a valid 11-digit Bangladeshi mobile number (01XXXXXXXXX)');
      return;
    }

    if (!transactionId.trim() || transactionId.length < 8) {
      toast.error('Transaction ID must be at least 8 characters');
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
      
      if (response.success) {
        toast.success('Payment successful! Subscription activated.');
        onClose();
        onPaymentSuccess();
      } else {
        throw new Error(response.message || 'Payment processing failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast.error(err.data?.message || err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen || !paymentDetails?.userId) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl max-w-md w-full shadow-2xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Complete Your Payment</h2>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label="Close"
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
              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-2">
                    <p className="text-gray-500">Subscription Plan</p>
                  </div>
                  <div className="space-y-2 font-medium">
                    <p>Premium ({paymentDetails.subscriptionPlan})</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <p className="font-medium">Total Amount:</p>
                  <p className="text-2xl font-bold text-indigo-600">৳{paymentDetails.amount}</p>
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePaymentSubmit} className="space-y-5">
                {/* Payment Method */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Select Payment Method</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['bkash', 'nagad'].map((method) => (
                      <label
                        key={method}
                        className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === method
                            ? 'border-indigo-500 bg-indigo-50 shadow-inner'
                            : 'border-gray-300 hover:border-indigo-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={() => setPaymentMethod(method)}
                          className="absolute opacity-0"
                          required
                        />
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center ${
                            method === 'bkash' ? 'bg-pink-500' : 'bg-green-500'
                          }`}>
                            <FiCreditCard className="text-white text-lg" />
                          </div>
                          <span className="text-sm font-medium text-gray-800">
                            {method.charAt(0).toUpperCase() + method.slice(1)}
                          </span>
                        </div>
                        {paymentMethod === method && (
                          <div className="absolute top-2 right-2 bg-indigo-500 rounded-full p-1">
                            <FiCheck className="text-white text-xs" />
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                      pattern="01[3-9]\d{8}"
                      maxLength="11"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    The mobile number linked to your {paymentMethod} account
                  </p>
                </div>

                {/* Transaction ID */}
                <div>
                  <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction ID
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiHash className="text-gray-400" />
                    </div>
                    <input
                      id="transactionId"
                      type="text"
                      placeholder="Enter transaction ID"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                      minLength="8"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Transaction ID received from {paymentMethod} after payment
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center ${
                    isProcessing
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Confirm & Complete Payment'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

PaymentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  paymentDetails: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    subscriptionPlan: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
};

export default PaymentModal;