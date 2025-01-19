'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-black font-bold text-xl transition-all hover:scale-110">
          Paws & Pixels
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-indigo-500 text-black transition-all duration-300">Home</Link>
          <Link href="/feeding" className="hover:text-indigo-500 text-black transition-all duration-300">Feeding cycle</Link>
          <Link href="/about" className="hover:text-indigo-500 text-black transition-all duration-300">About</Link>
          <Link href="/consultation" className="hover:text-indigo-500 text-black transition-all duration-300">Consultaion</Link>
          <Link href="/contact" className="hover:text-indigo-500 text-black transition-all duration-300">Contact</Link>

          {/* Search Bar */}
          

          {/* Conditional Login/Profile */}
          {session ? (
            <>
              <Link href="/profile" className="hover:text-indigo-500 text-black transition-all duration-300">
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="text-red-500 hover:text-red-300 transition-all duration-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="hover:text-indigo-500 text-black transition-all duration-300"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 space-y-4 shadow-md">
          <Link href="/" className="block text-black hover:text-indigo-500">Home</Link>
          <Link href="/#categories" className="block text-black hover:text-indigo-500">Categories</Link>
          <Link href="/about" className="block text-black hover:text-indigo-500">About</Link>
          <Link href="/consultation" className="block text-black hover:text-indigo-500">Our Team</Link>
          <Link href="/contact" className="block text-black hover:text-indigo-500">Contact</Link>
          

          {session ? (
            <>
              <Link href="/profile" className="block text-black hover:text-indigo-500">
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="block w-full text-red-500 hover:text-red-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="block w-full text-black hover:text-indigo-500"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
