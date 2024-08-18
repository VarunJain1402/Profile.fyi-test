import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { auth, db } from './firebase';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { doc, onSnapshot } from 'firebase/firestore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userCartRef = doc(db, 'carts', user.uid);

      // Listen for real-time updates to the user's cart
      const unsubscribe = onSnapshot(userCartRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const cartItems = docSnapshot.data().items || [];
          const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
          setTotalItems(total);
        } else {
          setTotalItems(0); // Set to 0 if no items exist
        }
      });

      return () => unsubscribe(); // Cleanup the subscription on unmount
    }
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = '/login';
      console.log('User logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  }

  return (
    <div className='bg-blue-600 shadow border-solid border-t-2 border-gradient-to-r from-blue-400 to-pink-500'>
      <nav className='flex justify-between items-center h-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <NavLink to='/'>
          <div className='text-3xl font-medium text-transparent bg-clip-text text-white'>
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
              {totalItems > 0 && (
                <span
                  className='absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                    justify-center items-center animate-bounce rounded-full text-white'
                >
                  {totalItems}
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
        <div className='md:hidden bg-gray-900 text-gray-100 px-4 pb-4 z-10'>
          <NavLink to='/' onClick={() => setIsOpen(false)}>
            <p className='py-2'>Home</p>
          </NavLink>
          <NavLink to='/summary' onClick={() => setIsOpen(false)}>
            <p className='py-2'>Summary</p>
          </NavLink>
          <NavLink
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
          >
            <p className='py-2'>Logout</p>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
