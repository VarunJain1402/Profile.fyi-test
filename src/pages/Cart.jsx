import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { Link } from "react-router-dom";
import Item from "../components/SummaryItem";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [itemId, setItemId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  const removeFromCart = () => {
    dispatch(remove(itemId));
    console.log(`removed`);
  };

  useEffect(() => {
    // Calculate total items and total amount
    const total = cart.reduce(
      (acc, curr) => {
        acc.totalAmount += curr.price * curr.quantity;
        acc.totalItems += curr.quantity;
        return acc;
      },
      { totalAmount: 0, totalItems: 0 }
    );

    if (discountApplied) {
      total.totalAmount = total.totalAmount * 0.9; // Apply 10% discount
    }

    setTotalAmount(total.totalAmount);
    setTotalItems(total.totalItems);
  }, [cart, discountApplied]);

  const handleDiscountChange = () => {
    if (discountApplied) {
      const confirmRemove = window.confirm(
        "Are you sure you want to remove the discount?"
      );
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
              return <Item key={item.id} item={item} itemIndex={index} />;
            })}
          </div>

          <div className="w-[100%] md:w-[40%] mt-5 flex flex-col max-h-40">
            <div className="flex flex-col p-5 gap-5 my-14 h-[100%] justify-between">
              <div className="flex flex-col gap-5">
                <div className="font-semibold text-xl text-green-800">
                  Your Cart
                </div>
                <div className="font-semibold text-5xl text-green-700 -mt-5">
                  Summary
                </div>
                <p className="text-xl">
                  <span className="text-gray-700 font-semibold text-xl">
                    Total Items: {totalItems}
                  </span>
                </p>
                <label className="flex items-center gap-2 text-lg font-semibold">
                  <input
                    type="checkbox"
                    checked={discountApplied}
                    onChange={handleDiscountChange}
                    className="w-4 h-4"
                  />
                  Apply 10% Discount
                </label>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-xl font-bold">
                <span className="text-gray-700 font-semibold">
                  Total Amount:
                </span>{" "}
                ${totalAmount.toFixed(2)}
              </p>
              <button className="bg-green-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-bold hover:text-green-700 p-3 text-xl">
                CheckOut Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-gray-700 font-semibold text-xl mb-2">
            No Item to show
          </h1>
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

