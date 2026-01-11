import React from 'react';
import { FaLinkedin, FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {FooterLink, SocialLink, PaymentMethod  } from "@/types"



const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    { icon: <FaLinkedin size={18} />, url: "https://linkedin.com/company/youth-in-development", label: "LinkedIn" },
    { icon: <FaYoutube size={18} />, url: "https://youtube.com/youth-in-development", label: "YouTube" },
    { icon: <FaFacebook size={18} />, url: "https://facebook.com/youth-in-development", label: "Facebook" },
    { icon: <FaTwitter size={18} />, url: "https://twitter.com/youthindev", label: "Twitter" },
    { icon: <FaInstagram size={18} />, url: "https://instagram.com/youth_in_development", label: "Instagram" }
  ];

  const paymentMethods: PaymentMethod[] = [
    { name: "bKash", image: "https://i.ibb.co/M5NmvgDZ/bkash-logo-png-seeklogo-382709.png" },
    { name: "Nagad", image: "https://i.ibb.co/VYt0Cxpb/Nagad-Logo-wine-1.png" },
    { name: "Rocket", image: "https://i.ibb.co/GX5WMnv/dutch-bangla-rocket-logo-png-seeklogo-317692-1.png" },
  ];

  const footerLinks: FooterLink[] = [
    { label: "About", path: "/about" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Privacy & Payment Policy", path: "/privacy" },
    { label: "Contact", path: "/contact" },
    { label: "Membership", path: "/membership" },
    { label: "Earn Money", path: "/earn" }
  ];

  return (
    <footer className="bg-slate-50 dark:bg-[#0f172a] text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
           <Link to="/" className="block">
      <img
        src="https://i.ibb.co/Y75Y5NSb/banner.gif"
        alt="Cross Careers"
        className="h-10 md:h-10 object-contain"
      />
    </Link>
            <p className="text-sm leading-relaxed max-w-xs font-medium">
              Empowering the next generation of leaders in the development and humanitarian sectors through innovative career solutions.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">
              Navigation
            </h3>
            <nav className="flex flex-col space-y-3">
              {footerLinks.map((link, index) => (
                <Link 
                  key={index} 
                  to={link.path} 
                  className="text-[15px] hover:text-indigo-600 dark:hover:text-indigo-400 hover:translate-x-1 transition-all duration-200 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-4 text-[15px]">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-indigo-600 shrink-0" />
                <span>32/2, Senpara Porbota, Mirpur-10, Dhaka 1216</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-600 shrink-0" />
                <a href="mailto:info@crosscareers.com" className="hover:text-indigo-600 transition-colors">
                  info@crosscareers.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-indigo-600 shrink-0" />
                <a href="tel:+8801841994979" className="hover:text-indigo-600 transition-colors">
                  +880 1841 994979
                </a>
              </li>
            </ul>
          </div>

          {/* Payment & Trust Column */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">
              Payment Support
            </h3>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
              <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2 uppercase tracking-wide">Primary Merchant</p>
              <p className="text-xl font-black text-slate-900 dark:text-white">01886795620</p>
              <p className="text-[10px] text-indigo-600/70 dark:text-indigo-400 font-bold">BKASH PERSONAL</p>
            </div>
            
            <div className="flex gap-2">
              {paymentMethods.map((method, index) => (
                <div 
                  key={index} 
                  className="flex-1 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center p-2 shadow-sm hover:border-indigo-300 transition-colors"
                >
                  <img src={method.image} alt={method.name} className="max-h-full object-contain filter dark:brightness-110" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-slate-500">
            © {currentYear} CrossCareers. Designed with precision.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Secure SSL Encryption
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;