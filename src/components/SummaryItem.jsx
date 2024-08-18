import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { remove, updateQuantity } from '../redux/Slices/CartSlice';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const removeFromCart = () => {
    dispatch(remove(item.id));
    // toast.success('Item Removed');
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const isValid = /^\d+$/.test(value) && parseInt(value, 10) > 0;

    if (isValid) {
      setQuantity(value);
      dispatch(updateQuantity({ id: item.id, quantity: parseInt(value, 10) }));
    } else {
      setQuantity('1');
      e.target.value = ''; // Clear the input field
      alert('Please enter a valid quantity (whole number greater than 0)');
    }
  };

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
            <p className='font-bold text-lg text-green-600'>{item.price}</p>
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
      <ToastContainer />
    </div>
  );
};

export default CartItem;
