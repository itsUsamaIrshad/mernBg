import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value)
  }

  return (
    <section className="py-16 md:py-24 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              See The Magic Of AI Background Removal
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Drag the slider to compare original and processed images
          </p>
        </motion.div>

        {/* Image Comparison Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden border border-gray-700/50"
        >
          {/* Original Image (with background) */}
          <div className="relative w-full h-auto aspect-video">
            <img 
              src={assets.image_w_bg} 
              alt="Original image with background" 
              className="w-full h-full object-cover"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            />
            
            {/* Processed Image (without background) */}
            <img 
              src={assets.image_wo_bg} 
              alt="Processed image without background" 
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            />
          </div>

          {/* Custom Slider */}
          <div className="absolute inset-0 flex items-center justify-center">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              className="absolute w-full h-full opacity-0 cursor-ew-resize z-20"
            />
            
            {/* Visual Slider Handle */}
            <motion.div
              className="absolute top-0 bottom-0 w-1 bg-white z-10"
              style={{ left: `${sliderPosition}%` }}
              animate={{
                scaleX: isDragging ? 1.5 : 1,
                boxShadow: isDragging ? '0 0 15px rgba(255,255,255,0.5)' : 'none'
              }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <div className="absolute -left-3 -top-3 bottom-0 flex items-center justify-center">
                <motion.div
                  className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg"
                  animate={{
                    scale: isDragging ? 1.2 : 1,
                    backgroundColor: isDragging ? '#a78bfa' : '#ffffff'
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-4 left-4 bg-gray-900/80 text-white px-3 py-1 rounded-md text-sm z-10">
            Original
          </div>
          <div className="absolute bottom-4 right-4 bg-gray-900/80 text-white px-3 py-1 rounded-md text-sm z-10">
            Background Removed
          </div>
        </motion.div>

        {/* Quality Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-center"
        >
          {[
            { text: "4K Resolution", icon: "🖼️" },
            { text: "Pixel Perfect", icon: "✨" },
            { text: "Instant Results", icon: "⚡" },
            { text: "No Watermarks", icon: "🚫" }
          ].map((item, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="text-sm text-gray-300">{item.text}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default BgSlider