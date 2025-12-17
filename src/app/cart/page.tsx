"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../../redux/cartSlice";

export default function CartPage() {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-6 mb-6 border-b border-white/10 pb-4"
          >
            <img
              src={item.image}
              className="w-24 h-24 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-zinc-400">
                ₹{item.price.toLocaleString()}
              </p>

              <div className="mt-2 flex items-center gap-3">
                <button
                  onClick={() => dispatch(decreaseQty(item.id))}
                  className="px-3 py-1 border border-white/20 rounded"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQty(item.id))}
                  className="px-3 py-1 border border-white/20 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-400 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="mt-8 flex justify-between text-xl font-semibold">
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>
      <button
  onClick={() => window.location.href = "/checkout"}
  className="mt-6 w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-zinc-200"
>
  Checkout
</button>
    </div>
  );
}
