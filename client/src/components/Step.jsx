import React from 'react'
import { assets } from '../assets/assets'

const Step = () => {
  return (
    
    <>
    

    <div className='mx-4 lg:mx-44 py-20 lg:py-40 '>
        <h1 className=' text-center text-2xl md:text-3xl lg:text-5xl mt-4 font-semibold  bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>Steps to remove background image in seconds</h1>
        <div className=' flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center'>
            <div className=' flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                <img src={assets.upload_icon} alt="" className=' max-w-9' />
                <div>
                    <p className=' text-xl font-medium'>Upload Image</p>
                    <p className=' text-sm text-neutral-500 mt-1'>This is the demo text, will replace it later. This is a demo..</p>
                </div>
            </div>
            <div className=' flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                <img src={assets.remove_bg_icon} alt="" className=' max-w-9' />
                <div>
                    <p className=' text-xl font-medium'>Remove background</p>
                    <p className=' text-sm text-neutral-500 mt-1'>This is the demo text, will replace it later. This is a demo..</p>
                </div>
            </div>
            <div className=' flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                <img src={assets.download_icon} alt="" className=' max-w-9' />
                <div>
                    <p className=' text-xl font-medium'>Download Image</p>
                    <p className=' text-sm text-neutral-500 mt-1'>This is the demo text, will replace it later. This is a demo..</p>
                </div>
            </div>
        </div>
    </div>
    
    
    
    
    
    
    </>
  )
}

export default Step