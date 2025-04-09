import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Header = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl lg:max-w-xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Instant Background Remover
              </span>{" "}
              <br className="hidden lg:inline" />
              For Stunning Product Images
            </h1>

            <p className="text-lg text-gray-300 mb-8">
              Remove backgrounds in seconds with AI precision. Perfect for e-commerce, 
              social media, and professional portfolios. No design skills needed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div>
                <input
                  onChange={(e) => removeBg(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  id="upload1"
                  className="hidden"
                />
                <motion.label
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  htmlFor="upload1"
                  className="flex items-center gap-3 px-8 py-3.5 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                >
                  <img src={assets.upload_btn_icon} alt="Upload" className="w-5 h-5" />
                  <span className="text-white font-medium">Upload & Remove BG</span>
                </motion.label>
              </div>

              <motion.button 
                whileHover={{ y: -2 }}
                className="px-6 py-3.5 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors text-sm"
              >
                Watch Demo Video
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                <span>100% Automatic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                <span>HD Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                <span>No Credit Card Needed</span>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                y: { type: "spring", stiffness: 100, damping: 15 },
                opacity: { duration: 0.8 }
              }
            }}
            whileHover={{ y: -5 }}
            className="relative w-full max-w-md mt-10 lg:mt-0"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl rotate-1"></div>
            <motion.img 
              src={assets.header_img} 
              alt="Background removal example" 
              className="relative rounded-2xl shadow-2xl border border-gray-800/50 w-full"
              animate={{
                y: [0, -8, 0],
                transition: {
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut"
                }
              }}
            />
            <motion.div 
              className="absolute -bottom-4 -right-4 bg-gray-800 px-4 py-2 rounded-lg shadow-lg border border-gray-700/50 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium">AI Magic ✨</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;