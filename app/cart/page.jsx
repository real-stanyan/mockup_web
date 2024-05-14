"use client";

import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item, index) => (
            <li key={index} className="py-4 flex justify-between items-center">
              <span className="text-gray-700">{item.product_name}</span>
              <span className="text-gray-500">Qty: {item.quantity}</span>
              <span className="text-green-500">${item.price}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
