import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/CartSlice";

const Product = ({ post }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(post));
    // toast.success("Item added to Cart");
  }

  const removeFromCart = () => {
    dispatch(remove(post.id));
    // toast.error("Item removed from Cart");
  };

  return (
    <div className="flex flex-col items-center justify-between bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-xl p-4 m-5 max-w-xs font-classy border border-gray-50">
      <div className="w-full">
        <p className="text-gray-800 font-bold text-lg text-left truncate mt-1">{post.title}</p>
      </div>
      <div className="w-full mt-2">
        <p className="text-gray-500 font-normal text-sm text-left truncate">{post.description.split(" ").slice(0,10).join(" ") + "..."}</p>
      </div>
      <div className="w-full h-48 mt-4 rounded-lg overflow-hidden">
        <img src={post.image} alt="img" className="w-full h-full object-cover" />
      </div>
      <div className="flex justify-between items-center w-full mt-5">
        <div>
          <p className="text-green-600 font-semibold text-xl">${post.price ? post.price : (Math.random() * 100).toFixed(2)}</p>
        </div>
       {
          cart.some((p) => p.id === post.id) ?
          (<button
          className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          hover:bg-gray-700
          hover:text-white transition duration-300 ease-in"
          onClick={removeFromCart}>
            Remove Item
          </button>) :
          (<button
          className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          hover:bg-gray-700
          hover:text-white transition duration-300 ease-in"
          onClick={addToCart}>
            Add to Cart
          </button>)
        }
      </div>
    </div>
  );
};

export default Product;
