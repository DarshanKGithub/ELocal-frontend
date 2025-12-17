"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import products from "../../data/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";



export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

const handleAddToCart = () => {
  if (!product) return;
  dispatch(
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity,
    })
  );
  toast.success("Added to cart");
};

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Image */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <p className="mt-4 text-2xl font-semibold text-purple-400">
            ₹{product.price.toLocaleString()}
          </p>

          <p className="mt-6 text-zinc-400 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm text-zinc-400">Quantity</span>
            <div className="flex items-center rounded-lg border border-white/10">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2"
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA */}
          <button onClick={handleAddToCart} className="mt-8 w-full rounded-xl bg-white py-4 font-semibold text-black hover:bg-zinc-200 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
