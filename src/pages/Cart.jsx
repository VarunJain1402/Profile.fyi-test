import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../components/firebase";
import { Link } from "react-router-dom";
import Item from "../components/SummaryItem";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userCartRef = doc(db, 'carts', user.uid);
      
      const unsubscribe = onSnapshot(userCartRef, (doc) => {
        if (doc.exists()) {
          const items = doc.data().items;
          setCart(items);
        }
      });

      // Cleanup on unmount
      return () => unsubscribe();
    }
  }, [user]);

  const calculateTotals = () => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalItems(totalItems);
    setTotalAmount(discountApplied ? totalAmount * 0.9 : totalAmount);
  };

  useEffect(() => {
    calculateTotals();
  }, [cart, discountApplied]);

  const toggleDiscount = () => {
    if (discountApplied) {
      const confirmRemove = window.confirm("Are you sure you want to remove the discount?");
      if (confirmRemove) {
        setDiscountApplied(false);
      }
    } else {
      setDiscountApplied(true);
    }
  };

  return (
    <div>
      {cart.length > 0 ? (
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-center">
          <div className="w-[100%] md:w-[60%] flex flex-col p-2">
            {cart.map((item, index) => {
              return (
                <Item
                  key={item.id}
                  item={item}
                  onQuantityChange={calculateTotals}
                  onRemove={calculateTotals}
                />
              );
            })}
          </div>

          <div className="w-[100%] md:w-[40%] mt-5 flex flex-col max-h-40">
            <div className="flex flex-col p-5 gap-5 my-14 h-[100%] justify-between">
              <div className="flex flex-col gap-5">
                <div className="font-semibold text-xl text-green-800">Your Cart</div>
                <div className="font-semibold text-5xl text-green-700 -mt-5">Summary</div>
                <p className="text-xl">
                  <span className="text-gray-700 font-semibold text-xl">Total Items: {totalItems}</span>
                </p>
                <label>
                  <input
                    type="checkbox"
                    checked={discountApplied}
                    onChange={toggleDiscount}
                  />
                  Apply 10% discount
                </label>
              </div>

              <div className="flex flex-col">
                <p className="text-xl font-bold">
                  <span className="text-gray-700 font-semibold">Total Amount:</span> ${totalAmount.toFixed(2)}
                </p>
                <button className="bg-green-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-bold hover:text-green-700 p-3 text-xl">
                  CheckOut Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-gray-700 font-semibold text-xl mb-2">No Item to show</h1>
          <Link to={"/"}>
            <button className="uppercase bg-green-600 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-semibold hover:text-green-700 p-3 px-10 tracking-wider">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
