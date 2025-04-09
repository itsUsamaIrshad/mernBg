import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: assets.facebook_icon, alt: "Facebook", color: "hover:text-blue-600" },
    { icon: assets.twitter_icon, alt: "Twitter", color: "hover:text-blue-400" },
  
  ];

  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "API", "Integrations"]
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Contact"]
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Cookie Policy", "GDPR"]
    }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div className="space-y-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
                EraseMaster
              </span>
            </motion.div>
            <p className="text-gray-400 text-sm">
              The most powerful AI background remover for professional quality images in seconds.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3 }}
                  className={`text-gray-400 ${social.color} transition-colors`}
                  aria-label={social.alt}
                >
                  <img 
                    src={social.icon} 
                    alt={social.alt} 
                    className="w-5 h-5 object-contain"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((column, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-white font-medium">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a 
                      href="#" 
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-medium">Subscribe to our newsletter</h3>
            <p className="text-gray-400 text-sm">
              Get the latest updates and tips delivered to your inbox.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white text-sm rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded text-sm font-medium whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Usama.dev. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;