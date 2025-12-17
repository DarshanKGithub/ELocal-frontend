"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import products from "../../../data/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  if (!product) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success("Added to cart");
  };

  return (
    <div className="min-h-screen bg-black px-6 py-12 text-white">
      <h1 className="text-4xl font-bold">{product.title}</h1>
      <button onClick={handleAddToCart} className="mt-6 bg-white text-black px-6 py-3 rounded">
        Add to Cart
      </button>
    </div>
  );
}
