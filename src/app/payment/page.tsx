"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ProtectedRoute from "../../components/ProtectedRoute";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";

export default function PaymentPage() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { items } = useSelector((state: RootState) => state.cart);

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();


  const saveOrder = (order: any) => {
  const existing = JSON.parse(localStorage.getItem("orders") || "[]");
  existing.push(order);
  localStorage.setItem("orders", JSON.stringify(existing));
};

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 1️⃣ Create payment intent
  useEffect(() => {
    api
      .post("/payment/create-payment-intent", {
        amount: totalAmount,
      })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch(() => setError("Failed to initialize payment"));
  }, [totalAmount]);

  // 2️⃣ Confirm payment
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const card = elements.getElement(CardElement);
    if (!card) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (result.error) {
      setError(result.error.message || "Payment failed");
      setLoading(false);
    } else if (result.paymentIntent?.status === "succeeded") {
      router.push("/order-success");
    }

if (result.paymentIntent?.status === "succeeded") {
  saveOrder({
    id: result.paymentIntent.id,
    items,
    total: totalAmount,
    date: new Date().toISOString(),
  });

  dispatch(clearCart());
  toast.success("Order placed successfully 🎉");
  router.push("/order-success");
}

  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black flex items-center justify-center px-6 text-white">
        <form
          onSubmit={handlePayment}
          className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8"
        >
          <h1 className="text-2xl  font-bold mb-6">
            Pay ₹{totalAmount.toLocaleString()}
          </h1>

          <div className="p-4  text-white bg-black/40 border border-white/10 rounded-lg">
            <CardElement />
          </div>

          {error && (
            <p className="mt-4 text-red-400 text-sm">{error}</p>
          )}

          <button
            disabled={!stripe || loading}
            className="mt-6 w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-zinc-200 disabled:opacity-60"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
