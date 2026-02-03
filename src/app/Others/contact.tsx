import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";

/**
 * Interfaces for Type Safety
 */
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactInfoProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
}

/**
 * Reusable Contact Information Item Component
 */
const ContactInfoItem: FC<ContactInfoProps> = ({ icon, label, href }) => (
  <li className="flex items-start group">
    <div className="bg-white/10 p-3 rounded-lg group-hover:bg-pink-600 transition-colors duration-300">
      {icon}
    </div>
    <div className="ml-4">
      {href ? (
        <a 
          href={href} 
          className="text-gray-200 hover:text-white text-sm md:text-base transition-colors break-all"
        >
          {label}
        </a>
      ) : (
        <p className="text-gray-200 text-sm md:text-base leading-relaxed">{label}</p>
      )}
    </div>
  </li>
);

const Contact: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call
    try {
      console.log('Form Data Submitted:', formData);
      // await api.post('/contact', formData);
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto overflow-hidden bg-[#2e0249] rounded-3xl shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-0">
            
            {/* Left Column: Contact Info */}
            <div className="p-8 md:p-16 bg-gradient-to-br from-[#2e0249] to-[#4e0581]">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Get in <span className="text-pink-500">Touch</span>
              </h1>
              <p className="text-gray-300 mt-6 text-lg max-w-md">
                Have questions about our career services? Our team is here to help you navigate the job sector.
              </p>

              <ul className="mt-12 space-y-8">
                <ContactInfoItem 
                  href="mailto:info@crosscareers.com"
                  label="info@crosscareers.com"
                  icon={
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                />
                <ContactInfoItem 
                  href="tel:+8801841994979"
                  label="+88 01841994979"
                  icon={
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                />
                <ContactInfoItem 
                  label="5th Floor, 32/2 Rangdhonu, BBCS Lane, Senapara parbota, Mirpur-10, Dhaka, Bangladesh"
                  icon={
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                />
              </ul>

              {/* Map Integration */}
              <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 shadow-inner">
                <iframe 
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3650.605337582264!2d90.3683!3d23.8045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzE2LjIiTiA5MMKwMjInMDUuOSJF!5e0!3m2!1sen!2sbd!4v1625000000000!5m2!1sen!2sbd" 
                  className="w-full h-56 grayscale invert opacity-80" 
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Social Links */}
              <div className="mt-10 flex space-x-4">
                {['facebook', 'linkedin', 'youtube'].map((platform) => (
                  <a
                    key={platform}
                    href={`https://${platform}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-pink-600 transition-all duration-300 transform hover:scale-110"
                  >
                    <span className="sr-only">{platform}</span>
                    <div className="w-5 h-5 bg-current mask-contain" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="p-8 md:p-16 bg-white">
              <div className="max-w-md mx-auto lg:mx-0">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send a Message</h2>
                <p className="text-gray-500 mb-10">We usually respond within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 text-gray-900 focus:ring-2 focus:ring-[#a91079] focus:bg-white outline-none transition-all border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 text-gray-900 focus:ring-2 focus:ring-[#a91079] focus:bg-white outline-none transition-all border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Career Consultation"
                      className="w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 text-gray-900 focus:ring-2 focus:ring-[#a91079] focus:bg-white outline-none transition-all border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us how we can help..."
                      rows={5}
                      className="w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 text-gray-900 focus:ring-2 focus:ring-[#a91079] focus:bg-white outline-none transition-all border resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg shadow-pink-200 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-3 
                      ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#a91079] hover:bg-[#8e0d66]'}`}
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Sending...</span>
                    ) : (
                      <>
                        <svg className="w-5 h-5 rotate-45" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;