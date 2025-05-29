import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AiOutlineClose } from 'react-icons/ai';
import { FaPhoneAlt, FaHashtag } from 'react-icons/fa';
import { useSubscribeMutation } from '../context/authApi';
import BkashIcon from '../../public/bkash-icon.svg';
import NagadIcon from '../../public/nagad-icon.svg';
import PropTypes from 'prop-types';

const PaymentModal = ({ isOpen, onClose, paymentDetails }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [subscribe, { isLoading: isSubmitting }] = useSubscribeMutation();

  if (!isOpen || !paymentDetails?.userId) return null;

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

   
    if (!/^01\d{9}$/.test(phoneNumber)) {
      toast.error('একটি বৈধ ১১-সংখ্যার বাংলাদেশি নম্বর লিখুন');
      return;
    }

    if (!transactionId.trim()) {
      toast.error('ট্রানজ্যাকশন আইডি লিখুন');
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
        transactionId,
      };

      await subscribe(paymentBody).unwrap();
      toast.success('আপনার প্ল্যান অনুমোদনের জন্য অপেক্ষা করছে!');
      onClose();
      navigate('/dashboard');
    } catch (err) {
      console.error('পেমেন্ট ত্রুটি:', err);
      toast.error(err.data?.message || 'পেমেন্ট ব্যর্থ হয়েছে');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="বন্ধ করুন"
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">পেমেন্ট নিশ্চিত করুন</h2>

          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2 mb-1">
              <span className="text-sm text-gray-600">ব্যবহারকারী আইডি:</span>
              <span className="font-medium">{paymentDetails.userId}</span>
              <span className="text-sm text-gray-600">ব্যবহারকারীর নাম:</span>
              <span className="font-medium">{paymentDetails.userName}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">প্ল্যানের মেয়াদ:</span>
              <span className="font-medium">{paymentDetails.durationLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">প্রদেয় পরিমাণ:</span>
              <span className="text-lg font-bold">৳{paymentDetails.amount}</span>
            </div>
          </div>

          <form onSubmit={handlePaymentSubmit} className="space-y-5">
            {/* পেমেন্ট মেথড */}
            <div>
              <h3 className="text-sm font-medium mb-2">পেমেন্ট মেথড নির্বাচন করুন</h3>
              <div className="grid grid-cols-2 gap-4">
                {['bkash', 'nagad'].map((m) => (
                  <label
                    key={m}
                    className={`flex flex-col items-center border-2 rounded-lg p-4 cursor-pointer transition ${
                      paymentMethod === m
                        ? m === 'bkash'
                          ? 'border-indigo-500'
                          : 'border-orange-500'
                        : 'border-transparent hover:border-gray-300'
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
                    {m === 'bkash' ? (
                      <img src={BkashIcon} alt="bKash" className="h-8 mb-2" />
                    ) : (
                      <img src={NagadIcon} alt="Nagad" className="h-8 mb-2" />
                    )}
                    <span className="text-sm font-medium">{m.toUpperCase()}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* ফোন নম্বর */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                ফোন নম্বর
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhoneAlt className="text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                আপনার {paymentMethod.toUpperCase()} অ্যাকাউন্টের সাথে সংযুক্ত নম্বর লিখুন।
              </p>
            </div>

            {/* ট্রানজ্যাকশন আইডি */}
            <div>
              <label htmlFor="transactionId" className="block text-sm font-medium">
                ট্রানজ্যাকশন আইডি
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaHashtag className="text-gray-400" />
                </div>
                <input
                  id="transactionId"
                  type="text"
                  placeholder="ট্রানজ্যাকশন আইডি লিখুন"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || isSubmitting}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isProcessing || isSubmitting ? 'প্রক্রিয়াকরণ হচ্ছে...' : 'নিশ্চিত করুন এবং পে করুন'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
PaymentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  paymentDetails: PropTypes.shape({
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userName: PropTypes.string,
    plan: PropTypes.string,
    durationLabel: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default PaymentModal;
