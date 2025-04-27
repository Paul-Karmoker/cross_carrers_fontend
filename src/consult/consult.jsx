import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../Components/navbar'
import Footer from '../Components/footer'

const ConsultantCarousel = () => {
  // State management
  const [consultants, setConsultants] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    consultantName: '',
    consultantEmail: '',
    userName: '',
    userEmail: '',
    userPhone: '',
    message: '',
    preferredTime: ''
  });

  // Reliable sample data
  const sampleConsultants = [
    {
      id: '1',
      name: 'John Smith',
      title: 'Senior Business Consultant',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Over 10 years of experience helping businesses grow through strategic planning and market analysis. Specialized in scaling startups and improving operational efficiency.',
      expertise: ['Business Strategy', 'Market Research', 'Financial Planning'],
      availability: [
        { day: 'Monday', time: '9:00 AM - 12:00 PM' },
        { day: 'Wednesday', time: '2:00 PM - 5:00 PM' }
      ],
      email: 'john.smith@consulting.example.com'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      title: 'Marketing Specialist',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Digital marketing expert with 8 years of experience in social media strategy and brand development. Helped multiple brands increase their online presence by 300%.',
      expertise: ['Digital Marketing', 'Social Media', 'Brand Strategy'],
      availability: [
        { day: 'Tuesday', time: '10:00 AM - 1:00 PM' },
        { day: 'Thursday', time: '3:00 PM - 6:00 PM' }
      ],
      email: 'sarah.johnson@marketing.example.com'
    },
    {
      id: '3',
      name: 'Michael Chen',
      title: 'IT Solutions Architect',
      image: 'https://randomuser.me/api/portraits/men/65.jpg',
      bio: 'Technology consultant specializing in cloud solutions and digital transformation. Certified in multiple cloud platforms with a track record of successful migrations.',
      expertise: ['Cloud Computing', 'DevOps', 'System Architecture'],
      availability: [
        { day: 'Monday', time: '1:00 PM - 4:00 PM' },
        { day: 'Friday', time: '10:00 AM - 1:00 PM' }
      ],
      email: 'michael.chen@tech.example.com'
    }
  ];

  // Enhanced data fetching with better error handling
  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        // Try to fetch from API
        const response = await axios.get('/api/consultants');
        
        // Validate the response structure
        if (!response.data || !Array.isArray(response.data)) {
          console.warn('API returned invalid data format, using sample data');
          throw new Error('API response was not an array');
        }

        // Process and validate each consultant
        const validConsultants = response.data
          .filter(consultant => consultant && consultant.id) // Must have at least an ID
          .map(consultant => ({
            id: consultant.id,
            name: consultant.name || 'Consultant',
            title: consultant.title || '',
            image: consultant.image || 'https://via.placeholder.com/300',
            bio: consultant.bio || 'Professional consultant',
            expertise: Array.isArray(consultant.expertise) ? consultant.expertise : [],
            availability: Array.isArray(consultant.availability) 
              ? consultant.availability.map(avail => ({
                  day: avail.day || 'Day',
                  time: avail.time || 'Time'
                }))
              : [{ day: 'By appointment', time: '' }],
            email: consultant.email || 'contact@example.com'
          }));

        if (validConsultants.length === 0) {
          throw new Error('No valid consultants found in API response');
        }

        setConsultants(validConsultants);
        setError(null);
      } catch (err) {
        console.warn('Using sample data due to:', err.message);
        setConsultants(sampleConsultants);
        setError('Note: Showing sample data. Could not load live consultant information.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  // Carousel auto-rotation
  useEffect(() => {
    if (consultants.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % consultants.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [consultants]);

  // Navigation handlers
  const handlePrevClick = () => {
    setCurrentIndex(prev => (prev === 0 ? consultants.length - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex(prev => (prev + 1) % consultants.length);
  };

  // Contact form handlers
  const handleContactClick = (consultant) => {
    setFormData({
      consultantName: consultant.name,
      consultantEmail: consultant.email,
      userName: '',
      userEmail: '',
      userPhone: '',
      message: '',
      preferredTime: consultant.availability[0] 
        ? `${consultant.availability[0].day} ${consultant.availability[0].time}`
        : 'Flexible'
    });
    setShowContactForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.userName}! Your request has been sent to ${formData.consultantName}.`);
    setShowContactForm(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4">Loading consultants...</span>
      </div>
    );
  }

  return (
   <>
   <Navbar/>
    <div className="max-w-6xl mx-auto my-12 px-4 mt-20">
      {/* Error/sample data notice */}
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Carousel Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={handlePrevClick}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          disabled={consultants.length <= 1}
          aria-label="Previous consultant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex space-x-2">
          {consultants.map((_, index) => (
            <button
              key={`nav-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
              aria-label={`View consultant ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={handleNextClick}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          disabled={consultants.length <= 1}
          aria-label="Next consultant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Consultant Profile */}
      {consultants.length > 0 && (
        <motion.div
          key={`consultant-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-1/3 p-8">
              <motion.img 
                src={consultants[currentIndex].image}
                alt={`Portrait of ${consultants[currentIndex].name}`}
                className="w-full h-auto rounded-lg shadow-md object-cover max-h-80"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <div className="md:w-2/3 p-8">
              <h1 className="text-3xl font-bold text-gray-800">{consultants[currentIndex].name}</h1>
              <p className="text-lg text-blue-600 mt-2">{consultants[currentIndex].title}</p>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700">Career Summary</h2>
                <p className="mt-2 text-gray-600">{consultants[currentIndex].bio}</p>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700">Expertise</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {consultants[currentIndex].expertise.length > 0 ? (
                    consultants[currentIndex].expertise.map((skill, index) => (
                      <span 
                        key={`skill-${index}`}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">Expertise not specified</span>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700">Available Sessions</h2>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {consultants[currentIndex].availability.map((day, index) => (
                    <div 
                      key={`avail-${index}`}
                      className="bg-gray-50 p-3 rounded-lg"
                    >
                      <p className="font-medium text-gray-800">{day.day}</p>
                      <p className="text-sm text-gray-600">{day.time || 'Flexible'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Button */}
          <div className="px-8 pb-8 text-center">
            <motion.button
              onClick={() => handleContactClick(consultants[currentIndex])}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact {consultants[currentIndex].name.split(' ')[0]}
            </motion.button>
          </div>
        </motion.div>
      )}
      
      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-xl max-w-md w-full p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Contact {formData.consultantName}</h3>
              <button 
                onClick={() => setShowContactForm(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close contact form"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Consultant</p>
                <p className="text-gray-900">{formData.consultantName}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Consultant Email</p>
                <p className="text-gray-900">{formData.consultantEmail}</p>
              </div>
              
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                <input 
                  type="text" 
                  id="userName"
                  name="userName"
                  required
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">Your Email *</label>
                <input 
                  type="email" 
                  id="userEmail"
                  name="userEmail"
                  required
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700 mb-1">Your Phone Number</label>
                <input 
                  type="tel" 
                  id="userPhone"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">Preferred Time *</label>
                <select 
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {consultants[currentIndex]?.availability?.map((day, index) => (
                    <option 
                      key={`time-${index}`}
                      value={`${day.day} ${day.time}`}
                    >
                      {day.day} {day.time || 'Any time'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                <textarea 
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please describe what you'd like to discuss..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Consultation Request
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
    <Footer/>
   </>
  );
};

export default ConsultantCarousel;