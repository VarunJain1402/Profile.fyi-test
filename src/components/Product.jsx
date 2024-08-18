import { useEffect, useState } from "react";
import { doc, getDoc,setDoc,  updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../components/firebase";

const Product = ({ post }) => {
  const [inCart, setInCart] = useState(false);
  const user = auth.currentUser;

  // Check if the item is already in the user's cart
  useEffect(() => {
    const checkIfInCart = async () => {
      if (user) {
        const userCartRef = doc(db, "carts", user.uid);
        const cartSnapshot = await getDoc(userCartRef);
        if (cartSnapshot.exists()) {
          const cartData = cartSnapshot.data().items;
          const itemInCart = cartData.some(item => item.id === post.id);
          setInCart(itemInCart);

        }
      }
    };

    checkIfInCart();
  }, [user, post.id]);


  const addToCart = async () => {
    if (user) {
      const userCartRef = doc(db, "carts", user.uid);

      try {
        // Check if the user's cart document exists
        const docSnap = await getDoc(userCartRef);

        if (docSnap.exists()) {
          // If the document exists, update it
          await updateDoc(userCartRef, {
            items: arrayUnion({ ...post, quantity: 1 }), // Add the item with an initial quantity of 1
          });
        } else {
          // If the document doesn't exist, create it with the item
          await setDoc(userCartRef, {
            items: [{ ...post, quantity: 1 }],
          });
        }
        setInCart(true)

      } catch (error) {
        console.error("Error adding item to cart: ", error);
      }
    } else {
      alert("You need to be logged in to add items to the cart");
    }
  };

  const removeFromCart = async () => {
    if (user) {
      const userCartRef = doc(db, "carts", user.uid);
      try {
        await updateDoc(userCartRef, {
          items: arrayRemove({ ...post, quantity: 1 })
        });
        setInCart(false);
      } catch (error) {
        console.error("Error removing item from cart: ", error);
      }
    } else {
      alert("You need to be logged in to remove items from the cart");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-xl p-4 m-5 max-w-xs font-classy border border-gray-50">
      <div className="w-full">
      <div className="w-full h-96 mt-2 rounded-lg overflow-hidden">
        <img src={post.image} alt="img" className="w-full h-full object-cover" />
        
      </div>
        <p className="text-black-500 font-bold text-lg text-left truncate mt-1">{post.title}</p>
      </div>
      <div className="w-full mt-2">
        <p className="text-gray-500 font-normal text-sm text-left truncate">
          {post.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div>
      
      <div className="flex justify-between items-center w-full mt-5">
        <div>
          <p className="text-black font-semibold text-xl">${post.price ? post.price : (Math.random() * 100).toFixed(2)}</p>
        </div>
        {inCart ? (
          <button
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
            text-[12px] p-1 px-3 uppercase 
            hover:bg-gray-700
            hover:text-white transition duration-300 ease-in"
            onClick={removeFromCart}>
            Remove Item
          </button>
        ) : (
          <button
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
            text-[12px] p-1 px-3 uppercase 
            hover:bg-gray-700
            hover:text-white transition duration-300 ease-in"
            onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
