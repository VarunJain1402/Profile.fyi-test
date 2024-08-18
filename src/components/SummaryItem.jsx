import { AiFillDelete } from 'react-icons/ai'
import { useState, useEffect, useCallback } from 'react'
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore'
import { db, auth } from '../components/firebase'
import React from 'react'

const CartItem = React.memo(({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1)
  const user = auth.currentUser

  // Function to update quantity in Firestore
  const updateQuantityInFirestore = useCallback(
    async newQuantity => {
      if (user) {
        const userCartRef = doc(db, 'carts', user.uid)
        try {
          const updatedItem = { ...item, quantity: newQuantity }

          // Remove the old item and add the updated one
          await updateDoc(userCartRef, {
            items: arrayRemove(item) // Remove the old item
          })

          await updateDoc(userCartRef, {
            items: arrayUnion(updatedItem) // Add the updated item
          })
        } catch (error) {
          console.error('Error updating item quantity: ', error)
        }
      }
    },
    [item, user]
  )

  const removeFromCart = useCallback(async () => {
    if (user) {
      const userCartRef = doc(db, 'carts', user.uid)
      try {
        await updateDoc(userCartRef, {
          items: arrayRemove(item)
        })
      } catch (error) {
        console.error('Error removing item from cart: ', error)
      }
    } else {
      alert('You need to be logged in to remove items from the cart')
    }
  }, [item, user])

  const handleQuantityChange = useCallback(
    e => {
      const value = e.target.value
      const isValid = /^\d+$/.test(value) && parseInt(value, 10) > 0

      if (isValid) {
        setQuantity(value)
        updateQuantityInFirestore(parseInt(value, 10))
      } else {
        setQuantity('1')
        e.target.value = '' // Clear the input field
        alert('Please enter a valid quantity (whole number greater than 0)')
      }
    },
    [updateQuantityInFirestore]
  )

  return (
    <div className='flex items-center p-2 md:p-5 justify-between mt-2 mb-2 md:mx-5'>
      <div className='flex flex-col md:flex-row p-0 md:p-3 gap-5 items-center'>
        <div className='w-[30%]'>
          <img className='object-cover' src={item.image} alt='' />
        </div>
        <div className='md:ml-10 self-start space-y-5 w-[100%] md:w-[70%]'>
          <h1 className='text-xl text-slate-700 font-semibold'>{item.title}</h1>
          <h1 className='text-base text-slate-700 font-medium'>
            {item.description}
          </h1>
          <div className='flex items-center justify-between'>
            <p className='font-bold text-lg text-green-600'>${item.price}</p>
            <input
              type='number'
              value={quantity}
              onChange={handleQuantityChange}
              min='1'
              step='1'
              className='bg-slate-50 border border-green-50 text-green-600 w-20 sm:w-24 px-2 py-1 rounded-md shadow-sm transition duration-200 ease-in-out'
            />
            <div
              className='text-red-800 bg-red-200 group hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3'
              onClick={removeFromCart}
            >
              <AiFillDelete />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CartItem
