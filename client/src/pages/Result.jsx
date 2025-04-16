import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'


const Result = () => {
  const {  resultImage, image, resetImage } = useContext(AppContext)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[80vh]"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Background Removal Results</h2>
        </div>

        {/* Image Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Original Image */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Original Image</h3>
              {image && (
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                  {Math.round(image.size / 1024)} KB
                </span>
              )}
            </div>
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
              {image ? (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={URL.createObjectURL(image)}
                  alt="Original"
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="text-gray-400">No image uploaded</div>
              )}
            </div>
          </div>

          {/* Processed Image */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700">Background Removed</h3>
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
              {resultImage ? (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={resultImage}
                  alt="Background removed"
                  className="object-contain w-full h-full"
                />
              ) : image ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center space-y-4"
                >
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-violet-600 rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-violet-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">Processing your image...</p>
                </motion.div>
              ) : (
                <div className="text-gray-400">Result will appear here</div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {resultImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetImage}
              className="px-6 py-3 text-violet-600 font-medium text-sm border border-violet-600 rounded-lg hover:bg-violet-50 transition-colors"
            >
              Try Another Image
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
             href={resultImage}
             download={`bg-removed-${Date.now()}.png`}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-medium text-sm rounded-lg hover:shadow-lg transition-all"
            >
              Download Result
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* Quality Metrics (when result exists) */}
      {resultImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: '🖼️', title: 'HD Quality', value: '4K Resolution' },
            { icon: '✨', title: 'Precision', value: 'Pixel Perfect' },
            { icon: '⚡', title: 'Format', value: 'Transparent PNG' },
            { icon: '🔒', title: 'Privacy', value: 'No Watermarks' },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-3"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-xs text-gray-500">{item.title}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default Result