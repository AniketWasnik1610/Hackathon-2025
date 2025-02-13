import React from 'react'
import image from "../assets/hero.jpg"
const HeroSection = () => {
  return (
    <div className="w-full flex items-center justify-center px-4 mb-8">
      <section className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left pb-2">
          <div className='flex flex-row pb-6'>
            <p className="text-black font-semibold text-5xl">Welcome to </p>
            <p className="text-cyan-600 font-semibold  text-5xl pl-3">DataFlowX</p>
          </div>

          <h1 className="text-gray-600 indent-8 text-lg leading-tight">
            DataFlowX transforms real-time data monitoring with seamless capture, transmission, and visualization. Get instant updates, AI-powered anomaly detection, and robust performance for healthcare, IoT, and transportation.
          </h1>
          {/* Buttons */}
          <div className="mt-13  flex justify-center md:justify-start gap-4">
            <a href="#live" className="bg-indigo-500 text-white px-6 py-3 rounded-lg 
             hover:bg-indigo-700 active:scale-90 active:opacity-80 
             transition-all duration-200 ease-in-out border-1 border-black">
              Go Live
            </a>
          </div>
        </div>

        {/* Right Content (Image) */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={image}
            alt="img"
            className="z-0 rounded-xl drop-shadow-xl w-[500px] h-[500px] object-cover"
          />
        </div>


      </section>
    </div>
  )
}

export default HeroSection