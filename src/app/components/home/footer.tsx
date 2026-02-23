import React from "react";
import {
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FooterLink, SocialLink, PaymentMethod } from "@/types";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      icon: <FaLinkedin size={16} />,
      url: "https://www.linkedin.com/company/crosscareers",
      label: "LinkedIn",
    },
    {
      icon: <FaYoutube size={16} />, 
      url: "https://www.youtube.com/@CrossCareers",
      label: "YouTube",
    },
    {
      icon: <FaFacebook size={16} />,
      url: "https://www.facebook.com/profile.php?id=61574918625249",
      label: "Facebook",
    },
    {
      icon: <FaTwitter size={16} />,
      url: "https://x.com/crosscareer",
      label: "Twitter",
    },
    {
      icon: <FaInstagram size={16} />,
      url: "https://instagram.com",
      label: "Instagram",
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      name: "bKash",
      image: "https://i.ibb.co/M5NmvgDZ/bkash-logo-png-seeklogo-382709.png",
    },
    { name: "Nagad", image: "https://i.ibb.co/VYt0Cxpb/Nagad-Logo-wine-1.png" },
    {
      name: "Rocket",
      image:
        "https://i.ibb.co/GX5WMnv/dutch-bangla-rocket-logo-png-seeklogo-317692-1.png",
    },
  ];

  const companyLinks: FooterLink[] = [
    { label: "About Us", path: "/about-us" },
    { label: "Referral System", path: "/referral-program" },
    { label: "Jobs & Procurement", path: "/career" },
    { label: "Contact", path: "/contact-us" },
  ];

  const legalLinks: FooterLink[] = [
    { label: "Terms & Conditions", path: "/terms-and-conditions" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Legal Poliicy", path: "/legal-poliicy" },
  ];

  return (
    <footer className="relative bg-white dark:bg-[#0b1120] text-slate-600 dark:text-slate-400 font-sans">
      {/* Decorative Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <div className="container mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Column 1: Brand Info (Spans 4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="https://i.ibb.co.com/ksnkSFzZ/banner.png"
                alt="Cross Careers"
                className="h-12 object-contain brightness-100 dark:brightness-90"
              />
            </Link>
            <p className="text-[15px] leading-relaxed max-w-sm text-slate-600 dark:text-slate-400">
              An AI-powered career hub providing job opportunities, resume building, interview preparation, and productivity tools to help job seekers build skills and succeed in a competitive market.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all duration-300 transform hover:-translate-y-1"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Company Links (Spans 2 columns) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6 relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-indigo-600 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-[15px] hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center group transition-colors duration-200"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-1 text-indigo-500 opacity-0 group-hover:opacity-100">
                      •
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Legal (Spans 3 columns) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6 relative inline-block">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-indigo-600 rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-[15px]">
              <li className="flex items-start gap-3 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 shrink-0">
                  <FaMapMarkerAlt size={14} />
                </div>
                <span className="group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                  32/2, Senpara Porbota,
                  <br />
                  Mirpur-10, Dhaka 1216
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 shrink-0">
                  <FaEnvelope size={14} />
                </div>
                <a
                  href="mailto:info@crosscareers.com"
                  className="hover:text-indigo-600 transition-colors font-medium"
                >
                  info@crosscareers.com
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 shrink-0">
                  <FaPhoneAlt size={14} />
                </div>
                <a
                  href="tel:+8801841994979"
                  className="hover:text-indigo-600 transition-colors font-medium"
                >
                  +880 1841 994979
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Payments (Spans 3 columns) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6 relative inline-block">
              Subscribe
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-indigo-600 rounded-full"></span>
            </h3>
            <p className="text-sm mb-4 text-slate-500">
              Join our newsletter for the latest career opportunities.
            </p>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-4 pr-12 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  <FaPaperPlane size={12} />
                </button>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase text-slate-400 mb-3 tracking-wider">
                Secure Payment Partners
              </p>
              <div className="flex items-center gap-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-white p-1 rounded-md border border-slate-100 h-8 w-14 flex items-center justify-center overflow-hidden shadow-sm"
                  >
                    <img
                      src={method.image}
                      alt={method.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-500">
              © {currentYear}{" "}
              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                CrossCareers
              </span>
              . All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            {legalLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
