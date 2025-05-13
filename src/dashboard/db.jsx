import React, { useState, useEffect } from 'react';

const BASE_URL ='http://localhost:4001';

export default function Dashboard() {
  // User state
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    mobileNumber: '+88017XXXXXXXX',
    address: '123 Main St, Dhaka, Bangladesh',
    points: 1200,
    subscriptionPlan: 'premium',
    picture: 'https://via.placeholder.com/150',
  });

  // Form states
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [profileForm, setProfileForm] = useState({ firstName: '', lastName: '', email: '', mobileNumber: '', address: '' });
  const [withdrawForm, setWithdrawForm] = useState({ points: '', paymentProvider: 'bkash', paymentNumber: '' });

  // Loading states
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // Withdrawal history
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);

  // Fetch initial data
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${BASE_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (res.ok) setUser(await res.json());
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchHistory() {
      try {
        const res = await fetch(`${BASE_URL}/user/withdrawals`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (res.ok) setWithdrawalHistory(await res.json());
      } catch (err) {
        console.error(err);
      }
    }

    fetchProfile();
    fetchHistory();
  }, []);

  // Initialize profile form
  useEffect(() => {
    setProfileForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      address: user.address,
    });
  }, [user]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) return alert("Passwords don't match");
    setIsChangingPassword(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/change-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ oldPassword: passwordForm.oldPassword, newPassword: passwordForm.newPassword }),
      });
      if (!res.ok) throw new Error((await res.json()).message);
      alert('Password updated');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(profileForm),
      });
      if (!res.ok) throw new Error((await res.json()).message);
      const updated = await res.json();
      setUser(updated);
      alert('Profile updated');
    } catch (err) {
      alert(err.message);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const pts = parseInt(withdrawForm.points, 10);
    if (!pts || pts > user.points) return alert('Invalid withdraw amount');
    setIsWithdrawing(true);
    try {
      const res = await fetch(`${BASE_URL}/user/withdraw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ points: pts, ...withdrawForm }),
      });
      if (!res.ok) throw new Error((await res.json()).message);
      const record = await res.json();
      setUser((u) => ({ ...u, points: u.points - pts }));
      setWithdrawalHistory((h) => [record, ...h]);
      alert('Withdrawal requested');
      setWithdrawForm({ points: '', paymentProvider: 'bkash', paymentNumber: '' });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsWithdrawing(false);
    }
  };

  // Tab state
  const [tab, setTab] = useState('dashboard');

  return (
    <div className="min-h-screen mt-12 bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
       
          <div className="md:w-1/3 bg-white shadow rounded-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src={user.picture}
                alt="avatar"
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-500 mb-2">{user.email}</p>
              <p className="text-sm mb-4">{user.mobileNumber}</p>
              <p className="text-sm text-gray-600">{user.address}</p>
              <span className="mt-4 inline-block px-4 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {user.subscriptionPlan.charAt(0).toUpperCase() + user.subscriptionPlan.slice(1)} Member
              </span>
              <div className="mt-6 text-center">
                <p className="text-gray-500">Points</p>
                <p className="text-2xl font-bold">{user.points}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-2/3">
            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
              {['dashboard','profile','withdraw','history'].map((key) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`px-4 py-2 font-medium rounded ${tab===key? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} shadow`}
                >{key.charAt(0).toUpperCase()+key.slice(1)}</button>
              ))}
            </div>
            {/* Panels */}
            {tab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-gray-500">Current Points</h3>
                    <p className="text-2xl font-bold">{user.points}</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-gray-500">Active Referrals</h3>
                    <p className="text-2xl font-bold">15</p>
                  </div>
                </div>
                {/* Chart placeholder */}
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-medium mb-4">Monthly Referrals</h3>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Chart goes here
                  </div>
                </div>
              </div>
            )}

            {tab === 'profile' && (
              <div className="space-y-6">
                {/* Update Profile */}
                <form onSubmit={handleUpdateProfile} className="bg-white p-6 rounded shadow space-y-4">
                  <h3 className="text-lg font-medium">Update Profile</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                      required
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={profileForm.mobileNumber}
                    onChange={(e) => setProfileForm({ ...profileForm, mobileNumber: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    placeholder="Address"
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    rows={3}
                    className="w-full p-2 border rounded"
                  />
                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="px-6 py-2 bg-blue-600 text-white rounded font-medium"
                  >{isUpdatingProfile ? 'Updating...' : 'Update Profile'}</button>
                </form>

                {/* Change Password */}
                <form onSubmit={handleChangePassword} className="bg-white p-6 rounded shadow space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  />
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="px-6 py-2 bg-blue-600 text-white rounded font-medium"
                  >{isChangingPassword ? 'Changing...' : 'Change Password'}</button>
                </form>
              </div>
            )}

            {tab === 'withdraw' && (
              <form onSubmit={handleWithdraw} className="bg-white p-6 rounded shadow space-y-4">
                <h3 className="text-lg font-medium">Withdraw Points</h3>
                <p className="text-gray-600">Available: {user.points}</p>
                <input
                  type="number"
                  placeholder="Points to withdraw"
                  value={withdrawForm.points}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, points: e.target.value })}
                  required
                  className="w-full p-2 border rounded"
                />
                <select
                  value={withdrawForm.paymentProvider}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, paymentProvider: e.target.value })}
                  className="w-full p-2 border rounded"
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
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  disabled={isWithdrawing}
                  className="px-6 py-2 bg-blue-600 text-white rounded font-medium"
                >{isWithdrawing ? 'Processing...' : 'Submit'}</button>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}