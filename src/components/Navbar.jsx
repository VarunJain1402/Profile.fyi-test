import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { auth } from './firebase'
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const { cart } = useSelector(state => state)
  const [isOpen, setIsOpen] = useState(false)

  async function handleLogout () {
    try {
      await auth.signOut()
      window.location.href = '/login'
      console.log('User logged out successfully!')
    } catch (error) {
      console.error('Error logging out:', error.message)
    }
  }

  return (
    <div className='bg-gray-900 shadow border-solid border-t-2 border-gradient-to-r from-blue-400 to-pink-500'>
      <nav className='flex justify-between items-center h-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <NavLink to='/'>
          <div className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500'>
            ShopNex
          </div>
        </NavLink>
        <div className='hidden md:flex items-center font-medium text-gray-100 space-x-6'>
          <NavLink to='/'>
            <p>Home</p>
          </NavLink>
          <NavLink to='/cart'>
            <div className='relative'>
              <FaShoppingCart className='text-2xl' />
              {cart.length > 0 && (
                <span
                  className='absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                    justify-center items-center animate-bounce rounded-full text-white'
                >
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
          <NavLink onClick={handleLogout}>
            <p>Logout</p>
          </NavLink>
        </div>
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FaTimes className='text-2xl text-gray-100' />
            ) : (
              <FaBars className='text-2xl text-gray-100' />
            )}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className='md:hidden bg-gray-900 text-gray-100 px-4 pb-4'>
          <NavLink to='/' onClick={() => setIsOpen(false)}>
            <p className='py-2'>Home</p>
          </NavLink>
          <NavLink to='/summary' onClick={() => setIsOpen(false)}>
            <p className='py-2'>Summary</p>
          </NavLink>
          <NavLink
            onClick={() => {
              setIsOpen(false)
              handleLogout()
            }}
          >
            <p className='py-2'>Logout</p>
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default Navbar
