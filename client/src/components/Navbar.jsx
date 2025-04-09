import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const { credit, loadCreditData } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      loadCreditData();
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSignedIn]);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm" 
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
            
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EraseMaster
              </span>
            </motion.div>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                {/* Credits Button */}
                <motion.button
                  onClick={() => navigate('/buy')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-all duration-200"
                >
                  <div className="relative">
                    <img 
                      src={assets.credit_icon} 
                      alt="Credits" 
                      className="w-5 h-5"
                    />
                    {credit > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                      >
                        {credit}
                      </motion.span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Credits
                  </span>
                </motion.button>

                {/* Mobile Credits Button */}
                <button 
                  onClick={() => navigate('/buy')}
                  className="sm:hidden flex items-center justify-center w-10 h-10 bg-blue-50 hover:bg-blue-100 rounded-full transition-all duration-200"
                  aria-label="Credits"
                >
                  <img 
                    src={assets.credit_icon} 
                    alt="Credits" 
                    className="w-5 h-5"
                  />
                  {credit > 0 && (
                    <span className="absolute -mt-3 -mr-3 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {credit}
                    </span>
                  )}
                </button>

                {/* User Profile */}
                <div className="flex items-center space-x-2">
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    Hi, {user.firstName}
                  </span>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                  >
                    <UserButton appearance={{
                      elements: {
                        avatarBox: "w-9 h-9 border-2 border-white shadow-sm",
                        userButtonPopoverCard: "shadow-lg rounded-xl"
                      }
                    }} />
                  </motion.div>
                </div>
              </>
            ) : (
              /* Sign In Button */
              <motion.button
                onClick={() => openSignIn({})}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span>Get Started</span>
                <motion.img 
                  src={assets.arrow_icon} 
                  alt="" 
                  className="w-4 h-4"
                  animate={{
                    x: [0, 4, 0],
                    transition: { repeat: Infinity, duration: 2 }
                  }}
                />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;