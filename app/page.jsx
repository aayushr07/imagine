'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative bg-gradient-to-r from-white via-gray-100 to-gray-200 text-gray-800 min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Image Section with Animation */}
      <div className="mb-6 transform transition-all duration-700 ease-in-out hover:scale-110 hover:shadow-2xl animate__animated animate__fadeIn animate__delay-1s">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVL9tfVWVWLX8jiKGmbm4PhI8VGIqpM0GVxQ&s"
          alt="Animal Health Tracker"
          className="w-full max-w-2xl rounded-lg shadow-xl transition-all duration-500 ease-in-out transform hover:scale-110"
        />
      </div>

      {/* Title and Subtitle */}
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-800">
          Welcome to Animal Health Tracker
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Empowering pet owners to monitor and improve their furry friends' health.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-12">
        <Link
          href="/diagnostics"
          className="px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
        >
          Get Started
        </Link>
        <Link
          href="/about"
          className="px-8 py-4 bg-gray-500 hover:bg-gray-400 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
        >
          Learn More
        </Link>
      </div>

      {/* Features Section */}
      <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out max-w-xs">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Track Health</h3>
          <p className="text-gray-600">Monitor your pet's health metrics and get alerts about their well-being.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out max-w-xs">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Provide Care</h3>
          <p className="text-gray-600">Create a customized care plan for your animal's needs.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out max-w-xs">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Veterinary Guidance</h3>
          <p className="text-gray-600">Get veterinary advice and resources directly from experts.</p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        © 2025 Animal Health Tracker. All rights reserved.
      </footer>
    </div>
  );
}
