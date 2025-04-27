import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Db() {
  // Mock data for member profile (will be replaced with backend data)
  const [member, setMember] = useState({
    name: 'John Doe',
    picture: 'https://via.placeholder.com/150', // Placeholder image
    membership: 'premium', // Can be 'free', 'premium', or 'advance'
    earnings: 1200, // Current earnings
    referrals: 15, // Number of active referrals
  });

  // Mock data for resume (will be replaced with backend data)
  const [resume, setResume] = useState({
    title: 'My Resume',
    thumbnail: 'https://via.placeholder.com/200x150', // Placeholder thumbnail
  });

  // Mock data for referrals graph (will be replaced with backend data)
  const referralsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Referrals',
        data: [5, 10, 8, 15, 12, 18, 20],
        borderColor: '#4F46E5', // Indigo color
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // State for withdraw amount
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Handle profile picture change (placeholder for backend integration)
  const handlePictureChange = () => {
    alert('Profile picture change functionality will be added after backend setup.');
  };

  // Handle withdraw amount submission
  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!withdrawAmount || isNaN(withdrawAmount)) {
      alert('Please enter a valid amount.');
      return;
    }
    if (parseFloat(withdrawAmount) > member.earnings) {
      alert('You cannot withdraw more than your current earnings.');
      return;
    }
    alert(`Withdraw request for $${withdrawAmount} submitted.`);
    // Placeholder for backend integration
    // fetch('/api/withdraw', { method: 'POST', body: JSON.stringify({ amount: withdrawAmount }) })
    //   .then(response => response.json())
    //   .then(data => console.log(data));
    setWithdrawAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Side - Member Profile */}
          <div className="md:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={member.picture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <button
                  onClick={handlePictureChange}
                  className="absolute bottom-2 right-2 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  ✏️
                </button>
              </div>
              <h2 className="text-xl font-bold">{member.name}</h2>
              <div className="mt-2">
                {member.membership === 'free' && (
                  <span className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full">
                    Free Member
                  </span>
                )}
                {member.membership === 'premium' && (
                  <span className="px-3 py-1 text-sm bg-blue-900 text-blue-300 rounded-full flex items-center justify-center">
                    <span className="mr-2">Premium Member</span>
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  </span>
                )}
                {member.membership === 'advance' && (
                  <span className="px-3 py-1 text-sm bg-yellow-900 text-yellow-300 rounded-full flex items-center justify-center">
                    <span className="mr-2">Advance Member</span>
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Earnings, Referrals, and Resume */}
          <div className="md:col-span-3 space-y-6">
            {/* First Row - Earnings and Referrals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <h3 className="text-lg font-semibold text-blue-200">Current Earnings</h3>
                <p className="text-3xl font-bold text-white">${member.earnings}</p>
              </div>
              <div className="bg-gradient-to-r from-green-800 to-green-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <h3 className="text-lg font-semibold text-green-200">Active Referrals</h3>
                <p className="text-3xl font-bold text-white">{member.referrals}</p>
              </div>
            </div>

            {/* Second Row - Referrals Graph */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Monthly Referrals</h3>
              <Line
                data={referralsData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        color: '#E5E7EB', // Light gray color for legend text
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: '#4B5563', // Gray grid lines
                      },
                      ticks: {
                        color: '#E5E7EB', // Light gray color for x-axis labels
                      },
                    },
                    y: {
                      grid: {
                        color: '#4B5563', // Gray grid lines
                      },
                      ticks: {
                        color: '#E5E7EB', // Light gray color for y-axis labels
                      },
                    },
                  },
                }}
              />
            </div>

            {/* Third Row - Resume Builder */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Resume Builder</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={resume.thumbnail}
                  alt="Resume Thumbnail"
                  className="w-32 h-24 rounded-lg object-cover"
                />
                <div>
                  <p className="text-gray-300">{resume.title}</p>
                  <button
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    onClick={() => alert('Edit Resume')} // Placeholder for edit functionality
                  >
                    Edit Resume
                  </button>
                </div>
              </div>
            </div>

            {/* Fourth Row - Withdraw Section */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Withdraw Earnings</h3>
              <form onSubmit={handleWithdraw}>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount to withdraw"
                    min="0"
                    step="0.01"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Withdraw
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Db;