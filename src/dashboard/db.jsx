import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  useGetprofileQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useWithdrawMutation,
  useGetWithdrawalsQuery,
  useLogoutMutation,
} from "../context/authApi";

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: user, isLoading: isUserLoading, error: userError } = useGetprofileQuery();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [withdraw, { isLoading: isWithdrawing }] = useWithdrawMutation();
  const { data: withdrawalHistory, isLoading: isHistoryLoading } = useGetWithdrawalsQuery();
  const [logout] = useLogoutMutation();

  // Form states
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
  });
  const [withdrawForm, setWithdrawForm] = useState({
    points: "",
    paymentProvider: "bkash",
    paymentNumber: "",
  });

  // Debounced form states
  const debouncedProfileForm = useDebounce(profileForm, 300);
  const debouncedWithdrawForm = useDebounce(withdrawForm, 300);

  // Tab state
  const [tab, setTab] = useState("dashboard");

  // Redirect to /signin if not authenticated
  useEffect(() => {
    if (userError && userError.status === 401) {
      toast.error("Please sign in to access the dashboard");
      navigate("/signin");
    }
  }, [userError, navigate]);

  // Initialize profile form
  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobileNumber: user.mobileNumber || "",
        address: user.address || "",
      });
    }
  }, [user]);

  // Form validation
  const validateProfileForm = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\+?[1-9]\d{1,14}$/;
    if (!emailRegex.test(debouncedProfileForm.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!mobileRegex.test(debouncedProfileForm.mobileNumber)) {
      toast.error("Invalid mobile number format (e.g., +88017XXXXXXXX)");
      return false;
    }
    return true;
  }, [debouncedProfileForm]);

  const validateWithdrawForm = useCallback(() => {
    const pts = parseInt(debouncedWithdrawForm.points, 10);
    if (!pts || pts <= 0 || pts > (user?.points || 0)) {
      toast.error("Invalid withdrawal amount");
      return false;
    }
    if (debouncedWithdrawForm.paymentNumber.length < 10) {
      toast.error("Payment number must be at least 10 digits");
      return false;
    }
    return true;
  }, [debouncedWithdrawForm, user]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      await changePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      }).unwrap();
      toast.success("Password updated successfully");
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.data?.message || "Failed to change password");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!validateProfileForm()) return;
    try {
      await updateProfile(debouncedProfileForm).unwrap();
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.data?.message || "Failed to update profile");
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!validateWithdrawForm()) return;
    try {
      await withdraw({
        points: parseInt(debouncedWithdrawForm.points, 10),
        paymentProvider: debouncedWithdrawForm.paymentProvider,
        paymentNumber: debouncedWithdrawForm.paymentNumber,
      }).unwrap();
      toast.success("Withdrawal requested successfully");
      setWithdrawForm({ points: "", paymentProvider: "bkash", paymentNumber: "" });
    } catch (err) {
      toast.error(err.data?.message || "Failed to process withdrawal");
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success("Logged out successfully");
      navigate("/signin");
    } catch (err) {
      toast.error(err.data?.message || "Failed to log out");
    }
  };

  // Loading skeleton for sidebar
  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-6"
        >
          {/* Sidebar */}
          <div className="md:w-1/3 bg-white shadow-xl rounded-xl p-6">
            {isUserLoading ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <motion.img
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  src={user.picture || "https://via.placeholder.com/150"}
                  alt="User avatar"
                  className="w-24 h-24 rounded-full mb-4 object-cover shadow-md"
                />
                <h2 className="text-xl font-bold text-gray-800">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-500 mb-2">{user.email}</p>
                <p className="text-sm text-gray-600 mb-2">{user.mobileNumber}</p>
                <p className="text-sm text-gray-600">{user.address}</p>
                <span className="mt-4 inline-block px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  {user.subscriptionPlan.charAt(0).toUpperCase() + user.subscriptionPlan.slice(1)} Member
                </span>
                <div className="mt-6 text-center">
                  <p className="text-gray-500">Points</p>
                  <p className="text-2xl font-bold text-indigo-600">{user.points}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                  aria-label="Log out"
                >
                  Logout
                </motion.button>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="md:w-2/3">
            {/* Tabs */}
            <div className="flex space-x-4 mb-6 bg-white rounded-lg shadow p-2">
              {["dashboard", "profile", "withdraw", "history"].map((key) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setTab(key)}
                  className={`px-4 py-2 font-medium rounded-lg transition ${
                    tab === key ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  aria-label={`Switch to ${key} tab`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </motion.button>
              ))}
            </div>

            {/* Panels */}
            {tab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-4 rounded-lg shadow"
                  >
                    <h3 className="text-gray-500">Current Points</h3>
                    <p className="text-2xl font-bold text-indigo-600">{user.points}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-4 rounded-lg shadow"
                  >
                    <h3 className="text-gray-500">Active Referrals</h3>
                    <p className="text-2xl font-bold text-indigo-600">15</p>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <h3 className="text-lg font-medium mb-4">Monthly Referrals</h3>
                  {/* TODO: Replace with a chart component such as react-chartjs-2 */}
                  <div className="h-48 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg border border-dashed">
                    Chart placeholder
                  </div>
                </motion.div>
              </div>
            )}

            {tab === "profile" && (
              <div className="space-y-6">
                {/* Update Profile */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleUpdateProfile}
                  className="bg-white p-6 rounded-lg shadow space-y-4"
                  aria-label="Update profile form"
                >
                  <h3 className="text-lg font-medium mb-4">Update Profile</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                      required
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-label="First name"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                      required
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-label="Last name"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Email address"
                  />
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={profileForm.mobileNumber}
                    onChange={(e) => setProfileForm({ ...profileForm, mobileNumber: e.target.value })}
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Mobile number"
                  />
                  <textarea
                    placeholder="Address"
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    rows={3}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Address"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
                    aria-label="Update profile"
                  >
                    {isUpdatingProfile ? "Updating..." : "Update Profile"}
                  </motion.button>
                </motion.form>

                {/* Change Password */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleChangePassword}
                  className="bg-white p-6 rounded-lg shadow space-y-4"
                  aria-label="Change password form"
                >
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Current password"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="New password"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Confirm new password"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isChangingPassword}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
                    aria-label="Change password"
                  >
                    {isChangingPassword ? "Changing..." : "Change Password"}
                  </motion.button>
                </motion.form>
              </div>
            )}

            {tab === "withdraw" && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleWithdraw}
                className="bg-white p-6 rounded-lg shadow space-y-4"
                aria-label="Withdraw points form"
              >
                <h3 className="text-lg font-medium mb-4">Withdraw Points</h3>
                <p className="text-gray-600">Available: {user.points} points</p>
                <input
                  type="number"
                  placeholder="Points to withdraw"
                  value={withdrawForm.points}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, points: e.target.value })}
                  required
                  min="1"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Points to withdraw"
                />
                <select
                  value={withdrawForm.paymentProvider}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, paymentProvider: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Payment provider"
                >
                  <option value="bkash">bKash</option>
                  <option value="nagad">Nagad</option>
                  <option value="rocket">Rocket</option>
                </select>
                <input
                  type="text"
                  placeholder="Payment Number"
                  value={withdrawForm.paymentNumber}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, paymentNumber: e.target.value })}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Payment number"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isWithdrawing}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
                  aria-label="Submit withdrawal"
                >
                  {isWithdrawing ? "Processing..." : "Submit Withdrawal"}
                </motion.button>
              </motion.form>
            )}

            {tab === "history" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h3 className="text-lg font-medium mb-4">Withdrawal History</h3>
                {isHistoryLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : withdrawalHistory?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                      <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-2">Date</th>
                          <th scope="col" className="px-4 py-2">Points</th>
                          <th scope="col" className="px-4 py-2">Provider</th>
                          <th scope="col" className="px-4 py-2">Number</th>
                          <th scope="col" className="px-4 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {withdrawalHistory
                          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                          .map((record) => (
                            <tr key={record._id} className="border-b">
                              <td className="px-4 py-2">
                                {new Date(record.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-2">{record.points}</td>
                              <td className="px-4 py-2">
                                {record.paymentProvider.charAt(0).toUpperCase() + record.paymentProvider.slice(1)}
                              </td>
                              <td className="px-4 py-2">{record.paymentNumber}</td>
                              <td className="px-4 py-2">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    record.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : record.status === "completed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No withdrawal history available</p>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}