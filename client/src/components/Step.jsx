import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Step = () => {
  const steps = [
    {
      icon: assets.upload_icon,
      title: "1. Upload Your Image",
      description: "Simply drag & drop or click to upload any JPG, PNG, or WEBP file. Our system supports high-resolution images up to 10MB.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: assets.remove_bg_icon,
      title: "2. AI Magic Works Instantly",
      description: "Our advanced AI detects subjects with pixel-perfect precision, removing backgrounds in under 5 seconds with no manual work needed.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: assets.download_icon,
      title: "3. Download & Use Anywhere",
      description: "Get studio-quality transparent PNGs or edited images ready for e-commerce, social media, or print materials.",
      color: "from-amber-500 to-orange-500"
    }
  ]

  return (
    <section className='bg-gray-900 py-20 lg:py-28 border-t border-gray-800'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center max-w-4xl mx-auto mb-16'
        >
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent'>
              Professional Results in 3 Clicks
            </span>
          </h2>
          <p className='text-lg text-gray-400'>
            Transform your images with the most accurate background remover powered by AI technology
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto'>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 transition-all hover:shadow-lg hover:shadow-${step.color.split(' ')[0]}/10`}
            >
              <div className={`w-14 h-14 rounded-lg mb-6 flex items-center justify-center bg-gradient-to-r ${step.color}`}>
                <img src={step.icon} alt="" className='w-6 h-6' />
              </div>
              <h3 className='text-xl font-semibold text-white mb-3'>{step.title}</h3>
              <p className='text-gray-400 leading-relaxed'>{step.description}</p>
              {index < steps.length - 1 && (
                <div className='hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-gray-500'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bonus Feature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className='mt-20 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700/50 p-8 max-w-4xl mx-auto'
        >
          <div className='flex flex-col md:flex-row items-center gap-6'>
            <div className='flex-shrink-0 bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20'>
              <img src={assets.sparkle_icon} alt="" className='w-8 h-8' />
            </div>
            <div>
              <h3 className='text-xl font-semibold text-white mb-2'>Pro Tip: Batch Processing Available</h3>
              <p className='text-gray-400'>
                Upgrade to remove backgrounds from multiple images simultaneously - perfect for e-commerce product catalogs or team projects.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Step