import React from "react";
import {
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// --- Interfaces ---
interface SocialLink {
  icon: React.ReactNode;
  url: string;
  label: string;
  color: string;
}

interface FooterLink {
  label: string;
  path: string;
}

interface PaymentMethod {
  name: string;
  logo: string;
}

// --- Data Structures ---
const socialLinks: SocialLink[] = [
  {
    icon: <FaLinkedinIn />,
    url: "https://linkedin.com/company/youth-in-development",
    label: "LinkedIn",
    color: "hover:bg-[#0077b5]",
  },
  {
    icon: <FaYoutube />,
    url: "https://youtube.com/youth-in-development",
    label: "YouTube",
    color: "hover:bg-[#ff0000]",
  },
  {
    icon: <FaFacebookF />,
    url: "https://facebook.com/youth-in-development",
    label: "Facebook",
    color: "hover:bg-[#1877f2]",
  },
  {
    icon: <FaTwitter />,
    url: "https://twitter.com/youthindev",
    label: "Twitter",
    color: "hover:bg-[#1da1f2]",
  },
  {
    icon: <FaInstagram />,
    url: "https://instagram.com/youth_in_development",
    label: "Instagram",
    color: "hover:bg-[#e4405f]",
  },
];

const footerLinks: FooterLink[] = [
  { label: "About Us", path: "/about" },
  { label: "Terms & Conditions", path: "/terms" },
  { label: "Privacy & Payment Policy", path: "/privacy" },
  { label: "Contact Us", path: "/contact" },
  { label: "Membership", path: "/membership" },
  { label: "Affiliate Program", path: "/earn" },
];

const paymentMethods: PaymentMethod[] = [
  {
    name: "bKash",
    logo: "https://i.ibb.co/M5NmvgDZ/bkash-logo-png-seeklogo-382709.png",
  },
  { name: "Nagad", logo: "https://i.ibb.co/VYt0Cxpb/Nagad-Logo-wine-1.png" },
  {
    name: "Rocket",
    logo: "https://i.ibb.co/GX5WMnv/dutch-bangla-rocket-logo-png-seeklogo-317692-1.png",
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* 1. Brand Identity */}
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-indigo-600">
                CROSS{" "}
                <span className="text-indigo-600 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  CAREERS
                </span>
              </h2>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Empowering the next generation of leaders in the global
              Development & Humanitarian sectors through education and
              opportunity.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-white hover:-translate-y-1 ${social.color}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6">
              Explore
            </h3>
            <ul className="grid grid-cols-1 gap-4">
              {footerLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-indigo-600 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Official Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6">
              Headquarters
            </h3>
            <address className="not-italic space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-indigo-500">•</span>
                <p>
                  32/2, Senpara Porbota, Mirpur-10
                  <br />
                  Dhaka 1216, Bangladesh
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-indigo-500">•</span>
                <a
                  href="mailto:info@crosscareers.com"
                  className="hover:text-indigo-600 transition-colors"
                >
                  info@crosscareers.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-indigo-500">•</span>
                <a
                  href="tel:+8801841994979"
                  className="hover:text-indigo-600 transition-colors font-medium text-gray-900 dark:text-gray-200"
                >
                  +880 1841 994979
                </a>
              </div>
            </address>
          </div>

          {/* 4. Secure Payments */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6">
              Secure Checkout
            </h3>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <p className="text-xs font-medium mb-4 text-gray-500">
                Official Payment Portal:
              </p>
              <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                bKash: 01886795620
              </p>
              <div className="flex gap-3">
                {paymentMethods.map((method, idx) => (
                  <div
                    key={idx}
                    className="h-10 w-14 bg-white dark:bg-gray-800 rounded-lg p-1.5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={method.logo}
                      alt={method.name}
                      className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500 cursor-help"
                      title={method.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500">
            © {currentYear}{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              CrossCareers
            </span>
            . Bangladesh Reg No: 16XXX-XXXX.
          </p>
          <div className="flex items-center gap-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/SSL_Commerz_Logo.png/640px-SSL_Commerz_Logo.png"
              alt="SSL Secured"
              className="h-6 opacity-50 hover:opacity-100 transition-opacity invert dark:invert-0"
            />
            <div className="h-4 w-px bg-gray-200 dark:bg-gray-800 hidden md:block" />
            <p className="text-[10px] uppercase tracking-tighter text-gray-400">
              Enterprise Grade Security
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
